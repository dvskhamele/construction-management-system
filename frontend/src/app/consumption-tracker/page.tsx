'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import UserLayout from '../../components/UserLayout'
import constructionApiService from '../../utils/apiService'

export default function ConsumptionTrackerPage() {
  const [user, setUser] = useState<any>(null)
  const [consumptions, setConsumptions] = useState<any[]>([])
  const [inventory, setInventory] = useState<any[]>([])
  const [projects, setProjects] = useState<any[]>([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [newConsumption, setNewConsumption] = useState({
    itemId: '',
    itemName: '',
    quantity: 1,
    projectId: '',
    projectName: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  })
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProject, setSelectedProject] = useState('')
  const [selectedItem, setSelectedItem] = useState('')

  useEffect(() => {
    // Get user from localStorage
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
    }

    // Load data from available API methods
    const loadData = async () => {
      try {
        setLoading(true)
        const [loadedInventory] = await Promise.all([
          constructionApiService.getInventory()
        ])
        
        setInventory(loadedInventory.inventory)
        setLoading(false)
      } catch (error) {
        console.error('Error loading data:', error)
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  const handleAddConsumption = async () => {
    if (!newConsumption.itemId || newConsumption.quantity <= 0) {
      alert('Please fill in all required fields')
      return
    }

    try {
      // Find the selected item for name
      const selectedItem = inventory.find(item => item.id === parseInt(newConsumption.itemId))
      
      const newConsumptionRecord = {
        id: consumptions.length + 1, // Simple ID generation for mock data
        itemId: parseInt(newConsumption.itemId),
        itemName: selectedItem ? selectedItem.name : newConsumption.itemName,
        projectId: 0, // Not available without getProjects
        projectName: newConsumption.projectName,
        quantity: newConsumption.quantity,
        date: newConsumption.date,
        notes: newConsumption.notes,
        timestamp: new Date().toISOString()
      }
      
      // Update local state (since there's no actual API)
      setConsumptions([newConsumptionRecord, ...consumptions])
      
      // Reset form and close modal
      setNewConsumption({
        itemId: '',
        itemName: '',
        quantity: 1,
        projectId: '',
        projectName: '',
        date: new Date().toISOString().split('T')[0],
        notes: ''
      })
      setShowAddModal(false)
    } catch (error) {
      console.error('Error adding consumption record:', error)
      alert('Error adding consumption record. Please try again.')
    }
  }

  // Filter consumptions based on search term and filters
  const filteredConsumptions = consumptions.filter(consumption => {
    const matchesSearch = searchTerm 
      ? consumption.itemName.toLowerCase().includes(searchTerm.toLowerCase()) || 
        consumption.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consumption.notes.toLowerCase().includes(searchTerm.toLowerCase())
      : true
    
    const matchesProject = selectedProject 
      ? consumption.projectId === parseInt(selectedProject) 
      : true
    
    const matchesItem = selectedItem 
      ? consumption.itemId === parseInt(selectedItem) 
      : true
    
    return matchesSearch && matchesProject && matchesItem
  })

  // Get unique items and projects for filters
  const uniqueItems = Array.from(new Set(consumptions.map(c => c.itemId)))
    .map(id => {
      const item = inventory.find(i => i.id === id)
      return item ? { id: item.id, name: item.name } : null
    })
    .filter(Boolean) as { id: number; name: string }[]

  const uniqueProjects = Array.from(new Set(consumptions.map(c => c.projectId)))
    .map(id => {
      const project = projects.find(p => p.id === id)
      return project ? { id: project.id, name: project.name } : null
    })
    .filter(Boolean) as { id: number; name: string }[]

  return (
    <UserLayout user={user} onLogout={handleLogout}>
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Consumption Tracker</h1>
          <p className="text-slate-600 mt-2">Track and manage material consumption across projects</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-teal-500">
            <div className="text-3xl font-bold text-slate-800">{consumptions.length}</div>
            <div className="text-slate-600">Total Records</div>
          </div>
          <div className="bg-emerald-50 rounded-xl shadow p-6 border-l-4 border-emerald-500">
            <div className="text-3xl font-bold text-emerald-700">
              {consumptions.reduce((sum, record) => sum + record.quantity, 0)}
            </div>
            <div className="text-slate-600">Total Consumed</div>
          </div>
          <div className="bg-blue-50 rounded-xl shadow p-6 border-l-4 border-blue-500">
            <div className="text-3xl font-bold text-blue-700">{uniqueProjects.length}</div>
            <div className="text-slate-600">Active Projects</div>
          </div>
          <div className="bg-amber-50 rounded-xl shadow p-6 border-l-4 border-amber-500">
            <div className="text-3xl font-bold text-amber-700">
              {inventory.filter(item => item.quantity <= item.minStock).length}
            </div>
            <div className="text-slate-600">Low Stock Items</div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search items or projects..."
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <select
                className="w-full md:w-48 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
              >
                <option value="">All Projects</option>
                {uniqueProjects.map(project => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
              </select>
            </div>
            <div>
              <select
                className="w-full md:w-48 px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.target.value)}
              >
                <option value="">All Items</option>
                {uniqueItems.map(item => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
            <div>
              <button 
                className="w-full md:w-auto bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md hover:shadow-lg"
                onClick={() => setShowAddModal(true)}
              >
                Log Consumption
              </button>
            </div>
          </div>
        </div>

        {/* Consumption Records Table */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Item</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Project</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Notes</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {filteredConsumptions.length > 0 ? (
                    filteredConsumptions.map((consumption) => (
                      <tr key={consumption.id} className="hover:bg-slate-50 transition-all duration-300">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-slate-900">{consumption.itemName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          {consumption.projectName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                          {consumption.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                          {new Date(consumption.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {consumption.notes || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-teal-600 hover:text-teal-900 mr-3">View</button>
                          <button className="text-slate-600 hover:text-teal-600">Edit</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center">
                        <div className="text-slate-400">
                          <svg className="w-16 h-16 mx-auto text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                          </svg>
                          <h3 className="mt-4 text-lg font-medium text-slate-900">No consumption records found</h3>
                          <p className="mt-1 text-slate-600">Get started by logging your first consumption record.</p>
                          <div className="mt-6">
                            <button
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                              onClick={() => setShowAddModal(true)}
                            >
                              Log Consumption
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Consumption Insights */}
        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Consumption Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-slate-700 mb-2">Top Consumed Materials</h4>
              {(() => {
                // Group by item and calculate total consumption
                const itemConsumption: any = {}
                consumptions.forEach((c: any) => {
                  if (!itemConsumption[c.itemName]) {
                    itemConsumption[c.itemName] = 0
                  }
                  itemConsumption[c.itemName] += c.quantity
                })
                
                // Sort by consumption
                const sortedItems = Object.entries(itemConsumption).sort((a: [string, any], b: [string, any]) => (b[1] as number) - (a[1] as number))
                
                return (
                  <div className="space-y-2">
                    {sortedItems.slice(0, 5).map(([itemName, quantity]: [string, any], index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-sm text-slate-600">{itemName}</span>
                        <span className="text-sm font-medium text-slate-800">{quantity}</span>
                      </div>
                    ))}
                  </div>
                )
              })()}
            </div>
            <div>
              <h4 className="font-medium text-slate-700 mb-2">Project Consumption</h4>
              {(() => {
                // Group by project and calculate total consumption
                const projectConsumption: any = {}
                consumptions.forEach((c: any) => {
                  if (!projectConsumption[c.projectName]) {
                    projectConsumption[c.projectName] = 0
                  }
                  projectConsumption[c.projectName] += c.quantity
                })
                
                // Sort by consumption
                const sortedProjects = Object.entries(projectConsumption).sort((a: [string, any], b: [string, any]) => (b[1] as number) - (a[1] as number))
                
                return (
                  <div className="space-y-2">
                    {sortedProjects.slice(0, 5).map(([projectName, quantity]: [string, any], index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-sm text-slate-600">{projectName}</span>
                        <span className="text-sm font-medium text-slate-800">{quantity}</span>
                      </div>
                    ))}
                  </div>
                )
              })()}
            </div>
          </div>
        </div>
      </main>

      {/* Add Consumption Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Log Material Consumption</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Material Item</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={newConsumption.itemId}
                    onChange={(e) => {
                      const item = inventory.find(i => i.id === parseInt(e.target.value))
                      setNewConsumption({
                        ...newConsumption,
                        itemId: e.target.value,
                        itemName: item ? item.name : ''
                      })
                    }}
                  >
                    <option value="">Select an item</option>
                    {inventory.map((item: any) => (
                      <option key={item.id} value={item.id}>{item.name} - {item.quantity} in stock</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Project</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={newConsumption.projectId}
                    onChange={(e) => {
                      const project = projects.find(p => p.id === parseInt(e.target.value))
                      setNewConsumption({
                        ...newConsumption,
                        projectId: e.target.value,
                        projectName: project ? project.name : ''
                      })
                    }}
                  >
                    <option value="">Select a project</option>
                    {projects.map((project: any) => (
                      <option key={project.id} value={project.id}>{project.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter quantity consumed"
                    value={newConsumption.quantity}
                    onChange={(e) => setNewConsumption({...newConsumption, quantity: parseInt(e.target.value) || 1})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={newConsumption.date}
                    onChange={(e) => setNewConsumption({...newConsumption, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Notes (Optional)</label>
                  <textarea
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Add any notes about the consumption"
                    value={newConsumption.notes}
                    onChange={(e) => setNewConsumption({...newConsumption, notes: e.target.value})}
                    rows={3}
                  />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                onClick={handleAddConsumption}
              >
                Log Consumption
              </button>
            </div>
          </div>
        </div>
      )}
    </UserLayout>
  )
}