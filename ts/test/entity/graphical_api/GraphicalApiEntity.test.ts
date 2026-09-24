

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { N7timerWeatherSDK, BaseFeature, stdutil } from '../../..'

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


describe('GraphicalApiEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when N7TIMER_WEATHER_TEST_LIVE=TRUE.
  afterEach(liveDelay('N7TIMER_WEATHER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = N7timerWeatherSDK.test()
    const ent = testsdk.GraphicalApi()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.N7TIMER_WEATHER_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'graphical_api.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{},"name":"graphical_api","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /bin/astro.php","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":0,"k":"query","n":"ac","or":"ac","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":"en","k":"query","n":"lang","or":"lang","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":23.09,"k":"query","n":"lat","or":"lat","r":true,"t":"`$NUMBER`","index$":2},{"a":true,"ex":113.17,"k":"query","n":"lon","or":"lon","r":true,"t":"`$NUMBER`","index$":3},{"a":true,"ex":"internal","k":"query","n":"output","or":"output","r":false,"t":"`$STRING`","index$":4},{"a":true,"ex":0,"k":"query","n":"tzshift","or":"tzshift","r":false,"t":"`$INTEGER`","index$":5},{"a":true,"ex":"metric","k":"query","n":"unit","or":"unit","r":false,"t":"`$STRING`","index$":6}]},"k":"http","m":"GET","o":"/bin/astro.php","q":{"exist":["ac","lang","lat","lon","output","tzshift","unit"]},"r":{},"s":[{"lit":"bin"},{"lit":"astro.php"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"graphical_api","name__orig":"graphical_api","Name":"GraphicalApi","name_":"graphical_api","name-":"graphical-api","NAME":"GRAPHICAL_API","index$":1}, {"active":true,"entity":"graphical_api","key$":"BasicGraphicalApiFlow","kind":"basic","name":"BasicGraphicalApiFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"graphical_api_ref01","srcdatavar":"graphical_api_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-graphical_api_ref01"}}],"index$":0}]}, 'GraphicalApi', {"GET /bin/astro.php":{"protocol":"http","operationId":"getGraphicalForecast","responses":{"200":{"description":"PNG image containing the weather forecast diagram","content":{"image/png":{"schema":{"type":"string","format":"binary"}}}},"400":{"description":"Invalid parameters provided"}},"parameters":[{"name":"lon","in":"query","description":"Longitude coordinate of the location (float number with precision 0.001)","required":true,"schema":{"type":"number","format":"float","minimum":-180,"maximum":180,"example":113.17},"index$":0},{"name":"lat","in":"query","description":"Latitude coordinate of the location (float number with precision 0.001)","required":true,"schema":{"type":"number","format":"float","minimum":-90,"maximum":90,"example":23.09},"index$":1},{"name":"ac","in":"query","description":"Altitude Correction (only applicable in ASTRO forecast)","required":false,"schema":{"type":"integer","enum":[0,2,7],"default":0},"index$":2},{"name":"lang","in":"query","description":"Language for the forecast (not applicable in METEO product)","required":false,"schema":{"type":"string","enum":["en","zh-CN","zh-TW"],"default":"en"},"index$":3},{"name":"unit","in":"query","description":"Unit system for measurements","required":false,"schema":{"type":"string","enum":["metric","british"],"default":"metric"},"index$":4},{"name":"output","in":"query","description":"Output format for graphical API","required":false,"schema":{"type":"string","enum":["internal"],"default":"internal"},"index$":5},{"name":"tzshift","in":"query","description":"Timezone adjustment","required":false,"schema":{"type":"integer","enum":[-1,0,1],"default":0},"index$":6}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let graphical_api_ref01_data = Object.values(setup.data.existing.graphical_api)[0] as any

    // LOAD
    const graphical_api_ref01_ent = client.GraphicalApi()
    const graphical_api_ref01_match_dt0: any = {}
    const graphical_api_ref01_data_dt0 = (await graphical_api_ref01_ent.load(graphical_api_ref01_match_dt0)).data()
    assert(null != graphical_api_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/graphical_api/GraphicalApiTestData.json')

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
    ['graphical_api01','graphical_api02','graphical_api03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'N7TIMER_WEATHER_TEST_GRAPHICAL_API_ENTID': idmap,
    'N7TIMER_WEATHER_TEST_LIVE': 'FALSE',
    'N7TIMER_WEATHER_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['N7TIMER_WEATHER_TEST_GRAPHICAL_API_ENTID']

  const live = 'TRUE' === env.N7TIMER_WEATHER_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['N7TIMER_WEATHER_TEST_GRAPHICAL_API_ENTID']
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
  
