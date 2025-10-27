'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import UserLayout from '../../components/UserLayout'
import { 
  HardHat, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  Star, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Search,
  Plus,
  Send,
  FileText,
  Building,
  Wrench,
  Shield,
  Lock,
  Unlock,
  User,
  Hash,
  Eye
} from 'lucide-react'

export default function ClientDashboardPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)
  
  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setUser(null)
    router.push('/client-login')
  }

  // For prototype, always allow access to authenticated routes
  useEffect(() => {
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
        setUser({ name: 'Client User', role: 'CLIENT' });
        setIsLoggedIn(true);
      }
    } else {
      // If no token, redirect to login
      router.push('/client-login');
    }
  }, []);

  // Mock data for client projects
  const [allProjects] = useState([
    {
      id: 1,
      name: 'Downtown Office Complex',
      client: 'Meridian Properties', // This matches the client name
      value: 8500000,
      status: 'ACTIVE',
      progress: 75,
      startDate: '2025-01-15',
      endDate: '2025-09-30',
      location: 'Downtown District, New York',
      projectManager: 'You',
      teamSize: 12,
      budgetSpent: 6375000,
      budgetRemaining: 2125000,
      issues: 3,
      safetyIncidents: 1,
      qualityRating: 92,
      lastUpdate: '2025-03-18',
      nextMilestone: 'Foundation Completion',
      nextMilestoneDate: '2025-04-15',
      type: 'Commercial',
      phase: 'Foundation',
      department: 'Construction',
      riskLevel: 'MEDIUM'
    },
    {
      id: 2,
      name: 'Residential Apartment Block B',
      client: 'Urban Developments',
      value: 12000000,
      status: 'DELAYED',
      progress: 45,
      startDate: '2025-02-10',
      endDate: '2025-10-15',
      location: 'Suburban Area, Chicago',
      projectManager: 'Sarah Johnson',
      teamSize: 18,
      budgetSpent: 5400000,
      budgetRemaining: 6600000,
      issues: 7,
      safetyIncidents: 2,
      qualityRating: 87,
      lastUpdate: '2025-03-18',
      nextMilestone: 'Structural Framing',
      nextMilestoneDate: '2025-04-20',
      type: 'Residential',
      phase: 'Framing',
      department: 'Construction',
      riskLevel: 'HIGH'
    },
    {
      id: 3,
      name: 'Client Exclusive Project',
      client: 'Meridian Properties', // This also matches the client name
      value: 5000000,
      status: 'ACTIVE',
      progress: 60,
      startDate: '2025-03-01',
      endDate: '2025-08-30',
      location: 'Premium Location, Mumbai',
      projectManager: 'James Wilson',
      teamSize: 10,
      budgetSpent: 3000000,
      budgetRemaining: 2000000,
      issues: 1,
      safetyIncidents: 0,
      qualityRating: 95,
      lastUpdate: '2025-03-18',
      nextMilestone: 'Electrical Work',
      nextMilestoneDate: '2025-05-15',
      type: 'Commercial',
      phase: 'Electrical',
      department: 'Construction',
      riskLevel: 'LOW'
    }
  ])

  // Filter projects based on client
  const [projects] = useState(() => {
    if (!user) return [];
    // In a real app, this would be matched with the client's ID
    // For this prototype, we'll match by email prefix or name
    const clientIdentifier = user.email ? user.email.split('@')[0] : user.name.toLowerCase();
    return allProjects.filter(project => 
      project.client.toLowerCase().includes(clientIdentifier) || 
      project.client.toLowerCase().includes('meridian') // Example filter
    );
  })

  // Mock data for client tasks
  const [allTasks] = useState([
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
      title: 'Client Exclusive Task',
      project: 'Client Exclusive Project',
      site: 'Premium Location, Mumbai',
      assignee: 'James Wilson',
      priority: 'MEDIUM',
      status: 'IN_PROGRESS',
      dueDate: '2025-04-30',
      startDate: '2025-03-20',
      endDate: '2025-04-30',
      progress: 45,
      estimatedHours: 120,
      actualHours: 54,
      budget: 30000,
      spent: 13500,
      description: 'Special client requirements for the premium location project',
      category: 'Client Services',
      dependencies: [{ id: 1, title: 'Foundation Complete' }],
      subtasks: [
        { id: 301, title: 'Review client feedback', completed: true },
        { id: 302, title: 'Adjust specifications', completed: true },
        { id: 303, title: 'Implement changes', completed: false }
      ],
      attachments: 1,
      comments: 3,
      lastUpdated: '2025-03-18'
    }
  ])

  // Filter tasks based on client projects
  const [tasks] = useState(() => {
    if (!user) return [];
    // Filter tasks that belong to the client's projects
    const clientProjectNames = allProjects
      .filter(project => 
        project.client.toLowerCase().includes(user.email ? user.email.split('@')[0] : user.name.toLowerCase()) || 
        project.client.toLowerCase().includes('meridian')
      )
      .map(project => project.name);
    
    return allTasks.filter(task => 
      clientProjectNames.includes(task.project)
    );
  })

  // Mock data for client materials
  const [allMaterials] = useState([
    {
      id: 1,
      name: 'Portland Cement 50kg',
      category: 'Cement & Concrete',
      unit: 'bags',
      quantity: 150,
      allocated: 125,
      minStock: 50,
      maxStock: 200,
      costPerUnit: 350,
      supplierId: 2,
      supplierName: 'BuildPro Materials',
      lastOrdered: '2025-10-15',
      expiryDate: '2026-04-15',
      location: 'Warehouse A - Shelf 3',
      status: 'low_stock',
      qrCode: 'QR001',
      batchNumber: 'CEM20251015',
      notes: 'Standard Portland cement for concrete mixing'
    },
    {
      id: 2,
      name: 'Steel Rods 12mm',
      category: 'Steel & Metals',
      unit: 'kg',
      quantity: 2000,
      allocated: 1800,
      minStock: 1000,
      maxStock: 3000,
      costPerUnit: 75,
      supplierId: 3,
      supplierName: 'Steel Solutions Ltd',
      lastOrdered: '2025-10-10',
      expiryDate: null,
      location: 'Warehouse B - Rack 5',
      status: 'in_stock',
      barcode: 'BAR002',
      batchNumber: 'STE20251010',
      notes: 'High tensile steel rods for reinforcement'
    },
    {
      id: 3,
      name: 'Premium Glass Panels',
      category: 'Finishing',
      unit: 'pieces',
      quantity: 50,
      allocated: 45,
      minStock: 20,
      maxStock: 100,
      costPerUnit: 1500,
      supplierId: 4,
      supplierName: 'Premium Glass Co',
      lastOrdered: '2025-09-25',
      expiryDate: null,
      location: 'Warehouse C - Section 2',
      status: 'in_stock',
      qrCode: 'QR003',
      batchNumber: 'PGL20250925',
      notes: 'Premium quality glass panels for client exclusive project'
    }
  ])

  // Filter materials based on client (for this prototype, we'll use a general approach)
  // In real app, materials would be linked to specific client projects
  const [materials] = useState(() => {
    if (!user) return [];
    // For this prototype, we'll include all materials but in a real app this would filter
    // based on materials allocated to client's projects
    return allMaterials.filter(material => 
      // In a real app: material.projectId in client's projects
      // For prototype: include materials for client's projects
      true
    );
  })

  // Colors for status badges
  const statusColors: { [key: string]: string } = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-emerald-100 text-emerald-800',
    overdue: 'bg-rose-100 text-rose-800',
    cancelled: 'bg-gray-100 text-gray-800'
  };

  const priorityColors: { [key: string]: string } = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-amber-100 text-amber-800',
    high: 'bg-rose-100 text-rose-800',
    urgent: 'bg-rose-100 text-rose-800'
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-emerald-100 text-emerald-800'
      case 'COMPLETED':
        return 'bg-indigo-100 text-indigo-800'
      case 'ON_HOLD':
        return 'bg-rose-100 text-rose-800'
      case 'PLANNING':
        return 'bg-blue-100 text-blue-800'
      case 'DELAYED':
        return 'bg-amber-100 text-amber-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'LOW':
        return 'bg-emerald-100 text-emerald-800'
      case 'MEDIUM':
        return 'bg-amber-100 text-amber-800'
      case 'HIGH':
        return 'bg-rose-100 text-rose-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-6 text-center text-slate-800">Client Portal Login</h1>
          <form onSubmit={(e) => {
            e.preventDefault()
            // Mock login for prototype - in a real app, this would call the API
            localStorage.setItem('token', 'mock-jwt-token-client')
            
            // Set user role as CLIENT
            localStorage.setItem('user', JSON.stringify({
              id: Date.now(),
              email: 'client@example.com',
              name: 'Client User',
              role: 'CLIENT'
            }))
            
            // Redirect to client dashboard
            router.push('/client-dashboard')
          }}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-slate-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                placeholder="Enter your email"
                defaultValue="client@example.com"
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
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Welcome, {user?.name}</h1>
              <p className="text-slate-600">Here's what's happening with your construction projects.</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-500">Last updated:</span>
                <span className="text-sm font-medium text-slate-700">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <button 
                  className="p-1 rounded-full hover:bg-slate-200 transition focus-ring"
                  onClick={() => {}}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h2a1 1 0 011 1v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards - Client-specific view */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div 
            className="bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-4 sm:p-6 border-l-4 border-amber-500 card cursor-pointer transform hover:-translate-y-1" 
            onClick={() => router.push('/projects')}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Active Projects</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{projects.filter(p => p.status === 'ACTIVE').length}</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <Building className="h-6 w-6 text-amber-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-amber-500">+1 from last month</span>
            </div>
          </div>

          <div 
            className="bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-4 sm:p-6 border-l-4 border-blue-500 card cursor-pointer transform hover:-translate-y-1" 
            onClick={() => router.push('/tasks')}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Pending Tasks</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{tasks.filter(t => t.status === 'PENDING' || t.status === 'IN_PROGRESS').length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-emerald-500">↑ 2 from yesterday</span>
            </div>
          </div>

          <div 
            className="bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-4 sm:p-6 border-l-4 border-emerald-500 card cursor-pointer transform hover:-translate-y-1" 
            onClick={() => router.push('/materials')}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Materials In Stock</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{materials.filter(m => m.status === 'in_stock').length}</p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <Wrench className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-emerald-500">Good inventory levels</span>
            </div>
          </div>

          <div 
            className="bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-4 sm:p-6 border-l-4 border-indigo-500 card cursor-pointer transform hover:-translate-y-1" 
            onClick={() => router.push('/projects')}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Project Health</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">
                  {Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length)}%
                </p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-emerald-500">↑ 3% from last week</span>
            </div>
          </div>
        </div>

        {/* Projects Progress - Client view */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Project Progress Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 card">
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
                    <span>Deadline: {new Date(project.endDate).toLocaleDateString()}</span>
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

        {/* Client-Specific Quick Actions - Only tasks and materials */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-md p-6 card">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              {/* View Tasks - Relevant for clients */}
              <div 
                className="bg-gradient-to-br from-teal-500 to-teal-600 text-white py-4 px-4 rounded-xl text-center hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md transform hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => router.push('/tasks')}
              >
                <CheckCircle className="h-8 w-8 mx-auto mb-2" />
                <span className="text-sm font-medium">View Tasks</span>
              </div>
              
              {/* Manage Materials - Relevant for clients */}
              <div 
                className="bg-gradient-to-br from-blue-500 to-blue-600 text-white py-4 px-4 rounded-xl text-center hover:from-blue-600 hover:to-blue-700 transition duration-300 shadow-md transform hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => router.push('/materials')}
              >
                <Wrench className="h-8 w-8 mx-auto mb-2" />
                <span className="text-sm font-medium">Manage Materials</span>
              </div>
              
              {/* Report Issue - Relevant for clients */}
              <div 
                className="bg-gradient-to-br from-rose-500 to-rose-600 text-white py-4 px-4 rounded-xl text-center hover:from-rose-600 hover:to-rose-700 transition duration-300 shadow-md transform hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => {
                  alert('Issue Reporting form opened. Attach photo + select category');
                }}
              >
                <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
                <span className="text-sm font-medium">Report Issue</span>
              </div>
              
              {/* Work Done Today - Relevant for clients */}
              <div 
                className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white py-4 px-4 rounded-xl text-center hover:from-emerald-600 hover:to-emerald-700 transition duration-300 shadow-md transform hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => {
                  alert('Work Done Today form opened. Fill in numbers/pictures/video in 2 clicks');
                }}
              >
                <CheckCircle className="h-8 w-8 mx-auto mb-2" />
                <span className="text-sm font-medium">Work Done Today</span>
              </div>
              
              {/* Material Received - Relevant for clients */}
              <div 
                className="bg-gradient-to-br from-amber-500 to-amber-600 text-white py-4 px-4 rounded-xl text-center hover:from-amber-600 hover:to-amber-700 transition duration-300 shadow-md transform hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => {
                  alert('Material Received form opened. Select vendor + quantity + upload bill photo');
                }}
              >
                <FileText className="h-8 w-8 mx-auto mb-2" />
                <span className="text-sm font-medium">Material Received</span>
              </div>
              
              {/* Update Labour - Relevant for clients */}
              <div 
                className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white py-4 px-4 rounded-xl text-center hover:from-indigo-600 hover:to-indigo-700 transition duration-300 shadow-md transform hover:-translate-y-1 flex flex-col items-center justify-center cursor-pointer"
                onClick={() => {
                  alert('Labour Count form opened. Update daily labour count');
                }}
              >
                <Users className="h-8 w-8 mx-auto mb-2" />
                <span className="text-sm font-medium">Update Labour</span>
              </div>
            </div>
          </div>

          {/* Recent Tasks for Clients */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6 card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Recent Tasks</h2>
              <button className="text-sm text-teal-600 hover:text-teal-800 font-medium cursor-pointer" onClick={() => router.push('/tasks')}>
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Project</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Task</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Assigned To</th>
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
                        {task.assignee}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${priorityColors[task.priority]}`}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs leading-5 font-semibold rounded-full ${statusColors[task.status]}`}>
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

        {/* Materials Overview for Clients */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Materials Overview</h2>
              <button className="text-sm text-teal-600 hover:text-teal-800 font-medium cursor-pointer" onClick={() => router.push('/materials')}>
                View All
              </button>
            </div>
            <div className="space-y-4">
              {materials.map((material) => (
                <div key={material.id} className="border-b border-slate-200 pb-4 last:border-0 last:pb-0">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-slate-800">{material.name}</h3>
                    <span className={`text-sm font-medium ${
                      material.status === 'in_stock' ? 'text-emerald-600' :
                      material.status === 'low_stock' ? 'text-amber-600' :
                      'text-rose-600'
                    }`}>
                      {material.quantity} {material.unit}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Allocated: {material.allocated} {material.unit}</span>
                    <span>Supplier: {material.supplierName}</span>
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          material.status === 'in_stock' ? 'bg-emerald-500' :
                          material.status === 'low_stock' ? 'bg-amber-500' :
                          'bg-rose-500'
                        }`}
                        style={{ width: `${(material.allocated / material.quantity) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Upcoming Deliveries</h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex justify-between">
                  <h3 className="font-medium text-blue-800">Steel Rods 12mm</h3>
                  <span className="text-sm font-medium text-blue-600">2000 kg</span>
                </div>
                <div className="flex justify-between text-sm text-blue-600 mt-1">
                  <span>From: Steel Solutions Ltd</span>
                  <span>Due: 25 Oct 2025</span>
                </div>
              </div>
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex justify-between">
                  <h3 className="font-medium text-amber-800">Portland Cement 50kg</h3>
                  <span className="text-sm font-medium text-amber-600">100 bags</span>
                </div>
                <div className="flex justify-between text-sm text-amber-600 mt-1">
                  <span>From: BuildPro Materials</span>
                  <span>Due: 28 Oct 2025</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}