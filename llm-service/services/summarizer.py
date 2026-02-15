import os
from typing import List
# OpenAI import (commented out - using Groq instead)
# from langchain_openai import ChatOpenAI

# Google Gemini import (commented out - using Groq instead)
# from langchain_google_genai import ChatGoogleGenerativeAI

# Groq import
from langchain_groq import ChatGroq

from langchain_core.prompts import PromptTemplate
from langchain_core.documents import Document


class SummarizerService:
    def __init__(self):
        # OpenAI LLM (commented out)
        # self.llm = ChatOpenAI(
        #     temperature=0.3,
        #     model="gpt-3.5-turbo",
        #     openai_api_key=os.getenv("OPENAI_API_KEY"),
        # )
        
        # Google Gemini LLM (commented out)
        # self.llm = ChatGoogleGenerativeAI(
        #     temperature=0.3,
        #     model="models/gemini-2.0-flash",
        #     google_api_key=os.getenv("GOOGLE_API_KEY"),
        # )
        
        # Groq LLM (FREE!)
        self.llm = ChatGroq(
            temperature=0.3,
            model="llama-3.3-70b-versatile",
            groq_api_key=os.getenv("GROQ_API_KEY"),
        )

    def summarize(self, chunks: List[str]) -> str:
        """
        Generate a comprehensive summary of the document chunks
        """
        try:
            # Combine all chunks into one  text
            combined_text = "\n\n".join(chunks)
            
            # Truncate if too long (GPT-3.5-turbo has token limits)
            max_chars = 12000  # Roughly 3000 tokens
            if len(combined_text) > max_chars:
                combined_text = combined_text[:max_chars] + "..."

            # Create summarization prompt
            prompt_template = """Write a comprehensive summary of the following document:

{text}

SUMMARY:"""

            prompt = PromptTemplate(template=prompt_template, input_variables=["text"])
            
            chain = prompt | self.llm

            # Generate summary
            result = chain.invoke({"text": combined_text})

            return result.content.strip()

        except Exception as e:
            raise Exception(f"Summarization failed: {str(e)}")
