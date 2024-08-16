package database

import (
	"github.com/brandontthompson/ttrpg/sheetsonbikes/deferrable"
)

type Driver interface {
	Run()
	Create()
	Connect()
	Disconnect()
	Insert(string, any) (*InsertResult, error)
	GetObjectById(string, string, string, any) error
	UpdateSingle(string, string, *map[string]interface{}, map[string]interface{}) error
	deferrable.Deferrable
}

type InsertResult struct {
	InsertId interface{}
}

type QueryResult struct {
	Result interface{}
}

type Database struct {
	Driver
}

func Constructor(driver Driver) *Database {
	return &Database{Driver: driver}
}
