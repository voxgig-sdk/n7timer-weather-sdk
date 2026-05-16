# N7timerWeather SDK utility registration
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

N7timerWeatherUtility.registrar = ->(u) {
  u.clean = N7timerWeatherUtilities::Clean
  u.done = N7timerWeatherUtilities::Done
  u.make_error = N7timerWeatherUtilities::MakeError
  u.feature_add = N7timerWeatherUtilities::FeatureAdd
  u.feature_hook = N7timerWeatherUtilities::FeatureHook
  u.feature_init = N7timerWeatherUtilities::FeatureInit
  u.fetcher = N7timerWeatherUtilities::Fetcher
  u.make_fetch_def = N7timerWeatherUtilities::MakeFetchDef
  u.make_context = N7timerWeatherUtilities::MakeContext
  u.make_options = N7timerWeatherUtilities::MakeOptions
  u.make_request = N7timerWeatherUtilities::MakeRequest
  u.make_response = N7timerWeatherUtilities::MakeResponse
  u.make_result = N7timerWeatherUtilities::MakeResult
  u.make_point = N7timerWeatherUtilities::MakePoint
  u.make_spec = N7timerWeatherUtilities::MakeSpec
  u.make_url = N7timerWeatherUtilities::MakeUrl
  u.param = N7timerWeatherUtilities::Param
  u.prepare_auth = N7timerWeatherUtilities::PrepareAuth
  u.prepare_body = N7timerWeatherUtilities::PrepareBody
  u.prepare_headers = N7timerWeatherUtilities::PrepareHeaders
  u.prepare_method = N7timerWeatherUtilities::PrepareMethod
  u.prepare_params = N7timerWeatherUtilities::PrepareParams
  u.prepare_path = N7timerWeatherUtilities::PreparePath
  u.prepare_query = N7timerWeatherUtilities::PrepareQuery
  u.result_basic = N7timerWeatherUtilities::ResultBasic
  u.result_body = N7timerWeatherUtilities::ResultBody
  u.result_headers = N7timerWeatherUtilities::ResultHeaders
  u.transform_request = N7timerWeatherUtilities::TransformRequest
  u.transform_response = N7timerWeatherUtilities::TransformResponse
}
