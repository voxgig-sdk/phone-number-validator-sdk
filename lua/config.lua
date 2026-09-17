-- PhoneNumberValidator SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "PhoneNumberValidator",
      slug = "phone-number-validator",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://api.numlookupapi.com/v1",
      auth = {
        prefix = "",
        name = "apikey",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["phone_validation"] = {},
      },
    },
    entity = {
      ["phone_validation"] = {
        ["fields"] = {
          {
            ["name"] = "carrier",
            ["short"] = "Name of the carrier/operator",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "country_code",
            ["short"] = "ISO country code",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "country_name",
            ["short"] = "Name of the country",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "country_prefix",
            ["short"] = "Country dialing prefix",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "international_format",
            ["short"] = "Phone number in international format",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "line_type",
            ["short"] = "Type of phone line (mobile, landline, etc.)",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "local_format",
            ["short"] = "Phone number in local format",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "number",
            ["short"] = "The original phone number",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "valid",
            ["short"] = "Whether the phone number is valid",
            ["type"] = "`$BOOLEAN`",
          },
        },
        ["name"] = "phone_validation",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["header"] = {
                    {
                      ["example"] = "num_live_Nf2vjeM19tHdi42qQ2LaVVMg2IGk1ReU2BYBKnvm",
                      ["kind"] = "header",
                      ["name"] = "apikey",
                      ["orig"] = "apikey",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["params"] = {
                    {
                      ["example"] = "01613950781",
                      ["kind"] = "param",
                      ["name"] = "phone_number",
                      ["orig"] = "phone_number",
                      ["reqd"] = true,
                      ["type"] = "`$STRING`",
                    },
                  },
                  ["query"] = {
                    {
                      ["example"] = "BD",
                      ["kind"] = "query",
                      ["name"] = "country_code",
                      ["orig"] = "country_code",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/validate/{phone_number}",
                ["segments"] = {
                  {
                    ["lit"] = "validate",
                  },
                  {
                    ["var"] = "phone_number",
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "apikey",
                    "country_code",
                    "phone_number",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {
                  "validate",
                  "{phone_number}",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {
            {
              "validate",
            },
          },
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
