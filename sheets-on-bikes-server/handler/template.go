package handler

import (
	"encoding/json"
	"fmt"
	"github.com/brandontthompson/ttrpg/sheetsonbikes/api"
	"github.com/brandontthompson/ttrpg/sheetsonbikes/models"
	"github.com/brandontthompson/ttrpg/sheetsonbikes/services"
	"github.com/gorilla/mux"
	"net/http"
)

type Template struct {
	service *services.Template
	Handlers
}

func TemplateHandler(handlers Handlers, service *services.Template) *Template {
	t := &Template{
		service:  service,
		Handlers: handlers,
	}

	t.register()

	return t
}

func (t *Template) register() {
	create := &api.HttpHandler{
		Path:     "/template/create",
		Method:   "POST",
		Query:    nil,
		Callback: t.Create,
	}
	get := &api.HttpHandler{
		Path:     "/template/{template_id}",
		Method:   "GET",
		Query:    nil,
		Callback: t.Get,
	}
	t.Handlers.AddHandlers(create, get)
}

func (t *Template) Create(w http.ResponseWriter, r *http.Request) *api.ResponseObject {
	var templateObject *models.KidsOnBikesTemplate
	err := json.NewDecoder(r.Body).Decode(&templateObject)

	if err != nil {
		return &api.ResponseObject{Code: 400}
	}

	templateId, err := t.service.Create(templateObject)
	return &api.ResponseObject{
		Error: err,
		Value: templateId,
	}
}

func (t *Template) Get(w http.ResponseWriter, r *http.Request) *api.ResponseObject {
	templateId := mux.Vars(r)["template_id"]
	obj, err := t.service.Get(templateId)
	if err != nil {
		fmt.Println(err)
		return &api.ResponseObject{Code: 404}
	}

	return &api.ResponseObject{
		Value: obj,
	}
}
