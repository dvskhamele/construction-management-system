'use client'

import React, { useState, useEffect } from 'react'
import UserLayout from '../../components/UserLayout'
import { useRouter } from 'next/navigation'

export default function Safety() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [user, setUser] = useState<any>({ name: 'Safety Manager', role: 'ADMIN' })
  const [incidents, setIncidents] = useState<any[]>([])
  const [inspections, setInspections] = useState<any[]>([])
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setUser(null)
    router.push('/login')
  }

  useEffect(() => {
    // Mock data for prototype - Safety Incidents
    const mockIncidents = [
      { 
        id: 1, 
        title: 'Fall from Ladder', 
        type: 'Fall', 
        severity: 'HIGH', 
        status: 'Resolved', 
        location: 'Site A - 3rd Floor', 
        date: '2025-03-15', 
        reportedBy: 'John Smith', 
        assignedTo: 'Safety Officer', 
        resolution: 'Worker trained on ladder safety protocols', 
        cost: 25000,
        injury: 'Minor cuts and bruises',
        witness: 'Mike Johnson',
        correctiveActions: ['Ladder inspection protocol', 'Safety harness training'],
        followUp: '2025-03-22'
      },
      { 
        id: 2, 
        title: 'Electrical Shock', 
        type: 'Electrical', 
        severity: 'MEDIUM', 
        status: 'Investigating', 
        location: 'Site B - Electrical Area', 
        date: '2025-03-12', 
        reportedBy: 'Sarah Williams', 
        assignedTo: 'Electrical Supervisor', 
        resolution: '', 
        cost: 0,
        injury: 'Mild shock, no serious injury',
        witness: 'David Wilson',
        correctiveActions: ['Equipment grounding check', 'Personal protective equipment review'],
        followUp: '2025-03-19'
      },
      { 
        id: 3, 
        title: 'Chemical Exposure', 
        type: 'Chemical', 
        severity: 'LOW', 
        status: 'Open', 
        location: 'Site C - Storage Area', 
        date: '2025-03-10', 
        reportedBy: 'Carol Davis', 
        assignedTo: 'Safety Officer', 
        resolution: '', 
        cost: 0,
        injury: 'Eye irritation from fumes',
        witness: 'None',
        correctiveActions: ['Ventilation system check', 'Proper labeling of chemicals'],
        followUp: '2025-03-17'
      },
      { 
        id: 4, 
        title: 'Equipment Malfunction', 
        type: 'Mechanical', 
        severity: 'MEDIUM', 
        status: 'Resolved', 
        location: 'Site A - Workshop', 
        date: '2025-03-08', 
        reportedBy: 'Bob Smith', 
        assignedTo: 'Maintenance Supervisor', 
        resolution: 'Equipment repaired and safety protocols reviewed', 
        cost: 15000,
        injury: 'No injury',
        witness: 'Frank Miller',
        correctiveActions: ['Preventive maintenance schedule', 'Equipment inspection checklist'],
        followUp: '2025-03-15'
      }
    ]
    
    // Mock data for prototype - Safety Inspections
    const mockInspections = [
      { 
        id: 1, 
        title: 'Weekly Site Safety Audit', 
        type: 'Routine', 
        status: 'Completed', 
        location: 'All Sites', 
        date: '2025-03-16', 
        inspector: 'Safety Officer', 
        findings: 3, 
        recommendations: 5, 
        score: 87,
        nextScheduled: '2025-03-23'
      },
      { 
        id: 2, 
        title: 'Fire Safety Compliance', 
        type: 'Special', 
        status: 'Scheduled', 
        location: 'Site A', 
        date: '2025-03-20', 
        inspector: 'External Auditor', 
        findings: 0, 
        recommendations: 0, 
        score: 0,
        nextScheduled: '2025-03-20'
      },
      { 
        id: 3, 
        title: 'Personal Protective Equipment', 
        type: 'Routine', 
        status: 'In Progress', 
        location: 'Site B', 
        date: '2025-03-14', 
        inspector: 'Safety Officer', 
        findings: 2, 
        recommendations: 3, 
        score: 92,
        nextScheduled: '2025-03-14'
      }
    ]
    
    setIncidents(mockIncidents)
    setInspections(mockInspections)
  }, [])

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h1 className="text-2xl font-bold mb-6 text-center text-slate-800">Please log in</h1>
          <button 
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 px-6 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md"
            onClick={() => router.push('/login')}
          >
            Go to Login
          </button>
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
              <h1 className="text-3xl font-bold text-slate-800">Safety Management</h1>
              <p className="text-slate-600">Track and manage construction safety incidents and inspections</p>
            </div>
            <button className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-4 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Report Incident
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-slate-500">
            <p className="text-2xl font-bold text-slate-800">{incidents.length}</p>
            <p className="text-sm text-slate-600">Total Incidents</p>
          </div>
          <div className="bg-emerald-50 rounded-xl shadow p-4 text-center border-l-4 border-emerald-500">
            <p className="text-2xl font-bold text-emerald-700">{incidents.filter(i => i.status === 'Resolved').length}</p>
            <p className="text-sm text-emerald-600">Resolved</p>
          </div>
          <div className="bg-amber-50 rounded-xl shadow p-4 text-center border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-700">{incidents.filter(i => i.status === 'Investigating').length}</p>
            <p className="text-sm text-amber-600">Investigating</p>
          </div>
          <div className="bg-rose-50 rounded-xl shadow p-4 text-center border-l-4 border-rose-500">
            <p className="text-2xl font-bold text-rose-700">{incidents.filter(i => i.severity === 'HIGH').length}</p>
            <p className="text-sm text-rose-600">High Severity</p>
          </div>
        </div>

        {/* Safety Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Incidents List */}
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Recent Incidents</h2>
              <button className="text-sm text-teal-600 hover:text-teal-800 font-medium" onClick={() => router.push('/safety/incidents')}>
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Incident</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Severity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Location</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {incidents.slice(0, 5).map((incident: any) => (
                    <tr key={incident.id} className="hover:bg-slate-50 transition cursor-pointer" onClick={() => router.push(`/safety/incidents/${incident.id}`)}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">{incident.title}</div>
                        <div className="text-sm text-slate-500">{incident.reportedBy}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {incident.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          incident.severity === 'HIGH' ? 'bg-rose-100 text-rose-800' :
                          incident.severity === 'MEDIUM' ? 'bg-amber-100 text-amber-800' :
                          'bg-emerald-100 text-emerald-800'
                        }`}>
                          {incident.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          incident.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' :
                          incident.status === 'Investigating' ? 'bg-amber-100 text-amber-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {incident.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {incident.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {incident.location}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Inspections List */}
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Safety Inspections</h2>
              <button className="text-sm text-teal-600 hover:text-teal-800 font-medium" onClick={() => router.push('/safety/inspections')}>
                View All
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Inspection</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Inspector</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Score</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {inspections.map((inspection: any) => (
                    <tr key={inspection.id} className="hover:bg-slate-50 transition cursor-pointer" onClick={() => router.push(`/safety/inspections/${inspection.id}`)}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">{inspection.title}</div>
                        <div className="text-sm text-slate-500">{inspection.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {inspection.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          inspection.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                          inspection.status === 'In Progress' ? 'bg-amber-100 text-amber-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {inspection.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {inspection.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {inspection.inspector}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-slate-200 rounded-full h-2 mr-2">
                            <div 
                              className={`h-2 rounded-full ${
                                inspection.score >= 90 ? 'bg-emerald-500' :
                                inspection.score >= 70 ? 'bg-amber-500' :
                                'bg-rose-500'
                              }`}
                              style={{ width: `${inspection.score}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-slate-800">{inspection.score}%</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Safety Metrics */}
        <div className="bg-white rounded-2xl shadow-md p-6 card mb-8">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Safety Metrics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 shadow-sm border border-emerald-200">
              <div className="text-3xl font-bold text-emerald-700 mb-2">98.5%</div>
              <h3 className="text-lg font-semibold text-slate-800 mb-1">Safety Compliance Rate</h3>
              <p className="text-slate-600 text-sm">↑ 2.3% from last month</p>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-6 shadow-sm border border-amber-200">
              <div className="text-3xl font-bold text-amber-700 mb-2">0.2</div>
              <h3 className="text-lg font-semibold text-slate-800 mb-1">Incidents Per 1000 Hours</h3>
              <p className="text-slate-600 text-sm">↓ 0.1 from last month</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 shadow-sm border border-blue-200">
              <div className="text-3xl font-bold text-blue-700 mb-2">15</div>
              <h3 className="text-lg font-semibold text-slate-800 mb-1">Days Without Incident</h3>
              <p className="text-slate-600 text-sm">Current streak</p>
            </div>
          </div>
        </div>

        {/* Safety Training */}
        <div className="bg-white rounded-2xl shadow-md p-6 card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-slate-800">Safety Training Programs</h2>
            <button className="text-sm text-teal-600 hover:text-teal-800 font-medium" onClick={() => router.push('/safety/training')}>
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition cursor-pointer" onClick={() => router.push('/safety/training/fall-protection')}>
              <div className="w-12 h-12 bg-gradient-to-br from-rose-100 to-rose-200 rounded-lg flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="font-medium text-slate-800 mb-1">Fall Protection</h3>
              <p className="text-sm text-slate-600">Required for all workers on elevated surfaces</p>
              <div className="mt-2 flex items-center text-xs text-slate-500">
                <span>Completed: 95%</span>
                <span className="mx-2">•</span>
                <span>Due: Quarterly</span>
              </div>
            </div>
            
            <div className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition cursor-pointer" onClick={() => router.push('/safety/training/electrical-safety')}>
              <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-medium text-slate-800 mb-1">Electrical Safety</h3>
              <p className="text-sm text-slate-600">Mandatory for electrical workers and supervisors</p>
              <div className="mt-2 flex items-center text-xs text-slate-500">
                <span>Completed: 87%</span>
                <span className="mx-2">•</span>
                <span>Due: Monthly</span>
              </div>
            </div>
            
            <div className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50 transition cursor-pointer" onClick={() => router.push('/safety/training/ppe-usage')}>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-medium text-slate-800 mb-1">PPE Usage</h3>
              <p className="text-sm text-slate-600">Required for all site personnel daily</p>
              <div className="mt-2 flex items-center text-xs text-slate-500">
                <span>Completed: 98%</span>
                <span className="mx-2">•</span>
                <span>Due: Daily</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </UserLayout>
  )
}