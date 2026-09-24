# N7timerWeather SDK configuration

module N7timerWeatherConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "N7timerWeather",
        "slug" => "n7timer-weather",
        "version" => "0.0.1",
        "target" => "rb",
      },
      "feature" => {
        "ratelimit" => {
          "options" => {
            "active" => false,
            "burst" => 5,
            "rate" => 5,
          },
          "optspec" => {
            "now" => "`$FUNCTION`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "retry" => {
          "options" => {
            "active" => false,
            "factor" => 2,
            "maxDelay" => 2000,
            "minDelay" => 50,
            "retries" => 2,
            "statuses" => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          },
          "optspec" => {
            "jitter" => "`$BOOLEAN`",
            "sleep" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
        "test" => {
          "options" => {
            "active" => false,
          },
          "optspec" => {
            "entity" => "`$MAP`",
            "net" => "`$MAP`",
          },
          "strict" => false,
          "transport" => "base",
        },
        "timeout" => {
          "options" => {
            "active" => false,
            "ms" => 30000,
          },
          "optspec" => {
            "clearTimer" => "`$FUNCTION`",
            "setTimer" => "`$FUNCTION`",
          },
          "strict" => false,
          "transport" => "wrap",
        },
      },
      "options" => {
        "base" => "http://www.7timer.info",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "apipl" => {},
          "graphical_api" => {},
        },
      },
      "entity" => {
        "apipl" => {
          "fields" => [
            {
              "name" => "dataseries",
              "title" => "Dataseries",
              "type" => "`$ARRAY`",
              "short" => "Array of forecast data points",
            },
            {
              "name" => "init",
              "title" => "Init",
              "type" => "`$STRING`",
              "short" => "Initialization time of the forecast model (format: YYYYMMDDHH)",
            },
            {
              "name" => "product",
              "title" => "Product",
              "type" => "`$STRING`",
              "short" => "Product type",
            },
          ],
          "name" => "apipl",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/bin/api.pl",
                  "segments" => [
                    {
                      "lit" => "bin",
                    },
                    {
                      "lit" => "api.pl",
                    },
                  ],
                  "parts" => [
                    "bin",
                    "api.pl",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.dataseries`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "ac",
                        "orig" => "ac",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 0,
                      },
                      {
                        "name" => "lang",
                        "orig" => "lang",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "en",
                      },
                      {
                        "name" => "lat",
                        "orig" => "lat",
                        "type" => "`$NUMBER`",
                        "kind" => "query",
                        "reqd" => true,
                        "example" => 23.09,
                      },
                      {
                        "name" => "lon",
                        "orig" => "lon",
                        "type" => "`$NUMBER`",
                        "kind" => "query",
                        "reqd" => true,
                        "example" => 113.17,
                      },
                      {
                        "name" => "output",
                        "orig" => "output",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "product",
                        "orig" => "product",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "reqd" => true,
                      },
                      {
                        "name" => "tzshift",
                        "orig" => "tzshift",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 0,
                      },
                      {
                        "name" => "unit",
                        "orig" => "unit",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "metric",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "ac",
                      "lang",
                      "lat",
                      "lon",
                      "output",
                      "product",
                      "tzshift",
                      "unit",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "graphical_api" => {
          "fields" => [],
          "name" => "graphical_api",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/bin/astro.php",
                  "segments" => [
                    {
                      "lit" => "bin",
                    },
                    {
                      "lit" => "astro.php",
                    },
                  ],
                  "parts" => [
                    "bin",
                    "astro.php",
                  ],
                  "rename" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "args" => {
                    "query" => [
                      {
                        "name" => "ac",
                        "orig" => "ac",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 0,
                      },
                      {
                        "name" => "lang",
                        "orig" => "lang",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "en",
                      },
                      {
                        "name" => "lat",
                        "orig" => "lat",
                        "type" => "`$NUMBER`",
                        "kind" => "query",
                        "reqd" => true,
                        "example" => 23.09,
                      },
                      {
                        "name" => "lon",
                        "orig" => "lon",
                        "type" => "`$NUMBER`",
                        "kind" => "query",
                        "reqd" => true,
                        "example" => 113.17,
                      },
                      {
                        "name" => "output",
                        "orig" => "output",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "internal",
                      },
                      {
                        "name" => "tzshift",
                        "orig" => "tzshift",
                        "type" => "`$INTEGER`",
                        "kind" => "query",
                        "example" => 0,
                      },
                      {
                        "name" => "unit",
                        "orig" => "unit",
                        "type" => "`$STRING`",
                        "kind" => "query",
                        "example" => "metric",
                      },
                    ],
                  },
                  "select" => {
                    "exist" => [
                      "ac",
                      "lang",
                      "lat",
                      "lon",
                      "output",
                      "tzshift",
                      "unit",
                    ],
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    N7timerWeatherFeatures.make_feature(name)
  end
end
