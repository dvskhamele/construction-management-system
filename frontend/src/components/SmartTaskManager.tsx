'use client'

import React, { useState, useEffect } from 'react'
/* import UserLayout from '../../components/UserLayout' */ // COMMENTED OUT DUE TO BUILD ERROR - module not found

interface Supplier {
  id: number
  name: string
  contactPerson: string
  email: string
  phone: string
  address: string
  category: string
  reliabilityRating: number // 0-100
  paymentTerms: string
  leadTime: number // in days
  materials: SupplierMaterial[]
  status: 'active' | 'inactive' | 'on_hold'
  lastOrderDate: string | null
  totalSpent: number
  notes: string
}

interface SupplierMaterial {
  id: number
  name: string
  unit: string
  price: number
  minOrderQty: number
  inStock: number
  lastUpdated: string
}

interface MaterialMovement {
  id: number
  supplierId: number
  materialId: number
  materialName: string
  quantity: number
  unit: string
  direction: 'incoming' | 'outgoing'
  vehicle: string
  driver: string
  timestamp: string
  status: 'pending' | 'in_transit' | 'delivered' | 'received' | 'cancelled'
  deliveryTime: string | null
  receiver: string | null
  notes: string
}

interface CostCalculation {
  id: number
  supplierId: number
  materialId: number
  materialName: string
  quantity: number
  unitPrice: number
  totalPrice: number
  tax: number
  shipping: number
  discount: number
  finalAmount: number
  date: string
}

interface TheftReport {
  id: number
  supplierId: number
  materialId: number
  materialName: string
  reportedQuantity: number
  actualQuantity: number
  discrepancy: number
  reportedBy: string
  reportedAt: string
  investigationNotes: string
  status: 'reported' | 'investigating' | 'resolved' | 'closed'
  resolution: string | null
}

interface DeliveryIssue {
  id: number
  supplierId: number
  materialId: number
  materialName: string
  expectedDelivery: string
  actualDelivery: string | null
  delayReason: string
  delayDuration: number // in hours
  reportedBy: string
  reportedAt: string
  status: 'delayed' | 'resolved' | 'compensated'
  resolution: string | null
  compensation: number | null
}

