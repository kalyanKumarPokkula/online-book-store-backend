# Book Service Microservice for online book store

## Table of Contents

---

- Introduction
- Features
- Requirements
- Installation
- Usage
- Configuration
- API Endpoints
- Tests
- Contributing
- License

## Introduction

---

The Book Service is a Node.js microservice responsible for managing book-related operations such as adding, updating, viewing, and deleting books. This service is part of a larger microservice-based architecture for an online bookstore.

## Features

---

Create, read, update, and delete (CRUD) books.
Search for books by title, author, or category.
Supports pagination for large lists of books.
RESTful API design for seamless integration with other services.

Requirements
Node.js (v18.x or higher)
NPM (v9.x or higher)
MYSQL
Redis (optional, for caching)
And Install all the requriments from package.json

## Installation

---

Clone the repository:

bash
Copy code

```
git clone https://github.com/kalyanKumarPokkula/online-book-store-backend.git
cd Bookservice

```

### Install dependencies:

---

```
npm install
```

## Set up environment variables:

---

Create a .env file in the root directory of the project and add the necessary environment variables. Here’s an example:

bash
Copy code

```
EMAIL_PASS=****\*\*\*****
EMAIL=****\*\*****@gmail.com
```

## Usage

To start the service in development mode:

```
npm run dev
```

## Configuration

All configuration is done through environment variables. Ensure that the .env file has the correct values for database connections, ports, and other settings.

API Endpoints:

GET /api/books Get a list of all books (supports pagination)
GET /api/books/
POST /api/books Add a new book
PUT /api/books/
DELETE /api/books/
Delete a specific book
GET /api/books/search?q=term Search books by title, author, or category

## Sample Book Object

```
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "category": "Fiction",
  "price": 10.99,
  "isbn": "978-0743273565"
}
```

## Contributing

Contributions are welcome! Please follow the steps below:

Fork the repository.
Create a new branch: git checkout -b feature-branch-name.
Make your changes.
Commit your changes: git commit -m 'Add feature'.
Push to the branch: git push origin feature-branch-name.
Open a pull request.
