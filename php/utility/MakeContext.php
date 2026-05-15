<?php
declare(strict_types=1);

// PhoneNumberValidator SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class PhoneNumberValidatorMakeContext
{
    public static function call(array $ctxmap, ?PhoneNumberValidatorContext $basectx): PhoneNumberValidatorContext
    {
        return new PhoneNumberValidatorContext($ctxmap, $basectx);
    }
}
