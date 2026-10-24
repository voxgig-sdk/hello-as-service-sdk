import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "get_greeting",
    "accessor": "GetGreeting",
    "op": "load",
    "method": "GET",
    "path": "/",
    "args": [],
    "select": {
      "cc": "US",
      "ip": "8.8.8.8",
      "lang": "fr"
    },
    "headers": [],
    "cookies": [],
    "responseMedia": [
      "application/json"
    ],
    "query": [
      "ip",
      "lang",
      "cc"
    ],
    "queryArgs": [
      {
        "name": "cc",
        "wire": "cc"
      },
      {
        "name": "ip",
        "wire": "ip"
      },
      {
        "name": "lang",
        "wire": "lang"
      }
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "hello": "Hello",
      "code": "en",
      "cc": "US"
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})
