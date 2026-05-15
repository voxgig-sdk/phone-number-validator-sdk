-- PhoneNumberValidator SDK error

local PhoneNumberValidatorError = {}
PhoneNumberValidatorError.__index = PhoneNumberValidatorError


function PhoneNumberValidatorError.new(code, msg, ctx)
  local self = setmetatable({}, PhoneNumberValidatorError)
  self.is_sdk_error = true
  self.sdk = "PhoneNumberValidator"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function PhoneNumberValidatorError:error()
  return self.msg
end


function PhoneNumberValidatorError:__tostring()
  return self.msg
end


return PhoneNumberValidatorError
