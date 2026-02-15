'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { useMutation, useQueryClient } from 'react-query'
import { documentsApi } from '@/lib/api/documents'
import { Upload, X, Loader2, CheckCircle2 } from 'lucide-react'

export function UploadDocument() {
  const [isOpen, setIsOpen] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle')
  const queryClient = useQueryClient()

  const uploadMutation = useMutation(documentsApi.upload, {
    onSuccess: () => {
      setUploadStatus('success')
      setTimeout(() => {
        setIsOpen(false)
        setUploadedFile(null)
        setUploadStatus('idle')
        queryClient.invalidateQueries('documents')
      }, 2000)
    },
    onError: () => {
      setUploadStatus('error')
    },
  })

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0])
      setUploadStatus('idle')
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
  })

  const handleUpload = () => {
    if (uploadedFile) {
      setUploadStatus('uploading')
      uploadMutation.mutate(uploadedFile)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        <Upload className="h-5 w-5" />
        <span>Upload Document</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Upload Document</h2>
              <button
                onClick={() => setIsOpen(false)}
                disabled={uploadStatus === 'uploading'}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {uploadStatus === 'success' ? (
              <div className="text-center py-8">
                <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <p className="text-lg font-semibold text-gray-900">Upload Successful!</p>
                <p className="text-gray-600 mt-2">Processing your document...</p>
              </div>
            ) : (
              <>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input {...getInputProps()} />
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  {isDragActive ? (
                    <p className="text-gray-700">Drop the PDF here...</p>
                  ) : (
                    <div>
                      <p className="text-gray-700 mb-2">
                        Drag and drop a PDF file here, or click to select
                      </p>
                      <p className="text-sm text-gray-500">PDF files only, max 10MB</p>
                    </div>
                  )}
                </div>

                {uploadedFile && (
                  <div className="mt-4 p-4 bg-gray-50 rounded-md">
                    <p className="text-sm font-medium text-gray-900">{uploadedFile.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                )}

                {uploadStatus === 'error' && (
                  <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md">
                    Upload failed. Please try again.
                  </div>
                )}

                <div className="mt-6 flex space-x-3">
                  <button
                    onClick={() => setIsOpen(false)}
                    disabled={uploadStatus === 'uploading'}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleUpload}
                    disabled={!uploadedFile || uploadStatus === 'uploading'}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {uploadStatus === 'uploading' ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <span>Upload</span>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
