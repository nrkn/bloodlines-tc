"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vmfSchema = void 0;
const sideSchema = {
    type: "object",
    properties: {
        id: {
            type: "integer"
        },
        plane: {
            type: "string"
        },
        material: {
            type: "string"
        },
        uaxis: {
            type: "string"
        },
        vaxis: {
            type: "string"
        },
        rotation: {
            type: "integer"
        },
        lightmapscale: {
            type: "integer"
        },
        smoothing_groups: {
            type: "integer"
        }
    },
    required: [
        "id",
        "plane",
        "material",
        "uaxis",
        "vaxis",
        "rotation",
        "lightmapscale",
        "smoothing_groups"
    ]
};
const solidSchema = {
    type: "object",
    properties: {
        id: {
            type: "integer"
        },
        side: {
            type: "array",
            items: sideSchema
        },
        editor: {
            type: "object",
            properties: {
                color: {
                    type: "string"
                }
            },
            required: [
                "color"
            ]
        }
    },
    required: [
        "id",
        "side",
        "editor"
    ]
};
const entitySchema = {
    type: "object",
    properties: {
        id: {
            type: "integer"
        },
        classname: {
            type: "string"
        },
        model: {
            type: "string"
        },
        disableshadows: {
            type: "integer"
        },
        renderfx: {
            type: "integer"
        },
        renderamt: {
            type: "integer"
        },
        rendercolor: {
            type: "string"
        },
        rendermode: {
            type: "integer"
        },
        framerate: {
            type: "integer"
        },
        scale: {
            type: "integer"
        },
        spawnflags: {
            type: "integer"
        },
        angles: {
            type: "string"
        },
        origin: {
            type: "string"
        },
        editor: {
            type: "object",
            properties: {
                color: {
                    type: "string"
                }
            },
            required: [
                "color"
            ]
        }
    },
    required: [
        "id",
        "classname",
        "model",
        "disableshadows",
        "renderfx",
        "renderamt",
        "rendercolor",
        "rendermode",
        "framerate",
        "scale",
        "spawnflags",
        "angles",
        "origin",
        "editor"
    ]
};
exports.vmfSchema = {
    type: "object",
    properties: {
        versioninfo: {
            type: "object",
            properties: {
                editorversion: {
                    type: "integer"
                },
                editorbuild: {
                    type: "integer"
                },
                mapversion: {
                    type: "integer"
                },
                prefab: {
                    type: "integer"
                }
            },
            required: [
                "editorversion",
                "editorbuild",
                "mapversion",
                "prefab"
            ]
        },
        visgroups: {
            type: "object",
            properties: {
                visgroup: {
                    type: "array",
                    items: {
                        type: "object",
                        properties: {
                            name: {
                                type: "string"
                            },
                            visgroupid: {
                                type: "integer"
                            },
                            color: {
                                type: "string"
                            },
                            visible: {
                                type: "integer"
                            }
                        },
                        required: [
                            "name",
                            "visgroupid",
                            "color",
                            "visible"
                        ]
                    }
                }
            },
            required: [
                "visgroup"
            ]
        },
        viewsettings: {
            type: "object",
            properties: {
                bSnapToGrid: {
                    type: "integer"
                },
                bShowGrid: {
                    type: "integer"
                },
                nGridSpacing: {
                    type: "integer"
                },
                bShow3DGrid: {
                    type: "integer"
                }
            },
            required: [
                "bSnapToGrid",
                "bShowGrid",
                "nGridSpacing",
                "bShow3DGrid"
            ]
        },
        world: {
            type: "object",
            properties: {
                id: {
                    type: "integer"
                },
                mapversion: {
                    type: "integer"
                },
                classname: {
                    type: "string"
                },
                skyname: {
                    type: "string"
                },
                sounds: {
                    type: "integer"
                },
                MaxRange: {
                    type: "integer"
                },
                fogcolor: {
                    type: "string"
                },
                fogcolor2: {
                    type: "string"
                },
                fogdir: {
                    type: "string"
                },
                fogstart: {
                    type: "integer"
                },
                fogend: {
                    type: "integer"
                },
                fogenable: {
                    type: "integer"
                },
                levelscript: {
                    type: "string"
                },
                safearea: {
                    type: "integer"
                },
                copwaitarea: {
                    type: "integer"
                },
                wetness_fadetarget: {
                    type: "integer"
                },
                wetness_fadein: {
                    type: "integer"
                },
                wetness_fadeout: {
                    type: "integer"
                },
                comment: {
                    type: "string"
                },
                solid: {
                    type: "array",
                    items: solidSchema
                }
            },
            required: [
                "id",
                "mapversion",
                "classname",
                "skyname",
                "sounds",
                "MaxRange",
                "fogcolor",
                "fogcolor2",
                "fogdir",
                "fogstart",
                "fogend",
                "fogenable",
                "levelscript",
                "safearea",
                "copwaitarea",
                "wetness_fadetarget",
                "wetness_fadein",
                "wetness_fadeout",
                "comment",
                "solid"
            ]
        },
        entity: {
            type: "array",
            items: entitySchema
        },
        hidden: {
            // nah don't care
            type: "array"
        },
        cameras: {
            type: "object",
            properties: {
                activecamera: {
                    type: "integer"
                },
                camera: {
                    type: "object",
                    properties: {
                        position: {
                            type: "string"
                        },
                        look: {
                            type: "string"
                        }
                    },
                    required: [
                        "position",
                        "look"
                    ]
                }
            },
            required: [
                "activecamera",
                "camera"
            ]
        },
        cordon: {
            type: "object",
            properties: {
                mins: {
                    type: "string"
                },
                maxs: {
                    type: "string"
                },
                active: {
                    type: "integer"
                }
            },
            required: [
                "mins",
                "maxs",
                "active"
            ]
        }
    },
    required: [
        "versioninfo",
        "visgroups",
        "viewsettings",
        "world",
        "entity",
        "hidden",
        "cameras",
        "cordon"
    ]
};
//# sourceMappingURL=vmf-schema.js.map