package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/ramyjaber1/backbone/server/database"
	"github.com/ramyjaber1/backbone/server/routes"
)

func main() {

	corsSettings := cors.New(cors.Config{
		AllowOrigins:     "http://localhost:3000",
		AllowMethods:     "GET,POST,HEAD,OPTIONS,PUT,DELETE,PATCH",
		AllowHeaders:     "Origin, Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization,X-Requested-With",
		ExposeHeaders:    "Origin",
		AllowCredentials: true,
	})
	app := fiber.New()
	app.Use(corsSettings)
	database.Connect()

	routes.SetupRoutes(app)
	app.Listen(":9000")
}
