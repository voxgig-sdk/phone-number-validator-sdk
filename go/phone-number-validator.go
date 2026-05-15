package voxgigphonenumbervalidatorsdk

import (
	"github.com/voxgig-sdk/phone-number-validator-sdk/core"
	"github.com/voxgig-sdk/phone-number-validator-sdk/entity"
	"github.com/voxgig-sdk/phone-number-validator-sdk/feature"
	_ "github.com/voxgig-sdk/phone-number-validator-sdk/utility"
)

// Type aliases preserve external API.
type PhoneNumberValidatorSDK = core.PhoneNumberValidatorSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type PhoneNumberValidatorEntity = core.PhoneNumberValidatorEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type PhoneNumberValidatorError = core.PhoneNumberValidatorError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewPhoneValidationEntityFunc = func(client *core.PhoneNumberValidatorSDK, entopts map[string]any) core.PhoneNumberValidatorEntity {
		return entity.NewPhoneValidationEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewPhoneNumberValidatorSDK = core.NewPhoneNumberValidatorSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
