import os
from typing import List, Tuple
import numpy as np
# OpenAI import (commented out)
# from langchain_openai import OpenAIEmbeddings

# Google Gemini import (commented out - using HuggingFace instead)
# from langchain_google_genai import GoogleGenerativeAIEmbeddings

# HuggingFace embeddings (FREE, local)
from langchain_huggingface import HuggingFaceEmbeddings

from sklearn.metrics.pairwise import cosine_similarity


class SemanticSearchService:
    def __init__(self):
        # OpenAI embeddings (commented out)
        # self.embeddings = OpenAIEmbeddings(
        #     openai_api_key=os.getenv("OPENAI_API_KEY")
        # )
        
        # Google Gemini embeddings (commented out)
        # self.embeddings = GoogleGenerativeAIEmbeddings(
        #     model="models/embedding-001",
        #     google_api_key=os.getenv("GOOGLE_API_KEY")
        # )
        
        # HuggingFace embeddings (FREE, runs locally!)
        # Using L3 model (smaller) to fit in 512MB RAM
        self.embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L3-v2"
        )

    def search(self, query: str, chunks: List[str], top_k: int = 5) -> List[dict]:
        """
        Perform semantic search on document chunks using embeddings
        """
        try:
            # Generate embedding for the query
            query_embedding = self.embeddings.embed_query(query)

            # Generate embeddings for all chunks
            chunk_embeddings = self.embeddings.embed_documents(chunks)

            # Calculate cosine similarity
            similarities = cosine_similarity(
                [query_embedding],
                chunk_embeddings
            )[0]

            # Get top-k results
            top_indices = np.argsort(similarities)[::-1][:top_k]

            # Format results
            results = [
                {
                    "text": chunks[idx],
                    "score": float(similarities[idx])
                }
                for idx in top_indices
                if similarities[idx] > 0.1  # Filter out very low similarity scores
            ]

            return results

        except Exception as e:
            raise Exception(f"Semantic search failed: {str(e)}")
