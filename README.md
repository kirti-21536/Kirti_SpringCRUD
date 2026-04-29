# 🎓 Studix Student Manager

A RESTful backend application built using **Spring Boot** and **JDBC** to manage student records efficiently.
Studix provides a clean and scalable solution for performing CRUD operations with a structured layered architecture.

---

## 🚀 Features

* Create a new student record
* Retrieve all students
* Retrieve a student by ID
* Update student details
* Delete a student record
* Clean layered architecture (Controller → Service → Repository)
* Uses **JDBC (no ORM like Hibernate)**

---

## 🛠️ Tech Stack

* Java 17+
* Spring Boot
* Spring JDBC
* PostgreSQL
* Maven

---

## 📂 Project Structure

```
src/
 └── main/
     ├── java/com/example/studentapp/
     │    ├── controller/
     │    ├── service/
     │    ├── repository/
     │    └── model/
     └── resources/
          └── application.properties
```

---

## 🗄️ Database Setup

### 1. Create Database

```sql
CREATE DATABASE studentdb;
```

### 2. Create Table

```sql
CREATE TABLE student (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    course VARCHAR(100)
);
```

---

## ⚙️ Configuration

Update `application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/studentdb
spring.datasource.username=postgres
spring.datasource.password=your_password

spring.datasource.driver-class-name=org.postgresql.Driver
```

---

## ▶️ Running the Application

```bash
mvn spring-boot:run
```

Application will start at:

```
http://localhost:8080
```

---

## 🌐 API Endpoints

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| POST   | /students      | Create a student  |
| GET    | /students      | Get all students  |
| GET    | /students/{id} | Get student by ID |
| PUT    | /students/{id} | Update student    |
| DELETE | /students/{id} | Delete student    |

---

## 📥 Sample Request Body

```json
{
  "name": "Kirti",
  "email": "kirti@gmail.com",
  "course": "Computer Science"
}
```
