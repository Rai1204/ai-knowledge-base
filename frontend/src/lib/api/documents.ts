import { apiClient } from './client'

export const documentsApi = {
  getAll: async () => {
    const response = await apiClient.get('/documents')
    return response.data
  },

  getById: async (id: string) => {
    const response = await apiClient.get(`/documents/${id}`)
    return response.data
  },

  upload: async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await apiClient.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  delete: async (id: string) => {
    const response = await apiClient.delete(`/documents/${id}`)
    return response.data
  },
}
