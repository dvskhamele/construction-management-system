'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import UserLayout from '../../components/UserLayout'

export default function ConstructionCalendar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [user, setUser] = useState<any>({ name: 'Project Manager', role: 'ADMIN' })
  const [events, setEvents] = useState<any[]>([
    {
      id: 1,
      title: 'Site Visit: Downtown Office Complex',
      start: '2025-03-20T09:00:00',
      end: '2025-03-20T11:00:00',
      type: 'site-visit',
      client: 'Meridian Properties',
      project: 'Downtown Office Complex',
      assignedTo: 'You',
      priority: 'HIGH',
      status: 'Scheduled',
      location: '123 Business Ave, New York, NY',
      notes: 'Inspect foundation work and review progress with construction crew.'
    },
    {
      id: 2,
      title: 'Proposal Presentation: Residential Apartment Block B',
      start: '2025-03-20T14:00:00',
      end: '2025-03-20T15:30:00',
      type: 'presentation',
      client: 'Urban Developments',
      project: 'Residential Apartment Block B',
      assignedTo: 'You',
      priority: 'HIGH',
      status: 'Scheduled',
      location: '456 Development Blvd, Chicago, IL',
      notes: 'Present final proposal with cost breakdown and timeline. Address client questions about green building features.'
    },
    {
      id: 3,
      title: 'Follow-up Call: Retail Center Renovation',
      start: '2025-03-21T10:30:00',
      end: '2025-03-21T11:00:00',
      type: 'call',
      client: 'City Retail Group',
      project: 'Retail Center Renovation',
      assignedTo: 'You',
      priority: 'MEDIUM',
      status: 'Scheduled',
      location: 'Remote',
      notes: 'Discuss proposal feedback and address budget concerns raised during last meeting.'
    },
    {
      id: 4,
      title: 'Contract Signing: Industrial Warehouse',
      start: '2025-03-22T13:00:00',
      end: '2025-03-22T14:30:00',
      type: 'meeting',
      client: 'Tech Storage Solutions',
      project: 'Industrial Warehouse',
      assignedTo: 'Sarah Johnson',
      priority: 'HIGH',
      status: 'Scheduled',
      location: '789 Logistics Way, Houston, TX',
      notes: 'Finalize contract signing with COO. Review project milestones and payment schedule.'
    },
    {
      id: 5,
      title: 'Project Kickoff: Mixed-Use Development',
      start: '2025-03-25T09:00:00',
      end: '2025-03-25T12:00:00',
      type: 'kickoff',
      client: 'Downtown Developers LLC',
      project: 'Mixed-Use Development',
      assignedTo: 'You',
      priority: 'HIGH',
      status: 'Scheduled',
      location: '654 Mixed Use Ave, Miami, FL',
      notes: 'Kickoff meeting with all stakeholders. Review project scope, timeline, and responsibilities.'
    },
    {
      id: 6,
      title: 'Weekly Progress Review',
      start: '2025-03-21T15:00:00',
      end: '2025-03-21T16:00:00',
      type: 'review',
      client: 'Internal',
      project: 'All Active Projects',
      assignedTo: 'You',
      priority: 'MEDIUM',
      status: 'Scheduled',
      location: 'Office',
      notes: 'Weekly review of all active projects. Update project status and identify potential issues.'
    },
    {
      id: 7,
      title: 'Safety Inspection: Downtown Office Complex',
      start: '2025-03-23T10:00:00',
      end: '2025-03-23T12:00:00',
      type: 'inspection',
      client: 'Meridian Properties',
      project: 'Downtown Office Complex',
      assignedTo: 'Mike Chen',
      priority: 'HIGH',
      status: 'Scheduled',
      location: '123 Business Ave, New York, NY',
      notes: 'Monthly safety inspection. Review compliance with OSHA standards and site safety protocols.'
    },
    {
      id: 8,
      title: 'Material Delivery: Residential Apartment Block B',
      start: '2025-03-24T08:00:00',
      end: '2025-03-24T10:00:00',
      type: 'delivery',
      client: 'Urban Developments',
      project: 'Residential Apartment Block B',
      assignedTo: 'Emily Rodriguez',
      priority: 'MEDIUM',
      status: 'Scheduled',
      location: 'Site Entrance',
      notes: 'Receive steel beams for 5th floor construction. Coordinate with site supervisor for unloading.'
    }
  ])
  const [view, setView] = useState('week') // week, month, day
  const [currentDate, setCurrentDate] = useState(new Date())
  const [filter, setFilter] = useState('all')
  const [showEventModal, setShowEventModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)

  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('token')
    setIsLoggedIn(false)
    setUser(null)
    router.push('/login')
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'site-visit':
        return 'bg-teal-100 text-teal-800 border-teal-500'
      case 'presentation':
        return 'bg-amber-100 text-amber-800 border-amber-500'
      case 'call':
        return 'bg-indigo-100 text-indigo-800 border-indigo-500'
      case 'meeting':
        return 'bg-emerald-100 text-emerald-800 border-emerald-500'
      case 'kickoff':
        return 'bg-purple-100 text-purple-800 border-purple-500'
      case 'review':
        return 'bg-blue-100 text-blue-800 border-blue-500'
      case 'inspection':
        return 'bg-rose-100 text-rose-800 border-rose-500'
      case 'delivery':
        return 'bg-amber-100 text-amber-800 border-amber-500'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-500'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'bg-rose-100 text-rose-800'
      case 'MEDIUM':
        return 'bg-amber-100 text-amber-800'
      case 'LOW':
        return 'bg-emerald-100 text-emerald-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'Confirmed':
        return 'bg-emerald-100 text-emerald-800'
      case 'Completed':
        return 'bg-gray-100 text-gray-800'
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800'
      case 'Rescheduled':
        return 'bg-amber-100 text-amber-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredEvents = events.filter(event => {
    if (filter === 'all') return true
    if (filter === 'personal') return event.assignedTo === 'You'
    if (filter === 'team') return event.assignedTo !== 'You'
    if (filter === 'high') return event.priority === 'HIGH'
    if (filter === 'site-visits') return event.type === 'site-visit'
    if (filter === 'presentations') return event.type === 'presentation'
    if (filter === 'meetings') return event.type === 'meeting'
    if (filter === 'calls') return event.type === 'call'
    return true
  })

  const getDaysInWeek = (date: Date) => {
    const start = new Date(date)
    start.setDate(start.getDate() - start.getDay())
    return Array.from({ length: 7 }).map((_, i) => {
      const day = new Date(start)
      day.setDate(day.getDate() + i)
      return day
    })
  }

  const getEventsForDay = (day: Date) => {
    return filteredEvents.filter(event => {
      const eventDate = new Date(event.start)
      return eventDate.toDateString() === day.toDateString()
    })
  }

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    newDate.setDate(newDate.getDate() + (direction === 'prev' ? -7 : 7))
    setCurrentDate(newDate)
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() + (direction === 'prev' ? -1 : 1))
    setCurrentDate(newDate)
  }

  const openEventModal = (event: any) => {
    setSelectedEvent(event)
    setShowEventModal(true)
  }

  const closeEventModal = () => {
    setShowEventModal(false)
    setSelectedEvent(null)
  }

  return (
    <UserLayout user={user} onLogout={handleLogout}>
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Construction Calendar</h1>
              <p className="text-slate-600">Manage project schedules, site visits, and follow-ups</p>
            </div>
            <div className="mt-4 md:mt-0">
              <button 
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-md flex items-center"
                onClick={() => setShowEventModal(true)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Event
              </button>
            </div>
          </div>
        </div>

        {/* View Controls */}
        <div className="flex flex-wrap items-center justify-between mb-6 bg-white rounded-2xl shadow-md p-4">
          <div className="flex flex-wrap space-x-2 mb-2 sm:mb-0">
            <button 
              className={`px-3 py-1 text-sm rounded-lg ${
                view === 'day' 
                  ? 'bg-teal-100 text-teal-800 font-medium' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              onClick={() => setView('day')}
            >
              Day
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-lg ${
                view === 'week' 
                  ? 'bg-teal-100 text-teal-800 font-medium' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              onClick={() => setView('week')}
            >
              Week
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-lg ${
                view === 'month' 
                  ? 'bg-teal-100 text-teal-800 font-medium' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              onClick={() => setView('month')}
            >
              Month
            </button>
          </div>
          
          <div className="flex items-center space-x-4 mb-2 sm:mb-0">
            <button 
              className="p-2 rounded-full hover:bg-slate-100"
              onClick={() => view === 'week' ? navigateWeek('prev') : navigateMonth('prev')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="text-sm font-medium text-slate-800">
              {view === 'week' 
                ? `${getDaysInWeek(currentDate)[0].toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} - ${getDaysInWeek(currentDate)[6].toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}` 
                : currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
            
            <button 
              className="p-2 rounded-full hover:bg-slate-100"
              onClick={() => view === 'week' ? navigateWeek('next') : navigateMonth('next')}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            <button 
              className="text-sm text-teal-600 hover:text-teal-800 font-medium"
              onClick={() => setCurrentDate(new Date())}
            >
              Today
            </button>
          </div>
          
          <div className="flex flex-wrap space-x-2">
            <button 
              className={`px-3 py-1 text-sm rounded-lg ${
                filter === 'all' 
                  ? 'bg-teal-100 text-teal-800 font-medium' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              onClick={() => setFilter('all')}
            >
              All Events
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-lg ${
                filter === 'personal' 
                  ? 'bg-blue-100 text-blue-800 font-medium' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              onClick={() => setFilter('personal')}
            >
              My Events
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded-lg ${
                filter === 'high' 
                  ? 'bg-rose-100 text-rose-800 font-medium' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              onClick={() => setFilter('high')}
            >
              High Priority
            </button>
          </div>
        </div>

        {/* Calendar Views */}
        {view === 'week' && (
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <div className="grid grid-cols-8 gap-2">
              <div className="col-span-1"></div>
              {getDaysInWeek(currentDate).map((day, index) => (
                <div key={index} className="text-center pb-2 border-b border-slate-200">
                  <div className="text-sm font-medium text-slate-600">
                    {day.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className={`text-lg font-bold mt-1 ${
                    day.toDateString() === new Date().toDateString() 
                      ? 'text-teal-600' 
                      : 'text-slate-800'
                  }`}>
                    {day.getDate()}
                  </div>
                </div>
              ))}
              
              <div className="col-span-1 py-2 border-r border-slate-200">
                <div className="text-xs text-slate-500">8:00 AM</div>
              </div>
              {getDaysInWeek(currentDate).map((day, dayIndex) => (
                <div key={dayIndex} className="border-r border-slate-100 min-h-16">
                  {getEventsForDay(day)
                    .filter(event => new Date(event.start).getHours() === 8)
                    .map((event, eventIndex) => (
                      <div 
                        key={eventIndex}
                        className={`p-2 mb-1 text-xs rounded cursor-pointer border-l-4 ${getTypeColor(event.type)}`}
                        onClick={() => openEventModal(event)}
                      >
                        <div className="font-medium truncate">{event.title}</div>
                        <div className="text-slate-600 truncate">{event.client}</div>
                      </div>
                    ))}
                </div>
              ))}
              
              <div className="col-span-1 py-2 border-r border-slate-200">
                <div className="text-xs text-slate-500">9:00 AM</div>
              </div>
              {getDaysInWeek(currentDate).map((day, dayIndex) => (
                <div key={dayIndex} className="border-r border-slate-100 min-h-16">
                  {getEventsForDay(day)
                    .filter(event => new Date(event.start).getHours() === 9)
                    .map((event, eventIndex) => (
                      <div 
                        key={eventIndex}
                        className={`p-2 mb-1 text-xs rounded cursor-pointer border-l-4 ${getTypeColor(event.type)}`}
                        onClick={() => openEventModal(event)}
                      >
                        <div className="font-medium truncate">{event.title}</div>
                        <div className="text-slate-600 truncate">{event.client}</div>
                      </div>
                    ))}
                </div>
              ))}
              
              <div className="col-span-1 py-2 border-r border-slate-200">
                <div className="text-xs text-slate-500">10:00 AM</div>
              </div>
              {getDaysInWeek(currentDate).map((day, dayIndex) => (
                <div key={dayIndex} className="border-r border-slate-100 min-h-16">
                  {getEventsForDay(day)
                    .filter(event => new Date(event.start).getHours() === 10)
                    .map((event, eventIndex) => (
                      <div 
                        key={eventIndex}
                        className={`p-2 mb-1 text-xs rounded cursor-pointer border-l-4 ${getTypeColor(event.type)}`}
                        onClick={() => openEventModal(event)}
                      >
                        <div className="font-medium truncate">{event.title}</div>
                        <div className="text-slate-600 truncate">{event.client}</div>
                      </div>
                    ))}
                </div>
              ))}
              
              <div className="col-span-1 py-2 border-r border-slate-200">
                <div className="text-xs text-slate-500">11:00 AM</div>
              </div>
              {getDaysInWeek(currentDate).map((day, dayIndex) => (
                <div key={dayIndex} className="border-r border-slate-100 min-h-16">
                  {getEventsForDay(day)
                    .filter(event => new Date(event.start).getHours() === 11)
                    .map((event, eventIndex) => (
                      <div 
                        key={eventIndex}
                        className={`p-2 mb-1 text-xs rounded cursor-pointer border-l-4 ${getTypeColor(event.type)}`}
                        onClick={() => openEventModal(event)}
                      >
                        <div className="font-medium truncate">{event.title}</div>
                        <div className="text-slate-600 truncate">{event.client}</div>
                      </div>
                    ))}
                </div>
              ))}
              
              <div className="col-span-1 py-2 border-r border-slate-200">
                <div className="text-xs text-slate-500">12:00 PM</div>
              </div>
              {getDaysInWeek(currentDate).map((day, dayIndex) => (
                <div key={dayIndex} className="border-r border-slate-100 min-h-16">
                  {getEventsForDay(day)
                    .filter(event => new Date(event.start).getHours() === 12)
                    .map((event, eventIndex) => (
                      <div 
                        key={eventIndex}
                        className={`p-2 mb-1 text-xs rounded cursor-pointer border-l-4 ${getTypeColor(event.type)}`}
                        onClick={() => openEventModal(event)}
                      >
                        <div className="font-medium truncate">{event.title}</div>
                        <div className="text-slate-600 truncate">{event.client}</div>
                      </div>
                    ))}
                </div>
              ))}
              
              <div className="col-span-1 py-2 border-r border-slate-200">
                <div className="text-xs text-slate-500">1:00 PM</div>
              </div>
              {getDaysInWeek(currentDate).map((day, dayIndex) => (
                <div key={dayIndex} className="border-r border-slate-100 min-h-16">
                  {getEventsForDay(day)
                    .filter(event => new Date(event.start).getHours() === 13)
                    .map((event, eventIndex) => (
                      <div 
                        key={eventIndex}
                        className={`p-2 mb-1 text-xs rounded cursor-pointer border-l-4 ${getTypeColor(event.type)}`}
                        onClick={() => openEventModal(event)}
                      >
                        <div className="font-medium truncate">{event.title}</div>
                        <div className="text-slate-600 truncate">{event.client}</div>
                      </div>
                    ))}
                </div>
              ))}
              
              <div className="col-span-1 py-2 border-r border-slate-200">
                <div className="text-xs text-slate-500">2:00 PM</div>
              </div>
              {getDaysInWeek(currentDate).map((day, dayIndex) => (
                <div key={dayIndex} className="border-r border-slate-100 min-h-16">
                  {getEventsForDay(day)
                    .filter(event => new Date(event.start).getHours() === 14)
                    .map((event, eventIndex) => (
                      <div 
                        key={eventIndex}
                        className={`p-2 mb-1 text-xs rounded cursor-pointer border-l-4 ${getTypeColor(event.type)}`}
                        onClick={() => openEventModal(event)}
                      >
                        <div className="font-medium truncate">{event.title}</div>
                        <div className="text-slate-600 truncate">{event.client}</div>
                      </div>
                    ))}
                </div>
              ))}
              
              <div className="col-span-1 py-2 border-r border-slate-200">
                <div className="text-xs text-slate-500">3:00 PM</div>
              </div>
              {getDaysInWeek(currentDate).map((day, dayIndex) => (
                <div key={dayIndex} className="border-r border-slate-100 min-h-16">
                  {getEventsForDay(day)
                    .filter(event => new Date(event.start).getHours() === 15)
                    .map((event, eventIndex) => (
                      <div 
                        key={eventIndex}
                        className={`p-2 mb-1 text-xs rounded cursor-pointer border-l-4 ${getTypeColor(event.type)}`}
                        onClick={() => openEventModal(event)}
                      >
                        <div className="font-medium truncate">{event.title}</div>
                        <div className="text-slate-600 truncate">{event.client}</div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'month' && (
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                <div key={index} className="text-center py-2 text-sm font-medium text-slate-600 border-b border-slate-200">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }).map((_, index) => {
                const day = new Date(currentDate.getFullYear(), currentDate.getMonth(), index - new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay() + 1)
                const isCurrentMonth = day.getMonth() === currentDate.getMonth()
                const isToday = day.toDateString() === new Date().toDateString()
                
                return (
                  <div 
                    key={index} 
                    className={`min-h-24 p-1 border border-slate-100 rounded ${
                      isCurrentMonth ? 'bg-white' : 'bg-slate-50 text-slate-400'
                    } ${isToday ? 'ring-2 ring-teal-500' : ''}`}
                  >
                    <div className={`text-right text-sm p-1 ${
                      isToday ? 'font-bold text-teal-600' : ''
                    }`}>
                      {day.getDate()}
                    </div>
                    <div className="space-y-1">
                      {filteredEvents
                        .filter(event => new Date(event.start).toDateString() === day.toDateString())
                        .slice(0, 3)
                        .map((event, eventIndex) => (
                          <div 
                            key={eventIndex}
                            className={`text-xs p-1 rounded truncate cursor-pointer ${getTypeColor(event.type)}`}
                            onClick={() => openEventModal(event)}
                          >
                            {event.title}
                          </div>
                        ))}
                      {filteredEvents
                        .filter(event => new Date(event.start).toDateString() === day.toDateString())
                        .length > 3 && (
                          <div className="text-xs text-slate-500 p-1">
                            +{filteredEvents.filter(event => new Date(event.start).toDateString() === day.toDateString()).length - 3} more
                          </div>
                        )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {view === 'day' && (
          <div className="bg-white rounded-2xl shadow-md p-6 card">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-slate-800">
                {currentDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </h2>
            </div>
            <div className="space-y-4">
              {filteredEvents
                .filter(event => new Date(event.start).toDateString() === currentDate.toDateString())
                .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
                .map((event, index) => (
                  <div 
                    key={index} 
                    className={`p-4 rounded-lg border-l-4 cursor-pointer hover:shadow-md transition ${getTypeColor(event.type)}`}
                    onClick={() => openEventModal(event)}
                  >
                    <div className="flex justify-between">
                      <h3 className="font-medium text-slate-800">{event.title}</h3>
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(event.priority)}`}>
                        {event.priority}
                      </span>
                    </div>
                    <div className="flex justify-between mt-2">
                      <div className="text-sm text-slate-600">
                        <div>{event.client} • {event.project}</div>
                        <div>
                          {new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                          {new Date(event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        <div>{event.location}</div>
                      </div>
                      <div className="text-right">
                        <div className={`px-2 py-1 text-xs rounded-full ${getStatusColor(event.status)}`}>
                          {event.status}
                        </div>
                        <div className="text-xs text-slate-500 mt-1">Assigned: {event.assignedTo}</div>
                      </div>
                    </div>
                    {event.notes && (
                      <div className="mt-2 text-sm text-slate-600 italic">
                        {event.notes}
                      </div>
                    )}
                  </div>
                ))}
              
              {filteredEvents
                .filter(event => new Date(event.start).toDateString() === currentDate.toDateString())
                .length === 0 && (
                  <div className="text-center py-12 text-slate-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p>No events scheduled for today</p>
                    <button 
                      className="mt-4 text-teal-600 hover:text-teal-800 font-medium"
                      onClick={() => setShowEventModal(true)}
                    >
                      Add an event
                    </button>
                  </div>
                )}
            </div>
          </div>
        )}

        {/* Calendar Features */}
        <div className="mt-8 bg-white rounded-2xl shadow-md p-6 card">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Calendar Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border border-slate-200 rounded-lg p-4 text-center hover:shadow-md transition">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-100 to-teal-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-medium text-slate-800 mb-2">Event Types</h3>
              <p className="text-sm text-slate-600">Color-coded events for site visits, meetings, presentations, and more</p>
            </div>
            
            <div className="border border-slate-200 rounded-lg p-4 text-center hover:shadow-md transition">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-medium text-slate-800 mb-2">Smart Scheduling</h3>
              <p className="text-sm text-slate-600">Avoid double-bookings with conflict detection and smart time suggestions</p>
            </div>
            
            <div className="border border-slate-200 rounded-lg p-4 text-center hover:shadow-md transition">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-medium text-slate-800 mb-2">Reminders</h3>
              <p className="text-sm text-slate-600">Automated email and push notifications for upcoming events and deadlines</p>
            </div>
            
            <div className="border border-slate-200 rounded-lg p-4 text-center hover:shadow-md transition">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-medium text-slate-800 mb-2">Team Sync</h3>
              <p className="text-sm text-slate-600">Shared calendars with team availability and resource allocation</p>
            </div>
          </div>
        </div>
      </main>

      {/* Event Details Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center sticky top-0 bg-white">
              <h3 className="text-lg font-semibold text-slate-800">
                {selectedEvent ? selectedEvent.title : 'Add New Event'}
              </h3>
              <button 
                onClick={closeEventModal}
                className="text-slate-400 hover:text-slate-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              {selectedEvent ? (
                <div>
                  <div className={`p-4 rounded-lg mb-6 ${getTypeColor(selectedEvent.type)}`}>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">{selectedEvent.title}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-slate-600"><span className="font-medium">Client:</span> {selectedEvent.client}</p>
                        <p className="text-sm text-slate-600"><span className="font-medium">Project:</span> {selectedEvent.project}</p>
                        <p className="text-sm text-slate-600"><span className="font-medium">Location:</span> {selectedEvent.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-600">
                          <span className="font-medium">Date:</span> {new Date(selectedEvent.start).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-slate-600">
                          <span className="font-medium">Time:</span> {new Date(selectedEvent.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                          {new Date(selectedEvent.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <p className="text-sm text-slate-600"><span className="font-medium">Assigned To:</span> {selectedEvent.assignedTo}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <span className={`px-3 py-1 text-sm rounded-full ${getPriorityColor(selectedEvent.priority)}`}>
                        {selectedEvent.priority} Priority
                      </span>
                    </div>
                    <div>
                      <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(selectedEvent.status)}`}>
                        {selectedEvent.status}
                      </span>
                    </div>
                  </div>
                  
                  {selectedEvent.notes && (
                    <div className="mb-6">
                      <h3 className="font-medium text-slate-800 mb-2">Notes</h3>
                      <p className="text-slate-600 bg-slate-50 p-3 rounded-lg">{selectedEvent.notes}</p>
                    </div>
                  )}
                  
                  <div className="flex space-x-3">
                    <button 
                      className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-4 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300"
                      onClick={() => {
                        router.push(`/calendar/edit/${selectedEvent.id}`)
                        closeEventModal()
                      }}
                    >
                      Edit Event
                    </button>
                    <button 
                      className="flex-1 border border-slate-300 text-slate-700 py-2 px-4 rounded-lg font-medium hover:bg-slate-50 transition duration-300"
                      onClick={closeEventModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Event Title</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter event title"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Start Date & Time</label>
                      <input
                        type="datetime-local"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">End Date & Time</label>
                      <input
                        type="datetime-local"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Event Type</label>
                    <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                      <option value="site-visit">Site Visit</option>
                      <option value="presentation">Presentation</option>
                      <option value="call">Call</option>
                      <option value="meeting">Meeting</option>
                      <option value="kickoff">Project Kickoff</option>
                      <option value="review">Progress Review</option>
                      <option value="inspection">Safety Inspection</option>
                      <option value="delivery">Material Delivery</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Client</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Select client"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Project</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="Select project"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Enter location"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Assigned To</label>
                      <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                        <option value="you">You</option>
                        <option value="sarah">Sarah Johnson</option>
                        <option value="mike">Mike Chen</option>
                        <option value="emily">Emily Rodriguez</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Priority</label>
                      <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500">
                        <option value="HIGH">High</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="LOW">Low</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
                    <textarea
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      rows={3}
                      placeholder="Add event notes"
                    ></textarea>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button 
                      className="flex-1 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 px-4 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300"
                      onClick={closeEventModal}
                    >
                      Save Event
                    </button>
                    <button 
                      className="flex-1 border border-slate-300 text-slate-700 py-2 px-4 rounded-lg font-medium hover:bg-slate-50 transition duration-300"
                      onClick={closeEventModal}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </UserLayout>
  )
}