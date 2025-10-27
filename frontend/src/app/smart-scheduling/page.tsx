'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import UserLayout from '../../components/UserLayout'

export default function SmartSchedulingAssistant() {
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

  // Mock data for construction crew members
  const [crewMembers] = useState([
    { id: 1, name: 'Rajesh Kumar', role: 'Project Manager', department: 'Management', status: 'available', currentTasks: 3, maxTasks: 5 },
    { id: 2, name: 'Amit Sharma', role: 'Site Supervisor', department: 'Operations', status: 'available', currentTasks: 2, maxTasks: 4 },
    { id: 3, name: 'Suresh Patel', role: 'Excavator Operator', department: 'Foundation', status: 'available', currentTasks: 4, maxTasks: 6 },
    { id: 4, name: 'Sarah Johnson', role: 'Electrician', department: 'Electrical', status: 'busy', currentTasks: 5, maxTasks: 5 },
    { id: 5, name: 'Robert Davis', role: 'Plumber', department: 'Plumbing', status: 'available', currentTasks: 2, maxTasks: 6 },
    { id: 6, name: 'Maria Garcia', role: 'Framer', department: 'Framing', status: 'available', currentTasks: 3, maxTasks: 5 },
    { id: 7, name: 'David Wilson', role: 'HVAC Technician', department: 'HVAC', status: 'on_leave', currentTasks: 0, maxTasks: 4 },
    { id: 8, name: 'Emily Rodriguez', role: 'Painter', department: 'Finishing', status: 'available', currentTasks: 1, maxTasks: 3 }
  ])

  // Mock data for construction equipment
  const [equipment] = useState([
    { id: 1, name: 'Excavator CAT 320', type: 'heavy_machinery', status: 'available', location: 'Site A', currentOperator: null },
    { id: 2, name: 'Bulldozer Komatsu D65', type: 'heavy_machinery', status: 'in_use', location: 'Site B', currentOperator: 2 },
    { id: 3, name: 'Crane Liebherr LTM 1120', type: 'heavy_machinery', status: 'maintenance', location: 'Workshop', currentOperator: null },
    { id: 4, name: 'Concrete Mixer JS500', type: 'tools', status: 'available', location: 'Site A', currentOperator: null }
  ])

  // Mock data for construction tasks
  const [tasks] = useState([
    { id: 1, title: 'Foundation Excavation', description: 'Excavate foundation for new office building', priority: 'critical', status: 'in_progress', assignedTo: 3, dueDate: '2025-10-25', estimatedHours: 40, actualHours: 25 },
    { id: 2, title: 'Electrical Rough-In', description: 'Install electrical conduits and wiring', priority: 'high', status: 'pending', assignedTo: 4, dueDate: '2025-11-15', estimatedHours: 60, actualHours: 0 },
    { id: 3, title: 'Plumbing Installation', description: 'Install plumbing pipes and fixtures', priority: 'medium', status: 'completed', assignedTo: 5, dueDate: '2025-10-18', estimatedHours: 50, actualHours: 48 },
    { id: 4, title: 'Framing Construction', description: 'Construct wooden frame structure', priority: 'high', status: 'on_hold', assignedTo: 6, dueDate: '2025-11-30', estimatedHours: 80, actualHours: 30 },
    { id: 5, title: 'HVAC Ductwork', description: 'Install heating and cooling ductwork', priority: 'medium', status: 'pending', assignedTo: null, dueDate: '2025-12-15', estimatedHours: 45, actualHours: 0 }
  ])

  // Mock data for construction projects
  const [projects] = useState([
    { id: 1, name: 'Downtown Office Complex', status: 'active' },
    { id: 2, name: 'Residential Apartment Block', status: 'active' },
    { id: 3, name: 'Industrial Warehouse', status: 'planning' },
    { id: 4, name: 'Retail Center Renovation', status: 'on_hold' },
    { id: 5, name: 'Mixed-Use Development', status: 'active' }
  ])

  // Mock warnings and recommendations
  const [warnings] = useState([
    'Sarah Johnson is fully allocated (5/5 tasks)',
    'Excavator CAT 320 is available but not assigned to any project',
    'Task "HVAC Ductwork" is unassigned but has medium priority'
  ])

  const [recommendations] = useState([
    'Consider reducing workload for Sarah Johnson to prevent burnout',
    'Assign Excavator CAT 320 to active projects',
    'Prioritize 2 pending tasks for Downtown Office Complex project'
  ])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'available': return 'bg-emerald-100 text-emerald-800'
      case 'busy': return 'bg-amber-100 text-amber-800'
      case 'on_leave': return 'bg-slate-100 text-slate-800'
      case 'maintenance': return 'bg-rose-100 text-rose-800'
      case 'in_use': return 'bg-blue-100 text-blue-800'
      default: return 'bg-slate-100 text-slate-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'critical': return 'bg-rose-100 text-rose-800'
      case 'high': return 'bg-amber-100 text-amber-800'
      case 'medium': return 'bg-blue-100 text-blue-800'
      case 'low': return 'bg-slate-100 text-slate-800'
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
            // Redirect to smart scheduling after login
            router.push('/smart-scheduling')
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
              <h1 className="text-3xl font-bold text-slate-800">Smart Scheduling Assistant</h1>
              <p className="text-slate-600">Manual resource planning with conflict detection and optimization suggestions for mid-size construction companies (20-50 employees)</p>
            </div>
            <button 
              className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md hover:shadow-lg flex items-center"
              onClick={() => alert('Create new scheduling functionality would be implemented here')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Create Schedule
            </button>
          </div>
        </div>

        {/* Warnings and Recommendations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {warnings.length > 0 && (
            <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
              <h3 className="font-semibold text-rose-800 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Scheduling Conflicts
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-teal-500">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-teal-100 text-teal-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-slate-800">{crewMembers.length}</p>
                <p className="text-sm text-slate-600">Crew Members</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 01-2 2h-5m-9 0a2 2 0 00-5.356-1.857M19 11V5a2 2 0 00-2-2h-2M5 11v6a2 2 0 002 2h6a2 2 0 002-2v-6a2 2 0 00-2-2H7a2 2 0 00-2 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-slate-800">{equipment.length}</p>
                <p className="text-sm text-slate-600">Equipment</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-amber-500">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-amber-100 text-amber-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-slate-800">
                  {projects.filter(p => p.status === 'active').length}
                </p>
                <p className="text-sm text-slate-600">Active Projects</p>
              </div>
            </div>
          </div>
        </div>

        {/* Task Management */}
        <div className="mb-8 bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-xl font-semibold text-slate-800">Task Management</h2>
            <div className="text-sm text-slate-500">
              Showing {tasks.length} tasks
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Task</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Assigned To</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Hours</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {tasks.map(task => {
                  const assignedCrew = crewMembers.find(crew => crew.id === task.assignedTo)
                  return (
                    <tr key={task.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">{task.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {task.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${getPriorityColor(task.priority)}`}>
                          {task.priority.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        {task.status.replace('_', ' ').toUpperCase()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {assignedCrew ? assignedCrew.name : 'Unassigned'}
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
                  )
                })}
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
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-700">Tasks</span>
                    <span className="font-medium text-slate-800">{crew.currentTasks}/{crew.maxTasks}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        (crew.currentTasks / crew.maxTasks) > 0.8 ? 'bg-rose-500' : 
                        (crew.currentTasks / crew.maxTasks) > 0.6 ? 'bg-amber-500' : 'bg-teal-500'
                      }`}
                      style={{ width: `${Math.min(100, (crew.currentTasks / crew.maxTasks) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-xs text-slate-500">
                  {crew.currentTasks >= crew.maxTasks ? 'Fully allocated' : 
                   crew.currentTasks > crew.maxTasks * 0.8 ? 'Approaching capacity' : 
                   'Available for more tasks'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Equipment Tracking */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-slate-800">Equipment Tracking</h2>
            <button 
              className="text-sm text-teal-600 hover:text-teal-800 font-medium"
              onClick={() => router.push('/equipment')}
            >
              View All Equipment
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {equipment.slice(0, 4).map(equip => {
              const operator = equip.currentOperator 
                ? crewMembers.find(crew => crew.id === equip.currentOperator)?.name 
                : null
              
              return (
                <div key={equip.id} className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition duration-300">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <span className="text-white font-bold">{equip.name.charAt(0)}</span>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(equip.status)}`}>
                      {equip.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-medium text-slate-800 mb-1">{equip.name}</h3>
                  <p className="text-sm text-slate-600 mb-3 capitalize">{equip.type.replace('_', ' ')}</p>
                  <div className="mb-2">
                    <p className="text-sm text-slate-600">{equip.location}</p>
                  </div>
                  {operator && (
                    <div className="mb-2">
                      <p className="text-sm text-slate-600">Operator: {operator}</p>
                    </div>
                  )}
                  <div className="text-xs text-slate-500">
                    {equip.status === 'available' 
                      ? 'Ready for assignment' 
                      : equip.status === 'in_use' 
                      ? 'Currently in operation' 
                      : equip.status === 'maintenance' 
                      ? 'Under maintenance' 
                      : 'Unavailable'}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </main>
    </UserLayout>
  )
}