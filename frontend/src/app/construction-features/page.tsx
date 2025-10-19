'use client'

import React, { useState } from 'react'
import Link from 'next/link'

export default function ConstructionFeaturesPage() {
  const [activeTab, setActiveTab] = useState('project-planning')

  const features = {
    'project-planning': [
      {
        title: "Gantt Chart Planning",
        description: "Visualize project schedules with interactive Gantt charts showing dependencies and timelines",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        )
      },
      {
        title: "Milestone Tracking",
        description: "Track critical milestones and key deliverables across all construction projects",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      },
      {
        title: "Resource Scheduling",
        description: "Schedule and allocate workers, equipment, and materials for optimal utilization",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        )
      }
    ],
    'resource-management': [
      {
        title: "Crew Management",
        description: "Manage construction crews with skills tracking, certifications, and performance metrics",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        )
      },
      {
        title: "Equipment Tracking",
        description: "Monitor construction equipment location, usage, maintenance schedules, and costs",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )
      },
      {
        title: "Material Procurement",
        description: "Streamline material ordering, delivery tracking, and inventory management",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        )
      }
    ],
    'quality-safety': [
      {
        title: "Defect Management",
        description: "Identify, track, and resolve construction defects with automated workflows",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        )
      },
      {
        title: "Safety Inspections",
        description: "Conduct safety inspections and maintain compliance with regulatory requirements",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        )
      },
      {
        title: "Quality Checklists",
        description: "Digital checklists for quality control at each phase of construction",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        )
      }
    ],
    'documentation': [
      {
        title: "Document Management",
        description: "Centralized storage for drawings, permits, contracts, and regulatory documents",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )
      },
      {
        title: "Photo Documentation",
        description: "Capture and organize site photos with time/location stamps and annotations",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )
      },
      {
        title: "RFI Management",
        description: "Requests for Information tracking with resolution timelines and notifications",
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )
      }
    ]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6 flex-wrap">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.617 1.842 3.683a1 1 0 01-.213 1.106l-1.317 1.318a1 1 0 01-.944.29l-1.817-.545L10 13l-3.78 1.26a1 1 0 01-.945-.29l-1.317-1.317a1 1 0 01-.213-1.106l1.842-3.683-1.233-.617a1 1 0 01.894-1.789l1.599.799L9 5.405V3a1 1 0 011-1zm0 16a3 3 0 100-6 3 3 0 000 6z" />
                  </svg>
                </div>
                <span className="ml-2 text-xl font-bold text-slate-800">BuildMate</span>
              </div>
            </div>
            <nav className="hidden md:flex space-x-10 flex-wrap">
              <Link href="/" className="text-slate-600 hover:text-teal-600 font-medium">Home</Link>
              <Link href="/dashboard" className="text-slate-600 hover:text-teal-600 font-medium">Dashboard</Link>
              <Link href="/construction-features" className="text-teal-600 font-medium">Construction</Link>
            </nav>
            <div className="flex items-center space-x-4 flex-wrap">
              <button className="text-slate-600 hover:text-teal-600 font-medium">
                Sign In
              </button>
              <Link 
                href="/dashboard"
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300"
              >
                Live Demo
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Construction Management Features</h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Comprehensive tools designed specifically for construction project management
          </p>
        </div>

        {/* Feature Tabs */}
        <div className="flex flex-wrap justify-center mb-12 border-b border-slate-200">
          <button
            className={`px-6 py-3 font-medium text-sm rounded-t-lg ${
              activeTab === 'project-planning'
                ? 'text-teal-600 border-b-2 border-teal-500 bg-teal-50'
                : 'text-slate-600 hover:text-teal-600'
            }`}
            onClick={() => setActiveTab('project-planning')}
          >
            Project Planning
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm rounded-t-lg ${
              activeTab === 'resource-management'
                ? 'text-teal-600 border-b-2 border-teal-500 bg-teal-50'
                : 'text-slate-600 hover:text-teal-600'
            }`}
            onClick={() => setActiveTab('resource-management')}
          >
            Resource Management
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm rounded-t-lg ${
              activeTab === 'quality-safety'
                ? 'text-teal-600 border-b-2 border-teal-500 bg-teal-50'
                : 'text-slate-600 hover:text-teal-600'
            }`}
            onClick={() => setActiveTab('quality-safety')}
          >
            Quality & Safety
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm rounded-t-lg ${
              activeTab === 'documentation'
                ? 'text-teal-600 border-b-2 border-teal-500 bg-teal-50'
                : 'text-slate-600 hover:text-teal-600'
            }`}
            onClick={() => setActiveTab('documentation')}
          >
            Documentation
          </button>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features[activeTab as keyof typeof features].map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 p-6 border border-slate-100 flex flex-col items-center text-center"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-slate-600 mb-4">{feature.description}</p>
              <button 
                className="mt-auto text-teal-600 hover:text-teal-800 font-medium text-sm"
                onClick={() => alert(`${feature.title} feature coming soon!`)}
              >
                Learn More
              </button>
            </div>
          ))}
        </div>

        {/* Additional Construction Benefits */}
        <div className="mt-16 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Why Choose BuildMate for Construction?</h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Built specifically for construction companies with industry-proven features
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Industry-Specific</h3>
              <p className="text-slate-600">Designed specifically for construction workflows, not generic business processes</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Real-time Updates</h3>
              <p className="text-slate-600">Sync across field teams, office staff, and stakeholders instantly</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Comprehensive Analytics</h3>
              <p className="text-slate-600">Detailed reports on project progress, costs, and performance metrics</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Ready to Transform Your Construction Management?</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            Join thousands of construction companies already using BuildMate to deliver projects on time and within budget.
          </p>
          <Link 
            href="/dashboard"
            className="inline-block bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-lg"
          >
            Start Free Trial
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.617 1.842 3.683a1 1 0 01-.213 1.106l-1.317 1.318a1 1 0 01-.944.29l-1.817-.545L10 13l-3.78 1.26a1 1 0 01-.945-.29l-1.317-1.317a1 1 0 01-.213-1.106l1.842-3.683-1.233-.617a1 1 0 01.894-1.789l1.599.799L9 5.405V3a1 1 0 011-1zm0 16a3 3 0 100-6 3 3 0 000 6z" />
                  </svg>
                </div>
                <span className="ml-2 text-xl font-bold text-white">BuildMate</span>
              </div>
              <p className="mt-4 text-sm">
                Construction management platform for modern builders.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Templates</a></li>
                <li><a href="#" className="hover:text-white transition">Releases</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">About</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
                <li><a href="#" className="hover:text-white transition">Careers</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition">Status</a></li>
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-sm text-center">
            <p>© 2025 BuildMate by Signimus Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}