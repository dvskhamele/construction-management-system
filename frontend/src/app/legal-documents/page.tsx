'use client'

import React, { useState, useEffect } from 'react'
import UserLayout from '../../components/UserLayout'
import constructionApiService from '../../utils/apiService'

export default function LegalDocumentsPage() {
  const [user, setUser] = useState<any>(null)
  const [documents, setDocuments] = useState<any[]>([])
  const [contracts, setContracts] = useState<any[]>([])
  const [complianceItems, setComplianceItems] = useState<any[]>([])
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showContractModal, setShowContractModal] = useState(false)
  const [newDocument, setNewDocument] = useState({
    title: '',
    type: 'contract',
    category: 'general',
    project: '',
    client: '',
    status: 'active',
    expiryDate: '',
    file: null as File | null
  })
  const [newContract, setNewContract] = useState({
    title: '',
    client: '',
    project: '',
    startDate: '',
    endDate: '',
    value: 0,
    status: 'draft',
    type: 'construction',
    terms: ''
  })

  useEffect(() => {
    // Get user from localStorage
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
    }

    // Mock data for legal documents
    const mockDocuments = [
      {
        id: 1,
        title: 'Building Permit - Downtown Complex',
        type: 'permit',
        category: 'regulatory',
        project: 'Downtown Office Complex',
        client: 'Metro Developments',
        status: 'active',
        expiryDate: '2026-05-15',
        fileName: 'building-permit-2025.pdf',
        uploadedAt: '2025-01-20',
        uploadedBy: 'Rajesh Sharma',
        size: '2.4 MB'
      },
      {
        id: 2,
        title: 'Insurance Certificate - Liability',
        type: 'insurance',
        category: 'compliance',
        project: 'Residential Tower A',
        client: 'Urban Homes Ltd',
        status: 'active',
        expiryDate: '2025-08-30',
        fileName: 'liability-insurance-2025.pdf',
        uploadedAt: '2025-01-18',
        uploadedBy: 'Priya Patel',
        size: '1.8 MB'
      },
      {
        id: 3,
        title: 'Safety Compliance Checklist',
        type: 'compliance',
        category: 'safety',
        project: 'Industrial Facility',
        client: 'Tech Manufacturing Inc',
        status: 'active',
        expiryDate: '2025-03-15',
        fileName: 'safety-checklist.pdf',
        uploadedAt: '2025-01-15',
        uploadedBy: 'Vikram Singh',
        size: '0.9 MB'
      },
      {
        id: 4,
        title: 'Subcontractor Agreement - Plumbing',
        type: 'contract',
        category: 'subcontract',
        project: 'Commercial Plaza',
        client: 'BuildRight Contractors',
        status: 'active',
        expiryDate: '2025-12-31',
        fileName: 'plumbing-contract.pdf',
        uploadedAt: '2025-01-10',
        uploadedBy: 'Amit Kumar',
        size: '3.2 MB'
      }
    ]

    const mockContracts = [
      {
        id: 1,
        title: 'Construction Contract - Office Complex',
        client: 'Metro Developments',
        project: 'Downtown Office Complex',
        startDate: '2025-02-01',
        endDate: '2026-03-31',
        value: 12500000,
        status: 'signed',
        type: 'construction',
        terms: 'Standard construction terms apply',
        signedDate: '2025-01-25'
      },
      {
        id: 2,
        title: 'Renovation Contract - Home Remodel',
        client: 'Private Client',
        project: 'Residential Remodel',
        startDate: '2025-02-15',
        endDate: '2025-08-30',
        value: 850000,
        status: 'pending',
        type: 'renovation',
        terms: 'Material cost plus fixed fee',
        signedDate: null
      },
      {
        id: 3,
        title: 'Maintenance Contract - Factory',
        client: 'Tech Manufacturing Inc',
        project: 'Industrial Facility',
        startDate: '2025-01-01',
        endDate: '2027-12-31',
        value: 2400000,
        status: 'signed',
        type: 'maintenance',
        terms: 'Annual maintenance with quarterly inspections',
        signedDate: '2024-12-20'
      }
    ]

    const mockCompliance = [
      {
        id: 1,
        title: 'OSHA Safety Inspection',
        project: 'Downtown Office Complex',
        dueDate: '2025-02-15',
        status: 'pending',
        category: 'safety',
        priority: 'high'
      },
      {
        id: 2,
        title: 'Environmental Compliance',
        project: 'Residential Tower A',
        dueDate: '2025-03-20',
        status: 'completed',
        category: 'environmental',
        priority: 'medium'
      },
      {
        id: 3,
        title: 'Building Code Review',
        project: 'Commercial Plaza',
        dueDate: '2025-04-10',
        status: 'pending',
        category: 'regulatory',
        priority: 'high'
      }
    ]

    setDocuments(mockDocuments)
    setContracts(mockContracts)
    setComplianceItems(mockCompliance)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  const handleUploadDocument = () => {
    if (!newDocument.file) {
      alert('Please select a file to upload')
      return
    }

    // Create a new document object
    const document = {
      id: documents.length + 1,
      ...newDocument,
      fileName: newDocument.file.name,
      uploadedAt: new Date().toISOString().split('T')[0],
      uploadedBy: user?.name || 'System',
      size: `${(newDocument.file.size / (1024 * 1024)).toFixed(1)} MB`
    }

    setDocuments([...documents, document])
    setNewDocument({
      title: '',
      type: 'contract',
      category: 'general',
      project: '',
      client: '',
      status: 'active',
      expiryDate: '',
      file: null
    })
    setShowUploadModal(false)
  }

  const handleCreateContract = () => {
    const contract = {
      id: contracts.length + 1,
      ...newContract,
      status: 'draft',
      signedDate: null
    }

    setContracts([...contracts, contract])
    setNewContract({
      title: '',
      client: '',
      project: '',
      startDate: '',
      endDate: '',
      value: 0,
      status: 'draft',
      type: 'construction',
      terms: ''
    })
    setShowContractModal(false)
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-emerald-100 text-emerald-800'
      case 'pending': return 'bg-amber-100 text-amber-800'
      case 'expired': return 'bg-rose-100 text-rose-800'
      case 'draft': return 'bg-slate-100 text-slate-800'
      case 'signed': return 'bg-teal-100 text-teal-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      default: return 'bg-slate-100 text-slate-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch(priority) {
      case 'high': return 'bg-rose-100 text-rose-800'
      case 'medium': return 'bg-amber-100 text-amber-800'
      case 'low': return 'bg-emerald-100 text-emerald-800'
      default: return 'bg-slate-100 text-slate-800'
    }
  }

  return (
    <UserLayout user={user} onLogout={handleLogout}>
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Legal & Compliance Management</h1>
          <p className="text-slate-600 mt-2">Manage contracts, documents, and compliance requirements</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-teal-500">
            <div className="text-3xl font-bold text-slate-800">{documents.length}</div>
            <div className="text-slate-600">Legal Documents</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-500">
            <div className="text-3xl font-bold text-slate-800">{contracts.length}</div>
            <div className="text-slate-600">Active Contracts</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-amber-500">
            <div className="text-3xl font-bold text-slate-800">
              {complianceItems.filter(item => item.status !== 'completed').length}
            </div>
            <div className="text-slate-600">Compliance Items</div>
          </div>
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-rose-500">
            <div className="text-3xl font-bold text-slate-800">
              {documents.filter(doc => 
                doc.expiryDate && new Date(doc.expiryDate) < new Date()
              ).length}
            </div>
            <div className="text-slate-600">Expiring Soon</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button 
            className="bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors duration-300 flex items-center"
            onClick={() => setShowUploadModal(true)}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Upload Document
          </button>
          <button 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300 flex items-center"
            onClick={() => setShowContractModal(true)}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create Contract
          </button>
        </div>

        {/* Legal Documents Tab */}
        <div className="bg-white rounded-xl shadow mb-8">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-xl font-semibold text-slate-800">Legal Documents</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Document</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Expiry</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {documents.map((document) => (
                  <tr key={document.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-slate-900">{document.title}</div>
                      <div className="text-sm text-slate-500">{document.fileName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(document.type)}`}>
                        {document.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{document.project}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{document.client}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(document.status)}`}>
                        {document.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {new Date(document.expiryDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-teal-600 hover:text-teal-900 mr-3">View</button>
                      <button className="text-slate-600 hover:text-slate-900">Download</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Contracts Tab */}
        <div className="bg-white rounded-xl shadow mb-8">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-xl font-semibold text-slate-800">Contracts</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contract</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Dates</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {contracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-slate-900">{contract.title}</div>
                      <div className="text-sm text-slate-500">{contract.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{contract.client}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{contract.project}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      ₹{contract.value.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(contract.status)}`}>
                        {contract.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {new Date(contract.startDate).toLocaleDateString()} - {new Date(contract.endDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-teal-600 hover:text-teal-900 mr-3">View</button>
                      <button className="text-slate-600 hover:text-slate-900">Download</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Compliance Tracking */}
        <div className="bg-white rounded-xl shadow">
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-xl font-semibold text-slate-800">Compliance Tracking</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Requirement</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {complianceItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-slate-900">{item.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{item.project}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{item.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                      {new Date(item.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-teal-600 hover:text-teal-900 mr-3">Review</button>
                      <button className="text-slate-600 hover:text-slate-900">Update</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Upload Legal Document</h3>
              <button 
                onClick={() => setShowUploadModal(false)}
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
                  <label className="block text-sm font-medium text-slate-700 mb-1">Document Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter document title"
                    value={newDocument.title}
                    onChange={(e) => setNewDocument({...newDocument, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Document Type</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={newDocument.type}
                    onChange={(e) => setNewDocument({...newDocument, type: e.target.value})}
                  >
                    <option value="contract">Contract</option>
                    <option value="permit">Permit</option>
                    <option value="license">License</option>
                    <option value="insurance">Insurance</option>
                    <option value="compliance">Compliance</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Project</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={newDocument.project}
                    onChange={(e) => setNewDocument({...newDocument, project: e.target.value})}
                  >
                    <option value="">Select project</option>
                    <option value="Downtown Office Complex">Downtown Office Complex</option>
                    <option value="Residential Tower A">Residential Tower A</option>
                    <option value="Industrial Facility">Industrial Facility</option>
                    <option value="Commercial Plaza">Commercial Plaza</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Client</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={newDocument.client}
                    onChange={(e) => setNewDocument({...newDocument, client: e.target.value})}
                  >
                    <option value="">Select client</option>
                    <option value="Metro Developments">Metro Developments</option>
                    <option value="Urban Homes Ltd">Urban Homes Ltd</option>
                    <option value="Tech Manufacturing Inc">Tech Manufacturing Inc</option>
                    <option value="BuildRight Contractors">BuildRight Contractors</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={newDocument.status}
                    onChange={(e) => setNewDocument({...newDocument, status: e.target.value})}
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Expiry Date (optional)</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={newDocument.expiryDate}
                    onChange={(e) => setNewDocument({...newDocument, expiryDate: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Upload File</label>
                  <input
                    type="file"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setNewDocument({...newDocument, file: e.target.files[0]})
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                onClick={() => setShowUploadModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                onClick={handleUploadDocument}
              >
                Upload Document
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Contract Modal */}
      {showContractModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Create New Contract</h3>
              <button 
                onClick={() => setShowContractModal(false)}
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
                  <label className="block text-sm font-medium text-slate-700 mb-1">Contract Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter contract title"
                    value={newContract.title}
                    onChange={(e) => setNewContract({...newContract, title: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Client</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={newContract.client}
                    onChange={(e) => setNewContract({...newContract, client: e.target.value})}
                  >
                    <option value="">Select client</option>
                    <option value="Metro Developments">Metro Developments</option>
                    <option value="Urban Homes Ltd">Urban Homes Ltd</option>
                    <option value="Tech Manufacturing Inc">Tech Manufacturing Inc</option>
                    <option value="BuildRight Contractors">BuildRight Contractors</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Project</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={newContract.project}
                    onChange={(e) => setNewContract({...newContract, project: e.target.value})}
                  >
                    <option value="">Select project</option>
                    <option value="Downtown Office Complex">Downtown Office Complex</option>
                    <option value="Residential Tower A">Residential Tower A</option>
                    <option value="Industrial Facility">Industrial Facility</option>
                    <option value="Commercial Plaza">Commercial Plaza</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Start Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      value={newContract.startDate}
                      onChange={(e) => setNewContract({...newContract, startDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">End Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      value={newContract.endDate}
                      onChange={(e) => setNewContract({...newContract, endDate: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Contract Value (₹)</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter contract value"
                    value={newContract.value}
                    onChange={(e) => setNewContract({...newContract, value: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Contract Type</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={newContract.type}
                    onChange={(e) => setNewContract({...newContract, type: e.target.value})}
                  >
                    <option value="construction">Construction</option>
                    <option value="renovation">Renovation</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="subcontract">Subcontract</option>
                    <option value="consulting">Consulting</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Terms & Conditions</label>
                  <textarea
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Enter terms and conditions"
                    rows={4}
                    value={newContract.terms}
                    onChange={(e) => setNewContract({...newContract, terms: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                onClick={() => setShowContractModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300"
                onClick={handleCreateContract}
              >
                Create Contract
              </button>
            </div>
          </div>
        </div>
      )}
    </UserLayout>
  )
}