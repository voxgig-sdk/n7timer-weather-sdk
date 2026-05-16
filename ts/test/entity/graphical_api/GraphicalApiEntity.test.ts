
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { N7timerWeatherSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('GraphicalApiEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when N7TIMERWEATHER_TEST_LIVE=TRUE.
  afterEach(liveDelay('N7TIMERWEATHER_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = N7timerWeatherSDK.test()
    const ent = testsdk.GraphicalApi()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.N_TIMER_WEATHER_TEST_LIVE
    for (const op of ['load']) {
      if (maybeSkipControl(t, 'entityOp', 'graphical_api.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set N_TIMER_WEATHER_TEST_GRAPHICAL_API_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let graphical_api_ref01_data = Object.values(setup.data.existing.graphical_api)[0] as any

    // LOAD
    const graphical_api_ref01_ent = client.GraphicalApi()
    const graphical_api_ref01_match_dt0: any = {}
    const graphical_api_ref01_data_dt0 = await graphical_api_ref01_ent.load(graphical_api_ref01_match_dt0)
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

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['N_TIMER_WEATHER_TEST_GRAPHICAL_API_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'N_TIMER_WEATHER_TEST_GRAPHICAL_API_ENTID': idmap,
    'N_TIMER_WEATHER_TEST_LIVE': 'FALSE',
    'N_TIMER_WEATHER_TEST_EXPLAIN': 'FALSE',
    'N_TIMER_WEATHER_APIKEY': 'NONE',
  })

  idmap = env['N_TIMER_WEATHER_TEST_GRAPHICAL_API_ENTID']

  const live = 'TRUE' === env.N_TIMER_WEATHER_TEST_LIVE

  if (live) {
    client = new N7timerWeatherSDK(merge([
      {
        apikey: env.N_TIMER_WEATHER_APIKEY,
      },
      extra
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.N_TIMER_WEATHER_TEST_EXPLAIN,
    live,
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
