
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { PhoneNumberValidatorSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await PhoneNumberValidatorSDK.test()
    equal(null !== testsdk, true)
  })

})
