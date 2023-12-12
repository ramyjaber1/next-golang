# Use an official Golang runtime as a parent image
FROM golang:1.20.5-alpine3.18 AS builder

# Set the working directory in the container
WORKDIR /app/go

# Copy the contents of the cmd directory into the container at /app/go
COPY . .

# Build the Go app
RUN go build -o main cmd/main.go

# Expose port 9000 to the outside world
EXPOSE 9000

# Command to run the executable
CMD ["./main"]
