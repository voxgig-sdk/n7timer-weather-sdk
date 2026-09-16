# N7timerWeather SDK feature factory

from n7timerweather_sdk.feature.base_feature import N7timerWeatherBaseFeature
from n7timerweather_sdk.feature.ratelimit_feature import N7timerWeatherRatelimitFeature
from n7timerweather_sdk.feature.retry_feature import N7timerWeatherRetryFeature
from n7timerweather_sdk.feature.test_feature import N7timerWeatherTestFeature
from n7timerweather_sdk.feature.timeout_feature import N7timerWeatherTimeoutFeature


_FEATURES = {
    "base": lambda: N7timerWeatherBaseFeature(),
    "ratelimit": lambda: N7timerWeatherRatelimitFeature(),
    "retry": lambda: N7timerWeatherRetryFeature(),
    "test": lambda: N7timerWeatherTestFeature(),
    "timeout": lambda: N7timerWeatherTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
