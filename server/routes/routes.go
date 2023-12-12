package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/ramyjaber1/backbone/server/handlers"
	"github.com/ramyjaber1/backbone/server/middlewares"
)

func SetupRoutes(app *fiber.App) {

	app.Post("/login", handlers.Login)
	app.Post("/logout", handlers.Logout)
	app.Post("/register", handlers.Register)
	app.Get("/me", handlers.GetLoggedInUser)
	app.Use(middlewares.IsAuthenticated)
	app.Get("/users/", handlers.GetUsers)

}
