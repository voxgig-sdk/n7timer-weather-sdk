<?php
declare(strict_types=1);

// N7timerWeather SDK utility: feature_hook

class N7timerWeatherFeatureHook
{
    public static function call(N7timerWeatherContext $ctx, string $name): void
    {
        if (!$ctx->client) {
            return;
        }
        $features = $ctx->client->features ?? null;
        if (!$features) {
            return;
        }
        foreach ($features as $f) {
            if (method_exists($f, $name)) {
                $f->$name($ctx);
            }
        }
    }
}
