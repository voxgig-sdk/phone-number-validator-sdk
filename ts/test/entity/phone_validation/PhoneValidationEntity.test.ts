

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { PhoneNumberValidatorSDK, BaseFeature, config, stdutil } from '../../..'

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


describe('PhoneValidationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when PHONE_NUMBER_VALIDATOR_TEST_LIVE=TRUE.
  afterEach(liveDelay('PHONE_NUMBER_VALIDATOR_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = PhoneNumberValidatorSDK.test()
    const ent = testsdk.PhoneValidation()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = PhoneNumberValidatorSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.PhoneValidation().load({"phone_number":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.PHONE_NUMBER_VALIDATOR_TEST_LIVE
    for (const op of []) {
      if (!live && maybeSkipControl(t, 'entityOp', 'phone_validation.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"carrier":{"a":true,"h":"Carrier","n":"carrier","r":false,"sh":"Name of the carrier/operator","t":"`$STRING`","key$":"carrier","index$":0},"country_code":{"a":true,"h":"Country Code","n":"country_code","r":false,"sh":"ISO country code","t":"`$STRING`","key$":"country_code","index$":1},"country_name":{"a":true,"h":"Country Name","n":"country_name","r":false,"sh":"Name of the country","t":"`$STRING`","key$":"country_name","index$":2},"country_prefix":{"a":true,"h":"Country Prefix","n":"country_prefix","r":false,"sh":"Country dialing prefix","t":"`$STRING`","key$":"country_prefix","index$":3},"international_format":{"a":true,"h":"International Format","n":"international_format","r":false,"sh":"Phone number in international format","t":"`$STRING`","key$":"international_format","index$":4},"line_type":{"a":true,"h":"Line Type","n":"line_type","r":false,"sh":"Type of phone line (mobile, landline, etc.)","t":"`$STRING`","key$":"line_type","index$":5},"local_format":{"a":true,"h":"Local Format","n":"local_format","r":false,"sh":"Phone number in local format","t":"`$STRING`","key$":"local_format","index$":6},"number":{"a":true,"h":"Number","n":"number","r":false,"sh":"The original phone number","t":"`$STRING`","key$":"number","index$":7},"valid":{"a":true,"h":"Valid","n":"valid","r":false,"sh":"Whether the phone number is valid","t":"`$BOOLEAN`","key$":"valid","index$":8}},"name":"phone_validation","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /validate/{phone_number}","source":"openapi3","version":2},"g":{"header":[{"a":true,"ex":"num_live_Nf2vjeM19tHdi42qQ2LaVVMg2IGk1ReU2BYBKnvm","k":"header","n":"apikey","or":"apikey","r":true,"t":"`$STRING`","index$":0}],"params":[{"a":true,"ex":"01613950781","k":"param","n":"phone_number","or":"phone_number","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"ex":"BD","k":"query","n":"country_code","or":"country_code","r":false,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/validate/{phone_number}","q":{"exist":["apikey","phone_number"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"validate"},{"var":"phone_number"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"phone_validation","name__orig":"phone_validation","Name":"PhoneValidation","name_":"phone_validation","name-":"phone-validation","NAME":"PHONE_VALIDATION","index$":0}, {"active":true,"entity":"phone_validation","key$":"BasicPhoneValidationFlow","kind":"basic","name":"BasicPhoneValidationFlow","param":{},"step":[{"a":false,"d":{},"i":{"ref":"phone_validation_ref01","srcdatavar":"phone_validation_ref01_data","suffix":"_dt0"},"m":{"id":"phone_validation01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-phone_validation_ref01"}}],"unreachable":true}]}, 'PhoneValidation', {"GET /validate/{phone_number}":{"protocol":"http","parameters":[{"name":"phone_number","in":"path","required":true,"description":"The phone number to validate","schema":{"type":"string"},"example":"01613950781","index$":0},{"name":"apikey","in":"header","required":true,"description":"API key for authentication","schema":{"type":"string"},"example":"num_live_Nf2vjeM19tHdi42qQ2LaVVMg2IGk1ReU2BYBKnvm","index$":1},{"name":"country_code","in":"query","required":false,"description":"Two-letter ISO country code to help with validation","schema":{"type":"string","pattern":"^[A-Z]{2}$"},"example":"BD","index$":2}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let phone_validation_ref01_data = Object.values(setup.data.existing.phone_validation)[0] as any

  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/phone_validation/PhoneValidationTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = PhoneNumberValidatorSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['phone_validation01','phone_validation02','phone_validation03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'PHONE_NUMBER_VALIDATOR_TEST_PHONE_VALIDATION_ENTID': idmap,
    'PHONE_NUMBER_VALIDATOR_TEST_LIVE': 'FALSE',
    'PHONE_NUMBER_VALIDATOR_TEST_EXPLAIN': 'FALSE',
    'PHONE_NUMBER_VALIDATOR_APIKEY': '',
  })

  idmap = env['PHONE_NUMBER_VALIDATOR_TEST_PHONE_VALIDATION_ENTID']

  const live = 'TRUE' === env.PHONE_NUMBER_VALIDATOR_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['PHONE_NUMBER_VALIDATOR_TEST_PHONE_VALIDATION_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new PhoneNumberValidatorSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.PHONE_NUMBER_VALIDATOR_APIKEY,
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
    explain: 'TRUE' === env.PHONE_NUMBER_VALIDATOR_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
