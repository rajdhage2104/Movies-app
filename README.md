# Movies App

A simple application to list, add, and delete movies. Built with:
- Frontend: React
- Backend: Java Spring Boot
- Database: MySQL

## Project Structure
- `/frontend` - React application
- `/backend` - Java Spring Boot application

## Features
- List all movies
- Add a new movie
- Delete a movie

## Setup Instructions
### Prerequisites
- Node.js and npm
- Java 11+
- Maven
- MySQL

### Database Setup
1. Create a MySQL database named `moviesdb`
2. The application is configured to connect to an RDS instance (configuration in application.properties)

### Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Build the application: `mvn clean install`
3. Run the application: `mvn spring-boot:run`

### Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Run the application: `npm start`

## Testing

### Backend Tests
1. Navigate to the backend directory: `cd backend`
2. Run tests with coverage report: `mvn clean test jacoco:report`
3. View the coverage report at `backend/target/site/jacoco/index.html`
4. Current coverage: 79% overall with 100% coverage in Controller and Service layers

### Frontend Tests
1. Navigate to the frontend directory: `cd frontend`
2. Run tests with coverage report: `npm test -- --coverage`
3. View the coverage report in the console output or at `frontend/coverage/lcov-report/index.html`
4. Current coverage: 100% across all source files

### Test Implementation Details
- **Frontend**: Uses Jest and React Testing Library with mocked API calls
- **Backend**: Uses JUnit 5 with Spring Boot Test and JaCoCo for coverage reporting
- All tests are designed to run without external dependencies (database connections are mocked)
