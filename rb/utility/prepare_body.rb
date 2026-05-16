# N7timerWeather SDK utility: prepare_body
module N7timerWeatherUtilities
  PrepareBody = ->(ctx) {
    ctx.op.input == "data" ? ctx.utility.transform_request.call(ctx) : nil
  }
end
