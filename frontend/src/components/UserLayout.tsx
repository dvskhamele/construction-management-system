import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Header from './Header'
import NotificationComponent from './NotificationComponent'
import MobileNotificationComponent from './MobileNotificationComponent'
import MinimalFooter from './MinimalFooter'

interface User {
  name: string;
  role: string;
}

interface UserLayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children, user, onLogout }) => {
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is on mobile device with responsive design
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  // For login and signup pages, show minimal header but still provide navigation
  if (pathname === '/login' || pathname === '/signup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
        {/* Minimal header for consistency */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <Link href="/" className="text-xl font-bold text-slate-800 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-teal-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>BuildMate</span>
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link href="/" className="text-slate-600 hover:text-teal-600 font-medium">Home</Link>
                <Link href="/features" className="text-slate-600 hover:text-teal-600 font-medium">Features</Link>
                <Link href="/pricing" className="text-slate-600 hover:text-teal-600 font-medium">Pricing</Link>
                <Link href="/login" className="text-slate-600 hover:text-teal-600 font-medium">Login</Link>
              </nav>
            </div>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center p-4">
          {children}
        </main>
        <MinimalFooter />
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
      SUBCONTRACTOR: ['/dashboard', '/tasks', '/reports'],
      CLIENT: ['/client-dashboard', '/dashboard', '/projects', '/tasks', '/materials', '/reports'] // Client-specific access
    };
    
    // Check if user has access to the current path
    if (roleAccess[userRole]?.includes('/*')) return true;
    return roleAccess[userRole]?.includes(pathname) || false;
  };

  // Redirect to unauthorized page if no access
  if (pathname && !hasAccess(pathname)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-96 text-center">
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col">
      {/* Header - always visible on all devices */}
      <Header user={user} onLogout={onLogout} />
      
      {/* Main content area */}
      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="py-3 text-center text-xs text-slate-500 border-t border-slate-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p>© 2025 BuildMate Construction Management</p>
        </div>
      </footer>
    </div>
  )
}

export default UserLayout