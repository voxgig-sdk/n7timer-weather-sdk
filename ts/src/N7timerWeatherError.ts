
import { Context } from './Context'


class N7timerWeatherError extends Error {

  isN7timerWeatherError = true

  sdk = 'N7timerWeather'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  N7timerWeatherError
}

