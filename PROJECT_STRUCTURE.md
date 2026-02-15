# Project Structure

```
ai-knowledge-base/
│
├── frontend/                      # Next.js Frontend
│   ├── src/
│   │   ├── app/                  # Next.js App Router
│   │   │   ├── dashboard/        # Dashboard pages
│   │   │   │   ├── documents/    # Document detail pages
│   │   │   │   │   └── [id]/     # Dynamic document page
│   │   │   │   ├── layout.tsx    # Dashboard layout
│   │   │   │   └── page.tsx      # Dashboard home
│   │   │   ├── login/            # Login page
│   │   │   ├── register/         # Register page
│   │   │   ├── globals.css       # Global styles
│   │   │   ├── layout.tsx        # Root layout
│   │   │   └── page.tsx          # Home page
│   │   │
│   │   ├── components/           # React components
│   │   │   ├── auth/             # Authentication components
│   │   │   │   ├── login-form.tsx
│   │   │   │   └── register-form.tsx
│   │   │   ├── chat/             # Chat components
│   │   │   │   └── chat-with-document.tsx
│   │   │   ├── documents/        # Document components
│   │   │   │   ├── documents-list.tsx
│   │   │   │   ├── document-viewer.tsx
│   │   │   │   ├── document-summary.tsx
│   │   │   │   └── upload-document.tsx
│   │   │   ├── layout/           # Layout components
│   │   │   │   └── dashboard-layout.tsx
│   │   │   ├── search/           # Search components
│   │   │   │   └── semantic-search.tsx
│   │   │   └── providers.tsx     # React Query provider
│   │   │
│   │   ├── lib/                  # Utility libraries
│   │   │   └── api/              # API client functions
│   │   │       ├── client.ts     # Axios configuration
│   │   │       ├── auth.ts       # Auth API calls
│   │   │       ├── documents.ts  # Documents API calls
│   │   │       └── llm.ts        # LLM API calls
│   │   │
│   │   └── store/                # State management
│   │       └── auth-store.ts     # Zustand auth store
│   │
│   ├── public/                   # Static assets
│   ├── .env.example              # Environment variables template
│   ├── next.config.js            # Next.js configuration
│   ├── package.json
│   ├── tailwind.config.ts        # Tailwind configuration
│   ├── tsconfig.json
│   ├── postcss.config.js
│   ├── Dockerfile                # Docker configuration
│   └── vercel.json               # Vercel deployment config
│
├── backend/                       # NestJS Backend
│   ├── src/
│   │   ├── auth/                 # Authentication module
│   │   │   ├── dto/              # Data Transfer Objects
│   │   │   │   ├── login.dto.ts
│   │   │   │   └── register.dto.ts
│   │   │   ├── guards/           # Auth guards
│   │   │   │   ├── jwt-auth.guard.ts
│   │   │   │   └── local-auth.guard.ts
│   │   │   ├── schemas/          # MongoDB schemas
│   │   │   │   └── user.schema.ts
│   │   │   ├── strategies/       # Passport strategies
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   └── local.strategy.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   └── auth.module.ts
│   │   │
│   │   ├── documents/            # Documents module
│   │   │   ├── schemas/
│   │   │   │   └── document.schema.ts
│   │   │   ├── documents.controller.ts
│   │   │   ├── documents.service.ts
│   │   │   └── documents.module.ts
│   │   │
│   │   ├── llm/                  # LLM integration module
│   │   │   ├── dto/
│   │   │   │   ├── chat.dto.ts
│   │   │   │   ├── search.dto.ts
│   │   │   │   └── summarize.dto.ts
│   │   │   ├── llm.controller.ts
│   │   │   ├── llm.service.ts
│   │   │   └── llm.module.ts
│   │   │
│   │   ├── app.module.ts         # Root module
│   │   └── main.ts               # Application entry point
│   │
│   ├── uploads/                  # Uploaded files directory
│   ├── .env.example
│   ├── nest-cli.json
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
│
├── llm-service/                   # Python FastAPI LLM Service
│   ├── services/                 # AI service modules
│   │   ├── __init__.py
│   │   ├── summarizer.py        # Summarization logic
│   │   ├── search.py            # Semantic search logic
│   │   └── chat.py              # RAG chat logic
│   │
│   ├── main.py                  # FastAPI application
│   ├── requirements.txt         # Python dependencies
│   ├── .env.example
│   ├── .gitignore
│   └── Dockerfile
│
├── .gitignore                   # Global gitignore
├── docker-compose.yml           # Docker Compose configuration
├── README.md                    # Main README
├── GETTING_STARTED.md          # Setup guide
├── DEPLOYMENT.md               # Deployment guide
└── API_DOCUMENTATION.md        # API reference

```

