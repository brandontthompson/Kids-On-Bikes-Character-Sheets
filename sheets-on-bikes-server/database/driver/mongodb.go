package driver

import (
	"context"
	"fmt"
	"github.com/brandontthompson/ttrpg/sheetsonbikes/database"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"strings"
)

type Mongodb struct {
	database.Driver
	client        *mongo.Client
	clientOptions *options.ClientOptions
	database      string
}

func CreateMongodbInstance(user, password, env, database string, opts ...string) *Mongodb {
	return &Mongodb{
		clientOptions: options.Client().
			ApplyURI(formatURI(user, password, env, database, opts...)).
			SetServerAPIOptions(options.ServerAPI(options.ServerAPIVersion1)),
		database: database,
	}
}

func formatURI(user, password, env, database string, opts ...string) string {
	pairs := []string{}
	pair := make([]string, 2)
	for i, str := range opts {
		pair[i%2] = str
		if i%2 == 1 {
			pairs = append(pairs, strings.Join(pair, "="))
		}
	}
	options := strings.Join(pairs, "&")
	return fmt.Sprintf("mongodb+srv://%s:%s@%s/%s?%s", user, password, env, database, options)
}

func (db *Mongodb) Start() {}

func (db *Mongodb) Defer() {
	db.Disconnect()
}

func (db *Mongodb) Run() {
	db.Connect()
}

func (db *Mongodb) Create() {
	db.Connect()
}

func (db *Mongodb) Connect() {
	client, err := mongo.Connect(context.TODO(), db.clientOptions)
	if err != nil {
		panic(err)
	}
	db.client = client

	if err = client.Database(db.database).RunCommand(context.TODO(), bson.D{{"ping", 1}}).Err(); err != nil {
		panic(err)
	}

	fmt.Println("Pinged server successfully")
}

func (db *Mongodb) Disconnect() {
	defer func() {
		if err := db.client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()
}

func (db *Mongodb) Insert(collection string, object any) (*database.InsertResult, error) {
	coll := db.client.Database(db.database).Collection(collection)
	createdResult, err := coll.InsertOne(context.Background(), object)
	primitive := createdResult.InsertedID.(primitive.ObjectID)
	return &database.InsertResult{InsertId: primitive.Hex()}, err
}

func (db *Mongodb) GetObjectById(collection, identifier string, objectId string, object any) error {
	objId, _ := primitive.ObjectIDFromHex(objectId)
	filter := bson.D{{identifier, objId}}
	err := db.client.Database(db.database).Collection(collection).FindOne(context.Background(), filter).Decode(object)
	return err
}

func (db *Mongodb) UpdateSingle(collection string, objectId string, filters *map[string]interface{}, fields map[string]interface{}) error {
	objId, _ := primitive.ObjectIDFromHex(objectId)
	filter := bson.D{{"_id", objId}}

	if filters != nil {
		for key, value := range *filters {
			filter = append(filter, bson.E{Key: key, Value: value})
		}
	}

	updateFields := bson.D{}
	for key, value := range fields {
		updateFields = append(updateFields, bson.E{Key: key, Value: value})
	}

	properties := bson.D{
		{"$set", updateFields},
		{"$currentDate", bson.D{{"last_modified", true}}}}
	_, err := db.client.Database(db.database).Collection(collection).UpdateOne(context.Background(), filter, properties)
	return err
}
