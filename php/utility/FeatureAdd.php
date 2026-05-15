<?php
declare(strict_types=1);

// HelloAsService SDK utility: feature_add

class HelloAsServiceFeatureAdd
{
    public static function call(HelloAsServiceContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
