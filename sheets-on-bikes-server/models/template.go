package models

type KidsOnBikesTemplate struct {
	Label     string      `bson:"label,omitempty" json:"label,omitempty"`
	Strengths []Strengths `bson:"strengths" json:"strengths"`
	Stats     []Stats     `bson:"stats" json:"stats"`
}
