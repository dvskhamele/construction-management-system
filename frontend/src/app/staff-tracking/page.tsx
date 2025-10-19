'use client'

import React, { useState, useEffect } from 'react'
import UserLayout from '../../components/UserLayout'
import StaffLocationTracking from '../../components/StaffLocationTracking'

export default function StaffTracking() {
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState('tracking')

  useEffect(() => {
    // Get user from localStorage
    const token = localStorage.getItem('token')
    if (token) {
      // In a real app, we would decode the token to get user info
      // For now, we'll just set a default user
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <UserLayout user={user} onLogout={handleLogout}>
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Add the rest of the component here */}
      </main>
    </UserLayout>
  )
}
