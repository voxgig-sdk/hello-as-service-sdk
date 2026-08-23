
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'HelloAsService',
        slug: "hello-as-service",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://hellosalut.stefanbohacek.dev",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      get_greeting: {
      },

    }
  }


  entity = {
    "get_greeting": {
      "fields": [
        {
          "name": "cc",
          "short": "Country code detected or used",
          "type": "`$STRING`"
        },
        {
          "name": "code",
          "short": "Language code of the returned greeting",
          "type": "`$STRING`"
        },
        {
          "name": "hello",
          "short": "The greeting in the requested or detected language",
          "type": "`$STRING`"
        },
        {
          "name": "ip",
          "short": "IP address used for the request (if applicable)",
          "type": "`$STRING`"
        }
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
                    "type": "`$STRING`"
                  },
                  {
                    "example": "8.8.8.8",
                    "kind": "query",
                    "name": "ip",
                    "orig": "ip",
                    "type": "`$STRING`"
                  },
                  {
                    "example": "fr",
                    "kind": "query",
                    "name": "lang",
                    "orig": "lang",
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/",
              "parts": [],
              "select": {
                "exist": [
                  "cc",
                  "ip",
                  "lang"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config
}

