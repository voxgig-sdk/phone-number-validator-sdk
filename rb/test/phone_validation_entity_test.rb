# PhoneValidation entity test

require "minitest/autorun"
require "json"
require_relative "../PhoneNumberValidator_sdk"
require_relative "runner"

class PhoneValidationEntityTest < Minitest::Test
  def test_create_instance
    testsdk = PhoneNumberValidatorSDK.test(nil, nil)
    ent = testsdk.PhoneValidation(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = phone_validation_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "phone_validation." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set PHONENUMBERVALIDATOR_TEST_PHONE_VALIDATION_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    phone_validation_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.phone_validation")))
    phone_validation_ref01_data = nil
    if phone_validation_ref01_data_raw.length > 0
      phone_validation_ref01_data = Helpers.to_map(phone_validation_ref01_data_raw[0][1])
    end

    # LOAD
    phone_validation_ref01_ent = client.PhoneValidation(nil)
    phone_validation_ref01_match_dt0 = {}
    phone_validation_ref01_data_dt0_loaded, err = phone_validation_ref01_ent.load(phone_validation_ref01_match_dt0, nil)
    assert_nil err
    assert !phone_validation_ref01_data_dt0_loaded.nil?

  end
end

def phone_validation_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "phone_validation", "PhoneValidationTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = PhoneNumberValidatorSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["phone_validation01", "phone_validation02", "phone_validation03", "validate01", "validate02", "validate03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["PHONENUMBERVALIDATOR_TEST_PHONE_VALIDATION_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "PHONENUMBERVALIDATOR_TEST_PHONE_VALIDATION_ENTID" => idmap,
    "PHONENUMBERVALIDATOR_TEST_LIVE" => "FALSE",
    "PHONENUMBERVALIDATOR_TEST_EXPLAIN" => "FALSE",
    "PHONENUMBERVALIDATOR_APIKEY" => "NONE",
  })

  idmap_resolved = Helpers.to_map(
    env["PHONENUMBERVALIDATOR_TEST_PHONE_VALIDATION_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["PHONENUMBERVALIDATOR_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
        "apikey" => env["PHONENUMBERVALIDATOR_APIKEY"],
      },
      extra || {},
    ])
    client = PhoneNumberValidatorSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["PHONENUMBERVALIDATOR_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["PHONENUMBERVALIDATOR_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
