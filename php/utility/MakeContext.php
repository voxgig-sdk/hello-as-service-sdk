<?php
declare(strict_types=1);

// HelloAsService SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class HelloAsServiceMakeContext
{
    public static function call(array $ctxmap, ?HelloAsServiceContext $basectx): HelloAsServiceContext
    {
        return new HelloAsServiceContext($ctxmap, $basectx);
    }
}
