import { FromSchema } from 'json-schema-to-ts';
declare const sideSchema: {
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "integer";
        };
        readonly plane: {
            readonly type: "string";
        };
        readonly material: {
            readonly type: "string";
        };
        readonly uaxis: {
            readonly type: "string";
        };
        readonly vaxis: {
            readonly type: "string";
        };
        readonly rotation: {
            readonly type: "integer";
        };
        readonly lightmapscale: {
            readonly type: "integer";
        };
        readonly smoothing_groups: {
            readonly type: "integer";
        };
    };
    readonly required: readonly ["id", "plane", "material", "uaxis", "vaxis", "rotation", "lightmapscale", "smoothing_groups"];
};
declare const solidSchema: {
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "integer";
        };
        readonly side: {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly id: {
                        readonly type: "integer";
                    };
                    readonly plane: {
                        readonly type: "string";
                    };
                    readonly material: {
                        readonly type: "string";
                    };
                    readonly uaxis: {
                        readonly type: "string";
                    };
                    readonly vaxis: {
                        readonly type: "string";
                    };
                    readonly rotation: {
                        readonly type: "integer";
                    };
                    readonly lightmapscale: {
                        readonly type: "integer";
                    };
                    readonly smoothing_groups: {
                        readonly type: "integer";
                    };
                };
                readonly required: readonly ["id", "plane", "material", "uaxis", "vaxis", "rotation", "lightmapscale", "smoothing_groups"];
            };
        };
        readonly editor: {
            readonly type: "object";
            readonly properties: {
                readonly color: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["color"];
        };
    };
    readonly required: readonly ["id", "side", "editor"];
};
declare const entitySchema: {
    readonly type: "object";
    readonly properties: {
        readonly id: {
            readonly type: "integer";
        };
        readonly classname: {
            readonly type: "string";
        };
        readonly model: {
            readonly type: "string";
        };
        readonly disableshadows: {
            readonly type: "integer";
        };
        readonly renderfx: {
            readonly type: "integer";
        };
        readonly renderamt: {
            readonly type: "integer";
        };
        readonly rendercolor: {
            readonly type: "string";
        };
        readonly rendermode: {
            readonly type: "integer";
        };
        readonly framerate: {
            readonly type: "integer";
        };
        readonly scale: {
            readonly type: "integer";
        };
        readonly spawnflags: {
            readonly type: "integer";
        };
        readonly angles: {
            readonly type: "string";
        };
        readonly origin: {
            readonly type: "string";
        };
        readonly editor: {
            readonly type: "object";
            readonly properties: {
                readonly color: {
                    readonly type: "string";
                };
            };
            readonly required: readonly ["color"];
        };
    };
    readonly required: readonly ["id", "classname", "model", "disableshadows", "renderfx", "renderamt", "rendercolor", "rendermode", "framerate", "scale", "spawnflags", "angles", "origin", "editor"];
};
export declare const vmfSchema: {
    readonly type: "object";
    readonly properties: {
        readonly versioninfo: {
            readonly type: "object";
            readonly properties: {
                readonly editorversion: {
                    readonly type: "integer";
                };
                readonly editorbuild: {
                    readonly type: "integer";
                };
                readonly mapversion: {
                    readonly type: "integer";
                };
                readonly prefab: {
                    readonly type: "integer";
                };
            };
            readonly required: readonly ["editorversion", "editorbuild", "mapversion", "prefab"];
        };
        readonly visgroups: {
            readonly type: "object";
            readonly properties: {
                readonly visgroup: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly name: {
                                readonly type: "string";
                            };
                            readonly visgroupid: {
                                readonly type: "integer";
                            };
                            readonly color: {
                                readonly type: "string";
                            };
                            readonly visible: {
                                readonly type: "integer";
                            };
                        };
                        readonly required: readonly ["name", "visgroupid", "color", "visible"];
                    };
                };
            };
            readonly required: readonly ["visgroup"];
        };
        readonly viewsettings: {
            readonly type: "object";
            readonly properties: {
                readonly bSnapToGrid: {
                    readonly type: "integer";
                };
                readonly bShowGrid: {
                    readonly type: "integer";
                };
                readonly nGridSpacing: {
                    readonly type: "integer";
                };
                readonly bShow3DGrid: {
                    readonly type: "integer";
                };
            };
            readonly required: readonly ["bSnapToGrid", "bShowGrid", "nGridSpacing", "bShow3DGrid"];
        };
        readonly world: {
            readonly type: "object";
            readonly properties: {
                readonly id: {
                    readonly type: "integer";
                };
                readonly mapversion: {
                    readonly type: "integer";
                };
                readonly classname: {
                    readonly type: "string";
                };
                readonly skyname: {
                    readonly type: "string";
                };
                readonly sounds: {
                    readonly type: "integer";
                };
                readonly MaxRange: {
                    readonly type: "integer";
                };
                readonly fogcolor: {
                    readonly type: "string";
                };
                readonly fogcolor2: {
                    readonly type: "string";
                };
                readonly fogdir: {
                    readonly type: "string";
                };
                readonly fogstart: {
                    readonly type: "integer";
                };
                readonly fogend: {
                    readonly type: "integer";
                };
                readonly fogenable: {
                    readonly type: "integer";
                };
                readonly levelscript: {
                    readonly type: "string";
                };
                readonly safearea: {
                    readonly type: "integer";
                };
                readonly copwaitarea: {
                    readonly type: "integer";
                };
                readonly wetness_fadetarget: {
                    readonly type: "integer";
                };
                readonly wetness_fadein: {
                    readonly type: "integer";
                };
                readonly wetness_fadeout: {
                    readonly type: "integer";
                };
                readonly comment: {
                    readonly type: "string";
                };
                readonly solid: {
                    readonly type: "array";
                    readonly items: {
                        readonly type: "object";
                        readonly properties: {
                            readonly id: {
                                readonly type: "integer";
                            };
                            readonly side: {
                                readonly type: "array";
                                readonly items: {
                                    readonly type: "object";
                                    readonly properties: {
                                        readonly id: {
                                            readonly type: "integer";
                                        };
                                        readonly plane: {
                                            readonly type: "string";
                                        };
                                        readonly material: {
                                            readonly type: "string";
                                        };
                                        readonly uaxis: {
                                            readonly type: "string";
                                        };
                                        readonly vaxis: {
                                            readonly type: "string";
                                        };
                                        readonly rotation: {
                                            readonly type: "integer";
                                        };
                                        readonly lightmapscale: {
                                            readonly type: "integer";
                                        };
                                        readonly smoothing_groups: {
                                            readonly type: "integer";
                                        };
                                    };
                                    readonly required: readonly ["id", "plane", "material", "uaxis", "vaxis", "rotation", "lightmapscale", "smoothing_groups"];
                                };
                            };
                            readonly editor: {
                                readonly type: "object";
                                readonly properties: {
                                    readonly color: {
                                        readonly type: "string";
                                    };
                                };
                                readonly required: readonly ["color"];
                            };
                        };
                        readonly required: readonly ["id", "side", "editor"];
                    };
                };
            };
            readonly required: readonly ["id", "mapversion", "classname", "skyname", "sounds", "MaxRange", "fogcolor", "fogcolor2", "fogdir", "fogstart", "fogend", "fogenable", "levelscript", "safearea", "copwaitarea", "wetness_fadetarget", "wetness_fadein", "wetness_fadeout", "comment", "solid"];
        };
        readonly entity: {
            readonly type: "array";
            readonly items: {
                readonly type: "object";
                readonly properties: {
                    readonly id: {
                        readonly type: "integer";
                    };
                    readonly classname: {
                        readonly type: "string";
                    };
                    readonly model: {
                        readonly type: "string";
                    };
                    readonly disableshadows: {
                        readonly type: "integer";
                    };
                    readonly renderfx: {
                        readonly type: "integer";
                    };
                    readonly renderamt: {
                        readonly type: "integer";
                    };
                    readonly rendercolor: {
                        readonly type: "string";
                    };
                    readonly rendermode: {
                        readonly type: "integer";
                    };
                    readonly framerate: {
                        readonly type: "integer";
                    };
                    readonly scale: {
                        readonly type: "integer";
                    };
                    readonly spawnflags: {
                        readonly type: "integer";
                    };
                    readonly angles: {
                        readonly type: "string";
                    };
                    readonly origin: {
                        readonly type: "string";
                    };
                    readonly editor: {
                        readonly type: "object";
                        readonly properties: {
                            readonly color: {
                                readonly type: "string";
                            };
                        };
                        readonly required: readonly ["color"];
                    };
                };
                readonly required: readonly ["id", "classname", "model", "disableshadows", "renderfx", "renderamt", "rendercolor", "rendermode", "framerate", "scale", "spawnflags", "angles", "origin", "editor"];
            };
        };
        readonly hidden: {
            readonly type: "array";
        };
        readonly cameras: {
            readonly type: "object";
            readonly properties: {
                readonly activecamera: {
                    readonly type: "integer";
                };
                readonly camera: {
                    readonly type: "object";
                    readonly properties: {
                        readonly position: {
                            readonly type: "string";
                        };
                        readonly look: {
                            readonly type: "string";
                        };
                    };
                    readonly required: readonly ["position", "look"];
                };
            };
            readonly required: readonly ["activecamera", "camera"];
        };
        readonly cordon: {
            readonly type: "object";
            readonly properties: {
                readonly mins: {
                    readonly type: "string";
                };
                readonly maxs: {
                    readonly type: "string";
                };
                readonly active: {
                    readonly type: "integer";
                };
            };
            readonly required: readonly ["mins", "maxs", "active"];
        };
    };
    readonly required: readonly ["versioninfo", "visgroups", "viewsettings", "world", "entity", "hidden", "cameras", "cordon"];
};
export declare type Vmf = FromSchema<typeof vmfSchema>;
export declare type Solid = FromSchema<typeof solidSchema>;
export declare type Side = FromSchema<typeof sideSchema>;
export declare type Entity = FromSchema<typeof entitySchema>;
export {};
