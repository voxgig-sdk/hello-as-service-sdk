
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { HelloAsServiceSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('GetGreetingEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when HELLOASSERVICE_TEST_LIVE=TRUE.
  afterEach(liveDelay('HELLOASSERVICE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = HelloAsServiceSDK.test()
    const ent = testsdk.GetGreeting()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.HELLO_AS_SERVICE_TEST_LIVE
    for (const op of ['load']) {
      if (maybeSkipControl(t, 'entityOp', 'get_greeting.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set HELLO_AS_SERVICE_TEST_GET_GREETING_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let get_greeting_ref01_data = Object.values(setup.data.existing.get_greeting)[0] as any

    // LOAD
    const get_greeting_ref01_ent = client.GetGreeting()
    const get_greeting_ref01_match_dt0: any = {}
    const get_greeting_ref01_data_dt0 = await get_greeting_ref01_ent.load(get_greeting_ref01_match_dt0)
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

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['HELLO_AS_SERVICE_TEST_GET_GREETING_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'HELLO_AS_SERVICE_TEST_GET_GREETING_ENTID': idmap,
    'HELLO_AS_SERVICE_TEST_LIVE': 'FALSE',
    'HELLO_AS_SERVICE_TEST_EXPLAIN': 'FALSE',
    'HELLO_AS_SERVICE_APIKEY': 'NONE',
  })

  idmap = env['HELLO_AS_SERVICE_TEST_GET_GREETING_ENTID']

  const live = 'TRUE' === env.HELLO_AS_SERVICE_TEST_LIVE

  if (live) {
    client = new HelloAsServiceSDK(merge([
      {
        apikey: env.HELLO_AS_SERVICE_APIKEY,
      },
      extra
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
