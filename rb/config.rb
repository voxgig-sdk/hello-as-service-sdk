# HelloAsService SDK configuration

module HelloAsServiceConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "HelloAsService",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://hellosalut.stefanbohacek.dev",
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "get_greeting" => {},
        },
      },
      "entity" => {
        "get_greeting" => {
          "fields" => [
            {
              "name" => "cc",
              "type" => "`$STRING`",
            },
            {
              "name" => "code",
              "type" => "`$STRING`",
            },
            {
              "name" => "hello",
              "type" => "`$STRING`",
            },
            {
              "name" => "ip",
              "type" => "`$STRING`",
            },
          ],
          "name" => "get_greeting",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => "US",
                        "kind" => "query",
                        "name" => "cc",
                        "orig" => "cc",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "8.8.8.8",
                        "kind" => "query",
                        "name" => "ip",
                        "orig" => "ip",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => "fr",
                        "kind" => "query",
                        "name" => "lang",
                        "orig" => "lang",
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/",
                  "parts" => [],
                  "select" => {
                    "exist" => [
                      "cc",
                      "ip",
                      "lang",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    HelloAsServiceFeatures.make_feature(name)
  end
end
