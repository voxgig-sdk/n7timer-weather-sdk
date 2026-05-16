# N7timerWeather SDK feature factory

from feature.base_feature import N7timerWeatherBaseFeature
from feature.test_feature import N7timerWeatherTestFeature


def _make_feature(name):
    features = {
        "base": lambda: N7timerWeatherBaseFeature(),
        "test": lambda: N7timerWeatherTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
