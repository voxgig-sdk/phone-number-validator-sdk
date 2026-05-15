<?php
declare(strict_types=1);

// PhoneNumberValidator SDK utility: prepare_headers

class PhoneNumberValidatorPrepareHeaders
{
    public static function call(PhoneNumberValidatorContext $ctx): array
    {
        $options = $ctx->client->options_map();
        $headers = \Voxgig\Struct\Struct::getprop($options, 'headers');
        if (!$headers) {
            return [];
        }
        $out = \Voxgig\Struct\Struct::clone($headers);
        return is_array($out) ? $out : [];
    }
}
