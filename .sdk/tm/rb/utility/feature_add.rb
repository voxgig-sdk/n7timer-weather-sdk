# N7timerWeather SDK utility: feature_add
module N7timerWeatherUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
