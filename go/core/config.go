package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "N7timerWeather",
			"slug": "n7timer-weather",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "http://www.7timer.info",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"apipl": map[string]any{},
				"graphical_api": map[string]any{},
			},
		},
		"entity": map[string]any{
			"apipl": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "dataseries",
						"short": "Array of forecast data points",
						"type": "`$ARRAY`",
						"union": map[string]any{
							"branches": 4,
							"count": 1,
							"depth": 1,
						},
					},
					map[string]any{
						"name": "init",
						"short": "Initialization time of the forecast model (format: YYYYMMDDHH)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "product",
						"short": "Product type",
						"type": "`$STRING`",
					},
				},
				"name": "apipl",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "ac",
											"orig": "ac",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "en",
											"kind": "query",
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 23.09,
											"kind": "query",
											"name": "lat",
											"orig": "lat",
											"reqd": true,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": 113.17,
											"kind": "query",
											"name": "lon",
											"orig": "lon",
											"reqd": true,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"kind": "query",
											"name": "output",
											"orig": "output",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "product",
											"orig": "product",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "tzshift",
											"orig": "tzshift",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "metric",
											"kind": "query",
											"name": "unit",
											"orig": "unit",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/bin/api.pl",
								"segments": []any{
									map[string]any{
										"lit": "bin",
									},
									map[string]any{
										"lit": "api.pl",
									},
								},
								"select": map[string]any{
									"exist": []any{
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
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.dataseries`",
								},
								"parts": []any{
									"bin",
									"api.pl",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"graphical_api": map[string]any{
				"fields": []any{},
				"name": "graphical_api",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "ac",
											"orig": "ac",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "en",
											"kind": "query",
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 23.09,
											"kind": "query",
											"name": "lat",
											"orig": "lat",
											"reqd": true,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": 113.17,
											"kind": "query",
											"name": "lon",
											"orig": "lon",
											"reqd": true,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": "internal",
											"kind": "query",
											"name": "output",
											"orig": "output",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 0,
											"kind": "query",
											"name": "tzshift",
											"orig": "tzshift",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": "metric",
											"kind": "query",
											"name": "unit",
											"orig": "unit",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/bin/astro.php",
								"segments": []any{
									map[string]any{
										"lit": "bin",
									},
									map[string]any{
										"lit": "astro.php",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ac",
										"lang",
										"lat",
										"lon",
										"output",
										"tzshift",
										"unit",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"bin",
									"astro.php",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
