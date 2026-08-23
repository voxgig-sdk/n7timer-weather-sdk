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
                "test" => [
          'options' => [
            'active' => false,
          ],
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
              'short' => 'Array of forecast data points',
              'type' => '`$ARRAY`',
              'union' => [
                'branches' => 4,
                'count' => 1,
                'depth' => 1,
              ],
            ],
            [
              'name' => 'init',
              'short' => 'Initialization time of the forecast model (format: YYYYMMDDHH)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'product',
              'short' => 'Product type',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'apipl',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'ac',
                        'orig' => 'ac',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 'en',
                        'kind' => 'query',
                        'name' => 'lang',
                        'orig' => 'lang',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 23.09,
                        'kind' => 'query',
                        'name' => 'lat',
                        'orig' => 'lat',
                        'reqd' => true,
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'example' => 113.17,
                        'kind' => 'query',
                        'name' => 'lon',
                        'orig' => 'lon',
                        'reqd' => true,
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'output',
                        'orig' => 'output',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'product',
                        'orig' => 'product',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'tzshift',
                        'orig' => 'tzshift',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 'metric',
                        'kind' => 'query',
                        'name' => 'unit',
                        'orig' => 'unit',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/bin/api.pl',
                  'parts' => [
                    'bin',
                    'api.pl',
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.dataseries`',
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
                  'args' => [
                    'query' => [
                      [
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'ac',
                        'orig' => 'ac',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 'en',
                        'kind' => 'query',
                        'name' => 'lang',
                        'orig' => 'lang',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 23.09,
                        'kind' => 'query',
                        'name' => 'lat',
                        'orig' => 'lat',
                        'reqd' => true,
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'example' => 113.17,
                        'kind' => 'query',
                        'name' => 'lon',
                        'orig' => 'lon',
                        'reqd' => true,
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'example' => 'internal',
                        'kind' => 'query',
                        'name' => 'output',
                        'orig' => 'output',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 0,
                        'kind' => 'query',
                        'name' => 'tzshift',
                        'orig' => 'tzshift',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 'metric',
                        'kind' => 'query',
                        'name' => 'unit',
                        'orig' => 'unit',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/bin/astro.php',
                  'parts' => [
                    'bin',
                    'astro.php',
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
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
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
