
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { N7timerWeatherSDK } from '..'


describe('exists', async () => {

  // NOT async, and the assertion is deliberate.
  //
  // N7timerWeatherSDK.test() is synchronous — it returns the client, not a promise
  // — so the `await` here was a no-op. Worse, it hid the weakness of the
  // assertion: `null !== testsdk` is trivially true for ANY non-null value,
  // including the promise an `await` would have unwrapped. The test could not
  // have failed short of test() returning null.
  //
  // instanceof is the real check: it fails if test() ever starts returning a
  // promise, or anything other than a client.
  test('test-mode', () => {
    const testsdk = N7timerWeatherSDK.test()
    equal(testsdk instanceof N7timerWeatherSDK, true,
      'N7timerWeatherSDK.test() must return a client synchronously')
  })

})
