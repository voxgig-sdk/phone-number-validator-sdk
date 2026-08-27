package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "PhoneNumberValidator",
			"slug": "phone-number-validator",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://api.numlookupapi.com/v1",
			"auth": map[string]any{
				"prefix": "",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"phone_validation": map[string]any{},
			},
		},
		"entity": map[string]any{
			"phone_validation": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "carrier",
						"short": "Name of the carrier/operator",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country_code",
						"short": "ISO country code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country_name",
						"short": "Name of the country",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "country_prefix",
						"short": "Country dialing prefix",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "international_format",
						"short": "Phone number in international format",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "line_type",
						"short": "Type of phone line (mobile, landline, etc.)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "local_format",
						"short": "Phone number in local format",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "number",
						"short": "The original phone number",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "valid",
						"short": "Whether the phone number is valid",
						"type": "`$BOOLEAN`",
					},
				},
				"name": "phone_validation",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"example": "num_live_Nf2vjeM19tHdi42qQ2LaVVMg2IGk1ReU2BYBKnvm",
											"kind": "header",
											"name": "apikey",
											"orig": "apikey",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"params": []any{
										map[string]any{
											"example": "01613950781",
											"kind": "param",
											"name": "phone_number",
											"orig": "phone_number",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "BD",
											"kind": "query",
											"name": "country_code",
											"orig": "country_code",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/validate/{phone_number}",
								"parts": []any{
									"validate",
									"{phone_number}",
								},
								"select": map[string]any{
									"exist": []any{
										"apikey",
										"country_code",
										"phone_number",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"validate",
						},
					},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
