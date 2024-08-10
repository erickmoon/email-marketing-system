# Email Marketing System - Backend

This directory contains the backend implementation for the email marketing system. It is organized to facilitate the development and maintenance of various functionalities including user management, email scheduling, and system settings.

## Folder Structure

### `controllers/`

- **Purpose:** Contains the business logic and handles HTTP requests and responses. Each controller corresponds to a specific feature or resource in the application.
- **Example Files:**
  - `authController.js` - Manages user authentication, registration, and login.
  - `emailController.js` - Handles operations related to scheduling and sending emails.
  - `settingsController.js` - Manages system settings such as SMTP configuration and email limits.
  - `userController.js` - Manages user operations including retrieval, creation, update, and deletion.

### `models/`

- **Purpose:** Defines the database schema and interacts with the PostgreSQL database. Each model represents a table in the database.
- **Example Files:**
  - `Email.js` - Defines the schema for scheduled and sent emails.
  - `MailingList.js` - Defines the schema for email mailing lists.
  - `Organization.js` - Defines the schema for organizations.
  - `User.js` - Defines the user schema and database interactions for user data.

### `migrations/`

- **Purpose:** Contains migration scripts for creating and updating the database schema. These scripts ensure that the database schema is consistent with the models.
- **Example Files:**
  - `2024_08_01_create_organizations_table.js` - Migration script for creating the organizations table.
  - `2024_08_02_create_mailing_lists_table.js` - Migration script for creating the mailing lists table.
  - `2024_08_03_create_contacts_table.js` - Migration script for creating the contacts table.
  - `2024_08_04_create_emails_table.js` - Migration script for creating the emails table.
  - `2024_08_05_create_users_table.js` - Migration script for creating the users table.

### `routes/`

- **Purpose:** Defines the routes and maps them to appropriate controllers. This folder organizes all the endpoints of the API.
- **Example Files:**
  - `authRoutes.js` - Defines routes for user authentication and registration.
  - `emailRoutes.js` - Defines routes for scheduling and managing emails.
  - `settingsRoutes.js` - Defines routes for managing system settings.
  - `userRoutes.js` - Defines routes for user management including retrieval, creation, update, and deletion.

### `middleware/`

- **Purpose:** Contains middleware functions for processing requests before they reach the controllers. Middleware can handle tasks such as authentication and logging.
- **Example Files:**
  - `authMiddleware.js` - Middleware for verifying JWT tokens and handling authentication.

### `config/`

- **Purpose:** Contains configuration files for the application, such as environment variables and database connection settings.
- **Example Files:**
  - `config.js` - Central configuration file for application settings, including SMTP settings and database credentials.
  - `db.js` - Database connection settings.
  - `jwt.js` - JWT configuration.
  - `smtp.js` - SMTP configuration.

### `utils/`

- **Purpose:** Contains utility functions and helpers that are used throughout the application.
- **Example Files:**
  - `emailScheduler.js` - Utility functions for scheduling emails.

### `server.js`

- **Purpose:** The main entry point for the application. It initializes the Express server, sets up middleware, and connects to the database.

## Installation and Setup

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   ```

2. **Navigate to the Backend Folder:**

   ```bash
   cd backend
   ```

3. **Install Dependencies:**

   ```bash
   npm install
   ```

4. **Configure Environment Variables:**

   - Create a `.env` file in the root of the `backend` folder.
   - Add required configuration variables such as database credentials and SMTP settings.

5. **Run Migrations:**

   ```bash
   npm run migrate
   ```

6. **Start the Server:**

   ```bash
   npm start
   ```

## Usage

- **API Documentation:** Refer to the API documentation for details on available endpoints and request formats.
- **Authentication:** Use JWT for securing API routes. Ensure to include the JWT token in the `Authorization` header of requests.
- **Error Handling:** Errors are managed through middleware and appropriate error messages are sent in responses.