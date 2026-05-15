<?php
declare(strict_types=1);

// PhoneNumberValidator SDK base feature

class PhoneNumberValidatorBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(PhoneNumberValidatorContext $ctx, array $options): void {}
    public function PostConstruct(PhoneNumberValidatorContext $ctx): void {}
    public function PostConstructEntity(PhoneNumberValidatorContext $ctx): void {}
    public function SetData(PhoneNumberValidatorContext $ctx): void {}
    public function GetData(PhoneNumberValidatorContext $ctx): void {}
    public function GetMatch(PhoneNumberValidatorContext $ctx): void {}
    public function SetMatch(PhoneNumberValidatorContext $ctx): void {}
    public function PrePoint(PhoneNumberValidatorContext $ctx): void {}
    public function PreSpec(PhoneNumberValidatorContext $ctx): void {}
    public function PreRequest(PhoneNumberValidatorContext $ctx): void {}
    public function PreResponse(PhoneNumberValidatorContext $ctx): void {}
    public function PreResult(PhoneNumberValidatorContext $ctx): void {}
    public function PreDone(PhoneNumberValidatorContext $ctx): void {}
    public function PreUnexpected(PhoneNumberValidatorContext $ctx): void {}
}
