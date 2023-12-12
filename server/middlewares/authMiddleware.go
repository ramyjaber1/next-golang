package middlewares

import (
	"github.com/gofiber/fiber/v2"
	"github.com/ramyjaber1/backbone/server/utils"
)

func IsAuthenticated(c *fiber.Ctx) error {
	// var userClaim utils.UserClaim
	cookie := c.Cookies("jwt")
	if _, err := utils.ParseJwt(cookie); err != nil {
		c.Status(fiber.StatusUnauthorized)
		return c.JSON(fiber.Map{
			"ok":      false,
			"message": "Unauthenticated",
		})
	}
	return c.Next()
}
