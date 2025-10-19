'use client';

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Navbar, Nav, Button, Offcanvas, Card, Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface User {
  name: string;
  role: string;
}

interface NavItem {
  name: string;
  href: string;
  icon: string;
}

interface ResponsiveSidebarLayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
}

const ResponsiveSidebarLayout: React.FC<ResponsiveSidebarLayoutProps> = ({ children, user, onLogout }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 768);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Close sidebar on larger screens (lg and above)
      if (window.innerWidth >= 992) {
        setShowSidebar(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Define navigation items
  const navItems: NavItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Tasks', href: '/tasks', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { name: 'Projects', href: '/projects', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Sites', href: '/sites', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Crew', href: '/crew', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { name: 'Equipment', href: '/equipment', icon: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' },
    { name: 'Analytics', href: '/analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { name: 'Subcontractors', href: '/subcontractors', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
    { name: 'Defects', href: '/defects', icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z' },
    { name: 'Safety', href: '/safety', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
    { name: 'Materials', href: '/materials', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
    { name: 'Crew Tracking', href: '/crew-tracking', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zm-9.193-3.515a4 4 0 105.656 0M9 10h.01M15 10h.01' },
    { name: 'Admin', href: '/admin', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
    { name: 'Site Manager', href: '/sites', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  ];

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <>
      {/* Top Navigation Bar */}
      <Navbar bg="light" expand="lg" className="py-3 shadow-sm sticky-top">
        <Container fluid>
          <Navbar.Brand href="/dashboard" className="d-flex align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="me-2" width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="fw-bold text-primary">BuildMate</span>
          </Navbar.Brand>
          
          <Button 
            variant="outline-primary" 
            className="d-lg-none border-0 me-2"
            onClick={toggleSidebar}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
            </svg>
          </Button>
        </Container>
      </Navbar>

      <Container fluid className="g-0">
        <Row className="g-0">
          {/* Sidebar - Hidden on small screens, shown as offcanvas */}
          <Col lg={2} className="d-none d-lg-block min-vh-100 bg-white border-end">
            <div className="d-flex flex-column h-100 p-3">
              <Nav className="flex-column mb-4">
                {navItems.map((item) => (
                  <Nav.Link
                    key={item.name}
                    as={Link}
                    href={item.href}
                    className={`rounded mb-1 ${
                      pathname === item.href
                        ? 'bg-primary text-white active'
                        : 'text-dark'
                    }`}
                  >
                    <div className="d-flex align-items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="me-2" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                      <span>{item.name}</span>
                    </div>
                  </Nav.Link>
                ))}
              </Nav>

              <div className="mt-auto">
                <Card className="border-0">
                  <Card.Body className="p-3">
                    <div className="d-flex align-items-center mb-2">
                      <div className="bg-secondary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.338-.678.678-.83 1.418-.832 1.664h10Z"/>
                        </svg>
                      </div>
                      <div className="ms-2">
                        <p className="mb-0 fw-semibold">{user?.name || 'User'}</p>
                        <small className="text-muted">{user?.role || 'USER'}</small>
                      </div>
                    </div>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="w-100 mt-2"
                      onClick={onLogout}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="me-1" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M10 3a1 1 0 0 1 1 1v5h1.5a.5.5 0 0 1 0 1h-1.5v1a1 1 0 0 1-2 0v-1h-1v1a1 1 0 0 1-2 0v-1H5V9.5a.5.5 0 0 1 1 0V10v-1z"/>
                        <path d="M4.5 4a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5h-10z"/>
                      </svg>
                      Logout
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </Col>

          {/* Offcanvas Sidebar for Mobile */}
          <Offcanvas 
            show={showSidebar} 
            onHide={() => setShowSidebar(false)} 
            className="d-lg-none"
            placement="start"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <div className="d-flex align-items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="me-2" width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="fw-bold text-primary">BuildMate</span>
                </div>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column">
                {navItems.map((item) => (
                  <Nav.Link
                    key={item.name}
                    as={Link}
                    href={item.href}
                    className={`rounded mb-1 ${
                      pathname === item.href
                        ? 'bg-primary text-white active'
                        : 'text-dark'
                    }`}
                    onClick={() => setShowSidebar(false)}  // Close sidebar on mobile after clicking
                  >
                    <div className="d-flex align-items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="me-2" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                      <span>{item.name}</span>
                    </div>
                  </Nav.Link>
                ))}
              </Nav>

              <div className="mt-auto">
                <Card className="border-0">
                  <Card.Body className="p-3">
                    <div className="d-flex align-items-center mb-2">
                      <div className="bg-secondary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.338-.678.678-.83 1.418-.832 1.664h10Z"/>
                        </svg>
                      </div>
                      <div className="ms-2">
                        <p className="mb-0 fw-semibold">{user?.name || 'User'}</p>
                        <small className="text-muted">{user?.role || 'USER'}</small>
                      </div>
                    </div>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="w-100 mt-2"
                      onClick={() => {
                        onLogout();
                        setShowSidebar(false);
                      }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="me-1" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M10 3a1 1 0 0 1 1 1v5h1.5a.5.5 0 0 1 0 1h-1.5v1a1 1 0 0 1-2 0v-1h-1v1a1 1 0 0 1-2 0v-1H5V9.5a.5.5 0 0 1 1 0V10v-1z"/>
                        <path d="M4.5 4a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.5-.5h-10z"/>
                      </svg>
                      Logout
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            </Offcanvas.Body>
          </Offcanvas>

          {/* Main Content Area */}
          <Col lg={10} className="d-flex flex-column min-vh-100">
            <main className="flex-grow-1 p-3 p-lg-4 flex-shrink-0">
              <Container fluid className="px-3">
                {children}
              </Container>
            </main>
            
            <footer className="py-3 text-center text-muted border-top mt-auto flex-shrink-0">
              <Container fluid className="px-3">
                <p className="mb-0">© 2025 BuildMate Construction Management</p>
              </Container>
            </footer>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ResponsiveSidebarLayout;