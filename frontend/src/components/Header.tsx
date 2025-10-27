'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

interface User {
  name: string
  role: string
}

interface HeaderProps {
  user: User | null
  onLogout: () => void
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Define navigation items based on user role
  const getNavItems = () => {
    const baseItems = [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Tasks', href: '/tasks' },
      { name: 'Projects', href: '/projects' },
    ]

    if (user?.role === 'ADMIN' || user?.role === 'PROJECT_MANAGER') {
      return [
        ...baseItems,
        { name: 'Sites', href: '/sites' },
        { name: 'Crew', href: '/crew' },
        { name: 'Equipment', href: '/equipment' },
        { name: 'Analytics', href: '/analytics' },
        { name: 'Subcontractors', href: '/subcontractors' },
      ]
    }

    if (user?.role === 'SITE_SUPERVISOR') {
      return [
        ...baseItems,
        { name: 'Sites', href: '/sites' },
        { name: 'Defects', href: '/defects' },
        { name: 'Safety', href: '/safety' },
      ]
    }

    if (user?.role === 'CREW_LEADER') {
      return [
        ...baseItems,
        { name: 'Crew Tracking', href: '/crew-tracking' },
      ]
    }

    if (user?.role === 'CLIENT') {
      return [
        ...baseItems,
        { name: 'Materials', href: '/materials' },
        { name: 'Projects', href: '/projects' },
        { name: 'Reports', href: '/reports' },
      ]
    }

    return baseItems
  }

  // Define additional navigation items based on user role
  const getAdditionalNavItems = () => {
    if (user?.role === 'CLIENT') {
      // Only show calculators that are relevant to clients
      return [
        { name: 'Concrete Calculator', href: '/tools/concrete-calculator' },
        { name: 'Roofing Calculator', href: '/tools/roofing-material-calculator' },
        { name: 'Drywall Calculator', href: '/tools/drywall-calculator' },
        { name: 'Decking Calculator', href: '/tools/decking-material-calculator' },
        { name: 'Safety Checklist', href: '/tools/construction-safety-checklist' },
        { name: 'Schedule Variance Calculator', href: '/tools/construction-schedule-variance-calculator' },
        { name: 'Profitability Calculator', href: '/tools/construction-profitability-calculator' },
        { name: 'Defect Tracker', href: '/tools/construction-defect-tracker' },
        { name: 'Milestone Tracker', href: '/tools/construction-project-milestone-tracker' },
        { name: 'Blog', href: '/blog' },
      ];
    }

    // For other roles, show all tools and additional items
    if (user?.role === 'ADMIN' || user?.role === 'PROJECT_MANAGER') {
      return [
        { name: 'Concrete Calculator', href: '/tools/concrete-calculator' },
        { name: 'Roofing Calculator', href: '/tools/roofing-material-calculator' },
        { name: 'Drywall Calculator', href: '/tools/drywall-calculator' },
        { name: 'Decking Calculator', href: '/tools/decking-material-calculator' },
        { name: 'Safety Checklist', href: '/tools/construction-safety-checklist' },
        { name: 'Schedule Variance Calculator', href: '/tools/construction-schedule-variance-calculator' },
        { name: 'Profitability Calculator', href: '/tools/construction-profitability-calculator' },
        { name: 'Equipment Utilization Tracker', href: '/tools/construction-equipment-utilization-tracker' },
        { name: 'Defect Tracker', href: '/tools/construction-defect-tracker' },
        { name: 'Milestone Tracker', href: '/tools/construction-project-milestone-tracker' },
        { name: 'CRM', href: '/construction-crm' },
        { name: 'Legal Docs', href: '/legal-documents' },
        { name: 'Blog', href: '/blog' },
        { name: 'Inventory', href: '/inventory' },
        { name: 'Consumption', href: '/consumption-tracker' },
      ];
    }

    // For other roles, show appropriate subset of tools
    return [
      { name: 'Concrete Calculator', href: '/tools/concrete-calculator' },
      { name: 'Roofing Calculator', href: '/tools/roofing-material-calculator' },
      { name: 'Drywall Calculator', href: '/tools/drywall-calculator' },
      { name: 'Decking Calculator', href: '/tools/decking-material-calculator' },
      { name: 'Safety Checklist', href: '/tools/construction-safety-checklist' },
      { name: 'Schedule Variance Calculator', href: '/tools/construction-schedule-variance-calculator' },
      { name: 'Profitability Calculator', href: '/tools/construction-profitability-calculator' },
      { name: 'Defect Tracker', href: '/tools/construction-defect-tracker' },
      { name: 'Milestone Tracker', href: '/tools/construction-project-milestone-tracker' },
      { name: 'Blog', href: '/blog' },
    ];
  };

  const navItems = getNavItems()
  const additionalNavItems = getAdditionalNavItems()

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 011.414 0l7 7a1 1 0 01-1.414 1.414L11 7.414V19a1 1 0 11-2 0V7.414L2.707 13.707a1 1 0 01-1.414-1.414l7-7z" />
                </svg>
              </div>
              <span className="ml-2 text-xl font-bold text-slate-800 hidden sm:block">BuildMate</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-teal-600 border-b-2 border-teal-600 pb-1'
                    : 'text-slate-600 hover:text-teal-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
            {/* Additional navigation items for all users */}
            {additionalNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-teal-600 border-b-2 border-teal-600 pb-1'
                    : 'text-slate-600 hover:text-teal-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="flex items-center">
            {user ? (
              <>
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 focus:outline-none"
                  >
                    <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-slate-700">{user?.name}</span>
                  </button>

                  {/* Profile Dropdown */}
                  {isProfileOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                      <div className="py-1">
                        <div className="px-4 py-2 border-b border-slate-200">
                          <p className="text-sm font-medium text-slate-900">{user?.name}</p>
                          <p className="text-xs text-slate-500">{user?.role}</p>
                        </div>
                        <button
                          onClick={() => {
                            onLogout()
                            setIsProfileOpen(false)
                          }}
                          className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Mobile menu button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="ml-4 md:hidden text-slate-600 hover:text-slate-900 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/client-login" 
                  className="text-sm font-medium text-teal-600 hover:text-teal-700"
                >
                  Client Login
                </Link>
                <Link 
                  href="/login" 
                  className="text-sm font-medium bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
                >
                  Staff Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === item.href
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {/* Additional navigation items for all users */}
            {additionalNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === item.href
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header