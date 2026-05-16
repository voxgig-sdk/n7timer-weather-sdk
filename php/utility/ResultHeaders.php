<?php
declare(strict_types=1);

// N7timerWeather SDK utility: result_headers

class N7timerWeatherResultHeaders
{
    public static function call(N7timerWeatherContext $ctx): ?N7timerWeatherResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
