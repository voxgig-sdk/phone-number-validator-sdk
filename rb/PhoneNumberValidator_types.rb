# frozen_string_literal: true

# Typed models for the PhoneNumberValidator SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# PhoneValidation entity data model.
#
# @!attribute [rw] carrier
#   @return [String, nil]
#
# @!attribute [rw] country_code
#   @return [String, nil]
#
# @!attribute [rw] country_name
#   @return [String, nil]
#
# @!attribute [rw] country_prefix
#   @return [String, nil]
#
# @!attribute [rw] international_format
#   @return [String, nil]
#
# @!attribute [rw] line_type
#   @return [String, nil]
#
# @!attribute [rw] local_format
#   @return [String, nil]
#
# @!attribute [rw] number
#   @return [String, nil]
#
# @!attribute [rw] valid
#   @return [Boolean, nil]
PhoneValidation = Struct.new(
  :carrier,
  :country_code,
  :country_name,
  :country_prefix,
  :international_format,
  :line_type,
  :local_format,
  :number,
  :valid,
  keyword_init: true
)

# Request payload for PhoneValidation#load.
#
# @!attribute [rw] phone_number
#   @return [String]
#
# @!attribute [rw] country_code
#   @return [String, nil]
PhoneValidationLoadMatch = Struct.new(
  :phone_number,
  :country_code,
  keyword_init: true
)

