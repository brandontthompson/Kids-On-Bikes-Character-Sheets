package services

import (
	"github.com/brandontthompson/ttrpg/sheetsonbikes/database"
	"github.com/brandontthompson/ttrpg/sheetsonbikes/models"
)

type Stats struct {
	database database.Database
}

func Constructor(database database.Database) *Stats {
	return &Stats{
		database: database,
	}
}
func (s *Stats) Start() {

}

func (s *Stats) Defer() {
	s.database.Disconnect()
}

func (s *Stats) CreateStats(label string) *models.Stats {
	return &models.Stats{}
}
