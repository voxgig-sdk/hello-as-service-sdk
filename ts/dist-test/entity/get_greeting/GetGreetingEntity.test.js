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
(0, node_test_1.describe)('GetGreetingEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when HELLO_AS_SERVICE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('HELLO_AS_SERVICE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.HelloAsServiceSDK.test();
        const ent = testsdk.GetGreeting();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HELLO_AS_SERVICE_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'get_greeting.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "cc", "req": false, "short": "Country code detected or used", "type": "`$STRING`", "index$": 0 }, { "active": true, "name": "code", "req": false, "short": "Language code of the returned greeting", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "hello", "req": false, "short": "The greeting in the requested or detected language", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "ip", "req": false, "short": "IP address used for the request (if applicable)", "type": "`$STRING`", "index$": 3 }], "name": "get_greeting", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": "US", "kind": "query", "name": "cc", "orig": "cc", "reqd": false, "type": "`$STRING`", "index$": 0 }, { "active": true, "example": "8.8.8.8", "kind": "query", "name": "ip", "orig": "ip", "reqd": false, "type": "`$STRING`", "index$": 1 }, { "active": true, "example": "fr", "kind": "query", "name": "lang", "orig": "lang", "reqd": false, "type": "`$STRING`", "index$": 2 }] }, "contract": { "id": "GET /", "json": "{\"operationId\":\"getGreeting\",\"parameters\":[{\"description\":\"IP address to determine the user's location and return appropriate greeting\",\"in\":\"query\",\"name\":\"ip\",\"required\":false,\"schema\":{\"example\":\"8.8.8.8\",\"type\":\"string\"}},{\"description\":\"Language code (ISO 639-1) to return greeting in specific language\",\"in\":\"query\",\"name\":\"lang\",\"required\":false,\"schema\":{\"example\":\"fr\",\"type\":\"string\"}},{\"description\":\"Country code (ISO 3166-1 alpha-2) to return greeting for specific country\",\"in\":\"query\",\"name\":\"cc\",\"required\":false,\"schema\":{\"example\":\"US\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"english\":{\"summary\":\"English greeting\",\"value\":{\"cc\":\"US\",\"code\":\"en\",\"hello\":\"Hello\"}},\"french\":{\"summary\":\"French greeting\",\"value\":{\"cc\":\"FR\",\"code\":\"fr\",\"hello\":\"Bonjour\"}},\"spanish\":{\"summary\":\"Spanish greeting\",\"value\":{\"cc\":\"ES\",\"code\":\"es\",\"hello\":\"Hola\"}}},\"schema\":{\"properties\":{\"cc\":{\"description\":\"Country code detected or used\",\"example\":\"US\",\"type\":\"string\"},\"code\":{\"description\":\"Language code of the returned greeting\",\"example\":\"en\",\"type\":\"string\"},\"hello\":{\"description\":\"The greeting in the requested or detected language\",\"example\":\"Hello\",\"type\":\"string\"},\"ip\":{\"description\":\"IP address used for the request (if applicable)\",\"example\":\"8.8.8.8\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response with localized greeting\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Invalid parameter\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Bad request - Invalid parameters\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"example\":\"Server error\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/", "segments": [], "select": { "exist": ["cc", "ip", "lang"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "get_greeting", "name__orig": "get_greeting", "Name": "GetGreeting", "name_": "get_greeting", "name-": "get-greeting", "NAME": "GET_GREETING", "index$": 0 }, { "active": true, "entity": "get_greeting", "key$": "BasicGetGreetingFlow", "kind": "basic", "name": "BasicGetGreetingFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "get_greeting_ref01", "srcdatavar": "get_greeting_ref01_data", "suffix": "_dt0" }, "match": {}, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-get_greeting_ref01" } }], "index$": 0 }] }, 'GetGreeting');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let get_greeting_ref01_data = Object.values(setup.data.existing.get_greeting)[0];
        // LOAD
        const get_greeting_ref01_ent = client.GetGreeting();
        const get_greeting_ref01_match_dt0 = {};
        const get_greeting_ref01_data_dt0 = (await get_greeting_ref01_ent.load(get_greeting_ref01_match_dt0)).data();
        (0, node_assert_1.default)(null != get_greeting_ref01_data_dt0);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/get_greeting/GetGreetingTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.HelloAsServiceSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['get_greeting01', 'get_greeting02', 'get_greeting03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'HELLO_AS_SERVICE_TEST_GET_GREETING_ENTID': idmap,
        'HELLO_AS_SERVICE_TEST_LIVE': 'FALSE',
        'HELLO_AS_SERVICE_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['HELLO_AS_SERVICE_TEST_GET_GREETING_ENTID'];
    const live = 'TRUE' === env.HELLO_AS_SERVICE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['HELLO_AS_SERVICE_TEST_GET_GREETING_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.HelloAsServiceSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
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
        explain: 'TRUE' === env.HELLO_AS_SERVICE_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=GetGreetingEntity.test.js.map