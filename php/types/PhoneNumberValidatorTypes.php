<?php
declare(strict_types=1);

// Typed models for the PhoneNumberValidator SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** PhoneValidation entity data model. */
class PhoneValidation
{
    public ?string $carrier = null;
    public ?string $country_code = null;
    public ?string $country_name = null;
    public ?string $country_prefix = null;
    public ?string $international_format = null;
    public ?string $line_type = null;
    public ?string $local_format = null;
    public ?string $number = null;
    public ?bool $valid = null;
}

/** Request payload for PhoneValidation#load. */
class PhoneValidationLoadMatch
{
    public string $phone_number;
    public ?string $country_code = null;
}

