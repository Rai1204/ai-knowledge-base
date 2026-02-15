'use client'

import { useState } from 'react'
import { useMutation } from 'react-query'
import { llmApi } from '@/lib/api/llm'
import { Loader2, Sparkles } from 'lucide-react'

interface DocumentSummaryProps {
  documentId: string
}

export function DocumentSummary({ documentId }: DocumentSummaryProps) {
  const [summary, setSummary] = useState<string>('')

  const summaryMutation = useMutation(
    () => llmApi.summarize(documentId),
    {
      onSuccess: (data) => {
        setSummary(data.summary)
      },
    }
  )

  const handleSummarize = () => {
    summaryMutation.mutate()
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">AI Summary</h3>
        <button
          onClick={handleSummarize}
          disabled={summaryMutation.isLoading}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {summaryMutation.isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Generating...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              <span>Generate Summary</span>
            </>
          )}
        </button>
      </div>

      {summary && (
        <div className="prose max-w-none">
          <div className="p-4 bg-purple-50 rounded-md border border-purple-200">
            <p className="text-gray-700 whitespace-pre-wrap">{summary}</p>
          </div>
        </div>
      )}

      {summaryMutation.isError && (
        <div className="p-4 bg-red-50 text-red-600 rounded-md">
          Failed to generate summary. Please try again.
        </div>
      )}
    </div>
  )
}
