@echo off
setlocal enabledelayedexpansion

REM Prompt the user for MySQL credentials
set /p "username=Enter MySQL username: "
set /p "password=Enter MySQL password: "
echo.

REM MySQL connection parameters
set "host=localhost"
set "database=my_shop"  REM Change this to the desired schema name

REM Attempt to connect to MySQL and create the schema
mysql -h "%host%" -u "%username%" -p"%password%" -e "CREATE DATABASE IF NOT EXISTS %database%;"

REM Check the exit code to see if the schema creation was successful
if !errorlevel! equ 0 (
    echo Schema '%database%' created successfully
) else (
    echo Failed to create schema '%database%'
)

REM Pause to keep the command-line window open until the user presses Enter
pause
