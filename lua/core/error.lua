-- N7timerWeather SDK error

local N7timerWeatherError = {}
N7timerWeatherError.__index = N7timerWeatherError


function N7timerWeatherError.new(code, msg, ctx)
  local self = setmetatable({}, N7timerWeatherError)
  self.is_sdk_error = true
  self.sdk = "N7timerWeather"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function N7timerWeatherError:error()
  return self.msg
end


function N7timerWeatherError:__tostring()
  return self.msg
end


return N7timerWeatherError
