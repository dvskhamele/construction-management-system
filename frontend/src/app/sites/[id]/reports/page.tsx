'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import UserLayout from '../../../../components/UserLayout'

type Props = {
  params: {
    id: string
  }
}

export default function SiteReports({ params }: Props) {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [user, setUser] = useState<any>({ name: 'Site Manager', role: 'ADMIN' })
  
  const router = useRouter()
  const siteId = params.id

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setUser(null)
    router.push('/login')
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
            setUser({ name: 'Site Manager', role: 'ADMIN' } as any)
            setIsLoggedIn(true)
            // Redirect to dashboard after login
            router.push('/sites')
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

  // Mock reports data
  const reports = [
    { id: 1, title: 'Weekly Progress Report', date: '2025-03-15', type: 'Progress', status: 'COMPLETED' },
    { id: 2, title: 'Safety Inspection Report', date: '2025-03-10', type: 'Safety', status: 'COMPLETED' },
    { id: 3, title: 'Budget Review Report', date: '2025-03-05', type: 'Budget', status: 'COMPLETED' },
    { id: 4, title: 'Crew Attendance Report', date: '2025-03-18', type: 'Crew', status: 'DRAFT' },
    { id: 5, title: 'Equipment Utilization Report', date: '2025-03-17', type: 'Equipment', status: 'COMPLETED' },
    { id: 6, title: 'Quality Assessment Report', date: '2025-03-16', type: 'Quality', status: 'COMPLETED' },
  ]

  const reportTypes = [
    { id: 'progress', name: 'Progress Reports', icon: '📊' },
    { id: 'safety', name: 'Safety Reports', icon: '🛡️' },
    { id: 'budget', name: 'Budget Reports', icon: '💰' },
    { id: 'crew', name: 'Crew Reports', icon: '👥' },
    { id: 'equipment', name: 'Equipment Reports', icon: '🔧' },
    { id: 'quality', name: 'Quality Reports', icon: '✅' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      
      <UserLayout user={user} onLogout={handleLogout}>
        <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Site Reports</h1>
              <p className="text-slate-600">Generate and view reports for this construction site</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Link 
                href={`/sites/${siteId}`} 
                className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-300 transition duration-300 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Site
              </Link>
            </div>
          </div>
        </div>

        {/* Report Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {reportTypes.map((type) => (
            <div 
              key={type.id}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition cursor-pointer border border-slate-200"
            >
              <div className="flex items-center">
                <div className="text-3xl mr-4">{type.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">{type.name}</h3>
                  <p className="text-slate-600 text-sm">View and manage {type.name.toLowerCase()}</p>
                </div>
              </div>
              <button className="mt-4 w-full bg-slate-100 text-slate-700 py-2 px-4 rounded-lg font-medium hover:bg-slate-200 transition duration-300">
                View Reports
              </button>
            </div>
          ))}
        </div>

        {/* Recent Reports */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-slate-800">Recent Reports</h2>
            <button className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300">
              Generate New Report
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Report</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">{report.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-600">{report.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {new Date(report.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        report.status === 'COMPLETED' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {report.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-teal-600 hover:text-teal-900 mr-3">View</button>
                      <button className="text-slate-600 hover:text-slate-900">Download</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Report Generation Options */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-6">Generate Custom Report</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="reportType" className="block text-sm font-medium text-slate-700 mb-2">
                Report Type
              </label>
              <select 
                id="reportType"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
              >
                <option>Select report type</option>
                <option>Progress Report</option>
                <option>Safety Report</option>
                <option>Budget Report</option>
                <option>Crew Report</option>
                <option>Equipment Report</option>
                <option>Quality Report</option>
                <option>Incident Report</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="dateRange" className="block text-sm font-medium text-slate-700 mb-2">
                Date Range
              </label>
              <select 
                id="dateRange"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
              >
                <option>Last Week</option>
                <option>Last Month</option>
                <option>Last Quarter</option>
                <option>Custom Range</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6">
            <label htmlFor="reportDetails" className="block text-sm font-medium text-slate-700 mb-2">
              Additional Details
            </label>
            <textarea
              id="reportDetails"
              rows={3}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
              placeholder="Include any specific details or focus areas for the report..."
            ></textarea>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 px-6 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md">
              Generate Report
            </button>
          </div>
        </div>
      </main>
      </UserLayout>
    </div>
  )
}