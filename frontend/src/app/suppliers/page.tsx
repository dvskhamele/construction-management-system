'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import UserLayout from '../../components/UserLayout'
import SmartSupplierManager from '../../components/SmartSupplierManager'

export default function SuppliersPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [user, setUser] = useState<any>({ name: 'Construction Manager', role: 'ADMIN' })
  
  const [suppliers, setSuppliers] = useState([
    {
      id: 1,
      name: "Infra Mart",
      contactPerson: "Rajesh Kumar",
      email: "rajesh@inframart.com",
      phone: "+91 98765 43210",
      address: "Shop 23, Main Road, Construction Market, Delhi",
      category: "Aggregates & Sand",
      reliabilityRating: 85,
      paymentTerms: "Net 30",
      leadTime: 2, // in days
      status: "active",
      lastOrderDate: "2025-10-18",
      totalSpent: 125000
    },
    {
      id: 2,
      name: "BuildPro Materials",
      contactPerson: "Amit Sharma",
      email: "amit@buildpro.com",
      phone: "+91 98765 43211",
      address: "Warehouse 15, Industrial Area, Delhi",
      category: "Cement & Concrete",
      reliabilityRating: 92,
      paymentTerms: "Net 45",
      leadTime: 3, // in days
      status: "active",
      lastOrderDate: "2025-10-15",
      totalSpent: 85000
    },
    {
      id: 3,
      name: "Steel Solutions Ltd",
      contactPerson: "Vikash Singh",
      email: "vikash@steelsolutions.com",
      phone: "+91 98765 43212",
      address: "Steel Complex, Metal Industrial Zone, Delhi",
      category: "Steel & Metals",
      reliabilityRating: 88,
      paymentTerms: "Net 30",
      leadTime: 5, // in days
      status: "active",
      lastOrderDate: "2025-10-10",
      totalSpent: 212500
    },
    {
      id: 4,
      name: "Local Brick Suppliers",
      contactPerson: "Suresh Patel",
      email: "suresh@localbricks.com",
      phone: "+91 98765 43213",
      address: "Brick Kiln Area, South Delhi",
      category: "Bricks & Masonry",
      reliabilityRating: 78,
      paymentTerms: "Cash on Delivery",
      leadTime: 1, // in days
      status: "on_hold",
      lastOrderDate: "2025-10-05",
      totalSpent: 95000
    }
  ])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-emerald-100 text-emerald-800'
      case 'on_hold': return 'bg-amber-100 text-amber-800'
      case 'inactive': return 'bg-slate-100 text-slate-800'
      default: return 'bg-slate-100 text-slate-800'
    }
  }

  const getReliabilityColor = (rating: number) => {
    if (rating >= 90) return 'bg-emerald-100 text-emerald-800'
    if (rating >= 80) return 'bg-teal-100 text-teal-800'
    if (rating >= 70) return 'bg-amber-100 text-amber-800'
    return 'bg-rose-100 text-rose-800'
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setUser(null)
    router.push('/login')
  }

  // For prototype, always allow access to authenticated routes
  React.useEffect(() => {
    const token = localStorage.getItem('token') || 'mock-token';
    localStorage.setItem('token', token);
    
    // Mock user data for prototype
    setUser({ name: 'Construction Manager', role: 'ADMIN' } as any);
    setIsLoggedIn(true)
  }, [])

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-6 text-center text-slate-800">Construction Management Login</h1>
          <form onSubmit={(e) => {
            e.preventDefault()
            // Mock login for prototype - in a real app, this would call the API
            localStorage.setItem('token', 'mock-jwt-token')
            setUser({ name: 'Construction Manager', role: 'ADMIN' } as any)
            setIsLoggedIn(true)
            // Redirect to suppliers after login
            router.push('/suppliers')
          }}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-slate-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                placeholder="Enter your email"
                defaultValue="admin@buildmate.com"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-slate-700 mb-2">Password</label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition input text-slate-800 bg-white"
                placeholder="Enter your password"
                defaultValue="password123"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white py-3 px-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md hover:shadow-lg btn btn-primary"
            >
              Login
            </button>
          </form>
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
              <h1 className="text-3xl font-bold text-slate-800">Supplier Management</h1>
              <p className="text-slate-600">Manage relationships with construction material suppliers</p>
            </div>
            <button 
              className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md hover:shadow-lg flex items-center"
              onClick={() => alert('Add new supplier functionality would be implemented here')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add Supplier
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-teal-500">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-teal-100 text-teal-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-slate-800">{suppliers.length}</p>
                <p className="text-sm text-slate-600">Total Suppliers</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-slate-800">
                  {suppliers.filter(s => s.status === 'active').length}
                </p>
                <p className="text-sm text-slate-600">Active Suppliers</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-amber-500">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-amber-100 text-amber-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-slate-800">
                  ₹{suppliers.reduce((sum, s) => sum + s.totalSpent, 0).toLocaleString('en-IN')}
                </p>
                <p className="text-sm text-slate-600">Total Spent</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-emerald-500">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-emerald-100 text-emerald-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-slate-800">
                  {suppliers.filter(s => s.status === 'on_hold').length}
                </p>
                <p className="text-sm text-slate-600">On Hold</p>
              </div>
            </div>
          </div>
        </div>

        {/* Supplier List */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-slate-800">Supplier Directory</h2>
            <div className="text-sm text-slate-500">
              Showing {suppliers.length} suppliers
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Supplier</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Reliability</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Payment Terms</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Lead Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Last Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Total Spent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {suppliers.map(supplier => (
                  <tr key={supplier.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center">
                          <span className="text-white font-bold">{supplier.name.charAt(0)}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">{supplier.name}</div>
                          <div className="text-sm text-slate-500">{supplier.address}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-slate-900">{supplier.contactPerson}</div>
                      <div className="text-sm text-slate-500">{supplier.email}</div>
                      <div className="text-sm text-slate-500">{supplier.phone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {supplier.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${getReliabilityColor(supplier.reliabilityRating)}`}>
                        {supplier.reliabilityRating}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {supplier.paymentTerms}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {supplier.leadTime} days
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(supplier.status)}`}>
                        {supplier.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {supplier.lastOrderDate ? formatDate(supplier.lastOrderDate) : 'Never'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      ₹{supplier.totalSpent.toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button 
                        className="text-teal-600 hover:text-teal-900 mr-3"
                        onClick={() => alert(`Viewing details for ${supplier.name}`)}
                      >
                        View
                      </button>
                      <button 
                        className="text-rose-600 hover:text-rose-900"
                        onClick={() => alert(`Editing ${supplier.name}`)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Supplier Performance */}
        <div className="mt-8 bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-slate-800">Supplier Performance</h2>
            <button 
              className="text-sm text-teal-600 hover:text-teal-800 font-medium"
              onClick={() => router.push('/analytics')}
            >
              View Detailed Analytics
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {suppliers.slice(0, 4).map(supplier => (
              <div key={supplier.id} className="border border-slate-200 rounded-xl p-5 text-center hover:shadow-md transition duration-300">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-100 to-teal-200 text-teal-600 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">{supplier.name.charAt(0)}</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{supplier.name}</h3>
                <div className="mb-3">
                  <span className={`px-3 py-1 text-xs rounded-full font-medium ${getReliabilityColor(supplier.reliabilityRating)}`}>
                    {supplier.reliabilityRating}% Reliability
                  </span>
                </div>
                <div className="text-sm text-slate-600 mb-2">₹{supplier.totalSpent.toLocaleString('en-IN')} Total Spent</div>
                <div className="text-xs text-slate-500">Last order: {supplier.lastOrderDate ? formatDate(supplier.lastOrderDate) : 'Never'}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </UserLayout>
  )
}