
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'N7timerWeather',
        slug: "n7timer-weather",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "http://www.7timer.info",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      apipl: {
      },

      graphical_api: {
      },

    }
  }


  entity = {
    "apipl": {
      "fields": [
        {
          "name": "dataseries",
          "short": "Array of forecast data points",
          "type": "`$ARRAY`",
          "union": {
            "branches": 4,
            "count": 1,
            "depth": 1
          }
        },
        {
          "name": "init",
          "short": "Initialization time of the forecast model (format: YYYYMMDDHH)",
          "type": "`$STRING`"
        },
        {
          "name": "product",
          "short": "Product type",
          "type": "`$STRING`"
        }
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
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "en",
                    "kind": "query",
                    "name": "lang",
                    "orig": "lang",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 23.09,
                    "kind": "query",
                    "name": "lat",
                    "orig": "lat",
                    "reqd": true,
                    "type": "`$NUMBER`"
                  },
                  {
                    "example": 113.17,
                    "kind": "query",
                    "name": "lon",
                    "orig": "lon",
                    "reqd": true,
                    "type": "`$NUMBER`"
                  },
                  {
                    "kind": "query",
                    "name": "output",
                    "orig": "output",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "kind": "query",
                    "name": "product",
                    "orig": "product",
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "tzshift",
                    "orig": "tzshift",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "metric",
                    "kind": "query",
                    "name": "unit",
                    "orig": "unit",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/bin/api.pl",
              "parts": [
                "bin",
                "api.pl"
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
                  "unit"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.dataseries`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
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
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "en",
                    "kind": "query",
                    "name": "lang",
                    "orig": "lang",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 23.09,
                    "kind": "query",
                    "name": "lat",
                    "orig": "lat",
                    "reqd": true,
                    "type": "`$NUMBER`"
                  },
                  {
                    "example": 113.17,
                    "kind": "query",
                    "name": "lon",
                    "orig": "lon",
                    "reqd": true,
                    "type": "`$NUMBER`"
                  },
                  {
                    "example": "internal",
                    "kind": "query",
                    "name": "output",
                    "orig": "output",
                    "type": "`$STRING`"
                  },
                  {
                    "example": 0,
                    "kind": "query",
                    "name": "tzshift",
                    "orig": "tzshift",
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": "metric",
                    "kind": "query",
                    "name": "unit",
                    "orig": "unit",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/bin/astro.php",
              "parts": [
                "bin",
                "astro.php"
              ],
              "select": {
                "exist": [
                  "ac",
                  "lang",
                  "lat",
                  "lon",
                  "output",
                  "tzshift",
                  "unit"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

