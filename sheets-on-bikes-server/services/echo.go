package services

import "github.com/brandontthompson/ttrpg/sheetsonbikes/deferrable"

type Echo struct {
	deferrable.Deferrable
}

func (e *Echo) Echo(value string) string {
	return value
}
