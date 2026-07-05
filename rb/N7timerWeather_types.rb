# frozen_string_literal: true

# Typed models for the N7timerWeather SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Apipl entity data model.
#
# @!attribute [rw] dataseries
#   @return [Array, nil]
#
# @!attribute [rw] init
#   @return [String, nil]
#
# @!attribute [rw] product
#   @return [String, nil]
Apipl = Struct.new(
  :dataseries,
  :init,
  :product,
  keyword_init: true
)

# Request payload for Apipl#list.
#
# @!attribute [rw] dataseries
#   @return [Array, nil]
#
# @!attribute [rw] init
#   @return [String, nil]
#
# @!attribute [rw] product
#   @return [String, nil]
ApiplListMatch = Struct.new(
  :dataseries,
  :init,
  :product,
  keyword_init: true
)

# GraphicalApi entity data model.
class GraphicalApi
end

# Request payload for GraphicalApi#load.
class GraphicalApiLoadMatch
end

