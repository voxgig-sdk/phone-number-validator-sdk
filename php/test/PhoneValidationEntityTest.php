<?php
declare(strict_types=1);

// PhoneValidation entity test

require_once __DIR__ . '/../phonenumbervalidator_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class PhoneValidationEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = PhoneNumberValidatorSDK::test(null, null);
        $ent = $testsdk->PhoneValidation(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = phone_validation_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "phone_validation." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set PHONENUMBERVALIDATOR_TEST_PHONE_VALIDATION_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $phone_validation_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.phone_validation")));
        $phone_validation_ref01_data = null;
        if (count($phone_validation_ref01_data_raw) > 0) {
            $phone_validation_ref01_data = Helpers::to_map($phone_validation_ref01_data_raw[0][1]);
        }

        // LOAD
        $phone_validation_ref01_ent = $client->PhoneValidation(null);
        $phone_validation_ref01_match_dt0 = [];
        [$phone_validation_ref01_data_dt0_loaded, $err] = $phone_validation_ref01_ent->load($phone_validation_ref01_match_dt0, null);
        $this->assertNull($err);
        $this->assertNotNull($phone_validation_ref01_data_dt0_loaded);

    }
}

function phone_validation_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/phone_validation/PhoneValidationTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = PhoneNumberValidatorSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["phone_validation01", "phone_validation02", "phone_validation03", "validate01", "validate02", "validate03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("PHONENUMBERVALIDATOR_TEST_PHONE_VALIDATION_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "PHONENUMBERVALIDATOR_TEST_PHONE_VALIDATION_ENTID" => $idmap,
        "PHONENUMBERVALIDATOR_TEST_LIVE" => "FALSE",
        "PHONENUMBERVALIDATOR_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["PHONENUMBERVALIDATOR_TEST_PHONE_VALIDATION_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["PHONENUMBERVALIDATOR_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new PhoneNumberValidatorSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["PHONENUMBERVALIDATOR_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["PHONENUMBERVALIDATOR_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
