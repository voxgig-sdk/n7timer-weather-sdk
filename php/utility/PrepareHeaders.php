<?php
declare(strict_types=1);

// N7timerWeather SDK utility: prepare_headers

class N7timerWeatherPrepareHeaders
{
    public static function call(N7timerWeatherContext $ctx): array
    {
        $options = $ctx->client->options_map();
        $headers = \Voxgig\Struct\Struct::getprop($options, 'headers');
        if (!$headers) {
            return [];
        }
        $out = \Voxgig\Struct\Struct::clone($headers);
        return is_array($out) ? $out : [];
    }
}
