'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import UserLayout from '../../components/UserLayout'

export default function SmartTaskManager() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [user, setUser] = useState<any>({ name: 'Construction Manager', role: 'ADMIN' })
  
  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setUser(null)
    router.push('/login')
  }

  // For prototype, always allow access to authenticated routes
  React.useEffect(() => {
    const token = localStorage.getItem('token') || 'mock-token';
    localStorage.setItem('token', token);
    
    // Mock user data for prototype
    setUser({ name: 'Construction Manager', role: 'ADMIN' } as any);
    setIsLoggedIn(true)
  }, [])

  // Mock data for construction tasks
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Foundation Excavation',
      description: 'Excavate foundation for new office building',
      project: 'Downtown Office Complex',
      site: 'Site A - Downtown',
      assignedTo: 'Suresh Patel',
      status: 'in_progress',
      priority: 'critical',
      dueDate: '2025-10-25',
      startDate: '2025-10-20',
      estimatedHours: 40,
      actualHours: 25,
      department: 'Foundation',
      type: 'Excavation'
    },
    {
      id: 2,
      title: 'Electrical Rough-In',
      description: 'Install electrical conduits and wiring',
      project: 'Downtown Office Complex',
      site: 'Site A - Downtown',
      assignedTo: 'Sarah Johnson',
      status: 'pending',
      priority: 'high',
      dueDate: '2025-11-15',
      startDate: null,
      estimatedHours: 60,
      actualHours: 0,
      department: 'Electrical',
      type: 'Installation'
    },
    {
      id: 3,
      title: 'Plumbing Installation',
      description: 'Install plumbing pipes and fixtures',
      project: 'Residential Apartment Block',
      site: 'Site B - Residential',
      assignedTo: 'Robert Davis',
      status: 'completed',
      priority: 'medium',
      dueDate: '2025-10-18',
      startDate: '2025-10-10',
      estimatedHours: 50,
      actualHours: 48,
      department: 'Plumbing',
      type: 'Installation'
    },
    {
      id: 4,
      title: 'Framing Construction',
      description: 'Construct wooden frame structure',
      project: 'Residential Apartment Block',
      site: 'Site B - Residential',
      assignedTo: 'Maria Garcia',
      status: 'on_hold',
      priority: 'high',
      dueDate: '2025-11-30',
      startDate: '2025-10-22',
      estimatedHours: 80,
      actualHours: 30,
      department: 'Framing',
      type: 'Construction'
    },
    {
      id: 5,
      title: 'HVAC Ductwork',
      description: 'Install heating and cooling ductwork',
      project: 'Industrial Warehouse',
      site: 'Site C - Industrial',
      assignedTo: null,
      status: 'pending',
      priority: 'medium',
      dueDate: '2025-12-15',
      startDate: null,
      estimatedHours: 45,
      actualHours: 0,
      department: 'HVAC',
      type: 'Installation'
    }
  ])

  // Mock data for construction crew members
  const [crewMembers, setCrewMembers] = useState([
    { id: 1, name: 'Rajesh Kumar', role: 'Project Manager', department: 'Management', status: 'active' },
    { id: 2, name: 'Amit Sharma', role: 'Site Supervisor', department: 'Operations', status: 'active' },
    { id: 3, name: 'Suresh Patel', role: 'Excavator Operator', department: 'Foundation', status: 'available' },
    { id: 4, name: 'Sarah Johnson', role: 'Electrician', department: 'Electrical', status: 'busy' },
    { id: 5, name: 'Robert Davis', role: 'Plumber', department: 'Plumbing', status: 'available' },
    { id: 6, name: 'Maria Garcia', role: 'Framer', department: 'Framing', status: 'available' },
    { id: 7, name: 'David Wilson', role: 'HVAC Technician', department: 'HVAC', status: 'on_leave' },
    { id: 8, name: 'Emily Rodriguez', role: 'Painter', department: 'Finishing', status: 'available' }
  ])

  // Mock data for construction projects
  const [projects, setProjects] = useState([
    { id: 1, name: 'Downtown Office Complex', status: 'active' },
    { id: 2, name: 'Residential Apartment Block', status: 'active' },
    { id: 3, name: 'Industrial Warehouse', status: 'planning' },
    { id: 4, name: 'Retail Center Renovation', status: 'on_hold' },
    { id: 5, name: 'Mixed-Use Development', status: 'active' }
  ])

  // Mock data for construction sites
  const [sites, setSites] = useState([
    { id: 1, name: 'Site A - Downtown', location: 'Downtown District', status: 'active' },
    { id: 2, name: 'Site B - Residential', location: 'North Suburbs', status: 'active' },
    { id: 3, name: 'Site C - Industrial', location: 'Industrial Zone', status: 'active' },
    { id: 4, name: 'Site D - Retail', location: 'Shopping District', status: 'inactive' },
    { id: 5, name: 'Site E - Mixed-Use', location: 'City Center', status: 'active' }
  ])

  // State for warnings and recommendations
  const [warnings, setWarnings] = useState<string[]>([])
  const [recommendations, setRecommendations] = useState<string[]>([])

  // Detect warnings and generate recommendations
  useEffect(() => {
    const detectedWarnings: string[] = []
    const generatedRecommendations: string[] = []

    // Check for overdue tasks
    const today = new Date()
    tasks.forEach(task => {
      if (task.status !== 'completed' && task.status !== 'cancelled') {
        const dueDate = new Date(task.dueDate)
        if (dueDate < today) {
          detectedWarnings.push(`Overdue task: "${task.title}" was due on ${task.dueDate}`)
        }
      }
    })

    // Check for unassigned high priority tasks
    tasks.forEach(task => {
      if (!task.assignedTo && (task.priority === 'high' || task.priority === 'critical')) {
        detectedWarnings.push(`Unassigned high priority task: "${task.title}"`)
      }
    })

    // Generate recommendations
    const pendingTasks = tasks.filter(t => t.status === 'pending')
    if (pendingTasks.length > 3) {
      generatedRecommendations.push(`Consider prioritizing ${pendingTasks.length} pending tasks to reduce backlog`)
    }

    const highPriorityTasks = tasks.filter(t => t.priority === 'high' || t.priority === 'critical')
    const unassignedHighPriority = highPriorityTasks.filter(t => !t.assignedTo)
    if (unassignedHighPriority.length > 0) {
      generatedRecommendations.push(`Assign ${unassignedHighPriority.length} high-priority tasks to available crew members`)
    }

    // Check for crew availability
    const availableCrew = crewMembers.filter(crew => crew.status === 'available')
    if (availableCrew.length < 3) {
      generatedRecommendations.push(`Only ${availableCrew.length} crew members available, consider scheduling additional resources`)
    }

    setWarnings(detectedWarnings)
    setRecommendations(generatedRecommendations)
  }, [tasks, crewMembers])

  // Format date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not started'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  // Get status color classes
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-slate-100 text-slate-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-emerald-100 text-emerald-800'
      case 'on_hold': return 'bg-amber-100 text-amber-800'
      case 'cancelled': return 'bg-rose-100 text-rose-800'
      default: return 'bg-slate-100 text-slate-800'
    }
  }

  // Get priority color classes
  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'low': return 'bg-slate-100 text-slate-800'
      case 'medium': return 'bg-blue-100 text-blue-800'
      case 'high': return 'bg-amber-100 text-amber-800'
      case 'critical': return 'bg-rose-100 text-rose-800'
      default: return 'bg-slate-100 text-slate-800'
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-6 text-center text-slate-800">Construction Management Login</h1>
          <form onSubmit={(e) => {
            e.preventDefault()
            // Mock login for prototype - in a real app, this would call the API
            localStorage.setItem('token', 'mock-jwt-token')
            setUser({ name: 'Construction Manager', role: 'ADMIN' } as any)
            setIsLoggedIn(true)
            // Redirect to smart task manager after login
            router.push('/smart-task-manager')
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
              className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 px-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md hover:shadow-lg btn btn-primary"
            >
              Login
            </button>
          </form>
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
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Smart Task Manager</h1>
              <p className="text-slate-600">Manual task management with conflict detection and optimization suggestions for mid-size construction companies (20-50 employees)</p>
            </div>
            <button 
              className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md hover:shadow-lg flex items-center"
              onClick={() => alert('Create new task functionality would be implemented here')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Create Task
            </button>
          </div>
        </div>

        {/* Warnings and Recommendations */}
        {(warnings.length > 0 || recommendations.length > 0) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {warnings.length > 0 && (
              <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
                <h3 className="font-semibold text-rose-800 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Task Management Warnings
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  {warnings.map((warning, index) => (
                    <li key={index} className="text-rose-700 text-sm">{warning}</li>
                  ))}
                </ul>
              </div>
            )}

            {recommendations.length > 0 && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <h3 className="font-semibold text-amber-800 mb-2 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 10a8 8 0 11-16 0 8 8 0 0118 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  Optimization Recommendations
                </h3>
                <ul className="list-disc pl-5 space-y-1">
                  {recommendations.map((rec, index) => (
                    <li key={index} className="text-amber-700 text-sm">{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-teal-500">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-teal-100 text-teal-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-slate-800">{tasks.length}</p>
                <p className="text-sm text-slate-600">Total Tasks</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-slate-800">
                  {tasks.filter(t => t.status === 'in_progress').length}
                </p>
                <p className="text-sm text-slate-600">In Progress</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-amber-500">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-amber-100 text-amber-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-slate-800">
                  {tasks.filter(t => t.status === 'pending').length}
                </p>
                <p className="text-sm text-slate-600">Pending Tasks</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-emerald-500">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-emerald-100 text-emerald-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-slate-800">
                  {tasks.filter(t => t.status === 'completed').length}
                </p>
                <p className="text-sm text-slate-600">Completed Tasks</p>
              </div>
            </div>
          </div>
        </div>

        {/* Task Management Table */}
        <div className="mb-8 bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-xl font-semibold text-slate-800">Task Management</h2>
            <div className="flex flex-wrap gap-3">
              <select 
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                value="all"
                onChange={() => {}}
              >
                <option value="all">All Tasks</option>
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="on_hold">On Hold</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <div className="text-sm text-slate-500">
                Showing {tasks.length} tasks
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Task</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Project/Site</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Assignee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Hours</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {tasks.map(task => (
                  <tr key={task.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">{task.title}</div>
                      <div className="text-sm text-slate-500">{task.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">{task.project}</div>
                      <div className="text-sm text-slate-500">{task.site}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {task.assignedTo || 'Unassigned'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${getPriorityColor(task.priority)}`}>
                        {task.priority.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select 
                        className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(task.status)}`}
                        value={task.status}
                        onChange={(e) => {
                          const newStatus = e.target.value as any
                          setTasks(tasks.map(t => 
                            t.id === task.id 
                              ? { ...t, status: newStatus } 
                              : t
                          ))
                        }}
                      >
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="on_hold">On Hold</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {formatDate(task.dueDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {task.actualHours}/{task.estimatedHours} hrs
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        className="text-teal-600 hover:text-teal-900 mr-3"
                        onClick={() => alert(`Viewing details for ${task.title}`)}
                      >
                        View
                      </button>
                      <button 
                        className="text-rose-600 hover:text-rose-900"
                        onClick={() => alert(`Editing ${task.title}`)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
                {tasks.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 text-center text-sm text-slate-500">
                      No tasks found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Crew Management */}
        <div className="mb-8 bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-slate-800">Crew Management</h2>
            <button 
              className="text-sm text-teal-600 hover:text-teal-800 font-medium"
              onClick={() => router.push('/crew')}
            >
              View All Crew Members
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {crewMembers.slice(0, 4).map(crew => (
              <div key={crew.id} className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition duration-300">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                    <span className="text-white font-bold">{crew.name.charAt(0)}</span>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(crew.status)}`}>
                    {crew.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <h3 className="font-medium text-slate-800 mb-1">{crew.name}</h3>
                <p className="text-sm text-slate-600 mb-3">{crew.role} - {crew.department}</p>
                <div className="text-xs text-slate-500">
                  {crew.status === 'available' 
                    ? 'Available for assignment' 
                    : crew.status === 'busy' 
                    ? 'Currently busy with tasks' 
                    : crew.status === 'on_leave' 
                    ? 'Currently on leave' 
                    : 'Unavailable'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Overview */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-slate-800">Project Overview</h2>
            <button 
              className="text-sm text-teal-600 hover:text-teal-800 font-medium"
              onClick={() => router.push('/projects')}
            >
              View All Projects
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.slice(0, 4).map(project => (
              <div key={project.id} className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition duration-300">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-slate-800 mb-1">{project.name}</h3>
                    <p className="text-sm text-slate-600">{project.status.replace('_', ' ').toUpperCase()}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(project.status)}`}>
                    {project.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  {project.status === 'active' 
                    ? 'Project is actively progressing' 
                    : project.status === 'planning' 
                    ? 'Project in planning phase' 
                    : project.status === 'on_hold' 
                    ? 'Project temporarily paused' 
                    : 'Project completed'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </UserLayout>
  )
}