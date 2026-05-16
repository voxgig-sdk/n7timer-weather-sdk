# N7timerWeather SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module N7timerWeatherFeatures
  def self.make_feature(name)
    case name
    when "base"
      N7timerWeatherBaseFeature.new
    when "test"
      N7timerWeatherTestFeature.new
    else
      N7timerWeatherBaseFeature.new
    end
  end
end
