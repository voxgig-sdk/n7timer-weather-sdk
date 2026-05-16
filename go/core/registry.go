package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewApiplEntityFunc func(client *N7timerWeatherSDK, entopts map[string]any) N7timerWeatherEntity

var NewGraphicalApiEntityFunc func(client *N7timerWeatherSDK, entopts map[string]any) N7timerWeatherEntity

