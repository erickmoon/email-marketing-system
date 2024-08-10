# Email Marketing System - Frontend

This document provides a comprehensive guide to setting up, configuring, and understanding the frontend of the Email Marketing System, which is built using React, Bootstrap, and CSS.

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
- **Responsive Design**: Utilizes Bootstrap to ensure a responsive and user-friendly interface across various devices.

## Technology Stack

- **Frontend**: React, Bootstrap, CSS
- **HTTP Requests**: Axios for making API requests
- **State Management**: Context API for managing authentication state

## Installation

### Prerequisites

- **Node.js**: Ensure that Node.js is installed on your system. You can download and install it from [Node.js Official Site](https://nodejs.org/).

### Setup

1. **Clone the Repository**

   Begin by cloning the repository from GitHub to your local machine. Navigate into the `frontend` directory where the React application is located.

2. **Install Dependencies**

   Use `npm` to install all required dependencies. This includes React, Bootstrap, and Axios among others.

3. **Start the Development Server**

   Launch the React development server using npm. This will start the application on a local server, typically accessible at `http://localhost:3000`.

## Configuration

### Environment Variables

- **`.env` File**: Create a `.env` file in the `frontend` directory. This file contains environment-specific variables such as the base URL for API requests.
  - **`REACT_APP_API_URL`**: The URL for the backend API that the frontend will interact with.

### Bootstrap Integration

- **Bootstrap Styles**: Bootstrap is included for styling and layout. Ensure that Bootstrap's CSS is imported into the main entry file (`src/index.js`).

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
│   │   ├── Header.js      # Header component
│   │   ├── Footer.js      # Footer component
│   │   └── EmailForm.js   # Email scheduling form component
│   ├── pages/             # React pages
│   │   ├── HomePage.js    # Landing page
│   │   ├── RegisterPage.js # Registration page
│   │   ├── LoginPage.js   # Login page
│   │   └── SettingsPage.js # Settings page
│   ├── utils/             # Utility functions
│   │   ├── auth.js        # Authentication utilities
│   │   └── api.js         # API utilities
│   ├── App.js             # Main App component
│   ├── index.js           # Entry point for React application
│   └── styles/            # CSS styles
│       ├── main.css       # Main stylesheet
│       └── bootstrap.min.css # Bootstrap stylesheet
│
├── .env                   # Environment variables
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```

### `public/`

- **`index.html`**: This is the main HTML file that serves as the entry point for the React application. It includes a `div` with an id of `root`, where the React components will be rendered.

### `src/`

- **`components/`**: This directory contains reusable React components that make up parts of the UI.

  - **`Header.js`**: Contains the navigation bar or header of the application. It usually includes links to various pages and may display user-related information.

  - **`Footer.js`**: Contains the footer section of the application, which may include copyright information and additional links.

  - **`EmailForm.js`**: A form component for scheduling emails. It typically includes input fields for email subject, body, recipient list, and scheduling options.

- **`pages/`**: This directory includes the main pages or views of the application.

  - **`HomePage.js`**: The landing page of the application. It may include an introduction to the app and links to other pages.

  - **`RegisterPage.js`**: The registration page where new users can create an account. It includes form fields for user details and organization information.

  - **`LoginPage.js`**: The login page where users can enter their credentials to access the system. It usually includes fields for email and password.

  - **`SettingsPage.js`**: A page for managing system settings. This may include forms for configuring SMTP settings and other application-specific options.

- **`utils/`**: Contains utility functions used across the application.

  - **`auth.js`**: Provides functions for managing authentication tokens, such as saving tokens to local storage and checking if a user is authenticated.

  - **`api.js`**: Contains functions for making HTTP requests to the backend API using Axios. It handles API endpoints for user registration, login, email scheduling, and settings management.

- **`App.js`**: The root component of the React application. It sets up the main application structure, including routing between different pages using React Router.

- **`index.js`**: The entry point for the React application. It renders the `App` component into the `root` div in `index.html`.

- **`styles/`**: Contains CSS files for styling the application.

  - **`main.css`**: The main stylesheet for custom styles specific to the application.

  - **`bootstrap.min.css`**: The Bootstrap stylesheet for styling components using Bootstrap’s CSS framework.

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

- **api.js**: Provides functions for making API calls. This file abstracts the details of making HTTP requests and provides a simple interface for interacting with the backend API.
