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
(0, node_test_1.describe)('ApiplEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when N7TIMER_WEATHER_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('N7TIMER_WEATHER_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.N7timerWeatherSDK.test();
        const ent = testsdk.Apipl();
        (0, node_assert_1.default)(null != ent);
    });
    class FailHook extends __1.BaseFeature {
        name = 'failhook';
        version = '0.0.1';
        active = true;
        unexpected = 0;
        init() { }
        PreSpec() { throw new Error('apipl hook failed'); }
        PreUnexpected() { this.unexpected++; }
    }
    (0, node_test_1.test)('stream-error', async () => {
        const offline = { net: { offline: true } };
        await node_assert_1.default.rejects(async () => {
            for await (const _item of __1.N7timerWeatherSDK.test(offline).Apipl().stream('list')) { }
        }, /offline/);
        for await (const _item of __1.N7timerWeatherSDK.test(offline).Apipl()
            .stream('list', undefined, { ctrl: { throw: false } })) { }
        if (null != __1.config.feature?.rbac) {
            const denied = __1.N7timerWeatherSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } });
            await node_assert_1.default.rejects(async () => {
                for await (const _item of denied.Apipl().stream('list')) { }
            }, (err) => 'rbac_denied' === err.code);
        }
    });
    (0, node_test_1.test)('stream-ctrl', async () => {
        const explain = {};
        const ctrl = { explain };
        for await (const _item of __1.N7timerWeatherSDK.test().Apipl().stream('list', undefined, { ctrl })) { }
        node_assert_1.default.deepStrictEqual(Object.keys(ctrl), ['explain']);
        (0, node_assert_1.default)(explain === ctrl.explain && 0 < Object.keys(explain).length);
    });
    (0, node_test_1.test)('unexpected', async () => {
        const hook = new FailHook();
        const client = new __1.N7timerWeatherSDK({ feature: { test: { active: true } }, extend: [hook] });
        await node_assert_1.default.rejects(client.Apipl().list(), /hook failed/);
        (0, node_assert_1.default)(0 < hook.unexpected);
        const fired = hook.unexpected;
        node_assert_1.default.strictEqual(await client.Apipl().list(undefined, { throw: false }), undefined);
        (0, node_assert_1.default)(fired < hook.unexpected);
    });
    (0, node_test_1.test)('validate', async (t) => {
        if (null == __1.config.feature?.validate) {
            t.skip('feature not present in this SDK: validate');
            return;
        }
        const client = __1.N7timerWeatherSDK.test(undefined, { feature: { validate: { active: true } } });
        await node_assert_1.default.rejects(client.Apipl().list({ "ac": "x", "lat": 1, "lon": 1, "output": "x", "product": "x" }), (err) => 'validate_failed' === err.code);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.N7TIMER_WEATHER_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'apipl.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "dataseries": { "a": true, "h": "Dataseries", "n": "dataseries", "r": false, "sh": "Array of forecast data points", "t": "`$ARRAY`", "union": { "branches": 4, "count": 1, "depth": 1 }, "key$": "dataseries", "index$": 0 }, "init": { "a": true, "h": "Init", "n": "init", "r": false, "sh": "Initialization time of the forecast model (format: YYYYMMDDHH)", "t": "`$STRING`", "key$": "init", "index$": 1 }, "product": { "a": true, "h": "Product", "n": "product", "r": false, "sh": "Product type", "t": "`$STRING`", "key$": "product", "index$": 2 } }, "name": "apipl", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /bin/api.pl", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "ex": 0, "k": "query", "n": "ac", "or": "ac", "r": false, "t": "`$INTEGER`", "index$": 0 }, { "a": true, "ex": "en", "k": "query", "n": "lang", "or": "lang", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": 23.09, "k": "query", "n": "lat", "or": "lat", "r": true, "t": "`$NUMBER`", "index$": 2 }, { "a": true, "ex": 113.17, "k": "query", "n": "lon", "or": "lon", "r": true, "t": "`$NUMBER`", "index$": 3 }, { "a": true, "k": "query", "n": "output", "or": "output", "r": true, "t": "`$STRING`", "index$": 4 }, { "a": true, "k": "query", "n": "product", "or": "product", "r": true, "t": "`$STRING`", "index$": 5 }, { "a": true, "ex": 0, "k": "query", "n": "tzshift", "or": "tzshift", "r": false, "t": "`$INTEGER`", "index$": 6 }, { "a": true, "ex": "metric", "k": "query", "n": "unit", "or": "unit", "r": false, "t": "`$STRING`", "index$": 7 }] }, "k": "http", "m": "GET", "o": "/bin/api.pl", "q": { "exist": ["lat", "lon", "output", "product"] }, "r": {}, "rs": { "alternatives": [{ "kind": "raw", "media": "application/xml" }], "kind": "json", "media": "application/json" }, "s": [{ "lit": "bin" }, { "lit": "api.pl" }], "t": { "req": "`reqdata`", "res": "`body.dataseries`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "apipl", "name__orig": "apipl", "Name": "Apipl", "name_": "apipl", "name-": "apipl", "NAME": "APIPL", "index$": 0 }, { "active": true, "entity": "apipl", "key$": "BasicApiplFlow", "kind": "basic", "name": "BasicApiplFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "apipl_ref01" } }], "index$": 0 }] }, 'Apipl', { "GET /bin/api.pl": { "protocol": "http", "parameters": [{ "name": "lon", "in": "query", "description": "Longitude coordinate of the location (float number with precision 0.001)", "required": true, "schema": { "type": "number", "format": "float", "minimum": -180, "maximum": 180, "example": 113.17 }, "index$": 0 }, { "name": "lat", "in": "query", "description": "Latitude coordinate of the location (float number with precision 0.001)", "required": true, "schema": { "type": "number", "format": "float", "minimum": -90, "maximum": 90, "example": 23.09 }, "index$": 1 }, { "name": "product", "in": "query", "description": "Weather product type to retrieve", "required": true, "schema": { "type": "string", "enum": ["astro", "civil", "civillight", "meteo", "two"] }, "index$": 2 }, { "name": "output", "in": "query", "description": "Output format for the data", "required": true, "schema": { "type": "string", "enum": ["xml", "json"] }, "index$": 3 }, { "name": "ac", "in": "query", "description": "Altitude Correction (only applicable in ASTRO forecast)", "required": false, "schema": { "type": "integer", "enum": [0, 2, 7], "default": 0 }, "index$": 4 }, { "name": "lang", "in": "query", "description": "Language for the forecast (not applicable in METEO product)", "required": false, "schema": { "type": "string", "enum": ["en", "zh-CN", "zh-TW"], "default": "en" }, "index$": 5 }, { "name": "unit", "in": "query", "description": "Unit system for measurements", "required": false, "schema": { "type": "string", "enum": ["metric", "british"], "default": "metric" }, "index$": 6 }, { "name": "tzshift", "in": "query", "description": "Timezone adjustment", "required": false, "schema": { "type": "integer", "enum": [-1, 0, 1], "default": 0 }, "index$": 7 }] } }, { strict: LIVE_STRICT, t });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let apipl_ref01_data = Object.values(setup.data.existing.apipl)[0];
        // LIST
        const apipl_ref01_ent = client.Apipl();
        const apipl_ref01_match = {};
        const apipl_ref01_list = (await apipl_ref01_ent.list(apipl_ref01_match)).map((e) => e.data());
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
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/apipl/ApiplTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.N7timerWeatherSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['apipl01', 'apipl02', 'apipl03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'N7TIMER_WEATHER_TEST_APIPL_ENTID': idmap,
        'N7TIMER_WEATHER_TEST_LIVE': 'FALSE',
        'N7TIMER_WEATHER_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['N7TIMER_WEATHER_TEST_APIPL_ENTID'];
    const live = 'TRUE' === env.N7TIMER_WEATHER_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['N7TIMER_WEATHER_TEST_APIPL_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.N7timerWeatherSDK(merge([
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
        explain: 'TRUE' === env.N7TIMER_WEATHER_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=ApiplEntity.test.js.map