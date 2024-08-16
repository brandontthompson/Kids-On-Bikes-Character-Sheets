package handler

import (
	"encoding/json"
	"github.com/brandontthompson/ttrpg/sheetsonbikes/api"
	"github.com/brandontthompson/ttrpg/sheetsonbikes/models/payloads"
	"github.com/brandontthompson/ttrpg/sheetsonbikes/services"
	"github.com/gorilla/mux"
	"net/http"
)

type Sheet struct {
	service *services.Sheet
	Handlers
}

func SheetHandler(handlers Handlers, service *services.Sheet) *Sheet {
	sheet := &Sheet{
		service,
		handlers,
	}

	sheet.registerHandlers()

	return sheet
}

func (sheet *Sheet) registerHandlers() {
	create := &api.HttpHandler{
		Path:     "/sheet/create",
		Method:   "POST",
		Query:    nil,
		Callback: sheet.CreateSheet,
	}

	getSheet := &api.HttpHandler{
		Path:     "/sheet/{sheet_id}",
		Method:   "GET",
		Query:    nil,
		Callback: sheet.GetSheet,
	}

	updateSheet := &api.HttpHandler{
		Path:     "/sheet/update",
		Method:   "PATCH",
		Query:    nil,
		Callback: sheet.UpdateSheet,
	}

	sheet.Handlers.AddHandlers(create, getSheet, updateSheet)
}

func (sheet *Sheet) Run() {

}
func (sheet *Sheet) Defer() {}

func (sheet *Sheet) CreateSheet(w http.ResponseWriter, r *http.Request) *api.ResponseObject {
	//var charSheet *models.CharacterSheet

	//err := json.NewDecoder(r.Body).Decode(&charSheet)
	//if err != nil {
	//	return &api.ResponseObject{Code: 400, Error: err}
	//}

	sheetId, err := sheet.service.CreateBlankFromTemplate("66b7d388505a7b41b54f9dc5")
	//v, err := sheet.service.CreateSheet(charSheet)

	return &api.ResponseObject{
		Error: err,
		Value: sheetId,
	}
}

func (sheet *Sheet) GetSheet(w http.ResponseWriter, r *http.Request) *api.ResponseObject {
	sheetId := mux.Vars(r)["sheet_id"]

	v, err := sheet.service.GetSheet(sheetId)
	if err != nil {
		return &api.ResponseObject{Code: 404, Error: err}
	}

	return &api.ResponseObject{
		Error: err,
		Value: v,
	}
}

func (sheet *Sheet) UpdateSheet(w http.ResponseWriter, r *http.Request) *api.ResponseObject {
	var updateQuery payloads.UpdateSheetPayload

	json.NewDecoder(r.Body).Decode(&updateQuery)
	// handle 400
	err := sheet.service.UpdateSheet(updateQuery.ObjectId, &updateQuery.Filters, updateQuery.Changes)

	return &api.ResponseObject{
		Error: err,
	}
}
