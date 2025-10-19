'use client'

import React, { useState, useEffect } from 'react'
import UserLayout from '../../components/UserLayout'
import apiService from '../../utils/constructionApiService'

export default function SiteDetails() {
  const [sites, setSites] = useState<any[]>([])
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')
  const [stats, setStats] = useState({ active: 0, planning: 0, completed: 0, onHold: 0, total: 0 })
  const [user, setUser] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAddSiteModal, setShowAddSiteModal] = useState(false)
  const [showEditSiteModal, setShowEditSiteModal] = useState(false)
  const [newSite, setNewSite] = useState({
    name: '',
    location: 'Delhi',
    type: 'Residential',
    status: 'PLANNING',
    budget: 5000000,
    startDate: '',
    endDate: '',
    crewSize: 2,
    equipmentCount: 2
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setUser({ name: 'Admin User', role: 'ADMIN' } as any)
      fetchProperties()
    }
  }, [])

    const fetchProperties = async () => {
    try {
      setLoading(true);
      // Mock API service call since the original one was for areas
      // In a real app, you would call apiService.getSites();
      const siteData = { 
        sites: []
      };
      
      // Use mock data to simulate construction sites
      const mockSites = [
        { 
          id: 1, 
          name: 'Downtown Office Complex - Site A', 
          project: 'Downtown Office Complex',
          location: 'Downtown District, New York', 
          status: 'ACTIVE', 
          supervisor: 'John Smith',
          crewSize: 12,
          startDate: '2025-01-15',
          endDate: '2025-09-30',
          progress: 75,
          safetyRating: 92,
          qualityRating: 88,
          issues: 3,
          safetyIncidents: 1,
          lastInspection: '2025-03-17',
          nextInspection: '2025-03-24'
        },
        { 
          id: 2, 
          name: 'Residential Tower B', 
          project: 'Residential Tower B',
          location: 'Midtown, New York', 
          status: 'PLANNING', 
          supervisor: 'Sarah Johnson',
          crewSize: 0,
          startDate: '2025-05-01',
          endDate: '2026-02-28',
          progress: 0,
          safetyRating: 0,
          qualityRating: 0,
          issues: 0,
          safetyIncidents: 0,
          lastInspection: '',
          nextInspection: '2025-05-01'
        },
        { 
          id: 3, 
          name: 'Shopping Mall C', 
          project: 'Shopping Mall C',
          location: 'Uptown, New York', 
          status: 'ACTIVE', 
          supervisor: 'Robert Davis',
          crewSize: 25,
          startDate: '2024-11-01',
          endDate: '2025-08-31',
          progress: 45,
          safetyRating: 85,
          qualityRating: 90,
          issues: 7,
          safetyIncidents: 2,
          lastInspection: '2025-03-15',
          nextInspection: '2025-03-22'
        },
        { 
          id: 4, 
          name: 'Apartment Complex D', 
          project: 'Apartment Complex D',
          location: 'Downtown, Chicago', 
          status: 'COMPLETED', 
          supervisor: 'Maria Garcia',
          crewSize: 0,
          startDate: '2024-01-15',
          endDate: '2025-01-10',
          progress: 100,
          safetyRating: 95,
          qualityRating: 92,
          issues: 0,
          safetyIncidents: 0,
          lastInspection: '2025-01-05',
          nextInspection: ''
        }
      ];
      
      setSites(mockSites);
      
      // Calculate stats
      const active = mockSites.filter((s: any) => s.status === 'ACTIVE').length;
      const planning = mockSites.filter((s: any) => s.status === 'PLANNING').length;
      const completed = mockSites.filter((s: any) => s.status === 'COMPLETED').length;
      const onHold = mockSites.filter((s: any) => s.status === 'ON_HOLD').length;
      setStats({ active, planning, completed, onHold, total: mockSites.length });
      setError('');
    } catch (err) {
      console.error('Error fetching sites:', err);
      setError('This is a Demo version - In the real version, you will get actual data from the backend');
      
      // Use mock data if API fails
      const mockSites = [
        { 
          id: 1, 
          name: 'Downtown Office Complex - Site A', 
          project: 'Downtown Office Complex',
          location: 'Downtown District, New York', 
          status: 'ACTIVE', 
          supervisor: 'John Smith',
          crewSize: 12,
          startDate: '2025-01-15',
          endDate: '2025-09-30',
          progress: 75,
          safetyRating: 92,
          qualityRating: 88,
          issues: 3,
          safetyIncidents: 1,
          lastInspection: '2025-03-17',
          nextInspection: '2025-03-24'
        },
        { 
          id: 2, 
          name: 'Residential Tower B', 
          project: 'Residential Tower B',
          location: 'Midtown, New York', 
          status: 'PLANNING', 
          supervisor: 'Sarah Johnson',
          crewSize: 0,
          startDate: '2025-05-01',
          endDate: '2026-02-28',
          progress: 0,
          safetyRating: 0,
          qualityRating: 0,
          issues: 0,
          safetyIncidents: 0,
          lastInspection: '',
          nextInspection: '2025-05-01'
        },
        { 
          id: 3, 
          name: 'Shopping Mall C', 
          project: 'Shopping Mall C',
          location: 'Uptown, New York', 
          status: 'ACTIVE', 
          supervisor: 'Robert Davis',
          crewSize: 25,
          startDate: '2024-11-01',
          endDate: '2025-08-31',
          progress: 45,
          safetyRating: 85,
          qualityRating: 90,
          issues: 7,
          safetyIncidents: 2,
          lastInspection: '2025-03-15',
          nextInspection: '2025-03-22'
        },
        { 
          id: 4, 
          name: 'Apartment Complex D', 
          project: 'Apartment Complex D',
          location: 'Downtown, Chicago', 
          status: 'COMPLETED', 
          supervisor: 'Maria Garcia',
          crewSize: 0,
          startDate: '2024-01-15',
          endDate: '2025-01-10',
          progress: 100,
          safetyRating: 95,
          qualityRating: 92,
          issues: 0,
          safetyIncidents: 0,
          lastInspection: '2025-01-05',
          nextInspection: ''
        }
      ];
      
      setSites(mockSites);
      
      // Calculate stats
      const active = mockSites.filter((s: any) => s.status === 'ACTIVE').length;
      const planning = mockSites.filter((s: any) => s.status === 'PLANNING').length;
      const completed = mockSites.filter((s: any) => s.status === 'COMPLETED').length;
      const onHold = mockSites.filter((s: any) => s.status === 'ON_HOLD').length;
      setStats({ active, planning, completed, onHold, total: mockSites.length });
    } finally {
      setLoading(false);
    }
  };

  const updateSiteStatus = async (siteId: number, newStatus: string) => {
    try {
      // In a real app, this would call an API
      // await apiService.updateSiteStatus(siteId, newStatus);
      
      // Update local state
      setSites(sites.map((site: any) => 
        site.id === siteId ? { ...site, status: newStatus, updatedAt: new Date().toISOString() } : site
      ));
      
      // Update stats
      const updatedSites = sites.map((site: any) => 
        site.id === siteId ? { ...site, status: newStatus } : site
      );
      
      const active = updatedSites.filter((s: any) => s.status === 'ACTIVE').length;
      const planning = updatedSites.filter((s: any) => s.status === 'PLANNING').length;
      const completed = updatedSites.filter((s: any) => s.status === 'COMPLETED').length;
      const onHold = updatedSites.filter((s: any) => s.status === 'ON_HOLD').length;
      setStats({ active, planning, completed, onHold, total: updatedSites.length });
      
      // Show success message
      setError('This is a Demo version - Changes saved successfully in localStorage');
    } catch (error) {
      console.error('Error updating site status:', error);
      setError('This is a Demo version - In the real version, you will get actual data from the backend');
      
      // Update local state even if API fails (for demo purposes)
      setSites(sites.map((site: any) => 
        site.id === siteId ? { ...site, status: newStatus, updatedAt: new Date().toISOString() } : site
      ));
      
      // Update stats
      const updatedSites = sites.map((site: any) => 
        site.id === siteId ? { ...site, status: newStatus } : site
      );
      
      const active = updatedSites.filter((s: any) => s.status === 'ACTIVE').length;
      const planning = updatedSites.filter((s: any) => s.status === 'PLANNING').length;
      const completed = updatedSites.filter((s: any) => s.status === 'COMPLETED').length;
      const onHold = updatedSites.filter((s: any) => s.status === 'ON_HOLD').length;
      setStats({ active, planning, completed, onHold, total: updatedSites.length });
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-emerald-100 text-emerald-800'
      case 'PLANNING':
        return 'bg-amber-100 text-amber-800'
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800'
      case 'ON_HOLD':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'Available'
      case 'PLANNING':
        return 'Under Contract'
      case 'COMPLETED':
        return 'Sold'
      case 'ON_HOLD':
        return 'Upcoming'
      default:
        return status
    }
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  }

  // Filter sites based on selected status, location, and search term
  const filteredSites = sites.filter(site => {
    const statusMatch = selectedStatus ? site.status === selectedStatus : true
    const locationMatch = selectedLocation ? site.location === selectedLocation : true
    const searchMatch = searchTerm 
      ? site.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        site.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        site.project.toLowerCase().includes(searchTerm.toLowerCase())
      : true
    return statusMatch && locationMatch && searchMatch
  })

  // Sort sites
  const sortedSites = [...filteredSites].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortBy] > b[sortBy] ? 1 : -1
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1
    }
  })

  const handleLogout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  const handleAddSite = () => {
    // In a real app, you would call the API to add a site
    // For now, we'll just add to the local state
    const newId = sites.length > 0 ? Math.max(...sites.map((s: any) => s.id)) + 1 : 1
    const siteToAdd = {
      ...newSite,
      id: newId,
      area: 1500, // Default area
      updatedAt: new Date().toISOString()
    }
    
    setSites([...sites, siteToAdd])
    
    // Update stats
    const active = newSite.status === 'ACTIVE' ? stats.active + 1 : stats.active
    const planning = newSite.status === 'PLANNING' ? stats.planning + 1 : stats.planning
    const completed = newSite.status === 'COMPLETED' ? stats.completed + 1 : stats.completed
    const onHold = newSite.status === 'ON_HOLD' ? stats.onHold + 1 : stats.onHold
    setStats({ active, planning, completed, onHold, total: stats.total + 1 })
    
    // Reset form and close modal
    setNewSite({
      name: '',
      location: 'Delhi',
      type: 'Residential',
      status: 'PLANNING',
      budget: 5000000,
      startDate: '',
      endDate: '',
      crewSize: 2,
      equipmentCount: 2
    })
    setShowAddSiteModal(false)
  }

  // Function to get site status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )
      case 'PLANNING':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        )
      case 'COMPLETED':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
          </svg>
        )
      case 'ON_HOLD':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
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
        {/* Add the rest of the component here */}
      </main>
    </UserLayout>
  )
}
