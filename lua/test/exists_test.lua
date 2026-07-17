-- PhoneNumberValidator SDK exists test

local sdk = require("phone-number-validator_sdk")

describe("PhoneNumberValidatorSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
