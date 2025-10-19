'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  // Auto-fill credentials for lazy users
  const quickCredentials = [
    { role: 'Admin', email: 'admin@buildmate.com', password: 'password123' },
    { role: 'PM', email: 'pm@buildmate.com', password: 'password123' },
    { role: 'SS', email: 'ss@buildmate.com', password: 'password123' },
    { role: 'CL', email: 'cl@buildmate.com', password: 'password123' },
    { role: 'SUB', email: 'sub@buildmate.com', password: 'password123' }
  ]

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    try {
      // COMPLETELY UNRESTRICTED LOGIN FOR PROTOTYPE
      // No validation whatsoever - login anyone with any credentials
      localStorage.setItem('token', 'mock-jwt-token')
      
      // Auto-detect role from email or assign default
      const userRole = email.includes('admin') ? 'ADMIN' :
                      email.includes('pm') ? 'PROJECT_MANAGER' :
                      email.includes('ss') ? 'SITE_SUPERVISOR' :
                      email.includes('cl') ? 'CREW_LEADER' :
                      email.includes('sub') ? 'SUBCONTRACTOR' :
                      email.includes('client') ? 'CLIENT' : 'USER'
      
      // Store user data
      localStorage.setItem('user', JSON.stringify({
        id: Date.now(),
        email: email,
        name: email.split('@')[0],
        role: userRole
      }))
      
      // Redirect to dashboard after login
      router.push('/dashboard')
    } catch (err) {
      // Even on error, still login for prototype
      localStorage.setItem('token', 'mock-jwt-token')
      localStorage.setItem('user', JSON.stringify({
        id: Date.now(),
        email: email,
        name: email.split('@')[0],
        role: 'USER'
      }))
      router.push('/dashboard')
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-fill remembered credentials
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail')
    const rememberedPassword = localStorage.getItem('rememberedPassword')
    
    if (rememberedEmail && rememberedPassword) {
      setEmail(rememberedEmail)
      setPassword(rememberedPassword)
      setRememberMe(true)
    }
  }, [])

  // Apply quick credentials
  const applyCredentials = (cred: { email: string, password: string }) => {
    setEmail(cred.email)
    setPassword(cred.password)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6 text-center">
            <div className="flex items-center justify-center">
              <div className="h-12 w-12 rounded-lg bg-white bg-opacity-20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h1 className="ml-3 text-2xl font-bold text-white">BuildMate</h1>
            </div>
            <p className="text-teal-100 mt-2">Construction Management Portal</p>
          </div>
          
          {/* Main Content */}
          <div className="p-6">
            <h2 className="text-xl font-bold text-slate-800 text-center mb-2">Sign in to your account</h2>
            <p className="text-slate-600 text-center mb-6">Manage your construction projects</p>
            
            <form onSubmit={handleLogin}>
              {/* Email Field */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition text-slate-800 bg-white"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              {/* Password Field */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition text-slate-800 bg-white"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              {/* Remember Me */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link href="/forgot-password" className="font-medium text-teal-600 hover:text-teal-500">
                    Forgot password?
                  </Link>
                </div>
              </div>
              
              {/* Error Message */}
              {error && (
                <div className="mb-4 bg-red-50 text-red-700 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 px-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : 'Sign In'}
              </button>
            </form>
            
            {/* Quick Credentials Section */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-slate-500">Quick Login</span>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-2">
                {quickCredentials.map((cred, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => applyCredentials({ email: cred.email, password: cred.password })}
                    className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded-lg transition text-center"
                  >
                    <span className="font-medium">{cred.role}</span>
                    <span className="block text-xs text-slate-500">{cred.email.split('@')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                Don't have an account?{' '}
                <Link href="/signup" className="font-medium text-teal-600 hover:text-teal-500">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
          
          {/* Footer */}
          <div className="bg-slate-50 px-6 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-xs text-slate-500 mb-2 md:mb-0">
                © {new Date().getFullYear()} BuildMate. Construction Process Automation
              </div>
              <div className="flex space-x-4">
                <Link href="/features" className="text-xs text-slate-500 hover:text-slate-700">
                  Features
                </Link>
                <Link href="/pricing" className="text-xs text-slate-500 hover:text-slate-700">
                  Pricing
                </Link>
                <Link href="/contact" className="text-xs text-slate-500 hover:text-slate-700">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}