# PhoneNumberValidator SDK utility: make_context
require_relative '../core/context'
module PhoneNumberValidatorUtilities
  MakeContext = ->(ctxmap, basectx) {
    PhoneNumberValidatorContext.new(ctxmap, basectx)
  }
end
