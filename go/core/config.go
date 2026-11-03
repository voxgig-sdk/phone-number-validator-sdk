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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://api.numlookupapi.com/v1",
			"auth": map[string]any{
				"prefix": "",
				"name": "apikey",
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
						"title": "Carrier",
						"type": "`$STRING`",
						"short": "Name of the carrier/operator",
					},
					map[string]any{
						"name": "country_code",
						"title": "Country Code",
						"type": "`$STRING`",
						"short": "ISO country code",
					},
					map[string]any{
						"name": "country_name",
						"title": "Country Name",
						"type": "`$STRING`",
						"short": "Name of the country",
					},
					map[string]any{
						"name": "country_prefix",
						"title": "Country Prefix",
						"type": "`$STRING`",
						"short": "Country dialing prefix",
					},
					map[string]any{
						"name": "international_format",
						"title": "International Format",
						"type": "`$STRING`",
						"short": "Phone number in international format",
					},
					map[string]any{
						"name": "line_type",
						"title": "Line Type",
						"type": "`$STRING`",
						"short": "Type of phone line (mobile, landline, etc.)",
					},
					map[string]any{
						"name": "local_format",
						"title": "Local Format",
						"type": "`$STRING`",
						"short": "Phone number in local format",
					},
					map[string]any{
						"name": "number",
						"title": "Number",
						"type": "`$STRING`",
						"short": "The original phone number",
					},
					map[string]any{
						"name": "valid",
						"title": "Valid",
						"type": "`$BOOLEAN`",
						"short": "Whether the phone number is valid",
					},
				},
				"name": "phone_validation",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/validate/{phone_number}",
								"segments": []any{
									map[string]any{
										"lit": "validate",
									},
									map[string]any{
										"var": "phone_number",
									},
								},
								"parts": []any{
									"validate",
									"{phone_number}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"header": []any{
										map[string]any{
											"name": "apikey",
											"orig": "apikey",
											"type": "`$STRING`",
											"kind": "header",
											"reqd": true,
											"example": "num_live_Nf2vjeM19tHdi42qQ2LaVVMg2IGk1ReU2BYBKnvm",
										},
									},
									"params": []any{
										map[string]any{
											"name": "phone_number",
											"orig": "phone_number",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
											"example": "01613950781",
										},
									},
									"query": []any{
										map[string]any{
											"name": "country_code",
											"orig": "country_code",
											"type": "`$STRING`",
											"kind": "query",
											"example": "BD",
											"field": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"apikey",
										"phone_number",
									},
								},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
