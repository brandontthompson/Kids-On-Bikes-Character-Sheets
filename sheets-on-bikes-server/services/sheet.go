package services

import (
	"fmt"
	"github.com/brandontthompson/ttrpg/sheetsonbikes/database"
	"github.com/brandontthompson/ttrpg/sheetsonbikes/deferrable"
	"github.com/brandontthompson/ttrpg/sheetsonbikes/models"
	"time"
)

type Sheet struct {
	deferrable.Deferrable
	database.Database
}

func (sheet *Sheet) CreateSheet(character *models.CharacterSheet) (string, error) {

	resp, err := sheet.Database.Insert("sheets", character)

	if err != nil {
		fmt.Println(err)
	}

	return resp.InsertId.(string), err
}

func (sheet *Sheet) GetSheet(sheetId string) (*models.CharacterSheet, error) {
	var characterSheet models.CharacterSheet
	err := sheet.Database.GetObjectById("sheets", "_id", sheetId, &characterSheet)
	return &characterSheet, err
}

func (sheet *Sheet) UpdateSheet(sheetId string, filters *map[string]interface{}, properties map[string]interface{}) error {
	err := sheet.Database.UpdateSingle("sheets", sheetId, filters, properties)
	return err
}

func (sheet *Sheet) CreateBlankFromTemplate(templateId string) (string, error) {
	var template models.KidsOnBikesTemplate
	err := sheet.Database.GetObjectById("templates", "_id", templateId, &template)
	if err != nil {
		return "", err
	}
	sheetFromTemplate := &models.CharacterSheet{
		GameID: "",
		Stats:  template.Stats,
		Description: models.Description{
			Name:        "",
			Age:         0,
			Fear:        "",
			Motivation:  "",
			Flaws:       "",
			Description: "",
		},
		Strengths:       make([]models.Strengths, 0),
		Backpack:        make([]models.Items, 0),
		AdversityTokens: 0,
		Notes:           make([]models.Note, 0),
		TemplateId:      templateId,
		LastModified:    time.Now(),
	}

	return sheet.CreateSheet(sheetFromTemplate)
	//66b7d388505a7b41b54f9dc5
}

func (sheet *Sheet) Defer() {
	sheet.Database.Defer()
}

func (sheet *Sheet) Run() {

}
