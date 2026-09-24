<?php
declare(strict_types=1);

// N7timerWeather SDK configuration

class N7timerWeatherConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "N7timerWeather",
                "slug" => "n7timer-weather",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "ratelimit" => [
          'options' => [
            'active' => false,
            'burst' => 5,
            'rate' => 5,
          ],
          'optspec' => [
            'now' => '`$FUNCTION`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "retry" => [
          'options' => [
            'active' => false,
            'factor' => 2,
            'maxDelay' => 2000,
            'minDelay' => 50,
            'retries' => 2,
            'statuses' => [
              408,
              425,
              429,
              500,
              502,
              503,
              504,
            ],
          ],
          'optspec' => [
            'jitter' => '`$BOOLEAN`',
            'sleep' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
                "test" => [
          'options' => [
            'active' => false,
          ],
          'optspec' => [
            'entity' => '`$MAP`',
            'net' => '`$MAP`',
          ],
          'strict' => false,
          'transport' => 'base',
        ],
                "timeout" => [
          'options' => [
            'active' => false,
            'ms' => 30000,
          ],
          'optspec' => [
            'clearTimer' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "http://www.7timer.info",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "apipl" => [],
                    "graphical_api" => [],
                ],
            ],
            "entity" => [
        'apipl' => [
          'fields' => [
            [
              'name' => 'dataseries',
              'title' => 'Dataseries',
              'type' => '`$ARRAY`',
              'short' => 'Array of forecast data points',
            ],
            [
              'name' => 'init',
              'title' => 'Init',
              'type' => '`$STRING`',
              'short' => 'Initialization time of the forecast model (format: YYYYMMDDHH)',
            ],
            [
              'name' => 'product',
              'title' => 'Product',
              'type' => '`$STRING`',
              'short' => 'Product type',
            ],
          ],
          'name' => 'apipl',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/bin/api.pl',
                  'segments' => [
                    [
                      'lit' => 'bin',
                    ],
                    [
                      'lit' => 'api.pl',
                    ],
                  ],
                  'parts' => [
                    'bin',
                    'api.pl',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.dataseries`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'ac',
                        'orig' => 'ac',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 0,
                      ],
                      [
                        'name' => 'lang',
                        'orig' => 'lang',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'en',
                      ],
                      [
                        'name' => 'lat',
                        'orig' => 'lat',
                        'type' => '`$NUMBER`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 23.09,
                      ],
                      [
                        'name' => 'lon',
                        'orig' => 'lon',
                        'type' => '`$NUMBER`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 113.17,
                      ],
                      [
                        'name' => 'output',
                        'orig' => 'output',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'product',
                        'orig' => 'product',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'reqd' => true,
                      ],
                      [
                        'name' => 'tzshift',
                        'orig' => 'tzshift',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 0,
                      ],
                      [
                        'name' => 'unit',
                        'orig' => 'unit',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'metric',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'ac',
                      'lang',
                      'lat',
                      'lon',
                      'output',
                      'product',
                      'tzshift',
                      'unit',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'graphical_api' => [
          'fields' => [],
          'name' => 'graphical_api',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/bin/astro.php',
                  'segments' => [
                    [
                      'lit' => 'bin',
                    ],
                    [
                      'lit' => 'astro.php',
                    ],
                  ],
                  'parts' => [
                    'bin',
                    'astro.php',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'ac',
                        'orig' => 'ac',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 0,
                      ],
                      [
                        'name' => 'lang',
                        'orig' => 'lang',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'en',
                      ],
                      [
                        'name' => 'lat',
                        'orig' => 'lat',
                        'type' => '`$NUMBER`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 23.09,
                      ],
                      [
                        'name' => 'lon',
                        'orig' => 'lon',
                        'type' => '`$NUMBER`',
                        'kind' => 'query',
                        'reqd' => true,
                        'example' => 113.17,
                      ],
                      [
                        'name' => 'output',
                        'orig' => 'output',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'internal',
                      ],
                      [
                        'name' => 'tzshift',
                        'orig' => 'tzshift',
                        'type' => '`$INTEGER`',
                        'kind' => 'query',
                        'example' => 0,
                      ],
                      [
                        'name' => 'unit',
                        'orig' => 'unit',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'metric',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'ac',
                      'lang',
                      'lat',
                      'lon',
                      'output',
                      'tzshift',
                      'unit',
                    ],
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return N7timerWeatherFeatures::make_feature($name);
    }
}
