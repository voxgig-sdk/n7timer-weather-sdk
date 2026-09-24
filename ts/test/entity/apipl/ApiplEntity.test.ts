

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"dataseries":{"a":true,"h":"Dataseries","n":"dataseries","r":false,"sh":"Array of forecast data points","t":"`$ARRAY`","union":{"branches":4,"count":1,"depth":1},"key$":"dataseries","index$":0},"init":{"a":true,"h":"Init","n":"init","r":false,"sh":"Initialization time of the forecast model (format: YYYYMMDDHH)","t":"`$STRING`","key$":"init","index$":1},"product":{"a":true,"h":"Product","n":"product","r":false,"sh":"Product type","t":"`$STRING`","key$":"product","index$":2}},"name":"apipl","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /bin/api.pl","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":0,"k":"query","n":"ac","or":"ac","r":false,"t":"`$INTEGER`","index$":0},{"a":true,"ex":"en","k":"query","n":"lang","or":"lang","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":23.09,"k":"query","n":"lat","or":"lat","r":true,"t":"`$NUMBER`","index$":2},{"a":true,"ex":113.17,"k":"query","n":"lon","or":"lon","r":true,"t":"`$NUMBER`","index$":3},{"a":true,"k":"query","n":"output","or":"output","r":true,"t":"`$STRING`","index$":4},{"a":true,"k":"query","n":"product","or":"product","r":true,"t":"`$STRING`","index$":5},{"a":true,"ex":0,"k":"query","n":"tzshift","or":"tzshift","r":false,"t":"`$INTEGER`","index$":6},{"a":true,"ex":"metric","k":"query","n":"unit","or":"unit","r":false,"t":"`$STRING`","index$":7}]},"k":"http","m":"GET","o":"/bin/api.pl","q":{"exist":["ac","lang","lat","lon","output","product","tzshift","unit"]},"r":{},"s":[{"lit":"bin"},{"lit":"api.pl"}],"t":{"req":"`reqdata`","res":"`body.dataseries`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"apipl","name__orig":"apipl","Name":"Apipl","name_":"apipl","name-":"apipl","NAME":"APIPL","index$":0}, {"active":true,"entity":"apipl","key$":"BasicApiplFlow","kind":"basic","name":"BasicApiplFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"apipl_ref01"}}],"index$":0}]}, 'Apipl', {"GET /bin/api.pl":{"protocol":"http","operationId":"getMachineReadableForecast","responses":{"200":{"description":"Weather forecast data in the requested format","content":{"application/json":{"schema":{"type":"object","properties":{"product":{"description":"Product type","enum":["astro","civil","civillight","meteo","two"],"key$":"product","type":"string"},"init":{"description":"Initialization time of the forecast model (format: YYYYMMDDHH)","key$":"init","type":"string"},"dataseries":{"description":"Array of forecast data points","items":{"oneOf":[{"description":"ASTRO product data point","properties":{"cloudcover":{"description":"Cloud cover (1-9, where 1=0-6%, 9=94-100%)","maximum":9,"minimum":1,"type":"integer"},"lifted_index":{"description":"Atmospheric instability index","enum":[-10,-6,-4,-1,2,6,10,15],"type":"integer"},"prec_type":{"description":"Precipitation type","enum":["snow","rain","none"],"type":"string"},"rh2m":{"description":"2m relative humidity (-4 to 16, where -4=0-5%, 16=100%)","maximum":16,"minimum":-4,"type":"integer"},"seeing":{"description":"Astronomical seeing (1-8, where 1=<0.5\", 8=>2.5\")","maximum":8,"minimum":1,"type":"integer"},"temp2m":{"description":"2m temperature in Celsius","maximum":60,"minimum":-76,"type":"integer"},"timepoint":{"description":"Hours from initialization time","type":"integer"},"transparency":{"description":"Atmospheric transparency (1-8, where 1=<0.3, 8=>1 mag per air mass)","maximum":8,"minimum":1,"type":"integer"},"wind10m":{"description":"10m wind information","properties":{"direction":{"description":"Wind direction","enum":["N","NE","E","SE","S","SW","W","NW"],"type":"string"},"speed":{"description":"Wind speed category (1-8, where 1=calm, 8=hurricane)","maximum":8,"minimum":1,"type":"integer"}},"type":"object","x-ref":"#/components/schemas/Wind10m"}},"type":"object","x-ref":"#/components/schemas/AstroDataPoint"},{"description":"CIVIL product data point","properties":{"cloudcover":{"description":"Cloud cover (1-9, where 1=0-6%, 9=94-100%)","maximum":9,"minimum":1,"type":"integer"},"lifted_index":{"description":"Atmospheric instability index","enum":[-10,-6,-4,-1,2,6,10,15],"type":"integer"},"prec_amount":{"description":"Precipitation amount (0-9, where 0=none, 9=>75mm/hr)","maximum":9,"minimum":0,"type":"integer"},"prec_type":{"description":"Precipitation type","enum":["snow","rain","frzr","icep","none"],"type":"string"},"rh2m":{"description":"2m relative humidity percentage","maximum":100,"minimum":0,"type":"integer"},"temp2m":{"description":"2m temperature in Celsius","maximum":60,"minimum":-76,"type":"integer"},"timepoint":{"description":"Hours from initialization time","type":"integer"},"weather":{"description":"Weather type identifier","enum":["clearday","clearnight","pcloudyday","pcloudynight","mcloudyday","mcloudynight","cloudyday","cloudynight","humidday","humidnight","lightrainday","lightrainnight","oshowerday","oshowernight","ishowerday","ishowernight","lightsnowday","lightsnownight","rainday","rainnight","snowday","snownight","rainsnowday","rainsnownight","tsday","tsnight","tsrainday","tsrainnight"],"type":"string"},"wind10m":{"description":"10m wind information","properties":{"direction":{"description":"Wind direction","enum":["N","NE","E","SE","S","SW","W","NW"],"type":"string"},"speed":{"description":"Wind speed category (1-8, where 1=calm, 8=hurricane)","maximum":8,"minimum":1,"type":"integer"}},"type":"object","x-ref":"#/components/schemas/Wind10m"}},"type":"object","x-ref":"#/components/schemas/CivilDataPoint"},{"description":"METEO product data point with atmospheric profile data","properties":{"cloudcover":{"description":"Total cloud cover (1-9)","maximum":9,"minimum":1,"type":"integer"},"highcloud":{"description":"High cloud cover (1-9)","maximum":9,"minimum":1,"type":"integer"},"lifted_index":{"description":"Atmospheric instability index","enum":[-10,-6,-4,-1,2,6,10,15],"type":"integer"},"lowcloud":{"description":"Low cloud cover (1-9)","maximum":9,"minimum":1,"type":"integer"},"midcloud":{"description":"Mid cloud cover (1-9)","maximum":9,"minimum":1,"type":"integer"},"msl_pressure":{"description":"Mean sea level pressure","type":"integer"},"prec_amount":{"description":"Precipitation amount (0-9)","maximum":9,"minimum":0,"type":"integer"},"prec_type":{"description":"Precipitation type","enum":["snow","rain","frzr","icep","none"],"type":"string"},"rh2m":{"description":"2m relative humidity (-4 to 16)","maximum":16,"minimum":-4,"type":"integer"},"rh_profile":{"description":"Relative humidity profile","items":{"properties":{"layer":{"description":"Pressure level","type":"string"},"rh":{"description":"Relative humidity (-4 to 16)","maximum":16,"minimum":-4,"type":"integer"}},"type":"object"},"type":"array"},"snow_depth":{"description":"Snow depth","type":"integer"},"temp2m":{"description":"2m temperature in Celsius","maximum":60,"minimum":-76,"type":"integer"},"timepoint":{"description":"Hours from initialization time","type":"integer"},"wind_profile":{"description":"Wind profile from 950hPa to 200hPa","items":{"properties":{"direction":{"description":"Wind direction","enum":["N","NE","E","SE","S","SW","W","NW"],"type":"string"},"layer":{"description":"Pressure level","type":"string"},"speed":{"description":"Wind speed (1-8)","maximum":8,"minimum":1,"type":"integer"}},"type":"object"},"type":"array"}},"type":"object","x-ref":"#/components/schemas/MeteoDataPoint"},{"description":"Two-Week-Overview product data point","properties":{"cloudcover":{"description":"Cloud cover (1-9)","maximum":9,"minimum":1,"type":"integer"},"date":{"description":"Forecast date (YYYYMMDD)","type":"string"},"lifted_index":{"description":"Atmospheric instability index","enum":[-10,-6,-4,-1,2,6,10,15],"type":"integer"},"prec_type":{"description":"Precipitation type","enum":["snow","rain","frzr","icep","none"],"type":"string"},"rh2m":{"description":"2m relative humidity (-4 to 16)","maximum":16,"minimum":-4,"type":"integer"},"temp2m":{"properties":{"max":{"description":"Maximum 2m temperature in Celsius","maximum":60,"minimum":-76,"type":"integer"},"min":{"description":"Minimum 2m temperature in Celsius","maximum":60,"minimum":-76,"type":"integer"}},"type":"object"},"weather":{"description":"Weather type","enum":["clear","mcloudy","cloudy","rain","snow","ts","tsrain"],"type":"string"},"wind10m":{"description":"10m wind information","properties":{"direction":{"description":"Wind direction","enum":["N","NE","E","SE","S","SW","W","NW"],"type":"string"},"speed":{"description":"Wind speed category (1-8, where 1=calm, 8=hurricane)","maximum":8,"minimum":1,"type":"integer"}},"type":"object","x-ref":"#/components/schemas/Wind10m"}},"type":"object","x-ref":"#/components/schemas/TwoDataPoint"}]},"key$":"dataseries","type":"array"}},"x-ref":"#/components/schemas/ForecastResponse","index$":0},"examples":{"astroForecast":{"summary":"ASTRO product forecast example","value":{"product":"astro","init":"2023010100","dataseries":[{"timepoint":3,"cloudcover":2,"seeing":4,"transparency":3,"lifted_index":2,"rh2m":8,"wind10m":{"direction":"NE","speed":2},"temp2m":15,"prec_type":"none"}]}},"civilForecast":{"summary":"CIVIL product forecast example","value":{"product":"civil","init":"2023010100","dataseries":[{"timepoint":3,"cloudcover":3,"lifted_index":2,"prec_type":"none","prec_amount":0,"temp2m":18,"rh2m":65,"wind10m":{"direction":"SE","speed":3},"weather":"pcloudyday"}]}}}},"application/xml":{"schema":{"type":"string","format":"xml"}}}},"400":{"description":"Invalid parameters provided"}},"parameters":[{"name":"lon","in":"query","description":"Longitude coordinate of the location (float number with precision 0.001)","required":true,"schema":{"type":"number","format":"float","minimum":-180,"maximum":180,"example":113.17},"index$":0},{"name":"lat","in":"query","description":"Latitude coordinate of the location (float number with precision 0.001)","required":true,"schema":{"type":"number","format":"float","minimum":-90,"maximum":90,"example":23.09},"index$":1},{"name":"product","in":"query","description":"Weather product type to retrieve","required":true,"schema":{"type":"string","enum":["astro","civil","civillight","meteo","two"]},"index$":2},{"name":"output","in":"query","description":"Output format for the data","required":true,"schema":{"type":"string","enum":["xml","json"]},"index$":3},{"name":"ac","in":"query","description":"Altitude Correction (only applicable in ASTRO forecast)","required":false,"schema":{"type":"integer","enum":[0,2,7],"default":0},"index$":4},{"name":"lang","in":"query","description":"Language for the forecast (not applicable in METEO product)","required":false,"schema":{"type":"string","enum":["en","zh-CN","zh-TW"],"default":"en"},"index$":5},{"name":"unit","in":"query","description":"Unit system for measurements","required":false,"schema":{"type":"string","enum":["metric","british"],"default":"metric"},"index$":6},{"name":"tzshift","in":"query","description":"Timezone adjustment","required":false,"schema":{"type":"integer","enum":[-1,0,1],"default":0},"index$":7}],"securitySource":"unspecified"}})
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
  
