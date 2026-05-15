package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewPhoneValidationEntityFunc func(client *PhoneNumberValidatorSDK, entopts map[string]any) PhoneNumberValidatorEntity

