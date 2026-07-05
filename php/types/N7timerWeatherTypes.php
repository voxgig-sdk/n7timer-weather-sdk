<?php
declare(strict_types=1);

// Typed models for the N7timerWeather SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Apipl entity data model. */
class Apipl
{
    public ?array $dataseries = null;
    public ?string $init = null;
    public ?string $product = null;
}

/** Request payload for Apipl#list. */
class ApiplListMatch
{
    public ?array $dataseries = null;
    public ?string $init = null;
    public ?string $product = null;
}

/** GraphicalApi entity data model. */
class GraphicalApi
{
}

/** Request payload for GraphicalApi#load. */
class GraphicalApiLoadMatch
{
}

