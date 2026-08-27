// Typed models for the N7timerWeather SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Apipl {
  dataseries?: any[]
  init?: string
  product?: string
}

export interface ApiplListMatch {
  ac?: number
  lang?: string
  lat: number
  lon: number
  output: string
  product: string
  tzshift?: number
  unit?: string
}

export interface GraphicalApi {
}

export interface GraphicalApiLoadMatch {
  ac?: number
  lang?: string
  lat: number
  lon: number
  output?: string
  tzshift?: number
  unit?: string
}

