# ProjectName SDK exists test

import pytest
from n7timerweather_sdk import N7timerWeatherSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = N7timerWeatherSDK.test(None, None)
        assert testsdk is not None
