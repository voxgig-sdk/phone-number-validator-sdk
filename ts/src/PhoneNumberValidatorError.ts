
import { Context } from './Context'


class PhoneNumberValidatorError extends Error {

  isPhoneNumberValidatorError = true

  sdk = 'PhoneNumberValidator'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  PhoneNumberValidatorError
}

