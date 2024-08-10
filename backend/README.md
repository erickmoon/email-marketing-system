# Email Marketing System - Backend Documentation

This document provides a comprehensive guide to setting up, configuring, and understanding the backend of the Email Marketing System, built using Node.js, Express.js, and PostgreSQL.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Features](#features)
3. [Technology Stack](#technology-stack)
4. [Installation](#installation)
5. [Configuration](#configuration)
6. [API Endpoints](#api-endpoints)
7. [Usage](#usage)
8. [Testing](#testing)
9. [Appendix](#appendix)

## Project Structure

The `backend` directory is organized into the following subdirectories and files:

```
backend/
│
├── src/                         # Configuration and utility files
│   ├── jwt.js                   # JWT configuration
│   └── smtp.js                  # SMTP configuration
│
├── controllers/                 # Business logic and request handling
│   ├── authController.js        # User authentication, registration, login
│   ├── emailController.js       # Email scheduling, sending
│   ├── organizationController.js # Organization management
│   ├── settingsController.js    # System settings management
│   └── userController.js        # User management
│
├── middleware/                  # Middleware functions
│   └── authMiddleware.js        # JWT authentication middleware
│
├── migrations/                  # Database schema migrations
│   ├── 2024_08_01_create_organizations_table.js # Create organizations table
│   ├── 2024_08_02_create_mailing_lists_table.js  # Create mailing lists table
│   ├── 2024_08_03_create_contacts_table.js       # Create contacts table
│   ├── 2024_08_04_create_emails_table.js         # Create emails table
│   └── 2024_08_05_create_users_table.js          # Create users table
│
├── models/                      # Database models
│   ├── Email.js                 # Email model schema
│   ├── MailingList.js           # Mailing List model schema
│   ├── Organization.js          # Organization model schema
│   └── User.js                  # User model schema
│
├── package-lock.json            # Lock file for npm dependencies
├── package.json                 # Project metadata and dependencies
│
├── routes/                      # API routes
│   ├── authRoutes.js            # Authentication routes
│   ├── emailRoutes.js           # Email management routes
│   ├── organizationRoutes.js    # Organization management routes
│   ├── settingsRoutes.js        # System settings routes
│   └── userRoutes.js            # User management routes
│
├── server.js                    # Main entry point
│
└── utils/                       # Utility functions
    └── emailScheduler.js        # Functions for scheduling emails
```

### `src/`

- **`controllers/`**: Contains files that handle the logic for various routes.

  - **`authController.js`**: Manages user authentication, including registration and login. It processes requests, interacts with the user model, and sends appropriate responses.
  - **`emailController.js`**: Handles email-related functionality such as scheduling, retrieving, and managing email campaigns. It interacts with the email model and provides necessary data to the frontend.
  - **`organizationController.js`**: Manages operations related to organizations, including creation and retrieval.
  - **`settingsController.js`**: Manages system settings, including SMTP configuration. It handles requests related to settings and updates the settings model.
  - **`userController.js`**: Handles user management tasks such as retrieving, updating, and deleting user data.

- **`models/`**: Defines the database schemas and methods for interacting with the database.

  - **`Email.js`**: Defines the schema for email campaigns, including fields for email content, scheduling, and status.
  - **`MailingList.js`**: Defines the schema for mailing lists.
  - **`Organization.js`**: Defines the schema for organizations, including details about each organization.
  - **`User.js`**: Defines the schema for user data, including fields for authentication and methods for querying user information.

- **`routes/`**: Contains route definitions that map to controller functions.

  - **`authRoutes.js`**: Defines routes related to user authentication, such as registration and login.
  - **`emailRoutes.js`**: Defines routes for managing email scheduling and campaigns.
  - **`organizationRoutes.js`**: Defines routes for organization management.
  - **`settingsRoutes.js`**: Defines routes for system settings management.
  - **`userRoutes.js`**: Defines routes for user management.

- **`middleware/`**: Provides middleware functions used across the application.

  - **`authMiddleware.js`**: Middleware for verifying JWT tokens and ensuring that routes are accessed by authenticated users.

- **`utils/`**: Contains utility functions used across the application.

  - **`emailScheduler.js`**: Functions for scheduling and managing email campaigns.

- **`config.js`**: Contains configuration settings, including constants and environment-specific variables.

- **`database.js`**: Sets up the database connection using Knex.js and PostgreSQL, including configuration for connecting to the database and running migrations.

- **`server.js`**: The entry point for the backend application. It initializes the Express.js server, sets up middleware, and defines API routes.

## Features

- **User Authentication**: Handles user registration, login, and token-based authentication.
- **Email Scheduling**: Provides endpoints for scheduling, managing, and retrieving email campaigns.
- **Settings Management**: Allows configuration of SMTP settings and other system preferences.
- **Database Integration**: Utilizes PostgreSQL for persistent storage of user data, email schedules, and settings.
- **Error Handling**: Includes comprehensive error handling and logging for smooth operation and debugging.

## Technology Stack

- **Backend Framework**: Express.js for building the RESTful API.
- **Database**: PostgreSQL for relational data storage.
- **Query Builder**: Knex.js for database interactions.
- **Authentication**: JWT (JSON Web Tokens) for securing endpoints.
- **Environment Management**: dotenv for managing environment variables.

## Installation

### Prerequisites

- **Node.js**: Ensure that Node.js is installed on your system. You can download and install it from [Node.js Official Site](https://nodejs.org/).
- **PostgreSQL**: Install PostgreSQL for the database. You can download it from [PostgreSQL Official Site](https://www.postgresql.org/).

### Setup

1. **Clone the Repository**

   Clone the repository from GitHub to your local development environment:

   ```bash
   git clone <repository-url>
   ```

2. **Install Dependencies**

   Navigate to the backend directory and install all required dependencies:

   ```bash
   cd backend
   npm install
   ```

3. **Setup the Database**

   Create a PostgreSQL database for the application. Configure the necessary tables using the provided migration files.

4. **Start the Server**

   Use npm to start the server:

   ```bash
   npm start
   ```

   The backend will be available on a local server, typically accessible at `http://localhost:5000`.

## Configuration

### Environment Variables

- **`.env` File**: Create a `.env` file in the root of the backend directory. This file contains environment-specific variables.
  - **`DATABASE_URL`**: The connection string for PostgreSQL.
  - **`JWT_SECRET`**: The secret key used for signing JWT tokens.
  - **`SMTP_HOST`**: SMTP server host for sending emails.
  - **`SMTP_PORT`**: Port number for the SMTP server.
  - **`SMTP_USER`**: Username for the SMTP server.
  - **`SMTP_PASS`**: Password for the SMTP server.

### Database Schema

The application uses PostgreSQL for data storage. The schema includes tables for users, email campaigns, and settings. Migrations are used to set up and update the database schema. Refer to the `migrations/` directory for detailed migration files.

## API Endpoints

### Authentication

- **POST `/api/auth/register`**

  - **Description:** Registers a new user.
  - **Request Body:**
    ```json
    {
      "username": "string",
      "password": "string",
      "email": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "User registered successfully"
    }
    ```

- **POST `/api/auth/login`**
  - **Description:** Logs in an existing user and returns a JWT token.
  - **Request Body:**
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "token": "string"
    }
    ```

### Email Management

- **POST `/api/emails`**
  - **Description:** Schedules a new email campaign.
  - **Request Body:**
    ```json
    {
      "subject": "string",
      "body": "string",
      "organizationId": "string",
      "mailingListId": "string",
      "sendAt": "2024-08-10T14:00:00Z"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Email
    ```

scheduled successfully"
}

````

- **GET `/api/emails/:id`**
  - **Description:** Retrieves details of a scheduled email.
  - **Response:**
    ```json
    {
      "id": "string",
      "subject": "string",
      "body": "string",
      "organizationId": "string",
      "mailingListId": "string",
      "sendAt": "2024-08-10T14:00:00Z"
    }
    ```

### Organization Management

- **POST `/api/organizations`**

  - **Description:** Creates a new organization.
  - **Request Body:**
    ```json
    {
      "name": "string",
      "description": "string"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Organization created successfully"
    }
    ```

- **GET `/api/organizations/:id`**
  - **Description:** Retrieves details of an organization.
  - **Response:**
    ```json
    {
      "id": "string",
      "name": "string",
      "description": "string"
    }
    ```

### Settings Management

- **GET `/api/settings`**

  - **Description:** Retrieves system settings.
  - **Response:**
    ```json
    {
      "smtp": {
        "host": "string",
        "port": "number",
        "user": "string",
        "pass": "string"
      }
    }
    ```

- **PUT `/api/settings`**
  - **Description:** Updates system settings.
  - **Request Body:**
    ```json
    {
      "smtp": {
        "host": "string",
        "port": "number",
        "user": "string",
        "pass": "string"
      }
    }
    ```
  - **Response:**
    ```json
    {
      "message": "Settings updated successfully"
    }
    ```

## Usage

### Starting the Server

Ensure that all environment variables are set and the PostgreSQL database is configured. Start the server using:

```bash
npm start
````

The application will be available at `http://localhost:5000`.

### Making Requests

Use tools like Postman or cURL to interact with the API endpoints. Ensure that you include a valid JWT token in the `Authorization` header for protected routes.

## Testing

Testing is essential for ensuring the reliability of the backend. Use testing frameworks such as Mocha or Jest for unit and integration tests.

### Running Tests

1. **Install Testing Dependencies**

   Install the required testing libraries:

   ```bash
   npm install --save-dev mocha chai
   ```

2. **Run Tests**

   Execute the test suite:

   ```bash
   npm test
   ```

## Appendix

### Known Issues

- **Issue with JWT Token Expiry**: Tokens might expire before users expect. Ensure to handle token refresh logic in the frontend.

### Future Enhancements

- **Email Analytics**: Adding analytics for tracking email open rates and click rates.
- **Advanced Scheduling**: Implementing more advanced scheduling options, such as recurring emails.
