# HelloAsService SDK utility: make_context
require_relative '../core/context'
module HelloAsServiceUtilities
  MakeContext = ->(ctxmap, basectx) {
    HelloAsServiceContext.new(ctxmap, basectx)
  }
end
