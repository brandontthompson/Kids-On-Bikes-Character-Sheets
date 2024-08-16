package models

import "time"

type CharacterSheet struct {
	GameID          string  `bson:"game_id" json:"game_id,omitempty"`
	Stats           []Stats `bson:"stats" json:"stats"`
	Description     `bson:"description,inline" json:"description"`
	Strengths       []Strengths `bson:"strengths" json:"strengths"`
	Backpack        []Items     `bson:"backpack" json:"backpack,omitempty"`
	AdversityTokens int         `bson:"adversity_tokens" json:"adversity_tokens"`
	Notes           []Note      `bson:"notes" json:"notes,omitempty"`
	LastModified    time.Time   `bson:"last_modified" json:"last_modified,omitempty"`
	TemplateId      string      `bson:"template_id"`
}

type Description struct {
	Name        string `bson:"name" json:"name"`
	Age         int    `bson:"age" json:"age"`
	Fear        string `bson:"fear" json:"fear"`
	Motivation  string `bson:"motivation" json:"motivation"`
	Flaws       string `bson:"flaws" json:"flaws"`
	Description string `bson:"description" json:"description"`
}

type Strengths struct {
	Label       string `bson:"label" json:"label"`
	Description string `bson:"description" json:"description"`
}

type Note struct {
	Content string `bson:"content" json:"content"`
	Created int64  `bson:"created" json:"created"`
}

type Items struct {
	Label  string `bson:"label" json:"label"`
	Source string `bson:"source" json:"source"`
}
