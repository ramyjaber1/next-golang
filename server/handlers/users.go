package handlers

import (
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/ramyjaber1/backbone/server/data"
	"github.com/ramyjaber1/backbone/server/database"
)

func GetUsers(c *fiber.Ctx) error {
	users := []data.User{}
	searchTerm := c.Query("searchTerm")
	sortBy := c.Query("sortBy", "id")
	orderBy := c.Query("orderBy", "desc")
	page, _ := strconv.Atoi(c.Query("page", "1"))
	limit, _ := strconv.Atoi(c.Query("limit", "10"))
	offset := (page - 1) * limit
	query := database.DB.Preload("Shops")
	if searchTerm != "" {
		searchTermWithWildcard := "%" + searchTerm + "%"
		query.Where("name LIKE ? OR phone LIKE ? OR email LIKE ?", searchTermWithWildcard, searchTermWithWildcard, searchTermWithWildcard)
	}
	query = query.Order(sortBy + " " + orderBy).Offset(offset).Limit(limit).Find(&users)
	totalRecords := int64(0)
	database.DB.Model(&users).Count(&totalRecords)
	lastPage := int64(0)
	if limit > 0 {
		lastPage = (totalRecords + int64(limit) - 1) / int64(limit)
	}
	return c.Status(200).JSON(fiber.Map{
		"ok":    true,
		"users": users,
		"meta": fiber.Map{
			"current_page": page,
			"limit":        limit,
			"last_page":    lastPage,
			"total_count":  totalRecords,
		},
	})
}
