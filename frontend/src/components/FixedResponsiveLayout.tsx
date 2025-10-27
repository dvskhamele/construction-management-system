'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Sidebar from './Sidebar'

interface User {
  name: string
  role: string
}

interface FixedResponsiveLayoutProps {
  user: User | null
  onLogout: () => void
  children: React.ReactNode
}

const FixedResponsiveLayout: React.FC<FixedResponsiveLayoutProps> = ({ user, onLogout, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  // Check if user is on mobile device
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  // Toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  // Close sidebar when clicking outside (mobile only)
  const closeSidebar = () => {
    if (isMobile) {
      setIsSidebarOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex">
      {/* Mobile menu button - visible only on small screens */}
      <div className="lg:hidden fixed top-0 left-0 z-50 p-4">
        <button 
          className="text-slate-600 hover:text-slate-900 p-2"
          onClick={toggleSidebar}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      {/* Sidebar - hidden on mobile unless open, always visible on desktop */}
      <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:transform-none fixed lg:relative z-40 w-64 bg-white shadow-lg h-screen overflow-y-auto transition-transform duration-300 ease-in-out`}>
        <Sidebar 
          user={user} 
          onLogout={onLogout} 
          isSidebarOpen={isSidebarOpen} 
          toggleSidebar={toggleSidebar} 
        />
      </div>
      
      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}
      
      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col ${isMobile ? '' : 'lg:ml-64'} transition-all duration-300`}>
        {/* Header for mobile - visible only on small screens */}
        <header className="lg:hidden bg-white shadow sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-3">
              <button 
                className="text-slate-600 hover:text-slate-900 p-1"
                onClick={toggleSidebar}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              
              <div className="text-xl font-bold text-slate-800">
                <span>BuildMate</span>
              </div>
              
              <div className="w-6"></div> {/* Spacer for symmetry */}
            </div>
          </div>
        </header>
        
        {/* Header for desktop - visible only on medium screens and larger */}
        <header className="hidden lg:block bg-white shadow sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="text-xl font-bold text-slate-800">
                <span>BuildMate</span>
              </div>
              
              <div>
                {/* Notification component would go here */}
              </div>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 overflow-x-hidden p-4 lg:p-6">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="py-3 text-center text-xs text-slate-500 border-t border-slate-200 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p>© 2025 BuildMate Construction Management</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default FixedResponsiveLayout