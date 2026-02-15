'use client'

import { RegisterForm } from '@/components/auth/register-form'

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Knowledge Base</h1>
          <p className="text-gray-600">Create your account</p>
        </div>
        <RegisterForm />
      </div>
    </div>
  )
}
