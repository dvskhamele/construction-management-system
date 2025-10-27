'use client'

import React, { useState } from 'react'

interface SimpleResponsiveLayoutProps {
  title: string
  subtitle: string
  children: React.ReactNode
  user: any
  onLogout: () => void
}

const SimpleResponsiveLayout: React.FC<SimpleResponsiveLayoutProps> = ({ 
  title, 
  subtitle, 
  children, 
  user,
  onLogout
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // Navigation items
  const navItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Tasks', href: '/tasks' },
    { name: 'Projects', href: '/projects' },
    { name: 'Sites', href: '/sites' },
    { name: 'Crew', href: '/crew' },
    { name: 'Equipment', href: '/equipment' },
    { name: 'Analytics', href: '/analytics' },
    { name: 'Subcontractors', href: '/subcontractors' },
    { name: 'Defects', href: '/defects' },
    { name: 'Safety', href: '/safety' },
    { name: 'Materials', href: '/materials' },
    { name: 'Crew Tracking', href: '/crew-tracking' },
    { name: 'Admin', href: '/admin' }
  ]

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Mobile Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: '#0d9488',
        color: 'white',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '1.5rem',
            cursor: 'pointer',
            padding: 0
          }}
        >
          ☰
        </button>
        <h1 style={{ margin: 0, fontSize: '1.25rem' }}>BuildMate</h1>
        <div style={{ width: 24 }}></div>
      </header>

      {/* Sidebar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '280px',
        height: '100vh',
        backgroundColor: 'white',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
        transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease',
        zIndex: 90,
        overflowY: 'auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem',
          borderBottom: '1px solid #eee'
        }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Navigation</h2>
          <button 
            onClick={() => setIsMenuOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              padding: 0
            }}
          >
            ×
          </button>
        </div>
        <nav>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            margin: 0
          }}>
            {navItems.map((item) => (
              <li key={item.name} style={{ borderBottom: '1px solid #eee' }}>
                <a 
                  href={item.href} 
                  style={{
                    display: 'block',
                    padding: '1rem',
                    textDecoration: 'none',
                    color: '#333'
                  }}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* User Profile */}
        <div style={{ 
          padding: '1rem', 
          borderTop: '1px solid #eee',
          marginTop: 'auto'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '1rem' 
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #0d9488, #0f766e)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1rem'
            }}>
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div style={{ marginLeft: '0.75rem', overflow: 'hidden' }}>
              <p style={{ 
                margin: '0 0 0.125rem 0', 
                fontSize: '0.875rem', 
                fontWeight: 600, 
                color: '#0f172a',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {user?.name || 'User'}
              </p>
              <p style={{ 
                margin: 0, 
                fontSize: '0.75rem', 
                color: '#64748b',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}>
                {user?.role || 'USER'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              onLogout()
              setIsMenuOpen(false)
            }}
            style={{
              width: '100%',
              padding: '0.5rem',
              backgroundColor: '#f1f5f9',
              color: '#475569',
              border: 'none',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div 
          onClick={() => setIsMenuOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 80
          }}
        ></div>
      )}

      {/* Main Content */}
      <main style={{
        flex: 1,
        padding: '1rem',
        marginLeft: 0
      }}>
        {/* Page Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              gap: '1rem'
            }}>
              <div>
                <h1 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: 'bold', 
                  color: '#0f172a', 
                  margin: '0 0 0.25rem 0' 
                }}>
                  {title}
                </h1>
                <p style={{ 
                  color: '#64748b', 
                  margin: 0,
                  fontSize: '0.875rem'
                }}>
                  {subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div>
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer style={{ 
        padding: '0.75rem', 
        textAlign: 'center', 
        fontSize: '0.75rem', 
        color: '#64748b', 
        borderTop: '1px solid #e2e8f0',
        marginTop: 'auto'
      }}>
        <div style={{ maxWidth: '100%', padding: '0 1rem', margin: '0 auto' }}>
          <p style={{ margin: 0 }}>© 2025 BuildMate Construction Management</p>
        </div>
      </footer>

      {/* Desktop Styles */}
      <style>{`
        @media (min-width: 768px) {
          header {
            display: none;
          }
          
          div[style*="position: fixed"][style*="height: 100vh"] {
            transform: translateX(0) !important;
            position: relative !important;
            width: 250px !important;
            height: auto !important;
          }
          
          main {
            margin-left: 250px !important;
            padding: 1.5rem !important;
          }
          
          footer {
            padding: 1rem !important;
          }
        }
      `}</style>
    </div>
  )
}

export default SimpleResponsiveLayout