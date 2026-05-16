<?php
declare(strict_types=1);

// N7timerWeather SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class N7timerWeatherMakeContext
{
    public static function call(array $ctxmap, ?N7timerWeatherContext $basectx): N7timerWeatherContext
    {
        return new N7timerWeatherContext($ctxmap, $basectx);
    }
}
