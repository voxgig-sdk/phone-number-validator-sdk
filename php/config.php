<?php
declare(strict_types=1);

// PhoneNumberValidator SDK configuration

class PhoneNumberValidatorConfig
{
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
                    "prefix" => "Bearer",
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
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 0,
            ],
            [
              'name' => 'country_code',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 1,
            ],
            [
              'name' => 'country_name',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 2,
            ],
            [
              'name' => 'country_prefix',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 3,
            ],
            [
              'name' => 'international_format',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 4,
            ],
            [
              'name' => 'line_type',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 5,
            ],
            [
              'name' => 'local_format',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 6,
            ],
            [
              'name' => 'number',
              'req' => false,
              'type' => '`$STRING`',
              'active' => true,
              'index$' => 7,
            ],
            [
              'name' => 'valid',
              'req' => false,
              'type' => '`$BOOLEAN`',
              'active' => true,
              'index$' => 8,
            ],
          ],
          'name' => 'phone_validation',
          'op' => [
            'load' => [
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
                        'active' => true,
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
                        'active' => true,
                      ],
                    ],
                    'query' => [
                      [
                        'example' => 'BD',
                        'kind' => 'query',
                        'name' => 'country_code',
                        'orig' => 'country_code',
                        'reqd' => false,
                        'type' => '`$STRING`',
                        'active' => true,
                      ],
                    ],
                  ],
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
                  'active' => true,
                  'index$' => 0,
                ],
              ],
              'input' => 'data',
              'key$' => 'load',
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
