'use client'

import React, { useState, useEffect } from 'react'
import constructionApiService from '../../utils/apiService'
import UserLayout from '../../components/UserLayout'

export default function APITestPage() {
  const [user, setUser] = useState<any>(null)
  const [testResults, setTestResults] = useState<any>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  const testGetDashboardStats = async () => {
    setLoading(true)
    try {
      const result = await constructionApiService.getDashboardStats()
      setTestResults((prev: any) => ({ ...prev, dashboardStats: result }))
    } catch (error: any) {
      setTestResults((prev: any) => ({ ...prev, dashboardStats: { error: error.message } }))
    } finally {
      setLoading(false)
    }
  }

  const testGetRooms = async () => {
    setLoading(true)
    try {
      const result = await constructionApiService.getRooms()
      setTestResults((prev: any) => ({ ...prev, rooms: result }))
    } catch (error: any) {
      setTestResults((prev: any) => ({ ...prev, rooms: { error: error.message } }))
    } finally {
      setLoading(false)
    }
  }

  const testGetStaff = async () => {
    setLoading(true)
    try {
      const result = await constructionApiService.getStaff()
      setTestResults((prev: any) => ({ ...prev, staff: result }))
    } catch (error: any) {
      setTestResults((prev: any) => ({ ...prev, staff: { error: error.message } }))
    } finally {
      setLoading(false)
    }
  }

  const testGetDepartments = async () => {
    setLoading(true)
    try {
      const result = await constructionApiService.getDepartments()
      setTestResults((prev: any) => ({ ...prev, departments: result }))
    } catch (error: any) {
      setTestResults((prev: any) => ({ ...prev, departments: { error: error.message } }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <UserLayout user={user} onLogout={handleLogout}>
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">API Service Test</h1>
          <p className="text-slate-600 mt-2">Testing new API functions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button 
            className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-300"
            onClick={testGetDashboardStats}
            disabled={loading}
          >
            Test Get Dashboard Stats
          </button>
          <button 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300"
            onClick={testGetRooms}
            disabled={loading}
          >
            Test Get Rooms
          </button>
          <button 
            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors duration-300"
            onClick={testGetStaff}
            disabled={loading}
          >
            Test Get Staff
          </button>
          <button 
            className="bg-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors duration-300"
            onClick={testGetDepartments}
            disabled={loading}
          >
            Test Get Departments
          </button>
        </div>

        {loading && (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          </div>
        )}

        {Object.keys(testResults).length > 0 && (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Test Results</h2>
            {Object.entries(testResults).map(([key, value]) => (
              <div key={key} className="mb-6">
                <h3 className="font-medium text-slate-700 capitalize">{key}</h3>
                <pre className="bg-slate-100 p-4 rounded-lg mt-2 overflow-x-auto text-sm">
                  {JSON.stringify(value, null, 2)}
                </pre>
              </div>
            ))}
          </div>
        )}
      </main>
    </UserLayout>
  )
}