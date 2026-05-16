package core

type N7timerWeatherError struct {
	IsN7timerWeatherError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewN7timerWeatherError(code string, msg string, ctx *Context) *N7timerWeatherError {
	return &N7timerWeatherError{
		IsN7timerWeatherError: true,
		Sdk:              "N7timerWeather",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *N7timerWeatherError) Error() string {
	return e.Msg
}
