<?php
declare(strict_types=1);

// PhoneNumberValidator SDK utility: result_body

class PhoneNumberValidatorResultBody
{
    public static function call(PhoneNumberValidatorContext $ctx): ?PhoneNumberValidatorResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
