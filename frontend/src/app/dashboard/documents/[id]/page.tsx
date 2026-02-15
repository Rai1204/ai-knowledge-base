'use client'

import { useParams } from 'next/navigation'
import { DocumentViewer } from '@/components/documents/document-viewer'
import { ChatWithDocument } from '@/components/chat/chat-with-document'
import { DocumentSummary } from '@/components/documents/document-summary'
import { SemanticSearch } from '@/components/search/semantic-search'

export default function DocumentPage() {
  const params = useParams()
  const documentId = params.id as string

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-8rem)]">
      <div className="space-y-6 overflow-auto">
        <DocumentViewer documentId={documentId} />
        <DocumentSummary documentId={documentId} />
        <SemanticSearch documentId={documentId} />
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <ChatWithDocument documentId={documentId} />
      </div>
    </div>
  )
}
