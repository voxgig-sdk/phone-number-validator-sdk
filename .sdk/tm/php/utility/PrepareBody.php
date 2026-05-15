<?php
declare(strict_types=1);

// PhoneNumberValidator SDK utility: prepare_body

class PhoneNumberValidatorPrepareBody
{
    public static function call(PhoneNumberValidatorContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
