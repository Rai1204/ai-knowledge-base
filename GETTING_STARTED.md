# 🚀 Quick Start Guide

## Local Development Setup

### 1. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd ai-knowledge-base

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install

# Install LLM service dependencies
cd ../llm-service
pip install -r requirements.txt
```

### 2. Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Get your connection string

### 3. Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy and save it securely

### 4. Configure Environment Variables

#### Frontend (.env)
Create `frontend/.env`:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

#### Backend (.env)
Create `backend/.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-knowledge-base
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
JWT_EXPIRATION=7d
LLM_SERVICE_URL=http://localhost:8000
PORT=4000
```

#### LLM Service (.env)
Create `llm-service/.env`:
```env
OPENAI_API_KEY=sk-your-openai-api-key-here
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-knowledge-base
PORT=8000
```

### 5. Start All Services

Open 3 separate terminal windows:

#### Terminal 1 - Frontend
```bash
cd frontend
npm run dev
```
Frontend will run on http://localhost:3000

#### Terminal 2 - Backend
```bash
cd backend
npm run start:dev
```
Backend will run on http://localhost:4000

#### Terminal 3 - LLM Service
```bash
cd llm-service
python -m uvicorn main:app --reload
```
LLM Service will run on http://localhost:8000

### 6. Create uploads Directory

```bash
cd backend
mkdir uploads
```

### 7. Test the Application

1. Open http://localhost:3000
2. Register a new account
3. Login
4. Upload a PDF document
5. Try the features:
   - View document
   - Generate summary
   - Semantic search
   - Chat with document

## 🎯 Quick Test

Use the test PDF included in the repository or create a simple text PDF to test the functionality.

### Sample Questions to Ask:
- "What is this document about?"
- "Summarize the main points"
- "What are the key topics discussed?"

## 📱 Features Overview

### ✅ Authentication
- Register with email and password
- Login with JWT token
- Protected routes

### ✅ Document Upload
- Upload PDF files (max 10MB)
- Automatic text extraction
- Intelligent chunking

### ✅ AI Summarization
- Generate comprehensive summaries
- Powered by GPT-3.5-turbo
- Map-reduce for long documents

### ✅ Semantic Search
- Search by meaning, not just keywords
- Powered by OpenAI embeddings
- Returns most relevant chunks

### ✅ RAG Chat
- Ask questions about your documents
- Context-aware responses
- Citations from source text

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000 (Frontend)
npx kill-port 3000

# Kill process on port 4000 (Backend)
npx kill-port 4000

# Kill process on port 8000 (LLM Service)
# On Windows
netstat -ano | findstr :8000
taskkill /PID <PID> /F

# On Mac/Linux
lsof -ti:8000 | xargs kill -9
```

### MongoDB Connection Error
- Verify your connection string
- Check if IP is whitelisted (0.0.0.0/0 for all)
- Ensure database user has correct permissions

### OpenAI API Error
- Verify API key is correct
- Check if you have credits
- Ensure no rate limits are exceeded

### CORS Error
- Ensure backend and frontend URLs are correct
- Check CORS configuration in backend

### Module Not Found
```bash
# Reinstall dependencies
npm install  # for Node.js projects
pip install -r requirements.txt  # for Python
```

## 📊 Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **State**: Zustand
- **API**: React Query
- **Forms**: React Hook Form + Zod

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Auth**: JWT with Passport
- **File Upload**: Multer
- **PDF Parse**: pdf-parse

### LLM Service
- **Framework**: FastAPI
- **Language**: Python 3.11
- **AI**: LangChain + OpenAI
- **Embeddings**: OpenAI Ada-002
- **Vector Search**: FAISS

## 🎓 Learn More

### Architecture
```
┌─────────────┐
│   Next.js   │  ← User Interface
│  (Frontend) │
└──────┬──────┘
       │
       │ REST API
       ↓
┌──────────────┐
│    NestJS    │  ← Business Logic
│   (Backend)  │     Authentication
└──────┬───────┘     Document Management
       │
       │ REST API
       ↓
┌───────────────┐
│    FastAPI    │  ← AI Processing
│ (LLM Service) │     Summarization
└───────┬───────┘     Semantic Search
        │             RAG Chat
        │
        ↓
  ┌──────────┐
  │  OpenAI  │  ← LLM & Embeddings
  └──────────┘

  ┌───────────────┐
  │ MongoDB Atlas │  ← Data Storage
  └───────────────┘
```

### Data Flow

1. **User uploads PDF** → Frontend → Backend
2. **Backend extracts text** → Chunks document → Stores in MongoDB
3. **User asks question** → Frontend → Backend → LLM Service
4. **LLM Service**:
   - Retrieves document chunks
   - Creates embeddings
   - Finds relevant chunks (RAG)
   - Sends to OpenAI
   - Returns answer
5. **Answer displayed** → Frontend

## 🚀 Next Steps

1. ✅ Get the app running locally
2. ✅ Upload a test document
3. ✅ Try all features
4. 📚 Read the [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
5. 🎨 Customize the UI to your needs
6. 🔧 Add additional features

## 💡 Feature Ideas to Add

- [ ] Support for more file types (DOCX, TXT)
- [ ] Multiple language support
- [ ] Export chat history
- [ ] Share documents with other users
- [ ] Document folders/organization
- [ ] Advanced search filters
- [ ] API rate limiting
- [ ] User profile settings
- [ ] Dark mode
- [ ] Mobile responsiveness improvements

## 📞 Support

If you encounter any issues:
1. Check the troubleshooting section
2. Review error logs in terminal
3. Verify all environment variables
4. Ensure all services are running

## 🎉 Success Checklist

- [ ] All dependencies installed
- [ ] MongoDB Atlas configured
- [ ] OpenAI API key obtained
- [ ] Environment variables set
- [ ] All three services running
- [ ] Uploads directory created
- [ ] Successfully registered account
- [ ] Uploaded a test PDF
- [ ] Generated a summary
- [ ] Performed semantic search
- [ ] Chatted with document

Congratulations! You now have a fully functional AI Knowledge Base! 🎊
