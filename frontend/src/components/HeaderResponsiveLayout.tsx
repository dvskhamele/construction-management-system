import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
// import LanguageSelector from './LanguageSelector'; // Import the language selector

interface User {
  name: string;
  role: string;
}

interface HeaderResponsiveLayoutProps {
  children: React.ReactNode;
  user?: User | null;
  onLogout?: () => void;
  currentPage?: string;
  hideSidebar?: boolean;
}

const HeaderResponsiveLayout: React.FC<HeaderResponsiveLayoutProps> = ({ 
  children, 
  user, 
  onLogout, 
  currentPage = 'dashboard',
  hideSidebar = false 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Determine screen size for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768); // Mobile and tablet
      if (width >= 768) { // md and above
        setIsMenuOpen(false); // Close menu on larger screens
      }
    };

    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation items
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Projects', href: '/projects', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Tasks', href: '/tasks', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { name: 'Sites', href: '/sites', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { name: 'Crew', href: '/crew', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { name: 'Equipment', href: '/equipment', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
    { name: 'Analytics', href: '/analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { name: 'Subcontractors', href: '/subcontractors', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
    { name: 'Defects', href: '/defects', icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z' },
    { name: 'Safety', href: '/safety', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
    { name: 'Materials', href: '/materials', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { name: 'Crew Tracking', href: '/crew-tracking', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zm-9.193-3.515a4 4 0 105.656 0M9 10h.01M15 10h.01' },
    { name: 'Admin', href: '/admin', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
    { name: 'Reports', href: '/reports', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
  ];
  
  // Filter navigation items based on user role
  const getFilteredNavItems = () => {
    if (!user || user.role !== 'CLIENT') {
      return navItems; // Show all items for non-clients
    }
    
    // For clients, only show specific items (tasks, materials, and a few others)
    // Hide items related to contacts/communications like Crew, Subcontractors, etc.
    return navItems.filter(item => 
      item.href === '/dashboard' || 
      item.href === '/tasks' || 
      item.href === '/materials' || 
      item.href === '/projects' ||
      item.href === '/reports'
    );
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm z-50 sticky top-0 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <button
                className="md:hidden mr-3 p-2 rounded-md text-slate-600 hover:text-slate-900 focus:outline-none"
                onClick={toggleMenu}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.617 1.842 3.683a1 1 0 01-.213 1.106l-1.317 1.318a1 1 0 01-.944.29l-1.817-.545L10 13l-3.78 1.26a1 1 0 01-.945-.29l-1.317-1.317a1 1 0 01-.213-1.106l1.842-3.683-1.233-.617a1 1 0 01.894-1.789l1.599.799L9 5.405V3a1 1 0 011-1zm0 16a3 3 0 100-6 3 3 0 000 6z" />
                  </svg>
                </div>
                <span className="ml-2 text-xl font-bold text-slate-800 hidden sm:block">BuildMate</span>
              </div>
            </div>
            
            {user && (
              <div className="flex items-center space-x-4">
                {/* <LanguageSelector /> */}
                <div className="hidden md:block">
                  <span className="text-sm font-medium text-slate-700">{user.name}</span>
                  <span className="ml-2 text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">{user.role}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="text-slate-600 hover:text-slate-900 flex items-center text-sm font-medium"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            )}
            {!user && (
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
        
        {/* Mobile Menu - Slides in from top when open */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {getFilteredNavItems().map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    currentPage === item.name.toLowerCase() || 
                    (pathname && pathname.includes(item.href.substring(1))) ||
                    (pathname && pathname === item.href)
                      ? 'bg-teal-100 text-teal-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                  onClick={closeMenu}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={item.icon}
                    />
                  </svg>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <div className="flex-1 flex flex-col md:flex-row w-full">
        {/* Desktop Sidebar for larger screens */}
        {!hideSidebar && (
          <aside className="hidden md:block w-full md:w-64 bg-white shadow-md h-fit sticky top-16 z-40 mt-1">
            <div className="flex flex-col p-4 h-full max-h-[calc(100vh-4rem)] overflow-y-auto">
              <nav className="flex-1 space-y-1">
                {getFilteredNavItems().map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      currentPage === item.name.toLowerCase() || 
                      (pathname && pathname.includes(item.href.substring(1))) ||
                      (pathname && pathname === item.href)
                        ? 'bg-teal-100 text-teal-700'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-3"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={item.icon}
                      />
                    </svg>
                    {item.name}
                  </Link>
                ))}
              </nav>
              
              {user && (
                <div className="mt-auto pt-4 border-t border-slate-200">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="bg-gradient-to-br from-teal-400 to-teal-600 h-10 w-10 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">
                          {user?.name?.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="ml-3 min-w-0">
                      <p className="text-sm font-medium text-slate-800 truncate">{user?.name}</p>
                      <p className="text-xs text-slate-500 truncate">{user?.role}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </aside>
        )}

        {/* Main Content Area */}
        <main className={`flex-1 p-4 md:p-6 w-full ${!hideSidebar ? 'pb-16 md:pb-0' : ''}`}>
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Navigation Bar */}
      {!hideSidebar && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 md:hidden z-50">
          <div className="grid grid-cols-5 gap-1">
            {getFilteredNavItems().slice(0, 5).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center py-2 text-xs ${
                  currentPage === item.name.toLowerCase() || 
                  (pathname && pathname.includes(item.href.substring(1))) ||
                  (pathname && pathname === item.href)
                    ? 'text-teal-600'
                    : 'text-slate-500'
                }`}
                onClick={() => {
                  if (isMobile) {
                    // Close menu if it's open
                    setIsMenuOpen(false);
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={item.icon}
                  />
                </svg>
                <span className="mt-1">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderResponsiveLayout;