#!/bin/bash

# Script to setup and run the Ticket Manager API project

# Exit immediately if a command exits with a non-zero status.
set -e

# Function to print error messages
error() {
    echo "Error: $1" >&2
    exit 1
}

# Check if dotnet is installed
if ! command -v dotnet &> /dev/null; then
    error "dotnet is not installed. Please install .NET SDK and try again."
fi

# Navigate to the project directory
# Replace 'api' with the actual directory name if different
# cd api || error "Failed to change to the api directory"

# Restore dependencies
echo "Restoring dependencies..."
dotnet restore  || error "Failed to restore dependencies"

# Build the project
echo "Building the project..."
dotnet build api.csproj --configuration Release || error "Failed to build the project"

# Set environment variables
# You can modify these as needed
export ASPNETCORE_ENVIRONMENT="Development"
export ASPNETCORE_URLS="http://localhost:5000"

# Run database migrations
echo "Running database migrations..."
dotnet ef database update || error "Failed to run database migrations"

# Start the API
echo "Starting the API..."
dotnet run --configuration Release --no-build --urls "$ASPNETCORE_URLS" &

# Save the API process ID
API_PID=$!

# Function to kill the API process on script exit
cleanup() {
    echo "Stopping the API..."
    kill $API_PID
}

# Set the cleanup function to run on script exit
trap cleanup EXIT

echo "API is running on $ASPNETCORE_URLS"
echo "Press Ctrl+C to stop the API"

# Wait for the API process to finish (i.e., when user presses Ctrl+C)
wait $API_PID