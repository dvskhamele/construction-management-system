'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Sidebar from '../components/Sidebar'
import NotificationComponent from '../components/NotificationComponent'
import MobileNotificationComponent from '../components/MobileNotificationComponent'
import PushNotificationHandler from '../components/PushNotificationHandler'
import BackgroundSyncHandler from '../components/BackgroundSyncHandler'
import Footer from '../components/Footer'

interface User {
  name: string;
  role: string;
}

interface AppLayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, user, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is on mobile device
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  // For login and signup pages, don't show sidebar
  if (pathname === '/login' || pathname === '/signup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {children}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Are you a client?{' '}
              <Link href="/client-login" className="font-medium text-teal-600 hover:text-teal-500">
                Client Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Check if user has access based on role and pathname
  const hasAccess = (pathname: string): boolean => {
    if (!user) return false;
    
    const userRole = user.role;
    
    // Define role-based access
    const roleAccess: Record<string, string[]> = {
      ADMIN: ['/*'], // All access
      PROJECT_MANAGER: ['/dashboard', '/projects', '/tasks', '/analytics', '/reports', '/calendar', '/teams', '/defects', '/safety', '/subcontractors', '/inventory', '/equipment', '/departments'],
      SITE_SUPERVISOR: ['/dashboard', '/tasks', '/sites', '/defects', '/safety', '/equipment', '/inventory'],
      CREW_LEADER: ['/dashboard', '/tasks', '/crew-tracking'],
      SUBCONTRACTOR: ['/dashboard', '/tasks', '/reports']
    };
    
    // Check if user has access to the current path
    if (roleAccess[userRole]?.includes('/*')) return true;
    return roleAccess[userRole]?.includes(pathname) || false;
  };

  // Redirect to unauthorized page if no access
  if (pathname && !hasAccess(pathname)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center px-4 py-8">
        <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm text-center">
          <div className="bg-red-100 text-red-800 rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Access Denied</h2>
          <p className="text-slate-600 mb-6">You don't have permission to access this page.</p>
          <Link href="/dashboard" className="text-teal-600 hover:text-teal-800 font-medium">
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <PushNotificationHandler />
      <BackgroundSyncHandler />
      
      <div className={`${isSidebarOpen ? 'md:ml-0' : 'ml-0'} transition-all duration-300`}>
        <div className="flex">
          {/* Sidebar for desktop and mobile */}
          <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:w-64 fixed md:static z-40 h-[calc(100vh-4rem)] md:h-screen w-64 transition-all duration-300 ease-in-out overflow-hidden`}>
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
              className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
              onClick={toggleSidebar}
            ></div>
          )}
          
          {/* Main content area - full width by default, offset only on desktop */}
          <div className="flex-1 md:pl-64 min-h-screen flex flex-col">
            {/* Header for mobile */}
            <header className="md:hidden bg-white shadow sticky top-0 z-40">
              <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                  <button 
                    className="text-slate-600 hover:text-slate-900"
                    onClick={toggleSidebar}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                  
                  <div className="text-xl font-bold text-slate-800">
                    <span>BuildMate</span>
                  </div>
                  
                  <div>
                    <MobileNotificationComponent user={user} />
                  </div>
                </div>
              </div>
            </header>
            
            {/* Header for desktop - visible only on medium screens and larger */}
            <header className="hidden md:block bg-white shadow sticky top-0 z-40">
              <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                  <div className="text-xl font-bold text-slate-800">
                    <span>BuildMate</span>
                  </div>
                  
                  <div>
                    <NotificationComponent user={user} />
                  </div>
                </div>
              </div>
            </header>
            
            {/* Main content */}
            <main className="flex-1 w-full overflow-x-hidden">
              {children}
            </main>
            
            {/* Footer */}
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AppLayout