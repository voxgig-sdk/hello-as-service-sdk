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
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.HelloAsServiceSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.GetGreeting().load({ "cc": 1 }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.HELLO_AS_SERVICE_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'get_greeting.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "cc": { "a": true, "h": "Cc", "n": "cc", "r": false, "sh": "Country code detected or used", "t": "`$STRING`", "key$": "cc", "index$": 0 }, "code": { "a": true, "h": "Code", "n": "code", "r": false, "sh": "Language code of the returned greeting", "t": "`$STRING`", "key$": "code", "index$": 1 }, "hello": { "a": true, "h": "Hello", "n": "hello", "r": false, "sh": "The greeting in the requested or detected language", "t": "`$STRING`", "key$": "hello", "index$": 2 }, "ip": { "a": true, "h": "Ip", "n": "ip", "r": false, "sh": "IP address used for the request (if applicable)", "t": "`$STRING`", "key$": "ip", "index$": 3 } }, "name": "get_greeting", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": "US", "k": "query", "n": "cc", "or": "cc", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "8.8.8.8", "k": "query", "n": "ip", "or": "ip", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": "fr", "k": "query", "n": "lang", "or": "lang", "r": false, "t": "`$STRING`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/", "q": {}, "r": {}, "rs": { "kind": "json", "media": "application/json" }, "s": [], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "get_greeting", "name__orig": "get_greeting", "Name": "GetGreeting", "name_": "get_greeting", "name-": "get-greeting", "NAME": "GET_GREETING", "index$": 0 }, { "active": true, "entity": "get_greeting", "key$": "BasicGetGreetingFlow", "kind": "basic", "name": "BasicGetGreetingFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "get_greeting_ref01", "srcdatavar": "get_greeting_ref01_data", "suffix": "_dt0" }, "m": {}, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-get_greeting_ref01" } }], "index$": 0 }] }, 'GetGreeting', { "GET /": { "protocol": "http", "parameters": [{ "name": "ip", "in": "query", "description": "IP address to determine the user's location and return appropriate greeting", "required": false, "schema": { "type": "string", "example": "8.8.8.8" }, "index$": 0 }, { "name": "lang", "in": "query", "description": "Language code (ISO 639-1) to return greeting in specific language", "required": false, "schema": { "type": "string", "example": "fr" }, "index$": 1 }, { "name": "cc", "in": "query", "description": "Country code (ISO 3166-1 alpha-2) to return greeting for specific country", "required": false, "schema": { "type": "string", "example": "US" }, "index$": 2 }] } }, { strict: LIVE_STRICT, t });
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
// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true;
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