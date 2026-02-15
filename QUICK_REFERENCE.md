# Quick Reference Card

## 🚀 Common Commands

### Setup & Installation

```bash
# Windows
setup.bat

# Mac/Linux
chmod +x setup.sh
./setup.sh
```

### Start Development

```bash
# Windows
start-dev.bat

# Mac/Linux
./start-dev.sh
```

### Individual Services

#### Frontend
```bash
cd frontend
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # Lint code
```

#### Backend
```bash
cd backend
npm run start:dev    # Development with watch
npm run start:debug  # Debug mode
npm run build        # Build
npm run start:prod   # Production server
```

#### LLM Service
```bash
cd llm-service
python -m uvicorn main:app --reload     # Development
python -m uvicorn main:app              # Production
```

## 📋 Environment Variables

### Frontend (.env)
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your-secret-key
JWT_EXPIRATION=7d
LLM_SERVICE_URL=http://localhost:8000
PORT=4000
```

### LLM Service (.env)
```env
OPENAI_API_KEY=sk-...
PORT=8000
```

## 🔧 Troubleshooting

### Kill Ports

```bash
# Frontend
npx kill-port 3000

# Backend
npx kill-port 4000

# LLM Service (Windows)
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# LLM Service (Mac/Linux)
lsof -ti:8000 | xargs kill -9
```

### Reinstall Dependencies

```bash
# Node.js
rm -rf node_modules package-lock.json
npm install

# Python
rm -rf venv
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### Reset Database

1. Go to MongoDB Atlas
2. Delete all documents in collections
3. Keep collections structure

## 🌐 Default URLs

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:4000
- **LLM Service**: http://localhost:8000

## 📁 Key Files

### Frontend
- `src/app/` - Pages
- `src/components/` - React components
- `src/lib/api/` - API clients
- `src/store/` - State management

### Backend
- `src/auth/` - Authentication
- `src/documents/` - Document management
- `src/llm/` - LLM integration

### LLM Service
- `services/summarizer.py` - Summarization
- `services/search.py` - Semantic search
- `services/chat.py` - RAG chat

## 🔐 MongoDB Atlas Quick Setup

1. Create cluster: [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create database user
3. Whitelist IP: 0.0.0.0/0
4. Get connection string
5. Update `.env` files

## 🤖 OpenAI API Key

1. Sign up: [platform.openai.com](https://platform.openai.com/)
2. Go to API Keys section
3. Create new key
4. Update `.env` files

## 🚀 Deployment Commands

### Vercel (Frontend)
```bash
cd frontend
vercel
```

### Docker
```bash
docker-compose up -d
docker-compose down
docker-compose logs -f
```

## 📝 Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature

# Commit changes
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/your-feature

# Update from main
git pull origin main
```

## 🧪 Testing

```bash
# Frontend
cd frontend
npm test

# Backend
cd backend
npm test

# LLM Service
cd llm-service
pytest
```

## 📊 Useful Links

- **Next.js Docs**: https://nextjs.org/docs
- **NestJS Docs**: https://docs.nestjs.com/
- **FastAPI Docs**: https://fastapi.tiangolo.com/
- **LangChain Docs**: https://python.langchain.com/
- **OpenAI Docs**: https://platform.openai.com/docs/

## 💡 Tips

- Use `npm run dev` for hot reload
- Check browser console for errors
- Use Postman/Insomnia for API testing
- Monitor OpenAI API usage
- Keep dependencies updated

## 🆘 Need Help?

1. Check `GETTING_STARTED.md`
2. Review `DEPLOYMENT.md`
3. See `API_DOCUMENTATION.md`
4. Open an issue on GitHub

---

**Print this page for quick reference!**
