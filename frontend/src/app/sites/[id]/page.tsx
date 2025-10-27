'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import UserLayout from '../../../components/UserLayout'

type Props = {
  params: {
    id: string
  }
}

export default function SiteDetail({ params }: Props) {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [user, setUser] = useState<any>({ name: 'Site Manager', role: 'ADMIN' })
  const [site, setSite] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  
  const router = useRouter()
  const siteId = params.id

  useEffect(() => {
    // Simulate fetching site data
    // In a real app, you would fetch from an API
    const fetchSite = () => {
      // Mock site data based on ID
      const mockSites = [
        {
          id: 1,
          name: 'Downtown Office Complex - Site A',
          project: 'Downtown Office Complex',
          location: 'Downtown District, New York',
          status: 'ACTIVE',
          supervisor: 'John Smith',
          crewSize: 12,
          startDate: '2025-01-15',
          endDate: '2025-09-30',
          progress: 75,
          safetyRating: 92,
          qualityRating: 88,
          issues: 3,
          safetyIncidents: 1,
          lastInspection: '2025-03-17',
          nextInspection: '2025-03-24',
          description: 'Construction of a new office complex in the downtown area.',
          budget: 12500000,
          spent: 9375000,
          remaining: 3125000
        },
        {
          id: 2,
          name: 'Residential Apartment Block B - Site B',
          project: 'Residential Apartment Block B',
          location: 'Suburban Area, Chicago',
          status: 'ACTIVE',
          supervisor: 'Sarah Johnson',
          crewSize: 18,
          startDate: '2025-02-10',
          endDate: '2025-10-15',
          progress: 45,
          safetyRating: 87,
          qualityRating: 82,
          issues: 7,
          safetyIncidents: 2,
          lastInspection: '2025-03-16',
          nextInspection: '2025-03-23',
          description: 'Construction of a 12-story residential apartment building.',
          budget: 8500000,
          spent: 3825000,
          remaining: 4675000
        },
        {
          id: 3,
          name: 'Industrial Warehouse - Site C',
          project: 'Industrial Warehouse',
          location: 'River Crossing, Houston',
          status: 'COMPLETED',
          supervisor: 'Mike Chen',
          crewSize: 24,
          startDate: '2024-11-01',
          endDate: '2025-03-30',
          progress: 100,
          safetyRating: 96,
          qualityRating: 94,
          issues: 2,
          safetyIncidents: 0,
          lastInspection: '2025-03-15',
          nextInspection: 'N/A',
          description: 'Large industrial warehouse facility for logistics company.',
          budget: 6200000,
          spent: 6200000,
          remaining: 0
        }
      ]
      
      const foundSite = mockSites.find(s => s.id === parseInt(siteId as string, 10))
      setSite(foundSite || null)
      setLoading(false)
    }
    
    fetchSite()
  }, [siteId])

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <UserLayout user={user} onLogout={handleLogout}>
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-center items-center h-64">
            <p className="text-slate-600">Loading site details...</p>
          </div>
        </UserLayout>
      </div>
    )
  }

  if (!site) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <UserLayout user={user} onLogout={handleLogout}>
          <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-md p-8 text-center">
              <h1 className="text-3xl font-bold text-slate-800 mb-4">Site Not Found</h1>
              <p className="text-slate-600 mb-6">Sorry, we couldn't find the site you're looking for.</p>
              <Link 
                href="/sites" 
                className="bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition duration-300"
              >
                Back to Sites
              </Link>
            </div>
          </div>
        </UserLayout>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-emerald-100 text-emerald-800'
      case 'COMPLETED':
        return 'bg-indigo-100 text-indigo-800'
      case 'ON_HOLD':
        return 'bg-rose-100 text-rose-800'
      case 'PLANNING':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      
      <UserLayout user={user} onLogout={handleLogout}>
        <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">{site.name}</h1>
              <p className="text-slate-600">Detailed information about this construction site</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Link 
                href="/sites" 
                className="bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-medium hover:bg-slate-300 transition duration-300 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Sites
              </Link>
            </div>
          </div>
        </div>

        {/* Site Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Site Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-600">Project</p>
                <p className="font-medium text-slate-800">{site.project}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Site Supervisor</p>
                <p className="font-medium text-slate-800">{site.supervisor}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Location</p>
                <p className="font-medium text-slate-800">{site.location}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Crew Size</p>
                <p className="font-medium text-slate-800">{site.crewSize} members</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Status</p>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(site.status)}`}>
                  {site.status.replace('_', ' ')}
                </span>
              </div>
              <div>
                <p className="text-sm text-slate-600">Progress</p>
                <div className="flex items-center">
                  <div className="w-32 bg-slate-200 rounded-full h-2 mr-2">
                    <div 
                      className="bg-gradient-to-r from-teal-500 to-teal-600 h-2 rounded-full" 
                      style={{ width: `${site.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-slate-800">{site.progress}%</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-md font-medium text-slate-800 mb-2">Description</h3>
              <p className="text-slate-600">{site.description}</p>
            </div>
          </div>
          
          {/* Stats Card */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Key Metrics</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600">Safety Rating</p>
                <p className="text-2xl font-bold text-slate-800">{site.safetyRating > 0 ? `${site.safetyRating}%` : 'N/A'}</p>
                <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full" 
                    style={{ width: `${site.safetyRating}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600">Quality Rating</p>
                <p className="text-2xl font-bold text-slate-800">{site.qualityRating > 0 ? `${site.qualityRating}%` : 'N/A'}</p>
                <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" 
                    style={{ width: `${site.qualityRating}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600">Open Issues</p>
                <p className="text-2xl font-bold text-rose-600">{site.issues}</p>
              </div>
              
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600">Safety Incidents</p>
                <p className="text-2xl font-bold text-rose-600">{site.safetyIncidents}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline and Budget */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Timeline */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Timeline</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-600">Start Date</p>
                <p className="font-medium text-slate-800">{new Date(site.startDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">End Date</p>
                <p className="font-medium text-slate-800">{new Date(site.endDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Last Inspection</p>
                <p className="font-medium text-slate-800">{site.lastInspection}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Next Inspection</p>
                <p className="font-medium text-slate-800">{site.nextInspection}</p>
              </div>
            </div>
          </div>
          
          {/* Budget */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Budget</h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-slate-600">Total Budget</span>
                  <span className="text-sm font-medium text-slate-800">${site.budget?.toLocaleString()}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-cyan-600 h-2 rounded-full" 
                    style={{ width: '100%' }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-slate-600">Spent</span>
                  <span className="text-sm font-medium text-slate-800">${site.spent?.toLocaleString()}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full" 
                    style={{ width: `${(site.spent / site.budget) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-slate-600">Remaining</span>
                  <span className="text-sm font-medium text-slate-800">${site.remaining?.toLocaleString()}</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-teal-500 to-teal-600 h-2 rounded-full" 
                    style={{ width: `${(site.remaining / site.budget) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Site Actions</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link 
              href={`/sites/${site.id}/edit`}
              className="bg-slate-100 text-slate-700 py-3 px-4 rounded-lg font-medium hover:bg-slate-200 transition duration-300 text-center"
            >
              Edit Site
            </Link>
            <Link 
              href={`/sites/${site.id}/reports`}
              className="bg-slate-100 text-slate-700 py-3 px-4 rounded-lg font-medium hover:bg-slate-200 transition duration-300 text-center"
            >
              View Reports
            </Link>
            <button 
              className="bg-gradient-to-r from-rose-500 to-rose-600 text-white py-3 px-4 rounded-lg font-medium hover:from-rose-600 hover:to-rose-700 transition duration-300"
            >
              Archive Site
            </button>
          </div>
        </div>
      </main>
      </UserLayout>
    </div>
  )
}