'use client'

import React, { useState, useEffect } from 'react'
import ResponsiveSidebarLayout from '../../components/ResponsiveSidebarLayout'

// Simple mock data for demonstration
const mockCrewMembers = [
  {
    id: 1,
    name: 'John Smith',
    department: 'Foundation',
    position: 'Foreman',
    status: 'Active',
    email: 'john.smith@example.com',
    phone: '+1234567890',
    hireDate: '2022-01-15',
    performance: 92,
    schedule: '7:00 AM - 3:00 PM',
    attendance: '100%'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    department: 'Foundation',
    position: 'Laborer',
    status: 'Break',
    email: 'sarah.johnson@example.com',
    phone: '+1234567891',
    hireDate: '2022-03-22',
    performance: 87,
    schedule: '7:00 AM - 3:00 PM',
    attendance: '95%'
  },
  {
    id: 3,
    name: 'Mike Chen',
    department: 'Framing',
    position: 'Framer',
    status: 'Active',
    email: 'mike.chen@example.com',
    phone: '+1234567892',
    hireDate: '2021-11-05',
    performance: 95,
    schedule: '8:00 AM - 4:00 PM',
    attendance: '98%'
  },
  {
    id: 4,
    name: 'Emma Davis',
    department: 'Electrical',
    position: 'Electrician',
    status: 'Offline',
    email: 'emma.davis@example.com',
    phone: '+1234567893',
    hireDate: '2020-07-18',
    performance: 88,
    schedule: '9:00 AM - 5:00 PM',
    attendance: '92%'
  }
]

