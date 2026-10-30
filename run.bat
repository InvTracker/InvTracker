@echo off
setlocal
title InvenTrack Campus Dining Platform - Launcher
cls

echo ===================================================
echo     InvenTrack Campus Dining & Inventory Platform
echo ===================================================
echo.

:: Check Node.js installation
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not found in your system PATH.
    echo Please install Node.js from https://nodejs.org/ to run this app.
    echo.
    pause
    exit /b 1
)

:: Ensure execution from the root directory
cd /d "%~dp0"

:: Check if dependencies are installed, install if missing
if not exist "react\node_modules\" (
    echo [INFO] First-time setup detected. Installing dependencies...
    cd react
    call npm install
    cd ..
    echo [SUCCESS] Dependencies installed successfully.
    echo.
)

echo [INFO] Starting InvenTrack dev server...
echo [INFO] Application will open automatically in your browser:
echo        - Landing Page:  http://localhost:5173/landing.html
echo        - Main App:      http://localhost:5173/
echo        - Sign In:       http://localhost:5173/signin.html
echo.
echo Press Ctrl+C in this window at any time to stop the server.
echo ===================================================
echo.

:: Automatically open default browser after a brief delay
start "" cmd /c "timeout /t 2 /nobreak >nul && start http://localhost:5173/landing.html"

:: Start the Vite development server
cd react
call npm run dev

if %errorlevel% neq 0 (
    echo.
    echo [NOTICE] Server has stopped.
    pause
)
