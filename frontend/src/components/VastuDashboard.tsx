'use client'

import React, { useState, useEffect } from 'react'
import { useAutomation } from '../context/AutomationContext'

interface VastuDashboardProps {
  currentUser: any
}

const VastuDashboard: React.FC<VastuDashboardProps> = ({ currentUser }) => {
  const { triggerEvent } = useAutomation()
  const [dashboardData, setDashboardData] = useState<any>({})
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    east: true,
    west: true,
    north: true,
    south: true
  })
  const [isMobile, setIsMobile] = useState(false)

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

  useEffect(() => {
    // Load dashboard data
    const loadDashboardData = async () => {
      // Load projects
      const storedProjects = localStorage.getItem('constructionProjects')
      const projects = storedProjects ? JSON.parse(storedProjects).projects : []
      
      // Load tasks
      const storedTasks = localStorage.getItem('constructionTasks')
      const tasks = storedTasks ? JSON.parse(storedTasks).tasks : []
      
      // Load budgets
      const storedBudgets = localStorage.getItem('constructionBudgets')
      const budgets = storedBudgets ? JSON.parse(storedBudgets) : []
      
      // Calculate metrics
      const completedProjects = projects.filter((p: any) => p.status === 'COMPLETED').length
      const activeProjects = projects.filter((p: any) => p.status === 'ACTIVE').length
      const totalProjects = projects.length
      
      const completedTasks = tasks.filter((t: any) => t.status === 'COMPLETED').length
      const pendingTasks = tasks.filter((t: any) => t.status === 'PENDING').length
      const totalTasks = tasks.length
      
      const totalBudget = budgets.reduce((sum: number, budget: any) => sum + (budget.allocated || 0), 0)
      const totalSpent = budgets.reduce((sum: number, budget: any) => sum + (budget.spent || 0), 0)
      
      setDashboardData({
        projects: {
          total: totalProjects,
          active: activeProjects,
          completed: completedProjects
        },
        tasks: {
          total: totalTasks,
          completed: completedTasks,
          pending: pendingTasks
        },
        finances: {
          totalBudget,
          totalSpent,
          remaining: totalBudget - totalSpent
        }
      })
    }
    
    loadDashboardData()
  }, [])

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  // Vastu-aligned components
  const EastZone = () => (
    <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-2xl h-full border border-green-200">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-green-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          Growth & Progress (East)
        </h3>
        <button 
          onClick={() => toggleSection('east')}
          className="text-green-600 hover:text-green-800"
        >
          {expandedSections.east ? '−' : '+'}
        </button>
      </div>
      
      {expandedSections.east && (
        <div className="space-y-3">
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Active Projects</span>
              <span className="font-bold text-green-700">{dashboardData.projects?.active || 0}</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full" 
                style={{ width: `${((dashboardData.projects?.active || 0) / (dashboardData.projects?.total || 1)) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Task Completion</span>
              <span className="font-bold text-green-700">
                {dashboardData.tasks?.total ? Math.round((dashboardData.tasks.completed / dashboardData.tasks.total) * 100) : 0}%
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full" 
                style={{ 
                  width: `${dashboardData.tasks?.total ? (dashboardData.tasks.completed / dashboardData.tasks.total) * 100 : 0}%` 
                }}
              ></div>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Revenue</span>
              <span className="font-bold text-green-700">₹{dashboardData.finances?.totalSpent?.toLocaleString() || 0}</span>
            </div>
          </div>
          
          {/* Vastu Tip */}
          <div className="bg-green-100 border border-green-200 rounded-lg p-3 mt-2">
            <p className="text-sm text-green-800">
              <span className="font-bold">Vastu Tip:</span> Start new projects from the East corner for prosperity energy.
            </p>
          </div>
        </div>
      )}
    </div>
  )

  const WestZone = () => (
    <div className="bg-gradient-to-br from-red-50 to-rose-50 p-4 rounded-2xl h-full border border-red-200">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-red-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Issues & Improvements (West)
        </h3>
        <button 
          onClick={() => toggleSection('west')}
          className="text-red-600 hover:text-red-800"
        >
          {expandedSections.west ? '−' : '+'}
        </button>
      </div>
      
      {expandedSections.west && (
        <div className="space-y-3">
          <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-red-500">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Pending Tasks</span>
              <span className="font-bold text-red-700">{dashboardData.tasks?.pending || 0}</span>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-red-500">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Budget Overrun Risk</span>
              <span className="font-bold text-red-700">
                {dashboardData.finances?.totalSpent && dashboardData.finances?.totalBudget 
                  ? Math.round((dashboardData.finances.totalSpent / dashboardData.finances.totalBudget) * 100) > 80 
                    ? 'High' 
                    : 'Normal' 
                  : 'Unknown'}
              </span>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-red-500">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Defects</span>
              <span className="font-bold text-red-700">5</span>
            </div>
          </div>
          
          {/* Vastu Tip */}
          <div className="bg-red-100 border border-red-200 rounded-lg p-3 mt-2">
            <p className="text-sm text-red-800">
              <span className="font-bold">Vastu Tip:</span> Address issues promptly from West to East for smooth resolution energy.
            </p>
          </div>
        </div>
      )}
    </div>
  )

  const NorthZone = () => (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-2xl h-full border border-blue-200">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-blue-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Future & Vision (North)
        </h3>
        <button 
          onClick={() => toggleSection('north')}
          className="text-blue-600 hover:text-blue-800"
        >
          {expandedSections.north ? '−' : '+'}
        </button>
      </div>
      
      {expandedSections.north && (
        <div className="space-y-3">
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Upcoming Milestones</span>
              <span className="text-blue-600">3</span>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Next Payments</span>
              <span className="text-blue-600">₹2,50,000</span>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-lg shadow-sm">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Resource Planning</span>
              <span className="text-blue-600">2 teams</span>
            </div>
          </div>
          
          {/* Vastu Tip */}
          <div className="bg-blue-100 border border-blue-200 rounded-lg p-3 mt-2">
            <p className="text-sm text-blue-800">
              <span className="font-bold">Vastu Tip:</span> Place vision boards in North for clarity and wisdom energy.
            </p>
          </div>
        </div>
      )}
    </div>
  )

  const SouthZone = () => (
    <div className="bg-gradient-to-br from-amber-50 to-yellow-50 p-4 rounded-2xl h-full border border-amber-200">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-amber-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          Stability & Completion (South)
        </h3>
        <button 
          onClick={() => toggleSection('south')}
          className="text-amber-600 hover:text-amber-800"
        >
          {expandedSections.south ? '−' : '+'}
        </button>
      </div>
      
      {expandedSections.south && (
        <div className="space-y-3">
          <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-amber-500">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Completed Projects</span>
              <span className="font-bold text-amber-700">{dashboardData.projects?.completed || 0}</span>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-amber-500">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Archived Tasks</span>
              <span className="font-bold text-amber-700">{dashboardData.tasks?.completed || 0}</span>
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-amber-500">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Historical Data</span>
              <span className="font-bold text-amber-700">12 months</span>
            </div>
          </div>
          
          {/* Vastu Tip */}
          <div className="bg-amber-100 border border-amber-200 rounded-lg p-3 mt-2">
            <p className="text-sm text-amber-800">
              <span className="font-bold">Vastu Tip:</span> Keep South-West corner for stability and completion energy.
            </p>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 card mb-4 md:mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-slate-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 md:h-6 w-5 md:w-6 text-teal-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Vastu-Aligned Dashboard
          </h2>
          <p className="text-xs md:text-sm text-slate-600 mt-1">
            {new Date().toLocaleDateString('hi-IN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}
          </p>
        </div>
        <div className="mt-2 md:mt-0 text-right">
          <div className="text-xs md:text-sm text-slate-500">
            Shubh Muhurat: 6:30 AM - 7:30 AM
          </div>
          <div className="text-xs text-emerald-600 mt-1">
            Auspicious time for new tasks
          </div>
        </div>
      </div>

      {/* Responsive Vastu-aligned dashboard layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {/* North Zone - Vision & Future */}
        <div className="sm:col-span-2 lg:col-span-4">
          <NorthZone />
        </div>
        
        {/* East Zone - Growth & Progress */}
        <div className="lg:col-span-2">
          <EastZone />
        </div>
        
        {/* West Zone - Issues & Improvements */}
        <div className="lg:col-span-2">
          <WestZone />
        </div>
        
        {/* South Zone - Stability & Completion */}
        <div className="sm:col-span-2 lg:col-span-4">
          <SouthZone />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
        <button 
          className="bg-gradient-to-br from-teal-500 to-teal-600 text-white py-2 px-2 md:py-3 md:px-4 rounded-lg hover:from-teal-600 hover:to-teal-700 transition text-xs md:text-sm font-medium flex flex-col items-center justify-center"
          onClick={() => triggerEvent('PROJECT_CREATED', {
            id: Date.now(),
            name: 'Quick Project',
            type: 'residential',
            description: 'Auto-created project',
            status: 'PLANNING',
            progress: 0,
            startDate: new Date().toISOString().split('T')[0],
            deadline: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
            budget: 5000000,
            assignedCrew: 'New Team'
          })}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          + Auto Project
        </button>
        <button className="bg-gradient-to-br from-blue-500 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-blue-700 transition text-sm font-medium flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
          </svg>
          Log Material
        </button>
        <button className="bg-gradient-to-br from-amber-500 to-amber-600 text-white py-2 px-4 rounded-lg hover:from-amber-600 hover:to-amber-700 transition text-sm font-medium flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Check In
        </button>
        <button className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white py-2 px-4 rounded-lg hover:from-emerald-600 hover:to-emerald-700 transition text-sm font-medium flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Report Defect
        </button>
      </div>
    </div>
  )
}

export default VastuDashboard