package deferrable

type Deferrable interface {
	Start()
	Defer()
}
