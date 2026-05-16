<?php
declare(strict_types=1);

// N7timerWeather SDK utility: prepare_body

class N7timerWeatherPrepareBody
{
    public static function call(N7timerWeatherContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
