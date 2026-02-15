# MongoDB Atlas Vector Search Setup (Optional Enhancement)

MongoDB Atlas now supports native vector search, which can improve semantic search performance.

## Prerequisites
- MongoDB Atlas cluster (M10 or higher for vector search)
- Cluster running MongoDB 6.0.11 or later

## Setup Instructions

### 1. Enable Vector Search in MongoDB Atlas

1. Log into MongoDB Atlas
2. Navigate to your cluster
3. Go to the "Search" tab
4. Click "Create Search Index"

### 2. Create Search Index

Use this JSON definition:

```json
{
  "mappings": {
    "dynamic": false,
    "fields": {
      "chunks": {
        "type": "document",
        "fields": {
          "embedding": {
            "type": "knnVector",
            "dimensions": 1536,
            "similarity": "cosine"
          },
          "text": {
            "type": "string"
          }
        }
      }
    }
  }
}
```

### 3. Update Backend Code

Add this method to `backend/src/documents/documents.service.ts`:

```typescript
async storeEmbeddings(documentId: string, embeddings: number[][]): Promise<void> {
  const document = await this.documentModel.findById(documentId);
  
  if (!document) {
    throw new NotFoundException('Document not found');
  }

  // Update each chunk with its embedding
  document.chunks = document.chunks.map((chunk, index) => ({
    ...chunk,
    embedding: embeddings[index] || [],
  }));

  await document.save();
}
```

### 4. Update LLM Service

Modify `llm-service/services/search.py` to return embeddings:

```python
async def search_with_embeddings(self, query: str, chunks: List[str], top_k: int = 5):
    """
    Enhanced search that returns both results and embeddings
    """
    query_embedding = self.embeddings.embed_query(query)
    chunk_embeddings = self.embeddings.embed_documents(chunks)
    
    # ... similarity calculation ...
    
    return {
        "results": results,
        "embeddings": chunk_embeddings
    }
```

### 5. Vector Search Query

Example MongoDB aggregation pipeline for vector search:

```javascript
db.documents.aggregate([
  {
    $search: {
      knnBeta: {
        vector: [/* query embedding array */],
        path: "chunks.embedding",
        k: 5
      }
    }
  },
  {
    $project: {
      filename: 1,
      chunks: 1,
      score: { $meta: "searchScore" }
    }
  }
])
```

## Benefits

- ✅ Faster vector similarity search
- ✅ Native MongoDB integration
- ✅ Reduced latency
- ✅ Better scalability
- ✅ No need for separate vector database

## Performance Comparison

| Method | Query Time | Scalability |
|--------|-----------|-------------|
| In-memory (current) | ~100ms | Limited |
| MongoDB Vector Search | ~10-30ms | Excellent |

## Note

This is an optional enhancement. The current implementation using FAISS and scikit-learn works well for most use cases and doesn't require a paid MongoDB Atlas tier.
