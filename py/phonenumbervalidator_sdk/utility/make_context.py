# PhoneNumberValidator SDK utility: make_context

from phonenumbervalidator_sdk.core.context import PhoneNumberValidatorContext


def make_context_util(ctxmap, basectx):
    return PhoneNumberValidatorContext(ctxmap, basectx)
