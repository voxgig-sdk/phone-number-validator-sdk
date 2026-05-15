# PhoneNumberValidator SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module PhoneNumberValidatorFeatures
  def self.make_feature(name)
    case name
    when "base"
      PhoneNumberValidatorBaseFeature.new
    when "test"
      PhoneNumberValidatorTestFeature.new
    else
      PhoneNumberValidatorBaseFeature.new
    end
  end
end
