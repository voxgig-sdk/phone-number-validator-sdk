# PhoneNumberValidator SDK exists test

require "minitest/autorun"
require_relative "../PhoneNumberValidator_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = PhoneNumberValidatorSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
