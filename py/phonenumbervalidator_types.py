# Typed models for the PhoneNumberValidator SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class PhoneValidation:
    carrier: Optional[str] = None
    country_code: Optional[str] = None
    country_name: Optional[str] = None
    country_prefix: Optional[str] = None
    international_format: Optional[str] = None
    line_type: Optional[str] = None
    local_format: Optional[str] = None
    number: Optional[str] = None
    valid: Optional[bool] = None


@dataclass
class PhoneValidationLoadMatch:
    phone_number: str

