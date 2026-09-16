# HelloAsService SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module HelloAsServiceFeatures
  def self.make_feature(name)
    case name
    when "base"
      HelloAsServiceBaseFeature.new
    when "ratelimit"
      HelloAsServiceRatelimitFeature.new
    when "retry"
      HelloAsServiceRetryFeature.new
    when "test"
      HelloAsServiceTestFeature.new
    when "timeout"
      HelloAsServiceTimeoutFeature.new
    else
      HelloAsServiceBaseFeature.new
    end
  end
end
