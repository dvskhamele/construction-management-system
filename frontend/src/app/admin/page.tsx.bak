'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import UserLayout from '../../components/UserLayout'

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [user, setUser] = useState<any>({ name: 'Admin User', role: 'ADMIN' })
  
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setUser(null)
    router.push('/login')
  }

  if (!isLoggedIn || user.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-6 text-center text-slate-800">Access Denied</h1>
          <p className="text-slate-600 text-center mb-6">You need admin privileges to access this page.</p>
          <Link
            href="/login"
            className="block w-full bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition duration-300 shadow-md hover:shadow-lg text-center"
          >
            Login
          </Link>
        </div>
      </div>
    )
  }

  // Mock admin data
  const adminStats = {
    totalUsers: 24,
    activeProjects: 12,
    pendingRequests: 8,
    systemIssues: 2
  }

  const users = [
    { id: 1, name: 'John Smith', email: 'john@buildmate.com', role: 'PROJECT_MANAGER', status: 'ACTIVE' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@buildmate.com', role: 'SITE_SUPERVISOR', status: 'ACTIVE' },
    { id: 3, name: 'Mike Chen', email: 'mike@buildmate.com', role: 'CREW_LEADER', status: 'INACTIVE' },
    { id: 4, name: 'Emily Rodriguez', email: 'emily@buildmate.com', role: 'SUBCONTRACTOR', status: 'ACTIVE' },
    { id: 5, name: 'David Wilson', email: 'david@buildmate.com', role: 'ADMIN', status: 'ACTIVE' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <UserLayout user={user} onLogout={handleLogout}>
        <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
                <p className="text-slate-600">Manage users, permissions, and system settings</p>
              </div>
            </div>
          </div>

          {/* Admin Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-blue-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500">Total Users</p>
                  <p className="text-3xl font-bold text-slate-800 mt-1">{adminStats.totalUsers}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-amber-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500">Active Projects</p>
                  <p className="text-3xl font-bold text-slate-800 mt-1">{adminStats.activeProjects}</p>
                </div>
                <div className="bg-amber-100 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-rose-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500">Pending Requests</p>
                  <p className="text-3xl font-bold text-slate-800 mt-1">{adminStats.pendingRequests}</p>
                </div>
                <div className="bg-rose-100 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-emerald-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-slate-500">System Issues</p>
                  <p className="text-3xl font-bold text-slate-800 mt-1">{adminStats.systemIssues}</p>
                </div>
                <div className="bg-emerald-100 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* User Management */}
          <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-slate-800">User Management</h2>
              <button className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add User
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">{user.name.charAt(0)}</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-slate-900">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          user.role === 'ADMIN' ? 'bg-purple-100 text-purple-800' :
                          user.role === 'PROJECT_MANAGER' ? 'bg-blue-100 text-blue-800' :
                          user.role === 'SITE_SUPERVISOR' ? 'bg-amber-100 text-amber-800' :
                          user.role === 'CREW_LEADER' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          user.status === 'ACTIVE' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-teal-600 hover:text-teal-900 mr-3">Edit</button>
                        <button className="text-rose-600 hover:text-rose-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* System Settings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Permissions */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">Role Permissions</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-700">Admin</span>
                  <span className="text-sm text-emerald-600">Full Access</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-700">Project Manager</span>
                  <span className="text-sm text-amber-600">Limited Access</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-700">Site Supervisor</span>
                  <span className="text-sm text-amber-600">View & Edit</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-700">Crew Leader</span>
                  <span className="text-sm text-blue-600">View Only</span>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-6">System Status</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Database Connection</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-emerald-100 text-emerald-800">Online</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">API Server</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-emerald-100 text-emerald-800">Online</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">File Storage</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-emerald-100 text-emerald-800">Online</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Notifications Service</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800">Degraded</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Backup Service</span>
                  <span className="px-2 py-1 text-xs rounded-full bg-emerald-100 text-emerald-800">Online</span>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="w-full bg-slate-100 text-slate-700 py-2 px-4 rounded-lg font-medium hover:bg-slate-200 transition duration-300">
                  Run System Check
                </button>
              </div>
            </div>
          </div>
        </main>
      </UserLayout>
    </div>
  )
}