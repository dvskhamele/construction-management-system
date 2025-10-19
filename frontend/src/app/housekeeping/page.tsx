'use client'

import React, { useState, useEffect } from 'react'
import UserLayout from '../../components/UserLayout'

export default function Housekeeping() {
  const [areas, setAreas] = useState<any[]>([])
  const [filteredAreas, setFilteredAreas] = useState<any[]>([])
  const [staff, setStaff] = useState<any[]>([])
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedFloor, setSelectedFloor] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [sortBy, setSortBy] = useState('number')
  const [sortOrder, setSortOrder] = useState('asc')
  const [stats, setStats] = useState({ 
    total: 0, 
    clean: 0, 
    dirty: 0, 
    inspected: 0, 
    outOfOrder: 0, 
    occupancyRate: 0 
  })
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddAreaModal, setShowAddAreaModal] = useState(false)
  const [showAreaDetailModal, setShowAreaDetailModal] = useState(false)
  const [selectedArea, setSelectedArea] = useState<any>(null)
  const [newArea, setNewArea] = useState({
    number: '',
    floor: 1,
    type: 'Standard',
    status: 'CLEAN'
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ name: 'Admin User', role: 'ADMIN', id: 1 } as any)
      fetchAreas()
      fetchStaff()
    }
  }, [])

  const fetchAreas = async () => {
    try {
      setLoading(true);
      // Mock data for prototype
      const mockAreas = [
        { id: 1, number: '101', floor: 1, type: 'Standard', status: 'CLEAN', updatedAt: new Date().toISOString() },
        { id: 2, number: '102', floor: 1, type: 'Standard', status: 'DIRTY', updatedAt: new Date(Date.now() - 3600000).toISOString() },
        { id: 3, number: '103', floor: 1, type: 'Deluxe', status: 'INSPECTED', updatedAt: new Date(Date.now() - 7200000).toISOString() },
        { id: 4, number: '104', floor: 1, type: 'Suite', status: 'OUT_OF_ORDER', updatedAt: new Date(Date.now() - 10800000).toISOString() },
        { id: 5, number: '201', floor: 2, type: 'Standard', status: 'CLEAN', updatedAt: new Date().toISOString() },
        { id: 6, number: '202', floor: 2, type: 'Standard', status: 'DIRTY', updatedAt: new Date(Date.now() - 3600000).toISOString() },
        { id: 7, number: '203', floor: 2, type: 'Deluxe', status: 'CLEAN', updatedAt: new Date().toISOString() },
        { id: 8, number: '204', floor: 2, type: 'Suite', status: 'DIRTY', updatedAt: new Date(Date.now() - 3600000).toISOString() },
        { id: 9, number: '301', floor: 3, type: 'Standard', status: 'CLEAN', updatedAt: new Date().toISOString() },
        { id: 10, number: '302', floor: 3, type: 'Standard', status: 'DIRTY', updatedAt: new Date(Date.now() - 3600000).toISOString() },
        { id: 11, number: '303', floor: 3, type: 'Deluxe', status: 'INSPECTED', updatedAt: new Date(Date.now() - 7200000).toISOString() },
        { id: 12, number: '304', floor: 3, type: 'Suite', status: 'CLEAN', updatedAt: new Date().toISOString() }
      ];
      
      setAreas(mockAreas);
      setFilteredAreas(mockAreas);
      
      // Calculate stats
      const clean = mockAreas.filter((r: any) => r.status === 'CLEAN').length;
      const dirty = mockAreas.filter((r: any) => r.status === 'DIRTY').length;
      const inspected = mockAreas.filter((r: any) => r.status === 'INSPECTED').length;
      const outOfOrder = mockAreas.filter((r: any) => r.status === 'OUT_OF_ORDER').length;
      const occupancyRate = Math.round(((dirty + inspected + outOfOrder) / mockAreas.length) * 100);
      
      setStats({ 
        total: mockAreas.length, 
        clean, 
        dirty, 
        inspected, 
        outOfOrder, 
        occupancyRate 
      });
      
      setError('');
    } catch (err) {
      console.error('Error fetching areas:', err);
      setError('Failed to fetch areas');
    } finally {
      setLoading(false);
    }
  };

  const fetchStaff = async () => {
    // Mock staff data
    const mockStaff = [
      { id: 1, name: 'Admin User', department: 'Management', role: 'ADMIN' },
      { id: 2, name: 'Alice Johnson', department: 'Housekeeping', role: 'SUPERVISOR' },
      { id: 3, name: 'Bob Smith', department: 'Housekeeping', role: 'STAFF' },
      { id: 4, name: 'Carol Williams', department: 'Housekeeping', role: 'STAFF' },
      { id: 5, name: 'David Brown', department: 'Maintenance', role: 'STAFF' }
    ];
    
    setStaff(mockStaff);
  };

  useEffect(() => {
    // Filter areas based on selected filters and search term
    let result = areas;
    
    if (selectedStatus) {
      result = result.filter(area => area.status === selectedStatus);
    }
    
    if (selectedFloor) {
      result = result.filter(area => area.floor.toString() === selectedFloor);
    }
    
    if (selectedType) {
      result = result.filter(area => area.type === selectedType);
    }
    
    if (searchTerm) {
      result = result.filter(area => 
        area.number.toLowerCase().includes(searchTerm.toLowerCase()) || 
        area.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Sort areas
    result = [...result].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });
    
    setFilteredAreas(result);
  }, [areas, selectedStatus, selectedFloor, selectedType, searchTerm, sortBy, sortOrder]);

  const updateAreaStatus = async (areaId: number, newStatus: string) => {
    try {
      // Mock update for prototype
      setAreas(areas.map((area: any) => 
        area.id === areaId ? { ...area, status: newStatus, updatedAt: new Date().toISOString() } : area
      ));
      
      // Update filtered areas as well
      setFilteredAreas(filteredAreas.map((area: any) => 
        area.id === areaId ? { ...area, status: newStatus, updatedAt: new Date().toISOString() } : area
      ));
      
      // Update stats
      const updatedAreas = areas.map((area: any) => 
        area.id === areaId ? { ...area, status: newStatus } : area
      );
      
      const clean = updatedAreas.filter((r: any) => r.status === 'CLEAN').length;
      const dirty = updatedAreas.filter((r: any) => r.status === 'DIRTY').length;
      const inspected = updatedAreas.filter((r: any) => r.status === 'INSPECTED').length;
      const outOfOrder = updatedAreas.filter((r: any) => r.status === 'OUT_OF_ORDER').length;
      const occupancyRate = Math.round(((dirty + inspected + outOfOrder) / updatedAreas.length) * 100);
      
      setStats({ 
        total: updatedAreas.length, 
        clean, 
        dirty, 
        inspected, 
        outOfOrder, 
        occupancyRate 
      });
      
      // If we're viewing the area details, update that too
      if (selectedArea && selectedArea.id === areaId) {
        setSelectedArea({ ...selectedArea, status: newStatus, updatedAt: new Date().toISOString() });
      }
      
      // Show success message
      setError('Area status updated successfully');
      setTimeout(() => setError(''), 3000);
    } catch (error) {
      console.error('Error updating area status:', error);
      setError('Failed to update area status');
    }
  };

  const requestInspection = async (areaId: number) => {
    try {
      // Mock inspection request for prototype
      setAreas(areas.map((area: any) => 
        area.id === areaId ? { ...area, status: 'INSPECTED', updatedAt: new Date().toISOString() } : area
      ));
      
      // Update filtered areas as well
      setFilteredAreas(filteredAreas.map((area: any) => 
        area.id === areaId ? { ...area, status: 'INSPECTED', updatedAt: new Date().toISOString() } : area
      ));
      
      // Update stats
      const updatedAreas = areas.map((area: any) => 
        area.id === areaId ? { ...area, status: 'INSPECTED' } : area
      );
      
      const clean = updatedAreas.filter((r: any) => r.status === 'CLEAN').length;
      const dirty = updatedAreas.filter((r: any) => r.status === 'DIRTY').length;
      const inspected = updatedAreas.filter((r: any) => r.status === 'INSPECTED').length;
      const outOfOrder = updatedAreas.filter((r: any) => r.status === 'OUT_OF_ORDER').length;
      const occupancyRate = Math.round(((dirty + inspected + outOfOrder) / updatedAreas.length) * 100);
      
      setStats({ 
        total: updatedAreas.length, 
        clean, 
        dirty, 
        inspected, 
        outOfOrder, 
        occupancyRate 
      });
      
      // If we're viewing the area details, update that too
      if (selectedArea && selectedArea.id === areaId) {
        setSelectedArea({ ...selectedArea, status: 'INSPECTED', updatedAt: new Date().toISOString() });
      }
      
      // Show success message
      setError('Inspection requested successfully');
      setTimeout(() => setError(''), 3000);
    } catch (error) {
      console.error('Error requesting inspection:', error);
      setError('Failed to request inspection');
    }
  };

  const approveInspection = async (areaId: number) => {
    try {
      // Mock approval for prototype
      // In a real implementation, only supervisors could approve
      setAreas(areas.map((area: any) => 
        area.id === areaId ? { ...area, inspectionApproved: true, updatedAt: new Date().toISOString() } : area
      ));
      
      // Update filtered areas as well
      setFilteredAreas(filteredAreas.map((area: any) => 
        area.id === areaId ? { ...area, inspectionApproved: true, updatedAt: new Date().toISOString() } : area
      ));
      
      // If we're viewing the area details, update that too
      if (selectedArea && selectedArea.id === areaId) {
        setSelectedArea({ ...selectedArea, inspectionApproved: true, updatedAt: new Date().toISOString() });
      }
      
      // Show success message
      setError('Inspection approved successfully');
      setTimeout(() => setError(''), 3000);
    } catch (error) {
      console.error('Error approving inspection:', error);
      setError('Failed to approve inspection');
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'CLEAN':
        return 'bg-emerald-100 text-emerald-800'
      case 'DIRTY':
        return 'bg-amber-100 text-amber-800'
      case 'INSPECTED':
        return 'bg-blue-100 text-blue-800'
      case 'OUT_OF_ORDER':
        return 'bg-rose-100 text-rose-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'CLEAN':
        return 'Clean'
      case 'DIRTY':
        return 'Dirty'
      case 'INSPECTED':
        return 'Inspected'
      case 'OUT_OF_ORDER':
        return 'Out of Order'
      default:
        return status
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  const handleAddArea = () => {
    // Mock add area for prototype
    const newId = areas.length > 0 ? Math.max(...areas.map((r: any) => r.id)) + 1 : 1
    const areaToAdd = {
      ...newArea,
      id: newId,
      updatedAt: new Date().toISOString()
    }
    
    setAreas([...areas, areaToAdd])
    setFilteredAreas([...filteredAreas, areaToAdd])
    
    // Update stats
    const clean = newArea.status === 'CLEAN' ? stats.clean + 1 : stats.clean
    const dirty = newArea.status === 'DIRTY' ? stats.dirty + 1 : stats.dirty
    const inspected = newArea.status === 'INSPECTED' ? stats.inspected + 1 : stats.inspected
    const outOfOrder = newArea.status === 'OUT_OF_ORDER' ? stats.outOfOrder + 1 : stats.outOfOrder
    const total = stats.total + 1
    const occupancyRate = Math.round(((dirty + inspected + outOfOrder) / total) * 100)
    
    setStats({ 
      total, 
      clean, 
      dirty, 
      inspected, 
      outOfOrder, 
      occupancyRate 
    })
    
    // Reset form and close modal
    setNewArea({
      number: '',
      floor: 1,
      type: 'Standard',
      status: 'CLEAN'
    })
    setShowAddAreaModal(false)
    
    // Show success message
    setError('Area added successfully')
    setTimeout(() => setError(''), 3000)
  }

  const openAreaDetail = (area: any) => {
    setSelectedArea(area)
    setShowAreaDetailModal(true)
  }

  const closeAreaDetail = () => {
    setShowAreaDetailModal(false)
    setSelectedArea(null)
  }

  // Function to get area status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'CLEAN':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )
      case 'DIRTY':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        )
      case 'INSPECTED':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
          </svg>
        )
      case 'OUT_OF_ORDER':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-rose-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        )
      default:
        return null
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  return (
    <UserLayout user={user} onLogout={handleLogout}>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Housekeeping Management</h2>
            <p className="text-slate-600">Manage area statuses and housekeeping tasks</p>
          </div>
          <button 
            className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center"
            onClick={() => setShowAddAreaModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add New Area
          </button>
        </div>

        {error && (
          <div className={`p-4 rounded-lg mb-6 ${error.includes('Failed') ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700'}`}>
            {error}
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow p-4 text-center border-l-4 border-slate-500">
            <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
            <p className="text-sm text-slate-600">Total Areas</p>
          </div>
          <div className="bg-emerald-50 rounded-xl shadow p-4 text-center border-l-4 border-emerald-500">
            <p className="text-2xl font-bold text-emerald-700">{stats.clean}</p>
            <p className="text-sm text-emerald-600">Clean</p>
          </div>
          <div className="bg-amber-50 rounded-xl shadow p-4 text-center border-l-4 border-amber-500">
            <p className="text-2xl font-bold text-amber-700">{stats.dirty}</p>
            <p className="text-sm text-amber-600">Dirty</p>
          </div>
          <div className="bg-blue-50 rounded-xl shadow p-4 text-center border-l-4 border-blue-500">
            <p className="text-2xl font-bold text-blue-700">{stats.inspected}</p>
            <p className="text-sm text-blue-600">Inspected</p>
          </div>
          <div className="bg-rose-50 rounded-xl shadow p-4 text-center border-l-4 border-rose-500">
            <p className="text-2xl font-bold text-rose-700">{stats.outOfOrder}</p>
            <p className="text-sm text-rose-600">Out of Order</p>
          </div>
          <div className="bg-indigo-50 rounded-xl shadow p-4 text-center border-l-4 border-indigo-500">
            <p className="text-2xl font-bold text-indigo-700">{stats.occupancyRate}%</p>
            <p className="text-sm text-indigo-600">Occupancy</p>
          </div>
        </div>

        {/* Advanced Filters */}
        <div className="bg-white rounded-xl shadow p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-slate-700 mb-1">Search</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                placeholder="Area number or type"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="statusFilter" className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select
                id="statusFilter"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="CLEAN">Clean</option>
                <option value="DIRTY">Dirty</option>
                <option value="INSPECTED">Inspected</option>
                <option value="OUT_OF_ORDER">Out of Order</option>
              </select>
            </div>
            <div>
              <label htmlFor="floorFilter" className="block text-sm font-medium text-slate-700 mb-1">Floor</label>
              <select
                id="floorFilter"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                value={selectedFloor}
                onChange={(e) => setSelectedFloor(e.target.value)}
              >
                <option value="">All Floors</option>
                <option value="1">Floor 1</option>
                <option value="2">Floor 2</option>
                <option value="3">Floor 3</option>
                <option value="4">Floor 4</option>
              </select>
            </div>
            <div>
              <label htmlFor="typeFilter" className="block text-sm font-medium text-slate-700 mb-1">Type</label>
              <select
                id="typeFilter"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="">All Types</option>
                <option value="Standard">Standard</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Suite">Suite</option>
              </select>
            </div>
            <div>
              <label htmlFor="sortBy" className="block text-sm font-medium text-slate-700 mb-1">Sort By</label>
              <select
                id="sortBy"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="number">Area Number</option>
                <option value="floor">Floor</option>
                <option value="type">Type</option>
                <option value="status">Status</option>
              </select>
            </div>
            <div className="flex items-end">
              <button 
                className="w-full bg-slate-100 text-slate-700 py-2 px-4 rounded-lg hover:bg-slate-200 transition duration-300"
                onClick={() => {
                  setSelectedStatus('')
                  setSelectedFloor('')
                  setSelectedType('')
                  setSearchTerm('')
                  setSortBy('number')
                  setSortOrder('asc')
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Area Grid Visualization */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-slate-800">Area Visualization</h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-600">Sort:</span>
              <button 
                className={`text-xs px-2 py-1 rounded ${sortOrder === 'asc' ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-600'}`}
                onClick={() => setSortOrder('asc')}
              >
                Asc
              </button>
              <button 
                className={`text-xs px-2 py-1 rounded ${sortOrder === 'desc' ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-600'}`}
                onClick={() => setSortOrder('desc')}
              >
                Desc
              </button>
            </div>
          </div>
          
          {/* Area Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredAreas.map((area: any) => (
              <div 
                key={area.id} 
                className={`rounded-xl p-4 border-2 transition-all duration-300 hover:shadow-md ${area.status === 'CLEAN' ? 'border-emerald-200 bg-emerald-50' : area.status === 'DIRTY' ? 'border-amber-200 bg-amber-50' : area.status === 'INSPECTED' ? 'border-blue-200 bg-blue-50' : 'border-rose-200 bg-rose-50'}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-800">Area {area.number}</h4>
                    <p className="text-sm text-slate-600">{area.type}</p>
                  </div>
                  <div className={`p-1 rounded-full ${area.status === 'CLEAN' ? 'bg-emerald-100' : area.status === 'DIRTY' ? 'bg-amber-100' : area.status === 'INSPECTED' ? 'bg-blue-100' : 'bg-rose-100'}`}>
                    {getStatusIcon(area.status)}
                  </div>
                </div>
                <div className="mt-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(area.status)}`}>
                    {getStatusText(area.status)}
                  </span>
                </div>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xs text-slate-500">Floor {area.floor}</span>
                  <button
                    onClick={() => openAreaDetail(area)}
                    className="text-xs text-teal-600 hover:text-teal-800"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Area Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Area</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Floor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Last Updated</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {filteredAreas.map((area: any) => (
                  <tr 
                    key={area.id} 
                    className="hover:bg-slate-50 transition-all duration-300"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-teal-400 to-teal-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold">{area.number}</span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-slate-900">Area {area.number}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      Floor {area.floor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      {area.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(area.status)}`}>
                        {getStatusText(area.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {area.updatedAt ? new Date(area.updatedAt).toLocaleString() : 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <select
                          className="px-3 py-1 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm text-slate-800 bg-white"
                          value={area.status}
                          onChange={(e) => updateAreaStatus(area.id, e.target.value)}
                        >
                          <option value="CLEAN">Clean</option>
                          <option value="DIRTY">Dirty</option>
                          <option value="INSPECTED">Inspected</option>
                          <option value="OUT_OF_ORDER">Out of Order</option>
                        </select>
                        {area.status === 'DIRTY' && (
                          <button
                            onClick={() => requestInspection(area.id)}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-sm hover:bg-blue-200"
                          >
                            Inspect
                          </button>
                        )}
                        {area.status === 'INSPECTED' && user && user.role === 'ADMIN' && (
                          <button
                            onClick={() => approveInspection(area.id)}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-md text-sm hover:bg-green-200"
                          >
                            Approve
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add Area Modal */}
      {showAddAreaModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Add New Area</h3>
              <button 
                onClick={() => setShowAddAreaModal(false)}
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
                  <label className="block text-sm font-medium text-slate-700 mb-1">Area Number</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    placeholder="Enter area number"
                    value={newArea.number}
                    onChange={(e) => setNewArea({...newArea, number: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Floor</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    value={newArea.floor}
                    onChange={(e) => setNewArea({...newArea, floor: parseInt(e.target.value)})}
                  >
                    <option value={1}>Floor 1</option>
                    <option value={2}>Floor 2</option>
                    <option value={3}>Floor 3</option>
                    <option value={4}>Floor 4</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Area Type</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    value={newArea.type}
                    onChange={(e) => setNewArea({...newArea, type: e.target.value})}
                  >
                    <option value="Standard">Standard</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Suite">Suite</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Initial Status</label>
                  <select
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                    value={newArea.status}
                    onChange={(e) => setNewArea({...newArea, status: e.target.value})}
                  >
                    <option value="CLEAN">Clean</option>
                    <option value="DIRTY">Dirty</option>
                    <option value="INSPECTED">Inspected</option>
                    <option value="OUT_OF_ORDER">Out of Order</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 bg-slate-50 rounded-b-2xl flex justify-end space-x-3">
              <button 
                className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                onClick={() => setShowAddAreaModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                onClick={handleAddArea}
              >
                Add Area
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Area Detail Modal */}
      {showAreaDetailModal && selectedArea && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-semibold text-slate-800">Area Details - {selectedArea.number}</h3>
              <button 
                onClick={closeAreaDetail}
                className="text-slate-400 hover:text-slate-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-md font-semibold text-slate-800 mb-2">Area Information</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Area Number:</span>
                      <span className="text-sm font-medium">{selectedArea.number}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Floor:</span>
                      <span className="text-sm font-medium">Floor {selectedArea.floor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Type:</span>
                      <span className="text-sm font-medium">{selectedArea.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Status:</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusClass(selectedArea.status)}`}>
                        {getStatusText(selectedArea.status)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-slate-600">Last Updated:</span>
                      <span className="text-sm font-medium">
                        {selectedArea.updatedAt ? new Date(selectedArea.updatedAt).toLocaleString() : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-md font-semibold text-slate-800 mb-2">Actions</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Update Status</label>
                      <select
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                        value={selectedArea.status}
                        onChange={(e) => updateAreaStatus(selectedArea.id, e.target.value)}
                      >
                        <option value="CLEAN">Clean</option>
                        <option value="DIRTY">Dirty</option>
                        <option value="INSPECTED">Inspected</option>
                        <option value="OUT_OF_ORDER">Out of Order</option>
                      </select>
                    </div>
                    {selectedArea.status === 'DIRTY' && (
                      <button
                        onClick={() => requestInspection(selectedArea.id)}
                        className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300"
                      >
                        Request Inspection
                      </button>
                    )}
                    {selectedArea.status === 'INSPECTED' && user && user.role === 'ADMIN' && (
                      <button
                        onClick={() => approveInspection(selectedArea.id)}
                        className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition duration-300"
                      >
                        Approve Inspection
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-md font-semibold text-slate-800 mb-2">Recent Activity</h4>
                <div className="border border-slate-200 rounded-lg p-4">
                  <p className="text-sm text-slate-600">No recent activity for this area</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="text-md font-semibold text-slate-800 mb-2">Housekeeping Notes</h4>
                <textarea
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-800 bg-white"
                  placeholder="Add notes about this area..."
                  rows={3}
                />
                <div className="mt-2 flex justify-end">
                  <button className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300">
                    Save Notes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </UserLayout>
  )
}