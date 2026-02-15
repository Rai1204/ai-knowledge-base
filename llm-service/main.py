from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv

from services.summarizer import SummarizerService
from services.search import SemanticSearchService
from services.chat import ChatService

# Load environment variables
load_dotenv()

app = FastAPI(title="AI Knowledge Base LLM Service")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize services
summarizer_service = SummarizerService()
search_service = SemanticSearchService()
chat_service = ChatService()


# Request/Response Models
class SummarizeRequest(BaseModel):
    chunks: List[str]


class SearchRequest(BaseModel):
    query: str
    chunks: List[str]


class ChatRequest(BaseModel):
    question: str
    chunks: List[str]


class SummarizeResponse(BaseModel):
    summary: str


class SearchResult(BaseModel):
    text: str
    score: float


class SearchResponse(BaseModel):
    results: List[SearchResult]


class ChatResponse(BaseModel):
    answer: str
    sources: Optional[List[str]] = None


@app.get("/")
async def root():
    return {"message": "AI Knowledge Base LLM Service", "status": "running"}


@app.get("/health")
async def health():
    return {"status": "healthy"}


@app.post("/summarize", response_model=SummarizeResponse)
async def summarize(request: SummarizeRequest):
    """Generate a summary of the document chunks"""
    try:
        summary = summarizer_service.summarize(request.chunks)
        return SummarizeResponse(summary=summary)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/semantic-search", response_model=SearchResponse)
async def semantic_search(request: SearchRequest):
    """Perform semantic search on document chunks"""
    try:
        results = search_service.search(request.query, request.chunks)
        return SearchResponse(results=results)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Chat with the document using RAG"""
    try:
        answer, sources = chat_service.chat(request.question, request.chunks)
        return ChatResponse(answer=answer, sources=sources)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