const SuppliersManagement: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [user, setUser] = useState<any>({ name: 'Construction Manager', role: 'ADMIN' })
  const [suppliers, setSuppliers] = useState<Supplier[]>([])
  const [materialMovements, setMaterialMovements] = useState<MaterialMovement[]>([])
  const [costCalculations, setCostCalculations] = useState<CostCalculation[]>([])
  const [theftReports, setTheftReports] = useState<TheftReport[]>([])
  const [deliveryIssues, setDeliveryIssues] = useState<DeliveryIssue[]>([])
  const [selectedSupplier, setSelectedSupplier] = useState<number | null>(null)
  const [newMovement, setNewMovement] = useState<Omit<MaterialMovement, 'id' | 'status' | 'deliveryTime' | 'receiver'>>({
    supplierId: 0,
    materialId: 0,
    materialName: '',
    quantity: 1,
    unit: '',
    direction: 'incoming',
    vehicle: '',
    driver: '',
    timestamp: new Date().toISOString(),
    notes: ''
  })
  const [newTheftReport, setNewTheftReport] = useState<Omit<TheftReport, 'id' | 'discrepancy' | 'status' | 'resolution'>>({
    supplierId: 0,
    materialId: 0,
    materialName: '',
    reportedQuantity: 0,
    actualQuantity: 0,
    reportedBy: 'Current User',
    reportedAt: new Date().toISOString(),
    investigationNotes: ''
  })
  const [newDeliveryIssue, setNewDeliveryIssue] = useState<Omit<DeliveryIssue, 'id' | 'delayDuration' | 'status' | 'resolution' | 'compensation'>>({
    supplierId: 0,
    materialId: 0,
    materialName: '',
    expectedDelivery: '',
    actualDelivery: null,
    delayReason: '',
    reportedBy: 'Current User',
    reportedAt: new Date().toISOString()
  })
  const [showMovementModal, setShowMovementModal] = useState(false)
  const [showTheftModal, setShowTheftModal] = useState(false)
  const [showDeliveryIssueModal, setShowDeliveryIssueModal] = useState(false)
  const [movementFilter, setMovementFilter] = useState<'all' | 'incoming' | 'outgoing'>('all')
  const [issueFilter, setIssueFilter] = useState<'all' | 'theft' | 'delivery'>('all')

  // Initialize with mock data for small suppliers like Infra Mart
  useEffect(() => {
    // Mock suppliers data (including small suppliers like Infra Mart)
    const mockSuppliers: Supplier[] = [
      {
        id: 1,
        name: 'Infra Mart',
        contactPerson: 'Rajesh Kumar',
        email: 'rajesh@inframart.com',
        phone: '+91 98765 43210',
        address: 'Shop 23, Main Road, Construction Market, Delhi',
        category: 'Aggregates & Sand',
        reliabilityRating: 85,
        paymentTerms: 'Net 30',
        leadTime: 2,
        materials: [
          { id: 1, name: 'River Sand', unit: 'tons', price: 2500, minOrderQty: 5, inStock: 25, lastUpdated: '2025-10-20' },
          { id: 2, name: 'Crushed Stone 20mm', unit: 'tons', price: 1800, minOrderQty: 10, inStock: 45, lastUpdated: '2025-10-20' },
          { id: 3, name: 'Crushed Stone 10mm', unit: 'tons', price: 2200, minOrderQty: 10, inStock: 30, lastUpdated: '2025-10-20' }
        ],
        status: 'active',
        lastOrderDate: '2025-10-18',
        totalSpent: 125000,
        notes: 'Reliable small supplier, good for urgent deliveries'
      },
      {
        id: 2,
        name: 'BuildPro Materials',
        contactPerson: 'Amit Sharma',
        email: 'amit@buildpro.com',
        phone: '+91 98765 43211',
        address: 'Warehouse 15, Industrial Area, Delhi',
        category: 'Cement & Concrete',
        reliabilityRating: 92,
        paymentTerms: 'Net 45',
        leadTime: 3,
        materials: [
          { id: 4, name: 'Portland Cement 50kg', unit: 'bags', price: 350, minOrderQty: 100, inStock: 150, lastUpdated: '2025-10-19' },
          { id: 5, name: 'Ready Mix Concrete M20', unit: 'cubic meters', price: 4200, minOrderQty: 5, inStock: 12, lastUpdated: '2025-10-19' }
        ],
        status: 'active',
        lastOrderDate: '2025-10-15',
        totalSpent: 85000,
        notes: 'Large supplier with excellent quality materials'
      },
      {
        id: 3,
        name: 'Steel Solutions Ltd',
        contactPerson: 'Vikash Singh',
        email: 'vikash@steelsolutions.com',
        phone: '+91 98765 43212',
        address: 'Steel Complex, Metal Industrial Zone, Delhi',
        category: 'Steel & Metals',
        reliabilityRating: 88,
        paymentTerms: 'Net 30',
        leadTime: 5,
        materials: [
          { id: 6, name: 'Steel Rods 12mm', unit: 'kg', price: 75, minOrderQty: 100, inStock: 2000, lastUpdated: '2025-10-17' },
          { id: 7, name: 'Steel Rods 16mm', unit: 'kg', price: 85, minOrderQty: 100, inStock: 1500, lastUpdated: '2025-10-17' },
          { id: 8, name: 'Steel Plates 10mm', unit: 'sq ft', price: 120, minOrderQty: 50, inStock: 200, lastUpdated: '2025-10-17' }
        ],
        status: 'active',
        lastOrderDate: '2025-10-10',
        totalSpent: 212500,
        notes: 'Specializes in steel products, reliable delivery'
      },
      {
        id: 4,
        name: 'Local Brick Suppliers',
        contactPerson: 'Suresh Patel',
        email: 'suresh@localbricks.com',
        phone: '+91 98765 43213',
        address: 'Brick Kiln Area, South Delhi',
        category: 'Bricks & Masonry',
        reliabilityRating: 78,
        paymentTerms: 'Cash on Delivery',
        leadTime: 1,
        materials: [
          { id: 9, name: 'Standard Clay Bricks', unit: 'pieces', price: 8, minOrderQty: 1000, inStock: 8000, lastUpdated: '2025-10-18' },
          { id: 10, name: 'Fly Ash Bricks', unit: 'pieces', price: 6, minOrderQty: 1000, inStock: 5000, lastUpdated: '2025-10-18' }
        ],
        status: 'on_hold',
        lastOrderDate: '2025-10-05',
        totalSpent: 95000,
        notes: 'Local supplier, quality varies, on hold due to recent delivery issues'
      }
    ]

    // Mock material movements data
    const mockMovements: MaterialMovement[] = [
      {
        id: 1,
        supplierId: 1,
        materialId: 1,
        materialName: 'River Sand',
        quantity: 10,
        unit: 'tons',
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
        supplierId: 1,
        materialId: 2,
        materialName: 'Crushed Stone 20mm',
        quantity: 15,
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
        supplierId: 2,
        materialId: 4,
        materialName: 'Portland Cement 50kg',
        quantity: 200,
        unit: 'bags',
        direction: 'incoming',
        vehicle: 'Ashok Leyland AL-9012',
        driver: 'Vijay Sharma',
        timestamp: '2025-10-19T07:15:00Z',
        status: 'received',
        deliveryTime: '2025-10-19T08:00:00Z',
        receiver: 'Store Keeper',
        notes: 'Delivered early, good condition'
      },
      {
        id: 4,
        supplierId: 3,
        materialId: 6,
        materialName: 'Steel Rods 12mm',
        quantity: 500,
        unit: 'kg',
        direction: 'outgoing',
        vehicle: 'Tata Truck TL-3456',
        driver: 'Deepak Yadav',
        timestamp: '2025-10-18T14:20:00Z',
        status: 'delivered',
        deliveryTime: '2025-10-18T15:05:00Z',
        receiver: 'Electrical Supervisor',
        notes: 'Sent to Residential Apartment Block site'
      },
      {
        id: 5,
        supplierId: 1,
        materialId: 3,
        materialName: 'Crushed Stone 10mm',
        quantity: 5,
        unit: 'tons',
        direction: 'incoming',
        vehicle: 'Mahindra Truck ML-7890',
        driver: 'Arun Singh',
        timestamp: '2025-10-18T09:00:00Z',
        status: 'received',
        deliveryTime: '2025-10-18T09:45:00Z',
        receiver: 'Store Keeper',
        notes: 'Delivered on schedule'
      }
    ]

    // Mock cost calculations data
    const mockCostCalculations: CostCalculation[] = [
      {
        id: 1,
        supplierId: 1,
        materialId: 1,
        materialName: 'River Sand',
        quantity: 10,
        unitPrice: 2500,
        totalPrice: 25000,
        tax: 2250,
        shipping: 1500,
        discount: 0,
        finalAmount: 28750,
        date: '2025-10-20'
      },
      {
        id: 2,
        supplierId: 2,
        materialId: 4,
        materialName: 'Portland Cement 50kg',
        quantity: 200,
        unitPrice: 350,
        totalPrice: 70000,
        tax: 6300,
        shipping: 2000,
        discount: 3500,
        finalAmount: 74800,
        date: '2025-10-19'
      },
      {
        id: 3,
        supplierId: 3,
        materialId: 6,
        materialName: 'Steel Rods 12mm',
        quantity: 500,
        unitPrice: 75,
        totalPrice: 37500,
        tax: 3375,
        shipping: 2500,
        discount: 0,
        finalAmount: 43375,
        date: '2025-10-18'
      }
    ]

    // Mock theft reports data
    const mockTheftReports: TheftReport[] = [
      {
        id: 1,
        supplierId: 1,
        materialId: 1,
        materialName: 'River Sand',
        reportedQuantity: 12,
        actualQuantity: 10,
        discrepancy: 2,
        reportedBy: 'Store Keeper',
        reportedAt: '2025-10-15T16:30:00Z',
        investigationNotes: 'Possible theft during unloading, security cameras reviewed',
        status: 'resolved',
        resolution: 'Security procedures updated, no further incidents'
      }
    ]

    // Mock delivery issues data
    const mockDeliveryIssues: DeliveryIssue[] = [
      {
        id: 1,
        supplierId: 4,
        materialId: 9,
        materialName: 'Standard Clay Bricks',
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
    ]

    setSuppliers(mockSuppliers)
    setMaterialMovements(mockMovements)
    setCostCalculations(mockCostCalculations)
    setTheftReports(mockTheftReports)
    setDeliveryIssues(mockDeliveryIssues)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setUser(null)
  }

  // Handle adding a new material movement
  const handleAddMovement = () => {
    if (!newMovement.supplierId || !newMovement.materialId || !newMovement.vehicle) {
      alert('Please fill all required fields')
      return
    }

    const selectedSupplier = suppliers.find(s => s.id === newMovement.supplierId)
    const selectedMaterial = selectedSupplier?.materials.find(m => m.id === newMovement.materialId)
    
    if (!selectedSupplier || !selectedMaterial) {
      alert('Invalid supplier or material selection')
      return
    }

    const movementToAdd: MaterialMovement = {
      ...newMovement,
      id: materialMovements.length + 1,
      status: 'pending',
      deliveryTime: null,
      receiver: null
    }

    setMaterialMovements([...materialMovements, movementToAdd])
    
    // Reset form
    setNewMovement({
      supplierId: 0,
      materialId: 0,
      materialName: '',
      quantity: 1,
      unit: '',
      direction: 'incoming',
      vehicle: '',
      driver: '',
      timestamp: new Date().toISOString(),
      notes: ''
    })
    
    setShowMovementModal(false)
  }

  // Handle adding a new theft report
  const handleAddTheftReport = () => {
    if (!newTheftReport.supplierId || !newTheftReport.materialId || newTheftReport.actualQuantity > newTheftReport.reportedQuantity) {
      alert('Please fill all required fields and ensure actual quantity is not greater than reported')
      return
    }

    const discrepancy = newTheftReport.reportedQuantity - newTheftReport.actualQuantity
    const theftReportToAdd: TheftReport = {
      ...newTheftReport,
      id: theftReports.length + 1,
      discrepancy,
      status: 'reported',
      resolution: null
    }

    setTheftReports([...theftReports, theftReportToAdd])
    
    // Reset form
    setNewTheftReport({
      supplierId: 0,
      materialId: 0,
      materialName: '',
      reportedQuantity: 0,
      actualQuantity: 0,
      reportedBy: 'Current User',
      reportedAt: new Date().toISOString(),
      investigationNotes: ''
    })
    
    setShowTheftModal(false)
  }

  // Handle adding a new delivery issue
  const handleAddDeliveryIssue = () => {
    if (!newDeliveryIssue.supplierId || !newDeliveryIssue.materialId || !newDeliveryIssue.expectedDelivery || !newDeliveryIssue.delayReason) {
      alert('Please fill all required fields')
      return
    }

    const delayDuration = newDeliveryIssue.actualDelivery 
      ? (new Date(newDeliveryIssue.actualDelivery).getTime() - new Date(newDeliveryIssue.expectedDelivery).getTime()) / (1000 * 60 * 60)
      : 0

    const deliveryIssueToAdd: DeliveryIssue = {
      ...newDeliveryIssue,
      id: deliveryIssues.length + 1,
      delayDuration,
      status: 'delayed',
      resolution: null,
      compensation: null
    }

    setDeliveryIssues([...deliveryIssues, deliveryIssueToAdd])
    
    // Reset form
    setNewDeliveryIssue({
      supplierId: 0,
      materialId: 0,
      materialName: '',
      expectedDelivery: '',
      actualDelivery: null,
      delayReason: '',
      reportedBy: 'Current User',
      reportedAt: new Date().toISOString()
    })
    
    setShowDeliveryIssueModal(false)
  }

  // Helper functions
  const getMaterialsForSupplier = (supplierId: number) => {
    const supplier = suppliers.find(s => s.id === supplierId)
    return supplier ? supplier.materials : []
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  // Handle updating movement status
  const handleUpdateMovementStatus = (movementId: number, newStatus: MaterialMovement['status']) => {
    setMaterialMovements(materialMovements.map(movement => {
      if (movement.id === movementId) {
        const updatedMovement = { ...movement, status: newStatus }
        
        // Update delivery time when status changes to delivered/received
        if ((newStatus === 'delivered' || newStatus === 'received') && !movement.deliveryTime) {
          updatedMovement.deliveryTime = new Date().toISOString()
        }
        
        return updatedMovement
      }
      return movement
    }))
  }

  // Filter movements based on selected filter
  const filteredMovements = materialMovements.filter(movement => {
    if (movementFilter === 'all') return true
    return movement.direction === movementFilter
  })

  // Filter issues based on selected filter
  const filteredIssues = [
    ...theftReports.map(report => ({ ...report, type: 'theft' })),
    ...deliveryIssues.map(issue => ({ ...issue, type: 'delivery' }))
  ].filter(issue => {
    if (issueFilter === 'all') return true
    return issue.type === issueFilter
  })

  return (
    <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Suppliers Management</h1>
              <p className="text-slate-600">Track material movements, costs, theft issues, and delivery problems</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button 
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center"
                onClick={() => setShowMovementModal(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Add Movement
              </button>
              <button 
                className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-lg font-medium hover:from-amber-600 hover:to-amber-700 transition duration-300 shadow-md flex items-center"
                onClick={() => setShowTheftModal(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Report Theft
              </button>
              <button 
                className="bg-gradient-to-r from-rose-500 to-rose-600 text-white px-4 py-2 rounded-lg font-medium hover:from-rose-600 hover:to-rose-700 transition duration-300 shadow-md flex items-center"
                onClick={() => setShowDeliveryIssueModal(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Active Suppliers</p>
                <p className="text-2xl font-bold text-slate-800">{suppliers.filter(s => s.status === 'active').length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Material Movements</p>
                <p className="text-2xl font-bold text-slate-800">{materialMovements.length}</p>
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
                <p className="text-sm font-medium text-slate-600">Theft Reports</p>
                <p className="text-2xl font-bold text-slate-800">{theftReports.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 border-l-4 border-rose-500">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-rose-100 text-rose-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-600">Delivery Issues</p>
                <p className="text-2xl font-bold text-slate-800">{deliveryIssues.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Material Movements Section */}
        <div className="mb-8 bg-white rounded-2xl shadow-md p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">Material Movements</h2>
            <div className="flex flex-wrap gap-3 mt-3 md:mt-0">
              <select 
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={movementFilter}
                onChange={(e) => setMovementFilter(e.target.value as any)}
              >
                <option value="all">All Movements</option>
                <option value="incoming">Incoming Only</option>
                <option value="outgoing">Outgoing Only</option>
              </select>
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
                {filteredMovements.map(movement => {
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        {movement.vehicle}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        {movement.driver}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        {formatDate(movement.timestamp)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select 
                          className={`text-xs px-2 py-1 rounded-full ${
                            movement.status === 'pending' ? 'bg-slate-100 text-slate-800' :
                            movement.status === 'in_transit' ? 'bg-blue-100 text-blue-800' :
                            movement.status === 'delivered' ? 'bg-emerald-100 text-emerald-800' :
                            movement.status === 'received' ? 'bg-teal-100 text-teal-800' :
                            'bg-rose-100 text-rose-800'
                          }`}
                          value={movement.status}
                          onChange={(e) => handleUpdateMovementStatus(movement.id, e.target.value as any)}
                        >
                          <option value="pending">Pending</option>
                          <option value="in_transit">In Transit</option>
                          <option value="delivered">Delivered</option>
                          <option value="received">Received</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-teal-600 hover:text-teal-900 mr-3">View</button>
                        <button className="text-rose-600 hover:text-rose-900">Edit</button>
                      </td>
                    </tr>
                  )
                })}
                {filteredMovements.length === 0 && (
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

        {/* Issues Section */}
        <div className="mb-8 bg-white rounded-2xl shadow-md p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">Issues & Problems</h2>
            <div className="flex flex-wrap gap-3 mt-3 md:mt-0">
              <select 
                className="px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={issueFilter}
                onChange={(e) => setIssueFilter(e.target.value as any)}
              >
                <option value="all">All Issues</option>
                <option value="theft">Theft Reports</option>
                <option value="delivery">Delivery Issues</option>
              </select>
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
                {filteredIssues.map((issue: any) => {
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
                            ? `${issue.discrepancy} ${issue.unit} discrepancy` 
                            : `${issue.delayDuration.toFixed(1)} hours delay`}
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
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          issue.status === 'reported' ? 'bg-amber-100 text-amber-800' :
                          issue.status === 'investigating' ? 'bg-blue-100 text-blue-800' :
                          issue.status === 'resolved' ? 'bg-teal-100 text-teal-800' :
                          issue.status === 'closed' ? 'bg-slate-100 text-slate-800' :
                          issue.status === 'delayed' ? 'bg-rose-100 text-rose-800' :
                          issue.status === 'compensated' ? 'bg-emerald-100 text-emerald-800' :
                          'bg-slate-100 text-slate-800'
                        }`}>
                          {issue.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-teal-600 hover:text-teal-900 mr-3">View</button>
                        <button className="text-rose-600 hover:text-rose-900">Edit</button>
                      </td>
                    </tr>
                  )
                })}
                {filteredIssues.length === 0 && (
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

        {/* Suppliers List */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Supplier Directory</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suppliers.map(supplier => (
              <div 
                key={supplier.id} 
                className="border border-slate-200 rounded-xl p-6 hover:shadow-lg transition duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">{supplier.name}</h3>
                    <p className="text-sm text-slate-600">{supplier.contactPerson}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    supplier.status === 'active' ? 'bg-emerald-100 text-emerald-800' :
                    supplier.status === 'on_hold' ? 'bg-amber-100 text-amber-800' :
                    'bg-slate-100 text-slate-800'
                  }`}>
                    {supplier.status.toUpperCase()}
                  </span>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-slate-600 mb-1">{supplier.address}</p>
                  <p className="text-sm text-slate-600 mb-1">{supplier.email}</p>
                  <p className="text-sm text-slate-600">{supplier.phone}</p>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600">Reliability</span>
                    <span className="font-medium text-slate-800">{supplier.reliabilityRating}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        supplier.reliabilityRating > 80 ? 'bg-emerald-500' :
                        supplier.reliabilityRating > 60 ? 'bg-amber-500' :
                        'bg-rose-500'
                      }`}
                      style={{ width: `${supplier.reliabilityRating}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Payment Terms</span>
                  <span className="font-medium text-slate-800">{supplier.paymentTerms}</span>
                </div>
                
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-slate-600">Lead Time</span>
                  <span className="font-medium text-slate-800">{supplier.leadTime} days</span>
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <h4 className="text-sm font-medium text-slate-800 mb-2">Materials Supplied</h4>
                  <div className="space-y-2">
                    {supplier.materials.slice(0, 3).map(material => (
                      <div key={material.id} className="flex justify-between text-xs">
                        <span className="text-slate-600">{material.name}</span>
                        <span className="font-medium text-slate-800">₹{material.price}/{material.unit}</span>
                      </div>
                    ))}
                    {supplier.materials.length > 3 && (
                      <div className="text-xs text-slate-500">
                        +{supplier.materials.length - 3} more materials
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between">
                  <button className="text-sm text-teal-600 hover:text-teal-800 font-medium">
                    View Details
                  </button>
                  <button className="text-sm bg-gradient-to-r from-teal-500 to-teal-600 text-white px-3 py-1 rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300">
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
  )
}

export default SuppliersManagement