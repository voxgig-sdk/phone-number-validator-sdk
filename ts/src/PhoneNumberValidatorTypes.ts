// Typed models for the PhoneNumberValidator SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface PhoneValidation {
  carrier?: string
  country_code?: string
  country_name?: string
  country_prefix?: string
  international_format?: string
  line_type?: string
  local_format?: string
  number?: string
  valid?: boolean
}

export interface PhoneValidationLoadMatch {
  phone_number: string
  country_code?: string
}

