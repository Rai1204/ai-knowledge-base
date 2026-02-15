'use client'

import { DocumentsList } from '@/components/documents/documents-list'
import { UploadDocument } from '@/components/documents/upload-document'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Your Documents</h1>
          <p className="text-gray-600 mt-1">Upload and manage your knowledge base</p>
        </div>
        <UploadDocument />
      </div>
      
      <DocumentsList />
    </div>
  )
}