## Module Descriptions

### Frontend (Next.js + TypeScript)

#### `/app`
Next.js 14 App Router structure with:
- **Authentication pages**: Login and registration
- **Dashboard**: Main application interface
- **Document pages**: View and interact with documents

#### `/components`
Reusable React components organized by feature:
- **auth**: Login/Register forms
- **documents**: Document management UI
- **chat**: RAG chat interface
- **search**: Semantic search interface
- **layout**: Page layouts

#### `/lib/api`
API client layer with Axios:
- Centralized API calls
- Request/response interceptors
- Error handling

#### `/store`
Zustand state management:
- Authentication state
- User session management

### Backend (NestJS + TypeScript)

#### `/auth`
Complete authentication system:
- JWT token generation
- Local and JWT strategies
- User registration and login
- Password hashing with bcrypt

#### `/documents`
Document management:
- PDF upload and parsing
- Text chunking
- MongoDB storage
- Access control

#### `/llm`
LLM service integration:
- Proxy to Python FastAPI service
- Request/response handling
- Error management

### LLM Service (FastAPI + Python)

#### `/services`
AI functionality modules:
- **summarizer.py**: Document summarization using LangChain
- **search.py**: Semantic search with embeddings
- **chat.py**: RAG-based chat implementation

#### Core Features
- OpenAI API integration
- Vector embeddings
- FAISS vector store
- LangChain orchestration

## Key Technologies

### Frontend Stack
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe JavaScript
- **TailwindCSS**: Utility-first CSS
- **Zustand**: Lightweight state management
- **React Query**: Server state management
- **React Hook Form**: Form handling
- **Zod**: Schema validation
- **Axios**: HTTP client

### Backend Stack
- **NestJS**: Progressive Node.js framework
- **TypeScript**: Type-safe development
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB ODM
- **JWT**: Authentication tokens
- **Passport**: Auth middleware
- **Multer**: File upload handling
- **pdf-parse**: PDF text extraction

### LLM Service Stack
- **FastAPI**: Modern Python web framework
- **LangChain**: LLM application framework
- **OpenAI**: GPT models and embeddings
- **FAISS**: Vector similarity search
- **Pydantic**: Data validation
- **NumPy**: Numerical computing
- **scikit-learn**: Machine learning utilities

## Data Flow

### Upload Flow
```
User → Frontend → Backend → PDF Parse → Chunking → MongoDB
```

### Summarization Flow
```
User → Frontend → Backend → LLM Service → OpenAI → Response
```

### Search Flow
```
User → Frontend → Backend → LLM Service → 
  → Create Embeddings → 
  → Calculate Similarity → 
  → Return Results
```

### Chat Flow (RAG)
```
User Question → Frontend → Backend → LLM Service →
  → Retrieve Relevant Chunks (Vector Search) →
  → Construct Prompt with Context →
  → Send to OpenAI →
  → Return AI-Generated Answer
```

## Environment Configuration

### Development
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:4000`
- LLM Service: `http://localhost:8000`

### Production
- Frontend: Vercel
- Backend: Render/Railway
- LLM Service: Render/Railway
- Database: MongoDB Atlas

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Route guards and middleware
- CORS configuration
- File type validation
- File size limits
- Environment variable protection

## Scalability Considerations

- Stateless architecture
- Microservices pattern
- Horizontal scaling ready
- Database indexing
- Caching opportunities
- CDN for static assets
