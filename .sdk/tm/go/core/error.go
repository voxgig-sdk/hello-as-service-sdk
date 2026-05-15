package core

type HelloAsServiceError struct {
	IsHelloAsServiceError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewHelloAsServiceError(code string, msg string, ctx *Context) *HelloAsServiceError {
	return &HelloAsServiceError{
		IsHelloAsServiceError: true,
		Sdk:              "HelloAsService",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *HelloAsServiceError) Error() string {
	return e.Msg
}
