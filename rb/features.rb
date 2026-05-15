# HelloAsService SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module HelloAsServiceFeatures
  def self.make_feature(name)
    case name
    when "base"
      HelloAsServiceBaseFeature.new
    when "test"
      HelloAsServiceTestFeature.new
    else
      HelloAsServiceBaseFeature.new
    end
  end
end
