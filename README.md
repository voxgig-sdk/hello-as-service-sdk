# HelloAsService SDK

Greet visitors in their native language based on IP address or browser language settings

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Hello as Service

Hello Salut is a small public API by [Stefan Bohacek](https://stefanbohacek.com) that returns a localised greeting ("hello") in the visitor's native language. It is designed to be dropped into a webpage or app to give a friendly, language-aware welcome without the caller having to ship a translations table.

What you get from the API:

- A localised greeting derived from a supplied IP address, or from the caller's browser language settings.
- A simple GET endpoint at the server root that accepts an `ip` query parameter, e.g. `https://hellosalut.stefanbohacek.dev/?ip=89.120.120.120`.

The service has no authentication and no published rate limits. The community catalogue on freepublicapis.com reports CORS as disabled and the API as currently unreachable, so callers should be prepared for downtime and proxy requests server-side if needed.

## Try it

**TypeScript**
```bash
npm install hello-as-service
```

**Python**
```bash
pip install hello-as-service-sdk
```

**PHP**
```bash
composer require voxgig/hello-as-service-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/hello-as-service-sdk/go
```

**Ruby**
```bash
gem install hello-as-service-sdk
```

**Lua**
```bash
luarocks install hello-as-service-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { HelloAsServiceSDK } from 'hello-as-service'

const client = new HelloAsServiceSDK({})

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
cd go-mcp && go build -o hello-as-service-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "hello-as-service": {
      "command": "/abs/path/to/hello-as-service-mcp"
    }
  }
}
```

## Entities

The API exposes one entity:

| Entity | Description | API path |
| --- | --- | --- |
| **GetGreeting** | Represents the localised greeting lookup at the server root (`GET /`), accepting an `ip` query parameter or falling back to the request's browser language. | `/` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from helloasservice_sdk import HelloAsServiceSDK

client = HelloAsServiceSDK({})


# Load a specific getgreeting
getgreeting, err = client.GetGreeting(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'helloasservice_sdk.php';

$client = new HelloAsServiceSDK([]);


// Load a specific getgreeting
[$getgreeting, $err] = $client->GetGreeting(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/hello-as-service-sdk/go"

client := sdk.NewHelloAsServiceSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "HelloAsService_sdk"

client = HelloAsServiceSDK.new({})


# Load a specific getgreeting
getgreeting, err = client.GetGreeting(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("hello-as-service_sdk")

local client = sdk.new({})


-- Load a specific getgreeting
local getgreeting, err = client:GetGreeting(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = HelloAsServiceSDK.test()
const result = await client.GetGreeting().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = HelloAsServiceSDK.test(None, None)
result, err = client.GetGreeting(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = HelloAsServiceSDK::test(null, null);
[$result, $err] = $client->GetGreeting(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.GetGreeting(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = HelloAsServiceSDK.test(nil, nil)
result, err = client.GetGreeting(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:GetGreeting(nil):load(
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

## Using the Hello as Service

- Upstream: [https://hellosalut.stefanbohacek.dev](https://hellosalut.stefanbohacek.dev)
- API docs: [https://freepublicapis.com/hello-as-service](https://freepublicapis.com/hello-as-service)

- No explicit licence is published by the API provider.
- The service is a personal project by Stefan Bohacek; review the project page before redistributing responses.
- The community catalogue currently reports the upstream as non-functional, so availability is not guaranteed.

---

Generated from the Hello as Service OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
