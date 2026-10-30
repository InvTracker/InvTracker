# ===================================================
# InvenTrack Campus Dining Platform - PowerShell Launcher
# ===================================================

$Host.UI.RawUI.WindowTitle = "InvenTrack Campus Dining Platform"
Clear-Host

Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "    InvenTrack Campus Dining & Inventory Platform" -ForegroundColor White
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ScriptDir

# Check Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] Node.js is not found in your system PATH." -ForegroundColor Red
    Write-Host "Please install Node.js from https://nodejs.org/"
    Write-Host ""
    Read-Host "Press Enter to exit"
    Exit 1
}

# Check if node_modules exists
if (-not (Test-Path "$ScriptDir\react\node_modules")) {
    Write-Host "[INFO] Installing dependencies in react/..." -ForegroundColor Yellow
    Set-Location "$ScriptDir\react"
    npm install
    Set-Location $ScriptDir
    Write-Host "[SUCCESS] Dependencies installed." -ForegroundColor Green
    Write-Host ""
}

Write-Host "[INFO] Starting dev server..." -ForegroundColor Green
Write-Host "       Landing Page:  http://localhost:5173/landing.html" -ForegroundColor DarkCyan
Write-Host "       Main App:      http://localhost:5173/" -ForegroundColor DarkCyan
Write-Host "       Sign In:       http://localhost:5173/signin.html" -ForegroundColor DarkCyan
Write-Host ""
Write-Host "Press Ctrl+C at any time to stop the server." -ForegroundColor Gray
Write-Host ""

# Launch browser asynchronously after 2 seconds
Start-Job -ScriptBlock {
    Start-Sleep -Seconds 2
    Start-Process "http://localhost:5173/landing.html"
} | Out-Null

Set-Location "$ScriptDir\react"
npm run dev
