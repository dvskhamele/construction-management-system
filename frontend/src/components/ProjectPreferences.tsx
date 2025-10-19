'use client'

import React, { useState } from 'react'

interface ProjectPreference {
  id: number
  projectId: number
  projectName: string
  preferenceType: string
  preferenceValue: string
  notes: string
  lastUpdate: string
}

const ProjectPreferences: React.FC = () => {
  const [preferences, setPreferences] = useState<ProjectPreference[]>([
    {
      id: 1,
      projectId: 1001,
      projectName: 'Downtown Office Complex',
      preferenceType: 'Material Preference',
      preferenceValue: 'Premium grade concrete, branded electrical fixtures',
      notes: 'Client prefers high-end materials for lobby and executive floors',
      lastUpdate: '2025-03-15'
    },
    {
      id: 2,
      projectId: 1002,
      projectName: 'Residential Apartment Block B',
      preferenceType: 'Design Preference',
      preferenceValue: 'Open floor plans, modern kitchen layouts',
      notes: 'Emphasis on maximizing natural light and space efficiency',
      lastUpdate: '2025-03-12'
    },
    {
      id: 3,
      projectId: 1003,
      projectName: 'Industrial Warehouse',
      preferenceType: 'Safety Preference',
      preferenceValue: 'Enhanced fire suppression systems, emergency exits',
      notes: 'Strict compliance with industrial safety regulations required',
      lastUpdate: '2025-03-10'
    },
    {
      id: 4,
      projectId: 1004,
      projectName: 'Retail Center Renovation',
      preferenceType: 'Accessibility Preference',
      preferenceValue: 'ADA compliant ramps, wide doorways',
      notes: 'Must meet all accessibility standards for public retail spaces',
      lastUpdate: '2025-03-08'
    },
    {
      id: 5,
      projectId: 1005,
      projectName: 'Mixed-Use Development',
      preferenceType: 'Sustainability Preference',
      preferenceValue: 'LEED certified materials, solar panels',
      notes: 'Client committed to achieving LEED Gold certification',
      lastUpdate: '2025-03-05'
    }
  ])
  const [newPreference, setNewPreference] = useState<Omit<ProjectPreference, 'id'>>({
    projectId: 0,
    projectName: '',
    preferenceType: '',
    preferenceValue: '',
    notes: '',
    lastUpdate: new Date().toISOString().split('T')[0]
  })
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingPreference, setEditingPreference] = useState<ProjectPreference | null>(null)

  const handleAddPreference = () => {
    const newId = preferences.length > 0 ? Math.max(...preferences.map(p => p.id)) + 1 : 1
    const preferenceToAdd = {
      ...newPreference,
      id: newId
    }
    
    setPreferences([...preferences, preferenceToAdd])
    setNewPreference({
      projectId: 0,
      projectName: '',
      preferenceType: '',
      preferenceValue: '',
      notes: '',
      lastUpdate: new Date().toISOString().split('T')[0]
    })
    setShowAddModal(false)
  }

  const handleEditPreference = (preference: ProjectPreference) => {
    setEditingPreference(preference)
    setShowAddModal(true)
  }

  const handleUpdatePreference = () => {
    if (editingPreference) {
      setPreferences(preferences.map(p => 
        p.id === editingPreference.id ? editingPreference : p
      ))
      setEditingPreference(null)
      setShowAddModal(false)
    }
  }

  const handleDeletePreference = (id: number) => {
    if (window.confirm('Are you sure you want to delete this project preference?')) {
      setPreferences(preferences.filter(p => p.id !== id))
    }
  }

  const getPreferenceTypeColor = (type: string) => {
    switch (type) {
      case 'Material Preference':
        return 'bg-blue-100 text-blue-800'
      case 'Design Preference':
        return 'bg-amber-100 text-amber-800'
      case 'Safety Preference':
        return 'bg-rose-100 text-rose-800'
      case 'Accessibility Preference':
        return 'bg-emerald-100 text-emerald-800'
      case 'Sustainability Preference':
        return 'bg-teal-100 text-teal-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 card">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">Project Preferences</h2>
          <p className="text-slate-600">Manage client preferences and special requirements for construction projects</p>
        </div>
        <button 
          className="mt-4 md:mt-0 bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center"
          onClick={() => {
            setEditingPreference(null)
            setShowAddModal(true)
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Preference
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Project</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Preference Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Preference Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Notes</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Last Update</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {preferences.map((preference) => (
              <tr key={preference.id} className="hover:bg-slate-50 transition">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-slate-900">{preference.projectName}</div>
                  <div className="text-sm text-slate-500">ID: {preference.projectId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${getPreferenceTypeColor(preference.preferenceType)}`}>
                    {preference.preferenceType}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 max-w-xs">
                  <div className="truncate" title={preference.preferenceValue}>
                    {preference.preferenceValue}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600 max-w-xs">
                  <div className="truncate" title={preference.notes}>
                    {preference.notes}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {preference.lastUpdate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button 
                    className="text-teal-600 hover:text-teal-900 mr-3"
                    onClick={() => handleEditPreference(preference)}
                  >
                    Edit
                  </button>
                  <button 
                    className="text-rose-600 hover:text-rose-900"
                    onClick={() => handleDeletePreference(preference.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Preference Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">
                {editingPreference ? 'Edit Project Preference' : 'Add New Project Preference'}
              </h3>
              <button 
                onClick={() => {
                  setShowAddModal(false)
                  setEditingPreference(null)
                }}
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
                  <label className="block text-sm font-medium text-slate-700 mb-1">Project Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter project name"
                    value={editingPreference ? editingPreference.projectName : newPreference.projectName}
                    onChange={(e) => {
                      if (editingPreference) {
                        setEditingPreference({...editingPreference, projectName: e.target.value})
                      } else {
                        setNewPreference({...newPreference, projectName: e.target.value})
                      }
                    }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Project ID</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter project ID"
                    value={editingPreference ? editingPreference.projectId : newPreference.projectId || ''}
                    onChange={(e) => {
                      if (editingPreference) {
                        setEditingPreference({...editingPreference, projectId: parseInt(e.target.value) || 0})
                      } else {
                        setNewPreference({...newPreference, projectId: parseInt(e.target.value) || 0})
                      }
                    }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Preference Type</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={editingPreference ? editingPreference.preferenceType : newPreference.preferenceType}
                    onChange={(e) => {
                      if (editingPreference) {
                        setEditingPreference({...editingPreference, preferenceType: e.target.value})
                      } else {
                        setNewPreference({...newPreference, preferenceType: e.target.value})
                      }
                    }}
                  >
                    <option value="">Select preference type</option>
                    <option value="Material Preference">Material Preference</option>
                    <option value="Design Preference">Design Preference</option>
                    <option value="Safety Preference">Safety Preference</option>
                    <option value="Accessibility Preference">Accessibility Preference</option>
                    <option value="Sustainability Preference">Sustainability Preference</option>
                    <option value="Special Requirement">Special Requirement</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Preference Value</label>
                  <textarea
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter preference details"
                    rows={3}
                    value={editingPreference ? editingPreference.preferenceValue : newPreference.preferenceValue}
                    onChange={(e) => {
                      if (editingPreference) {
                        setEditingPreference({...editingPreference, preferenceValue: e.target.value})
                      } else {
                        setNewPreference({...newPreference, preferenceValue: e.target.value})
                      }
                    }}
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
                  <textarea
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Additional notes"
                    rows={2}
                    value={editingPreference ? editingPreference.notes : newPreference.notes}
                    onChange={(e) => {
                      if (editingPreference) {
                        setEditingPreference({...editingPreference, notes: e.target.value})
                      } else {
                        setNewPreference({...newPreference, notes: e.target.value})
                      }
                    }}
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Last Update</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={editingPreference ? editingPreference.lastUpdate : newPreference.lastUpdate}
                    onChange={(e) => {
                      if (editingPreference) {
                        setEditingPreference({...editingPreference, lastUpdate: e.target.value})
                      } else {
                        setNewPreference({...newPreference, lastUpdate: e.target.value})
                      }
                    }}
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingPreference(null)
                  }}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                  onClick={editingPreference ? handleUpdatePreference : handleAddPreference}
                >
                  {editingPreference ? 'Update Preference' : 'Add Preference'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectPreferences