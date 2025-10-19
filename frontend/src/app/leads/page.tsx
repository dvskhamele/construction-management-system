'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import UserLayout from '../../components/UserLayout'

export default function LeadsManagement() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)
  
  useEffect(() => {
    // Check if user is authenticated by looking for token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Mock user data for prototype - in real app, you'd decode the JWT or make API call
      setUser({ name: 'Sales Executive', role: 'ADMIN' });
      setIsLoggedIn(true);
    } else {
      // If no token, redirect to login
      router.push('/login');
    }
  }, [])
  const [leads, setLeads] = useState<any[]>([
    {
      id: 1,
      name: 'Meridian Properties',
      contact: 'Robert Chen',
      title: 'Project Director',
      phone: '+1-555-0123',
      email: 'robert.chen@meridian.com',
      companySize: '500-1000',
      industry: 'Real Estate Development',
      source: 'Referral',
      status: 'Qualified',
      value: 850000,
      lastContact: '2025-03-18',
      nextFollowUp: '2025-03-25',
      assignedTo: 'You',
      priority: 'HIGH',
      projects: ['Downtown Office Complex'],
      tags: ['Commercial', 'Office'],
      notes: 'Interested in large commercial projects. Decision maker identified.'
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
      source: 'Trade Show',
      status: 'Contacted',
      value: 1200000,
      lastContact: '2025-03-15',
      nextFollowUp: '2025-03-22',
      assignedTo: 'You',
      priority: 'HIGH',
      projects: ['Residential Apartment Block B'],
      tags: ['Residential', 'High-rise'],
      notes: 'Currently evaluating 3 construction partners for upcoming projects.'
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
      source: 'Website',
      status: 'New Lead',
      value: 450000,
      lastContact: '2025-03-10',
      nextFollowUp: '2025-03-17',
      assignedTo: 'You',
      priority: 'MEDIUM',
      projects: ['Retail Center Renovation'],
      tags: ['Renovation', 'Retail'],
      notes: 'Looking for experienced renovation contractor. Initial inquiry received.'
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
      source: 'Cold Call',
      status: 'Qualified',
      value: 2100000,
      lastContact: '2025-03-05',
      nextFollowUp: '2025-03-12',
      assignedTo: 'Sarah Johnson',
      priority: 'HIGH',
      projects: ['Industrial Warehouse'],
      tags: ['Industrial', 'Warehouse'],
      notes: 'Large industrial project opportunity. Strong interest in our capabilities.'
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
      source: 'LinkedIn',
      status: 'Proposal Sent',
      value: 3200000,
      lastContact: '2025-02-28',
      nextFollowUp: '2025-03-07',
      assignedTo: 'You',
      priority: 'HIGH',
      projects: ['Mixed-Use Development'],
      tags: ['Mixed-Use', 'Commercial'],
      notes: 'Proposal sent for mixed-use development. Awaiting feedback.'
    }
  ])
  const [stats, setStats] = useState({
    totalLeads: 42,
    newLeads: 8,
    contacted: 15,
    qualified: 12,
    proposalSent: 7,
    hotLeads: 9,
    warmLeads: 18,
    coldLeads: 15,
    conversionRate: 21
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
      case 'New Lead':
        return 'bg-gray-100 text-gray-800'
      case 'Contacted':
        return 'bg-blue-100 text-blue-800'
      case 'Qualified':
        return 'bg-emerald-100 text-emerald-800'
      case 'Proposal Sent':
        return 'bg-amber-100 text-amber-800'
      case 'Converted':
        return 'bg-indigo-100 text-indigo-800'
      case 'Lost':
        return 'bg-rose-100 text-rose-800'
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

  const getSourceColor = (source: string) => {
    switch (source) {
      case 'Referral':
        return 'bg-teal-100 text-teal-800'
      case 'Trade Show':
        return 'bg-indigo-100 text-indigo-800'
      case 'Website':
        return 'bg-blue-100 text-blue-800'
      case 'Cold Call':
        return 'bg-amber-100 text-amber-800'
      case 'LinkedIn':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredLeads = leads.filter(lead => {
    if (filter === 'all') return true
    if (filter === 'hot') return lead.priority === 'HIGH'
    if (filter === 'warm') return lead.priority === 'MEDIUM'
    if (filter === 'cold') return lead.priority === 'LOW'
    if (filter === 'qualified') return lead.status === 'Qualified'
    if (filter === 'proposals') return lead.status === 'Proposal Sent'
    return true
  })

  return (
    <UserLayout user={user} onLogout={handleLogout}>
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Leads Management</h1>
              <p className="text-slate-600">Manage construction leads, prospects, and clients</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button 
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center"
                onClick={() => router.push('/leads/create')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add New Lead
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-gray-500 card cursor-pointer transform hover:-translate-y-1" onClick={() => setFilter('all')}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Total Leads</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.totalLeads}</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-slate-500">New: {stats.newLeads}</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-blue-500 card cursor-pointer transform hover:-translate-y-1" onClick={() => setFilter('qualified')}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Qualified Leads</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.qualified}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-emerald-500">↑ 3 from last week</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-emerald-500 card cursor-pointer transform hover:-translate-y-1" onClick={() => setFilter('hot')}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Hot Leads</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.hotLeads}</p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zm-9.193-3.515a4 4 0 105.656 0M9 10h.01M15 10h.01" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-slate-500">Warm: {stats.warmLeads}</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-amber-500 card cursor-pointer transform hover:-translate-y-1" onClick={() => setFilter('proposals')}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Proposals Sent</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.proposalSent}</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-emerald-500">Conversion: {stats.conversionRate}%</span>
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
              All Leads
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-lg ${
                filter === 'hot' 
                  ? 'bg-rose-100 text-rose-800 font-medium' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              onClick={() => setFilter('hot')}
            >
              Hot Leads
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-lg ${
                filter === 'qualified' 
                  ? 'bg-emerald-100 text-emerald-800 font-medium' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              onClick={() => setFilter('qualified')}
            >
              Qualified
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-lg ${
                filter === 'proposals' 
                  ? 'bg-amber-100 text-amber-800 font-medium' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              onClick={() => setFilter('proposals')}
            >
              Proposals Sent
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
          {/* Leads List */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6 card">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              {filter === 'all' ? 'All Leads' : 
               filter === 'hot' ? 'Hot Leads' : 
               filter === 'qualified' ? 'Qualified Leads' : 'Proposals Sent'}
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Value</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Last Contact</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {filteredLeads.map((lead) => (
                    <tr 
                      key={lead.id} 
                      className="hover:bg-slate-50 transition cursor-pointer"
                      onClick={() => router.push(`/leads/${lead.id}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                            <span className="text-white font-bold">{lead.name.charAt(0)}</span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-slate-900">{lead.name}</div>
                            <div className="text-sm text-slate-500">{lead.industry} • {lead.companySize}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">{lead.contact}</div>
                        <div className="text-sm text-slate-500">{lead.title}</div>
                        <div className="text-sm text-slate-500">{lead.email}</div>
                        <div className="text-sm text-slate-500">{lead.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        ₹{Math.round(lead.value / 1000)}k
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(lead.status)}`}>
                            {lead.status}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${getSourceColor(lead.source)}`}>
                            {lead.source}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(lead.priority)}`}>
                          {lead.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        <div>{lead.lastContact}</div>
                        <div className="text-xs text-slate-500">Next: {lead.nextFollowUp}</div>
                        <div className="text-xs text-slate-500">Assigned: {lead.assignedTo}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Lead Insights */}
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Lead Insights</h2>
            
            {/* Lead Sources */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-slate-800 mb-3">Lead Sources</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-32 text-sm text-slate-600">Referral</div>
                  <div className="flex-1 ml-2">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-teal-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                  <div className="w-8 text-right text-sm text-slate-600">35%</div>
                </div>
                <div className="flex items-center">
                  <div className="w-32 text-sm text-slate-600">Trade Show</div>
                  <div className="flex-1 ml-2">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                    </div>
                  </div>
                  <div className="w-8 text-right text-sm text-slate-600">25%</div>
                </div>
                <div className="flex items-center">
                  <div className="w-32 text-sm text-slate-600">Website</div>
                  <div className="flex-1 ml-2">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                    </div>
                  </div>
                  <div className="w-8 text-right text-sm text-slate-600">20%</div>
                </div>
                <div className="flex items-center">
                  <div className="w-32 text-sm text-slate-600">Cold Call</div>
                  <div className="flex-1 ml-2">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                  <div className="w-8 text-right text-sm text-slate-600">15%</div>
                </div>
                <div className="flex items-center">
                  <div className="w-32 text-sm text-slate-600">LinkedIn</div>
                  <div className="flex-1 ml-2">
                    <div className="w-full bg-slate-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '5%' }}></div>
                    </div>
                  </div>
                  <div className="w-8 text-right text-sm text-slate-600">5%</div>
                </div>
              </div>
            </div>
            
            {/* Industry Distribution */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-slate-800 mb-3">Industry Distribution</h3>
              <div className="flex items-end h-32 space-x-1 mt-2">
                <div className="flex flex-col items-center flex-1">
                  <div className="text-xs text-slate-500 mb-1">Real Estate</div>
                  <div className="w-full bg-gradient-to-t from-teal-400 to-teal-600 rounded-t transition-all duration-300" style={{ height: '70%' }}></div>
                  <div className="text-xs text-slate-600 mt-1">35%</div>
                </div>
                <div className="flex flex-col items-center flex-1">
                  <div className="text-xs text-slate-500 mb-1">Residential</div>
                  <div className="w-full bg-gradient-to-t from-teal-400 to-teal-600 rounded-t transition-all duration-300" style={{ height: '60%' }}></div>
                  <div className="text-xs text-slate-600 mt-1">30%</div>
                </div>
                <div className="flex flex-col items-center flex-1">
                  <div className="text-xs text-slate-500 mb-1">Retail</div>
                  <div className="w-full bg-gradient-to-t from-teal-400 to-teal-600 rounded-t transition-all duration-300" style={{ height: '40%' }}></div>
                  <div className="text-xs text-slate-600 mt-1">20%</div>
                </div>
                <div className="flex flex-col items-center flex-1">
                  <div className="text-xs text-slate-500 mb-1">Logistics</div>
                  <div className="w-full bg-gradient-to-t from-teal-400 to-teal-600 rounded-t transition-all duration-300" style={{ height: '25%' }}></div>
                  <div className="text-xs text-slate-600 mt-1">12%</div>
                </div>
                <div className="flex flex-col items-center flex-1">
                  <div className="text-xs text-slate-500 mb-1">Mixed-Use</div>
                  <div className="w-full bg-gradient-to-t from-teal-400 to-teal-600 rounded-t transition-all duration-300" style={{ height: '15%' }}></div>
                  <div className="text-xs text-slate-600 mt-1">8%</div>
                </div>
              </div>
            </div>
            
            {/* Recent Activities */}
            <div>
              <h3 className="text-lg font-medium text-slate-800 mb-3">Recent Activities</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-teal-500 pl-4 py-2">
                  <p className="text-sm text-slate-800">Call with Robert Chen (Meridian Properties)</p>
                  <p className="text-xs text-slate-500">2 hours ago</p>
                </div>
                <div className="border-l-4 border-amber-500 pl-4 py-2">
                  <p className="text-sm text-slate-800">Email sent to Sarah Williams (Urban Developments)</p>
                  <p className="text-xs text-slate-500">Yesterday</p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="text-sm text-slate-800">Proposal viewed by Jennifer Park (Tech Storage)</p>
                  <p className="text-xs text-slate-500">2 days ago</p>
                </div>
                <div className="border-l-4 border-emerald-500 pl-4 py-2">
                  <p className="text-sm text-slate-800">New lead added: Downtown Developers LLC</p>
                  <p className="text-xs text-slate-500">3 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lead Management Features */}
        <div className="bg-white rounded-2xl shadow-md p-6 card">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Lead Management Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-slate-200 rounded-lg p-4 text-center hover:shadow-md transition">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-teal-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-medium text-slate-800 mb-2">Lead Capture</h3>
              <p className="text-sm text-slate-600">Capture leads from website forms, emails, and manual entries</p>
            </div>
            
            <div className="border border-slate-200 rounded-lg p-4 text-center hover:shadow-md transition">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="font-medium text-slate-800 mb-2">Qualification</h3>
              <p className="text-sm text-slate-600">Score and qualify leads based on custom criteria and BANT methodology</p>
            </div>
            
            <div className="border border-slate-200 rounded-lg p-4 text-center hover:shadow-md transition">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-medium text-slate-800 mb-2">Follow-up Automation</h3>
              <p className="text-sm text-slate-600">Automated follow-up sequences with email and task reminders</p>
            </div>
            
            <div className="border border-slate-200 rounded-lg p-4 text-center hover:shadow-md transition">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-medium text-slate-800 mb-2">Reporting & Analytics</h3>
              <p className="text-sm text-slate-600">Detailed reports on lead sources, conversion rates, and sales performance</p>
            </div>
          </div>
        </div>
      </main>
    </UserLayout>
  )
}