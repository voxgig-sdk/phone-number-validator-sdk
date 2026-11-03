# PhoneNumberValidator SDK utility: prepare_body
require_relative 'media'
module PhoneNumberValidatorUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return PhoneNumberValidatorUtilities.raw_body(ctx.reqdata) if PhoneNumberValidatorUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
