# N7timerWeather SDK

Free global numerical weather forecasts from high-resolution NWP models, no API key required

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About 7Timer Weather API

[7Timer!](http://www.7timer.info) is a free global numerical weather forecast service that produces predictions by post-processing output from high-resolution NWP models. It exposes simple HTTP endpoints so any application can pull forecasts for an arbitrary latitude/longitude on Earth.

The service offers two API styles:

- A **graphical API** (`/bin/astro.php`, `/bin/civil.php`, etc.) that returns ready-to-embed PNG forecast charts.
- A **machine-readable API** (`/bin/api.pl`) that returns the same forecast data as XML or JSON.

Five forecast products are available: `astro` (astronomical seeing, cloud cover, transparency), `civil` (general weather), `civillight` (a lighter civil variant), `meteo` (detailed meteorological data), and `two` (two-day high-resolution forecast). Common query parameters include `lon`, `lat`, `product`, `output`, `ac` (altitude correction: 0, 2 or 7), `lang`, `unit` (metric or British), and `tzshift` for local timezone offsets.

No authentication is needed and the endpoints are open over plain HTTP. Because the service is volunteer-run, callers are asked to be considerate with request rates and to notify the maintainers about non-trivial use.

## Try it

**TypeScript**
```bash
npm install n7timer-weather
```

**Python**
```bash
pip install n7timer-weather-sdk
```

**PHP**
```bash
composer require voxgig/n7timer-weather-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/n7timer-weather-sdk/go
```

**Ruby**
```bash
gem install n7timer-weather-sdk
```

**Lua**
```bash
luarocks install n7timer-weather-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { N7timerWeatherSDK } from 'n7timer-weather'

const client = new N7timerWeatherSDK({})

// List all apipls
const apipls = await client.Apipl().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o n7timer-weather-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "n7timer-weather": {
      "command": "/abs/path/to/n7timer-weather-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Apipl** | The machine-readable forecast endpoint at `/bin/api.pl`, returning XML or JSON forecast data for a given `lon`/`lat` and `product`. | `/bin/api.pl` |
| **GraphicalApi** | The image-producing endpoints under `/bin/` (e.g. `/bin/astro.php`, `/bin/civil.php`, `/bin/meteo.php`) that return PNG forecast charts for embedding. | `/bin/astro.php` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from n7timerweather_sdk import N7timerWeatherSDK

client = N7timerWeatherSDK({})

# List all apipls
apipls, err = client.Apipl(None).list(None, None)
```

### PHP

```php
<?php
require_once 'n7timerweather_sdk.php';

$client = new N7timerWeatherSDK([]);

// List all apipls
[$apipls, $err] = $client->Apipl(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/n7timer-weather-sdk/go"

client := sdk.NewN7timerWeatherSDK(map[string]any{})

// List all apipls
apipls, err := client.Apipl(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "N7timerWeather_sdk"

client = N7timerWeatherSDK.new({})

# List all apipls
apipls, err = client.Apipl(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("n7timer-weather_sdk")

local client = sdk.new({})

-- List all apipls
local apipls, err = client:Apipl(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = N7timerWeatherSDK.test()
const result = await client.Apipl().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = N7timerWeatherSDK.test(None, None)
result, err = client.Apipl(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = N7timerWeatherSDK::test(null, null);
[$result, $err] = $client->Apipl(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Apipl(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = N7timerWeatherSDK.test(nil, nil)
result, err = client.Apipl(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Apipl(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the 7Timer Weather API

- Upstream: [http://www.7timer.info](http://www.7timer.info)
- API docs: [http://www.7timer.info/doc.php](http://www.7timer.info/doc.php)

- Weather data is free to use and redistribute for non-commercial purposes
- Commercial use is not permitted under the site's stated terms
- Developers are asked to notify the 7Timer maintainers when they use the data
- No API key or registration is required to call the endpoints

---

Generated from the 7Timer Weather API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
