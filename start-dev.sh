#!/bin/bash

echo "================================================"
echo "  Starting AI Knowledge Base Development"
echo "================================================"
echo ""

echo "Starting all services..."
echo ""

# Create a new tmux session
SESSION_NAME="ai-kb"

# Check if tmux is installed
if ! command -v tmux &> /dev/null; then
    echo "tmux is not installed. Starting services in background..."
    echo ""
    
    echo "[1/3] Starting Frontend..."
    cd frontend && npm run dev &
    FRONTEND_PID=$!
    
    echo "[2/3] Starting Backend..."
    cd ../backend && npm run start:dev &
    BACKEND_PID=$!
    
    echo "[3/3] Starting LLM Service..."
    cd ../llm-service && source venv/bin/activate && python -m uvicorn main:app --reload &
    LLM_PID=$!
    
    echo ""
    echo "================================================"
    echo "  All Services Started!"
    echo "================================================"
    echo ""
    echo "Services running:"
    echo "- Frontend:    http://localhost:3000 (PID: $FRONTEND_PID)"
    echo "- Backend:     http://localhost:4000 (PID: $BACKEND_PID)"
    echo "- LLM Service: http://localhost:8000 (PID: $LLM_PID)"
    echo ""
    echo "To stop services, run:"
    echo "kill $FRONTEND_PID $BACKEND_PID $LLM_PID"
    echo ""
else
    # Use tmux
    tmux new-session -d -s $SESSION_NAME

    # Frontend window
    tmux rename-window -t $SESSION_NAME:0 'Frontend'
    tmux send-keys -t $SESSION_NAME:0 'cd frontend && npm run dev' C-m

    # Backend window
    tmux new-window -t $SESSION_NAME:1 -n 'Backend'
    tmux send-keys -t $SESSION_NAME:1 'cd backend && npm run start:dev' C-m

    # LLM Service window
    tmux new-window -t $SESSION_NAME:2 -n 'LLM-Service'
    tmux send-keys -t $SESSION_NAME:2 'cd llm-service && source venv/bin/activate && python -m uvicorn main:app --reload' C-m

    echo ""
    echo "================================================"
    echo "  All Services Started in tmux!"
    echo "================================================"
    echo ""
    echo "Services running:"
    echo "- Frontend:    http://localhost:3000"
    echo "- Backend:     http://localhost:4000"
    echo "- LLM Service: http://localhost:8000"
    echo ""
    echo "To attach to tmux session: tmux attach -t $SESSION_NAME"
    echo "To detach: Ctrl+B, then D"
    echo "To stop all: tmux kill-session -t $SESSION_NAME"
    echo ""
    
    # Attach to the session
    tmux attach -t $SESSION_NAME
fi
