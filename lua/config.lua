-- N7timerWeather SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "N7timerWeather",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
      },
    },
    options = {
      base = "http://www.7timer.info",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["apipl"] = {},
        ["graphical_api"] = {},
      },
    },
    entity = {
      ["apipl"] = {
        ["fields"] = {
          {
            ["name"] = "dataseries",
            ["type"] = "`$ARRAY`",
            ["union"] = {
              ["branches"] = 4,
              ["count"] = 1,
              ["depth"] = 1,
            },
          },
          {
            ["name"] = "init",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "product",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "apipl",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 0,
                      ["kind"] = "query",
                      ["name"] = "ac",
                      ["orig"] = "ac",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = "en",
                      ["kind"] = "query",
                      ["name"] = "lang",
                      ["orig"] = "lang",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 23.09,
                      ["kind"] = "query",
                      ["name"] = "lat",
                      ["orig"] = "lat",
                      ["reqd"] = true,
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["example"] = 113.17,
                      ["kind"] = "query",
                      ["name"] = "lon",
                      ["orig"] = "lon",
                      ["reqd"] = true,
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "output",
                      ["orig"] = "output",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["kind"] = "query",
                      ["name"] = "product",
                      ["orig"] = "product",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 0,
                      ["kind"] = "query",
                      ["name"] = "tzshift",
                      ["orig"] = "tzshift",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = "metric",
                      ["kind"] = "query",
                      ["name"] = "unit",
                      ["orig"] = "unit",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/bin/api.pl",
                ["parts"] = {
                  "bin",
                  "api.pl",
                },
                ["select"] = {
                  ["exist"] = {
                    "ac",
                    "lang",
                    "lat",
                    "lon",
                    "output",
                    "product",
                    "tzshift",
                    "unit",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.dataseries`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["graphical_api"] = {
        ["fields"] = {},
        ["name"] = "graphical_api",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 0,
                      ["kind"] = "query",
                      ["name"] = "ac",
                      ["orig"] = "ac",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = "en",
                      ["kind"] = "query",
                      ["name"] = "lang",
                      ["orig"] = "lang",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 23.09,
                      ["kind"] = "query",
                      ["name"] = "lat",
                      ["orig"] = "lat",
                      ["reqd"] = true,
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["example"] = 113.17,
                      ["kind"] = "query",
                      ["name"] = "lon",
                      ["orig"] = "lon",
                      ["reqd"] = true,
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["example"] = "internal",
                      ["kind"] = "query",
                      ["name"] = "output",
                      ["orig"] = "output",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = 0,
                      ["kind"] = "query",
                      ["name"] = "tzshift",
                      ["orig"] = "tzshift",
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = "metric",
                      ["kind"] = "query",
                      ["name"] = "unit",
                      ["orig"] = "unit",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/bin/astro.php",
                ["parts"] = {
                  "bin",
                  "astro.php",
                },
                ["select"] = {
                  ["exist"] = {
                    "ac",
                    "lang",
                    "lat",
                    "lon",
                    "output",
                    "tzshift",
                    "unit",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
