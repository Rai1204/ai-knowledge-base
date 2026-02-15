# 🤖 AI Knowledge Base SaaS (RAG Application)

<div align="center">

![AI Knowledge Base](https://img.shields.io/badge/AI-Knowledge%20Base-blue?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white)

**A production-ready, full-stack AI-powered knowledge base that allows users to upload documents, perform semantic search, get AI summaries, and chat with their documents using RAG (Retrieval Augmented Generation).**

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Deployment](#-deployment) • [Contributing](#-contributing)

</div>

---

## 🎯 Overview

Transform your documents into an intelligent, queryable knowledge base powered by state-of-the-art AI. Upload PDFs, ask questions, and get accurate answers backed by your own content.

### 🏗 Architecture

```
┌─────────────────┐
│   Next.js 14    │  ← Modern React Framework
│   (Frontend)    │     TypeScript, TailwindCSS
└────────┬────────┘
         │ REST API
         ↓
┌─────────────────┐
│     NestJS      │  ← Enterprise-grade Backend
│    (Backend)    │     JWT Auth, Mongoose
└────────┬────────┘
         │ REST API
         ↓
┌─────────────────┐
│   FastAPI       │  ← AI Processing Layer
│  (LLM Service)  │     LangChain, OpenAI
└────────┬────────┘
         │
    ┌────┴────┐
    ↓         ↓
┌─────────┐ ┌────────────────┐
│ OpenAI  │ │ MongoDB Atlas  │
│   API   │ │  (Database)    │
└─────────┘ └────────────────┘
```

## ✨ Features

### 🔐 Authentication & Security
- **JWT-based authentication** with secure token management
- **Password hashing** using bcrypt
- **Route protection** and authorization
- **Secure file uploads** with validation

### 📄 Document Management
- **PDF upload** with drag-and-drop interface
- **Automatic text extraction** from PDFs
- **Intelligent chunking** for optimal processing
- **Document history** and management

### 🤖 AI-Powered Features
- **AI Summarization**: Generate comprehensive summaries of entire documents
- **Semantic Search**: Find content by meaning, not just keywords
- **RAG Chat**: Ask questions and get answers backed by your documents
- **Context-Aware Responses**: AI understands your document's context

### 🎨 User Experience
- **Modern, responsive UI** with TailwindCSS
- **Real-time updates** and loading states
- **Intuitive dashboard** for document management
- **Beautiful chat interface** for document interactions

## 📦 Tech Stack

<table>
<tr>
<td><b>Frontend</b></td>
<td>Next.js 14 (App Router) • TypeScript • TailwindCSS • Zustand • React Query • React Hook Form</td>
</tr>
<tr>
<td><b>Backend</b></td>
<td>NestJS • TypeScript • MongoDB • Mongoose • JWT • Passport • Multer</td>
</tr>
<tr>
<td><b>LLM Service</b></td>
<td>FastAPI • Python 3.11 • LangChain • OpenAI • FAISS • NumPy</td>
</tr>
<tr>
<td><b>Database</b></td>
<td>MongoDB Atlas (NoSQL with optional Vector Search)</td>
</tr>
<tr>
<td><b>AI/ML</b></td>
<td>OpenAI GPT-3.5-turbo • Ada-002 Embeddings • LangChain • Vector Similarity Search</td>
</tr>
<tr>
<td><b>Deployment</b></td>
<td>Vercel (Frontend) • Render/Railway (Backend & LLM) • Docker Support</td>
</tr>
</table>

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **Python** 3.10+ ([Download](https://www.python.org/))
- **MongoDB Atlas** account ([Sign up](https://www.mongodb.com/cloud/atlas/register))
- **OpenAI API** key ([Get key](https://platform.openai.com/api-keys))

### Automated Setup (Recommended)

#### Windows
```bash
# Run the setup script
setup.bat

# Configure environment variables, then start:
start-dev.bat
```

#### Mac/Linux
```bash
# Make scripts executable
chmod +x setup.sh start-dev.sh

# Run the setup script
./setup.sh

# Configure environment variables, then start:
./start-dev.sh
```

### Manual Setup

<details>
<summary>Click to expand manual setup instructions</summary>

#### 1. Clone the repository
```bash
git clone <your-repo-url>
cd ai-knowledge-base
```

#### 2. Install dependencies

**Frontend:**
```bash
cd frontend
npm install
```

**Backend:**
```bash
cd backend
npm install
mkdir uploads  # Create uploads directory
```

**LLM Service:**
```bash
cd llm-service
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### 3. Configure environment variables

Create `.env` files in each directory (see `.env.example` for templates):

**frontend/.env:**
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

**backend/.env:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-knowledge-base
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRATION=7d
LLM_SERVICE_URL=http://localhost:8000
PORT=4000
```

**llm-service/.env:**
```env
OPENAI_API_KEY=sk-your-openai-api-key-here
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-knowledge-base
PORT=8000
```

#### 4. Start all services

Open 3 terminal windows:

**Terminal 1 - Frontend:**
```bash
cd frontend
npm run dev
```
Runs on http://localhost:3000

**Terminal 2 - Backend:**
```bash
cd backend
npm run start:dev
```
Runs on http://localhost:4000

**Terminal 3 - LLM Service:**
```bash
cd llm-service
source venv/bin/activate  # On Windows: venv\Scripts\activate
python -m uvicorn main:app --reload
```
Runs on http://localhost:8000

</details>

### 🎉 You're Ready!

Visit http://localhost:3000 and:
1. **Register** a new account
2. **Upload** a PDF document
3. **Chat** with your document
4. **Search** semantically
5. **Generate** summaries

## 📚 Documentation

- **[Getting Started Guide](GETTING_STARTED.md)** - Detailed setup instructions
- **[Deployment Guide](DEPLOYMENT.md)** - Production deployment to Vercel/Render
- **[API Documentation](API_DOCUMENTATION.md)** - Complete API reference
- **[Project Structure](PROJECT_STRUCTURE.md)** - Codebase organization
- **[MongoDB Vector Search](MONGODB_VECTOR_SEARCH.md)** - Advanced vector search setup

## 🌐 Deployment

### Deploy to Production

#### Frontend (Vercel)
```bash
cd frontend
npm install -g vercel
vercel
```

#### Backend & LLM Service (Render/Railway)
1. Connect your GitHub repository
2. Configure environment variables
3. Deploy with one click

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete instructions.

### Docker Deployment

```bash
docker-compose up -d
```

## 🎯 Use Cases

- **Research Documentation**: Upload research papers and ask questions
- **Legal Documents**: Analyze contracts and legal documents
- **Technical Manuals**: Search through technical documentation
- **Educational Content**: Create interactive study materials
- **Knowledge Management**: Build a corporate knowledge base
- **Content Analysis**: Summarize and analyze long-form content

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- Environment variable protection
- File type and size validation
- CORS configuration
- SQL injection prevention (NoSQL)

## 📊 Performance

- Optimized chunking strategy
- Efficient vector similarity search
- Caching strategies
- Lazy loading and code splitting
- Production-ready build optimization

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Troubleshooting

Common issues and solutions:

**Port already in use:**
```bash
npx kill-port 3000  # Frontend
npx kill-port 4000  # Backend
```

**MongoDB connection error:**
- Verify connection string
- Check IP whitelist (use 0.0.0.0/0 for all IPs)
- Ensure database user has correct permissions

**OpenAI API errors:**
- Verify API key is valid
- Check API credits and rate limits

See [GETTING_STARTED.md](GETTING_STARTED.md) for more troubleshooting tips.

## 💰 Cost Estimation

### Development (Free Tier)
- MongoDB Atlas: Free (512MB)
- Vercel: Free
- Render: Free (750 hours/month)
- OpenAI API: ~$5-10/month

### Production (Low Traffic)
- Total: ~$20-30/month + OpenAI usage

## 🗺 Roadmap

- [ ] Support for more file types (DOCX, TXT, Markdown)
- [ ] Multi-language support
- [ ] Document folders and organization
- [ ] Share documents with other users
- [ ] Export chat history
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Self-hosted LLM options (Llama 2, Mistral)

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for GPT and embedding models
- **LangChain** for RAG framework
- **Vercel** for Next.js and hosting
- **MongoDB** for Atlas database
- **NestJS** team for the amazing framework

## 📞 Support

- **Documentation**: Check our comprehensive docs
- **Issues**: [GitHub Issues](https://github.com/your-username/ai-knowledge-base/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-username/ai-knowledge-base/discussions)

## ⭐ Star History

If you find this project helpful, please consider giving it a star!

---

<div align="center">

**Built with ❤️ by developers, for developers**

[⬆ Back to top](#-ai-knowledge-base-saas-rag-application)

</div>
