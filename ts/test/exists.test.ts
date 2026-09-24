
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { HelloAsServiceSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = HelloAsServiceSDK.test()
    equal(testsdk instanceof HelloAsServiceSDK, true,
      'HelloAsServiceSDK.test() must return a client synchronously')
  })

})
