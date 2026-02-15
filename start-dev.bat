@echo off
echo ================================================
echo   Starting AI Knowledge Base Development
echo ================================================
echo.

echo Starting all services in separate windows...
echo.

REM Start Frontend
echo [1/3] Starting Frontend (http://localhost:3000)...
start "AI KB - Frontend" cmd /k "cd frontend && npm run dev"
timeout /t 2 /nobreak >nul

REM Start Backend
echo [2/3] Starting Backend (http://localhost:4000)...
start "AI KB - Backend" cmd /k "cd backend && npm run start:dev"
timeout /t 2 /nobreak >nul

REM Start LLM Service
echo [3/3] Starting LLM Service (http://localhost:8000)...
start "AI KB - LLM Service" cmd /k "cd llm-service && venv\Scripts\activate && python -m uvicorn main:app --reload"
timeout /t 2 /nobreak >nul

echo.
echo ================================================
echo   All Services Started!
echo ================================================
echo.
echo Services running:
echo - Frontend:    http://localhost:3000
echo - Backend:     http://localhost:4000
echo - LLM Service: http://localhost:8000
echo.
echo Close the terminal windows to stop the services.
echo.
pause
