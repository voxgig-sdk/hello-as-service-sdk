# HelloAsService SDK exists test

require "minitest/autorun"
require_relative "../HelloAsService_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = HelloAsServiceSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
