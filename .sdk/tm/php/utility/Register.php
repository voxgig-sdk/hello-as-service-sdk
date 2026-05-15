<?php
declare(strict_types=1);

// HelloAsService SDK utility registration

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

HelloAsServiceUtility::setRegistrar(function (HelloAsServiceUtility $u): void {
    $u->clean = [HelloAsServiceClean::class, 'call'];
    $u->done = [HelloAsServiceDone::class, 'call'];
    $u->make_error = [HelloAsServiceMakeError::class, 'call'];
    $u->feature_add = [HelloAsServiceFeatureAdd::class, 'call'];
    $u->feature_hook = [HelloAsServiceFeatureHook::class, 'call'];
    $u->feature_init = [HelloAsServiceFeatureInit::class, 'call'];
    $u->fetcher = [HelloAsServiceFetcher::class, 'call'];
    $u->make_fetch_def = [HelloAsServiceMakeFetchDef::class, 'call'];
    $u->make_context = [HelloAsServiceMakeContext::class, 'call'];
    $u->make_options = [HelloAsServiceMakeOptions::class, 'call'];
    $u->make_request = [HelloAsServiceMakeRequest::class, 'call'];
    $u->make_response = [HelloAsServiceMakeResponse::class, 'call'];
    $u->make_result = [HelloAsServiceMakeResult::class, 'call'];
    $u->make_point = [HelloAsServiceMakePoint::class, 'call'];
    $u->make_spec = [HelloAsServiceMakeSpec::class, 'call'];
    $u->make_url = [HelloAsServiceMakeUrl::class, 'call'];
    $u->param = [HelloAsServiceParam::class, 'call'];
    $u->prepare_auth = [HelloAsServicePrepareAuth::class, 'call'];
    $u->prepare_body = [HelloAsServicePrepareBody::class, 'call'];
    $u->prepare_headers = [HelloAsServicePrepareHeaders::class, 'call'];
    $u->prepare_method = [HelloAsServicePrepareMethod::class, 'call'];
    $u->prepare_params = [HelloAsServicePrepareParams::class, 'call'];
    $u->prepare_path = [HelloAsServicePreparePath::class, 'call'];
    $u->prepare_query = [HelloAsServicePrepareQuery::class, 'call'];
    $u->result_basic = [HelloAsServiceResultBasic::class, 'call'];
    $u->result_body = [HelloAsServiceResultBody::class, 'call'];
    $u->result_headers = [HelloAsServiceResultHeaders::class, 'call'];
    $u->transform_request = [HelloAsServiceTransformRequest::class, 'call'];
    $u->transform_response = [HelloAsServiceTransformResponse::class, 'call'];
});
