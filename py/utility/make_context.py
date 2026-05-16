# N7timerWeather SDK utility: make_context

from core.context import N7timerWeatherContext


def make_context_util(ctxmap, basectx):
    return N7timerWeatherContext(ctxmap, basectx)
