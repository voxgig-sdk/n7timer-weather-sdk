<?php
declare(strict_types=1);

// GraphicalApi entity test

require_once __DIR__ . '/../n7timerweather_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class GraphicalApiEntityTest extends TestCase
{
    // main.kit.test.live.strict is true (the default is true): a live
    // request that fails, or a live test missing an input it needs,
    // fails the test.
    // An account with no record for a test to read skips it either way.
    private const LIVE_STRICT = true;

    public function test_create_instance(): void
    {
        $testsdk = N7timerWeatherSDK::test(null, null);
        $ent = $testsdk->GraphicalApi(null);
        $this->assertNotNull($ent);
    }

    public function test_validate(): void
    {
        $cfg = N7timerWeatherConfig::shared_config();
        if (!isset($cfg["feature"]["validate"])) {
            $this->markTestSkipped('feature not present in this SDK: validate');
        }
        $client = N7timerWeatherSDK::test(null, ["feature" => ["validate" => ["active" => true]]]);
        $err = null;
        try {
            $client->GraphicalApi(null)->load(["ac" => 'x', "lat" => 1, "lon" => 1], null);
        } catch (\Throwable $e) {
            $err = $e;
        }
        $this->assertSame('validate_failed', $err->sdk_code ?? null);
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
        $graphical_api_ref01_data_dt0_loaded = $graphical_api_ref01_ent->load($graphical_api_ref01_match_dt0, null);
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

    // Whether *_ENTID supplied the idmap, read before env_override consumes
    // it: without it, the ids a live flow binds are the fixture's synthetic ones.
    $entid_env_raw = getenv("N7TIMER_WEATHER_TEST_GRAPHICAL_API_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "N7TIMER_WEATHER_TEST_GRAPHICAL_API_ENTID" => $idmap,
        "N7TIMER_WEATHER_TEST_LIVE" => "FALSE",
        "N7TIMER_WEATHER_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["N7TIMER_WEATHER_TEST_GRAPHICAL_API_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["N7TIMER_WEATHER_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            Runner::live_client_options(),
            [
            ],
            // ismap, not a plain "?? []" default: an empty PHP array is a
            // LIST, and a non-map later entry REPLACES the accumulated map in
            // merge - so the no-extras call discarded live_client_options()
            // and the apikey/server map above it.
            Vs::ismap($extra) ? $extra : new \stdClass(),
        ]);
        // "?? []" because merge legitimately answers with a stdClass when every
        // contributing entry is an EMPTY map - an SDK with no apikey and no
        // server variables generates an empty middle entry, so that is the
        // common case, not the edge one. to_map returns null for a non-array by
        // design, and the constructor takes a non-nullable array, so without the
        // fallback every such SDK died on "must be of type array, null given"
        // the moment live mode was switched on. Offline mode never reaches this
        // branch, which is why the offline suite stayed green.
        $client = new N7timerWeatherSDK(Helpers::to_map($merged_opts) ?? []);
    }

    $live = $env["N7TIMER_WEATHER_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["N7TIMER_WEATHER_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