export default function SimpleCrewPage() {
  const [user, setUser] = useState<any>({ name: 'Crew Manager', role: 'ADMIN' })
  const [crewMembers, setCrewMembers] = useState<any[]>(mockCrewMembers)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('')
  const [sortBy, setSortBy] = useState('name')

  const handleLogout = () => {
    console.log('Logout clicked')
  }

  // Filter and sort crew members
  const filteredAndSortedCrew = crewMembers
    .filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.department.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesDepartment = !selectedDepartment || member.department === selectedDepartment
      const matchesStatus = !selectedStatus || member.status === selectedStatus
      
      return matchesSearch && matchesDepartment && matchesStatus
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'performance') return b.performance - a.performance
      if (sortBy === 'department') return a.department.localeCompare(b.department)
      return 0
    })

  // Get unique departments for filter
  const departments = Array.from(new Set(crewMembers.map(m => m.department)))

  return (
    <ResponsiveSidebarLayout 
      user={user} 
      onLogout={handleLogout}
    >
      <div className="simple-crew-page">
        {/* Header */}
        <div className="simple-header">
          <h1 className="simple-title">Crew Management</h1>
          <p className="simple-subtitle">Manage and track your construction crew</p>
        </div>

        {/* Stats Cards */}
        <div className="simple-stats-grid">
          <div className="simple-stat-card">
            <span className="simple-stat-value">{crewMembers.length}</span>
            <span className="simple-stat-label">Total Crew</span>
          </div>
          <div className="simple-stat-card">
            <span className="simple-stat-value">{crewMembers.filter(m => m.status === 'Active').length}</span>
            <span className="simple-stat-label">Active</span>
          </div>
          <div className="simple-stat-card">
            <span className="simple-stat-value">{crewMembers.filter(m => m.status === 'Break').length}</span>
            <span className="simple-stat-label">On Break</span>
          </div>
          <div className="simple-stat-card">
            <span className="simple-stat-value">{crewMembers.filter(m => m.status === 'Offline').length}</span>
            <span className="simple-stat-label">Offline</span>
          </div>
        </div>

        {/* Filters */}
        <div className="simple-filters">
          <div className="simple-filter-group">
            <input
              type="text"
              placeholder="Search crew members..."
              className="simple-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="simple-filter-row">
            <select
              className="simple-select"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            
            <select
              className="simple-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Break">Break</option>
              <option value="Offline">Offline</option>
            </select>
            
            <select
              className="simple-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="performance">Sort by Performance</option>
              <option value="department">Sort by Department</option>
            </select>
          </div>
        </div>

        {/* Crew Grid */}
        <div className="simple-crew-grid">
          {filteredAndSortedCrew.map(member => (
            <div key={member.id} className="simple-crew-card">
              <div className="simple-card-header">
                <div className="simple-avatar">
                  <span className="simple-avatar-text">{member.name.charAt(0)}</span>
                </div>
                <div className="simple-member-info">
                  <h3 className="simple-member-name">{member.name}</h3>
                  <p className="simple-member-position">{member.position}</p>
                </div>
                <span className={`simple-status-badge simple-status-${member.status.toLowerCase()}`}>
                  {member.status}
                </span>
              </div>
              
              <div className="simple-card-body">
                <div className="simple-info-row">
                  <span className="simple-info-label">Department</span>
                  <span className="simple-info-value">{member.department}</span>
                </div>
                
                <div className="simple-info-row">
                  <span className="simple-info-label">Schedule</span>
                  <span className="simple-info-value">{member.schedule}</span>
                </div>
                
                <div className="simple-info-row">
                  <span className="simple-info-label">Hire Date</span>
                  <span className="simple-info-value">{new Date(member.hireDate).toLocaleDateString()}</span>
                </div>
                
                <div className="simple-info-row">
                  <span className="simple-info-label">Attendance</span>
                  <span className="simple-info-value">{member.attendance}</span>
                </div>
                
                <div className="simple-performance-section">
                  <div className="simple-performance-header">
                    <span className="simple-info-label">Performance</span>
                    <span className="simple-performance-score">{member.performance}%</span>
                  </div>
                  <div className="simple-progress-bar">
                    <div 
                      className="simple-progress-fill"
                      style={{ width: `${member.performance}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="simple-card-footer">
                <button className="simple-action-button">
                  View Schedule
                </button>
                <button className="simple-action-button simple-action-secondary">
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Global styles */}
        <style jsx global>{`
          .simple-crew-page {
            padding: 1rem;
            max-width: 100%;
            overflow-x: hidden;
          }
          
          .simple-header {
            margin-bottom: 1.5rem;
          }
          
          .simple-title {
            font-size: 1.5rem;
            font-weight: bold;
            color: #0f172a;
            margin: 0 0 0.5rem 0;
          }
          
          .simple-subtitle {
            font-size: 0.875rem;
            color: #64748b;
            margin: 0;
          }
          
          .simple-stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
            gap: 1rem;
            margin-bottom: 1.5rem;
          }
          
          .simple-stat-card {
            background: white;
            border-radius: 0.5rem;
            padding: 1rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            text-align: center;
          }
          
          .simple-stat-value {
            display: block;
            font-size: 1.5rem;
            font-weight: bold;
            color: #0d9488;
            margin-bottom: 0.25rem;
          }
          
          .simple-stat-label {
            font-size: 0.75rem;
            color: #64748b;
          }
          
          .simple-filters {
            background: white;
            border-radius: 0.5rem;
            padding: 1rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            margin-bottom: 1.5rem;
          }
          
          .simple-search-input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #cbd5e1;
            border-radius: 0.375rem;
            font-size: 0.875rem;
            margin-bottom: 1rem;
          }
          
          .simple-filter-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.75rem;
          }
          
          .simple-select {
            width: 100%;
            padding: 0.5rem;
            border: 1px solid #cbd5e1;
            border-radius: 0.375rem;
            font-size: 0.875rem;
            background-color: white;
          }
          
          .simple-crew-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 1rem;
          }
          
          .simple-crew-card {
            background: white;
            border-radius: 0.5rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            height: 100%;
          }
          
          .simple-card-header {
            display: flex;
            align-items: center;
            padding: 1rem;
            border-bottom: 1px solid #e2e8f0;
          }
          
          .simple-avatar {
            width: 3rem;
            height: 3rem;
            border-radius: 0.5rem;
            background: linear-gradient(135deg, #0d9488, #0f766e);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
          }
          
          .simple-avatar-text {
            color: white;
            font-weight: bold;
            font-size: 1.125rem;
          }
          
          .simple-member-info {
            margin: 0 0.75rem;
            flex-grow: 1;
            min-width: 0;
          }
          
          .simple-member-name {
            font-size: 1rem;
            font-weight: 600;
            color: #0f172a;
            margin: 0 0 0.125rem 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .simple-member-position {
            font-size: 0.875rem;
            color: #64748b;
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .simple-status-badge {
            padding: 0.25rem 0.5rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 500;
            white-space: nowrap;
          }
          
          .simple-status-active {
            background-color: #dcfce7;
            color: #166534;
          }
          
          .simple-status-break {
            background-color: #fef3c7;
            color: #92400e;
          }
          
          .simple-status-offline {
            background-color: #f1f5f9;
            color: #0f172a;
          }
          
          .simple-card-body {
            padding: 1rem;
            flex-grow: 1;
          }
          
          .simple-info-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.75rem;
          }
          
          .simple-info-row:last-child {
            margin-bottom: 0;
          }
          
          .simple-info-label {
            font-size: 0.75rem;
            color: #64748b;
          }
          
          .simple-info-value {
            font-size: 0.875rem;
            font-weight: 500;
            color: #0f172a;
            text-align: right;
            max-width: 60%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          
          .simple-performance-section {
            margin-top: 1rem;
          }
          
          .simple-performance-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.5rem;
          }
          
          .simple-performance-score {
            font-size: 0.875rem;
            font-weight: 600;
            color: #0f172a;
          }
          
          .simple-progress-bar {
            height: 0.5rem;
            background-color: #e2e8f0;
            border-radius: 0.25rem;
            overflow: hidden;
          }
          
          .simple-progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #0d9488, #0f766e);
            border-radius: 0.25rem;
            transition: width 0.3s ease;
          }
          
          .simple-card-footer {
            display: flex;
            padding: 1rem;
            border-top: 1px solid #e2e8f0;
            gap: 0.5rem;
          }
          
          .simple-action-button {
            flex: 1;
            padding: 0.5rem;
            border-radius: 0.375rem;
            border: none;
            font-size: 0.875rem;
            font-weight: 500;
            cursor: pointer;
            background-color: #0d9488;
            color: white;
            transition: background-color 0.2s;
          }
          
          .simple-action-button:hover {
            background-color: #0f766e;
          }
          
          .simple-action-secondary {
            background-color: #f1f5f9;
            color: #0f172a;
          }
          
          .simple-action-secondary:hover {
            background-color: #e2e8f0;
          }
          
          /* Mobile-first responsive adjustments */
          @media (max-width: 640px) {
            .simple-crew-page {
              padding: 0.75rem;
            }
            
            .simple-stats-grid {
              grid-template-columns: repeat(2, 1fr);
            }
            
            .simple-filter-row {
              grid-template-columns: 1fr;
            }
            
            .simple-crew-grid {
              grid-template-columns: 1fr;
            }
            
            .simple-title {
              font-size: 1.25rem;
            }
            
            .simple-card-footer {
              flex-direction: column;
            }
          }
          
          @media (min-width: 641px) and (max-width: 768px) {
            .simple-crew-grid {
              grid-template-columns: repeat(2, 1fr);
            }
            
            .simple-filter-row {
              grid-template-columns: 1fr;
            }
          }
          
          @media (min-width: 769px) {
            .simple-crew-page {
              padding: 1.5rem;
            }
            
            .simple-title {
              font-size: 1.75rem;
            }
            
            .simple-stats-grid {
              grid-template-columns: repeat(4, 1fr);
            }
          }
          
          /* Ensure no horizontal overflow */
          body, html {
            overflow-x: hidden;
            max-width: 100vw;
          }
        `}</style>
      </div>
    </ResponsiveSidebarLayout>
  )
}