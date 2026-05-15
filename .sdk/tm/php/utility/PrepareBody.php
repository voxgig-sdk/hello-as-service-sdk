<?php
declare(strict_types=1);

// HelloAsService SDK utility: prepare_body

class HelloAsServicePrepareBody
{
    public static function call(HelloAsServiceContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
