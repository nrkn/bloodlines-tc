"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const parse_1 = require("./parse");
const { readFile } = fs_1.promises;
const start = async () => {
    const vmfText = await readFile('sm_pawnshop_1_d.vmf', 'utf8');
    const parsed = (0, parse_1.parse)(vmfText);
    console.log(JSON.stringify(parsed, null, 2));
};
start().catch(console.error);
//# sourceMappingURL=index.js.map