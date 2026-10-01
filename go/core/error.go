package core

import "encoding/json"

type N7timerWeatherError struct {
	IsN7timerWeatherError bool
	Sdk                string
	Code               string
	Msg                string
	// Reachable for a debugger, invisible to a serialiser: the context holds
	// the live spec and options, and an error is what gets logged.
	Ctx    *Context `json:"-"`
	Result any
	Spec   any
}

func NewN7timerWeatherError(code string, msg string, ctx *Context) *N7timerWeatherError {
	return &N7timerWeatherError{
		IsN7timerWeatherError: true,
		Sdk:                "N7timerWeather",
		Code:               code,
		Msg:                msg,
		Ctx:                ctx,
	}
}

func (e *N7timerWeatherError) Error() string {
	return e.Msg
}

// What makeError attached is already cleaned; the context is not part of
// the record.
func (e *N7timerWeatherError) Record() map[string]any {
	return map[string]any{
		"sdk":     e.Sdk,
		"code":    e.Code,
		"message": e.Msg,
		"result":  e.Result,
		"spec":    e.Spec,
	}
}

func (e *N7timerWeatherError) MarshalJSON() ([]byte, error) {
	return json.Marshal(e.Record())
}
