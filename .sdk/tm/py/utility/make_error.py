# N7timerWeather SDK utility: make_error

from __future__ import annotations
from core.operation import N7timerWeatherOperation
from core.result import N7timerWeatherResult
from core.control import N7timerWeatherControl
from core.error import N7timerWeatherError


def make_error_util(ctx, err):
    if ctx is None:
        from core.context import N7timerWeatherContext
        ctx = N7timerWeatherContext({}, None)

    op = ctx.op
    if op is None:
        op = N7timerWeatherOperation({})
    opname = op.name
    if opname == "" or opname == "_":
        opname = "unknown operation"

    result = ctx.result
    if result is None:
        result = N7timerWeatherResult({})
    result.ok = False

    if err is None:
        err = result.err
    if err is None:
        err = ctx.make_error("unknown", "unknown error")

    errmsg = ""
    if isinstance(err, N7timerWeatherError):
        errmsg = err.msg
    elif hasattr(err, "msg") and err.msg is not None:
        errmsg = err.msg
    elif isinstance(err, str):
        errmsg = err
    else:
        errmsg = str(err)

    msg = "N7timerWeatherSDK: " + opname + ": " + errmsg
    msg = ctx.utility.clean(ctx, msg)

    result.err = None

    spec = ctx.spec

    if ctx.ctrl.explain is not None:
        ctx.ctrl.explain["err"] = {"message": msg}

    sdk_err = N7timerWeatherError("", msg, ctx)
    sdk_err.result = ctx.utility.clean(ctx, result)
    sdk_err.spec = ctx.utility.clean(ctx, spec)

    if isinstance(err, N7timerWeatherError):
        sdk_err.code = err.code

    ctx.ctrl.err = sdk_err

    if ctx.ctrl.throw_err is False:
        return result.resdata

    raise sdk_err
