
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { HelloAsServiceSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await HelloAsServiceSDK.test()
    equal(null !== testsdk, true)
  })

})
