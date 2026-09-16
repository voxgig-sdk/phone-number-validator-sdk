# PhoneNumberValidator SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module PhoneNumberValidatorFeatures
  def self.make_feature(name)
    case name
    when "base"
      PhoneNumberValidatorBaseFeature.new
    when "ratelimit"
      PhoneNumberValidatorRatelimitFeature.new
    when "retry"
      PhoneNumberValidatorRetryFeature.new
    when "test"
      PhoneNumberValidatorTestFeature.new
    when "timeout"
      PhoneNumberValidatorTimeoutFeature.new
    else
      PhoneNumberValidatorBaseFeature.new
    end
  end
end
