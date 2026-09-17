# PhoneNumberValidator SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "PhoneNumberValidator",
            "slug": "phone-number-validator",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://api.numlookupapi.com/v1",
            "auth": {
                "prefix": "",
                "name": "apikey",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "phone_validation": {},
            },
        },
        "entity": {
      "phone_validation": {
        "fields": [
          {
            "name": "carrier",
            "short": "Name of the carrier/operator",
            "type": "`$STRING`",
          },
          {
            "name": "country_code",
            "short": "ISO country code",
            "type": "`$STRING`",
          },
          {
            "name": "country_name",
            "short": "Name of the country",
            "type": "`$STRING`",
          },
          {
            "name": "country_prefix",
            "short": "Country dialing prefix",
            "type": "`$STRING`",
          },
          {
            "name": "international_format",
            "short": "Phone number in international format",
            "type": "`$STRING`",
          },
          {
            "name": "line_type",
            "short": "Type of phone line (mobile, landline, etc.)",
            "type": "`$STRING`",
          },
          {
            "name": "local_format",
            "short": "Phone number in local format",
            "type": "`$STRING`",
          },
          {
            "name": "number",
            "short": "The original phone number",
            "type": "`$STRING`",
          },
          {
            "name": "valid",
            "short": "Whether the phone number is valid",
            "type": "`$BOOLEAN`",
          },
        ],
        "name": "phone_validation",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "header": [
                    {
                      "example": "num_live_Nf2vjeM19tHdi42qQ2LaVVMg2IGk1ReU2BYBKnvm",
                      "kind": "header",
                      "name": "apikey",
                      "orig": "apikey",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "params": [
                    {
                      "example": "01613950781",
                      "kind": "param",
                      "name": "phone_number",
                      "orig": "phone_number",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "example": "BD",
                      "kind": "query",
                      "name": "country_code",
                      "orig": "country_code",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/validate/{phone_number}",
                "segments": [
                  {
                    "lit": "validate",
                  },
                  {
                    "var": "phone_number",
                  },
                ],
                "select": {
                  "exist": [
                    "apikey",
                    "country_code",
                    "phone_number",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "validate",
                  "{phone_number}",
                ],
              },
            ],
          },
        },
        "relations": {
          "ancestors": [
            [
              "validate",
            ],
          ],
        },
      },
    },
    }
