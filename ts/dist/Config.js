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
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
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
                "now": "`$FUNCTION`",
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
                    "title": "Carrier",
                    "type": "`$STRING`",
                    "short": "Name of the carrier/operator"
                },
                {
                    "name": "country_code",
                    "title": "Country Code",
                    "type": "`$STRING`",
                    "short": "ISO country code"
                },
                {
                    "name": "country_name",
                    "title": "Country Name",
                    "type": "`$STRING`",
                    "short": "Name of the country"
                },
                {
                    "name": "country_prefix",
                    "title": "Country Prefix",
                    "type": "`$STRING`",
                    "short": "Country dialing prefix"
                },
                {
                    "name": "international_format",
                    "title": "International Format",
                    "type": "`$STRING`",
                    "short": "Phone number in international format"
                },
                {
                    "name": "line_type",
                    "title": "Line Type",
                    "type": "`$STRING`",
                    "short": "Type of phone line (mobile, landline, etc.)"
                },
                {
                    "name": "local_format",
                    "title": "Local Format",
                    "type": "`$STRING`",
                    "short": "Phone number in local format"
                },
                {
                    "name": "number",
                    "title": "Number",
                    "type": "`$STRING`",
                    "short": "The original phone number"
                },
                {
                    "name": "valid",
                    "title": "Valid",
                    "type": "`$BOOLEAN`",
                    "short": "Whether the phone number is valid"
                }
            ],
            "name": "phone_validation",
            "op": {
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
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
                            "parts": [
                                "validate",
                                "{phone_number}"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {
                                "header": [
                                    {
                                        "name": "apikey",
                                        "orig": "apikey",
                                        "type": "`$STRING`",
                                        "kind": "header",
                                        "reqd": true,
                                        "example": "num_live_Nf2vjeM19tHdi42qQ2LaVVMg2IGk1ReU2BYBKnvm"
                                    }
                                ],
                                "params": [
                                    {
                                        "name": "phone_number",
                                        "orig": "phone_number",
                                        "type": "`$STRING`",
                                        "kind": "param",
                                        "reqd": true,
                                        "example": "01613950781"
                                    }
                                ],
                                "query": [
                                    {
                                        "name": "country_code",
                                        "orig": "country_code",
                                        "type": "`$STRING`",
                                        "kind": "query",
                                        "example": "BD",
                                        "field": true
                                    }
                                ]
                            },
                            "select": {
                                "exist": [
                                    "apikey",
                                    "phone_number"
                                ]
                            },
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map