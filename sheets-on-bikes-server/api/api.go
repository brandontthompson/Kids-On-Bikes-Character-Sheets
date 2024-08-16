package api

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"net/http"
)

type httpRequestMethod func(http.ResponseWriter, *http.Request) *ResponseObject

type ResponseObject struct {
	Code  int
	Error error
	Value any
}

type API interface {
	Run()
	Shutdown()
}

type HttpHandler struct {
	Path     string
	Method   string
	Query    []string
	Callback httpRequestMethod
}

type Server struct {
	API
	listenAddress string
	router        *mux.Router
	handlers      []*HttpHandler
}

func corsMiddleware(h http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, PATCH")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		// Handle preflight requests before passing to the main handler
		if r.Method == http.MethodOptions {
			return
		}

		h.ServeHTTP(w, r)
	})
}

func Constructor(listenAddr string, handlers []*HttpHandler) *Server {
	return &Server{
		listenAddress: listenAddr,
		router:        mux.NewRouter(),
		handlers:      handlers,
	}
}

func (server *Server) Run() {
	for _, handler := range server.handlers {
		route := server.router.Path(handler.Path).
			Methods(handler.Method).
			Handler(server.handleRequest(handler.Callback))

		if handler.Query != nil {
			route.Queries(handler.Query...)
		}
	}

	server.router.Use(mux.CORSMethodMiddleware(server.router))

	fmt.Printf("Http server is listening %s\n", server.listenAddress)
	http.ListenAndServe(server.listenAddress, corsMiddleware(server.router))
}

func (server *Server) Shutdown() {

}

func (server *Server) handleRequest(method httpRequestMethod) http.HandlerFunc {
	return func(writer http.ResponseWriter, request *http.Request) {

		response := method(writer, request)
		if response.Error != nil {
			switch response.Code {
			case 400:
				writeJSON(writer, response.Code, &ResponseObject{response.Code, ErrBadRequestError, nil})
				return

			case 500:
				writeJSON(writer, response.Code, &ResponseObject{response.Code, ErrInternalServerError, nil})
				return

			default:
				writeJSON(writer, 500, &ResponseObject{response.Code, ErrInternalServerError, nil})
				return
			}
		}
		if response.Code == 0 {
			response.Code = 200
		}

		writeJSON(writer, response.Code, response)
		return
	}
}

func writeJSON(writer http.ResponseWriter, status int, value any) error {
	writer.Header().Set("Access-Control-Allow-Origin", "*")
	writer.Header().Set("Content-Type", "application/json")
	writer.WriteHeader(status)
	return json.NewEncoder(writer).Encode(value)
}
