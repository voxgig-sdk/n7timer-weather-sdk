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

func TestApiplEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Apipl(nil)
		if ent == nil {
			t.Fatal("expected non-nil ApiplEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := apiplBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "apipl." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set N_TIMERWEATHER_TEST_APIPL_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		apiplRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.apipl", setup.data)))
		var apiplRef01Data map[string]any
		if len(apiplRef01DataRaw) > 0 {
			apiplRef01Data = core.ToMapAny(apiplRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = apiplRef01Data

		// LIST
		apiplRef01Ent := client.Apipl(nil)
		apiplRef01Match := map[string]any{}

		apiplRef01ListResult, err := apiplRef01Ent.List(apiplRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, apiplRef01ListOk := apiplRef01ListResult.([]any)
		if !apiplRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", apiplRef01ListResult)
		}

	})
}

func apiplBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "apipl", "ApiplTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read apipl test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse apipl test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"apipl01", "apipl02", "apipl03"},
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
	entidEnvRaw := os.Getenv("N_TIMERWEATHER_TEST_APIPL_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"N_TIMERWEATHER_TEST_APIPL_ENTID": idmap,
		"N_TIMERWEATHER_TEST_LIVE":      "FALSE",
		"N_TIMERWEATHER_TEST_EXPLAIN":   "FALSE",
		"N_TIMERWEATHER_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["N_TIMERWEATHER_TEST_APIPL_ENTID"])
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
