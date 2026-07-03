package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "HelloAsService",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://hellosalut.stefanbohacek.dev",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"get_greeting": map[string]any{},
			},
		},
		"entity": map[string]any{
			"get_greeting": map[string]any{
				"fields": []any{
					map[string]any{
						"active": true,
						"name": "cc",
						"req": false,
						"type": "`$STRING`",
						"index$": 0,
					},
					map[string]any{
						"active": true,
						"name": "code",
						"req": false,
						"type": "`$STRING`",
						"index$": 1,
					},
					map[string]any{
						"active": true,
						"name": "hello",
						"req": false,
						"type": "`$STRING`",
						"index$": 2,
					},
					map[string]any{
						"active": true,
						"name": "ip",
						"req": false,
						"type": "`$STRING`",
						"index$": 3,
					},
				},
				"name": "get_greeting",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"active": true,
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"active": true,
											"example": "US",
											"kind": "query",
											"name": "cc",
											"orig": "cc",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "8.8.8.8",
											"kind": "query",
											"name": "ip",
											"orig": "ip",
											"reqd": false,
											"type": "`$STRING`",
										},
										map[string]any{
											"active": true,
											"example": "fr",
											"kind": "query",
											"name": "lang",
											"orig": "lang",
											"reqd": false,
											"type": "`$STRING`",
										},
									},
								},
								"method": "GET",
								"orig": "/",
								"parts": []any{},
								"select": map[string]any{
									"exist": []any{
										"cc",
										"ip",
										"lang",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"index$": 0,
							},
						},
						"key$": "load",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
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
