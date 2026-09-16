

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


describe('ApiplEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when N7TIMER_WEATHER_TEST_LIVE=TRUE.
  afterEach(liveDelay('N7TIMER_WEATHER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = N7timerWeatherSDK.test()
    const ent = testsdk.Apipl()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.N7TIMER_WEATHER_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'apipl.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"dataseries","req":false,"short":"Array of forecast data points","type":"`$ARRAY`","union":{"branches":4,"count":1,"depth":1},"index$":0},{"active":true,"name":"init","req":false,"short":"Initialization time of the forecast model (format: YYYYMMDDHH)","type":"`$STRING`","index$":1},{"active":true,"name":"product","req":false,"short":"Product type","type":"`$STRING`","index$":2}],"name":"apipl","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{"query":[{"active":true,"example":0,"kind":"query","name":"ac","orig":"ac","reqd":false,"type":"`$INTEGER`","index$":0},{"active":true,"example":"en","kind":"query","name":"lang","orig":"lang","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"example":23.09,"kind":"query","name":"lat","orig":"lat","reqd":true,"type":"`$NUMBER`","index$":2},{"active":true,"example":113.17,"kind":"query","name":"lon","orig":"lon","reqd":true,"type":"`$NUMBER`","index$":3},{"active":true,"kind":"query","name":"output","orig":"output","reqd":true,"type":"`$STRING`","index$":4},{"active":true,"kind":"query","name":"product","orig":"product","reqd":true,"type":"`$STRING`","index$":5},{"active":true,"example":0,"kind":"query","name":"tzshift","orig":"tzshift","reqd":false,"type":"`$INTEGER`","index$":6},{"active":true,"example":"metric","kind":"query","name":"unit","orig":"unit","reqd":false,"type":"`$STRING`","index$":7}]},"contract":{"id":"GET /bin/api.pl","json":"{\"operationId\":\"getMachineReadableForecast\",\"parameters\":[{\"description\":\"Longitude coordinate of the location (float number with precision 0.001)\",\"in\":\"query\",\"name\":\"lon\",\"required\":true,\"schema\":{\"example\":113.17,\"format\":\"float\",\"maximum\":180,\"minimum\":-180,\"type\":\"number\"}},{\"description\":\"Latitude coordinate of the location (float number with precision 0.001)\",\"in\":\"query\",\"name\":\"lat\",\"required\":true,\"schema\":{\"example\":23.09,\"format\":\"float\",\"maximum\":90,\"minimum\":-90,\"type\":\"number\"}},{\"description\":\"Weather product type to retrieve\",\"in\":\"query\",\"name\":\"product\",\"required\":true,\"schema\":{\"enum\":[\"astro\",\"civil\",\"civillight\",\"meteo\",\"two\"],\"type\":\"string\"}},{\"description\":\"Output format for the data\",\"in\":\"query\",\"name\":\"output\",\"required\":true,\"schema\":{\"enum\":[\"xml\",\"json\"],\"type\":\"string\"}},{\"description\":\"Altitude Correction (only applicable in ASTRO forecast)\",\"in\":\"query\",\"name\":\"ac\",\"required\":false,\"schema\":{\"default\":0,\"enum\":[0,2,7],\"type\":\"integer\"}},{\"description\":\"Language for the forecast (not applicable in METEO product)\",\"in\":\"query\",\"name\":\"lang\",\"required\":false,\"schema\":{\"default\":\"en\",\"enum\":[\"en\",\"zh-CN\",\"zh-TW\"],\"type\":\"string\"}},{\"description\":\"Unit system for measurements\",\"in\":\"query\",\"name\":\"unit\",\"required\":false,\"schema\":{\"default\":\"metric\",\"enum\":[\"metric\",\"british\"],\"type\":\"string\"}},{\"description\":\"Timezone adjustment\",\"in\":\"query\",\"name\":\"tzshift\",\"required\":false,\"schema\":{\"default\":0,\"enum\":[-1,0,1],\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"examples\":{\"astroForecast\":{\"summary\":\"ASTRO product forecast example\",\"value\":{\"dataseries\":[{\"cloudcover\":2,\"lifted_index\":2,\"prec_type\":\"none\",\"rh2m\":8,\"seeing\":4,\"temp2m\":15,\"timepoint\":3,\"transparency\":3,\"wind10m\":{\"direction\":\"NE\",\"speed\":2}}],\"init\":\"2023010100\",\"product\":\"astro\"}},\"civilForecast\":{\"summary\":\"CIVIL product forecast example\",\"value\":{\"dataseries\":[{\"cloudcover\":3,\"lifted_index\":2,\"prec_amount\":0,\"prec_type\":\"none\",\"rh2m\":65,\"temp2m\":18,\"timepoint\":3,\"weather\":\"pcloudyday\",\"wind10m\":{\"direction\":\"SE\",\"speed\":3}}],\"init\":\"2023010100\",\"product\":\"civil\"}}},\"schema\":{\"properties\":{\"dataseries\":{\"description\":\"Array of forecast data points\",\"items\":{\"oneOf\":[{\"description\":\"ASTRO product data point\",\"properties\":{\"cloudcover\":{\"description\":\"Cloud cover (1-9, where 1=0-6%, 9=94-100%)\",\"maximum\":9,\"minimum\":1,\"type\":\"integer\"},\"lifted_index\":{\"description\":\"Atmospheric instability index\",\"enum\":[-10,-6,-4,-1,2,6,10,15],\"type\":\"integer\"},\"prec_type\":{\"description\":\"Precipitation type\",\"enum\":[\"snow\",\"rain\",\"none\"],\"type\":\"string\"},\"rh2m\":{\"description\":\"2m relative humidity (-4 to 16, where -4=0-5%, 16=100%)\",\"maximum\":16,\"minimum\":-4,\"type\":\"integer\"},\"seeing\":{\"description\":\"Astronomical seeing (1-8, where 1=<0.5\\\", 8=>2.5\\\")\",\"maximum\":8,\"minimum\":1,\"type\":\"integer\"},\"temp2m\":{\"description\":\"2m temperature in Celsius\",\"maximum\":60,\"minimum\":-76,\"type\":\"integer\"},\"timepoint\":{\"description\":\"Hours from initialization time\",\"type\":\"integer\"},\"transparency\":{\"description\":\"Atmospheric transparency (1-8, where 1=<0.3, 8=>1 mag per air mass)\",\"maximum\":8,\"minimum\":1,\"type\":\"integer\"},\"wind10m\":{\"description\":\"10m wind information\",\"properties\":{\"direction\":{\"description\":\"Wind direction\",\"enum\":[\"N\",\"NE\",\"E\",\"SE\",\"S\",\"SW\",\"W\",\"NW\"],\"type\":\"string\"},\"speed\":{\"description\":\"Wind speed category (1-8, where 1=calm, 8=hurricane)\",\"maximum\":8,\"minimum\":1,\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"},{\"description\":\"CIVIL product data point\",\"properties\":{\"cloudcover\":{\"description\":\"Cloud cover (1-9, where 1=0-6%, 9=94-100%)\",\"maximum\":9,\"minimum\":1,\"type\":\"integer\"},\"lifted_index\":{\"description\":\"Atmospheric instability index\",\"enum\":[-10,-6,-4,-1,2,6,10,15],\"type\":\"integer\"},\"prec_amount\":{\"description\":\"Precipitation amount (0-9, where 0=none, 9=>75mm/hr)\",\"maximum\":9,\"minimum\":0,\"type\":\"integer\"},\"prec_type\":{\"description\":\"Precipitation type\",\"enum\":[\"snow\",\"rain\",\"frzr\",\"icep\",\"none\"],\"type\":\"string\"},\"rh2m\":{\"description\":\"2m relative humidity percentage\",\"maximum\":100,\"minimum\":0,\"type\":\"integer\"},\"temp2m\":{\"description\":\"2m temperature in Celsius\",\"maximum\":60,\"minimum\":-76,\"type\":\"integer\"},\"timepoint\":{\"description\":\"Hours from initialization time\",\"type\":\"integer\"},\"weather\":{\"description\":\"Weather type identifier\",\"enum\":[\"clearday\",\"clearnight\",\"pcloudyday\",\"pcloudynight\",\"mcloudyday\",\"mcloudynight\",\"cloudyday\",\"cloudynight\",\"humidday\",\"humidnight\",\"lightrainday\",\"lightrainnight\",\"oshowerday\",\"oshowernight\",\"ishowerday\",\"ishowernight\",\"lightsnowday\",\"lightsnownight\",\"rainday\",\"rainnight\",\"snowday\",\"snownight\",\"rainsnowday\",\"rainsnownight\",\"tsday\",\"tsnight\",\"tsrainday\",\"tsrainnight\"],\"type\":\"string\"},\"wind10m\":{\"description\":\"10m wind information\",\"properties\":{\"direction\":{\"description\":\"Wind direction\",\"enum\":[\"N\",\"NE\",\"E\",\"SE\",\"S\",\"SW\",\"W\",\"NW\"],\"type\":\"string\"},\"speed\":{\"description\":\"Wind speed category (1-8, where 1=calm, 8=hurricane)\",\"maximum\":8,\"minimum\":1,\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"},{\"description\":\"METEO product data point with atmospheric profile data\",\"properties\":{\"cloudcover\":{\"description\":\"Total cloud cover (1-9)\",\"maximum\":9,\"minimum\":1,\"type\":\"integer\"},\"highcloud\":{\"description\":\"High cloud cover (1-9)\",\"maximum\":9,\"minimum\":1,\"type\":\"integer\"},\"lifted_index\":{\"description\":\"Atmospheric instability index\",\"enum\":[-10,-6,-4,-1,2,6,10,15],\"type\":\"integer\"},\"lowcloud\":{\"description\":\"Low cloud cover (1-9)\",\"maximum\":9,\"minimum\":1,\"type\":\"integer\"},\"midcloud\":{\"description\":\"Mid cloud cover (1-9)\",\"maximum\":9,\"minimum\":1,\"type\":\"integer\"},\"msl_pressure\":{\"description\":\"Mean sea level pressure\",\"type\":\"integer\"},\"prec_amount\":{\"description\":\"Precipitation amount (0-9)\",\"maximum\":9,\"minimum\":0,\"type\":\"integer\"},\"prec_type\":{\"description\":\"Precipitation type\",\"enum\":[\"snow\",\"rain\",\"frzr\",\"icep\",\"none\"],\"type\":\"string\"},\"rh2m\":{\"description\":\"2m relative humidity (-4 to 16)\",\"maximum\":16,\"minimum\":-4,\"type\":\"integer\"},\"rh_profile\":{\"description\":\"Relative humidity profile\",\"items\":{\"properties\":{\"layer\":{\"description\":\"Pressure level\",\"type\":\"string\"},\"rh\":{\"description\":\"Relative humidity (-4 to 16)\",\"maximum\":16,\"minimum\":-4,\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"snow_depth\":{\"description\":\"Snow depth\",\"type\":\"integer\"},\"temp2m\":{\"description\":\"2m temperature in Celsius\",\"maximum\":60,\"minimum\":-76,\"type\":\"integer\"},\"timepoint\":{\"description\":\"Hours from initialization time\",\"type\":\"integer\"},\"wind_profile\":{\"description\":\"Wind profile from 950hPa to 200hPa\",\"items\":{\"properties\":{\"direction\":{\"description\":\"Wind direction\",\"enum\":[\"N\",\"NE\",\"E\",\"SE\",\"S\",\"SW\",\"W\",\"NW\"],\"type\":\"string\"},\"layer\":{\"description\":\"Pressure level\",\"type\":\"string\"},\"speed\":{\"description\":\"Wind speed (1-8)\",\"maximum\":8,\"minimum\":1,\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"},{\"description\":\"Two-Week-Overview product data point\",\"properties\":{\"cloudcover\":{\"description\":\"Cloud cover (1-9)\",\"maximum\":9,\"minimum\":1,\"type\":\"integer\"},\"date\":{\"description\":\"Forecast date (YYYYMMDD)\",\"type\":\"string\"},\"lifted_index\":{\"description\":\"Atmospheric instability index\",\"enum\":[-10,-6,-4,-1,2,6,10,15],\"type\":\"integer\"},\"prec_type\":{\"description\":\"Precipitation type\",\"enum\":[\"snow\",\"rain\",\"frzr\",\"icep\",\"none\"],\"type\":\"string\"},\"rh2m\":{\"description\":\"2m relative humidity (-4 to 16)\",\"maximum\":16,\"minimum\":-4,\"type\":\"integer\"},\"temp2m\":{\"properties\":{\"max\":{\"description\":\"Maximum 2m temperature in Celsius\",\"maximum\":60,\"minimum\":-76,\"type\":\"integer\"},\"min\":{\"description\":\"Minimum 2m temperature in Celsius\",\"maximum\":60,\"minimum\":-76,\"type\":\"integer\"}},\"type\":\"object\"},\"weather\":{\"description\":\"Weather type\",\"enum\":[\"clear\",\"mcloudy\",\"cloudy\",\"rain\",\"snow\",\"ts\",\"tsrain\"],\"type\":\"string\"},\"wind10m\":{\"description\":\"10m wind information\",\"properties\":{\"direction\":{\"description\":\"Wind direction\",\"enum\":[\"N\",\"NE\",\"E\",\"SE\",\"S\",\"SW\",\"W\",\"NW\"],\"type\":\"string\"},\"speed\":{\"description\":\"Wind speed category (1-8, where 1=calm, 8=hurricane)\",\"maximum\":8,\"minimum\":1,\"type\":\"integer\"}},\"type\":\"object\"}},\"type\":\"object\"}]},\"type\":\"array\"},\"init\":{\"description\":\"Initialization time of the forecast model (format: YYYYMMDDHH)\",\"type\":\"string\"},\"product\":{\"description\":\"Product type\",\"enum\":[\"astro\",\"civil\",\"civillight\",\"meteo\",\"two\"],\"type\":\"string\"}},\"type\":\"object\"}},\"application/xml\":{\"schema\":{\"format\":\"xml\",\"type\":\"string\"}}},\"description\":\"Weather forecast data in the requested format\"},\"400\":{\"description\":\"Invalid parameters provided\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/bin/api.pl","segments":[{"lit":"bin"},{"lit":"api.pl"}],"select":{"exist":["ac","lang","lat","lon","output","product","tzshift","unit"]},"transform":{"req":"`reqdata`","res":"`body.dataseries`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"apipl","name__orig":"apipl","Name":"Apipl","name_":"apipl","name-":"apipl","NAME":"APIPL","index$":0}, {"active":true,"entity":"apipl","key$":"BasicApiplFlow","kind":"basic","name":"BasicApiplFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"apipl_ref01"}}],"index$":0}]}, 'Apipl')
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
  
