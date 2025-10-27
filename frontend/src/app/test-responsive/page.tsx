'use client'

import React from 'react'
import HeaderResponsiveLayout from '../../components/HeaderResponsiveLayout'

export default function TestResponsivePage() {
  const [user, setUser] = React.useState<any>({ name: 'Test User', role: 'ADMIN' })
  
  const handleLogout = () => {
    console.log('Logout clicked')
  }

  return (
    <HeaderResponsiveLayout user={user} onLogout={handleLogout} currentPage="test">
      <div className="px-4 py-6">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">Responsive Test Page</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Card 1</h2>
            <p className="text-slate-600">This is a test card to check responsive behavior.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Card 2</h2>
            <p className="text-slate-600">This is another test card to verify grid layout.</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-3">Card 3</h2>
            <p className="text-slate-600">Third card to test responsive grid behavior.</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Responsive Table</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Column 1</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Column 2</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Column 3</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Column 4</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">Data 1</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">Data 2</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">Data 3</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">Data 4</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800">Data 5</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">Data 6</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">Data 7</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">Data 8</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </HeaderResponsiveLayout>
  )
}