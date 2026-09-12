-- HelloAsService SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "HelloAsService",
      slug = "hello-as-service",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://hellosalut.stefanbohacek.dev",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["get_greeting"] = {},
      },
    },
    entity = {
      ["get_greeting"] = {
        ["fields"] = {
          {
            ["name"] = "cc",
            ["short"] = "Country code detected or used",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "code",
            ["short"] = "Language code of the returned greeting",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "hello",
            ["short"] = "The greeting in the requested or detected language",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "ip",
            ["short"] = "IP address used for the request (if applicable)",
            ["type"] = "`$STRING`",
          },
        },
        ["name"] = "get_greeting",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = "US",
                      ["kind"] = "query",
                      ["name"] = "cc",
                      ["orig"] = "cc",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "8.8.8.8",
                      ["kind"] = "query",
                      ["name"] = "ip",
                      ["orig"] = "ip",
                      ["type"] = "`$STRING`",
                    },
                    {
                      ["example"] = "fr",
                      ["kind"] = "query",
                      ["name"] = "lang",
                      ["orig"] = "lang",
                      ["type"] = "`$STRING`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/",
                ["segments"] = {},
                ["select"] = {
                  ["exist"] = {
                    "cc",
                    "ip",
                    "lang",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["parts"] = {},
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
