"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "apipl",
        "accessor": "Apipl",
        "op": "list",
        "method": "GET",
        "path": "/bin/api.pl",
        "args": [],
        "select": {
            "ac": "v1",
            "lang": "v1",
            "lat": 23.09,
            "lon": 113.17,
            "output": "v1",
            "product": "v1",
            "tzshift": "v1",
            "unit": "v1"
        },
        "headers": [],
        "query": [
            "lon",
            "lat",
            "product",
            "output",
            "ac",
            "lang",
            "unit",
            "tzshift"
        ],
        "auth": null,
        "status": 200,
        "sample": {
            "product": "astro",
            "init": "2023010100",
            "dataseries": [
                {
                    "timepoint": 3,
                    "cloudcover": 2,
                    "seeing": 4,
                    "transparency": 3,
                    "lifted_index": 2,
                    "rh2m": 8,
                    "wind10m": {
                        "direction": "NE",
                        "speed": 2
                    },
                    "temp2m": 15,
                    "prec_type": "none"
                }
            ]
        },
        "idField": "id"
    },
    {
        "entity": "graphical_api",
        "accessor": "GraphicalApi",
        "op": "load",
        "method": "GET",
        "path": "/bin/astro.php",
        "args": [],
        "select": {
            "ac": "v1",
            "lang": "v1",
            "lat": 23.09,
            "lon": 113.17,
            "output": "v1",
            "tzshift": "v1",
            "unit": "v1"
        },
        "headers": [],
        "query": [
            "lon",
            "lat",
            "ac",
            "lang",
            "unit",
            "output",
            "tzshift"
        ],
        "auth": null,
        "status": 200,
        "sample": null,
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map