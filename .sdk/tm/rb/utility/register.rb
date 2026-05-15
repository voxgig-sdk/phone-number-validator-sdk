# PhoneNumberValidator SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

PhoneNumberValidatorUtility.registrar = ->(u) {
  u.clean = PhoneNumberValidatorUtilities::Clean
  u.done = PhoneNumberValidatorUtilities::Done
  u.make_error = PhoneNumberValidatorUtilities::MakeError
  u.feature_add = PhoneNumberValidatorUtilities::FeatureAdd
  u.feature_hook = PhoneNumberValidatorUtilities::FeatureHook
  u.feature_init = PhoneNumberValidatorUtilities::FeatureInit
  u.fetcher = PhoneNumberValidatorUtilities::Fetcher
  u.make_fetch_def = PhoneNumberValidatorUtilities::MakeFetchDef
  u.make_context = PhoneNumberValidatorUtilities::MakeContext
  u.make_options = PhoneNumberValidatorUtilities::MakeOptions
  u.make_request = PhoneNumberValidatorUtilities::MakeRequest
  u.make_response = PhoneNumberValidatorUtilities::MakeResponse
  u.make_result = PhoneNumberValidatorUtilities::MakeResult
  u.make_point = PhoneNumberValidatorUtilities::MakePoint
  u.make_spec = PhoneNumberValidatorUtilities::MakeSpec
  u.make_url = PhoneNumberValidatorUtilities::MakeUrl
  u.param = PhoneNumberValidatorUtilities::Param
  u.prepare_auth = PhoneNumberValidatorUtilities::PrepareAuth
  u.prepare_body = PhoneNumberValidatorUtilities::PrepareBody
  u.prepare_headers = PhoneNumberValidatorUtilities::PrepareHeaders
  u.prepare_method = PhoneNumberValidatorUtilities::PrepareMethod
  u.prepare_params = PhoneNumberValidatorUtilities::PrepareParams
  u.prepare_path = PhoneNumberValidatorUtilities::PreparePath
  u.prepare_query = PhoneNumberValidatorUtilities::PrepareQuery
  u.result_basic = PhoneNumberValidatorUtilities::ResultBasic
  u.result_body = PhoneNumberValidatorUtilities::ResultBody
  u.result_headers = PhoneNumberValidatorUtilities::ResultHeaders
  u.transform_request = PhoneNumberValidatorUtilities::TransformRequest
  u.transform_response = PhoneNumberValidatorUtilities::TransformResponse
}
