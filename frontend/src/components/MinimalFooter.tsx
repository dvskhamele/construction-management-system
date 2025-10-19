'use client'

import React from 'react'

const MinimalFooter: React.FC = () => {
  return (
    <footer className="py-3 text-center text-xs text-slate-500 border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} BuildMate Construction Management</p>
      </div>
    </footer>
  )
}

export default MinimalFooter