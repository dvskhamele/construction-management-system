'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import UserLayout from '../../components/UserLayout'

export default function ClientsManagement() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)
  
  useEffect(() => {
    // Check if user is authenticated by looking for token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Mock user data for prototype - in real app, you'd decode the JWT or make API call
      setUser({ name: 'Account Manager', role: 'ADMIN' });
      setIsLoggedIn(true);
    } else {
      // If no token, redirect to login
      router.push('/login');
    }
  }, [])
  const [clients, setClients] = useState<any[]>([
    {
      id: 1,
      name: 'Meridian Properties',
      contact: 'Robert Chen',
      title: 'Project Director',
      phone: '+1-555-0123',
      email: 'robert.chen@meridian.com',
      companySize: '500-1000',
      industry: 'Real Estate Development',
      address: '123 Business Ave, Suite 100, New York, NY 10001',
      website: 'www.meridianproperties.com',
      status: 'Active',
      relationship: 'Long-term',
      value: 3200000,
      projects: 3,
      lastProject: 'Downtown Office Complex',
      nextFollowUp: '2025-03-25',
      assignedTo: 'You',
      priority: 'HIGH',
      tags: ['Commercial', 'Office', 'Repeat'],
      notes: 'Excellent long-term client with multiple ongoing projects. Strong relationship with decision makers.',
      contracts: 2,
      activeContracts: 1,
      contractValue: 850000
    },
    {
      id: 2,
      name: 'Urban Developments',
      contact: 'Sarah Williams',
      title: 'VP of Construction',
      phone: '+1-555-0124',
      email: 'sarah.williams@urbandevel.com',
      companySize: '200-500',
      industry: 'Residential Development',
      address: '456 Development Blvd, Chicago, IL 60601',
      website: 'www.urbandevelopments.com',
      status: 'Active',
      relationship: 'Established',
      value: 1200000,
      projects: 1,
      lastProject: 'Residential Apartment Block B',
      nextFollowUp: '2025-03-22',
      assignedTo: 'You',
      priority: 'HIGH',
      tags: ['Residential', 'High-rise', 'Established'],
      notes: 'Currently evaluating 3 construction partners for upcoming projects. Strong interest in our capabilities.',
      contracts: 1,
      activeContracts: 1,
      contractValue: 1200000
    },
    {
      id: 3,
      name: 'City Retail Group',
      contact: 'Michael Torres',
      title: 'Facilities Manager',
      phone: '+1-555-0125',
      email: 'm.torres@cityretail.com',
      companySize: '100-200',
      industry: 'Retail',
      address: '789 Retail St, Los Angeles, CA 90001',
      website: 'www.cityretailgroup.com',
      status: 'Active',
      relationship: 'New',
      value: 450000,
      projects: 1,
      lastProject: 'Retail Center Renovation',
      nextFollowUp: '2025-03-17',
      assignedTo: 'You',
      priority: 'MEDIUM',
      tags: ['Renovation', 'Retail', 'New'],
      notes: 'Looking for experienced renovation contractor. Initial inquiry received. Good potential for repeat business.',
      contracts: 1,
      activeContracts: 1,
      contractValue: 450000
    },
    {
      id: 4,
      name: 'Tech Storage Solutions',
      contact: 'Jennifer Park',
      title: 'COO',
      phone: '+1-555-0126',
      email: 'j.park@techstorage.com',
      companySize: '500-1000',
      industry: 'Logistics',
      address: '321 Logistics Way, Houston, TX 77001',
      website: 'www.techstoragesolutions.com',
      status: 'Active',
      relationship: 'Established',
      value: 2100000,
      projects: 1,
      lastProject: 'Industrial Warehouse',
      nextFollowUp: '2025-03-12',
      assignedTo: 'Sarah Johnson',
      priority: 'HIGH',
      tags: ['Industrial', 'Warehouse', 'Established'],
      notes: 'Large industrial project opportunity. Strong interest in our capabilities. Excellent payment history.',
      contracts: 1,
      activeContracts: 1,
      contractValue: 2100000
    },
    {
      id: 5,
      name: 'Downtown Developers LLC',
      contact: 'David Kim',
      title: 'President',
      phone: '+1-555-0127',
      email: 'd.kim@downtowndev.com',
      companySize: '50-100',
      industry: 'Mixed-Use Development',
      address: '654 Mixed Use Ave, Miami, FL 33101',
      website: 'www.downtowndevelopers.com',
      status: 'Inactive',
      relationship: 'Former',
      value: 0,
      projects: 0,
      lastProject: 'Mixed-Use Development',
      nextFollowUp: '2025-03-07',
      assignedTo: 'You',
      priority: 'LOW',
      tags: ['Mixed-Use', 'Commercial', 'Former'],
      notes: 'Previous client with completed projects. No current active projects but good potential for re-engagement.',
      contracts: 0,
      activeContracts: 0,
      contractValue: 0
    }
  ])
  const [stats, setStats] = useState({
    totalClients: 42,
    activeClients: 37,
    inactiveClients: 5,
    highValueClients: 12,
    repeatClients: 28,
    newClients: 5,
    churnRate: 8,
    clientLifetimeValue: 1850000,
    avgProjectValue: 650000,
    satisfactionScore: 92
  })
  const [filter, setFilter] = useState('all')
  const [timeRange, setTimeRange] = useState('30d')


  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setUser(null)
    router.push('/login')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-100 text-emerald-800'
      case 'Inactive':
        return 'bg-amber-100 text-amber-800'
      case 'Prospect':
        return 'bg-blue-100 text-blue-800'
      case 'Former':
        return 'bg-slate-100 text-slate-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

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

  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case 'Long-term':
        return 'bg-teal-100 text-teal-800'
      case 'Established':
        return 'bg-indigo-100 text-indigo-800'
      case 'New':
        return 'bg-amber-100 text-amber-800'
      case 'Former':
        return 'bg-slate-100 text-slate-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredClients = clients.filter(client => {
    if (filter === 'all') return true
    if (filter === 'active') return client.status === 'Active'
    if (filter === 'inactive') return client.status === 'Inactive'
    if (filter === 'high') return client.priority === 'HIGH'
    if (filter === 'repeat') return client.relationship === 'Long-term' || client.relationship === 'Established'
    if (filter === 'new') return client.relationship === 'New'
    return true
  })

  return (
    <UserLayout user={user} onLogout={handleLogout}>
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Clients Management</h1>
              <p className="text-slate-600">Manage construction clients and relationships</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button 
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center"
                onClick={() => router.push('/clients/create')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add New Client
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-gray-500 card cursor-pointer transform hover:-translate-y-1" onClick={() => setFilter('all')}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Total Clients</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.totalClients}</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-slate-500">Active: {stats.activeClients}</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-emerald-500 card cursor-pointer transform hover:-translate-y-1" onClick={() => setFilter('active')}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Active Clients</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.activeClients}</p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-emerald-500">↑ 3 from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-amber-500 card cursor-pointer transform hover:-translate-y-1" onClick={() => setFilter('high')}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">High Value Clients</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.highValueClients}</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-slate-500">Value: ₹{Math.round(stats.clientLifetimeValue / 100000)}L</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-teal-500 card cursor-pointer transform hover:-translate-y-1" onClick={() => setFilter('repeat')}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Repeat Clients</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.repeatClients}</p>
              </div>
              <div className="bg-teal-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.586 9M4 4a8 8 0 0115.414 3M4 4h16m-9 4v12a1 1 0 001 1h2a1 1 0 001-1V8m-9 0h9m-9 0H3m9 0h3m-3 0a1 1 0 01-1-1V8a1 1 0 011-1m3 0a1 1 0 011 1v12a1 1 0 01-1 1m-3 0h3" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-emerald-500">Retention: {100 - stats.churnRate}%</span>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center justify-between mb-6 bg-white rounded-2xl shadow-md p-4">
          <div className="flex flex-wrap space-x-2 mb-2 sm:mb-0">
            <button 
              className={`px-3 py-1 text-sm rounded-lg ${
                filter === 'all' 
                  ? 'bg-teal-100 text-teal-800 font-medium' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              onClick={() => setFilter('all')}
            >
              All Clients
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-lg ${
                filter === 'active' 
                  ? 'bg-emerald-100 text-emerald-800 font-medium' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-lg ${
                filter === 'inactive' 
                  ? 'bg-amber-100 text-amber-800 font-medium' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              onClick={() => setFilter('inactive')}
            >
              Inactive
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-lg ${
                filter === 'high' 
                  ? 'bg-rose-100 text-rose-800 font-medium' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              onClick={() => setFilter('high')}
            >
              High Value
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-lg ${
                filter === 'repeat' 
                  ? 'bg-indigo-100 text-indigo-800 font-medium' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              onClick={() => setFilter('repeat')}
            >
              Repeat Clients
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-lg ${
                filter === 'new' 
                  ? 'bg-amber-100 text-amber-800 font-medium' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              onClick={() => setFilter('new')}
            >
              New Clients
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-600">Time Range:</span>
            <select 
              className="border border-slate-300 rounded-lg px-2 py-1 text-sm"
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Client List */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6 card">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              {filter === 'all' ? 'All Clients' : 
               filter === 'active' ? 'Active Clients' : 
               filter === 'inactive' ? 'Inactive Clients' : 
               filter === 'high' ? 'High Value Clients' : 
               filter === 'repeat' ? 'Repeat Clients' : 'New Clients'}
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Projects</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Value</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Relationship</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Next Follow-up</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {filteredClients.map((client) => (
                    <tr 
                      key={client.id} 
                      className="hover:bg-slate-50 transition cursor-pointer"
                      onClick={() => router.push(`/clients/${client.id}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                            <span className="text-white font-bold">{client.name.charAt(0)}</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-slate-900">{client.name}</div>
                            <div className="text-sm text-slate-500">{client.industry} • {client.companySize}</div>
                            <div className="text-sm text-slate-500">{client.website}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">{client.contact}</div>
                        <div className="text-sm text-slate-500">{client.title}</div>
                        <div className="text-sm text-slate-500">{client.email}</div>
                        <div className="text-sm text-slate-500">{client.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-600">{client.projects} projects</div>
                        <div className="text-sm text-slate-500">Last: {client.lastProject}</div>
                        <div className="text-sm text-slate-500">Contracts: {client.activeContracts}/{client.contracts}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        ₹{Math.round(client.value / 1000)}k
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(client.status)}`}>
                            {client.status}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(client.priority)}`}>
                            {client.priority}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getRelationshipColor(client.relationship)}`}>
                          {client.relationship}
                        </span>
                        <div className="text-xs text-slate-500 mt-1">Assigned: {client.assignedTo}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        <div>{client.nextFollowUp}</div>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {client.tags.slice(0, 2).map((tag: string, index: number) => (
                            <span key={index} className="px-1.5 py-0.5 text-xs bg-slate-100 text-slate-600 rounded-full">
                              {tag}
                            </span>
                          ))}
                          {client.tags.length > 2 && (
                            <span className="px-1.5 py-0.5 text-xs bg-slate-100 text-slate-600 rounded-full">
                              +{client.tags.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Client Insights */}
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Client Insights</h2>
            
            {/* Industry Distribution */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-slate-800 mb-3">Industry Distribution</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-32 text-sm text-slate-600">Real Estate</div>
                  <div className="flex-1 ml-2">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-teal-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                  <div className="w-8 text-right text-sm text-slate-600">35%</div>
                </div>
                <div className="flex items-center">
                  <div className="w-32 text-sm text-slate-600">Residential</div>
                  <div className="flex-1 ml-2">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                    </div>
                  </div>
                  <div className="w-8 text-right text-sm text-slate-600">28%</div>
                </div>
                <div className="flex items-center">
                  <div className="w-32 text-sm text-slate-600">Retail</div>
                  <div className="flex-1 ml-2">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: '18%' }}></div>
                    </div>
                  </div>
                  <div className="w-8 text-right text-sm text-slate-600">18%</div>
                </div>
                <div className="flex items-center">
                  <div className="w-32 text-sm text-slate-600">Logistics</div>
                  <div className="flex-1 ml-2">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                    </div>
                  </div>
                  <div className="w-8 text-right text-sm text-slate-600">12%</div>
                </div>
                <div className="flex items-center">
                  <div className="w-32 text-sm text-slate-600">Mixed-Use</div>
                  <div className="flex-1 ml-2">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-rose-500 h-2 rounded-full" style={{ width: '7%' }}></div>
                    </div>
                  </div>
                  <div className="w-8 text-right text-sm text-slate-600">7%</div>
                </div>
              </div>
            </div>
            
            {/* Client Health */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-slate-800 mb-3">Client Health</h3>
              <div className="flex items-end h-32 space-x-1 mt-2">
                <div className="flex flex-col items-center flex-1">
                  <div className="text-xs text-slate-500 mb-1">Excellent</div>
                  <div className="w-full bg-gradient-to-t from-emerald-400 to-emerald-600 rounded-t transition-all duration-300" style={{ height: '65%' }}></div>
                  <div className="text-xs text-slate-600 mt-1">22</div>
                </div>
                <div className="flex flex-col items-center flex-1">
                  <div className="text-xs text-slate-500 mb-1">Good</div>
                  <div className="w-full bg-gradient-to-t from-teal-400 to-teal-600 rounded-t transition-all duration-300" style={{ height: '50%' }}></div>
                  <div className="text-xs text-slate-600 mt-1">15</div>
                </div>
                <div className="flex flex-col items-center flex-1">
                  <div className="text-xs text-slate-500 mb-1">Fair</div>
                  <div className="w-full bg-gradient-to-t from-amber-400 to-amber-600 rounded-t transition-all duration-300" style={{ height: '30%' }}></div>
                  <div className="text-xs text-slate-600 mt-1">8</div>
                </div>
                <div className="flex flex-col items-center flex-1">
                  <div className="text-xs text-slate-500 mb-1">At Risk</div>
                  <div className="w-full bg-gradient-to-t from-rose-400 to-rose-600 rounded-t transition-all duration-300" style={{ height: '15%' }}></div>
                  <div className="text-xs text-slate-600 mt-1">3</div>
                </div>
              </div>
            </div>
            
            {/* Recent Activities */}
            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-3">Recent Activities</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-teal-500 pl-4 py-2">
                  <p className="text-sm text-slate-800">Proposal viewed by Robert Chen (Meridian Properties)</p>
                  <p className="text-xs text-slate-500">2 hours ago</p>
                </div>
                <div className="border-l-4 border-amber-500 pl-4 py-2">
                  <p className="text-sm text-slate-800">Email sent to Sarah Williams (Urban Developments)</p>
                  <p className="text-xs text-slate-500">Yesterday</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="text-sm text-slate-800">Contract signed with Jennifer Park (Tech Storage)</p>
                  <p className="text-xs text-slate-500">2 days ago</p>
                </div>
                <div className="border-l-4 border-emerald-500 pl-4 py-2">
                  <p className="text-sm text-slate-800">Follow-up call with Michael Torres (City Retail)</p>
                  <p className="text-xs text-slate-500">3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Client Management Features */}
        <div className="bg-white rounded-2xl shadow-md p-6 card">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Client Management Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-slate-200 rounded-lg p-4 text-center hover:shadow-md transition">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-teal-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-medium text-slate-800 mb-2">Client Profiles</h3>
              <p className="text-sm text-slate-600">Comprehensive client profiles with contact details, project history, and notes</p>
            </div>
            
            <div className="border border-slate-200 rounded-lg p-4 text-center hover:shadow-md transition">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-medium text-slate-800 mb-2">Contract Management</h3>
              <p className="text-sm text-slate-600">Store and manage contracts, track renewals, and maintain contract history</p>
            </div>
            
            <div className="border border-slate-200 rounded-lg p-4 text-center hover:shadow-md transition">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-medium text-slate-800 mb-2">Analytics</h3>
              <p className="text-sm text-slate-600">Detailed client analytics with lifetime value, retention rates, and satisfaction scores</p>
            </div>
            
            <div className="border border-slate-200 rounded-lg p-4 text-center hover:shadow-md transition">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-medium text-slate-800 mb-2">Follow-up Automation</h3>
              <p className="text-sm text-slate-600">Automated follow-up schedules with email reminders and task assignments</p>
            </div>
          </div>
        </div>
      </main>
    </UserLayout>
  )
}