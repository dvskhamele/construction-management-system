'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import UserLayout from '../../components/UserLayout'

export default function MaterialsPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [user, setUser] = useState<any>({ name: 'Construction Manager', role: 'ADMIN' })
  
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

  // Mock data for all materials
  const [allMaterials] = useState([
    { 
      id: 1, 
      name: 'Portland Cement 50kg', 
      category: 'Cement & Concrete', 
      unit: 'bags', 
      quantity: 150, 
      allocated: 125, 
      minStock: 50, 
      maxStock: 200, 
      costPerUnit: 350, 
      supplierId: 2, 
      supplierName: 'BuildPro Materials',
      lastOrdered: '2025-10-15', 
      expiryDate: '2026-04-15',
      location: 'Warehouse A - Shelf 3', 
      status: 'low_stock',
      qrCode: 'QR001',
      batchNumber: 'CEM20251015',
      notes: 'Standard Portland cement for concrete mixing'
    },
    { 
      id: 2, 
      name: 'Steel Rods 12mm', 
      category: 'Steel & Metals', 
      unit: 'kg', 
      quantity: 2000, 
      allocated: 1800, 
      minStock: 1000, 
      maxStock: 3000, 
      costPerUnit: 75, 
      supplierId: 3, 
      supplierName: 'Steel Solutions Ltd',
      lastOrdered: '2025-10-10', 
      expiryDate: null,
      location: 'Warehouse B - Rack 5', 
      status: 'in_stock',
      barcode: 'BAR002',
      batchNumber: 'STE20251010',
      notes: 'High tensile steel rods for reinforcement'
    },
    { 
      id: 3, 
      name: 'River Sand', 
      category: 'Aggregates', 
      unit: 'tons', 
      quantity: 25, 
      allocated: 20, 
      minStock: 20, 
      maxStock: 50, 
      costPerUnit: 2500, 
      supplierId: 1, 
      supplierName: 'Infra Mart',
      lastOrdered: '2025-10-18', 
      expiryDate: null,
      location: 'Outdoor Yard - Zone 2', 
      status: 'low_stock',
      qrCode: 'QR003',
      notes: 'High quality river sand for concrete mixing'
    },
    { 
      id: 4, 
      name: 'Standard Clay Bricks', 
      category: 'Masonry', 
      unit: 'pieces', 
      quantity: 8000, 
      allocated: 6000, 
      minStock: 5000, 
      maxStock: 10000, 
      costPerUnit: 8, 
      supplierId: 4, 
      supplierName: 'Local Brick Suppliers',
      lastOrdered: '2025-10-05', 
      expiryDate: null,
      location: 'Warehouse A - Pallet 7', 
      status: 'in_stock',
      barcode: 'BAR004',
      batchNumber: 'BRK20251005',
      notes: 'Standard clay bricks for masonry work'
    },
    { 
      id: 5, 
      name: 'Exterior Paint White', 
      category: 'Finishing', 
      unit: 'liters', 
      quantity: 30, 
      allocated: 25, 
      minStock: 20, 
      maxStock: 50, 
      costPerUnit: 450, 
      supplierId: 2, 
      supplierName: 'BuildPro Materials',
      lastOrdered: '2025-09-20', 
      expiryDate: '2026-09-20',
      location: 'Storage Area 3', 
      status: 'in_stock',
      qrCode: 'QR005',
      batchNumber: 'PTN20250920',
      notes: 'Weather-resistant exterior paint'
    },
    { 
      id: 6, 
      name: 'Premium Glass Panels', 
      category: 'Finishing', 
      unit: 'pieces', 
      quantity: 50, 
      allocated: 45, 
      minStock: 20, 
      maxStock: 100, 
      costPerUnit: 1500, 
      supplierId: 4, 
      supplierName: 'Premium Glass Co',
      lastOrdered: '2025-09-25', 
      expiryDate: null,
      location: 'Warehouse C - Section 2', 
      status: 'in_stock',
      qrCode: 'QR006',
      batchNumber: 'PGL20250925',
      notes: 'Premium quality glass panels for client exclusive project'
    }
  ]);

  // Filter materials based on user role (for CLIENT role, only show their materials)
  const [materials] = useState(() => {
    if (user?.role === 'CLIENT') {
      // For clients, only show materials related to their projects
      // For this prototype, use specific materials designated for client projects
      return allMaterials.filter(material => 
        material.notes.includes('client exclusive') || 
        material.name.includes('Portland Cement') || 
        material.name.includes('Premium Glass')
      );
    } else {
      return allMaterials;
    }
  });

  // Mock suppliers data
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
      leadTime: 2,
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
      leadTime: 3,
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
      leadTime: 5,
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
      leadTime: 1,
      status: "on_hold",
      lastOrderDate: "2025-10-05",
      totalSpent: 95000
    }
  ])

  // Mock material movements data
  const [movements, setMovements] = useState([
    {
      id: 1,
      materialId: 1,
      materialName: 'Portland Cement 50kg',
      supplierId: 2,
      supplierName: 'BuildPro Materials',
      quantity: 50,
      unit: 'bags',
      direction: 'incoming',
      vehicle: 'Tata Truck TL-1234',
      driver: 'Ramesh Kumar',
      timestamp: '2025-10-20T08:30:00Z',
      status: 'received',
      deliveryTime: '2025-10-20T09:15:00Z',
      receiver: 'Suresh Patel',
      notes: 'Delivered on time, good quality'
    },
    {
      id: 2,
      materialId: 3,
      materialName: 'River Sand',
      supplierId: 1,
      supplierName: 'Infra Mart',
      quantity: 10,
      unit: 'tons',
      direction: 'outgoing',
      vehicle: 'Trolley TR-5678',
      driver: 'Manoj Gupta',
      timestamp: '2025-10-20T10:45:00Z',
      status: 'delivered',
      deliveryTime: '2025-10-20T11:30:00Z',
      receiver: 'Site Supervisor',
      notes: 'Sent to Downtown Office Complex site'
    },
    {
      id: 3,
      materialId: 2,
      materialName: 'Steel Rods 12mm',
      supplierId: 3,
      supplierName: 'Steel Solutions Ltd',
      quantity: 1000,
      unit: 'kg',
      direction: 'incoming',
      vehicle: 'Ashok Leyland AL-9012',
      driver: 'Vijay Sharma',
      timestamp: '2025-10-19T07:15:00Z',
      status: 'received',
      deliveryTime: '2025-10-19T08:00:00Z',
      receiver: 'Store Keeper',
      notes: 'Delivered early, good condition'
    }
  ])

  // Mock theft and delivery issues
  const [issues, setIssues] = useState([
    {
      id: 1,
      type: 'theft',
      materialId: 1,
      materialName: 'Portland Cement 50kg',
      supplierId: 2,
      supplierName: 'BuildPro Materials',
      reportedQuantity: 150,
      actualQuantity: 125,
      discrepancy: 25,
      reportedBy: 'Store Keeper',
      reportedAt: '2025-10-15T16:30:00Z',
      investigationNotes: 'Possible theft during unloading, security cameras reviewed',
      status: 'resolved',
      resolution: 'Security procedures updated, no further incidents'
    },
    {
      id: 2,
      type: 'delivery',
      materialId: 4,
      materialName: 'Standard Clay Bricks',
      supplierId: 4,
      supplierName: 'Local Brick Suppliers',
      expectedDelivery: '2025-10-05T09:00:00Z',
      actualDelivery: '2025-10-05T14:30:00Z',
      delayReason: 'Traffic congestion on ring road',
      delayDuration: 5.5,
      reportedBy: 'Site Supervisor',
      reportedAt: '2025-10-05T15:00:00Z',
      status: 'compensated',
      resolution: 'Supplier provided 5% discount on next order',
      compensation: 2000
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
      case 'in_stock': return 'bg-emerald-100 text-emerald-800'
      case 'low_stock': return 'bg-amber-100 text-amber-800'
      case 'out_of_stock': return 'bg-rose-100 text-rose-800'
      case 'overstocked': return 'bg-blue-100 text-blue-800'
      default: return 'bg-slate-100 text-slate-800'
    }
  }

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
            // Redirect to materials after login
            router.push('/materials')
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
              <h1 className="text-3xl font-bold text-slate-800">Materials Tracking</h1>
              <p className="text-slate-600">Monitor construction materials, track inventory levels, and manage supplier relationships</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button 
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center"
                onClick={() => alert('Add new material functionality would be implemented here')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Add Material
              </button>
              <button 
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:from-amber-600 hover:to-amber-700 transition duration-300 shadow-md flex items-center"
                onClick={() => alert('Report theft functionality would be implemented here')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Report Theft
              </button>
              <button 
                className="bg-gradient-to-r from-rose-500 to-rose-600 text-white px-4 py-2 rounded-lg font-medium hover:from-rose-600 hover:to-rose-700 transition duration-300 shadow-md flex items-center"
                onClick={() => alert('Report delivery issue functionality would be implemented here')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Report Delay
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-teal-500">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-teal-100 text-teal-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-slate-800">{materials.length}</p>
                <p className="text-sm text-slate-600">Total Materials</p>
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
                  {materials.filter(m => m.status === 'in_stock').length}
                </p>
                <p className="text-sm text-slate-600">In Stock</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-amber-500">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-amber-100 text-amber-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-slate-800">
                  {materials.filter(m => m.status === 'low_stock').length}
                </p>
                <p className="text-sm text-slate-600">Low Stock</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-rose-500">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-rose-100 text-rose-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-slate-800">
                  {materials.filter(m => m.status === 'out_of_stock').length}
                </p>
                <p className="text-sm text-slate-600">Out of Stock</p>
              </div>
            </div>
          </div>
        </div>

        {/* Materials Inventory */}
        <div className="mb-8 bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-xl font-semibold text-slate-800">Materials Inventory</h2>
            <div className="flex flex-wrap gap-3">
              <select 
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                defaultValue="all"
              >
                <option value="all">All Materials</option>
                <option value="in_stock">In Stock</option>
                <option value="low_stock">Low Stock</option>
                <option value="out_of_stock">Out of Stock</option>
                <option value="overstocked">Overstocked</option>
              </select>
              <div className="text-sm text-slate-500">
                Showing {materials.length} materials
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Material</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Supplier</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Allocated</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Last Ordered</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Expiry Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {materials.map(material => {
                  const supplier = suppliers.find(s => s.id === material.supplierId)
                  return (
                    <tr key={material.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">{material.name}</div>
                        <div className="text-sm text-slate-500">₹{material.costPerUnit.toLocaleString('en-IN')}/{material.unit}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {material.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {supplier?.name || 'Unknown Supplier'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        {material.quantity} {material.unit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        {material.allocated} {material.unit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${getStatusColor(material.status)}`}>
                          {material.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {material.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {formatDate(material.lastOrdered)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {material.expiryDate ? formatDate(material.expiryDate) : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          className="text-teal-600 hover:text-teal-900 mr-3"
                          onClick={() => alert(`Viewing details for ${material.name}`)}
                        >
                          View
                        </button>
                        <button 
                          className="text-rose-600 hover:text-rose-900"
                          onClick={() => alert(`Editing ${material.name}`)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  )
                })}
                {materials.length === 0 && (
                  <tr>
                    <td colSpan={10} className="px-6 py-4 text-center text-sm text-slate-500">
                      No materials found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Material Movements */}
        <div className="mb-8 bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-xl font-semibold text-slate-800">Material Movements</h2>
            <div className="flex flex-wrap gap-3">
              <select 
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                defaultValue="all"
              >
                <option value="all">All Movements</option>
                <option value="incoming">Incoming Only</option>
                <option value="outgoing">Outgoing Only</option>
              </select>
              <div className="text-sm text-slate-500">
                Showing {movements.length} movements
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Material</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Supplier</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Direction</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Vehicle</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Driver</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {movements.map(movement => {
                  const material = materials.find(m => m.id === movement.materialId)
                  const supplier = suppliers.find(s => s.id === movement.supplierId)
                  
                  return (
                    <tr key={movement.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">{movement.materialName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{supplier?.name || 'Unknown Supplier'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        {movement.quantity} {movement.unit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          movement.direction === 'incoming' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {movement.direction === 'incoming' ? 'INCOMING' : 'OUTGOING'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {movement.vehicle}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {movement.driver}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {formatDate(movement.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select 
                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                            movement.status === 'pending' ? 'bg-slate-100 text-slate-800' :
                            movement.status === 'in_transit' ? 'bg-blue-100 text-blue-800' :
                            movement.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                            movement.status === 'received' ? 'bg-teal-100 text-teal-800' :
                            'bg-rose-100 text-rose-800'
                          }`}
                          value={movement.status}
                          onChange={(e) => {
                            const newStatus = e.target.value
                            setMovements(movements.map(m => 
                              m.id === movement.id 
                                ? { ...m, status: newStatus } 
                                : m
                            ))
                          }}
                        >
                          <option value="pending">Pending</option>
                          <option value="in_transit">In Transit</option>
                          <option value="delivered">Delivered</option>
                          <option value="received">Received</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          className="text-teal-600 hover:text-teal-900 mr-3"
                          onClick={() => alert(`Viewing details for movement of ${movement.materialName}`)}
                        >
                          View
                        </button>
                        <button 
                          className="text-rose-600 hover:text-rose-900"
                          onClick={() => alert(`Editing movement of ${movement.materialName}`)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  )
                })}
                {movements.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-6 py-4 text-center text-sm text-slate-500">
                      No material movements found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Issues & Problems */}
        <div className="mb-8 bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-xl font-semibold text-slate-800">Issues & Problems</h2>
            <div className="flex flex-wrap gap-3">
              <select 
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                defaultValue="all"
              >
                <option value="all">All Issues</option>
                <option value="theft">Theft Reports</option>
                <option value="delivery">Delivery Issues</option>
              </select>
              <div className="text-sm text-slate-500">
                Showing {issues.length} issues
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Issue Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Material</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Supplier</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Reported By</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Reported At</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {issues.map(issue => {
                  const material = materials.find(m => m.id === issue.materialId)
                  const supplier = suppliers.find(s => s.id === issue.supplierId)
                  
                  return (
                    <tr key={issue.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-slate-900">
                          {issue.type === 'theft' ? 'Theft Report' : 'Delivery Issue'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{issue.materialName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-slate-900">{supplier?.name || 'Unknown Supplier'}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-900">
                          {issue.type === 'theft' 
                            ? `${issue.discrepancy} ${material?.unit || 'units'} discrepancy` 
                            : `${issue.delayDuration?.toFixed(1) || '0'} hours delay`}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">
                          {issue.type === 'theft' 
                            ? issue.investigationNotes 
                            : issue.delayReason}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        {issue.reportedBy}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        {formatDate(issue.reportedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          issue.status === 'reported' ? 'bg-amber-100 text-amber-800' :
                          issue.status === 'investigating' ? 'bg-blue-100 text-blue-800' :
                          issue.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' :
                          issue.status === 'closed' ? 'bg-slate-100 text-slate-800' :
                          issue.status === 'delayed' ? 'bg-rose-100 text-rose-800' :
                          issue.status === 'compensated' ? 'bg-teal-100 text-teal-800' :
                          'bg-slate-100 text-slate-800'
                        }`}>
                          {issue.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          className="text-teal-600 hover:text-teal-900 mr-3"
                          onClick={() => alert(`Viewing details for ${issue.type === 'theft' ? 'theft report' : 'delivery issue'} of ${issue.materialName}`)}
                        >
                          View
                        </button>
                        <button 
                          className="text-rose-600 hover:text-rose-900"
                          onClick={() => alert(`Editing ${issue.type === 'theft' ? 'theft report' : 'delivery issue'} of ${issue.materialName}`)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  )
                })}
                {issues.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-6 py-4 text-center text-sm text-slate-500">
                      No issues found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Suppliers Overview */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-slate-800">Suppliers Overview</h2>
            <Link 
              href="/suppliers" 
              className="text-sm text-teal-600 hover:text-teal-800 font-medium"
            >
              View All Suppliers
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {suppliers.slice(0, 4).map(supplier => (
              <div key={supplier.id} className="border border-slate-200 rounded-xl p-5 hover:shadow-md transition duration-300">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-slate-800 mb-1">{supplier.name}</h3>
                    <p className="text-sm text-slate-600">{supplier.contactPerson}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    supplier.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                    supplier.status === 'on_hold' ? 'bg-amber-100 text-amber-800' :
                    'bg-slate-100 text-slate-800'
                  }`}>
                    {supplier.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mb-4">{supplier.address}</p>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium text-slate-700">Reliability</span>
                  <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                    supplier.reliabilityRating >= 90 ? 'bg-emerald-100 text-emerald-800' :
                    supplier.reliabilityRating >= 80 ? 'bg-teal-100 text-teal-800' :
                    supplier.reliabilityRating >= 70 ? 'bg-amber-100 text-amber-800' :
                    'bg-rose-100 text-rose-800'
                  }`}>
                    {supplier.reliabilityRating}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-700">Payment Terms</span>
                  <span className="text-sm text-slate-600">{supplier.paymentTerms}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </UserLayout>
  )
}

// Helper functions
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-IN', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

function getStatusColor(status: string) {
  switch(status) {
    case 'in_stock': return 'bg-emerald-100 text-emerald-800'
    case 'low_stock': return 'bg-amber-100 text-amber-800'
    case 'out_of_stock': return 'bg-rose-100 text-rose-800'
    case 'overstocked': return 'bg-blue-100 text-blue-800'
    default: return 'bg-slate-100 text-slate-800'
  }
}

// Get materials for a specific supplier
function getMaterialsForSupplier(supplierId: number) {
  // This would normally fetch from a database or API
  // For this prototype, we're using mock data
  return [
    { id: 1, name: 'Portland Cement 50kg', unit: 'bags', price: 350, quantity: 150, allocated: 125 },
    { id: 2, name: 'Steel Rods 12mm', unit: 'kg', price: 75, quantity: 2000, allocated: 1800 },
    { id: 3, name: 'River Sand', unit: 'tons', price: 2500, quantity: 25, allocated: 20 },
    { id: 4, name: 'Standard Clay Bricks', unit: 'pieces', price: 8, quantity: 8000, allocated: 6000 },
    { id: 5, name: 'Exterior Paint White', unit: 'liters', price: 450, quantity: 30, allocated: 25 }
  ]
}