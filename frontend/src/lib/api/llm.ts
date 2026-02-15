import { apiClient } from './client'

export const llmApi = {
  summarize: async (documentId: string) => {
    const response = await apiClient.post(`/llm/summarize`, { documentId })
    return response.data
  },

  semanticSearch: async (documentId: string, query: string) => {
    const response = await apiClient.post(`/llm/search`, { documentId, query })
    return response.data
  },

  chat: async (documentId: string, question: string) => {
    const response = await apiClient.post(`/llm/chat`, { documentId, question })
    return response.data
  },
}
