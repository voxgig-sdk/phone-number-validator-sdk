# PhoneNumberValidator SDK feature factory

from feature.base_feature import PhoneNumberValidatorBaseFeature
from feature.test_feature import PhoneNumberValidatorTestFeature


def _make_feature(name):
    features = {
        "base": lambda: PhoneNumberValidatorBaseFeature(),
        "test": lambda: PhoneNumberValidatorTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
