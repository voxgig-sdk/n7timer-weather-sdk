<?php
declare(strict_types=1);

// GraphicalApi entity test

require_once __DIR__ . '/../n7timerweather_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class GraphicalApiEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = N7timerWeatherSDK::test(null, null);
        $ent = $testsdk->GraphicalApi(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = graphical_api_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "graphical_api." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set N_TIMERWEATHER_TEST_GRAPHICAL_API_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $graphical_api_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.graphical_api")));
        $graphical_api_ref01_data = null;
        if (count($graphical_api_ref01_data_raw) > 0) {
            $graphical_api_ref01_data = Helpers::to_map($graphical_api_ref01_data_raw[0][1]);
        }

        // LOAD
        $graphical_api_ref01_ent = $client->GraphicalApi(null);
        $graphical_api_ref01_match_dt0 = [];
        [$graphical_api_ref01_data_dt0_loaded, $err] = $graphical_api_ref01_ent->load($graphical_api_ref01_match_dt0, null);
        $this->assertNull($err);
        $this->assertNotNull($graphical_api_ref01_data_dt0_loaded);

    }
}

function graphical_api_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/graphical_api/GraphicalApiTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = N7timerWeatherSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["graphical_api01", "graphical_api02", "graphical_api03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("N_TIMERWEATHER_TEST_GRAPHICAL_API_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "N_TIMERWEATHER_TEST_GRAPHICAL_API_ENTID" => $idmap,
        "N_TIMERWEATHER_TEST_LIVE" => "FALSE",
        "N_TIMERWEATHER_TEST_EXPLAIN" => "FALSE",
        "N_TIMERWEATHER_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["N_TIMERWEATHER_TEST_GRAPHICAL_API_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["N_TIMERWEATHER_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["N_TIMERWEATHER_APIKEY"],
            ],
            $extra ?? [],
        ]);
        $client = new N7timerWeatherSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["N_TIMERWEATHER_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["N_TIMERWEATHER_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
