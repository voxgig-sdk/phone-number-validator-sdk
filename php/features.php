<?php
declare(strict_types=1);

// PhoneNumberValidator SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class PhoneNumberValidatorFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new PhoneNumberValidatorBaseFeature();
            case "test":
                return new PhoneNumberValidatorTestFeature();
            default:
                return new PhoneNumberValidatorBaseFeature();
        }
    }
}
