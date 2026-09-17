"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        // TODO: errors etc
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'PhoneNumberValidator',
        slug: "phone-number-validator",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://api.numlookupapi.com/v1",
        auth: {
            prefix: '',
            name: 'apikey',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            phone_validation: {},
        }
    };
    entity = {
        "phone_validation": {
            "fields": [
                {
                    "name": "carrier",
                    "short": "Name of the carrier/operator",
                    "type": "`$STRING`"
                },
                {
                    "name": "country_code",
                    "short": "ISO country code",
                    "type": "`$STRING`"
                },
                {
                    "name": "country_name",
                    "short": "Name of the country",
                    "type": "`$STRING`"
                },
                {
                    "name": "country_prefix",
                    "short": "Country dialing prefix",
                    "type": "`$STRING`"
                },
                {
                    "name": "international_format",
                    "short": "Phone number in international format",
                    "type": "`$STRING`"
                },
                {
                    "name": "line_type",
                    "short": "Type of phone line (mobile, landline, etc.)",
                    "type": "`$STRING`"
                },
                {
                    "name": "local_format",
                    "short": "Phone number in local format",
                    "type": "`$STRING`"
                },
                {
                    "name": "number",
                    "short": "The original phone number",
                    "type": "`$STRING`"
                },
                {
                    "name": "valid",
                    "short": "Whether the phone number is valid",
                    "type": "`$BOOLEAN`"
                }
            ],
            "name": "phone_validation",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "args": {
                                "header": [
                                    {
                                        "example": "num_live_Nf2vjeM19tHdi42qQ2LaVVMg2IGk1ReU2BYBKnvm",
                                        "kind": "header",
                                        "name": "apikey",
                                        "orig": "apikey",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "params": [
                                    {
                                        "example": "01613950781",
                                        "kind": "param",
                                        "name": "phone_number",
                                        "orig": "phone_number",
                                        "reqd": true,
                                        "type": "`$STRING`"
                                    }
                                ],
                                "query": [
                                    {
                                        "example": "BD",
                                        "kind": "query",
                                        "name": "country_code",
                                        "orig": "country_code",
                                        "type": "`$STRING`"
                                    }
                                ]
                            },
                            "kind": "http",
                            "method": "GET",
                            "orig": "/validate/{phone_number}",
                            "segments": [
                                {
                                    "lit": "validate"
                                },
                                {
                                    "var": "phone_number"
                                }
                            ],
                            "select": {
                                "exist": [
                                    "apikey",
                                    "country_code",
                                    "phone_number"
                                ]
                            },
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "parts": [
                                "validate",
                                "{phone_number}"
                            ]
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": [
                    [
                        "validate"
                    ]
                ]
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map