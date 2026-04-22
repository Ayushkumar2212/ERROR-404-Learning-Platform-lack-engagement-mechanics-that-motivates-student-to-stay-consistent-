@echo off
echo Attempting to start LocalHost...
python -m http.server 8000
if %ERRORLEVEL% NEQ 0 (
    node server.js
)
if %ERRORLEVEL% NEQ 0 (
    echo Error: Neither Python nor Node.js found. 
    echo Please install Python from the Microsoft Store or Node.js from nodejs.org
    pause
)
