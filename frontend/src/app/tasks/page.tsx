'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import ResponsiveSidebarLayout from '../../components/ResponsiveSidebarLayout'
import apiService from '../../utils/constructionApiService'

export default function TasksDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [user, setUser] = useState<any>({ name: 'Task Manager', role: 'ADMIN' })
  const [tasks, setTasks] = useState<any[]>([
    {
      id: 1,
      title: 'Foundation Excavation',
      project: 'Downtown Office Complex',
      site: 'Downtown Office Complex - Site A',
      assignee: 'John Smith',
      priority: 'HIGH',
      status: 'IN_PROGRESS',
      dueDate: '2025-03-25',
      startDate: '2025-03-15',
      endDate: '2025-03-25',
      progress: 75,
      estimatedHours: 40,
      actualHours: 30,
      budget: 15000,
      spent: 11250,
      description: 'Excavate foundation for downtown office complex according to blueprint specifications',
      category: 'Excavation',
      dependencies: [],
      subtasks: [
        { id: 101, title: 'Mark excavation boundaries', completed: true },
        { id: 102, title: 'Remove topsoil', completed: true },
        { id: 103, title: 'Excavate to required depth', completed: false }
      ],
      attachments: 3,
      comments: 5,
      lastUpdated: '2025-03-18'
    },
    {
      id: 2,
      title: 'Electrical Rough-In',
      project: 'Residential Apartment Block B',
      site: 'Residential Apartment Block B - Site B',
      assignee: 'Sarah Johnson',
      priority: 'MEDIUM',
      status: 'PENDING',
      dueDate: '2025-04-10',
      startDate: '2025-04-01',
      endDate: '2025-04-10',
      progress: 0,
      estimatedHours: 80,
      actualHours: 0,
      budget: 25000,
      spent: 0,
      description: 'Install electrical conduits and rough-in wiring for residential apartments',
      category: 'Electrical',
      dependencies: [{ id: 1, title: 'Framing Complete' }],
      subtasks: [
        { id: 201, title: 'Install main panel', completed: false },
        { id: 202, title: 'Run conduit through walls', completed: false },
        { id: 203, title: 'Install outlets and switches boxes', completed: false }
      ],
      attachments: 2,
      comments: 2,
      lastUpdated: '2025-03-18'
    },
    {
      id: 3,
      title: 'Final Inspection',
      project: 'Industrial Warehouse',
      site: 'Industrial Warehouse - Site C',
      assignee: 'Mike Chen',
      priority: 'HIGH',
      status: 'COMPLETED',
      dueDate: '2025-03-25',
      startDate: '2025-03-20',
      endDate: '2025-03-25',
      progress: 100,
      estimatedHours: 16,
      actualHours: 18,
      budget: 5000,
      spent: 5625,
      description: 'Conduct final walkthrough and inspection of completed industrial warehouse',
      category: 'Inspection',
      dependencies: [],
      subtasks: [
        { id: 301, title: 'Walkthrough with client', completed: true },
        { id: 302, title: 'Document any punch list items', completed: true },
        { id: 303, title: 'Obtain client sign-off', completed: true }
      ],
      attachments: 5,
      comments: 8,
      lastUpdated: '2025-03-18'
    },
    {
      id: 4,
      title: 'Plumbing Rough-In',
      project: 'Retail Center Renovation',
      site: 'Retail Center Renovation - Site D',
      assignee: 'Emily Rodriguez',
      priority: 'MEDIUM',
      status: 'ON_HOLD',
      dueDate: '2025-04-20',
      startDate: '2025-04-05',
      endDate: '2025-04-20',
      progress: 0,
      estimatedHours: 60,
      actualHours: 0,
      budget: 18000,
      spent: 0,
      description: 'Install plumbing pipes and fixtures for retail center renovation',
      category: 'Plumbing',
      dependencies: [{ id: 2, title: 'Demolition Complete' }],
      subtasks: [
        { id: 401, title: 'Install main water supply lines', completed: false },
        { id: 402, title: 'Install drain, waste, vent piping', completed: false },
        { id: 403, title: 'Install fixtures rough-in', completed: false }
      ],
      attachments: 1,
      comments: 3,
      lastUpdated: '2025-03-18'
    },
    {
      id: 5,
      title: 'HVAC Ductwork Installation',
      project: 'Mixed-Use Development',
      site: 'Mixed-Use Development - Site E',
      assignee: 'David Wilson',
      priority: 'LOW',
      status: 'PLANNING',
      dueDate: '2025-05-15',
      startDate: '2025-05-01',
      endDate: '2025-05-15',
      progress: 0,
      estimatedHours: 120,
      actualHours: 0,
      budget: 35000,
      spent: 0,
      description: 'Install HVAC ductwork system for mixed-use development project',
      category: 'HVAC',
      dependencies: [{ id: 3, title: 'Framing Complete' }],
      subtasks: [
        { id: 501, title: 'Layout ductwork design', completed: false },
        { id: 502, title: 'Install supply ducts', completed: false },
        { id: 503, title: 'Install return air ducts', completed: false },
        { id: 504, title: 'Install exhaust ducts', completed: false }
      ],
      attachments: 4,
      comments: 1,
      lastUpdated: '2025-03-18'
    }
  ])
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('dueDate')
  const [timeRange, setTimeRange] = useState('30d')
  const [selectedTask, setSelectedTask] = useState<any>(null)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [newTask, setNewTask] = useState({
    title: '',
    project: '',
    site: '',
    assignee: '',
    priority: 'MEDIUM',
    status: 'PENDING',
    dueDate: '',
    startDate: '',
    endDate: '',
    estimatedHours: 0,
    budget: 0,
    description: '',
    category: ''
  })
  const [showNewTaskModal, setShowNewTaskModal] = useState(false)

  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setUser(null)
    router.push('/login')
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true
    if (filter === 'pending') return task.status === 'PENDING'
    if (filter === 'inprogress') return task.status === 'IN_PROGRESS'
    if (filter === 'completed') return task.status === 'COMPLETED'
    if (filter === 'onhold') return task.status === 'ON_HOLD'
    if (filter === 'planning') return task.status === 'PLANNING'
    if (filter === 'high') return task.priority === 'HIGH'
    if (filter === 'medium') return task.priority === 'MEDIUM'
    if (filter === 'low') return task.priority === 'LOW'
    return true
  })

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'dueDate') return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    if (sortBy === 'startDate') return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    if (sortBy === 'endDate') return new Date(a.endDate).getTime() - new Date(b.endDate).getTime()
    if (sortBy === 'progress') return b.progress - a.progress
    if (sortBy === 'priority') {
      const priorityOrder: Record<string, number> = { HIGH: 3, MEDIUM: 2, LOW: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    }
    if (sortBy === 'budget') return b.budget - a.budget
    if (sortBy === 'spent') return b.spent - a.spent
    if (sortBy === 'hours') return b.estimatedHours - a.estimatedHours
    return 0
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'bg-rose-100 text-rose-800'
      case 'MEDIUM':
        return 'bg-amber-100 text-amber-800'
      case 'LOW':
        return 'bg-emerald-100 text-emerald-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-slate-100 text-slate-800'
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800'
      case 'COMPLETED':
        return 'bg-emerald-100 text-emerald-800'
      case 'ON_HOLD':
        return 'bg-amber-100 text-amber-800'
      case 'PLANNING':
        return 'bg-indigo-100 text-indigo-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const openTaskModal = (task: any) => {
    setSelectedTask(task)
    setShowTaskModal(true)
  }

  const closeTaskModal = () => {
    setShowTaskModal(false)
    setSelectedTask(null)
  }

  const openNewTaskModal = () => {
    setNewTask({
      title: '',
      project: '',
      site: '',
      assignee: '',
      priority: 'MEDIUM',
      status: 'PENDING',
      dueDate: '',
      startDate: '',
      endDate: '',
      estimatedHours: 0,
      budget: 0,
      description: '',
      category: ''
    })
    setShowNewTaskModal(true)
  }

  const closeNewTaskModal = () => {
    setShowNewTaskModal(false)
    setNewTask({
      title: '',
      project: '',
      site: '',
      assignee: '',
      priority: 'MEDIUM',
      status: 'PENDING',
      dueDate: '',
      startDate: '',
      endDate: '',
      estimatedHours: 0,
      budget: 0,
      description: '',
      category: ''
    })
  }

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would call the API to create a new task
    const newTaskObj = {
      ...newTask,
      id: tasks.length + 1,
      progress: 0,
      actualHours: 0,
      spent: 0,
      subtasks: [],
      attachments: 0,
      comments: 0,
      lastUpdated: new Date().toISOString().split('T')[0]
    }
    setTasks([newTaskObj, ...tasks])
    closeNewTaskModal()
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
            setUser({ name: 'Task Manager', role: 'ADMIN' } as any)
            setIsLoggedIn(true)
            // Redirect to dashboard after login
            router.push('/tasks')
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

  return (
    <ResponsiveSidebarLayout user={user} onLogout={handleLogout}>
      <div className="px-4 py-6">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Tasks Dashboard</h1>
              <p className="text-slate-600">Manage and track all your construction tasks</p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <select 
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button 
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center"
                onClick={openNewTaskModal}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Task
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-2">
              <button 
                className={`text-xs px-3 py-1 rounded-full ${filter === 'all' ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-600'}`}
                onClick={() => setFilter('all')}
              >
                All Tasks
              </button>
              <button 
                className={`text-xs px-3 py-1 rounded-full ${filter === 'pending' ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-600'}`}
                onClick={() => setFilter('pending')}
              >
                Pending
              </button>
              <button 
                className={`text-xs px-3 py-1 rounded-full ${filter === 'inprogress' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-600'}`}
                onClick={() => setFilter('inprogress')}
              >
                In Progress
              </button>
              <button 
                className={`text-xs px-3 py-1 rounded-full ${filter === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'}`}
                onClick={() => setFilter('completed')}
              >
                Completed
              </button>
              <button 
                className={`text-xs px-3 py-1 rounded-full ${filter === 'onhold' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'}`}
                onClick={() => setFilter('onhold')}
              >
                On Hold
              </button>
              <button 
                className={`text-xs px-3 py-1 rounded-full ${filter === 'high' ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-600'}`}
                onClick={() => setFilter('high')}
              >
                High Priority
              </button>
            </div>
            
            <div className="flex space-x-2">
              <select 
                className="text-sm px-3 py-1 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="dueDate">Sort by Due Date</option>
                <option value="startDate">Sort by Start Date</option>
                <option value="endDate">Sort by End Date</option>
                <option value="progress">Sort by Progress</option>
                <option value="priority">Sort by Priority</option>
                <option value="budget">Sort by Budget</option>
                <option value="spent">Sort by Spent</option>
                <option value="hours">Sort by Hours</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tasks Table */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Task</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Site</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Assignee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Progress</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Estimated Hours</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actual Hours</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Budget</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Spent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Attachments</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Comments</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Last Updated</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {sortedTasks.map((task) => (
                  <tr 
                    key={task.id} 
                    className="hover:bg-slate-50 transition cursor-pointer"
                    onClick={() => openTaskModal(task)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">{task.title}</div>
                      <div className="text-sm text-slate-500">{task.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">{task.project}</div>
                      <div className="text-sm text-slate-500">{task.industry}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {task.site}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {task.assignee}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(task.status)}`}>
                        {task.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {new Date(task.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-slate-900">{task.progress}%</div>
                        <div className="ml-2 w-16 bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-teal-500 to-teal-600 h-2 rounded-full" 
                            style={{ width: `${task.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {task.estimatedHours}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {task.actualHours}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      ₹{Math.round(task.budget / 1000)}k
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      ₹{Math.round(task.spent / 1000)}k
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {task.attachments}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {task.comments}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {new Date(task.lastUpdated).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Task Details Modal */}
        {showTaskModal && selectedTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center sticky top-0 bg-white">
                <h3 className="text-lg font-semibold text-slate-800">{selectedTask.title}</h3>
                <button 
                  onClick={closeTaskModal}
                  className="text-slate-400 hover:text-slate-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Task Overview</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-600">Project</p>
                      <p className="font-medium text-slate-800">{selectedTask.project}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Site</p>
                      <p className="font-medium text-slate-800">{selectedTask.site}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Assignee</p>
                      <p className="font-medium text-slate-800">{selectedTask.assignee}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Category</p>
                      <p className="font-medium text-slate-800">{selectedTask.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Priority</p>
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(selectedTask.priority)}`}>
                        {selectedTask.priority}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Status</p>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedTask.status)}`}>
                        {selectedTask.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Description</h4>
                  <p className="text-sm text-slate-600">{selectedTask.description}</p>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Progress</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-600">Progress</p>
                      <div className="flex items-center">
                        <div className="w-32 bg-slate-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-gradient-to-r from-teal-500 to-teal-600 h-2 rounded-full" 
                            style={{ width: `${selectedTask.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-slate-800">{selectedTask.progress}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Due Date</p>
                      <p className="font-medium text-slate-800">{new Date(selectedTask.dueDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Estimated Hours</p>
                      <p className="font-medium text-slate-800">{selectedTask.estimatedHours} hours</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Actual Hours</p>
                      <p className="font-medium text-slate-800">{selectedTask.actualHours} hours</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Financials</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-600">Budget</p>
                      <p className="font-medium text-slate-800">₹{Math.round(selectedTask.budget / 1000)}k</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Spent</p>
                      <p className="font-medium text-slate-800">₹{Math.round(selectedTask.spent / 1000)}k</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Subtasks</h4>
                  <div className="space-y-2">
                    {selectedTask.subtasks.map((subtask: any) => (
                      <div key={subtask.id} className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="h-4 w-4 text-teal-600 rounded focus:ring-teal-500"
                          checked={subtask.completed}
                          readOnly
                        />
                        <span className={`ml-2 text-sm ${subtask.completed ? 'line-through text-slate-500' : 'text-slate-700'}`}>
                          {subtask.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-md font-medium text-slate-800 mb-3">Attachments & Comments</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-600">Attachments</p>
                      <p className="font-medium text-slate-800">{selectedTask.attachments} files</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Comments</p>
                      <p className="font-medium text-slate-800">{selectedTask.comments} comments</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Last Updated</p>
                      <p className="font-medium text-slate-800">{new Date(selectedTask.lastUpdated).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <button 
                    className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-4 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300"
                    onClick={() => router.push(`/tasks/${selectedTask.id}`)}
                  >
                    View Details
                  </button>
                  <button 
                    className="flex-1 border border-slate-300 text-slate-700 py-2 px-4 rounded-lg font-medium hover:bg-slate-50 transition duration-300"
                    onClick={closeTaskModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* New Task Modal */}
        {showNewTaskModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center sticky top-0 bg-white">
                <h3 className="text-lg font-semibold text-slate-800">Create New Task</h3>
                <button 
                  onClick={closeNewTaskModal}
                  className="text-slate-400 hover:text-slate-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleCreateTask} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                      value={newTask.title}
                      onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Project</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                      value={newTask.project}
                      onChange={(e) => setNewTask({...newTask, project: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Site</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                      value={newTask.site}
                      onChange={(e) => setNewTask({...newTask, site: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Assignee</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                      value={newTask.assignee}
                      onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
                    <select
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                      value={newTask.priority}
                      onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                    >
                      <option value="LOW">Low</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HIGH">High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                    <select
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                      value={newTask.status}
                      onChange={(e) => setNewTask({...newTask, status: e.target.value})}
                    >
                      <option value="PENDING">Pending</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="ON_HOLD">On Hold</option>
                      <option value="PLANNING">Planning</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                      value={newTask.category}
                      onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Estimated Hours</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                      value={newTask.estimatedHours}
                      onChange={(e) => setNewTask({...newTask, estimatedHours: parseInt(e.target.value) || 0})}
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Budget (₹)</label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                      value={newTask.budget}
                      onChange={(e) => setNewTask({...newTask, budget: parseInt(e.target.value) || 0})}
                      min="0"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                    rows={3}
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    required
                  ></textarea>
                </div>
                
                <div className="flex space-x-3">
                  <button 
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-4 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300"
                  >
                    Create Task
                  </button>
                  <button 
                    type="button"
                    className="flex-1 border border-slate-300 text-slate-700 py-2 px-4 rounded-lg font-medium hover:bg-slate-50 transition duration-300"
                    onClick={closeNewTaskModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </ResponsiveSidebarLayout>
  )
}