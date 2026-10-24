<?php
declare(strict_types=1);

// HelloAsService SDK configuration

class HelloAsServiceConfig
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
                "name" => "HelloAsService",
                "slug" => "hello-as-service",
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
            'now' => '`$FUNCTION`',
            'setTimer' => '`$FUNCTION`',
          ],
          'strict' => false,
          'transport' => 'wrap',
        ],
            ],
            "options" => [
                "base" => "https://hellosalut.stefanbohacek.dev",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "get_greeting" => [],
                ],
            ],
            "entity" => [
        'get_greeting' => [
          'fields' => [
            [
              'name' => 'cc',
              'title' => 'Cc',
              'type' => '`$STRING`',
              'short' => 'Country code detected or used',
            ],
            [
              'name' => 'code',
              'title' => 'Code',
              'type' => '`$STRING`',
              'short' => 'Language code of the returned greeting',
            ],
            [
              'name' => 'hello',
              'title' => 'Hello',
              'type' => '`$STRING`',
              'short' => 'The greeting in the requested or detected language',
            ],
            [
              'name' => 'ip',
              'title' => 'Ip',
              'type' => '`$STRING`',
              'short' => 'IP address used for the request (if applicable)',
            ],
          ],
          'name' => 'get_greeting',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/',
                  'segments' => [],
                  'parts' => [],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'query' => [
                      [
                        'name' => 'cc',
                        'orig' => 'cc',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'US',
                        'field' => true,
                      ],
                      [
                        'name' => 'ip',
                        'orig' => 'ip',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => '8.8.8.8',
                        'field' => true,
                      ],
                      [
                        'name' => 'lang',
                        'orig' => 'lang',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'fr',
                      ],
                    ],
                  ],
                  'select' => [],
                  'response' => [
                    'kind' => 'json',
                    'media' => 'application/json',
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
        return HelloAsServiceFeatures::make_feature($name);
    }
}
