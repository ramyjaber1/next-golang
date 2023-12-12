package handlers

import (
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/ramyjaber1/backbone/server/data"
	"github.com/ramyjaber1/backbone/server/database"
	"github.com/ramyjaber1/backbone/server/utils"
)

func Register(c *fiber.Ctx) error {
	var bodyData map[string]string
	if err := c.BodyParser(&bodyData); err != nil {
		return err
	}
	if bodyData["password"] != bodyData["password_confirm"] {
		c.Status(400)
		return c.JSON(fiber.Map{
			"ok":      false,
			"message": "Password do not match",
		})
	}
	user := data.User{
		Name:  bodyData["name"],
		Email: bodyData["email"],
		Phone: bodyData["phone"],
	}
	user.SetPassword(bodyData["password"])
	database.DB.Create(&user)
	return c.JSON(fiber.Map{
		"ok":   true,
		"user": user,
	})
}

func Login(c *fiber.Ctx) error {
	var bodyData map[string]string
	if err := c.BodyParser(&bodyData); err != nil {
		return err
	}
	var user data.User
	database.DB.Where("email = ?", bodyData["email"]).First(&user)
	if user.ID == 0 {
		c.Status(404)
		return c.JSON(fiber.Map{
			"ok":      false,
			"message": "user not found",
		})
	}
	if err := user.ComparePassword(bodyData["password"]); err != nil {
		c.Status(400)
		return c.JSON(fiber.Map{
			"ok":      false,
			"message": "Incorrect password",
		})
	}
	token, err := utils.GenerateJwt(strconv.Itoa(int(user.ID)))
	if err != nil {
		c.JSON(fiber.Map{
			"ok":      false,
			"message": "Internal Server Error",
		})
	}
	cookie := fiber.Cookie{
		Name:     "jwt",
		Value:    token,
		Expires:  time.Now().Add(time.Hour * 24),
		HTTPOnly: true,
	}
	c.Cookie(&cookie)

	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(fiber.Map{
			"message": "could not login",
		})
	}
	c.Cookie(&cookie)
	return c.JSON(fiber.Map{
		"ok":      true,
		"message": "success",
		"token":   cookie.Value,
	})
}

func GetLoggedInUser(c *fiber.Ctx) error {
	// var userClaim utils.UserClaim
	// headers := c.GetReqHeaders()
	// token := headers["Authorization"]
	token := c.Cookies("jwt")
	id, _ := utils.ParseJwt(token)
	var user data.User
	response := database.DB.Preload("Shops").Where("id = ?", id).First(&user)
	if response.Error != nil {
		return c.Status(409).JSON(fiber.Map{
			"ok":      false,
			"message": "INTERNAL SERVER ERROR",
		})
	}
	if user.ID == 0 {
		return c.Status(404).JSON(fiber.Map{
			"ok":      false,
			"message": "Unauthorized",
		})
	}
	return c.JSON(fiber.Map{
		"ok":   true,
		"user": user,
	})
}

func Logout(c *fiber.Ctx) error {
	c.ClearCookie("jwt")
	return c.Status(200).JSON(fiber.Map{
		"ok":      true,
		"message": "User loggged out",
	})
}
