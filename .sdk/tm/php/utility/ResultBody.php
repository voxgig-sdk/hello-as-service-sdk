<?php
declare(strict_types=1);

// HelloAsService SDK utility: result_body

class HelloAsServiceResultBody
{
    public static function call(HelloAsServiceContext $ctx): ?HelloAsServiceResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
