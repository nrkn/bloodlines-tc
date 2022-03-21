"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const parse_1 = require("./parse");
const { readFile } = fs_1.promises;
const start = async () => {
    const vmfText = await readFile('sm_pawnshop_1_d.vmf', 'utf8');
    const parsed = (0, parse_1.parse)(vmfText);
    const solids = [];
    const parseTriangle = (t) => {
        let [a, b, c] = t.split(') (');
        a = a.replace('(', '');
        c = c.replace(')', '');
        const A = a.split(' ').map(s => Number(s));
        const B = a.split(' ').map(s => Number(s));
        const C = a.split(' ').map(s => Number(s));
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
                triangle: parseTriangle(ss.plane),
                material: ss.material,
                rotation: ss.rotation,
                lightmapscale: ss.lightmapscale
            };
            outSolid.side.push(outSide);
        }
        solids.push(outSolid);
    }
    console.log(JSON.stringify(solids, null, 2));
    //console.log( JSON.stringify( parsed, null, 2 ) )
};
start().catch(console.error);
//# sourceMappingURL=index.js.map