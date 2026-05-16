# N7timerWeather SDK exists test

require "minitest/autorun"
require_relative "../N7timerWeather_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = N7timerWeatherSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
