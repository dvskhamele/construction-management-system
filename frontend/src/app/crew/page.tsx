'use client'

import React, { useState } from 'react'

export default function BasicResponsiveCrewPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // Simple mock data
  const crewMembers = [
    {
      id: 1,
      name: 'John Smith',
      department: 'Foundation',
      position: 'Foreman',
      status: 'Active',
      performance: 92
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      department: 'Foundation',
      position: 'Laborer',
      status: 'Break',
      performance: 87
    },
    {
      id: 3,
      name: 'Mike Chen',
      department: 'Framing',
      position: 'Framer',
      status: 'Active',
      performance: 95
    },
    {
      id: 4,
      name: 'Emma Davis',
      department: 'Electrical',
      position: 'Electrician',
      status: 'Offline',
      performance: 88
    }
  ]

  return (
    <div className="basic-responsive-crew">
      {/* Mobile Menu Button */}
      <div className="mobile-header">
        <button 
          className="menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
        <h1>BuildMate</h1>
        <div></div> {/* spacer */}
      </div>

      {/* Sidebar Menu */}
      <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Navigation</h2>
          <button 
            className="close-button"
            onClick={() => setIsMenuOpen(false)}
          >
            ×
          </button>
        </div>
        <nav>
          <ul>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/tasks">Tasks</a></li>
            <li><a href="/projects">Projects</a></li>
            <li><a href="/crew" className="active">Crew</a></li>
            <li><a href="/equipment">Equipment</a></li>
            <li><a href="/analytics">Analytics</a></li>
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isMenuOpen && (
        <div 
          className="overlay"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <div className="main-content">
        <div className="page-header">
          <h1>Crew Management</h1>
          <p>Manage your construction crew and track performance</p>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{crewMembers.length}</h3>
            <p>Total Crew</p>
          </div>
          <div className="stat-card">
            <h3>{crewMembers.filter(m => m.status === 'Active').length}</h3>
            <p>Active</p>
          </div>
          <div className="stat-card">
            <h3>{crewMembers.filter(m => m.status === 'Break').length}</h3>
            <p>On Break</p>
          </div>
          <div className="stat-card">
            <h3>{crewMembers.filter(m => m.status === 'Offline').length}</h3>
            <p>Offline</p>
          </div>
        </div>

        {/* Crew List */}
        <div className="crew-grid">
          {crewMembers.map(member => (
            <div key={member.id} className="crew-card">
              <div className="crew-header">
                <div className="avatar">{member.name.charAt(0)}</div>
                <div className="crew-info">
                  <h3>{member.name}</h3>
                  <p>{member.position}</p>
                </div>
                <span className={`status ${member.status.toLowerCase()}`}>
                  {member.status}
                </span>
              </div>
              <div className="crew-details">
                <p><strong>Department:</strong> {member.department}</p>
                <p><strong>Performance:</strong> {member.performance}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Simple CSS Styles */}
      <style jsx>{`
        .basic-responsive-crew {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        /* Mobile Header */
        .mobile-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: #0d9488;
          color: white;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .menu-button {
          background: none;
          border: none;
          color: white;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0;
          width: 24px;
          height: 24px;
        }

        /* Sidebar */
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 280px;
          height: 100vh;
          background: white;
          box-shadow: 2px 0 5px rgba(0,0,0,0.1);
          transform: translateX(-100%);
          transition: transform 0.3s ease;
          z-index: 90;
          overflow-y: auto;
        }

        .sidebar.open {
          transform: translateX(0);
        }

        .sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          border-bottom: 1px solid #eee;
        }

        .close-button {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0;
          width: 24px;
          height: 24px;
        }

        .sidebar nav ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .sidebar nav li {
          border-bottom: 1px solid #eee;
        }

        .sidebar nav a {
          display: block;
          padding: 1rem;
          text-decoration: none;
          color: #333;
        }

        .sidebar nav a.active {
          background: #0d9488;
          color: white;
        }

        /* Overlay */
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          z-index: 80;
        }

        /* Main Content */
        .main-content {
          flex: 1;
          padding: 1rem;
          margin-left: 0;
          transition: margin-left 0.3s ease;
        }

        .page-header h1 {
          font-size: 1.5rem;
          margin: 0 0 0.5rem 0;
          color: #333;
        }

        .page-header p {
          margin: 0;
          color: #666;
          font-size: 0.9rem;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          margin: 1rem 0;
        }

        .stat-card {
          background: white;
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          text-align: center;
        }

        .stat-card h3 {
          margin: 0 0 0.5rem 0;
          color: #0d9488;
          font-size: 1.5rem;
        }

        .stat-card p {
          margin: 0;
          color: #666;
          font-size: 0.9rem;
        }

        /* Crew Grid */
        .crew-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1rem;
        }

        .crew-card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          padding: 1rem;
        }

        .crew-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .avatar {
          width: 48px;
          height: 48px;
          border-radius: 8px;
          background: #0d9488;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.2rem;
        }

        .crew-info {
          flex: 1;
        }

        .crew-info h3 {
          margin: 0 0 0.25rem 0;
          font-size: 1.1rem;
          color: #333;
        }

        .crew-info p {
          margin: 0;
          color: #666;
          font-size: 0.9rem;
        }

        .status {
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .status.active {
          background: #dcfce7;
          color: #166534;
        }

        .status.break {
          background: #fef3c7;
          color: #92400e;
        }

        .status.offline {
          background: #f1f5f9;
          color: #0f172a;
        }

        .crew-details p {
          margin: 0.25rem 0;
          font-size: 0.9rem;
          color: #666;
        }

        /* Desktop Styles */
        @media (min-width: 768px) {
          .mobile-header {
            display: none;
          }

          .sidebar {
            transform: translateX(0);
            position: relative;
            width: 250px;
            height: auto;
          }

          .main-content {
            margin-left: 250px;
          }

          .stats-grid {
            grid-template-columns: repeat(4, 1fr);
          }

          .crew-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Larger Desktop */
        @media (min-width: 1024px) {
          .crew-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>
    </div>
  )
}