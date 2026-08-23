# HelloAsService SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "HelloAsService",
            "slug": "hello-as-service",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://hellosalut.stefanbohacek.dev",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "get_greeting": {},
            },
        },
        "entity": {
      "get_greeting": {
        "fields": [
          {
            "name": "cc",
            "short": "Country code detected or used",
            "type": "`$STRING`",
          },
          {
            "name": "code",
            "short": "Language code of the returned greeting",
            "type": "`$STRING`",
          },
          {
            "name": "hello",
            "short": "The greeting in the requested or detected language",
            "type": "`$STRING`",
          },
          {
            "name": "ip",
            "short": "IP address used for the request (if applicable)",
            "type": "`$STRING`",
          },
        ],
        "name": "get_greeting",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "query": [
                    {
                      "example": "US",
                      "kind": "query",
                      "name": "cc",
                      "orig": "cc",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "8.8.8.8",
                      "kind": "query",
                      "name": "ip",
                      "orig": "ip",
                      "type": "`$STRING`",
                    },
                    {
                      "example": "fr",
                      "kind": "query",
                      "name": "lang",
                      "orig": "lang",
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/",
                "parts": [],
                "select": {
                  "exist": [
                    "cc",
                    "ip",
                    "lang",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
