'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import UserLayout from '../../components/UserLayout'

export default function StaffPerformanceDashboard() {
  const [user, setUser] = useState<any>(null)
  const [timeRange, setTimeRange] = useState('7d')
  const [staffData, setStaffData] = useState<any[]>([])
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [sortBy, setSortBy] = useState('performance')

  useEffect(() => {
    // Get user from localStorage
    const token = localStorage.getItem('token')
    if (token) {
      // In a real app, we would decode the token to get user info
      // For now, we'll just set a default user
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
    }

    // Mock data for prototype
    const mockStaff = [
      {
        id: 1,
        name: 'Alice Johnson',
        department: 'Housekeeping',
        position: 'Supervisor',
        performanceScore: 92,
        tasksCompleted: 42,
        avgResponseTime: 28,
        onTimeRate: 95,
        lastActive: new Date(Date.now() - 3600000).toISOString(),
        status: 'Active'
      },
      {
        id: 2,
        name: 'Bob Smith',
        department: 'Housekeeping',
        position: 'Staff',
        performanceScore: 87,
        tasksCompleted: 38,
        avgResponseTime: 32,
        onTimeRate: 88,
        lastActive: new Date(Date.now() - 7200000).toISOString(),
        status: 'Active'
      },
      {
        id: 3,
        name: 'Carol Davis',
        department: 'Housekeeping',
        position: 'Staff',
        performanceScore: 95,
        tasksCompleted: 45,
        avgResponseTime: 25,
        onTimeRate: 98,
        lastActive: new Date(Date.now() - 10800000).toISOString(),
        status: 'Offline'
      },
      {
        id: 4,
        name: 'David Wilson',
        department: 'Maintenance',
        position: 'Supervisor',
        performanceScore: 88,
        tasksCompleted: 18,
        avgResponseTime: 65,
        onTimeRate: 85,
        lastActive: new Date(Date.now() - 14400000).toISOString(),
        status: 'Active'
      },
      {
        id: 5,
        name: 'Eva Brown',
        department: 'Maintenance',
        position: 'Staff',
        performanceScore: 82,
        tasksCompleted: 16,
        avgResponseTime: 72,
        onTimeRate: 80,
        lastActive: new Date(Date.now() - 18000000).toISOString(),
        status: 'Break'
      },
      {
        id: 6,
        name: 'Frank Miller',
        department: 'Food & Beverage',
        position: 'Manager',
        performanceScore: 96,
        tasksCompleted: 31,
        avgResponseTime: 18,
        onTimeRate: 99,
        lastActive: new Date(Date.now() - 21600000).toISOString(),
        status: 'Active'
      },
      {
        id: 7,
        name: 'Grace Lee',
        department: 'Food & Beverage',
        position: 'Staff',
        performanceScore: 91,
        tasksCompleted: 29,
        avgResponseTime: 22,
        onTimeRate: 94,
        lastActive: new Date(Date.now() - 25200000).toISOString(),
        status: 'Active'
      },
      {
        id: 8,
        name: 'Henry Taylor',
        department: 'Food & Beverage',
        position: 'Staff',
        performanceScore: 89,
        tasksCompleted: 27,
        avgResponseTime: 25,
        onTimeRate: 92,
        lastActive: new Date(Date.now() - 28800000).toISOString(),
        status: 'Active'
      },
      {
        id: 9,
        name: 'Ivy Chen',
        department: 'Food & Beverage',
        position: 'Staff',
        performanceScore: 93,
        tasksCompleted: 30,
        avgResponseTime: 20,
        onTimeRate: 96,
        lastActive: new Date(Date.now() - 32400000).toISOString(),
        status: 'Offline'
      }
    ]
    
    setStaffData(mockStaff)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-100 text-emerald-800'
      case 'Break':
        return 'bg-amber-100 text-amber-800'
      case 'Offline':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-500'
    if (score >= 80) return 'bg-amber-500'
    return 'bg-rose-500'
  }

  // Filter and sort staff data
  const filteredStaff = staffData.filter(staff => {
    if (selectedDepartment === 'all') return true
    return staff.department === selectedDepartment
  })

  const sortedStaff = [...filteredStaff].sort((a, b) => {
    if (sortBy === 'performance') return b.performanceScore - a.performanceScore
    if (sortBy === 'tasks') return b.tasksCompleted - a.tasksCompleted
    if (sortBy === 'response') return a.avgResponseTime - b.avgResponseTime
    return a.name.localeCompare(b.name)
  })

  // Get unique departments for filter
  const departments = Array.from(new Set(staffData.map((staff: any) => staff.department)))

  // Calculate department performance
  const departmentPerformance = departments.map(dept => {
    const deptStaff = staffData.filter(staff => staff.department === dept)
    const avgPerformance = deptStaff.reduce((sum, staff) => sum + staff.performanceScore, 0) / deptStaff.length
    const avgResponseTime = deptStaff.reduce((sum, staff) => sum + staff.avgResponseTime, 0) / deptStaff.length
    const onTimeRate = deptStaff.reduce((sum, staff) => sum + staff.onTimeRate, 0) / deptStaff.length
    return {
      department: dept,
      staffCount: deptStaff.length,
      avgPerformance: Math.round(avgPerformance),
      avgResponseTime: Math.round(avgResponseTime),
      onTimeRate: Math.round(onTimeRate)
    }
  })

  return (
    <UserLayout user={user} onLogout={handleLogout}>
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Add the rest of the component here */}
      </main>
    </UserLayout>
  )
}
