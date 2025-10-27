'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import UserLayout from '../../../../components/UserLayout'

type Props = {
  params: {
    id: string
  }
}

export default function EditSite({ params }: Props) {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [user, setUser] = useState<any>({ name: 'Site Manager', role: 'ADMIN' })
  const [formData, setFormData] = useState({
    name: '',
    project: '',
    location: '',
    supervisor: '',
    crewSize: 1,
    startDate: '',
    endDate: '',
    status: 'PLANNING',
    description: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
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
          description: 'Construction of a new office complex in the downtown area.'
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
          description: 'Construction of a 12-story residential apartment building.'
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
          description: 'Large industrial warehouse facility for logistics company.'
        }
      ]
      
      const foundSite = mockSites.find(s => s.id === parseInt(siteId as string, 10))
      
      if (foundSite) {
        setFormData({
          name: foundSite.name,
          project: foundSite.project,
          location: foundSite.location,
          supervisor: foundSite.supervisor,
          crewSize: foundSite.crewSize,
          startDate: foundSite.startDate,
          endDate: foundSite.endDate,
          status: foundSite.status,
          description: foundSite.description
        })
      }
      
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
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
    
    if (!formData.name.trim()) {
      newErrors.name = 'Site name is required'
    }
    
    if (!formData.project.trim()) {
      newErrors.project = 'Project name is required'
    }
    
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required'
    }
    
    if (!formData.supervisor.trim()) {
      newErrors.supervisor = 'Supervisor name is required'
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required'
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required'
    }
    
    if (new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.endDate = 'End date must be after start date'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      // In a real app, you would send this data to your API
      console.log('Updating site:', { ...formData, id: siteId })
      
      // Mock update - in a real app, this would be an API call
      alert(`Site "${formData.name}" updated successfully!`)
      router.push(`/sites/${siteId}`)
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      
      <UserLayout user={user} onLogout={handleLogout}>
        <main className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Edit Site</h1>
              <p className="text-slate-600">Update information for site: {formData.name}</p>
            </div>
            <div className="mt-4 md:mt-0">
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

        {/* Edit Site Form */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Site Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                  Site Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white ${
                    errors.name ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="e.g. Downtown Office Complex - Site A"
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              {/* Project Name */}
              <div>
                <label htmlFor="project" className="block text-sm font-medium text-slate-700 mb-1">
                  Project Name *
                </label>
                <input
                  type="text"
                  id="project"
                  name="project"
                  value={formData.project}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white ${
                    errors.project ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="e.g. Downtown Office Complex"
                />
                {errors.project && <p className="mt-1 text-sm text-red-600">{errors.project}</p>}
              </div>

              {/* Location */}
              <div className="md:col-span-2">
                <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-1">
                  Location *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white ${
                    errors.location ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="e.g. Downtown District, New York"
                />
                {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
              </div>

              {/* Supervisor */}
              <div>
                <label htmlFor="supervisor" className="block text-sm font-medium text-slate-700 mb-1">
                  Site Supervisor *
                </label>
                <input
                  type="text"
                  id="supervisor"
                  name="supervisor"
                  value={formData.supervisor}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white ${
                    errors.supervisor ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="e.g. John Smith"
                />
                {errors.supervisor && <p className="mt-1 text-sm text-red-600">{errors.supervisor}</p>}
              </div>

              {/* Crew Size */}
              <div>
                <label htmlFor="crewSize" className="block text-sm font-medium text-slate-700 mb-1">
                  Crew Size
                </label>
                <input
                  type="number"
                  id="crewSize"
                  name="crewSize"
                  min="1"
                  max="100"
                  value={formData.crewSize}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                />
              </div>

              {/* Status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-slate-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                >
                  <option value="PLANNING">Planning</option>
                  <option value="ACTIVE">Active</option>
                  <option value="ON_HOLD">On Hold</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>

              {/* Start Date */}
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-slate-700 mb-1">
                  Start Date *
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white ${
                    errors.startDate ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
                {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
              </div>

              {/* End Date */}
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-slate-700 mb-1">
                  End Date *
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white ${
                    errors.endDate ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
                {errors.endDate && <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>}
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                placeholder="Provide a detailed description of the site..."
              ></textarea>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 pt-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 px-6 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex-1"
              >
                Update Site
              </button>
              <Link
                href={`/sites/${siteId}`}
                className="border border-slate-300 text-slate-700 py-3 px-6 rounded-lg font-medium hover:bg-slate-50 transition duration-300 flex-1 text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </main>
      </UserLayout>
    </div>
  )
}