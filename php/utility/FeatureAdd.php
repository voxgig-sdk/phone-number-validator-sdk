<?php
declare(strict_types=1);

// PhoneNumberValidator SDK utility: feature_add

class PhoneNumberValidatorFeatureAdd
{
    public static function call(PhoneNumberValidatorContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
