<?php
declare(strict_types=1);

// PhoneNumberValidator SDK configuration

class PhoneNumberValidatorConfig
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
                "name" => "PhoneNumberValidator",
                "slug" => "phone-number-validator",
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
                "base" => "https://api.numlookupapi.com/v1",
                "auth" => [
                    "prefix" => "",
                    "name" => "apikey",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "phone_validation" => [],
                ],
            ],
            "entity" => [
        'phone_validation' => [
          'fields' => [
            [
              'name' => 'carrier',
              'title' => 'Carrier',
              'type' => '`$STRING`',
              'short' => 'Name of the carrier/operator',
            ],
            [
              'name' => 'country_code',
              'title' => 'Country Code',
              'type' => '`$STRING`',
              'short' => 'ISO country code',
            ],
            [
              'name' => 'country_name',
              'title' => 'Country Name',
              'type' => '`$STRING`',
              'short' => 'Name of the country',
            ],
            [
              'name' => 'country_prefix',
              'title' => 'Country Prefix',
              'type' => '`$STRING`',
              'short' => 'Country dialing prefix',
            ],
            [
              'name' => 'international_format',
              'title' => 'International Format',
              'type' => '`$STRING`',
              'short' => 'Phone number in international format',
            ],
            [
              'name' => 'line_type',
              'title' => 'Line Type',
              'type' => '`$STRING`',
              'short' => 'Type of phone line (mobile, landline, etc.)',
            ],
            [
              'name' => 'local_format',
              'title' => 'Local Format',
              'type' => '`$STRING`',
              'short' => 'Phone number in local format',
            ],
            [
              'name' => 'number',
              'title' => 'Number',
              'type' => '`$STRING`',
              'short' => 'The original phone number',
            ],
            [
              'name' => 'valid',
              'title' => 'Valid',
              'type' => '`$BOOLEAN`',
              'short' => 'Whether the phone number is valid',
            ],
          ],
          'name' => 'phone_validation',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/validate/{phone_number}',
                  'segments' => [
                    [
                      'lit' => 'validate',
                    ],
                    [
                      'var' => 'phone_number',
                    ],
                  ],
                  'parts' => [
                    'validate',
                    '{phone_number}',
                  ],
                  'rename' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'args' => [
                    'header' => [
                      [
                        'name' => 'apikey',
                        'orig' => 'apikey',
                        'type' => '`$STRING`',
                        'kind' => 'header',
                        'reqd' => true,
                        'example' => 'num_live_Nf2vjeM19tHdi42qQ2LaVVMg2IGk1ReU2BYBKnvm',
                      ],
                    ],
                    'params' => [
                      [
                        'name' => 'phone_number',
                        'orig' => 'phone_number',
                        'type' => '`$STRING`',
                        'kind' => 'param',
                        'reqd' => true,
                        'example' => '01613950781',
                      ],
                    ],
                    'query' => [
                      [
                        'name' => 'country_code',
                        'orig' => 'country_code',
                        'type' => '`$STRING`',
                        'kind' => 'query',
                        'example' => 'BD',
                      ],
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'apikey',
                      'country_code',
                      'phone_number',
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
        return PhoneNumberValidatorFeatures::make_feature($name);
    }
}
