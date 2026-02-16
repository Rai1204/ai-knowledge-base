---
title: AI Knowledge Base LLM Service
emoji: 🤖
colorFrom: blue
colorTo: purple
sdk: docker
pinned: false
app_port: 8000
---

# AI Knowledge Base LLM Service

FastAPI service for LLM operations including:
- Document summarization using Groq API
- RAG-based chat with document context
- Semantic search using HuggingFace embeddings

## Environment Variables

Required:
- `GROQ_API_KEY`: Your Groq API key
- `MONGODB_URI`: MongoDB connection string
- `PORT`: Server port (default: 8000)
