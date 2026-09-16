"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('PhoneValidationEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when PHONE_NUMBER_VALIDATOR_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('PHONE_NUMBER_VALIDATOR_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.PhoneNumberValidatorSDK.test();
        const ent = testsdk.PhoneValidation();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.PHONE_NUMBER_VALIDATOR_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'phone_validation.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "carrier", "req": false, "short": "Name of the carrier/operator", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "country_code", "req": false, "short": "ISO country code", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "country_name", "req": false, "short": "Name of the country", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "country_prefix", "req": false, "short": "Country dialing prefix", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "international_format", "req": false, "short": "Phone number in international format", "type": "`$STRING`", "index$": 4 }, { "active": true, "name": "line_type", "req": false, "short": "Type of phone line (mobile, landline, etc.)", "type": "`$STRING`", "index$": 5 }, { "active": true, "name": "local_format", "req": false, "short": "Phone number in local format", "type": "`$STRING`", "index$": 6 }, { "active": true, "name": "number", "req": false, "short": "The original phone number", "type": "`$STRING`", "index$": 7 }, { "active": true, "name": "valid", "req": false, "short": "Whether the phone number is valid", "type": "`$BOOLEAN`", "index$": 8 }], "name": "phone_validation", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "header": [{ "active": true, "example": "num_live_Nf2vjeM19tHdi42qQ2LaVVMg2IGk1ReU2BYBKnvm", "kind": "header", "name": "apikey", "orig": "apikey", "reqd": true, "type": "`$STRING`" }], "params": [{ "active": true, "example": "01613950781", "kind": "param", "name": "phone_number", "orig": "phone_number", "reqd": true, "type": "`$STRING`", "index$": 0 }], "query": [{ "active": true, "example": "BD", "kind": "query", "name": "country_code", "orig": "country_code", "reqd": false, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /validate/{phone_number}", "json": "{\"operationId\":\"validatePhoneNumber\",\"parameters\":[{\"description\":\"The phone number to validate\",\"example\":\"01613950781\",\"in\":\"path\",\"name\":\"phone_number\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"API key for authentication\",\"example\":\"num_live_Nf2vjeM19tHdi42qQ2LaVVMg2IGk1ReU2BYBKnvm\",\"in\":\"header\",\"name\":\"apikey\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Two-letter ISO country code to help with validation\",\"example\":\"BD\",\"in\":\"query\",\"name\":\"country_code\",\"required\":false,\"schema\":{\"pattern\":\"^[A-Z]{2}$\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"example\":{\"carrier\":\"Grameenphone\",\"country_code\":\"BD\",\"country_name\":\"Bangladesh\",\"country_prefix\":\"+880\",\"international_format\":\"+8801613950781\",\"line_type\":\"mobile\",\"local_format\":\"01613950781\",\"number\":\"01613950781\",\"valid\":true},\"schema\":{\"properties\":{\"carrier\":{\"description\":\"Name of the carrier/operator\",\"type\":\"string\"},\"country_code\":{\"description\":\"ISO country code\",\"type\":\"string\"},\"country_name\":{\"description\":\"Name of the country\",\"type\":\"string\"},\"country_prefix\":{\"description\":\"Country dialing prefix\",\"type\":\"string\"},\"international_format\":{\"description\":\"Phone number in international format\",\"type\":\"string\"},\"line_type\":{\"description\":\"Type of phone line (mobile, landline, etc.)\",\"type\":\"string\"},\"local_format\":{\"description\":\"Phone number in local format\",\"type\":\"string\"},\"number\":{\"description\":\"The original phone number\",\"type\":\"string\"},\"valid\":{\"description\":\"Whether the phone number is valid\",\"type\":\"boolean\"}},\"type\":\"object\"}}},\"description\":\"Successful validation response\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - Invalid phone number format\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - Invalid or missing API key\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Too many requests - Rate limit exceeded\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Obtain from https://api.numlookupapi.com\",\"in\":\"header\",\"name\":\"apikey\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/validate/{phone_number}", "segments": [{ "lit": "validate" }, { "var": "phone_number" }], "select": { "exist": ["apikey", "country_code", "phone_number"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [["validate"]] }, "key$": "phone_validation", "name__orig": "phone_validation", "Name": "PhoneValidation", "name_": "phone_validation", "name-": "phone-validation", "NAME": "PHONE_VALIDATION", "index$": 0 }, { "active": true, "entity": "phone_validation", "key$": "BasicPhoneValidationFlow", "kind": "basic", "name": "BasicPhoneValidationFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "phone_validation_ref01", "srcdatavar": "phone_validation_ref01_data", "suffix": "_dt0" }, "match": { "id": "phone_validation01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-phone_validation_ref01" } }], "index$": 0 }] }, 'PhoneValidation');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let phone_validation_ref01_data = Object.values(setup.data.existing.phone_validation)[0];
        // LOAD: skipped — no entity id field and load requires path params.
        // Entity-var is declared here so later flow steps still compile.
        const phone_validation_ref01_ent = client.PhoneValidation();
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/phone_validation/PhoneValidationTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.PhoneNumberValidatorSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['phone_validation01', 'phone_validation02', 'phone_validation03', 'validate01', 'validate02', 'validate03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'PHONE_NUMBER_VALIDATOR_TEST_PHONE_VALIDATION_ENTID': idmap,
        'PHONE_NUMBER_VALIDATOR_TEST_LIVE': 'FALSE',
        'PHONE_NUMBER_VALIDATOR_TEST_EXPLAIN': 'FALSE',
        'PHONE_NUMBER_VALIDATOR_APIKEY': '',
    });
    idmap = env['PHONE_NUMBER_VALIDATOR_TEST_PHONE_VALIDATION_ENTID'];
    const live = 'TRUE' === env.PHONE_NUMBER_VALIDATOR_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['PHONE_NUMBER_VALIDATOR_TEST_PHONE_VALIDATION_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.PhoneNumberValidatorSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.PHONE_NUMBER_VALIDATOR_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.PHONE_NUMBER_VALIDATOR_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=PhoneValidationEntity.test.js.map