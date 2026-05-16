<?php
declare(strict_types=1);

// N7timerWeather SDK utility: prepare_path

class N7timerWeatherPreparePath
{
    public static function call(N7timerWeatherContext $ctx): string
    {
        $point = $ctx->point;
        $parts = [];
        if ($point) {
            $p = \Voxgig\Struct\Struct::getprop($point, 'parts');
            if (is_array($p)) {
                $parts = $p;
            }
        }
        return \Voxgig\Struct\Struct::join($parts, '/', true);
    }
}
