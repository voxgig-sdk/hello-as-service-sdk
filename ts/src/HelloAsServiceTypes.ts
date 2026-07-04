// Typed models for the HelloAsService SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface GetGreeting {
  cc?: string
  code?: string
  hello?: string
  ip?: string
}

export type GetGreetingLoadMatch = Partial<GetGreeting>

