
import { Context } from './Context'


class HelloAsServiceError extends Error {

  isHelloAsServiceError = true

  sdk = 'HelloAsService'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  HelloAsServiceError
}

