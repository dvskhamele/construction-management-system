'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface User {
  name: string
  role: string
}

interface SimpleResponsiveLayoutProps {
  user: User | null
  onLogout: () => void
  children: React.ReactNode
}

const SimpleResponsiveLayout: React.FC<SimpleResponsiveLayoutProps> = ({ 
  user, 
  onLogout, 
  children 
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    // Check window width and set initial state
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      // Close sidebar on desktop
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  // Define role-based navigation items
  const getNavItems = (): any[] => {
    const baseItems: any[] = [
      { name: 'Dashboard', href: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
      { name: 'Tasks', href: '/tasks', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    ]

    // Add items based on role
    if (user?.role === 'ADMIN' || user?.role === 'PROJECT_MANAGER') {
      baseItems.push(
        { name: 'Projects', href: '/projects', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { name: 'Sites', href: '/sites', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { name: 'Crew', href: '/crew', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
        { name: 'Equipment', href: '/equipment', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
        { name: 'Analytics', href: '/analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
        { name: 'Subcontractors', href: '/subcontractors', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' }
      )
    }

    if (user?.role === 'ADMIN' || user?.role === 'PROJECT_MANAGER' || user?.role === 'SITE_SUPERVISOR') {
      baseItems.push(
        { name: 'Defects', href: '/defects', icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z' },
        { name: 'Safety', href: '/safety', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
        { name: 'Materials', href: '/materials', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' }
      )
    }

    if (user?.role === 'ADMIN' || user?.role === 'PROJECT_MANAGER' || user?.role === 'CREW_LEADER') {
      baseItems.push(
        { name: 'Crew Tracking', href: '/crew-tracking', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zm-9.193-3.515a4 4 0 105.656 0M9 10h.01M15 10h.01' }
      )
    }

    if (user?.role === 'ADMIN') {
      baseItems.push(
        { name: 'Admin', href: '/admin', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.857M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' }
      )
    }

    return baseItems
  }

  const navItems = getNavItems()

  return (
    <div className="simple-responsive-layout">
      {/* Mobile header */}
      <header className="simple-mobile-header">
        <button 
          className="simple-menu-button"
          onClick={toggleSidebar}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="simple-menu-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <div className="simple-logo-container">
          <Link href="/dashboard" className="simple-logo-link">
            <span className="simple-logo-text">BuildMate</span>
          </Link>
        </div>
        
        <div className="simple-spacer"></div>
      </header>

      {/* Sidebar overlay for mobile */}
      {isSidebarOpen && (
        <div className="simple-sidebar-overlay" onClick={closeSidebar}></div>
      )}

      {/* Sidebar */}
      <aside className={`simple-sidebar ${isSidebarOpen ? 'simple-sidebar-open' : ''}`}>
        <div className="simple-sidebar-header">
          <Link href="/dashboard" className="simple-sidebar-logo" onClick={closeSidebar}>
            <span className="simple-sidebar-logo-text">BuildMate</span>
          </Link>
          <button 
            className="simple-close-button"
            onClick={closeSidebar}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="simple-close-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav className="simple-nav">
          <ul className="simple-nav-list">
            {navItems.map((item) => (
              <li key={item.name} className="simple-nav-item">
                <Link
                  href={item.href}
                  className={`simple-nav-link ${pathname === item.href ? 'simple-nav-link-active' : ''}`}
                  onClick={closeSidebar}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="simple-nav-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                  <span className="simple-nav-text">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="simple-user-section">
          <div className="simple-user-info">
            <div className="simple-user-avatar">
              <span className="simple-user-initial">{user?.name?.charAt(0) || 'U'}</span>
            </div>
            <div className="simple-user-details">
              <p className="simple-user-name">{user?.name || 'User'}</p>
              <p className="simple-user-role">{user?.role || 'USER'}</p>
            </div>
          </div>
          <button
            onClick={() => {
              onLogout()
              closeSidebar()
            }}
            className="simple-logout-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="simple-logout-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="simple-logout-text">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="simple-main-content">
        {children}
      </main>

      {/* Global styles for the layout */}
      <style jsx global>{`
        .simple-responsive-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: linear-gradient(to bottom right, #f0f9ff, #e0f2fe);
        }

        .simple-mobile-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          background-color: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .simple-menu-button {
          padding: 0.5rem;
          border-radius: 0.375rem;
          background-color: #f1f5f9;
          border: none;
          cursor: pointer;
        }

        .simple-menu-icon {
          width: 1.5rem;
          height: 1.5rem;
          color: #0f172a;
        }

        .simple-logo-container {
          flex-grow: 1;
          text-align: center;
        }

        .simple-logo-link {
          font-size: 1.25rem;
          font-weight: bold;
          color: #0d9488;
          text-decoration: none;
        }

        .simple-spacer {
          width: 2.5rem;
        }

        .simple-sidebar-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 40;
          display: none;
        }

        .simple-sidebar {
          position: fixed;
          inset-y: 0;
          left: 0;
          z-index: 50;
          width: 16rem;
          background-color: white;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          display: flex;
          flex-direction: column;
          transform: translateX(-100%);
          transition: transform 0.3s ease-in-out;
        }

        .simple-sidebar-open {
          transform: translateX(0);
        }

        .simple-sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .simple-sidebar-logo {
          font-size: 1.25rem;
          font-weight: bold;
          color: #0d9488;
          text-decoration: none;
        }

        .simple-close-button {
          display: none;
          padding: 0.5rem;
          border-radius: 0.375rem;
          background-color: #f1f5f9;
          border: none;
          cursor: pointer;
        }

        .simple-close-icon {
          width: 1.5rem;
          height: 1.5rem;
          color: #0f172a;
        }

        .simple-nav {
          flex-grow: 1;
          overflow-y: auto;
          padding: 1rem 0;
        }

        .simple-nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .simple-nav-item {
          margin-bottom: 0.25rem;
        }

        .simple-nav-link {
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem;
          text-decoration: none;
          color: #64748b;
          transition: all 0.2s;
        }

        .simple-nav-link:hover {
          background-color: #f1f5f9;
          color: #0f172a;
        }

        .simple-nav-link-active {
          background-color: #0d9488;
          color: white;
          border-right: 4px solid #0f172a;
        }

        .simple-nav-link-active:hover {
          background-color: #0d9488;
          color: white;
        }

        .simple-nav-icon {
          width: 1.25rem;
          height: 1.25rem;
          margin-right: 0.75rem;
          flex-shrink: 0;
        }

        .simple-nav-text {
          font-size: 0.875rem;
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .simple-user-section {
          padding: 1rem;
          border-top: 1px solid #e2e8f0;
          margin-top: auto;
        }

        .simple-user-info {
          display: flex;
          align-items: center;
          margin-bottom: 1rem;
        }

        .simple-user-avatar {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 0.5rem;
          background-color: #cbd5e1;
          flex-shrink: 0;
        }

        .simple-user-initial {
          font-weight: bold;
          color: #475569;
        }

        .simple-user-details {
          margin-left: 0.75rem;
          overflow: hidden;
        }

        .simple-user-name {
          font-size: 0.875rem;
          font-weight: 600;
          color: #0f172a;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .simple-user-role {
          font-size: 0.75rem;
          color: #64748b;
          margin: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .simple-logout-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 0.5rem;
          border-radius: 0.5rem;
          background-color: #f1f5f9;
          border: none;
          color: #475569;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }

        .simple-logout-button:hover {
          background-color: #e2e8f0;
        }

        .simple-logout-icon {
          width: 1rem;
          height: 1rem;
          margin-right: 0.5rem;
        }

        .simple-main-content {
          flex: 1;
          margin-left: 0;
          transition: margin-left 0.3s ease-in-out;
          padding: 0;
        }

        /* Desktop styles */
        @media (min-width: 768px) {
          .simple-sidebar {
            transform: translateX(0);
            position: relative;
            width: 16rem;
          }

          .simple-main-content {
            margin-left: 16rem;
          }

          .simple-close-button {
            display: block;
          }
        }

        /* Mobile sidebar overlay */
        @media (max-width: 767px) {
          .simple-sidebar-open + .simple-sidebar-overlay {
            display: block;
          }
        }

        /* Ensure content doesn't overflow */
        .simple-main-content > * {
          max-width: 100%;
          overflow-x: hidden;
        }

        /* Fix for content visibility */
        body {
          overflow-x: hidden;
        }
      `}</style>
    </div>
  )
}

export default SimpleResponsiveLayout