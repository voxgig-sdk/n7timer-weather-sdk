-- Typed models for the N7timerWeather SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Apipl
---@field dataseries? table
---@field init? string
---@field product? string

---@class ApiplListMatch
---@field ac? number
---@field lang? string
---@field lat number
---@field lon number
---@field output string
---@field product string
---@field tzshift? number
---@field unit? string

---@class GraphicalApi

---@class GraphicalApiLoadMatch
---@field ac? number
---@field lang? string
---@field lat number
---@field lon number
---@field output? string
---@field tzshift? number
---@field unit? string

local M = {}

return M
