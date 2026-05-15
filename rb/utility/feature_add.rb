# PhoneNumberValidator SDK utility: feature_add
module PhoneNumberValidatorUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
