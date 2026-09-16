

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"graphical_api","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"example":0,"kind":"query","name":"ac","orig":"ac","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":"en","kind":"query","name":"lang","orig":"lang","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"example":23.09,"kind":"query","name":"lat","orig":"lat","reqd":true,"type":"`$NUMBER`","index$":2},{"active":true,"example":113.17,"kind":"query","name":"lon","orig":"lon","reqd":true,"type":"`$NUMBER`","index$":3},{"active":true,"example":"internal","kind":"query","name":"output","orig":"output","reqd":false,"type":"`$STRING`","index$":4},{"active":true,"example":0,"kind":"query","name":"tzshift","orig":"tzshift","reqd":false,"type":"`$INTEGER`","index$":5},{"active":true,"example":"metric","kind":"query","name":"unit","orig":"unit","reqd":false,"type":"`$STRING`","index$":6}]},"contract":{"id":"GET /bin/astro.php","json":"{\"operationId\":\"getGraphicalForecast\",\"parameters\":[{\"description\":\"Longitude coordinate of the location (float number with precision 0.001)\",\"in\":\"query\",\"name\":\"lon\",\"required\":true,\"schema\":{\"example\":113.17,\"format\":\"float\",\"maximum\":180,\"minimum\":-180,\"type\":\"number\"}},{\"description\":\"Latitude coordinate of the location (float number with precision 0.001)\",\"in\":\"query\",\"name\":\"lat\",\"required\":true,\"schema\":{\"example\":23.09,\"format\":\"float\",\"maximum\":90,\"minimum\":-90,\"type\":\"number\"}},{\"description\":\"Altitude Correction (only applicable in ASTRO forecast)\",\"in\":\"query\",\"name\":\"ac\",\"required\":false,\"schema\":{\"default\":0,\"enum\":[0,2,7],\"type\":\"integer\"}},{\"description\":\"Language for the forecast (not applicable in METEO product)\",\"in\":\"query\",\"name\":\"lang\",\"required\":false,\"schema\":{\"default\":\"en\",\"enum\":[\"en\",\"zh-CN\",\"zh-TW\"],\"type\":\"string\"}},{\"description\":\"Unit system for measurements\",\"in\":\"query\",\"name\":\"unit\",\"required\":false,\"schema\":{\"default\":\"metric\",\"enum\":[\"metric\",\"british\"],\"type\":\"string\"}},{\"description\":\"Output format for graphical API\",\"in\":\"query\",\"name\":\"output\",\"required\":false,\"schema\":{\"default\":\"internal\",\"enum\":[\"internal\"],\"type\":\"string\"}},{\"description\":\"Timezone adjustment\",\"in\":\"query\",\"name\":\"tzshift\",\"required\":false,\"schema\":{\"default\":0,\"enum\":[-1,0,1],\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"image/png\":{\"schema\":{\"format\":\"binary\",\"type\":\"string\"}}},\"description\":\"PNG image containing the weather forecast diagram\"},\"400\":{\"description\":\"Invalid parameters provided\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/bin/astro.php","segments":[{"lit":"bin"},{"lit":"astro.php"}],"select":{"exist":["ac","lang","lat","lon","output","tzshift","unit"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"graphical_api","name__orig":"graphical_api","Name":"GraphicalApi","name_":"graphical_api","name-":"graphical-api","NAME":"GRAPHICAL_API","index$":1}, {"active":true,"entity":"graphical_api","key$":"BasicGraphicalApiFlow","kind":"basic","name":"BasicGraphicalApiFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"graphical_api_ref01","srcdatavar":"graphical_api_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-graphical_api_ref01"}}],"index$":0}]}, 'GraphicalApi')
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
  
