'use client'

import { useState } from 'react'
import { useMutation } from 'react-query'
import { llmApi } from '@/lib/api/llm'
import { Search, Loader2 } from 'lucide-react'

interface SemanticSearchProps {
  documentId: string
}

export function SemanticSearch({ documentId }: SemanticSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])

  const searchMutation = useMutation(
    (searchQuery: string) => llmApi.semanticSearch(documentId, searchQuery),
    {
      onSuccess: (data) => {
        setResults(data.results)
      },
    }
  )

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      searchMutation.mutate(query)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Semantic Search</h3>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex space-x-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for concepts or ideas..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={searchMutation.isLoading || !query.trim()}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {searchMutation.isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </button>
        </div>
      </form>

      {results.length > 0 && (
        <div className="space-y-4">
          <p className="text-sm font-medium text-gray-700">
            Found {results.length} relevant results:
          </p>
          {results.map((result, index) => (
            <div key={index} className="p-4 bg-blue-50 rounded-md border border-blue-200">
              <p className="text-sm text-gray-700">{result.text}</p>
              <p className="text-xs text-gray-500 mt-2">
                Relevance: {(result.score * 100).toFixed(1)}%
              </p>
            </div>
          ))}
        </div>
      )}

      {searchMutation.isError && (
        <div className="p-4 bg-red-50 text-red-600 rounded-md">
          Search failed. Please try again.
        </div>
      )}
    </div>
  )
}
