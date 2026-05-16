<?php
declare(strict_types=1);

// N7timerWeather SDK utility: feature_add

class N7timerWeatherFeatureAdd
{
    public static function call(N7timerWeatherContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
