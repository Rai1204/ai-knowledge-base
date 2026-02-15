'use client'

import { useQuery } from 'react-query'
import { documentsApi } from '@/lib/api/documents'
import { FileText, Loader2 } from 'lucide-react'

interface DocumentViewerProps {
  documentId: string
}

export function DocumentViewer({ documentId }: DocumentViewerProps) {
  const { data: document, isLoading } = useQuery(
    ['document', documentId],
    () => documentsApi.getById(documentId)
  )

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!document) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
        <p className="text-gray-600">Document not found</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start space-x-4 mb-6">
        <div className="bg-blue-100 p-3 rounded-lg">
          <FileText className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{document.filename}</h2>
          <p className="text-sm text-gray-500 mt-1">
            Uploaded on {new Date(document.uploadedAt).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-500">
            {document.chunks?.length || 0} text chunks
          </p>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Content</h3>
        <div className="prose max-w-none">
          {document.chunks && document.chunks.length > 0 ? (
            <div className="space-y-4">
              {document.chunks.slice(0, 5).map((chunk: any, index: number) => (
                <div key={index} className="p-4 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-700">{chunk.text}</p>
                </div>
              ))}
              {document.chunks.length > 5 && (
                <p className="text-sm text-gray-500 italic">
                  ... and {document.chunks.length - 5} more chunks
                </p>
              )}
            </div>
          ) : (
            <p className="text-gray-600">No content available</p>
          )}
        </div>
      </div>
    </div>
  )
}
