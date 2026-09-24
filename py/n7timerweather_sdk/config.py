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
            "title": "Dataseries",
            "type": "`$ARRAY`",
            "short": "Array of forecast data points",
          },
          {
            "name": "init",
            "title": "Init",
            "type": "`$STRING`",
            "short": "Initialization time of the forecast model (format: YYYYMMDDHH)",
          },
          {
            "name": "product",
            "title": "Product",
            "type": "`$STRING`",
            "short": "Product type",
          },
        ],
        "name": "apipl",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
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
                "parts": [
                  "bin",
                  "api.pl",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.dataseries`",
                },
                "args": {
                  "query": [
                    {
                      "name": "ac",
                      "orig": "ac",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 0,
                    },
                    {
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "en",
                    },
                    {
                      "name": "lat",
                      "orig": "lat",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "reqd": True,
                      "example": 23.09,
                    },
                    {
                      "name": "lon",
                      "orig": "lon",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "reqd": True,
                      "example": 113.17,
                    },
                    {
                      "name": "output",
                      "orig": "output",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "product",
                      "orig": "product",
                      "type": "`$STRING`",
                      "kind": "query",
                      "reqd": True,
                    },
                    {
                      "name": "tzshift",
                      "orig": "tzshift",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 0,
                    },
                    {
                      "name": "unit",
                      "orig": "unit",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "metric",
                    },
                  ],
                },
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
                "parts": [
                  "bin",
                  "astro.php",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "query": [
                    {
                      "name": "ac",
                      "orig": "ac",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 0,
                    },
                    {
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "en",
                    },
                    {
                      "name": "lat",
                      "orig": "lat",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "reqd": True,
                      "example": 23.09,
                    },
                    {
                      "name": "lon",
                      "orig": "lon",
                      "type": "`$NUMBER`",
                      "kind": "query",
                      "reqd": True,
                      "example": 113.17,
                    },
                    {
                      "name": "output",
                      "orig": "output",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "internal",
                    },
                    {
                      "name": "tzshift",
                      "orig": "tzshift",
                      "type": "`$INTEGER`",
                      "kind": "query",
                      "example": 0,
                    },
                    {
                      "name": "unit",
                      "orig": "unit",
                      "type": "`$STRING`",
                      "kind": "query",
                      "example": "metric",
                    },
                  ],
                },
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
