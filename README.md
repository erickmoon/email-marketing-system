# Email Marketing System

A comprehensive email marketing system designed to handle bulk email campaigns efficiently. With features including user management, email scheduling, and SMTP configuration, this system can handle up to 100,000 emails. Built with Node.js, React, and PostgreSQL.

## Table of Contents

1. [Features](#features)
2. [Technology Stack](#technology-stack)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [API Documentation](#api-documentation)
6. [Frontend Documentation](#frontend-documentation)
7. [User Guide](#user-guide)
8. [License](#license)

## Features

- **User Authentication**: Register, login, and manage users with role-based permissions.
- **Email Scheduling**: Schedule emails to be sent at a specific time and cancel scheduled emails.
- **Mailing List Management**: Create, import, and manage mailing lists.
- **Unsubscribe Functionality**: Allow recipients to unsubscribe from mailing lists.
- **Email Sending**: Send emails to individuals, groups, or entire mailing lists, respecting unsubscribe preferences.
- **Customizable Headers/Footers**: Set standard headers and footers for emails per organization.
- **SMTP Configuration**: Configure multiple SMTP servers for sending emails.
- **Rate Limiting**: Handle rate limits for sending emails, with automatic rescheduling.
- **Cron Jobs**: Manage email sending schedules with cron jobs.

## Technology Stack

- **Backend**: Node.js, PostgreSQL
- **Frontend**: React, Bootstrap, CSS
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Scheduling**: Cron Jobs

## Installation

### Backend Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/erickmoon/email-marketing-system.git
   cd email-marketing-system/backend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the `backend` directory and set up your environment variables:

   ```env
   DATABASE_URL=postgres://username:password@localhost:5432/email_marketing
   JWT_SECRET=your_jwt_secret
   SMTP_SERVER=smtp.example.com
   SMTP_PORT=587
   SMTP_USER=your_smtp_user
   SMTP_PASSWORD=your_smtp_password
   ```

4. **Run Database Migrations**

   ```bash
   npx sequelize-cli db:migrate
   ```

5. **Start the Backend Server**

   ```bash
   npm start
   ```

### Frontend Installation

1. **Navigate to Frontend Directory**

   ```bash
   cd ../frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start the React Development Server**

   ```bash
   npm start
   ```

## Configuration

### SMTP Settings

- Configure SMTP settings in the backend `.env` file.
- Ensure you have valid SMTP credentials for sending emails.

### Database Configuration

- Ensure PostgreSQL is installed and running.
- Create a database named `email_marketing` or adjust the `DATABASE_URL` in the `.env` file accordingly.

## API Documentation

### Authentication

- **POST /api/auth/register**

  Register a new user/organization.

  **Request Body:**

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "organizationName": "Organization Name"
  }
  ```

  **Response:**

  ```json
  {
    "message": "Registration successful",
    "user": { "id": 1, "name": "John Doe", "email": "john@example.com" }
  }
  ```

- **POST /api/auth/login**

  Login an existing user.

  **Request Body:**

  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

  **Response:**

  ```json
  {
    "token": "jwt_token_here",
    "user": { "id": 1, "name": "John Doe", "email": "john@example.com" }
  }
  ```

### Email Management

- **POST /api/emails/schedule**

  Schedule an email to be sent.

  **Request Body:**

  ```json
  {
    "subject": "Email Subject",
    "body": "Email Body",
    "scheduled_at": "2024-08-10T15:00:00Z",
    "recipients": ["email1@example.com", "email2@example.com"]
  }
  ```

  **Response:**

  ```json
  {
    "message": "Email scheduled successfully"
  }
  ```

### Settings

- **GET /api/settings**

  Fetch current settings.

- **POST /api/settings**

  Update settings.

  **Request Body:**

  ```json
  {
    "smtpSettings": {
      "server": "smtp.example.com",
      "port": 587,
      "user": "your_smtp_user",
      "password": "your_smtp_password"
    },
    "maxEmailsPerHour": 100
  }
  ```

  **Response:**

  ```json
  {
    "message": "Settings saved successfully"
  }
  ```

## Frontend Documentation

### Pages

- **HomePage.js**: The landing page of the application.
- **RegisterPage.js**: Page for user registration.
- **LoginPage.js**: Page for user login.
- **EmailPage.js**: Page for scheduling and managing emails.
- **SettingsPage.js**: Page for configuring system settings.

### Components

- **AuthContext.js**: Provides authentication context to the application.
- **utils/auth.js**: Utility functions for handling authentication tokens.

## User Guide

### Registration

1. **Visit the Registration Page**: Navigate to `/register`.
2. **Fill in the Details**: Provide your name, email, password, and organization name.
3. **Submit the Form**: Click "Register" to create a new account.

### Login

1. **Visit the Login Page**: Navigate to `/login`.
2. **Enter Your Credentials**: Provide your email and password.
3. **Submit the Form**: Click "Login" to access your account.

### Scheduling Emails

1. **Visit the Email Management Page**: Navigate to `/emails`.
2. **Fill in the Email Details**: Enter the subject, body, and recipients of the email.
3. **Set the Scheduled Time**: Specify when the email should be sent.
4. **Submit the Form**: Click "Schedule Email" to add it to the queue.

### Managing Mailing Lists

1. **Visit the Mailing List Page**: Navigate to `/mailing-lists`.
2. **Create or Import Lists**: Add new mailing lists or import existing ones.
3. **Manage Subscriptions**: View and update subscriber information.

### Settings

1. **Visit the Settings Page**: Navigate to `/settings`.
2. **Update SMTP and System Settings**: Adjust SMTP configuration, system name, and email limits.
3. **Save Changes**: Click "Save Settings" to apply your updates.

### Unsubscribe

1. **Access Unsubscribe Link**: Find the unsubscribe link in the email footer.
2. **Follow the Link**: Click the link to be removed from the mailing list.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
