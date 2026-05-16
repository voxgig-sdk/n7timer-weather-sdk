<?php
declare(strict_types=1);

// N7timerWeather SDK exists test

require_once __DIR__ . '/../n7timerweather_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = N7timerWeatherSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
