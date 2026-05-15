# HelloAsService SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

HelloAsServiceUtility.registrar = ->(u) {
  u.clean = HelloAsServiceUtilities::Clean
  u.done = HelloAsServiceUtilities::Done
  u.make_error = HelloAsServiceUtilities::MakeError
  u.feature_add = HelloAsServiceUtilities::FeatureAdd
  u.feature_hook = HelloAsServiceUtilities::FeatureHook
  u.feature_init = HelloAsServiceUtilities::FeatureInit
  u.fetcher = HelloAsServiceUtilities::Fetcher
  u.make_fetch_def = HelloAsServiceUtilities::MakeFetchDef
  u.make_context = HelloAsServiceUtilities::MakeContext
  u.make_options = HelloAsServiceUtilities::MakeOptions
  u.make_request = HelloAsServiceUtilities::MakeRequest
  u.make_response = HelloAsServiceUtilities::MakeResponse
  u.make_result = HelloAsServiceUtilities::MakeResult
  u.make_point = HelloAsServiceUtilities::MakePoint
  u.make_spec = HelloAsServiceUtilities::MakeSpec
  u.make_url = HelloAsServiceUtilities::MakeUrl
  u.param = HelloAsServiceUtilities::Param
  u.prepare_auth = HelloAsServiceUtilities::PrepareAuth
  u.prepare_body = HelloAsServiceUtilities::PrepareBody
  u.prepare_headers = HelloAsServiceUtilities::PrepareHeaders
  u.prepare_method = HelloAsServiceUtilities::PrepareMethod
  u.prepare_params = HelloAsServiceUtilities::PrepareParams
  u.prepare_path = HelloAsServiceUtilities::PreparePath
  u.prepare_query = HelloAsServiceUtilities::PrepareQuery
  u.result_basic = HelloAsServiceUtilities::ResultBasic
  u.result_body = HelloAsServiceUtilities::ResultBody
  u.result_headers = HelloAsServiceUtilities::ResultHeaders
  u.transform_request = HelloAsServiceUtilities::TransformRequest
  u.transform_response = HelloAsServiceUtilities::TransformResponse
}
