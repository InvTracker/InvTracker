@echo off
title InvenTrack - Localhost Web Server
echo =====================================================================
echo           InvenTrack - Campus Food & Inventory System
echo                   Starting Localhost Web Server...
echo =====================================================================
echo.

cd /d "%~dp0"

set PORT=3000
set URL=http://localhost:%PORT%/landing.html

:: Check if Python is installed
python --version >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo [OK] Found Python. Starting web server on http://localhost:%PORT% ...
    start "" "%URL%"
    python -m http.server %PORT%
    goto end
)

py --version >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo [OK] Found Python (py launcher). Starting web server on http://localhost:%PORT% ...
    start "" "%URL%"
    py -m http.server %PORT%
    goto end
)

:: Check if Node / npx is installed
npx --version >nul 2>&1
if %ERRORLEVEL% equ 0 (
    echo [OK] Found Node.js / npx. Starting web server on http://localhost:%PORT% ...
    start "" "%URL%"
    npx serve . -l %PORT%
    goto end
)

:: Fallback to Windows built-in PowerShell web server (No install required!)
echo [OK] Starting built-in Windows PowerShell HTTP Server on port %PORT% ...
start "" "%URL%"
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
    "$port = 3000; $listener = New-Object System.Net.HttpListener; $listener.Prefixes.Add('http://localhost:' + $port + '/'); $listener.Start(); Write-Host 'Server running at http://localhost:' $port '/'; while ($listener.IsListening) { $ctx = $listener.GetContext(); $req = $ctx.Request; $res = $ctx.Response; $path = '.' + $req.RawUrl.Split('?')[0]; if ($path -eq './' -or $path -eq '.') { $path = './landing.html' }; if (Test-Path $path -PathType Leaf) { $ext = [System.IO.Path]::GetExtension($path).ToLower(); $types = @{ '.html'='text/html'; '.css'='text/css'; '.js'='application/javascript'; '.png'='image/png'; '.jpg'='image/jpeg'; '.jpeg'='image/jpeg'; '.svg'='image/svg+xml'; '.json'='application/json'; '.mp3'='audio/mpeg'; '.wav'='audio/wav' }; $res.ContentType = if ($types.ContainsKey($ext)) { $types[$ext] } else { 'application/octet-stream' }; $bytes = [System.IO.File]::ReadAllBytes($path); $res.ContentLength64 = $bytes.Length; $res.OutputStream.Write($bytes, 0, $bytes.Length) } else { $res.StatusCode = 404 }; $res.OutputStream.Close() }"

:end
pause
