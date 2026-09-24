
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { PhoneNumberValidatorSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = PhoneNumberValidatorSDK.test()
    equal(testsdk instanceof PhoneNumberValidatorSDK, true,
      'PhoneNumberValidatorSDK.test() must return a client synchronously')
  })

})
