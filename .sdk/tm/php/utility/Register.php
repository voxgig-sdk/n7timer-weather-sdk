<?php
declare(strict_types=1);

// N7timerWeather SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

N7timerWeatherUtility::setRegistrar(function (N7timerWeatherUtility $u): void {
    $u->clean = [N7timerWeatherClean::class, 'call'];
    $u->done = [N7timerWeatherDone::class, 'call'];
    $u->make_error = [N7timerWeatherMakeError::class, 'call'];
    $u->feature_add = [N7timerWeatherFeatureAdd::class, 'call'];
    $u->feature_hook = [N7timerWeatherFeatureHook::class, 'call'];
    $u->feature_init = [N7timerWeatherFeatureInit::class, 'call'];
    $u->fetcher = [N7timerWeatherFetcher::class, 'call'];
    $u->make_fetch_def = [N7timerWeatherMakeFetchDef::class, 'call'];
    $u->make_context = [N7timerWeatherMakeContext::class, 'call'];
    $u->make_options = [N7timerWeatherMakeOptions::class, 'call'];
    $u->make_request = [N7timerWeatherMakeRequest::class, 'call'];
    $u->make_response = [N7timerWeatherMakeResponse::class, 'call'];
    $u->make_result = [N7timerWeatherMakeResult::class, 'call'];
    $u->make_point = [N7timerWeatherMakePoint::class, 'call'];
    $u->make_spec = [N7timerWeatherMakeSpec::class, 'call'];
    $u->make_url = [N7timerWeatherMakeUrl::class, 'call'];
    $u->param = [N7timerWeatherParam::class, 'call'];
    $u->prepare_auth = [N7timerWeatherPrepareAuth::class, 'call'];
    $u->prepare_body = [N7timerWeatherPrepareBody::class, 'call'];
    $u->prepare_headers = [N7timerWeatherPrepareHeaders::class, 'call'];
    $u->prepare_method = [N7timerWeatherPrepareMethod::class, 'call'];
    $u->prepare_params = [N7timerWeatherPrepareParams::class, 'call'];
    $u->prepare_path = [N7timerWeatherPreparePath::class, 'call'];
    $u->prepare_query = [N7timerWeatherPrepareQuery::class, 'call'];
    $u->result_basic = [N7timerWeatherResultBasic::class, 'call'];
    $u->result_body = [N7timerWeatherResultBody::class, 'call'];
    $u->result_headers = [N7timerWeatherResultHeaders::class, 'call'];
    $u->transform_request = [N7timerWeatherTransformRequest::class, 'call'];
    $u->transform_response = [N7timerWeatherTransformResponse::class, 'call'];
});
