<?php
declare(strict_types=1);

// N7timerWeather SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class N7timerWeatherFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new N7timerWeatherBaseFeature();
            case "test":
                return new N7timerWeatherTestFeature();
            default:
                return new N7timerWeatherBaseFeature();
        }
    }
}
