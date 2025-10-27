'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ClientLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('client@buildmate.com')
  const [password, setPassword] = useState('password123')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    try {
      // COMPLETELY UNRESTRICTED LOGIN FOR PROTOTYPE
      // No validation whatsoever - login anyone with any credentials
      localStorage.setItem('token', 'mock-jwt-token-client')
      
      // Set user role as CLIENT
      localStorage.setItem('user', JSON.stringify({
        id: Date.now(),
        email: email,
        name: email.split('@')[0],
        role: 'CLIENT'
      }))
      
      // Redirect to client dashboard
      router.push('/client-dashboard')
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center">
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold mt-4 mb-2 text-slate-800">Client Portal Login</h1>
          <p className="text-slate-600">Access your construction project updates</p>
        </div>
        
        {error && (
          <div className="mb-6 bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-slate-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-slate-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center mb-6">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700">
              Remember me
            </label>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 px-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md hover:shadow-lg btn btn-primary disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </div>
            ) : (
              'Sign in'
            )}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <Link href="/login" className="text-sm text-teal-600 hover:text-teal-800 font-medium">
            Staff Login
          </Link>
          <span className="mx-2 text-slate-400">|</span>
          <Link href="/forgot-password" className="text-sm text-teal-600 hover:text-teal-800 font-medium">
            Forgot Password?
          </Link>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-slate-600">
            Need an account?{' '}
            <Link href="/signup" className="font-medium text-teal-600 hover:text-teal-800">
              Contact us
            </Link>
          </p>
        </div>
        
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="mb-4">
            <p className="text-sm text-slate-600 mb-2">Demo Credentials:</p>
            <div className="text-xs text-slate-500 bg-slate-50 p-2 rounded">
              <p>Email: client@buildmate.com</p>
              <p>Password: password123</p>
            </div>
          </div>
          <p className="text-sm text-slate-600">
            Don't have an account?{' '}
            <Link href="/signup" className="font-medium text-teal-600 hover:text-teal-800">
              Contact your project manager
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}