'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import UserLayout from '../../components/UserLayout'

export default function SettingsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [user, setUser] = useState<any>({ name: 'Admin User', role: 'ADMIN' })
  const [activeTab, setActiveTab] = useState('account')
  const [formData, setFormData] = useState({
    companyName: 'BuildMate Construction',
    companyEmail: 'admin@buildmate.com',
    companyPhone: '+1-555-0123',
    companyAddress: '123 Construction Ave, Building City, BC 12345',
    timezone: 'America/New_York',
    currency: 'USD',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12-hour',
    notifications: {
      email: true,
      sms: false,
      push: true
    },
    integrations: {
      googleCalendar: true,
      quickbooks: false,
      slack: true
    }
  })
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@buildmate.com',
      role: 'Administrator',
      status: 'Active',
      lastLogin: '2025-03-18 09:30 AM'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@buildmate.com',
      role: 'Project Manager',
      status: 'Active',
      lastLogin: '2025-03-18 08:45 AM'
    },
    {
      id: 3,
      name: 'Mike Chen',
      email: 'mike.chen@buildmate.com',
      role: 'Site Supervisor',
      status: 'Active',
      lastLogin: '2025-03-17 07:15 AM'
    },
    {
      id: 4,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@buildmate.com',
      role: 'Estimator',
      status: 'Inactive',
      lastLogin: '2025-03-10 03:22 PM'
    }
  ])
  const [roles, setRoles] = useState([
    { id: 1, name: 'Administrator', permissions: ['full_access'] },
    { id: 2, name: 'Project Manager', permissions: ['manage_projects', 'view_reports'] },
    { id: 3, name: 'Site Supervisor', permissions: ['view_projects', 'update_tasks'] },
    { id: 4, name: 'Estimator', permissions: ['create_estimates', 'view_pricing'] },
    { id: 5, name: 'Viewer', permissions: ['view_only'] }
  ])

  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setUser(null)
    router.push('/login')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      if (name.startsWith('notifications.')) {
        const key = name.split('.')[1]
        setFormData({
          ...formData,
          notifications: {
            ...formData.notifications,
            [key]: checked
          }
        })
      } else if (name.startsWith('integrations.')) {
        const key = name.split('.')[1]
        setFormData({
          ...formData,
          integrations: {
            ...formData.integrations,
            [key]: checked
          }
        })
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordForm({
      ...passwordForm,
      [name]: value
    })
  }

  const saveSettings = () => {
    // Save settings logic here
    alert('Settings saved successfully!')
  }

  const changePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match!')
      return
    }
    // Change password logic here
    alert('Password changed successfully!')
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-100 text-emerald-800'
      case 'Inactive':
        return 'bg-amber-100 text-amber-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Administrator':
        return 'bg-rose-100 text-rose-800'
      case 'Project Manager':
        return 'bg-teal-100 text-teal-800'
      case 'Site Supervisor':
        return 'bg-amber-100 text-amber-800'
      case 'Estimator':
        return 'bg-indigo-100 text-indigo-800'
      case 'Viewer':
        return 'bg-slate-100 text-slate-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <UserLayout user={user} onLogout={handleLogout}>
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Settings</h1>
          <p className="text-slate-600">Manage your construction management system preferences</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Settings Navigation */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-md p-6 card">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Settings</h2>
            <nav className="space-y-2">
              <button 
                className={`w-full text-left px-4 py-3 rounded-lg transition duration-300 ${
                  activeTab === 'account' 
                    ? 'bg-teal-50 text-teal-700 font-medium border-r-4 border-teal-500' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
                onClick={() => setActiveTab('account')}
              >
                Account Settings
              </button>
              <button 
                className={`w-full text-left px-4 py-3 rounded-lg transition duration-300 ${
                  activeTab === 'notifications' 
                    ? 'bg-teal-50 text-teal-700 font-medium border-r-4 border-teal-500' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
                onClick={() => setActiveTab('notifications')}
              >
                Notifications
              </button>
              <button 
                className={`w-full text-left px-4 py-3 rounded-lg transition duration-300 ${
                  activeTab === 'preferences' 
                    ? 'bg-teal-50 text-teal-700 font-medium border-r-4 border-teal-500' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
                onClick={() => setActiveTab('preferences')}
              >
                Preferences
              </button>
              <button 
                className={`w-full text-left px-4 py-3 rounded-lg transition duration-300 ${
                  activeTab === 'security' 
                    ? 'bg-teal-50 text-teal-700 font-medium border-r-4 border-teal-500' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
                onClick={() => setActiveTab('security')}
              >
                Security
              </button>
            </nav>
          </div>
          
          {/* Settings Content */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6 card">
            {activeTab === 'account' && (
              <div>
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Account Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                      value={user?.name || ''}
                      onChange={(e) => {}}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                      value={user?.email || ''}
                      onChange={(e) => {}}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Role</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                      value={user?.role || ''}
                      readOnly
                    />
                  </div>
                  <div className="pt-4">
                    <button className="bg-gradient-to-br from-teal-500 to-teal-600 text-white py-2 px-6 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'notifications' && (
              <div>
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Notification Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-slate-800">Email Notifications</h3>
                      <p className="text-sm text-slate-600">Receive email updates about your projects</p>
                    </div>
                    <div className="relative inline-block w-12 h-6">
                      <input type="checkbox" className="sr-only" defaultChecked />
                      <div className="block w-12 h-6 rounded-full bg-teal-500"></div>
                      <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-slate-800">Push Notifications</h3>
                      <p className="text-sm text-slate-600">Receive real-time updates on your device</p>
                    </div>
                    <div className="relative inline-block w-12 h-6">
                      <input type="checkbox" className="sr-only" defaultChecked />
                      <div className="block w-12 h-6 rounded-full bg-teal-500"></div>
                      <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-slate-800">SMS Notifications</h3>
                      <p className="text-sm text-slate-600">Receive text updates for critical alerts</p>
                    </div>
                    <div className="relative inline-block w-12 h-6">
                      <input type="checkbox" className="sr-only" />
                      <div className="block w-12 h-6 rounded-full bg-slate-300"></div>
                      <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'preferences' && (
              <div>
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Preferences</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-slate-800 mb-2">Language</h3>
                    <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white">
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Marathi</option>
                      <option>Gujarati</option>
                    </select>
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800 mb-2">Date Format</h3>
                    <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white">
                      <option>DD/MM/YYYY</option>
                      <option>MM/DD/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800 mb-2">Theme</h3>
                    <select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white">
                      <option>Light</option>
                      <option>Dark</option>
                      <option>Auto</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'security' && (
              <div>
                <h2 className="text-xl font-semibold text-slate-800 mb-4">Security</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Current Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                      placeholder="Enter current password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                      placeholder="Confirm new password"
                    />
                  </div>
                  <div className="pt-4">
                    <button className="bg-gradient-to-br from-teal-500 to-teal-600 text-white py-2 px-6 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </UserLayout>
  )
}