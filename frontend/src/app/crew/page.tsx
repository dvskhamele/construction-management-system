'use client'

import React, { useState } from 'react'
import HeaderResponsiveLayout from '../../components/HeaderResponsiveLayout'

export default function MinimalResponsiveCrewPage() {
  const [user, setUser] = useState<any>({ name: 'Crew Manager', role: 'ADMIN' }) 
  
  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    window.location.href = '/login'
  }
  
  // Simple mock data
  const crewMembers = [
    {
      id: 1,
      name: 'John Smith',
      department: 'Foundation',
      position: 'Foreman',
      status: 'Active',
      performance: 92
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      department: 'Foundation',
      position: 'Laborer',
      status: 'Break',
      performance: 87
    },
    {
      id: 3,
      name: 'Mike Chen',
      department: 'Framing',
      position: 'Framer',
      status: 'Active',
      performance: 95
    },
    {
      id: 4,
      name: 'Emma Davis',
      department: 'Electrical',
      position: 'Electrician',
      status: 'Offline',
      performance: 88
    }
  ]
  
  // Function to add a new crew member (for demo purposes)
  const handleAddCrew = () => {
    alert('Add crew functionality would be implemented here');
  }

  return (
    <HeaderResponsiveLayout user={user} onLogout={handleLogout} currentPage="crew">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">Crew Management</h1>
              <p className="text-slate-600 mt-2">Manage your construction crew and track performance</p>
            </div>
            <div className="flex space-x-3">
              <button 
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center"
                onClick={handleAddCrew}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Crew
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-4 sm:p-6 border-l-4 border-amber-500 card cursor-pointer transform hover:-translate-y-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Total Crew</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{crewMembers.length}</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-4 sm:p-6 border-l-4 border-blue-500 card cursor-pointer transform hover:-translate-y-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Active</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{crewMembers.filter(m => m.status === 'Active').length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-4 sm:p-6 border-l-4 border-emerald-500 card cursor-pointer transform hover:-translate-y-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Avg. Performance</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{Math.round(crewMembers.reduce((sum, m) => sum + m.performance, 0) / crewMembers.length)}%</p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-4 sm:p-6 border-l-4 border-indigo-500 card cursor-pointer transform hover:-translate-y-1">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Departments</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{Array.from(new Set(crewMembers.map(m => m.department))).length}</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Crew List */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h2 className="text-xl font-semibold text-slate-800">Crew Directory</h2>
              <div className="text-sm text-slate-500 sm:hidden mt-1">
                Showing {crewMembers.length} crew members
              </div>
            </div>
            <div className="text-sm text-slate-500 hidden sm:block">
              Showing {crewMembers.length} crew members
            </div>
          </div>
          
          {/* Mobile View - Card layout for smaller screens */}
          <div className="sm:hidden divide-y divide-slate-200">
            {crewMembers.map(member => (
              <div key={member.id} className="p-4 hover:bg-slate-50 transition cursor-pointer">
                <div className="flex items-center mb-3">
                  <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-3">
                    <div className="text-sm font-medium text-slate-900">{member.name}</div>
                    <div className="text-xs text-slate-500">ID: {member.id}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-500">Position:</span>
                    <div className="text-slate-800">{member.position}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Department:</span>
                    <div className="text-slate-800">{member.department}</div>
                  </div>
                  <div>
                    <span className="text-slate-500">Status:</span>
                    <div>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        member.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                        member.status === 'Break' ? 'bg-amber-100 text-amber-800' :
                        'bg-slate-100 text-slate-800'
                      }`}>
                        {member.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500">Performance:</span>
                    <div className="flex items-center">
                      <span className="mr-2">{member.performance}%</span>
                      <div className="w-12 bg-slate-200 rounded-full h-1.5 flex-1">
                        <div 
                          className={`h-1.5 rounded-full ${
                            member.performance >= 90 ? 'bg-emerald-500' :
                            member.performance >= 70 ? 'bg-teal-500' :
                            member.performance >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                          }`}
                          style={{ width: `${member.performance}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-3">
                  <button className="text-xs text-teal-600 hover:text-teal-900">Edit</button>
                  <button className="text-xs text-rose-600 hover:text-rose-900">Remove</button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Desktop View - Table layout */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Crew Member</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Performance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {crewMembers.map(member => (
                  <tr key={member.id} className="hover:bg-slate-50 transition cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold">
                            {member.name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">{member.name}</div>
                          <div className="text-sm text-slate-500">ID: {member.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {member.position}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {member.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        member.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                        member.status === 'Break' ? 'bg-amber-100 text-amber-800' :
                        'bg-slate-100 text-slate-800'
                      }`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      <div className="flex items-center">
                        <span>{member.performance}%</span>
                        <div className="ml-2 w-16 bg-slate-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              member.performance >= 90 ? 'bg-emerald-500' :
                              member.performance >= 70 ? 'bg-teal-500' :
                              member.performance >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${member.performance}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-teal-600 hover:text-teal-900 mr-3">Edit</button>
                      <button className="text-rose-600 hover:text-rose-900">Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile-friendly Add Crew Button */}
        <div className="mt-6 md:hidden">
          <button 
            className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md"
            onClick={handleAddCrew}
          >
            Add New Crew Member
          </button>
        </div>
      </div>
    </HeaderResponsiveLayout>
  )
}