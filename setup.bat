@echo off
echo ================================================
echo   AI Knowledge Base - Quick Setup Script
echo ================================================
echo.

echo [1/5] Checking Node.js and Python...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

where python >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed!
    echo Please install Python from https://www.python.org/
    pause
    exit /b 1
)

echo ✓ Node.js and Python are installed
echo.

echo [2/5] Installing Frontend Dependencies...
cd frontend
if not exist "node_modules" (
    call npm install
    if %errorlevel% neq 0 (
        echo ERROR: Frontend installation failed!
        pause
        exit /b 1
    )
) else (
    echo ✓ Frontend dependencies already installed
)
cd ..
echo.

echo [3/5] Installing Backend Dependencies...
cd backend
if not exist "node_modules" (
    call npm install
    if %errorlevel% neq 0 (
        echo ERROR: Backend installation failed!
        pause
        exit /b 1
    )
) else (
    echo ✓ Backend dependencies already installed
)

REM Create uploads directory
if not exist "uploads" (
    mkdir uploads
    echo ✓ Created uploads directory
)
cd ..
echo.

echo [4/5] Installing LLM Service Dependencies...
cd llm-service
if not exist "venv" (
    python -m venv venv
    call venv\Scripts\activate
    pip install -r requirements.txt
    if %errorlevel% neq 0 (
        echo ERROR: LLM Service installation failed!
        pause
        exit /b 1
    )
    deactivate
) else (
    echo ✓ LLM Service dependencies already installed
)
cd ..
echo.

echo [5/5] Checking Environment Files...
if not exist "frontend\.env" (
    echo ⚠ Warning: frontend/.env not found
    echo Please copy frontend/.env.example to frontend/.env and configure it
)

if not exist "backend\.env" (
    echo ⚠ Warning: backend/.env not found
    echo Please copy backend/.env.example to backend/.env and configure it
)

if not exist "llm-service\.env" (
    echo ⚠ Warning: llm-service/.env not found
    echo Please copy llm-service/.env.example to llm-service/.env and configure it
)
echo.

echo ================================================
echo   Setup Complete!
echo ================================================
echo.
echo Next Steps:
echo 1. Configure environment variables (.env files)
echo 2. Run start-dev.bat to start all services
echo.
echo For detailed instructions, see GETTING_STARTED.md
echo.
pause
