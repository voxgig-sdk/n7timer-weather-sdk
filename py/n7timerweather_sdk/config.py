# N7timerWeather SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "N7timerWeather",
            "slug": "n7timer-weather",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "http://www.7timer.info",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "apipl": {},
                "graphical_api": {},
            },
        },
        "entity": {
      "apipl": {
        "fields": [
          {
            "name": "dataseries",
            "short": "Array of forecast data points",
            "type": "`$ARRAY`",
            "union": {
              "branches": 4,
              "count": 1,
              "depth": 1,
            },
          },
          {
            "name": "init",
            "short": "Initialization time of the forecast model (format: YYYYMMDDHH)",
            "type": "`$STRING`",
          },
          {
            "name": "product",
            "short": "Product type",
            "type": "`$STRING`",
          },
        ],
        "name": "apipl",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "ac",
                      "orig": "ac",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": "en",
                      "kind": "query",
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 23.09,
                      "kind": "query",
                      "name": "lat",
                      "orig": "lat",
                      "reqd": True,
                      "type": "`$NUMBER`",
                    },
                    {
                      "example": 113.17,
                      "kind": "query",
                      "name": "lon",
                      "orig": "lon",
                      "reqd": True,
                      "type": "`$NUMBER`",
                    },
                    {
                      "kind": "query",
                      "name": "output",
                      "orig": "output",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "kind": "query",
                      "name": "product",
                      "orig": "product",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "tzshift",
                      "orig": "tzshift",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": "metric",
                      "kind": "query",
                      "name": "unit",
                      "orig": "unit",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/bin/api.pl",
                "segments": [
                  {
                    "lit": "bin",
                  },
                  {
                    "lit": "api.pl",
                  },
                ],
                "select": {
                  "exist": [
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
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.dataseries`",
                },
                "parts": [
                  "bin",
                  "api.pl",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "graphical_api": {
        "fields": [],
        "name": "graphical_api",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "ac",
                      "orig": "ac",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": "en",
                      "kind": "query",
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 23.09,
                      "kind": "query",
                      "name": "lat",
                      "orig": "lat",
                      "reqd": True,
                      "type": "`$NUMBER`",
                    },
                    {
                      "example": 113.17,
                      "kind": "query",
                      "name": "lon",
                      "orig": "lon",
                      "reqd": True,
                      "type": "`$NUMBER`",
                    },
                    {
                      "example": "internal",
                      "kind": "query",
                      "name": "output",
                      "orig": "output",
                      "type": "`$STRING`",
                    },
                    {
                      "example": 0,
                      "kind": "query",
                      "name": "tzshift",
                      "orig": "tzshift",
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": "metric",
                      "kind": "query",
                      "name": "unit",
                      "orig": "unit",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/bin/astro.php",
                "segments": [
                  {
                    "lit": "bin",
                  },
                  {
                    "lit": "astro.php",
                  },
                ],
                "select": {
                  "exist": [
                    "ac",
                    "lang",
                    "lat",
                    "lon",
                    "output",
                    "tzshift",
                    "unit",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "bin",
                  "astro.php",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
