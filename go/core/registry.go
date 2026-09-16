package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewApiplEntityFunc func(client *N7timerWeatherSDK, entopts map[string]any) N7timerWeatherEntity

var NewGraphicalApiEntityFunc func(client *N7timerWeatherSDK, entopts map[string]any) N7timerWeatherEntity

