# ProjectName SDK exists test

import pytest
from phonenumbervalidator_sdk import PhoneNumberValidatorSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = PhoneNumberValidatorSDK.test(None, None)
        assert testsdk is not None
