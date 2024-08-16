package payloads

type UpdateSheetPayload struct {
	ObjectId string                 `json:"object_id"`
	Filters  map[string]interface{} `json:"filters"`
	Changes  map[string]interface{} `json:"changes"`
}
