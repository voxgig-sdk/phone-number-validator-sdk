<?php
declare(strict_types=1);

// PhoneNumberValidator SDK exists test

require_once __DIR__ . '/../phonenumbervalidator_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = PhoneNumberValidatorSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
