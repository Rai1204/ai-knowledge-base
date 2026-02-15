#!/bin/bash

echo "================================================"
echo "  AI Knowledge Base - Quick Setup Script"
echo "================================================"
echo ""

echo "[1/5] Checking Node.js and Python..."
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

if ! command -v python3 &> /dev/null; then
    echo "ERROR: Python is not installed!"
    echo "Please install Python from https://www.python.org/"
    exit 1
fi

echo "✓ Node.js and Python are installed"
echo ""

echo "[2/5] Installing Frontend Dependencies..."
cd frontend
if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -ne 0 ]; then
        echo "ERROR: Frontend installation failed!"
        exit 1
    fi
else
    echo "✓ Frontend dependencies already installed"
fi
cd ..
echo ""

echo "[3/5] Installing Backend Dependencies..."
cd backend
if [ ! -d "node_modules" ]; then
    npm install
    if [ $? -ne 0 ]; then
        echo "ERROR: Backend installation failed!"
        exit 1
    fi
else
    echo "✓ Backend dependencies already installed"
fi

# Create uploads directory
if [ ! -d "uploads" ]; then
    mkdir uploads
    echo "✓ Created uploads directory"
fi
cd ..
echo ""

echo "[4/5] Installing LLM Service Dependencies..."
cd llm-service
if [ ! -d "venv" ]; then
    python3 -m venv venv
    source venv/bin/activate
    pip install -r requirements.txt
    if [ $? -ne 0 ]; then
        echo "ERROR: LLM Service installation failed!"
        exit 1
    fi
    deactivate
else
    echo "✓ LLM Service dependencies already installed"
fi
cd ..
echo ""

echo "[5/5] Checking Environment Files..."
if [ ! -f "frontend/.env" ]; then
    echo "⚠ Warning: frontend/.env not found"
    echo "Please copy frontend/.env.example to frontend/.env and configure it"
fi

if [ ! -f "backend/.env" ]; then
    echo "⚠ Warning: backend/.env not found"
    echo "Please copy backend/.env.example to backend/.env and configure it"
fi

if [ ! -f "llm-service/.env" ]; then
    echo "⚠ Warning: llm-service/.env not found"
    echo "Please copy llm-service/.env.example to llm-service/.env and configure it"
fi
echo ""

echo "================================================"
echo "  Setup Complete!"
echo "================================================"
echo ""
echo "Next Steps:"
echo "1. Configure environment variables (.env files)"
echo "2. Run ./start-dev.sh to start all services"
echo ""
echo "For detailed instructions, see GETTING_STARTED.md"
echo ""
