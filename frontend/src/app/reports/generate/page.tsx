'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import UserLayout from '../../../components/UserLayout'

export default function GenerateReport() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [user, setUser] = useState<any>({ name: 'Report Manager', role: 'ADMIN' })
  const [formData, setFormData] = useState({
    title: '',
    type: 'general',
    dateRange: 'last-week',
    format: 'pdf',
    recipients: '',
    includeDetails: true,
    schedule: false,
    scheduleFrequency: 'weekly'
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setUser(null)
    router.push('/login')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement
      setFormData({
        ...formData,
        [name]: target.checked
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Report title is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      // In a real app, you would send this data to your API
      console.log('Generating report:', formData)
      
      // Mock generation - in a real app, this would be an API call
      alert(`Report "${formData.title}" is being generated!`)
      router.push('/reports')
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-6 text-center text-slate-800">Construction Management Login</h1>
          <form onSubmit={(e) => {
            e.preventDefault()
            // Mock login for prototype - in a real app, this would call the API
            localStorage.setItem('token', 'mock-jwt-token')
            setUser({ name: 'Report Manager', role: 'ADMIN' } as any)
            setIsLoggedIn(true)
            // Redirect to dashboard after login
            router.push('/reports')
          }}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-slate-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                placeholder="Enter your email"
                defaultValue="admin@buildmate.com"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-slate-700 mb-2">Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                placeholder="Enter your password"
                defaultValue="password123"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition duration-300 shadow-md hover:shadow-lg btn btn-primary"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <UserLayout user={user} onLogout={handleLogout}>
        <main className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-800">Generate Report</h1>
                <p className="text-slate-600">Create custom reports for your projects and sites</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link 
                  href="/reports" 
                  className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-300 transition duration-300 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Reports
                </Link>
              </div>
            </div>
          </div>

          {/* Generate Report Form */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Report Title */}
                <div className="md:col-span-2">
                  <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">
                    Report Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white ${
                      errors.title ? 'border-red-500' : 'border-slate-300'
                    }`}
                    placeholder="e.g. Monthly Progress Report"
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                </div>

                {/* Report Type */}
                <div>
                  <label htmlFor="type" className="block text-sm font-medium text-slate-700 mb-1">
                    Report Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                  >
                    <option value="general">General</option>
                    <option value="progress">Progress</option>
                    <option value="safety">Safety</option>
                    <option value="budget">Budget</option>
                    <option value="crew">Crew</option>
                    <option value="equipment">Equipment</option>
                    <option value="defects">Defects</option>
                    <option value="quality">Quality</option>
                  </select>
                </div>

                {/* Date Range */}
                <div>
                  <label htmlFor="dateRange" className="block text-sm font-medium text-slate-700 mb-1">
                    Date Range
                  </label>
                  <select
                    id="dateRange"
                    name="dateRange"
                    value={formData.dateRange}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                  >
                    <option value="last-week">Last Week</option>
                    <option value="last-month">Last Month</option>
                    <option value="last-quarter">Last Quarter</option>
                    <option value="last-year">Last Year</option>
                    <option value="custom">Custom Range</option>
                  </select>
                </div>

                {/* Output Format */}
                <div>
                  <label htmlFor="format" className="block text-sm font-medium text-slate-700 mb-1">
                    Output Format
                  </label>
                  <select
                    id="format"
                    name="format"
                    value={formData.format}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                  >
                    <option value="pdf">PDF</option>
                    <option value="excel">Excel</option>
                    <option value="csv">CSV</option>
                    <option value="html">HTML</option>
                  </select>
                </div>

                {/* Recipients */}
                <div>
                  <label htmlFor="recipients" className="block text-sm font-medium text-slate-700 mb-1">
                    Recipients (Email)
                  </label>
                  <input
                    type="email"
                    id="recipients"
                    name="recipients"
                    value={formData.recipients}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                    placeholder="e.g. manager@company.com"
                  />
                </div>
              </div>

              {/* Include Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="includeDetails"
                    name="includeDetails"
                    checked={formData.includeDetails}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                  />
                  <label htmlFor="includeDetails" className="ml-2 block text-sm text-slate-700">
                    Include detailed data
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="schedule"
                    name="schedule"
                    checked={formData.schedule}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-slate-300 rounded"
                  />
                  <label htmlFor="schedule" className="ml-2 block text-sm text-slate-700">
                    Schedule report
                  </label>
                </div>
              </div>

              {/* Schedule Frequency - only shown when schedule is checked */}
              {formData.schedule && (
                <div>
                  <label htmlFor="scheduleFrequency" className="block text-sm font-medium text-slate-700 mb-1">
                    Schedule Frequency
                  </label>
                  <select
                    id="scheduleFrequency"
                    name="scheduleFrequency"
                    value={formData.scheduleFrequency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                  </select>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 pt-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 px-6 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex-1"
                >
                  Generate Report
                </button>
                <Link
                  href="/reports"
                  className="border border-slate-300 text-slate-700 py-3 px-6 rounded-lg font-medium hover:bg-slate-50 transition duration-300 flex-1 text-center"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>

          {/* Report Templates */}
          <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Report Templates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition cursor-pointer">
                <h3 className="font-medium text-slate-800">Weekly Progress Report</h3>
                <p className="text-sm text-slate-600">Track project milestones and deliverables</p>
              </div>
              <div className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition cursor-pointer">
                <h3 className="font-medium text-slate-800">Safety Compliance</h3>
                <p className="text-sm text-slate-600">Monitor safety metrics and incidents</p>
              </div>
              <div className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition cursor-pointer">
                <h3 className="font-medium text-slate-800">Budget Summary</h3>
                <p className="text-sm text-slate-600">Track expenses and budget utilization</p>
              </div>
              <div className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition cursor-pointer">
                <h3 className="font-medium text-slate-800">Crew Performance</h3>
                <p className="text-sm text-slate-600">Monitor crew efficiency and productivity</p>
              </div>
              <div className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition cursor-pointer">
                <h3 className="font-medium text-slate-800">Equipment Utilization</h3>
                <p className="text-sm text-slate-600">Track equipment usage and maintenance</p>
              </div>
              <div className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition cursor-pointer">
                <h3 className="font-medium text-slate-800">Quality Assessment</h3>
                <p className="text-sm text-slate-600">Evaluate project quality metrics</p>
              </div>
            </div>
          </div>
        </main>
      </UserLayout>
    </div>
  )
}