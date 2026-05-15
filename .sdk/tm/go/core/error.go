package core

type PhoneNumberValidatorError struct {
	IsPhoneNumberValidatorError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewPhoneNumberValidatorError(code string, msg string, ctx *Context) *PhoneNumberValidatorError {
	return &PhoneNumberValidatorError{
		IsPhoneNumberValidatorError: true,
		Sdk:              "PhoneNumberValidator",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *PhoneNumberValidatorError) Error() string {
	return e.Msg
}
