'use client'

'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ResponsiveSidebarLayout from '../../components/ResponsiveSidebarLayout'
import ProjectAnalytics from '../../components/ProjectAnalytics'
import TeamLeaderboard from '../../components/TeamLeaderboard'
import MobileNavigation from '../../components/MobileNavigation'
import TaskAssignment from '../../components/TaskAssignment'
import TaskBoard from '../../components/TaskBoard'
import VastuDashboard from '../../components/VastuDashboard'
import CreateProject from '../../components/CreateProject'

import apiService from '../../utils/constructionApiService'
import MobileDashboard from './page-mobile'

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({
    pendingTasks: 0,
    activeProjects: 0,
    completedProjects: 0,
    revenueToday: 0,
    projectCompletionRate: 0,
    teamActive: 0,
    maintenanceRequests: 0,
    avgResponseTime: 0,
    qualityRating: 0
  })
  const [activity, setActivity] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [tasks, setTasks] = useState<any[]>([])
  const [performance, setPerformance] = useState({
    projectPerformance: 92,
    teamPerformance: 87,
    qualityMetrics: 95
  })
  const [timeRange, setTimeRange] = useState('7d') // For charts
  const [isMobile, setIsMobile] = useState(false)

  const router = useRouter()

  useEffect(() => {
    // Check if user is on mobile device
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    // Check if user is authenticated by looking for token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Get user data from localStorage (set during login)
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setUser(user);
        setIsLoggedIn(true);
      } else {
        // Fallback to decode token or make API call to get user data in a real app
        // For now, set a default user
        setUser({ name: 'Project Manager', role: 'ADMIN' });
        setIsLoggedIn(true);
      }
    } else {
      // If no token, redirect to login
      router.push('/login');
    }
    
    fetchDashboardData()
    
    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [router])

  const fetchDashboardData = async () => {
    try {
      // Fetch dashboard stats
      const statsData = await apiService.getDashboardStats()
      setStats(statsData.stats)
      
      // Fetch recent activity
      const activityData = await apiService.getDashboardActivity()
      setActivity(activityData.activity)
      
      // Fetch projects for preview
      const projectsData = await apiService.getDashboardProjects()
      setProjects(projectsData.projects)
      
      // Fetch tasks for preview
      const tasksData = await apiService.getDashboardTasks()
      setTasks(tasksData.tasks)
      
      // Fetch performance data
      const performanceData = await apiService.getDashboardPerformance()
      setPerformance({
        projectPerformance: performanceData.projectPerformance,
        teamPerformance: performanceData.teamPerformance,
        qualityMetrics: performanceData.qualityMetrics
      })
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      // Fallback to mock data if API fails
      setStats({
        pendingTasks: 18,
        activeProjects: 12,
        completedProjects: 8,
        revenueToday: 45000,
        projectCompletionRate: 78,
        teamActive: 24,
        maintenanceRequests: 5,
        avgResponseTime: 25,
        qualityRating: 92
      })
      setPerformance({
        projectPerformance: 87,
        teamPerformance: 92,
        qualityMetrics: 95
      })
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setUser(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': // Construction phase status and general
        return 'bg-emerald-100 text-emerald-800'
      case 'ACTIVE': // Construction phase status
        return 'bg-amber-100 text-amber-800'
      case 'INSPECTED': // Construction phase status
        return 'bg-blue-100 text-blue-800'
      case 'ON_HOLD': // Construction phase status
        return 'bg-rose-100 text-rose-800'
      case 'PENDING':
        return 'bg-amber-100 text-amber-800'
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800'
      case 'OVERDUE':
        return 'bg-rose-100 text-rose-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getActivityColor = (type: string, status: string) => {
    if (type === 'task') {
      if (status === 'COMPLETED') return 'border-l-4 border-emerald-500'
      if (status === 'OVERDUE') return 'border-l-4 border-rose-500'
      return 'border-l-4 border-blue-500'
    } else if (type === 'project') {
      return 'border-l-4 border-amber-500'
    } else {
      return 'border-l-4 border-indigo-500'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'LOW':
        return 'bg-gray-100 text-gray-800'
      case 'MEDIUM':
        return 'bg-amber-100 text-amber-800'
      case 'HIGH':
        return 'bg-rose-100 text-rose-800'
      case 'URGENT':
        return 'bg-rose-100 text-rose-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-amber-100 text-amber-800'
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800'
      case 'COMPLETED':
        return 'bg-emerald-100 text-emerald-800'
      case 'OVERDUE':
        return 'bg-rose-100 text-rose-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case 'LOW':
        return 'bg-gray-100 text-gray-800'
      case 'MEDIUM':
        return 'bg-amber-100 text-amber-800'
      case 'HIGH':
        return 'bg-rose-100 text-rose-800'
      case 'URGENT':
        return 'bg-rose-100 text-rose-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getDepartmentClass = (department: string) => {
    switch (department) {
      case 'FOUNDATION':
        return 'bg-blue-100 text-blue-800'
      case 'FRAMING':
        return 'bg-amber-100 text-amber-800'
      case 'ELECTRICAL':
        return 'bg-emerald-100 text-emerald-800'
      case 'PLUMBING':
        return 'bg-rose-100 text-rose-800'
      case 'FINISHING':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Function to generate chart data for project completion
  const generateProjectCompletionData = () => {
    const data = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      data.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        completion: Math.floor(Math.random() * 30) + 60 // Random between 60-90%
      })
    }
    return data
  }

  // Function to generate chart data for revenue
  const generateRevenueData = () => {
    const data = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      data.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }),
        revenue: Math.floor(Math.random() * 50000) + 30000 // Random between 30000-80000
      })
    }
    return data
  }

  const projectCompletionData = generateProjectCompletionData()
  const revenueData = generateRevenueData()

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
          <h1 className="text-2xl font-bold mb-6 text-center text-slate-800">BuildMate Construction Login</h1>
          <form onSubmit={(e) => {
            e.preventDefault()
            // Mock login for prototype - in a real app, this would call the API
            localStorage.setItem('token', 'mock-jwt-token')
            setUser({ name: 'Project Manager', role: 'ADMIN' } as any)
            setIsLoggedIn(true)
            fetchDashboardData()
            // Redirect to dashboard after login
            router.push('/dashboard')
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

  // Render mobile dashboard for small screens
  if (isMobile) {
    return <MobileDashboard />
  }

  return (
    <ResponsiveSidebarLayout user={user} onLogout={handleLogout}>
      <div className="px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Welcome, {user?.name}</h1>
              <p className="text-slate-600">Here's what's happening with your construction sites today.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-500">Last updated:</span>
                <span className="text-sm font-medium text-slate-700">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <button 
                  className="p-1 rounded-full hover:bg-slate-200 transition focus-ring"
                  onClick={fetchDashboardData}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v7a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards - Mobile-first responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div 
            className="bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-4 sm:p-6 border-l-4 border-amber-500 card cursor-pointer transform hover:-translate-y-1" 
            onClick={() => router.push('/tasks')}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Pending Tasks</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.pendingTasks}</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-slate-500">+2 from yesterday</span>
            </div>
          </div>

          <div 
            className="bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-4 sm:p-6 border-l-4 border-blue-500 card cursor-pointer transform hover:-translate-y-1" 
            onClick={() => router.push('/projects')}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Active Sites</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.activeProjects}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-emerald-500">↑ 1 from last week</span>
            </div>
          </div>

          <div 
            className="bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-4 sm:p-6 border-l-4 border-emerald-500 card cursor-pointer transform hover:-translate-y-1" 
            onClick={() => router.push('/analytics')}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Revenue Today</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">₹{stats.revenueToday.toLocaleString()}</p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-emerald-500">↑ 15% from yesterday</span>
            </div>
          </div>

          <div 
            className="bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-4 sm:p-6 border-l-4 border-indigo-500 card cursor-pointer transform hover:-translate-y-1" 
            onClick={() => router.push('/team')}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Crew Members</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.teamActive}</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-slate-500">3 on break</span>
            </div>
          </div>
        </div>

        {/* Vastu Dashboard for non-client users */}
        {user?.role !== 'CLIENT' && <VastuDashboard currentUser={user} />}
        
        {/* Task Assignment and Board for specific roles */}
        {(user?.role === 'ADMIN' || user?.role === 'PROJECT_MANAGER' || user?.role === 'SITE_SUPERVISOR') && (
          <div className={`grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8 ${user?.role !== 'CLIENT' ? 'mt-6 sm:mt-8' : ''}`}>
            <TaskAssignment currentUserRole={user?.role} />
            <TaskBoard currentUserRole={user?.role} />
          </div>
        )}
        
        {/* Client Dashboard View */}
        {user?.role === 'CLIENT' && (
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Project Progress Card */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6 card">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Project Progress</h2>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="border-b border-slate-200 pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium text-slate-800">{project.name}</h3>
                      <span className="text-sm font-medium text-teal-600">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                      <div
                        className="bg-gradient-to-r from-teal-400 to-teal-600 h-2.5 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 mt-2">
                      <span>Status: {project.status}</span>
                      <span>Deadline: {new Date(project.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Billing Card */}
            <div className="bg-white rounded-2xl shadow-md p-6 card">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Billing Status</h2>
              <div className="space-y-4">
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="font-medium text-amber-800">Pending Payment</p>
                  <p className="text-2xl font-bold text-amber-600 mt-2">₹45,000</p>
                  <p className="text-sm text-amber-600 mt-1">Due: 03 Nov 2024</p>
                  <button className="mt-3 w-full bg-amber-500 text-white py-2 px-4 rounded-lg hover:bg-amber-600 transition text-sm font-medium">
                    Pay Now
                  </button>
                </div>
                
                <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <p className="font-medium text-emerald-800">Total Paid</p>
                  <p className="text-2xl font-bold text-emerald-600 mt-2">₹1,20,000</p>
                  <p className="text-sm text-emerald-600 mt-1">This project</p>
                </div>
                
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <p className="font-medium text-slate-800">Next Invoice</p>
                  <p className="text-xl font-bold text-slate-700 mt-2">₹75,000</p>
                  <p className="text-sm text-slate-600 mt-1">Plaster work completion</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Charts Section */}
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Project Completion Chart */}
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Project Progress</h2>
              <div className="flex space-x-2">
                <button 
                  className={`text-xs px-2 py-1 rounded ${timeRange === '7d' ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-600'}`}
                  onClick={() => setTimeRange('7d')}
                >
                  7D
                </button>
                <button 
                  className={`text-xs px-2 py-1 rounded ${timeRange === '30d' ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-600'}`}
                  onClick={() => setTimeRange('30d')}
                >
                  30D
                </button>
              </div>
            </div>
            <div className="h-64 flex items-end space-x-2 mt-8 cursor-pointer hover:opacity-90 transition-opacity" onClick={() => router.push('/analytics')}>
              {projectCompletionData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1 group">
                  <div className="text-xs text-slate-500 mb-1 group-hover:text-teal-600 transition-colors">
                    {data.completion}%
                  </div>
                  <div 
                    className="w-full bg-gradient-to-t from-teal-400 to-teal-600 rounded-t transition-all duration-300 group-hover:from-teal-500 group-hover:to-teal-700"
                    style={{ height: `${(data.completion / 100) * 200}px` }}
                  ></div>
                  <div className="text-xs text-slate-600 mt-1 group-hover:text-slate-800 transition-colors">
                    {data.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Chart */}
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Revenue Trend</h2>
              <div className="flex space-x-2">
                <button 
                  className={`text-xs px-2 py-1 rounded ${timeRange === '7d' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}
                  onClick={() => setTimeRange('7d')}
                >
                  7D
                </button>
                <button 
                  className={`text-xs px-2 py-1 rounded ${timeRange === '30d' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}
                  onClick={() => setTimeRange('30d')}
                >
                  30D
                </button>
              </div>
            </div>
            <div className="h-64 flex items-end space-x-2 mt-8 cursor-pointer hover:opacity-90 transition-opacity" onClick={() => router.push('/analytics')}>
              {revenueData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1 group">
                  <div className="text-xs text-slate-500 mb-1 group-hover:text-emerald-600 transition-colors">
                    ₹{(data.revenue / 1000).toFixed(1)}k
                  </div>
                  <div 
                    className="w-full bg-gradient-to-t from-emerald-400 to-emerald-600 rounded-t transition-all duration-300 group-hover:from-emerald-500 group-hover:to-emerald-700"
                    style={{ height: `${(data.revenue / 80000) * 200}px` }}
                  ></div>
                  <div className="text-xs text-slate-600 mt-1 group-hover:text-slate-800 transition-colors">
                    {data.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-md p-6 card">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <div 
                className="bg-gradient-to-br from-teal-500 to-teal-600 text-white py-4 px-4 rounded-xl text-center hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md transform hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => router.push('/tasks')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <span className="text-sm font-medium">View Tasks</span>
              </div>
              <div 
                className="bg-gradient-to-br from-blue-500 to-blue-600 text-white py-4 px-4 rounded-xl text-center hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md transform hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => router.push('/projects')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="text-sm font-medium">Manage Projects</span>
              </div>
              <div 
                className="bg-gradient-to-br from-purple-500 to-purple-600 text-white py-4 px-4 rounded-xl text-center hover:from-purple-600 hover:to-purple-700 transition duration-300 shadow-md transform hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => router.push('/analytics')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="text-sm font-medium">View Analytics</span>
              </div>
              <div 
                className="bg-gradient-to-br from-amber-500 to-amber-600 text-white py-4 px-4 rounded-xl text-center hover:from-amber-600 hover:to-amber-700 transition duration-300 shadow-md transform hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => router.push('/departments')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="text-sm font-medium">Crews</span>
              </div>
              
              {/* New Quick Action Buttons */}
              <div 
                className="bg-gradient-to-br from-rose-500 to-rose-600 text-white py-4 px-4 rounded-xl text-center hover:from-rose-600 hover:to-rose-700 transition duration-300 shadow-md transform hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => {
                  // Mock function to create a new task
                  alert('Creating new task...');
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium">New Task</span>
              </div>
              <div 
                className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white py-4 px-4 rounded-xl text-center hover:from-indigo-600 hover:to-indigo-700 transition duration-300 shadow-md transform hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => {
                  // Mock function to update project status
                  alert('Updating project status...');
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="text-sm font-medium">Update Status</span>
              </div>
              <div 
                className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white py-4 px-4 rounded-xl text-center hover:from-emerald-600 hover:to-emerald-700 transition duration-300 shadow-md transform hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => {
                  // Mock function to assign task
                  alert('Assigning task...');
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <span className="text-sm font-medium">Assign Task</span>
              </div>
              <div 
                className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white py-4 px-4 rounded-xl text-center hover:from-cyan-600 hover:to-cyan-700 transition duration-300 shadow-md transform hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => {
                  // Mock function to send notification
                  alert('Sending notification...');
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="text-sm font-medium">Notify Team</span>
              </div>
            </div>

            {/* Daily Progress Visualization */}
            <h3 className="text-lg font-medium text-slate-800 mt-6 mb-4">Daily Progress</h3>
            <div className="space-y-4">
              {/* Foundation Progress */}
              <div className="bg-slate-50 rounded-lg p-3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">Foundation</span>
                  <span className="text-sm font-medium text-slate-700">75%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div
                    className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500 hover:bg-emerald-600"
                    style={{ width: '75%' }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>15/20 tasks</span>
                  <span>Completed</span>
                </div>
              </div>
              
              {/* Framing Progress */}
              <div className="bg-slate-50 rounded-lg p-3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">Framing</span>
                  <span className="text-sm font-medium text-slate-700">45%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div
                    className="bg-amber-500 h-2.5 rounded-full transition-all duration-500 hover:bg-amber-600"
                    style={{ width: '45%' }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>9/20 tasks</span>
                  <span>Completed</span>
                </div>
              </div>
              
              {/* Tasks Progress */}
              <div className="bg-slate-50 rounded-lg p-3">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">Daily Tasks</span>
                  <span className="text-sm font-medium text-slate-700">68%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full transition-all duration-500 hover:bg-blue-600"
                    style={{ width: '68%' }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>34/50 tasks</span>
                  <span>Completed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6 card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Recent Activity</h2>
              <button className="text-sm text-teal-600 hover:text-teal-800 font-medium cursor-pointer" onClick={() => router.push('/reports')}>
                View All
              </button>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
              {activity.map((item: any) => (
                <div 
                  key={item.id} 
                  className={`${getActivityColor(item.type, item.status)} pl-4 py-3 bg-slate-50 rounded-lg transition-all duration-300 hover:shadow-md animate-fade-in cursor-pointer`}
                  onClick={() => {
                    // Navigate to appropriate page based on activity type
                    switch(item.type) {
                      case 'task':
                        router.push('/tasks');
                        break;
                      case 'project':
                        router.push('/projects');
                        break;
                      case 'team':
                        router.push('/team');
                        break;
                      default:
                        router.push('/reports');
                    }
                  }}
                >
                  <div className="flex justify-between">
                    <h3 className="font-medium text-slate-800">{item.title}</h3>
                    <span className="text-xs text-slate-500">{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Recent Tasks */}
            <h3 
              className="text-lg font-medium text-slate-800 mt-6 mb-4 cursor-pointer hover:text-teal-600 transition-colors" 
              onClick={() => router.push('/tasks')}
            >
              Recent Tasks
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Project</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Task</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Assigned To</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {tasks.slice(0, 5).map((task: any) => (
                    <tr 
                      key={task.id} 
                      className="hover:bg-slate-50 transition-all duration-300 cursor-pointer"
                      onClick={() => router.push(`/tasks/${task.id}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">{task.projectName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {task.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {task.assignedTo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getDepartmentClass(task.department)}`}>
                          {task.department}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getPriorityClass(task.priority)}`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${getStatusClass(task.status)}`}>
                          {task.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Construction Analytics */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Construction Analytics</h2>
              <div className="flex space-x-2">
                <button className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-600">
                  7D
                </button>
                <button className="text-xs px-2 py-1 rounded bg-slate-100 text-slate-600">
                  30D
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="font-medium text-slate-700 mb-3">Project Completion Rate</h3>
                <div className="h-64">
                  <div className="flex items-end h-5/6 space-x-1">
                    {[74, 81, 69, 76, 70, 88, 84].map((value, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div 
                          className="w-full bg-gradient-to-t from-teal-500 to-teal-600 rounded-t transition-all duration-300"
                          style={{ height: `${value}%` }}
                        ></div>
                        <div className="text-xs text-slate-500 mt-2">Oct {10 + index}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>Actual Completed</span>
                    <span>Predicted Rate</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-slate-700 mb-3">Project Workload Distribution</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700">Foundation Phase</span>
                      <span className="text-sm font-medium text-slate-700">15/20 crew</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                      <div className="bg-emerald-500 h-2.5 rounded-full" style={{width: '75%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700">Framing Phase</span>
                      <span className="text-sm font-medium text-slate-700">9/20 crew</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                      <div className="bg-amber-500 h-2.5 rounded-full" style={{width: '45%'}}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium text-slate-700">Electrical Phase</span>
                      <span className="text-sm font-medium text-slate-700">12/18 crew</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{width: '67%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium text-slate-700 mb-3">Predictive Insights</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-sm text-slate-600">Based on project forecasts, you may need 3 additional workers for the electrical phase next week</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-sm text-slate-600">Tuesday typically has 15% higher task completion than other weekdays</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-sm text-slate-600">Consider pre-allocating resources for foundation work during rainy season</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Performance Leaderboard */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Team Performance Leaderboard</h2>
              <div className="flex space-x-2">
                <button className="text-xs px-3 py-1 rounded bg-teal-100 text-teal-800">
                  All Departments
                </button>
                <button className="text-xs px-3 py-1 rounded bg-slate-100 text-slate-600">
                  Day
                </button>
                <button className="text-xs px-3 py-1 rounded bg-slate-100 text-slate-600">
                  Week
                </button>
                <button className="text-xs px-3 py-1 rounded bg-slate-100 text-slate-600">
                  Month
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Rank</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Team Member</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Performance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Tasks</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Avg. Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Badges</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center text-white font-bold">#1</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold">R</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">Raj Sharma</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Foundation</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      96%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      42
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      18 min
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      <div className="flex space-x-1">
                        <span className="px-2 py-1 text-xs rounded bg-emerald-100 text-emerald-800">Speed</span>
                        <span className="px-2 py-1 text-xs rounded bg-emerald-100 text-emerald-800">Perfect</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-300 to-slate-400 flex items-center justify-center text-white font-bold">#2</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold">A</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">Amit Patel</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">Framing</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      94%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      45
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      22 min
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      <div className="flex space-x-1">
                        <span className="px-2 py-1 text-xs rounded bg-emerald-100 text-emerald-800">Early Bird</span>
                        <span className="px-2 py-1 text-xs rounded bg-emerald-100 text-emerald-800">Team</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-700 to-amber-800 flex items-center justify-center text-white font-bold">#3</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold">S</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">Suresh Kumar</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">Electrical</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      92%
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      38
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      25 min
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      <div className="flex space-x-1">
                        <span className="px-2 py-1 text-xs rounded bg-emerald-100 text-emerald-800">Problem Solver</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium text-slate-700 mb-3">Achievement Badges</h3>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center bg-slate-50 rounded-lg px-3 py-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                  <span className="text-sm text-slate-700">Speed - Completed 10+ tasks in under 20 min</span>
                </div>
                <div className="flex items-center bg-slate-50 rounded-lg px-3 py-2">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
                  <span className="text-sm text-slate-700">Perfect - 95%+ performance for 3 consecutive days</span>
                </div>
                <div className="flex items-center bg-slate-50 rounded-lg px-3 py-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm text-slate-700">Problem Solver - Resolved 5+ complex tasks</span>
                </div>
                <div className="flex items-center bg-slate-50 rounded-lg px-3 py-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                  <span className="text-sm text-slate-700">Early Bird - First to complete 5 tasks each day</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-rose-500 card cursor-pointer hover:shadow-lg transition duration-300 transform hover:-translate-y-1" onClick={() => router.push('/tasks')}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Overdue Tasks</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.maintenanceRequests}</p>
              </div>
              <div className="bg-rose-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-rose-500">3 critical</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-amber-500 card cursor-pointer hover:shadow-lg transition duration-300 transform hover:-translate-y-1" onClick={() => router.push('/analytics')}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Avg. Response Time</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.avgResponseTime} min</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-emerald-500">↓ 12 min from last week</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-emerald-500 card cursor-pointer hover:shadow-lg transition duration-300 transform hover:-translate-y-1" onClick={() => router.push('/reports')}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Quality Rating</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.qualityRating}%</p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10h-2M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-emerald-500">↑ 3% from last week</span>
            </div>
          </div>
        </div>
        </div>
    </ResponsiveSidebarLayout>
  )
}