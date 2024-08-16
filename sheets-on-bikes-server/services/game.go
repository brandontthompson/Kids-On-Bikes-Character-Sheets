package services

import (
	"github.com/brandontthompson/ttrpg/sheetsonbikes/database"
	"github.com/brandontthompson/ttrpg/sheetsonbikes/deferrable"
)

type Game struct {
	deferrable.Deferrable
	database.Database
}
