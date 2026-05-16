# N7timerWeather SDK utility: make_context
require_relative '../core/context'
module N7timerWeatherUtilities
  MakeContext = ->(ctxmap, basectx) {
    N7timerWeatherContext.new(ctxmap, basectx)
  }
end
