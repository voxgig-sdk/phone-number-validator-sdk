-- Typed models for the PhoneNumberValidator SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class PhoneValidation
---@field carrier? string
---@field country_code? string
---@field country_name? string
---@field country_prefix? string
---@field international_format? string
---@field line_type? string
---@field local_format? string
---@field number? string
---@field valid? boolean

---@class PhoneValidationLoadMatch
---@field phone_number string

local M = {}

return M
