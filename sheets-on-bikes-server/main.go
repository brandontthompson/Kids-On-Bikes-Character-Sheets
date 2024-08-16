package main

import (
	"github.com/brandontthompson/ttrpg/sheetsonbikes/api"
	"github.com/brandontthompson/ttrpg/sheetsonbikes/database"
	"github.com/brandontthompson/ttrpg/sheetsonbikes/database/driver"
	"github.com/brandontthompson/ttrpg/sheetsonbikes/deferrable"
	"github.com/brandontthompson/ttrpg/sheetsonbikes/handler"
	"github.com/brandontthompson/ttrpg/sheetsonbikes/services"
	"os"
)

func main() {

	db_user := os.Getenv("DATABASE_USER")
	db_password := os.Getenv("DATABASE_PASSWORD")
	db_env := os.Getenv("DATABASE_URL")

	driver := driver.CreateMongodbInstance(db_user,
		db_password,
		db_env,
		"usmdb-ttrpg-sheets",
		"retryWrites", "true", "w", "majority", "appName", "usmdb-ttrpg-sheets")

	database := database.Constructor(driver)

	deferrable := []deferrable.Deferrable{}
	//data := models.CharacterSheet{}
	handlers := handler.Constructor()
	//sheetService := services.Sheet{}
	sheetService := &services.Sheet{
		Database: *database,
	}

	templateService := &services.Template{Database: *database}
	echoService := &services.Echo{}

	handler.SheetHandler(*handlers, sheetService)
	handler.TemplateHandler(*handlers, templateService)
	handler.EchoHandler(*handlers, echoService)

	api := api.Constructor(":3030", *handlers.Handlers)

	// rewrite so services handle the specific calls to database and the drivers just set stuff up
	// so database would have services and thaty would be responsibile for making the querys to the driver

	database.Connect()

	deferrable = append(deferrable, sheetService)

	defer func() {
		for _, def := range deferrable {
			def.Defer()
		}

		api.Shutdown()
		database.Disconnect()
	}()
	//
	api.Run()

}
