package = "voxgig-sdk-n7timer-weather"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/n7timer-weather-sdk.git"
}
description = {
  summary = "N7timerWeather SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["n7timer-weather_sdk"] = "n7timer-weather_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
