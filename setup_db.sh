#!/bin/bash

# Prompt the user for MySQL credentials
read -p "Enter MySQL username: " username
read -sp "Enter MySQL password: " password
echo

# MySQL connection parameters
host="localhost"
database="my_shop"  # Change this to the desired schema name

# Attempt to connect to MySQL and create the schema
mysql -h "$host" -u "$username" -p"$password" -e "CREATE DATABASE IF NOT EXISTS $database;"

# Check the exit code to see if the schema creation was successful
if [ $? -eq 0 ]; then
    echo "Schema '$database' created successfully"
else
    echo "Failed to create schema '$database'"
fi

# Keep the command-line window open until the user presses Enter
read -p "Press Enter to exit..."