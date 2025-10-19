'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import UserLayout from '../../components/UserLayout'

export default function OpportunitiesManagement() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<any>(null)
  
  useEffect(() => {
    // Check if user is authenticated by looking for token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Mock user data for prototype - in real app, you'd decode the JWT or make API call
      setUser({ name: 'Sales Manager', role: 'ADMIN' });
      setIsLoggedIn(true);
    } else {
      // If no token, redirect to login
      router.push('/login');
    }
  }, [])
  const [opportunities, setOpportunities] = useState<any[]>([
    {
      id: 1,
      name: 'Downtown Office Complex',
      client: 'Meridian Properties',
      value: 850000,
      stage: 'Proposal Sent',
      probability: 70,
      closeDate: '2025-04-15',
      type: 'Commercial',
      projectManager: 'You',
      lastActivity: '2025-03-18',
      nextActivity: '2025-03-25',
      priority: 'HIGH',
      tags: ['Office', 'Commercial', 'High-rise'],
      notes: 'Client interested in sustainable construction features. Proposal viewed twice.'
    },
    {
      id: 2,
      name: 'Residential Apartment Block B',
      client: 'Urban Developments',
      value: 1200000,
      stage: 'Negotiation',
      probability: 85,
      closeDate: '2025-05-01',
      type: 'Residential',
      projectManager: 'Sarah Johnson',
      lastActivity: '2025-03-15',
      nextActivity: '2025-03-22',
      priority: 'HIGH',
      tags: ['Residential', 'High-rise', 'Mixed-income'],
      notes: 'Finalizing contract terms. Strong interest in our green building certification.'
    },
    {
      id: 3,
      name: 'Retail Center Renovation',
      client: 'City Retail Group',
      value: 450000,
      stage: 'Qualification',
      probability: 40,
      closeDate: '2025-06-15',
      type: 'Renovation',
      projectManager: 'Mike Chen',
      lastActivity: '2025-03-10',
      nextActivity: '2025-03-17',
      priority: 'MEDIUM',
      tags: ['Retail', 'Renovation', 'Interior'],
      notes: 'Initial inquiry. Need to assess scope and timeline. Client has tight budget constraints.'
    },
    {
      id: 4,
      name: 'Industrial Warehouse',
      client: 'Tech Storage Solutions',
      value: 2100000,
      stage: 'Presentation',
      probability: 60,
      closeDate: '2025-05-30',
      type: 'Industrial',
      projectManager: 'Emily Rodriguez',
      lastActivity: '2025-03-05',
      nextActivity: '2025-03-12',
      priority: 'HIGH',
      tags: ['Industrial', 'Warehouse', 'Logistics'],
      notes: 'Presented technical specifications. Client impressed with our automation capabilities.'
    },
    {
      id: 5,
      name: 'Mixed-Use Development',
      client: 'Downtown Developers LLC',
      value: 3200000,
      stage: 'Proposal Sent',
      probability: 55,
      closeDate: '2025-06-20',
      type: 'Mixed-Use',
      projectManager: 'You',
      lastActivity: '2025-02-28',
      nextActivity: '2025-03-07',
      priority: 'HIGH',
      tags: ['Mixed-Use', 'Commercial', 'Residential'],
      notes: 'Large complex project. Multiple stakeholders involved in decision making process.'
    }
  ])
  const [pipeline, setPipeline] = useState<any[]>([
    { stage: 'Prospecting', count: 12, value: 1800000 },
    { stage: 'Qualification', count: 8, value: 2400000 },
    { stage: 'Needs Analysis', count: 6, value: 3200000 },
    { stage: 'Proposal', count: 5, value: 4800000 },
    { stage: 'Negotiation', count: 3, value: 3700000 },
    { stage: 'Closed Won', count: 2, value: 2000000 },
    { stage: 'Closed Lost', count: 1, value: 450000 }
  ])
  const [stats, setStats] = useState({
    totalOpportunities: 37,
    pipelineValue: 12300000,
    weightedPipeline: 7800000,
    closedWon: 2,
    closedLost: 1,
    avgDealSize: 650000,
    winRate: 24,
    forecastAccuracy: 78,
    highPriority: 12
  })
  const [filter, setFilter] = useState('all')
  const [timeRange, setTimeRange] = useState('30d')

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setUser(null)
    router.push('/login')
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Prospecting':
        return 'bg-gray-100 text-gray-800'
      case 'Qualification':
        return 'bg-blue-100 text-blue-800'
      case 'Needs Analysis':
        return 'bg-indigo-100 text-indigo-800'
      case 'Proposal':
        return 'bg-amber-100 text-amber-800'
      case 'Negotiation':
        return 'bg-purple-100 text-purple-800'
      case 'Closed Won':
        return 'bg-emerald-100 text-emerald-800'
      case 'Closed Lost':
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

  const filteredOpportunities = opportunities.filter(opportunity => {
    if (filter === 'all') return true
    if (filter === 'high') return opportunity.priority === 'HIGH'
    if (filter === 'medium') return opportunity.priority === 'MEDIUM'
    if (filter === 'low') return opportunity.priority === 'LOW'
    if (filter === 'proposal') return opportunity.stage === 'Proposal Sent'
    if (filter === 'negotiation') return opportunity.stage === 'Negotiation'
    return true
  })

  return (
    <UserLayout user={user} onLogout={handleLogout}>
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Opportunities Management</h1>
              <p className="text-slate-600">Track and manage construction project opportunities</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button 
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center"
                onClick={() => router.push('/opportunities/create')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                New Opportunity
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-gray-500 card cursor-pointer transform hover:-translate-y-1" onClick={() => setFilter('all')}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Total Opportunities</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.totalOpportunities}</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-slate-500">Pipeline: ₹{Math.round(stats.pipelineValue / 100000)}L</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-blue-500 card cursor-pointer transform hover:-translate-y-1" onClick={() => setFilter('high')}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">High Priority</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.highPriority}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-slate-500">Weighted: ₹{Math.round(stats.weightedPipeline / 100000)}L</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-emerald-500 card cursor-pointer transform hover:-translate-y-1" onClick={() => setFilter('won')}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Closed Won</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.closedWon}</p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-emerald-500">Win rate: {stats.winRate}%</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-amber-500 card cursor-pointer transform hover:-translate-y-1" onClick={() => setFilter('forecast')}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Forecast Accuracy</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.forecastAccuracy}%</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-slate-500">Avg deal: ₹{Math.round(stats.avgDealSize / 1000)}k</span>
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
              All Opportunities
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-lg ${
                filter === 'high' 
                  ? 'bg-rose-100 text-rose-800 font-medium' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              onClick={() => setFilter('high')}
            >
              High Priority
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-lg ${
                filter === 'medium' 
                  ? 'bg-amber-100 text-amber-800 font-medium' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              onClick={() => setFilter('medium')}
            >
              Medium Priority
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-lg ${
                filter === 'proposal' 
                  ? 'bg-amber-100 text-amber-800 font-medium' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              onClick={() => setFilter('proposal')}
            >
              Proposal Stage
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-lg ${
                filter === 'negotiation' 
                  ? 'bg-purple-100 text-purple-800 font-medium' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              onClick={() => setFilter('negotiation')}
            >
              Negotiation
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
          {/* Sales Pipeline */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6 card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Sales Pipeline</h2>
              <button className="text-sm text-teal-600 hover:text-teal-800 font-medium" onClick={() => router.push('/pipeline')}>
                View Full Pipeline
              </button>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {pipeline.map((stage, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="text-center mb-2">
                    <div className="text-lg font-bold text-slate-800">{stage.count}</div>
                    <div className="text-xs text-slate-600">{stage.stage}</div>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-24 flex items-end">
                    <div 
                      className="w-full bg-gradient-to-t from-teal-400 to-teal-600 rounded-t transition-all duration-300"
                      style={{ height: `${(stage.value / Math.max(...pipeline.map(s => s.value))) * 80}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-slate-600 mt-2">₹{Math.round(stage.value / 100000)}L</div>
                </div>
              ))}
            </div>
          </div>

          {/* Opportunities Summary */}
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Opportunities Summary</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">By Project Type</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="w-20 text-xs text-slate-600">Commercial</span>
                    <div className="flex-1 ml-2">
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-teal-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                      </div>
                    </div>
                    <span className="w-8 text-xs text-slate-600 text-right">35%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-20 text-xs text-slate-600">Residential</span>
                    <div className="flex-1 ml-2">
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                      </div>
                    </div>
                    <span className="w-8 text-xs text-slate-600 text-right">28%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-20 text-xs text-slate-600">Industrial</span>
                    <div className="flex-1 ml-2">
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '22%' }}></div>
                      </div>
                    </div>
                    <span className="w-8 text-xs text-slate-600 text-right">22%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-20 text-xs text-slate-600">Renovation</span>
                    <div className="flex-1 ml-2">
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-rose-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                      </div>
                    </div>
                    <span className="w-8 text-xs text-slate-600 text-right">15%</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-600">By Probability</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="w-16 text-xs text-slate-600">80-100%</span>
                    <div className="flex-1 ml-2">
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '18%' }}></div>
                      </div>
                    </div>
                    <span className="w-8 text-xs text-slate-600 text-right">18%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-16 text-xs text-slate-600">60-79%</span>
                    <div className="flex-1 ml-2">
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-teal-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                    <span className="w-8 text-xs text-slate-600 text-right">25%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-16 text-xs text-slate-600">40-59%</span>
                    <div className="flex-1 ml-2">
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: '32%' }}></div>
                      </div>
                    </div>
                    <span className="w-8 text-xs text-slate-600 text-right">32%</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-16 text-xs text-slate-600">0-39%</span>
                    <div className="flex-1 ml-2">
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-rose-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                    <span className="w-8 text-xs text-slate-600 text-right">25%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Opportunities List */}
        <div className="bg-white rounded-2xl shadow-md p-6 card">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">
            {filter === 'all' ? 'All Opportunities' : 
             filter === 'high' ? 'High Priority Opportunities' : 
             filter === 'medium' ? 'Medium Priority Opportunities' : 
             filter === 'proposal' ? 'Proposal Stage Opportunities' : 'Negotiation Stage Opportunities'}
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Opportunity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Stage</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Probability</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Close Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Priority</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredOpportunities.map((opportunity) => (
                  <tr 
                    key={opportunity.id} 
                    className="hover:bg-slate-50 transition cursor-pointer"
                    onClick={() => router.push(`/opportunities/${opportunity.id}`)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">{opportunity.name}</div>
                      <div className="text-sm text-slate-500">{opportunity.type} • PM: {opportunity.projectManager}</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {opportunity.tags.slice(0, 2).map((tag: string, index: number) => (
                          <span key={index} className="px-2 py-0.5 text-xs bg-slate-100 text-slate-600 rounded-full">
                            {tag}
                          </span>
                        ))}
                        {opportunity.tags.length > 2 && (
                          <span className="px-2 py-0.5 text-xs bg-slate-100 text-slate-600 rounded-full">
                            +{opportunity.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">{opportunity.client}</div>
                      <div className="text-sm text-slate-500">
                        Last: {opportunity.lastActivity} • Next: {opportunity.nextActivity}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      ₹{Math.round(opportunity.value / 1000)}k
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStageColor(opportunity.stage)}`}>
                        {opportunity.stage}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-slate-200 rounded-full h-2 mr-2">
                          <div 
                            className="h-2 rounded-full bg-teal-500"
                            style={{ width: `${opportunity.probability}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-slate-600">{opportunity.probability}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {opportunity.closeDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(opportunity.priority)}`}>
                        {opportunity.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Opportunity Management Features */}
        <div className="mt-8 bg-white rounded-2xl shadow-md p-6 card">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Opportunity Management Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-slate-200 rounded-lg p-4 text-center hover:shadow-md transition">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-teal-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="font-medium text-slate-800 mb-2">Pipeline Management</h3>
              <p className="text-sm text-slate-600">Visual sales pipeline with drag-and-drop stage management</p>
            </div>
            
            <div className="border border-slate-200 rounded-lg p-4 text-center hover:shadow-md transition">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-medium text-slate-800 mb-2">Forecasting</h3>
              <p className="text-sm text-slate-600">Accurate revenue forecasting with probability-weighted calculations</p>
            </div>
            
            <div className="border border-slate-200 rounded-lg p-4 text-center hover:shadow-md transition">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-medium text-slate-800 mb-2">Analytics</h3>
              <p className="text-sm text-slate-600">Detailed reports on opportunity performance and conversion rates</p>
            </div>
            
            <div className="border border-slate-200 rounded-lg p-4 text-center hover:shadow-md transition">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-medium text-slate-800 mb-2">Activity Tracking</h3>
              <p className="text-sm text-slate-600">Automatic logging of all opportunity-related activities and communications</p>
            </div>
          </div>
        </div>
      </main>
    </UserLayout>
  )
}