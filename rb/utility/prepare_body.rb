# HelloAsService SDK utility: prepare_body
require_relative 'media'
module HelloAsServiceUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return HelloAsServiceUtilities.raw_body(ctx.reqdata) if HelloAsServiceUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
