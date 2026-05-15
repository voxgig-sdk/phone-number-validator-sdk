# PhoneNumberValidator SDK utility: make_context

from core.context import PhoneNumberValidatorContext


def make_context_util(ctxmap, basectx):
    return PhoneNumberValidatorContext(ctxmap, basectx)
