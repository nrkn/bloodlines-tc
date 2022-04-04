"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const parse_1 = require("./parse");
const { readFile } = fs_1.promises;
const start = async () => {
    const vmfText = await readFile('sm_pawnshop_1_d.vmf', 'utf8');
    const parsed = (0, parse_1.parse)(vmfText);
    const solids = [];
    const parseSide = (t) => {
        const segs = t.split(') (');
        if (segs.length !== 3) {
            console.warn('Expected three points', t);
        }
        let [a, b, c] = segs;
        a = a.replace('(', '');
        c = c.replace(')', '');
        const A = a.split(' ').map(s => Number(s));
        const B = b.split(' ').map(s => Number(s));
        const C = c.split(' ').map(s => Number(s));
        const tri = [A, B, C];
        return tri;
    };
    for (const s of parsed.world.solid) {
        const outSolid = {
            id: s.id,
            side: [],
            color: s.editor.color.split(' ').map(s => Number(s))
        };
        for (const ss of s.side) {
            if (ss.material.startsWith('TOOLS'))
                continue;
            const outSide = {
                id: ss.id,
                triangle: parseSide(ss.plane),
                material: ss.material,
                rotation: ss.rotation,
                lightmapscale: ss.lightmapscale
            };
            outSolid.side.push(outSide);
        }
        solids.push(outSolid);
    }
    // i think we need to determine if the solids face face inward or outward
    // i think rooms inside etc are inside out? and road, buildings etc face out
    //console.log( JSON.stringify( solids, null, 2 ) )
    // let's try turning into an html page
    let html = '<!doctype html><head><meta charset="utf8"><title>Pawnshop</title></head>';
    const flats = [];
    for (const solid of solids) {
        const cssColor = `rgb(${solid.color.join()})`;
        const colorStyle = `display: inline-block; min-width: 1rem; height: 1rem; background: ${cssColor}`;
        html += `<strong>${solid.id}</strong> <span style="${colorStyle}"></span><br>`;
        html += '<ul>';
        for (const ss of solid.side) {
            // sike - it's not a tri! it's a quad
            // A is bottom left
            // B is top left
            // C is top right
            // 
            const [bottomLeft, topLeft, topRight] = ss.triangle;
            // not sure if this is right for 2d top down?
            const [blX, blY, blZ] = bottomLeft;
            const [tlX, tlY, tlZ] = topLeft;
            const [trX, trY, trZ] = topRight;
            const minX = Math.min(blX, tlX, trX);
            const maxX = Math.max(blX, tlX, trX);
            const minY = Math.min(blY, tlY, trY);
            const maxY = Math.max(blY, tlY, trY);
            const minZ = Math.min(blZ, tlZ, trZ);
            const maxZ = Math.max(blZ, tlZ, trZ);
            // try to categorize
            // according to value docs, this is a floor:
            // (-16 -16 0) (16 -16 0) (16 16  0)
            // flat (eg floor, ceil) - all same z
            // wall - z differs between bottomLeft and topLeft?
            // slope - everything else?
            let type = 'slope';
            if (blZ === tlZ && tlZ === trZ) {
                type = 'flat';
            }
            if (blZ !== tlZ) {
                type = 'wall';
            }
            let item = '<li>';
            item += `<strong>${ss.id}</strong> <em>${type}</em>(?) ${ss.material} <br>`;
            if (type === 'flat') {
                const x = minX;
                const y = minY;
                const bottom = maxY;
                const right = maxX;
                const width = right - x;
                const height = bottom - y;
                const z = minZ;
                // dump flat
                // wait... are all flats on 90? seems unlikely lol but then again level designers...
                flats.push({ id: ss.id, material: ss.material, z, color: solid.color, rect: { x, y, width, height } });
                //if( width === 0 || height === 0 ) continue
                const viewBox = [x | 0, y | 0, width | 0 + 1, height | 0 + 1];
                const bl = [blX, blY].join(' ');
                const tl = [tlX, tlY].join(' ');
                const tr = [trX, trY].join(' ');
                const d = `M${bl} L${tl} L${tr} Z`;
                item += JSON.stringify({ x, y, width, height });
                item += ' ';
                item += JSON.stringify(ss.triangle);
                item += '<br>';
                let svg = `<svg viewBox="${viewBox}" width="${width | 0}" height="${height | 0}">`;
                svg += `<path d="${d}" fill="${cssColor}" stroke="none"/>`;
                svg += `<rect x="${x | 0}" y="${y | 0}" width="${width | 0}" height="${height | 0}" stroke="${cssColor}" fill="transparent"/>`;
                svg += '</svg>';
                item += svg;
            }
            if (type === 'wall') {
                const x1 = tlX;
                const y1 = tlY;
                const x2 = trX;
                const y2 = trY;
                const width = Math.hypot(x2 - x1, y2 - y1);
                const height = maxZ - minZ;
                const viewBox = [x1 | 0, y1 | 0, width | 0 + 1, height | 0 + 1];
                item += JSON.stringify({ x1, y1, x2, y2, width, height });
                item += ' ';
                item += JSON.stringify(ss.triangle);
                item += '<br>';
                let svg = `<svg viewBox="${viewBox}" width="${width | 0}" height="${height | 0}">`;
                svg += `<rect x="${x1 | 0}" y="${y1 | 0}" width="${width | 0}" height="${height | 0}" stroke="${cssColor}" fill="transparent"/>`;
                svg += '</svg>';
                item += svg;
            }
            item += '</li>';
            html += item;
        }
        html += '</ul>';
    }
    flats.sort((a, b) => a.z - b.z);
    const rectsIntersect = (a, b) => {
        const right = a.x + a.width;
        const bottom = a.y + a.height;
        if (b.x >= a.x && b.x <= right && b.y >= a.y && b.y <= bottom)
            return true;
        return false;
    };
    const rectToFlatMap = new Map();
    for (const flat of flats) {
        const rectKey = JSON.stringify(flat.rect);
        const existingArr = rectToFlatMap.get(rectKey) || [];
        existingArr.push(flat);
        rectToFlatMap.set(rectKey, existingArr);
    }
    const rects = Array.from(rectToFlatMap.keys()).map(s => JSON.parse(s));
    let intersects = 0;
    let minX = Number.MAX_SAFE_INTEGER;
    let minY = Number.MAX_SAFE_INTEGER;
    let maxX = Number.MIN_SAFE_INTEGER;
    let maxY = Number.MIN_SAFE_INTEGER;
    for (const a of rects) {
        for (const b of rects) {
            if (a === b)
                continue;
            if (rectsIntersect(a, b))
                intersects++;
        }
        minX = Math.min(a.x, minX);
        minY = Math.min(a.y, minY);
        maxX = Math.max(a.x, maxX);
        maxY = Math.max(a.y, maxY);
    }
    console.log(intersects, flats.length, rectToFlatMap.size);
    const width = maxX - minX;
    const height = maxY - minY;
    const flatsViewBox = [minX, minY, width, height].join(' ');
    let flatsSvg = `<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="${flatsViewBox}">`;
    for (const key of rectToFlatMap.keys()) {
        const flats = rectToFlatMap.get(key);
        const rectString = Object.values(JSON.parse(key)).join(' ');
        flatsSvg += `<g id="rect_${rectString}" data-rect="${rectString}">`;
        for (const flat of flats) {
            flatsSvg += `<rect class="id_${flat.id}" data-material="${flat.material}" data-z="${flat.z}" x="${flat.rect.x}" y="${flat.rect.y}" width="${flat.rect.width}" height="${flat.rect.height}" fill="rgb(${flat.color.join()})" opacity="0.5" stroke="none" />`;
        }
        flatsSvg += '</g>';
    }
    flatsSvg += '</svg>';
    (0, fs_1.writeFileSync)('./pawnshop-flats.svg', flatsSvg, 'utf8');
    (0, fs_1.writeFileSync)('./pawnshop.html', html, 'utf8');
    (0, fs_1.writeFileSync)('./pawnshop-flats.json', JSON.stringify(flats, null, 2), 'utf8');
    // wild - let's just make a 2d grid from the flats now
    const xKeys = new Set();
    const yKeys = new Set();
    const addRect = (rect) => {
        xKeys.add(rect.x | 0);
        xKeys.add((rect.x + rect.width) | 0);
        yKeys.add(rect.y | 0);
        yKeys.add((rect.y + rect.height) | 0);
    };
    for (const rect of rects) {
        addRect(rect);
    }
    const xIndices = Array.from(xKeys).sort((a, b) => a - b);
    const yIndices = Array.from(yKeys).sort((a, b) => a - b);
    const [firstX] = xIndices;
    const [firstY] = yIndices;
    const lastX = xIndices[xIndices.length - 1];
    const lastY = yIndices[yIndices.length - 1];
    const gridW = lastX - firstX;
    const gridH = lastY - firstY;
    console.log({ lastX, lastY, xIndices, yIndices });
    const gridViewBox = [firstX, firstY, gridW, gridH].join(' ');
    const grid = [];
    for (let j = 0; j < yIndices.length - 1; j++) {
        const y = yIndices[j];
        const y2 = yIndices[j + 1];
        const height = y2 - y;
        for (let i = 0; i < xIndices.length - 1; i++) {
            const x = xIndices[i];
            const x2 = xIndices[i + 1];
            const width = x2 - x;
            const gr = { x, y, width, height };
            const flatCells = flats.filter(f => rectsIntersect(f.rect, gr));
            const index = j * xIndices.length + i;
            grid[index] = { i, j, x, y, width, height, flats: flatCells };
        }
    }
    const svgHeader = (viewBox) => `<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="${viewBox}">`;
    const attrStr = (key, value) => `${key}="${value}"`;
    const objToAttr = (obj) => Object.entries(obj).map(([k, v]) => attrStr(k, String(v))).join(' ');
    let minZ = Number.MAX_SAFE_INTEGER;
    let maxZ = Number.MIN_SAFE_INTEGER;
    // WARNING HACK
    const maxHeight = 4900;
    for (const f of flats) {
        if (f.z > maxHeight)
            continue;
        minZ = Math.min(minZ, f.z);
        maxZ = Math.max(maxZ, f.z);
    }
    const deltaZ = maxZ - minZ;
    const scale = 1 / deltaZ * 255;
    console.log({ minZ, maxZ, deltaZ, scale });
    let levelOverLevel = 0;
    const gridRectToSvg = (rect, strat) => {
        if (rect.flats.length === 0)
            return '';
        const { i, j, x, y, width, height } = rect;
        const zIndices = rect.flats.map(f => f.z);
        if (strat === 'max' && zIndices.length > 2)
            levelOverLevel++;
        const fminZ = Math.min(...zIndices);
        const fmaxZ = Math.max(...zIndices);
        if (fminZ > maxHeight || fmaxZ > maxHeight)
            return '';
        let z = minZ;
        if (strat === 'max')
            z = fmaxZ;
        if (strat === 'min')
            z = fminZ;
        if (strat === 'avg')
            z = (fmaxZ + fminZ) / 2;
        const val = Math.floor((z - minZ) * scale);
        let stroke = '#fff';
        if (j % 2) {
            stroke = i % 2 ? '#eee' : '#ddd';
        }
        else {
            stroke = i % 2 ? '#ddd' : '#eee';
        }
        const fill = `rgb(${[val, val, val].join()})`;
        return `<rect ${objToAttr({
            x, y, width, height, fill,
            //stroke 
        })} />`;
    };
    console.log({ levelOverLevel });
    let gridSvgMax = svgHeader(gridViewBox);
    const gridSvgRectsMax = grid.map(g => gridRectToSvg(g, 'max')).join('');
    gridSvgMax += gridSvgRectsMax;
    gridSvgMax += '</svg>';
    (0, fs_1.writeFileSync)('./pawn-grid-max.svg', gridSvgMax, 'utf8');
    let gridSvgMin = svgHeader(gridViewBox);
    const gridSvgRectsMin = grid.map(g => gridRectToSvg(g, 'min')).join('');
    gridSvgMin += gridSvgRectsMin;
    gridSvgMin += '</svg>';
    (0, fs_1.writeFileSync)('./pawn-grid-min.svg', gridSvgMin, 'utf8');
    let gridSvgAvg = svgHeader(gridViewBox);
    const gridSvgRectsAvg = grid.map(g => gridRectToSvg(g, 'avg')).join('');
    gridSvgAvg += gridSvgRectsAvg;
    gridSvgAvg += '</svg>';
    (0, fs_1.writeFileSync)('./pawn-grid-avg.svg', gridSvgAvg, 'utf8');
    // yes very interesting
    // max is the most interesting right now for just generating floors 
    // iterate over each grid point
    // place points anywhere that not all neighbours have same maxZ
    // do we have to make a graph or nah
    // might be useful for edges
    const interestingPoints = [];
    const getZ = (i, j) => {
        if (i < 0 || j < 0)
            return;
        if (i >= xIndices.length)
            return;
        if (j >= yIndices.length)
            return;
        const index = j * xIndices.length + i;
        const g = grid[index];
        if (g === undefined) {
            console.warn('no grid at', i, j);
            return;
        }
        // if all four corners are same, it's not interesting
        const zIndices = g.flats.map(f => f.z);
        const fmaxZ = Math.max(...zIndices);
        if (fmaxZ > maxHeight)
            return;
        return fmaxZ;
    };
    for (let j = 0; j < yIndices.length; j++) {
        for (let i = 0; i < xIndices.length - 1; i++) {
            const z = getZ(i, j);
            if (!z)
                continue;
            const left = i - 1;
            const right = i + 1;
            const up = j - 1;
            const down = j + 1;
            const index = j * xIndices.length + i;
            const check = [];
            if (i > 0) {
                check.push(getZ(left, j));
                if (j > 0) {
                    check.push(getZ(left, up));
                }
            }
            if (j > 0) {
                check.push(getZ(i, up));
            }
            if (check.length === 0 ||
                check.some(c => c !== z)) {
                interestingPoints.push(index);
            }
        }
    }
    console.log(interestingPoints.length);
    let gridSvgPoints = svgHeader(gridViewBox);
    gridSvgPoints += gridSvgRectsMax;
    gridSvgPoints += interestingPoints.map(i => {
        const g = grid[i];
        const { x: cx, y: cy } = g;
        const r = 2;
        const fill = '#39f';
        const stroke = 'none';
        return `<circle ${objToAttr({ cx, cy, r, fill, stroke })} />`;
    }).join('');
    gridSvgPoints += '</svg>';
    (0, fs_1.writeFileSync)('./pawn-grid-points.svg', gridSvgPoints, 'utf8');
};
start().catch(console.error);
//# sourceMappingURL=index.js.map