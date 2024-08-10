# Email Marketing System - Frontend

This document provides a comprehensive guide to setting up, configuring, and understanding the frontend of the Email Marketing System, which is built using React and CSS.

## Table of Contents

1. [Features](#features)
2. [Technology Stack](#technology-stack)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Project Structure](#project-structure)
6. [Usage](#usage)

## Features

- **User Registration and Login**: Provides interfaces for users to register and log into the system.
- **Email Scheduling**: Allows users to schedule and manage email campaigns.
- **Settings Management**: Interface for configuring system settings, including SMTP configuration.
- **Responsive Design**: Ensures a responsive and user-friendly interface across various devices.

## Technology Stack

- **Frontend**: React, CSS
- **HTTP Requests**: Axios for making API requests
- **State Management**: Context API for managing authentication state

## Installation

### Prerequisites

- **Node.js**: Ensure that Node.js is installed on your system. You can download and install it from [Node.js Official Site](https://nodejs.org/).

### Setup

1. **Clone the Repository**

   Begin by cloning the repository from GitHub to your local machine. Navigate into the `frontend` directory where the React application is located.

2. **Install Dependencies**

   Use `npm` to install all required dependencies. This includes React and Axios among others.

   ```bash
   npm install
   ```

3. **Start the Development Server**

   Launch the React development server using npm. This will start the application on a local server, typically accessible at `http://localhost:3000`.

   ```bash
   npm start
   ```

## Configuration

### Environment Variables

- **`.env` File**: Create a `.env` file in the `frontend` directory. This file contains environment-specific variables such as the base URL for API requests.
  - **`REACT_APP_API_URL`**: The URL for the backend API that the frontend will interact with.

### CSS Integration

- **CSS Styles**: Custom styles are included in the `src/styles/` directory. Ensure that `index.css` is imported into the main entry file (`src/index.js`).

## Project Structure

The `frontend` directory is organized into the following subdirectories and files:

```
frontend/
│
├── public/                # Static files
│   └── index.html         # Main HTML file
│
├── src/                   # Source files
│   ├── components/        # React components
│   │   ├── EmailForm.js   # Email scheduling form component
│   │   ├── Footer.js      # Footer component
│   │   └── Header.js      # Header component
│   ├── context/           # Contexts for state management
│   │   └── AuthContext.js # Authentication context
│   ├── index.css          # Main stylesheet
│   ├── index.js           # Entry point for React application
│   ├── pages/             # React pages
│   │   ├── EmailPage.js   # Email scheduling and management page
│   │   ├── HomePage.js    # Landing page
│   │   ├── LoginPage.js   # Login page
│   │   ├── RegisterPage.js # Registration page
│   │   └── SettingsPage.js # Settings page
│   ├── reportWebVitals.js # For measuring performance
│   ├── setupTests.js      # Setup for testing
│   └── utils/             # Utility functions
│       └── auth.js        # Authentication utilities
│
├── .env                   # Environment variables
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```

### `public/`

- **`index.html`**: This is the main HTML file that serves as the entry point for the React application. It includes a `div` with an id of `root`, where the React components will be rendered.

### `src/`

- **`components/`**: Contains reusable React components that make up parts of the UI.

  - **`Header.js`**: Contains the navigation bar or header of the application. It usually includes links to various pages and may display user-related information.

  - **`Footer.js`**: Contains the footer section of the application, which may include copyright information and additional links.

  - **`EmailForm.js`**: A form component for scheduling emails. It includes input fields for email subject, body, recipient list, and scheduling options.

- **`context/`**: Contains Context API files for managing global state.

  - **`AuthContext.js`**: Provides context for authentication state and functions.

- **`pages/`**: Includes the main pages or views of the application.

  - **`HomePage.js`**: The landing page of the application. It may include an introduction to the app and links to other pages.

  - **`RegisterPage.js`**: The registration page where new users can create an account. It includes form fields for user details and organization information.

  - **`LoginPage.js`**: The login page where users can enter their credentials to access the system. It includes fields for email and password.

  - **`SettingsPage.js`**: A page for managing system settings. This may include forms for configuring SMTP settings and other application-specific options.

- **`utils/`**: Contains utility functions used across the application.

  - **`auth.js`**: Functions for managing authentication tokens, such as saving tokens to local storage and checking if a user is authenticated.

- **`index.js`**: The entry point for the React application. It renders the `App` component into the `root` div in `index.html`.

- **`index.css`**: The main stylesheet for custom styles specific to the application.

## Usage

### Pages

- **HomePage.js**: Displays the landing page of the application. It provides an overview of the system and navigational links to other pages.

- **RegisterPage.js**: Allows users to register by providing their name, email, password, and organization details.

- **LoginPage.js**: Provides a form for users to log in using their email and password.

- **EmailPage.js**: Interface for scheduling and managing email campaigns. Users can fill out a form to schedule emails and view scheduled campaigns.

- **SettingsPage.js**: Allows users to configure system settings, including SMTP server details and email limits.

### Components

- **Header.js**: A component that typically includes navigation elements and displays user-related information such as the logged-in user’s name or avatar.

- **Footer.js**: A component that provides footer content, such as contact information or legal disclaimers.

- **EmailForm.js**: A form for scheduling emails. This component handles user input for email content, recipients, and scheduling time.

### Utilities

- **auth.js**: Functions in this file manage authentication-related tasks, such as storing and retrieving JWT tokens from local storage and checking user authentication status.
