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
						"title": "Dataseries",
						"type": "`$ARRAY`",
						"short": "Array of forecast data points",
					},
					map[string]any{
						"name": "init",
						"title": "Init",
						"type": "`$STRING`",
						"short": "Initialization time of the forecast model (format: YYYYMMDDHH)",
					},
					map[string]any{
						"name": "product",
						"title": "Product",
						"type": "`$STRING`",
						"short": "Product type",
					},
				},
				"name": "apipl",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"bin",
									"api.pl",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.dataseries`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "ac",
											"orig": "ac",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
											"kind": "query",
											"example": "en",
										},
										map[string]any{
											"name": "lat",
											"orig": "lat",
											"type": "`$NUMBER`",
											"kind": "query",
											"reqd": true,
											"example": 23.09,
										},
										map[string]any{
											"name": "lon",
											"orig": "lon",
											"type": "`$NUMBER`",
											"kind": "query",
											"reqd": true,
											"example": 113.17,
										},
										map[string]any{
											"name": "output",
											"orig": "output",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "product",
											"orig": "product",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "tzshift",
											"orig": "tzshift",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "unit",
											"orig": "unit",
											"type": "`$STRING`",
											"kind": "query",
											"example": "metric",
										},
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
								"parts": []any{
									"bin",
									"astro.php",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "ac",
											"orig": "ac",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "lang",
											"orig": "lang",
											"type": "`$STRING`",
											"kind": "query",
											"example": "en",
										},
										map[string]any{
											"name": "lat",
											"orig": "lat",
											"type": "`$NUMBER`",
											"kind": "query",
											"reqd": true,
											"example": 23.09,
										},
										map[string]any{
											"name": "lon",
											"orig": "lon",
											"type": "`$NUMBER`",
											"kind": "query",
											"reqd": true,
											"example": 113.17,
										},
										map[string]any{
											"name": "output",
											"orig": "output",
											"type": "`$STRING`",
											"kind": "query",
											"example": "internal",
										},
										map[string]any{
											"name": "tzshift",
											"orig": "tzshift",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 0,
										},
										map[string]any{
											"name": "unit",
											"orig": "unit",
											"type": "`$STRING`",
											"kind": "query",
											"example": "metric",
										},
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
