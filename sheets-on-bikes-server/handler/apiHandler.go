package handler

import (
	"github.com/brandontthompson/ttrpg/sheetsonbikes/api"
)

type ApiHandler interface {
}

type Handlers struct {
	Handlers *[]*api.HttpHandler
}

func Constructor() *Handlers {
	return &Handlers{Handlers: &[]*api.HttpHandler{}}
}

func (h *Handlers) AddHandler(handler *api.HttpHandler) {
	*h.Handlers = append(*h.Handlers, handler)
}

func (h *Handlers) AddHandlers(handlers ...*api.HttpHandler) {
	for _, handle := range handlers {
		h.AddHandler(handle)
	}
}
