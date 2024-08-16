package services

import (
	"github.com/brandontthompson/ttrpg/sheetsonbikes/database"
	"github.com/brandontthompson/ttrpg/sheetsonbikes/deferrable"
	"github.com/brandontthompson/ttrpg/sheetsonbikes/models"
)

type Template struct {
	database.Database
	deferrable.Deferrable
}

func (t *Template) Create(template *models.KidsOnBikesTemplate) (string, error) {
	result, err := t.Database.Insert("templates", template)
	return result.InsertId.(string), err
}

func (t *Template) Get(templateId string) (*models.KidsOnBikesTemplate, error) {
	var template *models.KidsOnBikesTemplate
	err := t.Database.GetObjectById("templates", "_id", templateId, &template)
	return template, err
}
