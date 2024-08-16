package api

import "errors"

var (
	ErrInternalServerError = errors.New("internal server error")
	ErrBadRequestError     = errors.New("parameter(s) are invalid")
)
