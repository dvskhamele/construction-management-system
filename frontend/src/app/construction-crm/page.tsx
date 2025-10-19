'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import UserLayout from '../../components/UserLayout'

export default function ConstructionCRMDashboard() {
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
  const [stats, setStats] = useState({
    totalLeads: 0,
    activeOpportunities: 0,
    bidsSubmitted: 0,
    bidsWon: 0,
    proposalsSent: 0,
    proposalsViewed: 0,
    pendingFollowUps: 0,
    estimatedRevenue: 0,
    pipelineValue: 0,
    winRate: 0,
    quotaRemaining: 0
  })
  const [opportunities, setOpportunities] = useState<any[]>([])
  const [leads, setLeads] = useState<any[]>([])
  const [proposals, setProposals] = useState<any[]>([])
  const [followUps, setFollowUps] = useState<any[]>([])
  const [pipeline, setPipeline] = useState<any[]>([])
  const [timeRange, setTimeRange] = useState('30d')

  // Mock data initialization
  useEffect(() => {
    // Set mock construction CRM data
    setStats({
      totalLeads: 42,
      activeOpportunities: 18,
      bidsSubmitted: 12,
      bidsWon: 7,
      proposalsSent: 15,
      proposalsViewed: 9,
      pendingFollowUps: 5,
      estimatedRevenue: 1850000,
      pipelineValue: 3200000,
      winRate: 58,
      quotaRemaining: 1250000
    })

    // Mock opportunities data
    setOpportunities([
      {
        id: 1,
        name: 'Downtown Office Complex',
        client: 'Meridian Properties',
        value: 850000,
        stage: 'Proposal Sent',
        probability: 70,
        closeDate: '2025-04-15',
        type: 'Commercial'
      },
      {
        id: 2,
        name: 'Residential Apartment Block B',
        client: 'Urban Developments',
        value: 1200000,
        stage: 'Negotiation',
        probability: 85,
        closeDate: '2025-05-01',
        type: 'Residential'
      },
      {
        id: 3,
        name: 'Retail Center Renovation',
        client: 'City Retail Group',
        value: 450000,
        stage: 'Qualification',
        probability: 40,
        closeDate: '2025-06-15',
        type: 'Renovation'
      }
    ])

    // Mock leads data
    setLeads([
      {
        id: 1,
        name: 'Johnson Construction Leads',
        contact: 'Mike Johnson',
        phone: '+1-555-0123',
        email: 'mike@johnsonconst.com',
        source: 'Referral',
        status: 'Qualified',
        lastContact: '2025-03-18',
        value: 320000
      },
      {
        id: 2,
        name: 'Prime Builders Inc',
        contact: 'Sarah Williams',
        phone: '+1-555-0124',
        email: 'sarah@primebuilders.com',
        source: 'Trade Show',
        status: 'New',
        lastContact: '2025-03-15',
        value: 580000
      }
    ])

    // Mock proposals data
    setProposals([
      {
        id: 1,
        name: 'Office Complex Proposal',
        client: 'Meridian Properties',
        value: 850000,
        status: 'Sent',
        sentDate: '2025-03-10',
        viewed: true,
        followUpDate: '2025-03-25'
      },
      {
        id: 2,
        name: 'Apartment Renovation',
        client: 'ResiMax Group',
        value: 320000,
        status: 'Draft',
        sentDate: null,
        viewed: false,
        followUpDate: null
      }
    ])

    // Mock follow-ups data
    setFollowUps([
      {
        id: 1,
        opportunity: 'Downtown Office Complex',
        client: 'Meridian Properties',
        task: 'Follow up on proposal',
        dueDate: '2025-03-25',
        priority: 'HIGH',
        assignedTo: 'You'
      },
      {
        id: 2,
        opportunity: 'Retail Center Renovation',
        client: 'City Retail Group',
        task: 'Schedule site visit',
        dueDate: '2025-03-22',
        priority: 'MEDIUM',
        assignedTo: 'You'
      }
    ])

    // Mock pipeline data
    setPipeline([
      { stage: 'New Lead', count: 8, value: 420000 },
      { stage: 'Qualified', count: 6, value: 680000 },
      { stage: 'Proposal', count: 4, value: 1450000 },
      { stage: 'Negotiation', count: 3, value: 1200000 },
      { stage: 'Closed Won', count: 2, value: 1100000 }
    ])
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setUser(null)
    router.push('/login')
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'New Lead':
        return 'bg-blue-100 text-blue-800'
      case 'Qualified':
        return 'bg-amber-100 text-amber-800'
      case 'Proposal':
        return 'bg-indigo-100 text-indigo-800'
      case 'Negotiation':
        return 'bg-purple-100 text-purple-800'
      case 'Closed Won':
        return 'bg-emerald-100 text-emerald-800'
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

  return (
    <UserLayout user={user} onLogout={handleLogout}>
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Construction CRM Dashboard</h1>
              <p className="text-slate-600">Manage leads, opportunities, bids & proposals</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-500">Last updated:</span>
                <span className="text-sm font-medium text-slate-700">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-blue-500 card cursor-pointer transform hover:-translate-y-1" onClick={() => router.push('/leads')}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Total Leads</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.totalLeads}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-emerald-500">↑ 12% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-amber-500 card cursor-pointer transform hover:-translate-y-1" onClick={() => router.push('/opportunities')}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Active Opportunities</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.activeOpportunities}</p>
              </div>
              <div className="bg-amber-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-slate-500">Pipeline value: ₹{stats.pipelineValue.toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-emerald-500 card cursor-pointer transform hover:-translate-y-1" onClick={() => router.push('/bids')}>
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
              <span className="text-xs text-emerald-500">Win rate: {stats.winRate}%</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border-l-4 border-indigo-500 card cursor-pointer transform hover:-translate-y-1" onClick={() => router.push('/proposals')}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Proposals Sent</p>
                <p className="text-3xl font-bold text-slate-800 mt-1">{stats.proposalsSent}</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-xs text-amber-500">Viewed: {stats.proposalsViewed}</span>
            </div>
          </div>
        </div>

        {/* Additional Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-4 text-center border border-slate-200">
            <p className="text-lg font-bold text-slate-800">{stats.bidsSubmitted}</p>
            <p className="text-sm text-slate-600">Bids Submitted</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border border-slate-200">
            <p className="text-lg font-bold text-slate-800">{stats.pendingFollowUps}</p>
            <p className="text-sm text-slate-600">Follow-ups</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border border-slate-200">
            <p className="text-lg font-bold text-slate-800">₹{Math.round(stats.estimatedRevenue / 100000)}L</p>
            <p className="text-sm text-slate-600">Est. Revenue</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border border-slate-200">
            <p className="text-lg font-bold text-slate-800">₹{Math.round(stats.quotaRemaining / 100000)}L</p>
            <p className="text-sm text-slate-600">Quota Remaining</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border border-slate-200">
            <p className="text-lg font-bold text-slate-800">{stats.winRate}%</p>
            <p className="text-sm text-slate-600">Win Rate</p>
          </div>
          <div className="bg-white rounded-xl shadow p-4 text-center border border-slate-200">
            <p className="text-lg font-bold text-slate-800">₹{Math.round(stats.pipelineValue / 100000)}L</p>
            <p className="text-sm text-slate-600">Pipeline Value</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Sales Pipeline Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6 card">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Sales Pipeline</h2>
            <div className="grid grid-cols-5 gap-2">
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

          {/* Upcoming Follow-ups */}
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Upcoming Follow-ups</h2>
            <div className="space-y-4">
              {followUps.map((followUp) => (
                <div 
                  key={followUp.id} 
                  className="border-l-4 border-amber-500 pl-4 py-3 bg-slate-50 rounded-lg transition-all duration-300 hover:shadow-sm cursor-pointer"
                  onClick={() => router.push(`/follow-ups/${followUp.id}`)}
                >
                  <div className="flex justify-between">
                    <h3 className="font-medium text-slate-800">{followUp.opportunity}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(followUp.priority)}`}>
                      {followUp.priority}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{followUp.task}</p>
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>{followUp.client}</span>
                    <span>{followUp.dueDate}</span>
                  </div>
                </div>
              ))}
              {followUps.length === 0 && (
                <p className="text-slate-500 text-center py-4">No pending follow-ups</p>
              )}
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Opportunities */}
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Active Opportunities</h2>
              <button className="text-sm text-teal-600 hover:text-teal-800 font-medium" onClick={() => router.push('/opportunities')}>
                View All
              </button>
            </div>
            <div className="space-y-3">
              {opportunities.map((opportunity) => (
                <div 
                  key={opportunity.id} 
                  className="border border-slate-200 rounded-lg p-3 hover:bg-slate-50 transition cursor-pointer"
                  onClick={() => router.push(`/opportunities/${opportunity.id}`)}
                >
                  <div className="flex justify-between">
                    <h3 className="font-medium text-slate-800">{opportunity.name}</h3>
                    <span className="text-sm font-medium text-slate-600">₹{Math.round(opportunity.value / 1000)}k</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{opportunity.client}</p>
                  <div className="flex justify-between mt-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStageColor(opportunity.stage)}`}>
                      {opportunity.stage}
                    </span>
                    <span className="text-xs text-slate-500">{opportunity.closeDate}</span>
                  </div>
                  <div className="mt-2 w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-teal-500 h-2 rounded-full"
                      style={{ width: `${opportunity.probability}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{opportunity.probability}% probability</div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Proposals */}
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Recent Proposals</h2>
              <button className="text-sm text-teal-600 hover:text-teal-800 font-medium" onClick={() => router.push('/proposals')}>
                View All
              </button>
            </div>
            <div className="space-y-3">
              {proposals.map((proposal) => (
                <div 
                  key={proposal.id} 
                  className="border border-slate-200 rounded-lg p-3 hover:bg-slate-50 transition cursor-pointer"
                  onClick={() => router.push(`/proposals/${proposal.id}`)}
                >
                  <div className="flex justify-between">
                    <h3 className="font-medium text-slate-800">{proposal.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      proposal.status === 'Sent' ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {proposal.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 mt-1">{proposal.client}</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm font-medium text-slate-600">₹{Math.round(proposal.value / 1000)}k</span>
                    <span className="text-xs text-slate-500">{proposal.sentDate}</span>
                  </div>
                  <div className="mt-2 flex items-center text-xs text-slate-500">
                    {proposal.viewed ? (
                      <span className="flex items-center text-emerald-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Viewed
                      </span>
                    ) : (
                      <span className="flex items-center text-amber-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Not viewed
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leads Tracking */}
        <div className="mt-6 bg-white rounded-2xl shadow-md p-6 card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-slate-800">Recent Leads</h2>
            <button className="text-sm text-teal-600 hover:text-teal-800 font-medium" onClick={() => router.push('/leads')}>
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Source</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Last Contact</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition cursor-pointer" onClick={() => router.push(`/leads/${lead.id}`)}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">{lead.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-600">{lead.contact}</div>
                      <div className="text-sm text-slate-500">{lead.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      ₹{Math.round(lead.value / 1000)}k
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        lead.status === 'Qualified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{lead.source}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{lead.lastContact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </UserLayout>
  )
}