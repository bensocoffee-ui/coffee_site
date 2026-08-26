@echo off
rem ---- Publish: rebuild site and push updates to GitHub -> Vercel ----
cd /d "%~dp0"
set "PATH=%LOCALAPPDATA%\nodejs-portable\node-v22.23.2-win-x64;%PATH%"

set "TOKENFILE=admin-data\github-token.txt"
if not exist "%TOKENFILE%" (
    echo [!] Token file not found: %TOKENFILE%
    echo     Paste your GitHub token ^(ghp_...^) into that file and save, then re-run.
    pause
    exit /b 1
)

set /p GHTOKEN=<"%TOKENFILE%"

echo [%time%] Updating TRY rate from tgju...
call node scripts\update-rate.js

echo [%time%] Building...
call npm run build
if errorlevel 1 (
    echo Build failed!
    pause
    exit /b 1
)

echo [%time%] Pushing to GitHub...
call node scripts\github-upload.js hamidrezafazelt-spec %GHTOKEN% kafe-nespresso true
if errorlevel 1 (
    echo Upload failed!
    pause
    exit /b 1
)

echo [%time%] Restarting local server...
taskkill /f /im node.exe >nul 2>&1
timeout /t 2 /nobreak >nul
start "coffee-server" /min cmd /c "npm run start > nul 2>&1"

echo.
echo DONE! Vercel will auto-deploy in ~1-2 minutes.
pause
