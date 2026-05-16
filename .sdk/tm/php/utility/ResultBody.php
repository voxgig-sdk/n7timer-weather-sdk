<?php
declare(strict_types=1);

// N7timerWeather SDK utility: result_body

class N7timerWeatherResultBody
{
    public static function call(N7timerWeatherContext $ctx): ?N7timerWeatherResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
