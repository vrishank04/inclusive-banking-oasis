
# Spring Boot Backend Setup

This document provides instructions for setting up a Spring Boot backend to replace the Supabase integration in the Inclusive Banking application.

## Prerequisites

- Java 17 or higher
- Maven or Gradle
- An IDE (IntelliJ IDEA, Eclipse, VS Code with Java extensions)

## Spring Boot Project Setup

1. Create a new Spring Boot project using [Spring Initializr](https://start.spring.io/)
   - Project: Maven or Gradle
   - Language: Java
   - Spring Boot: Latest stable version
   - Dependencies: 
     - Spring Web
     - Spring Data JPA
     - Spring Security
     - PostgreSQL Driver (or your preferred database)
     - Lombok (optional but recommended)

2. Download and import the project into your IDE

## API Endpoints to Implement

The frontend expects the following REST endpoints:

### Authentication
- `POST /api/auth/login` - Login with email/password
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/user` - Get current user details

### Accounts
- `GET /api/accounts` - Get all accounts for current user
- `GET /api/accounts/{id}` - Get single account by ID

### Transactions
- `GET /api/transactions` - Get all transactions for current user
- `GET /api/transactions/{id}` - Get single transaction by ID

## Security Configuration

1. Implement JWT-based authentication
2. Configure CORS to allow requests from your frontend domain
3. Set up proper authorization for endpoints

## Database Configuration

1. Create entity classes for User, Account, and Transaction
2. Set up database repositories using Spring Data JPA
3. Configure your `application.properties` or `application.yml` file with database connection details

## Example application.properties

```properties
# Server configuration
server.port=8080

# Database configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/inclusive_banking
spring.datasource.username=postgres
spring.datasource.password=password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect

# JWT configuration
jwt.secret=your_jwt_secret_key
jwt.expiration=86400000
```

## Integration with Frontend

1. Ensure your Spring Boot application is running on the expected URL configured in the frontend
2. Update the CORS configuration to allow requests from your frontend domain
3. Verify API endpoints match what the frontend expects

## Deployment

1. Build the Spring Boot application:
   ```
   ./mvnw package
   ```
   or with Gradle:
   ```
   ./gradlew build
   ```

2. Deploy the resulting JAR file to your server or cloud platform
