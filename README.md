# search.auw211.org admin site frontend

This is the admin site frontend repository for https://search.auw211.org.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Development](#development)
- [Project Structure](#project-structure)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)

## Tech Stack

This project is built with:

- **React** - A JavaScript library for building user interfaces
- **React Admin** - A framework for building admin applications on top of REST/GraphQL APIs
- **Material-UI (MUI)** - React component library implementing Google's Material Design
- **Axios** - HTTP client for making API requests
- **D3.js** - Data visualization library for creating charts and graphs
- **Day.js** - Lightweight date manipulation library
- **Sass** - CSS preprocessor for more maintainable stylesheets
- **Create React App** - Toolchain for bootstrapping React applications

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- **Node.js** (v14 or higher recommended) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn** - Package manager for JavaScript
- **Git** - Version control system - [Download here](https://git-scm.com/)
- **A code editor** - We recommend [VS Code](https://code.visualstudio.com/)

To verify your installations, run these commands in your terminal:

```bash
node --version
npm --version
git --version
```

## Getting Started

### 1. Clone the Repository

First, clone this repository to your local machine:

```bash
git clone <repository-url>
cd search-admin-client
```

### 2. Install Dependencies

Install all the required npm packages:

```bash
npm install
```

This command reads the [package.json](package.json) file and downloads all dependencies listed there into a `node_modules` folder.

### 3. Set Up Environment Variables

Create a local environment configuration file:

```bash
cp .env.example .env
```

Open the newly created `.env` file in your code editor and configure the following variables:

```
PORT=3097                 # The port where the dev server will run (default: 3097)
PUBLIC_URL=/admin         # The base path for the application
```

**Important**: The `.env` file is git-ignored and won't be committed. This keeps sensitive configuration out of version control.

## Development

### Starting the Development Server

To start the local development server:

```bash
npm start
```

This will:

1. Start the React development server
2. Automatically open your browser to `http://localhost:3097/admin`
3. Enable hot-reloading (changes you make will automatically refresh the browser)

The development server will continue running until you stop it with `Ctrl+C`.

### Making Changes

1. **Edit files** - Make your changes in the [src](src/) directory
2. **See changes live** - The browser will automatically refresh
3. **Check console** - Look for any errors in the browser's developer console (F12)
4. **Test your changes** - Make sure everything works as expected

### Code Organization

- [src/ui/](src/ui/) - React components for the user interface
  - [src/ui/resources/](src/ui/resources/) - Resource-specific components (agencies, programs, users, etc.)
  - [src/ui/charts/](src/ui/charts/) - Data visualization components
- [src/authProvider.js](src/authProvider.js) - Authentication logic
- [src/theme.js](src/theme.js) - Material-UI theme configuration
- [src/constants.js](src/constants.js) - Application-wide constants
- [src/util.js](src/util.js) - Utility functions

## Project Structure

```
search-admin-client/
├── public/              # Static files (HTML, images, etc.)
├── src/                 # Source code
│   ├── ui/             # React components
│   │   ├── resources/  # Admin resources (CRUD interfaces)
│   │   ├── charts/     # Data visualization components
│   │   ├── App.js      # Main application component
│   │   ├── Dashboard.js # Dashboard/home page
│   │   └── ...
│   ├── authProvider.js  # Authentication logic
│   ├── theme.js         # UI theme configuration
│   ├── constants.js     # App constants
│   ├── index.js         # Application entry point
│   └── ...
├── .env.example         # Example environment variables
├── .env                 # Your local environment config (git-ignored)
├── package.json         # Project dependencies and scripts
├── build.sh             # Production build script
├── deploy.sh            # Deployment script
└── README.md           # This file
```

## Environment Variables

The application uses environment variables for configuration:

| Variable     | Description                            | Example  |
| ------------ | -------------------------------------- | -------- |
| `PORT`       | Port number for the development server | `3097`   |
| `PUBLIC_URL` | Base URL path for the application      | `/admin` |

You can add more environment variables as needed. In React, custom environment variables must start with `REACT_APP_` to be accessible in your code.

Example:

```
REACT_APP_API_URL=https://api.example.com
```

Access them in code:

```javascript
const apiUrl = process.env.REACT_APP_API_URL
```

## Deployment

### Building for Production

To create a production build:

```bash
./build.sh
```

This script will:

1. Run `npm run build` to create optimized production files
2. Create a zip archive of the build folder

### Deploying to Production

To deploy the built files to the production server:

```bash
./deploy.sh
```

**Prerequisites for deployment**:

- You must have an SSH config entry called `auw1` in your `~/.ssh/config` file
- The entry should point to your production server

Example SSH config entry:

```
Host auw1
    HostName your-server.com
    User your-username
    IdentityFile ~/.ssh/your-key
```

The deploy script will copy the distribution files to the production machine.
