-- HelloAsService SDK error

local HelloAsServiceError = {}
HelloAsServiceError.__index = HelloAsServiceError


function HelloAsServiceError.new(code, msg, ctx)
  local self = setmetatable({}, HelloAsServiceError)
  self.is_sdk_error = true
  self.sdk = "HelloAsService"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function HelloAsServiceError:error()
  return self.msg
end


function HelloAsServiceError:__tostring()
  return self.msg
end


return HelloAsServiceError
