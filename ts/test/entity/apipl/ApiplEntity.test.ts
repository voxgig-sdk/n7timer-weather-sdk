

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { N7timerWeatherSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('ApiplEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when N7TIMER_WEATHER_TEST_LIVE=TRUE.
  afterEach(liveDelay('N7TIMER_WEATHER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = N7timerWeatherSDK.test()
    const ent = testsdk.Apipl()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('apipl hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of N7timerWeatherSDK.test(offline).Apipl().stream('list')) { }
    }, /offline/)

    for await (const _item of N7timerWeatherSDK.test(offline).Apipl()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = N7timerWeatherSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Apipl().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of N7timerWeatherSDK.test().Apipl().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new N7timerWeatherSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Apipl().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Apipl().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = N7timerWeatherSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Apipl().list({"ac":"x","lat":1,"lon":1,"output":"x","product":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.N7TIMER_WEATHER_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'apipl.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"dataseries":{"a":true,"h":"Dataseries","n":"dataseries","r":false,"sh":"Array of forecast data points","t":"`$ARRAY`","union":{"branches":4,"count":1,"depth":1},"key$":"dataseries","index$":0},"init":{"a":true,"h":"Init","n":"init","r":false,"sh":"Initialization time of the forecast model (format: YYYYMMDDHH)","t":"`$STRING`","key$":"init","index$":1},"product":{"a":true,"h":"Product","n":"product","r":false,"sh":"Product type","t":"`$STRING`","key$":"product","index$":2}},"name":"apipl","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /bin/api.pl","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":0,"k":"query","n":"ac","or":"ac","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":"en","k":"query","n":"lang","or":"lang","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":23.09,"k":"query","n":"lat","or":"lat","r":true,"t":"`$NUMBER`","index$":2},{"a":true,"ex":113.17,"k":"query","n":"lon","or":"lon","r":true,"t":"`$NUMBER`","index$":3},{"a":true,"k":"query","n":"output","or":"output","r":true,"t":"`$STRING`","index$":4},{"a":true,"k":"query","n":"product","or":"product","r":true,"t":"`$STRING`","index$":5},{"a":true,"ex":0,"k":"query","n":"tzshift","or":"tzshift","r":false,"t":"`$INTEGER`","index$":6},{"a":true,"ex":"metric","k":"query","n":"unit","or":"unit","r":false,"t":"`$STRING`","index$":7}]},"k":"http","m":"GET","o":"/bin/api.pl","q":{"exist":["lat","lon","output","product"]},"r":{},"rs":{"alternatives":[{"kind":"raw","media":"application/xml"}],"kind":"json","media":"application/json"},"s":[{"lit":"bin"},{"lit":"api.pl"}],"t":{"req":"`reqdata`","res":"`body.dataseries`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"apipl","name__orig":"apipl","Name":"Apipl","name_":"apipl","name-":"apipl","NAME":"APIPL","index$":0}, {"active":true,"entity":"apipl","key$":"BasicApiplFlow","kind":"basic","name":"BasicApiplFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"apipl_ref01"}}],"index$":0}]}, 'Apipl', {"GET /bin/api.pl":{"protocol":"http","parameters":[{"name":"lon","in":"query","description":"Longitude coordinate of the location (float number with precision 0.001)","required":true,"schema":{"type":"number","format":"float","minimum":-180,"maximum":180,"example":113.17},"index$":0},{"name":"lat","in":"query","description":"Latitude coordinate of the location (float number with precision 0.001)","required":true,"schema":{"type":"number","format":"float","minimum":-90,"maximum":90,"example":23.09},"index$":1},{"name":"product","in":"query","description":"Weather product type to retrieve","required":true,"schema":{"type":"string","enum":["astro","civil","civillight","meteo","two"]},"index$":2},{"name":"output","in":"query","description":"Output format for the data","required":true,"schema":{"type":"string","enum":["xml","json"]},"index$":3},{"name":"ac","in":"query","description":"Altitude Correction (only applicable in ASTRO forecast)","required":false,"schema":{"type":"integer","enum":[0,2,7],"default":0},"index$":4},{"name":"lang","in":"query","description":"Language for the forecast (not applicable in METEO product)","required":false,"schema":{"type":"string","enum":["en","zh-CN","zh-TW"],"default":"en"},"index$":5},{"name":"unit","in":"query","description":"Unit system for measurements","required":false,"schema":{"type":"string","enum":["metric","british"],"default":"metric"},"index$":6},{"name":"tzshift","in":"query","description":"Timezone adjustment","required":false,"schema":{"type":"integer","enum":[-1,0,1],"default":0},"index$":7}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let apipl_ref01_data = Object.values(setup.data.existing.apipl)[0] as any

    // LIST
    const apipl_ref01_ent = client.Apipl()
    const apipl_ref01_match: any = {}

    const apipl_ref01_list = (await apipl_ref01_ent.list(apipl_ref01_match)).map((e: any) => e.data())


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/apipl/ApiplTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = N7timerWeatherSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['apipl01','apipl02','apipl03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'N7TIMER_WEATHER_TEST_APIPL_ENTID': idmap,
    'N7TIMER_WEATHER_TEST_LIVE': 'FALSE',
    'N7TIMER_WEATHER_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['N7TIMER_WEATHER_TEST_APIPL_ENTID']

  const live = 'TRUE' === env.N7TIMER_WEATHER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['N7TIMER_WEATHER_TEST_APIPL_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new N7timerWeatherSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
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
  }

  return setup
}
  
