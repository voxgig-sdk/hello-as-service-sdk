<?php
declare(strict_types=1);

// GetGreeting entity test

require_once __DIR__ . '/../helloasservice_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class GetGreetingEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = HelloAsServiceSDK::test(null, null);
        $ent = $testsdk->GetGreeting(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = get_greeting_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "get_greeting." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set HELLOASSERVICE_TEST_GET_GREETING_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $get_greeting_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.get_greeting")));
        $get_greeting_ref01_data = null;
        if (count($get_greeting_ref01_data_raw) > 0) {
            $get_greeting_ref01_data = Helpers::to_map($get_greeting_ref01_data_raw[0][1]);
        }

        // LOAD
        $get_greeting_ref01_ent = $client->GetGreeting(null);
        $get_greeting_ref01_match_dt0 = [];
        $get_greeting_ref01_data_dt0_loaded = $get_greeting_ref01_ent->load($get_greeting_ref01_match_dt0, null);
        $this->assertNotNull($get_greeting_ref01_data_dt0_loaded);

    }
}

function get_greeting_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/get_greeting/GetGreetingTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = HelloAsServiceSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["get_greeting01", "get_greeting02", "get_greeting03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("HELLOASSERVICE_TEST_GET_GREETING_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "HELLOASSERVICE_TEST_GET_GREETING_ENTID" => $idmap,
        "HELLOASSERVICE_TEST_LIVE" => "FALSE",
        "HELLOASSERVICE_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["HELLOASSERVICE_TEST_GET_GREETING_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["HELLOASSERVICE_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new HelloAsServiceSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["HELLOASSERVICE_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["HELLOASSERVICE_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
