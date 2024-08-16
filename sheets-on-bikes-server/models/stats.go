package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type StatType byte

const (
	FLAT StatType = 1 << iota
	DIE
)

type Stats struct {
	ID    primitive.ObjectID `bson:"_id,omitempty"`
	Label string             `bson:"label" json:"label"`
	Type  StatType           `bson:"type" json:"type"`
	Value int                `bson:"value" json:"value"`
}
