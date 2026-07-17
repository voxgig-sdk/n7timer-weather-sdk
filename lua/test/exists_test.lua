-- N7timerWeather SDK exists test

local sdk = require("n7timer-weather_sdk")

describe("N7timerWeatherSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
