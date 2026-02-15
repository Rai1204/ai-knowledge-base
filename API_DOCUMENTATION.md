# API Documentation

## Base URLs

- **Backend API**: `http://localhost:4000` (development) / `https://your-backend.onrender.com` (production)
- **LLM Service**: `http://localhost:8000` (development) / `https://your-llm-service.onrender.com` (production)

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

---

## Backend API Endpoints

### Authentication

#### POST `/auth/register`
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "65abc123...",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

#### POST `/auth/login`
Login with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65abc123...",
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

#### GET `/auth/me`
Get current user profile (requires authentication).

**Response:**
```json
{
  "userId": "65abc123...",
  "email": "john@example.com"
}
```

---

### Documents

#### GET `/documents`
Get all documents for the authenticated user.

**Response:**
```json
[
  {
    "_id": "65def456...",
    "filename": "document.pdf",
    "filepath": "uploads/123456-document.pdf",
    "userId": "65abc123...",
    "uploadedAt": "2024-01-15T10:30:00.000Z",
    "chunks": [
      {
        "text": "Sample text chunk...",
        "embedding": []
      }
    ]
  }
]
```

#### GET `/documents/:id`
Get a specific document by ID.

**Response:**
```json
{
  "_id": "65def456...",
  "filename": "document.pdf",
  "filepath": "uploads/123456-document.pdf",
  "userId": "65abc123...",
  "uploadedAt": "2024-01-15T10:30:00.000Z",
  "chunks": [
    {
      "text": "Sample text chunk...",
      "embedding": []
    }
  ]
}
```

#### POST `/documents/upload`
Upload a new PDF document.

**Request:** multipart/form-data
- `file`: PDF file (max 10MB)

**Response:**
```json
{
  "message": "Document uploaded successfully",
  "document": {
    "id": "65def456...",
    "filename": "document.pdf",
    "uploadedAt": "2024-01-15T10:30:00.000Z",
    "chunksCount": 15
  }
}
```

#### DELETE `/documents/:id`
Delete a document.

**Response:**
```json
{
  "message": "Document deleted successfully"
}
```

---

### LLM Operations

#### POST `/llm/summarize`
Generate a summary of a document.

**Request Body:**
```json
{
  "documentId": "65def456..."
}
```

**Response:**
```json
{
  "summary": "This document discusses the main topics of artificial intelligence, machine learning, and their applications in modern technology..."
}
```

#### POST `/llm/search`
Perform semantic search on a document.

**Request Body:**
```json
{
  "documentId": "65def456...",
  "query": "machine learning algorithms"
}
```

**Response:**
```json
{
  "results": [
    {
      "text": "Machine learning algorithms are categorized into supervised, unsupervised, and reinforcement learning...",
      "score": 0.89
    },
    {
      "text": "Common algorithms include neural networks, decision trees, and support vector machines...",
      "score": 0.76
    }
  ]
}
```

#### POST `/llm/chat`
Chat with a document using RAG.

**Request Body:**
```json
{
  "documentId": "65def456...",
  "question": "What are the main applications of AI?"
}
```

**Response:**
```json
{
  "answer": "Based on the document, the main applications of AI include natural language processing, computer vision, robotics, and decision support systems...",
  "sources": [
    "Applications of artificial intelligence span across various domains including healthcare, finance, and transportation...",
    "AI technologies are being used to automate complex tasks and improve decision-making processes..."
  ]
}
```

---

## LLM Service Endpoints

### Health Check

#### GET `/`
Service status check.

**Response:**
```json
{
  "message": "AI Knowledge Base LLM Service",
  "status": "running"
}
```

#### GET `/health`
Health check endpoint.

**Response:**
```json
{
  "status": "healthy"
}
```

---

### AI Operations

#### POST `/summarize`
Generate summary from text chunks.

**Request Body:**
```json
{
  "chunks": [
    "First paragraph of text...",
    "Second paragraph of text...",
    "Third paragraph of text..."
  ]
}
```

**Response:**
```json
{
  "summary": "The document discusses multiple topics including..."
}
```

#### POST `/semantic-search`
Search for similar content using embeddings.

**Request Body:**
```json
{
  "query": "artificial intelligence applications",
  "chunks": [
    "AI is used in healthcare for diagnosis...",
    "Machine learning models predict outcomes...",
    "Financial systems use AI for fraud detection..."
  ]
}
```

**Response:**
```json
{
  "results": [
    {
      "text": "AI is used in healthcare for diagnosis...",
      "score": 0.92
    },
    {
      "text": "Financial systems use AI for fraud detection...",
      "score": 0.78
    }
  ]
}
```

#### POST `/chat`
RAG-based chat with document context.

**Request Body:**
```json
{
  "question": "How is AI used in healthcare?",
  "chunks": [
    "AI is used in healthcare for diagnosis...",
    "Medical imaging benefits from AI algorithms...",
    "Patient data analysis uses machine learning..."
  ]
}
```

**Response:**
```json
{
  "answer": "AI is extensively used in healthcare for various applications including diagnosis, medical imaging analysis, and patient data processing...",
  "sources": [
    "AI is used in healthcare for diagnosis...",
    "Medical imaging benefits from AI algorithms..."
  ]
}
```

---

## Error Responses

All endpoints may return error responses in the following format:

### 400 Bad Request
```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "error": "Bad Request"
}
```

### 401 Unauthorized
```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "statusCode": 403,
  "message": "Access denied"
}
```

### 404 Not Found
```json
{
  "statusCode": 404,
  "message": "Document not found"
}
```

### 500 Internal Server Error
```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "error": "Internal Server Error"
}
```

---

## Rate Limits

- **Free tier**: 10 requests per minute
- **Paid tier**: 100 requests per minute

## Best Practices

1. **Authentication**: Always include JWT token in Authorization header
2. **Error Handling**: Implement proper error handling for all API calls
3. **File Size**: Keep PDF files under 10MB
4. **Chunking**: Documents are automatically chunked into ~1000 character segments
5. **Caching**: Consider caching frequently accessed documents
6. **Retries**: Implement exponential backoff for failed requests

## Example Usage (JavaScript)

```javascript
// Login
const response = await fetch('http://localhost:4000/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'john@example.com',
    password: 'password123'
  })
});
const { token } = await response.json();

// Upload document
const formData = new FormData();
formData.append('file', pdfFile);

const uploadResponse = await fetch('http://localhost:4000/documents/upload', {
  method: 'POST',
  headers: { 'Authorization': `Bearer ${token}` },
  body: formData
});

// Chat with document
const chatResponse = await fetch('http://localhost:4000/llm/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    documentId: '65def456...',
    question: 'What is this document about?'
  })
});
```
