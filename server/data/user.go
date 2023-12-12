package data

import (
	"time"

	"golang.org/x/crypto/bcrypt"
)

type User struct {
	ID        int       `json:"id" gorm:"primary_key;autoIncrement"`
	Name      string    `json:"name" `
	Email     string    `json:"email" gorm:"unique"`
	Phone     string    `json:"phone"`
	Password  []byte    `json:"-"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func (user *User) SetPassword(password string) {
	newPassword, _ := bcrypt.GenerateFromPassword([]byte(password), 14)
	user.Password = newPassword
}

func (user *User) ComparePassword(password string) error {
	return bcrypt.CompareHashAndPassword(user.Password, []byte(password))
}
