#!/bin/bash

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Navigate to the client directory and install dependencies
echo "Entering the client directory..."
cd client || { echo "Client directory not found"; exit 1; }

if command_exists bun; then
    echo "Bun is installed. Using bun to install dependencies..."
    bun install
    CLIENT_RUN_COMMAND="bun run dev"
else
    echo "Bun is not installed. Using npm to install dependencies..."
    npm install
    CLIENT_RUN_COMMAND="npm run dev"
fi

# Navigate back to the root directory
echo "Exiting the client directory..."
cd ..

# Navigate to the api directory and restore .NET dependencies
echo "Entering the api directory..."
cd api || { echo "API directory not found"; exit 1; }

# Restore dependencies, update the database, build, and run the API
echo "Restoring .NET dependencies..."
dotnet restore

echo "Updating the database..."
dotnet ef database update

echo "Building the API..."
dotnet build

echo "Running the API..."
dotnet run &

# Capture the API process ID to stop it later if needed
API_PID=$!

# Wait for the API to start up (adjust the sleep time if necessary)
echo "Waiting for the API to start..."
sleep 5

# Navigate back to the client directory and run the client
echo "Entering the client directory again..."
cd ../client || { echo "Client directory not found"; exit 1; }

echo "Starting the client..."
$CLIENT_RUN_COMMAND &

# Capture the client process ID to stop it later if needed
CLIENT_PID=$!

# Wait for the client to start up (adjust the sleep time if necessary)
echo "Waiting for the client to start..."
sleep 5

# Open the client in the browser (adjust the port if necessary)
echo "Opening the client in the browser..."
xdg-open http://localhost:5173/ || open http://localhost:5173/ || start http://localhost:5173/

# Wait for the user to press Ctrl+C to stop the processes
echo "Press Ctrl+C to stop the API and client..."

# Wait for background processes to finish (if the user stops them)))))
wait $API_PID $CLIENT_PID

echo "API and client processes stopped."
