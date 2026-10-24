# N7timerWeather SDK utility: prepare_body
require_relative 'media'
module N7timerWeatherUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return N7timerWeatherUtilities.raw_body(ctx.reqdata) if N7timerWeatherUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
