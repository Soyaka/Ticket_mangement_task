# Ticket Manager Project

## Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Installation](#installation)
  - [Automated Setup](#automated-setup)
  - [Manual Setup](#manual-setup)
    - [API Setup](#api-setup)
    - [Client Setup](#client-setup)
- [Usage](#usage)
- [Development](#development)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

## Overview

The Ticket Manager is a full-stack application consisting of a .NET Core API backend and a React frontend (with Typescript). It allows users to create, read, update, and delete tickets in a simple and efficient manner.

## Prerequisites

Before you begin, ensure you have the following installed:
- [.NET SDK](https://dotnet.microsoft.com/download) (version 6.0 or later)
- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Bun](https://bun.sh/) (optional, but recommended for faster installation and execution)
- [Git](https://git-scm.com/) (for version control)

## Project Structure

```
ticket-manager/
├── api/
│   ├── Controllers/
│   ├── Models/
│   ├── Services/
│   ├── Data/
│   ├── Program.cs
│   └── api.csproj
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── run_project.sh
└── README.md
```

## Installation

### Automated Setup

We provide a script to automate the setup and running of both the API and client.

1. Clone the repository:
   ```
   git clone https://github.com/Soyaka/Ticket_mangement_task.git
   cd Ticket_mangement_task
   ```

2. Give execution permissions to the script:
   ```
   chmod +x setup.sh
   ```

3. Run the script:
   ```
   ./setup.sh
   ```

The script will handle the installation, building, and running of both the API and client.

### Manual Setup

If you prefer to set up the project manually, follow these steps:

#### API Setup

1. Navigate to the `api` directory:
   ```
   cd api
   ```

2. Restore .NET dependencies:
   ```
   dotnet restore
   ```

3. Update the database:
   ```
   dotnet ef database update
   ```

4. Build the API:
   ```
   dotnet build
   ```

5. Run the API:
   ```
   dotnet run
   ```

#### Client Setup

1. Navigate to the `client` directory:
   ```
   cd client
   ```

2. Install dependencies (choose one):
   - Using Bun (if installed):
     ```
     bun install
     ```
   - Using npm:
     ```
     npm install
     ```

3. Run the client (choose one):
   - Using Bun:
     ```
     bun run dev
     ```
   - Using npm:
     ```
     npm run dev
     ```

## Usage

After setting up the project:

1. The API will be running on `http://localhost:5041` (or the port specified in your API configuration).
2. The client will be accessible at `http://localhost:5173` (or the port specified in your client configuration).
3. Use the web interface to manage tickets:
   - Create new tickets
   - View existing tickets
   - Update ticket information
   - Delete tickets

## Development

- API: The .NET Core API uses Entity Framework Core for database operations. To make changes to the database schema, update the models in the `api/Models` directory and create a new migration:
  ```
  dotnet ef migrations add NewMigration
  dotnet ef database update
  ```

- Client: The React client uses Vite for fast development and building. To add new components or modify existing ones, work in the `client/src` directory.

## Testing

- API: Run the tests using the following command in the `api` directory:
  ```
  dotnet test
  ```


## Troubleshooting

- If you encounter database connection issues, check the connection string in `api/appsettings.json`.
- For client-side errors, check the browser console and the terminal where you're running the client for error messages.
- Ensure all required ports are free and not being used by other applications.
- If you're having trouble with Node.js or npm, try clearing the npm cache:
  ```
  npm cache clean --force
  ```
