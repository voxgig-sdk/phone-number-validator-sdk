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
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
        ],
            ],
            "options" => [
                "base" => "https://api.numlookupapi.com/v1",
                "auth" => [
                    "prefix" => "",
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
              'type' => '`$STRING`',
            ],
            [
              'name' => 'country_code',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'country_name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'country_prefix',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'international_format',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'line_type',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'local_format',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'number',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'valid',
              'type' => '`$BOOLEAN`',
            ],
          ],
          'name' => 'phone_validation',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'header' => [
                      [
                        'example' => 'num_live_Nf2vjeM19tHdi42qQ2LaVVMg2IGk1ReU2BYBKnvm',
                        'kind' => 'header',
                        'name' => 'apikey',
                        'orig' => 'apikey',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'params' => [
                      [
                        'example' => '01613950781',
                        'kind' => 'param',
                        'name' => 'phone_number',
                        'orig' => 'phone_number',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'example' => 'BD',
                        'kind' => 'query',
                        'name' => 'country_code',
                        'orig' => 'country_code',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/validate/{phone_number}',
                  'parts' => [
                    'validate',
                    '{phone_number}',
                  ],
                  'select' => [
                    'exist' => [
                      'apikey',
                      'country_code',
                      'phone_number',
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
            'ancestors' => [
              [
                'validate',
              ],
            ],
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
