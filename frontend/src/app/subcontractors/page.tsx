'use client'

import React, { useState, useEffect } from 'react'
import UserLayout from '../../components/UserLayout'
import { useRouter } from 'next/navigation'

export default function Subcontractors() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [user, setUser] = useState<any>({ name: 'Construction Admin', role: 'ADMIN' })
  const [subcontractors, setSubcontractors] = useState<any[]>([])
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setUser(null)
    router.push('/login')
  }

  useEffect(() => {
    // Mock data for prototype - Subcontractors
    const mockSubcontractors = [
      { 
        id: 1, 
        name: 'ABC Concrete Ltd', 
        contact: 'John Smith', 
        email: 'john@abcconcrete.com', 
        phone: '+1234567890', 
        specialty: 'Concrete Work', 
        status: 'Active', 
        projects: 5, 
        rating: 4.8, 
        contractValue: 2500000, 
        startDate: '2025-01-15', 
        endDate: '2025-12-31', 
        performance: 92
      },
      { 
        id: 2, 
        name: 'XYZ Electrical Co', 
        contact: 'Sarah Johnson', 
        email: 'sarah@xyzelectrical.com', 
        phone: '+1234567891', 
        specialty: 'Electrical Work', 
        status: 'Active', 
        projects: 3, 
        rating: 4.6, 
        contractValue: 1800000, 
        startDate: '2025-02-01', 
        endDate: '2025-11-30', 
        performance: 87
      },
      { 
        id: 3, 
        name: 'PQR Plumbing Inc', 
        contact: 'Mike Davis', 
        email: 'mike@pqrplumbing.com', 
        phone: '+1234567892', 
        specialty: 'Plumbing', 
        status: 'Inactive', 
        projects: 2, 
        rating: 4.2, 
        contractValue: 950000, 
        startDate: '2024-08-10', 
        endDate: '2025-05-15', 
        performance: 95
      }
    ]
    
    setSubcontractors(mockSubcontractors)
  }, [])

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h1 className="text-2xl font-bold mb-6 text-center text-slate-800">Please log in</h1>
          <button 
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 px-6 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300"
            onClick={() => router.push('/login')}
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <UserLayout user={user} onLogout={handleLogout}>
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Subcontractor Management</h1>
              <p className="text-slate-600">Manage your construction subcontractors and track performance</p>
            </div>
            <button className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-4 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Subcontractor
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-slate-500">
            <p className="text-2xl font-bold text-slate-800">{subcontractors.length}</p>
            <p className="text-sm text-slate-600">Total Subcontractors</p>
          </div>
          <div className="bg-emerald-50 rounded-xl shadow p-4 text-center border-l-4 border-emerald-500">
            <p className="text-2xl font-bold text-emerald-700">{subcontractors.filter(s => s.status === 'Active').length}</p>
            <p className="text-sm text-emerald-600">Active</p>
          </div>
          <div className="bg-amber-50 rounded-xl shadow p-4 text-center border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-700">{subcontractors.filter(s => s.status === 'On Hold').length}</p>
            <p className="text-sm text-amber-600">On Hold</p>
          </div>
          <div className="bg-gray-50 rounded-xl shadow p-4 text-center border-l-4 border-gray-500">
            <p className="text-2xl font-bold text-gray-700">{subcontractors.filter(s => s.status === 'Inactive').length}</p>
            <p className="text-sm text-gray-600">Inactive</p>
          </div>
        </div>

        {/* Subcontractors List */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800">Subcontractors Directory</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Subcontractor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Specialty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Projects</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contract Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {subcontractors.map((subcontractor: any) => (
                  <tr key={subcontractor.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">{subcontractor.name}</div>
                      <div className="text-sm text-slate-500">{subcontractor.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {subcontractor.contact}
                      <div className="text-xs text-slate-500">{subcontractor.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {subcontractor.specialty}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        subcontractor.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                        subcontractor.status === 'On Hold' ? 'bg-amber-100 text-amber-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {subcontractor.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {subcontractor.rating} ★
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {subcontractor.projects}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      ₹{Math.round(subcontractor.contractValue / 100000)}L
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-teal-600 hover:text-teal-900 mr-3">View</button>
                      <button className="text-rose-600 hover:text-rose-900">Archive</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </UserLayout>
  )
}