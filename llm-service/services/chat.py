import os
from typing import List, Tuple, Optional
# OpenAI imports (commented out)
# from langchain_openai import ChatOpenAI, OpenAIEmbeddings

# Google Gemini imports (commented out - using Groq instead)
# from langchain_google_genai import ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings

# Groq and HuggingFace imports
from langchain_groq import ChatGroq
from langchain_huggingface import HuggingFaceEmbeddings

from langchain_core.prompts import ChatPromptTemplate
from langchain_community.vectorstores import FAISS
from langchain_core.documents import Document


class ChatService:
    def __init__(self):
        # OpenAI LLM (commented out)
        # self.llm = ChatOpenAI(
        #     temperature=0.7,
        #     model="gpt-3.5-turbo",
        #     openai_api_key=os.getenv("OPENAI_API_KEY"),
        # )
        # self.embeddings = OpenAIEmbeddings(
        #     openai_api_key=os.getenv("OPENAI_API_KEY")
        # )
        
        # Google Gemini LLM (commented out)
        # self.llm = ChatGoogleGenerativeAI(
        #     temperature=0.7,
        #     model="models/gemini-2.0-flash",
        #     google_api_key=os.getenv("GOOGLE_API_KEY"),
        # )
        # self.embeddings = GoogleGenerativeAIEmbeddings(
        #     model="models/embedding-001",
        #     google_api_key=os.getenv("GOOGLE_API_KEY")
        # )
        
        # Groq LLM (FREE!) + HuggingFace Embeddings (FREE, local)
        self.llm = ChatGroq(
            temperature=0.7,
            model="llama-3.3-70b-versatile",
            groq_api_key=os.getenv("GROQ_API_KEY"),
        )
        # Using L3 model (smaller) to fit in 512MB RAM
        self.embeddings = HuggingFaceEmbeddings(
            model_name="sentence-transformers/all-MiniLM-L3-v2"
        )

    def chat(
        self, question: str, chunks: List[str]
    ) -> Tuple[str, Optional[List[str]]]:
        """
        Chat with the document using RAG (Retrieval Augmented Generation)
        """
        try:
            # Convert chunks to LangChain documents
            documents = [
                Document(page_content=chunk, metadata={"source": f"chunk_{i}"})
                for i, chunk in enumerate(chunks)
            ]

            # Create vector store from documents
            vectorstore = FAISS.from_documents(documents, self.embeddings)

            # Retrieve relevant documents
            relevant_docs = vectorstore.similarity_search(question, k=3)
            
            # Combine context from retrieved documents
            context = "\n\n".join([doc.page_content for doc in relevant_docs])

            # Create prompt
            prompt = ChatPromptTemplate.from_template(
                """You are a helpful AI assistant that answers questions based on the provided context. 
Use the following pieces of context to answer the question. 
If you don't know the answer based on the context, just say that you don't know, don't try to make up an answer.

Context:
{context}

Question: {question}

Answer:"""
            )

            # Create chain and get answer
            chain = prompt | self.llm
            result = chain.invoke({"context": context, "question": question})
            
            answer = result.content
            sources = [doc.page_content[:200] for doc in relevant_docs]

            return answer, sources

        except Exception as e:
            raise Exception(f"Chat failed: {str(e)}")
