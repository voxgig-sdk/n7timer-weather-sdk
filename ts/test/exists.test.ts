
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { N7timerWeatherSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = N7timerWeatherSDK.test()
    equal(testsdk instanceof N7timerWeatherSDK, true,
      'N7timerWeatherSDK.test() must return a client synchronously')
  })

})
