# PhoneNumberValidator SDK configuration

module PhoneNumberValidatorConfig
  def self.make_config
    {
      "main" => {
        "name" => "PhoneNumberValidator",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://api.numlookupapi.com/v1",
        "auth" => {
          "prefix" => "Bearer",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "phone_validation" => {},
        },
      },
      "entity" => {
        "phone_validation" => {
          "fields" => [
            {
              "active" => true,
              "name" => "carrier",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "country_code",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "country_name",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "country_prefix",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 3,
            },
            {
              "active" => true,
              "name" => "international_format",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 4,
            },
            {
              "active" => true,
              "name" => "line_type",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 5,
            },
            {
              "active" => true,
              "name" => "local_format",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 6,
            },
            {
              "active" => true,
              "name" => "number",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 7,
            },
            {
              "active" => true,
              "name" => "valid",
              "req" => false,
              "type" => "`$BOOLEAN`",
              "index$" => 8,
            },
          ],
          "name" => "phone_validation",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "header" => [
                      {
                        "active" => true,
                        "example" => "num_live_Nf2vjeM19tHdi42qQ2LaVVMg2IGk1ReU2BYBKnvm",
                        "kind" => "header",
                        "name" => "apikey",
                        "orig" => "apikey",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "params" => [
                      {
                        "active" => true,
                        "example" => "01613950781",
                        "kind" => "param",
                        "name" => "phone_number",
                        "orig" => "phone_number",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "index$" => 0,
                      },
                    ],
                    "query" => [
                      {
                        "active" => true,
                        "example" => "BD",
                        "kind" => "query",
                        "name" => "country_code",
                        "orig" => "country_code",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "method" => "GET",
                  "orig" => "/validate/{phone_number}",
                  "parts" => [
                    "validate",
                    "{phone_number}",
                  ],
                  "select" => {
                    "exist" => [
                      "apikey",
                      "country_code",
                      "phone_number",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "validate",
              ],
            ],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    PhoneNumberValidatorFeatures.make_feature(name)
  end
end
