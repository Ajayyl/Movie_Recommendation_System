@echo off
echo Starting UniVibe Backend Server...
cd /d "%~dp0"
start /b cmd /c "node backend/server.js"
echo Waiting for server to initialize...
timeout /t 3 /nobreak > nul
start http://localhost:3000
exit
