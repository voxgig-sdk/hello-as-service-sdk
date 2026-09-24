

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { HelloAsServiceSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('GetGreetingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HELLO_AS_SERVICE_TEST_LIVE=TRUE.
  afterEach(liveDelay('HELLO_AS_SERVICE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HelloAsServiceSDK.test()
    const ent = testsdk.GetGreeting()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HELLO_AS_SERVICE_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'get_greeting.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"cc":{"a":true,"h":"Cc","n":"cc","r":false,"sh":"Country code detected or used","t":"`$STRING`","key$":"cc","index$":0},"code":{"a":true,"h":"Code","n":"code","r":false,"sh":"Language code of the returned greeting","t":"`$STRING`","key$":"code","index$":1},"hello":{"a":true,"h":"Hello","n":"hello","r":false,"sh":"The greeting in the requested or detected language","t":"`$STRING`","key$":"hello","index$":2},"ip":{"a":true,"h":"Ip","n":"ip","r":false,"sh":"IP address used for the request (if applicable)","t":"`$STRING`","key$":"ip","index$":3}},"name":"get_greeting","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /","source":"openapi3","version":2},"g":{"query":[{"a":true,"ex":"US","k":"query","n":"cc","or":"cc","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":"8.8.8.8","k":"query","n":"ip","or":"ip","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":"fr","k":"query","n":"lang","or":"lang","r":false,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/","q":{"exist":["cc","ip","lang"]},"r":{},"s":[],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"get_greeting","name__orig":"get_greeting","Name":"GetGreeting","name_":"get_greeting","name-":"get-greeting","NAME":"GET_GREETING","index$":0}, {"active":true,"entity":"get_greeting","key$":"BasicGetGreetingFlow","kind":"basic","name":"BasicGetGreetingFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"get_greeting_ref01","srcdatavar":"get_greeting_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-get_greeting_ref01"}}],"index$":0}]}, 'GetGreeting', {"GET /":{"protocol":"http","operationId":"getGreeting","responses":{"200":{"description":"Successful response with localized greeting","content":{"application/json":{"schema":{"type":"object","properties":{"hello":{"description":"The greeting in the requested or detected language","example":"Hello","key$":"hello","type":"string"},"code":{"description":"Language code of the returned greeting","example":"en","key$":"code","type":"string"},"ip":{"description":"IP address used for the request (if applicable)","example":"8.8.8.8","key$":"ip","type":"string"},"cc":{"description":"Country code detected or used","example":"US","key$":"cc","type":"string"}},"index$":0},"examples":{"english":{"summary":"English greeting","value":{"hello":"Hello","code":"en","cc":"US"}},"french":{"summary":"French greeting","value":{"hello":"Bonjour","code":"fr","cc":"FR"}},"spanish":{"summary":"Spanish greeting","value":{"hello":"Hola","code":"es","cc":"ES"}}}}}},"400":{"description":"Bad request - Invalid parameters","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","example":"Invalid parameter"}}}}}},"500":{"description":"Internal server error","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","example":"Server error"}}}}}}},"parameters":[{"name":"ip","in":"query","description":"IP address to determine the user's location and return appropriate greeting","required":false,"schema":{"type":"string","example":"8.8.8.8"},"index$":0},{"name":"lang","in":"query","description":"Language code (ISO 639-1) to return greeting in specific language","required":false,"schema":{"type":"string","example":"fr"},"index$":1},{"name":"cc","in":"query","description":"Country code (ISO 3166-1 alpha-2) to return greeting for specific country","required":false,"schema":{"type":"string","example":"US"},"index$":2}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let get_greeting_ref01_data = Object.values(setup.data.existing.get_greeting)[0] as any

    // LOAD
    const get_greeting_ref01_ent = client.GetGreeting()
    const get_greeting_ref01_match_dt0: any = {}
    const get_greeting_ref01_data_dt0 = (await get_greeting_ref01_ent.load(get_greeting_ref01_match_dt0)).data()
    assert(null != get_greeting_ref01_data_dt0)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/get_greeting/GetGreetingTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = HelloAsServiceSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['get_greeting01','get_greeting02','get_greeting03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'HELLO_AS_SERVICE_TEST_GET_GREETING_ENTID': idmap,
    'HELLO_AS_SERVICE_TEST_LIVE': 'FALSE',
    'HELLO_AS_SERVICE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['HELLO_AS_SERVICE_TEST_GET_GREETING_ENTID']

  const live = 'TRUE' === env.HELLO_AS_SERVICE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['HELLO_AS_SERVICE_TEST_GET_GREETING_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new HelloAsServiceSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.HELLO_AS_SERVICE_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
