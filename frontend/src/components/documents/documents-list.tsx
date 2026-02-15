'use client'

import { useQuery } from 'react-query'
import { documentsApi } from '@/lib/api/documents'
import { FileText, Calendar, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function DocumentsList() {
  const router = useRouter()
  const { data: documents, isLoading } = useQuery('documents', documentsApi.getAll)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!documents || documents.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
        <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No documents yet</h3>
        <p className="text-gray-600">Upload your first document to get started</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.map((doc: any) => (
        <div
          key={doc._id}
          onClick={() => router.push(`/dashboard/documents/${doc._id}`)}
          className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div className="flex items-start space-x-4">
            <div className="bg-blue-100 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                {doc.filename}
              </h3>
              <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
                <Calendar className="h-4 w-4" />
                <span>{new Date(doc.uploadedAt).toLocaleDateString()}</span>
              </div>
              <div className="mt-2 text-xs text-gray-500">
                {doc.chunks?.length || 0} chunks
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
