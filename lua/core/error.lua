-- N7timerWeather SDK error

local json = require("dkjson")

local N7timerWeatherError = {}
N7timerWeatherError.__index = N7timerWeatherError

-- Reachable for a debugger, absent from the table itself: the context holds
-- the live spec and options, and an error is what gets dumped or encoded.
local CONTEXT = setmetatable({}, { __mode = "k" })


function N7timerWeatherError.new(code, msg, ctx)
  local self = setmetatable({}, N7timerWeatherError)
  self.is_sdk_error = true
  self.sdk = "N7timerWeather"
  self.code = code or ""
  self.msg = msg or ""
  self.result = nil
  self.spec = nil
  CONTEXT[self] = ctx
  return self
end


function N7timerWeatherError:context()
  return CONTEXT[self]
end


function N7timerWeatherError:error()
  return self.msg
end


-- What make_error attached is already cleaned; the context is not part of
-- the record.
function N7timerWeatherError:to_table()
  return {
    sdk = self.sdk,
    code = self.code,
    msg = self.msg,
    status = self.status,
    result = self.result,
    spec = self.spec,
  }
end


function N7timerWeatherError:to_json()
  return json.encode(self:to_table())
end


function N7timerWeatherError:__tostring()
  return self.msg
end


function N7timerWeatherError.__tojson(self)
  return self:to_json()
end


return N7timerWeatherError
