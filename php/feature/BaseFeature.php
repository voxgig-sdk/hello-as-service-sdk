<?php
declare(strict_types=1);

// HelloAsService SDK base feature

class HelloAsServiceBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(HelloAsServiceContext $ctx, array $options): void {}
    public function PostConstruct(HelloAsServiceContext $ctx): void {}
    public function PostConstructEntity(HelloAsServiceContext $ctx): void {}
    public function SetData(HelloAsServiceContext $ctx): void {}
    public function GetData(HelloAsServiceContext $ctx): void {}
    public function GetMatch(HelloAsServiceContext $ctx): void {}
    public function SetMatch(HelloAsServiceContext $ctx): void {}
    public function PrePoint(HelloAsServiceContext $ctx): void {}
    public function PreSpec(HelloAsServiceContext $ctx): void {}
    public function PreRequest(HelloAsServiceContext $ctx): void {}
    public function PreResponse(HelloAsServiceContext $ctx): void {}
    public function PreResult(HelloAsServiceContext $ctx): void {}
    public function PreDone(HelloAsServiceContext $ctx): void {}
    public function PreUnexpected(HelloAsServiceContext $ctx): void {}
}
