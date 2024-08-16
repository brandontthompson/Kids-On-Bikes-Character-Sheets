package handler

import (
	"github.com/brandontthompson/ttrpg/sheetsonbikes/api"
	"github.com/brandontthompson/ttrpg/sheetsonbikes/services"
	"net/http"
)

type Echo struct {
	service *services.Echo
	Handlers
}

func EchoHandler(handlers Handlers, service *services.Echo) *Echo {
	echo := &Echo{
		service:  service,
		Handlers: handlers,
	}

	echo.registerHandlers()
	return echo
}

func (e *Echo) registerHandlers() {
	echo := &api.HttpHandler{
		Path:     "/echo",
		Method:   "GET",
		Query:    []string{"echo", "{echo}"},
		Callback: e.Echo,
	}

	e.AddHandler(echo)
}

func (e *Echo) Echo(w http.ResponseWriter, r *http.Request) *api.ResponseObject {
	val := r.FormValue("echo")
	return &api.ResponseObject{
		Code:  200,
		Error: nil,
		Value: e.service.Echo(val),
	}
}
