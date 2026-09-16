# N7timerWeather SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module N7timerWeatherFeatures
  def self.make_feature(name)
    case name
    when "base"
      N7timerWeatherBaseFeature.new
    when "ratelimit"
      N7timerWeatherRatelimitFeature.new
    when "retry"
      N7timerWeatherRetryFeature.new
    when "test"
      N7timerWeatherTestFeature.new
    when "timeout"
      N7timerWeatherTimeoutFeature.new
    else
      N7timerWeatherBaseFeature.new
    end
  end
end
