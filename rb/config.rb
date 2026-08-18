# PhoneNumberValidator SDK configuration

module PhoneNumberValidatorConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
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
          "prefix" => "",
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
              "name" => "carrier",
              "type" => "`$STRING`",
            },
            {
              "name" => "country_code",
              "type" => "`$STRING`",
            },
            {
              "name" => "country_name",
              "type" => "`$STRING`",
            },
            {
              "name" => "country_prefix",
              "type" => "`$STRING`",
            },
            {
              "name" => "international_format",
              "type" => "`$STRING`",
            },
            {
              "name" => "line_type",
              "type" => "`$STRING`",
            },
            {
              "name" => "local_format",
              "type" => "`$STRING`",
            },
            {
              "name" => "number",
              "type" => "`$STRING`",
            },
            {
              "name" => "valid",
              "type" => "`$BOOLEAN`",
            },
          ],
          "name" => "phone_validation",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "header" => [
                      {
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
                        "example" => "01613950781",
                        "kind" => "param",
                        "name" => "phone_number",
                        "orig" => "phone_number",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "example" => "BD",
                        "kind" => "query",
                        "name" => "country_code",
                        "orig" => "country_code",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
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
                },
              ],
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
