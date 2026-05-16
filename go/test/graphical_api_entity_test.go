package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/n7timer-weather-sdk"
	"github.com/voxgig-sdk/n7timer-weather-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestGraphicalApiEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.GraphicalApi(nil)
		if ent == nil {
			t.Fatal("expected non-nil GraphicalApiEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := graphical_apiBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "graphical_api." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set N_TIMERWEATHER_TEST_GRAPHICAL_API_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		graphicalApiRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.graphical_api", setup.data)))
		var graphicalApiRef01Data map[string]any
		if len(graphicalApiRef01DataRaw) > 0 {
			graphicalApiRef01Data = core.ToMapAny(graphicalApiRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = graphicalApiRef01Data

		// LOAD
		graphicalApiRef01Ent := client.GraphicalApi(nil)
		graphicalApiRef01MatchDt0 := map[string]any{}
		graphicalApiRef01DataDt0Loaded, err := graphicalApiRef01Ent.Load(graphicalApiRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if graphicalApiRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func graphical_apiBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "graphical_api", "GraphicalApiTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read graphical_api test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse graphical_api test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"graphical_api01", "graphical_api02", "graphical_api03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("N_TIMERWEATHER_TEST_GRAPHICAL_API_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"N_TIMERWEATHER_TEST_GRAPHICAL_API_ENTID": idmap,
		"N_TIMERWEATHER_TEST_LIVE":      "FALSE",
		"N_TIMERWEATHER_TEST_EXPLAIN":   "FALSE",
		"N_TIMERWEATHER_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["N_TIMERWEATHER_TEST_GRAPHICAL_API_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["N_TIMERWEATHER_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["N_TIMERWEATHER_APIKEY"],
			},
			extra,
		})
		client = sdk.NewN7timerWeatherSDK(core.ToMapAny(mergedOpts))
	}

	live := env["N_TIMERWEATHER_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["N_TIMERWEATHER_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
