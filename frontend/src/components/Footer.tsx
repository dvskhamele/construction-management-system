'use client'

import React from 'react'
import Link from 'next/link'

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 011.414 0l7 7a1 1 0 01-1.414 1.414L11 7.414V19a1 1 0 11-2 0V7.414L2.707 13.707a1 1 0 01-1.414-1.414l7-7z" />
                </svg>
              </div>
              <span className="ml-2 text-xl font-bold text-white">BuildMate</span>
            </div>
            <p className="mt-4 text-sm">
              India's premier construction management platform for construction professionals.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-white transition">Features</Link></li>
              <li><Link href="#" className="hover:text-white transition">Pricing</Link></li>
              <li><Link href="#" className="hover:text-white transition">Templates</Link></li>
              <li><Link href="#" className="hover:text-white transition">Releases</Link></li>
              <li><Link href="/tools/construction-safety-checklist" className="hover:text-white transition">Safety Checklist</Link></li>
              <li><Link href="/tools/construction-schedule-variance-calculator" className="hover:text-white transition">Schedule Variance Calculator</Link></li>
              <li><Link href="/tools/construction-profitability-calculator" className="hover:text-white transition">Profitability Calculator</Link></li>
              <li><Link href="/tools/construction-equipment-utilization-tracker" className="hover:text-white transition">Equipment Utilization Tracker</Link></li>
              <li><Link href="/tools/construction-defect-tracker" className="hover:text-white transition">Defect Tracker</Link></li>
              <li><Link href="/tools/construction-project-milestone-tracker" className="hover:text-white transition">Milestone Tracker</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="#about" className="hover:text-white transition">About</Link></li>
              <li><Link href="#contact" className="hover:text-white transition">Contact</Link></li>
              <li><Link href="#faqs" className="hover:text-white transition">FAQs</Link></li>
              <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-white transition">Documentation</Link></li>
              <li><Link href="#" className="hover:text-white transition">API Reference</Link></li>
              <li><Link href="#" className="hover:text-white transition">Status</Link></li>
              <li><Link href="#" className="hover:text-white transition">Help Center</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4">Account</h3>
            <ul className="space-y-2">
              <li><Link href="/login" className="hover:text-white transition">Staff Login</Link></li>
              <li><Link href="/client-login" className="hover:text-white transition">Client Login</Link></li>
              <li><Link href="/signup" className="hover:text-white transition">Sign Up</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 text-sm text-center">
          <p>© 2025 BuildMate by Signimus Technologies. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer