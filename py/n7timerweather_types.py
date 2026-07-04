# Typed models for the N7timerWeather SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Apipl:
    dataseries: Optional[list] = None
    init: Optional[str] = None
    product: Optional[str] = None


@dataclass
class ApiplListMatch:
    dataseries: Optional[list] = None
    init: Optional[str] = None
    product: Optional[str] = None


@dataclass
class GraphicalApi:
    pass


@dataclass
class GraphicalApiLoadMatch:
    pass

