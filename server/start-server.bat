@echo off
echo ========================================
echo           WEBORY SERVER STARTUP
echo ========================================
echo.

echo Checking if Node.js is installed...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js found
echo.

echo Checking if dependencies are installed...
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install dependencies
        pause
        exit /b 1
    )
) else (
    echo ✅ Dependencies already installed
)

echo.
echo 🚀 Starting Webory Server...
echo.

echo Choose startup mode:
echo 1. Normal development mode
echo 2. Production mode
echo 3. With auto-restart monitoring
echo 4. Test server health
echo.

set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" (
    echo Starting in development mode...
    npm run dev
) else if "%choice%"=="2" (
    echo Starting in production mode...
    npm start
) else if "%choice%"=="3" (
    echo Starting with auto-restart monitoring...
    start "Server Monitor" cmd /k "npm run monitor"
    timeout /t 3 /nobreak >nul
    npm run dev
) else if "%choice%"=="4" (
    echo Testing server health...
    npm run monitor:health
    pause
) else (
    echo Invalid choice. Starting in development mode...
    npm run dev
)

pause 