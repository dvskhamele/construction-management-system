'use client'

'use client'

import React, { useState, useEffect } from 'react'
import HeaderResponsiveLayout from '../../components/HeaderResponsiveLayout'
import { useRouter } from 'next/navigation'

export default function Equipment() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [user, setUser] = useState<any>({ name: 'Construction Admin', role: 'ADMIN' })
  const [equipment, setEquipment] = useState<any[]>([])
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setUser(null)
    router.push('/login')
  }

  useEffect(() => {
    // Mock data for prototype - Equipment
    const mockEquipment = [
      { 
        id: 1, 
        name: 'Excavator CAT 320D', 
        type: 'Heavy Machinery', 
        status: 'In Use', 
        location: 'Site A - Foundation', 
        operator: 'John Smith', 
        lastMaintenance: '2025-03-15', 
        nextMaintenance: '2025-04-15', 
        hoursUsed: 420,
        fuelLevel: 85,
        condition: 'Good',
        serialNumber: 'CAT320D-001',
        purchaseDate: '2022-01-15',
        value: 2500000
      },
      { 
        id: 2, 
        name: 'Concrete Mixer JS-500', 
        type: 'Mixing Equipment', 
        status: 'Available', 
        location: 'Site B - Storage', 
        operator: 'None', 
        lastMaintenance: '2025-03-10', 
        nextMaintenance: '2025-04-10', 
        hoursUsed: 180,
        fuelLevel: 100,
        condition: 'Excellent',
        serialNumber: 'JS500-002',
        purchaseDate: '2023-05-20',
        value: 800000
      },
      { 
        id: 3, 
        name: 'Forklift Toyota 2.5T', 
        type: 'Material Handling', 
        status: 'Maintenance', 
        location: 'Workshop', 
        operator: 'Mike Johnson', 
        lastMaintenance: '2025-02-28', 
        nextMaintenance: '2025-03-28', 
        hoursUsed: 310,
        fuelLevel: 60,
        condition: 'Fair',
        serialNumber: 'TY25T-003',
        purchaseDate: '2021-11-05',
        value: 1200000
      }
    ]
    
    setEquipment(mockEquipment)
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
    <HeaderResponsiveLayout user={user} onLogout={handleLogout} currentPage="equipment">
      <div className="px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Equipment Management</h1>
              <p className="text-slate-600">Track and manage construction equipment and machinery</p>
            </div>
            <button className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-4 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Equipment
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-slate-500">
            <p className="text-2xl font-bold text-slate-800">{equipment.length}</p>
            <p className="text-sm text-slate-600">Total Equipment</p>
          </div>
          <div className="bg-emerald-50 rounded-xl shadow p-4 text-center border-l-4 border-emerald-500">
            <p className="text-2xl font-bold text-emerald-700">{equipment.filter(e => e.status === 'Available').length}</p>
            <p className="text-sm text-emerald-600">Available</p>
          </div>
          <div className="bg-amber-50 rounded-xl shadow p-4 text-center border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-700">{equipment.filter(e => e.status === 'In Use').length}</p>
            <p className="text-sm text-amber-600">In Use</p>
          </div>
          <div className="bg-gray-50 rounded-xl shadow p-4 text-center border-l-4 border-gray-500">
            <p className="text-2xl font-bold text-gray-700">{equipment.filter(e => e.status === 'Maintenance').length}</p>
            <p className="text-sm text-gray-600">Maintenance</p>
          </div>
        </div>

        {/* Equipment List */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-800">Equipment Inventory</h2>
            <div className="text-sm text-slate-500">
              Showing {equipment.length} equipment items
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Equipment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Operator</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Hours Used</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Condition</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {equipment.map((item: any) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-slate-900">{item.name}</div>
                      <div className="text-sm text-slate-500">SN: {item.serialNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {item.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.status === 'Available' ? 'bg-emerald-100 text-emerald-800' :
                        item.status === 'In Use' ? 'bg-amber-100 text-amber-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {item.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {item.operator}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {item.hoursUsed} hrs
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        item.condition === 'Excellent' ? 'bg-emerald-100 text-emerald-800' :
                        item.condition === 'Good' ? 'bg-amber-100 text-amber-800' :
                        'bg-rose-100 text-rose-800'
                      }`}>
                        {item.condition}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-teal-600 hover:text-teal-900 mr-3">View</button>
                      <button className="text-rose-600 hover:text-rose-900">Maintain</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </HeaderResponsiveLayout>
  )
}