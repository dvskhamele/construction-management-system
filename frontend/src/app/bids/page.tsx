'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import UserLayout from '../../components/UserLayout'

export default function BidManagement() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [user, setUser] = useState<any>({ name: 'Project Manager', role: 'ADMIN' })
  const [bids, setBids] = useState<any[]>([
    {
      id: 1,
      projectName: 'Downtown Office Complex',
      client: 'Meridian Properties',
      bidAmount: 850000,
      submittedDate: '2025-03-10',
      dueDate: '2025-03-25',
      status: 'Submitted',
      probability: 70,
      projectType: 'Commercial',
      estimatedDuration: '12 months',
      assignedTo: 'You'
    },
    {
      id: 2,
      projectName: 'Residential Apartment Block B',
      client: 'Urban Developments',
      bidAmount: 1200000,
      submittedDate: '2025-03-05',
      dueDate: '2025-03-20',
      status: 'Under Review',
      probability: 85,
      projectType: 'Residential',
      estimatedDuration: '18 months',
      assignedTo: 'You'
    },
    {
      id: 3,
      projectName: 'Retail Center Renovation',
      client: 'City Retail Group',
      bidAmount: 450000,
      submittedDate: '2025-02-28',
      dueDate: '2025-03-15',
      status: 'Awarded',
      probability: 100,
      projectType: 'Renovation',
      estimatedDuration: '8 months',
      assignedTo: 'Sarah Johnson'
    },
    {
      id: 4,
      projectName: 'Industrial Warehouse',
      client: 'Tech Storage Solutions',
      bidAmount: 2100000,
      submittedDate: '2025-02-20',
      dueDate: '2025-03-10',
      status: 'Rejected',
      probability: 0,
      projectType: 'Industrial',
      estimatedDuration: '24 months',
      assignedTo: 'Mike Chen'
    }
  ])
  const [bidCalendar, setBidCalendar] = useState<any[]>([
    {
      date: '2025-03-20',
      event: 'Residential Apartment Bid Decision',
      project: 'Residential Apartment Block B',
      client: 'Urban Developments'
    },
    {
      date: '2025-03-25',
      event: 'Downtown Office Bid Decision',
      project: 'Downtown Office Complex',
      client: 'Meridian Properties'
    },
    {
      date: '2025-03-30',
      event: 'New Bid Submission Deadline',
      project: 'Suburban Shopping Center',
      client: 'Retail Ventures Group'
    }
  ])
  const [stats, setStats] = useState({
    totalBids: 24,
    bidsSubmitted: 18,
    bidsWon: 7,
    bidsLost: 4,
    pendingDecision: 3,
    averageBidValue: 950000,
    winRate: 39,
    estimatedRevenue: 6650000
  })
  const [filter, setFilter] = useState('all')
  const [timeRange, setTimeRange] = useState('30d')

  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setUser(null)
    router.push('/login')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Submitted':
        return 'bg-blue-100 text-blue-800'
      case 'Under Review':
        return 'bg-amber-100 text-amber-800'
      case 'Awarded':
        return 'bg-emerald-100 text-emerald-800'
      case 'Rejected':
        return 'bg-rose-100 text-rose-800'
      case 'Pending':
        return 'bg-indigo-100 text-indigo-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getProbabilityColor = (probability: number) => {
    if (probability >= 80) return 'bg-emerald-500'
    if (probability >= 60) return 'bg-amber-500'
    if (probability >= 40) return 'bg-rose-500'
    return 'bg-gray-500'
  }

  const filteredBids = bids.filter(bid => {
    if (filter === 'all') return true
    if (filter === 'active') return ['Submitted', 'Under Review', 'Pending'].includes(bid.status)
    if (filter === 'won') return bid.status === 'Awarded'
    if (filter === 'lost') return bid.status === 'Rejected'
    return true
  })

  return (
    <UserLayout user={user} onLogout={handleLogout}>
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Bid Management</h1>
              <p className="text-slate-600">Track and manage construction bids and proposals</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button 
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center"
                onClick={() => router.push('/bids/create')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                New Bid
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-blue-500 card cursor-pointer transform hover:-translate-y-1" onClick={() => setFilter('all')}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Total Bids</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.totalBids}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-slate-500">₹{Math.round(stats.averageBidValue / 100000)}L avg value</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-amber-500 card cursor-pointer transform hover:-translate-y-1" onClick={() => setFilter('active')}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Submitted Bids</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.bidsSubmitted}</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-slate-500">{stats.pendingDecision} pending decision</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-emerald-500 card cursor-pointer transform hover:-translate-y-1" onClick={() => setFilter('won')}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Bids Won</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.bidsWon}</p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-emerald-500">₹{Math.round(stats.estimatedRevenue / 100000)}L est. revenue</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-rose-500 card cursor-pointer transform hover:-translate-y-1" onClick={() => setFilter('lost')}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Bids Lost</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.bidsLost}</p>
              </div>
              <div className="bg-rose-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-slate-500">Win rate: {stats.winRate}%</span>
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
              All Bids
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-lg ${
                filter === 'active' 
                  ? 'bg-amber-100 text-amber-800 font-medium' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-lg ${
                filter === 'won' 
                  ? 'bg-emerald-100 text-emerald-800 font-medium' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              onClick={() => setFilter('won')}
            >
              Won
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-lg ${
                filter === 'lost' 
                  ? 'bg-rose-100 text-rose-800 font-medium' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              onClick={() => setFilter('lost')}
            >
              Lost
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
          {/* Bids List */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6 card">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">
              {filter === 'all' ? 'All Bids' : 
               filter === 'active' ? 'Active Bids' : 
               filter === 'won' ? 'Won Bids' : 'Lost Bids'}
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Project</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Client</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Value</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Submitted</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Probability</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {filteredBids.map((bid) => (
                    <tr 
                      key={bid.id} 
                      className="hover:bg-slate-50 transition cursor-pointer"
                      onClick={() => router.push(`/bids/${bid.id}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">{bid.projectName}</div>
                        <div className="text-sm text-slate-500">{bid.projectType} • {bid.estimatedDuration}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{bid.client}</div>
                        <div className="text-sm text-slate-500">Assigned: {bid.assignedTo}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        ₹{Math.round(bid.bidAmount / 1000)}k
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {bid.submittedDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(bid.status)}`}>
                          {bid.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-slate-200 rounded-full h-2 mr-2">
                            <div 
                              className={`h-2 rounded-full ${getProbabilityColor(bid.probability)}`}
                              style={{ width: `${bid.probability}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-slate-600">{bid.probability}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bid Calendar */}
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Bid Calendar</h2>
              <button className="text-sm text-teal-600 hover:text-teal-800 font-medium" onClick={() => router.push('/calendar')}>
                View Full Calendar
              </button>
            </div>
            <div className="space-y-4">
              {bidCalendar.map((event, index) => (
                <div 
                  key={index} 
                  className="border-l-4 border-teal-500 pl-4 py-3 bg-slate-50 rounded-lg transition-all duration-300 hover:shadow-sm cursor-pointer"
                  onClick={() => router.push('/calendar')}
                >
                  <div className="flex justify-between">
                    <h3 className="font-medium text-slate-800">{event.event}</h3>
                    <span className="text-xs text-slate-500">{event.date}</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{event.project}</p>
                  <p className="text-xs text-slate-500 mt-1">{event.client}</p>
                </div>
              ))}
              {bidCalendar.length === 0 && (
                <p className="text-slate-500 text-center py-4">No upcoming bid events</p>
              )}
            </div>
            
            {/* Bid Analytics */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Bid Analytics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Win Rate by Project Type</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="w-24 text-xs text-slate-600">Commercial</span>
                      <div className="flex-1 ml-2">
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                      <span className="w-8 text-xs text-slate-600 text-right">65%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-24 text-xs text-slate-600">Residential</span>
                      <div className="flex-1 ml-2">
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                        </div>
                      </div>
                      <span className="w-8 text-xs text-slate-600 text-right">42%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-24 text-xs text-slate-600">Industrial</span>
                      <div className="flex-1 ml-2">
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div className="bg-rose-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                        </div>
                      </div>
                      <span className="w-8 text-xs text-slate-600 text-right">28%</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Revenue by Quarter</span>
                  </div>
                  <div className="flex items-end h-24 space-x-1 mt-2">
                    <div className="flex flex-col items-center flex-1">
                      <div className="text-xs text-slate-500 mb-1">Q1</div>
                      <div className="w-full bg-gradient-to-t from-teal-400 to-teal-600 rounded-t transition-all duration-300" style={{ height: '60%' }}></div>
                      <div className="text-xs text-slate-600 mt-1">₹4.2M</div>
                    </div>
                    <div className="flex flex-col items-center flex-1">
                      <div className="text-xs text-slate-500 mb-1">Q2</div>
                      <div className="w-full bg-gradient-to-t from-teal-400 to-teal-600 rounded-t transition-all duration-300" style={{ height: '85%' }}></div>
                      <div className="text-xs text-slate-600 mt-1">₹5.8M</div>
                    </div>
                    <div className="flex flex-col items-center flex-1">
                      <div className="text-xs text-slate-500 mb-1">Q3</div>
                      <div className="w-full bg-gradient-to-t from-teal-400 to-teal-600 rounded-t transition-all duration-300" style={{ height: '45%' }}></div>
                      <div className="text-xs text-slate-600 mt-1">₹3.1M</div>
                    </div>
                    <div className="flex flex-col items-center flex-1">
                      <div className="text-xs text-slate-500 mb-1">Q4</div>
                      <div className="w-full bg-gradient-to-t from-teal-400 to-teal-600 rounded-t transition-all duration-300" style={{ height: '70%' }}></div>
                      <div className="text-xs text-slate-600 mt-1">₹4.9M</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bid Management Features */}
        <div className="bg-white rounded-2xl shadow-md p-6 card">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Bid Management Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-slate-200 rounded-lg p-4 text-center hover:shadow-md transition">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-teal-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-medium text-slate-800 mb-2">Bid Creation</h3>
              <p className="text-sm text-slate-600">Create professional construction bids with detailed specifications</p>
            </div>
            
            <div className="border border-slate-200 rounded-lg p-4 text-center hover:shadow-md transition">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-medium text-slate-800 mb-2">Cost Estimation</h3>
              <p className="text-sm text-slate-600">Accurate cost calculations with material, labor, and equipment pricing</p>
            </div>
            
            <div className="border border-slate-200 rounded-lg p-4 text-center hover:shadow-md transition">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-medium text-slate-800 mb-2">Bid Tracking</h3>
              <p className="text-sm text-slate-600">Real-time status updates and notifications for all submitted bids</p>
            </div>
            
            <div className="border border-slate-200 rounded-lg p-4 text-center hover:shadow-md transition">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-medium text-slate-800 mb-2">Analytics & Reporting</h3>
              <p className="text-sm text-slate-600">Detailed reports on bid performance, win rates, and revenue projections</p>
            </div>
          </div>
        </div>
      </main>
    </UserLayout>
  )
}