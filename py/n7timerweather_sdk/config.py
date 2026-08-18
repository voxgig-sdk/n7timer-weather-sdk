# N7timerWeather SDK configuration


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
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
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
            "type": "`$ARRAY`",
            "union": {
              "branches": 4,
              "count": 1,
              "depth": 1,
            },
          },
          {
            "name": "init",
            "type": "`$STRING`",
          },
          {
            "name": "product",
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
                "parts": [
                  "bin",
                  "api.pl",
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
                "parts": [
                  "bin",
                  "astro.php",
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
