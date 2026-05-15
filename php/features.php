<?php
declare(strict_types=1);

// HelloAsService SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class HelloAsServiceFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new HelloAsServiceBaseFeature();
            case "test":
                return new HelloAsServiceTestFeature();
            default:
                return new HelloAsServiceBaseFeature();
        }
    }
}
