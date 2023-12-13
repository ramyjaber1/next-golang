package database

import (
	"log"
	"os"
	"time"

	"github.com/ramyjaber1/backbone/server/data"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB
var counts int64

func Connect() {

	database := connectToDB()
	if database == nil {
		log.Panic("Can't connect to Mysql!")
	}
	DB = database
	database.AutoMigrate(data.User{})
}

func connectToDB() *gorm.DB {
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")
	dsn := dbUser + ":" + dbPassword + "@tcp(" + dbHost + ":" + dbPort + ")/" + dbName + "?parseTime=true"
	for {
		connection, err := gorm.Open(mysql.Open(dsn), &gorm.Config{
			DisableForeignKeyConstraintWhenMigrating: true,
		})

		if err != nil {
			log.Println("DB not yet ready ...")
			counts++
		} else {
			log.Println("Connected to DB!")
			return connection
		}

		if counts > 10 {
			log.Println(err)
			return nil
		}
		log.Println("Backing off for two seconds ...")
		time.Sleep(2 * time.Second)
		continue
	}
}
