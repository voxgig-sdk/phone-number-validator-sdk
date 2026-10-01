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
        "entity": "phone_validation",
        "accessor": "PhoneValidation",
        "op": "load",
        "method": "GET",
        "path": "/validate/{phone_number}",
        "args": [
            {
                "name": "phone_number",
                "wire": "phone_number",
                "value": "01613950781"
            }
        ],
        "select": {
            "apikey": "num_live_Nf2vjeM19tHdi42qQ2LaVVMg2IGk1ReU2BYBKnvm",
            "country_code": "BD"
        },
        "headers": [],
        "query": [
            "country_code"
        ],
        "auth": [
            [
                {
                    "in": "header",
                    "name": "apikey"
                }
            ]
        ],
        "status": 200,
        "sample": {
            "valid": true,
            "number": "01613950781",
            "local_format": "01613950781",
            "international_format": "+8801613950781",
            "country_code": "BD",
            "country_name": "Bangladesh",
            "country_prefix": "+880",
            "carrier": "Grameenphone",
            "line_type": "mobile"
        },
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