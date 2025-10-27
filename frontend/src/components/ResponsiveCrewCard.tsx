'use client'

import React from 'react'
// COMMENTED OUT DUE TO BUILD ERROR - @mui/material module not found
/*
import { 
  Card, 
  CardContent, 
  CardActions, 
  Avatar, 
  Typography, 
  Chip, 
  LinearProgress, 
  Box, 
  Grid, 
  Divider,
  Button,
  IconButton,
  Tooltip
} from '@mui/material'
import EmailIcon from '@mui/icons-material/Email'
import InfoIcon from '@mui/icons-material/Info'
import CalendarIcon from '@mui/icons-material/CalendarToday'
import PeopleIcon from '@mui/icons-material/People'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
*/

interface CrewMember {
  id: number
  name: string
  department: string
  position: string
  status: string
  email: string
  phone: string
  hireDate: string
  performance: number
  schedule: string
  attendance?: string
}

interface ResponsiveCrewCardProps {
  member: CrewMember
  onScheduleClick: (member: CrewMember) => void
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'success'
    case 'Break':
      return 'warning'
    case 'Offline':
      return 'default'
    default:
      return 'default'
  }
}

const getPerformanceColor = (performance: number) => {
  if (performance >= 90) return '#10b981' // emerald-500
  if (performance >= 80) return '#f59e0b' // amber-500
  return '#ef4444' // red-500
}

const getPerformanceEmoji = (performance: number) => {
  if (performance >= 95) return '🌟'
  if (performance >= 90) return '👍'
  if (performance >= 80) return '👌'
  return '⚠️'
}

const ResponsiveCrewCard: React.FC<ResponsiveCrewCardProps> = ({ member, onScheduleClick }) => {
  return (
    <div 
      className="bg-white border border-gray-200 rounded-xl shadow-md flex flex-col h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-0.5"
    >
      <div className="p-4 pb-2 flex-grow">
        {/* Header with avatar and info */}
        <div className="flex items-start mb-2">
          <div 
            className="bg-teal-500 w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-medium"
          >
            {member.name.charAt(0)}
          </div>
          
          <div className="ml-3 flex-grow min-w-0">
            <div 
              className="font-bold text-gray-900 mb-1 overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {member.name}
            </div>
            <div 
              className="text-sm text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap"
            >
              {member.position}
            </div>
          </div>
          
          <span className={`px-2 py-1 rounded-full text-xs ${
            member.status === 'Active' ? 'bg-green-100 text-green-800' :
            member.status === 'Break' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {member.status}
          </span>
        </div>
        
        {/* Info Grid */}
        <div className="mb-3">
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-xs text-gray-500 block">
                Department
              </div>
              <div 
                className="text-sm font-medium text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {member.department}
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-xs text-gray-500 block">
                Schedule
              </div>
              <div 
                className="text-sm font-medium text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {member.schedule}
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-xs text-gray-500 block">
                Hire Date
              </div>
              <div 
                className="text-sm font-medium text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {new Date(member.hireDate).toLocaleDateString()}
              </div>
            </div>
            
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-xs text-gray-500 block">
                Attendance
              </div>
              <div 
                className="text-sm font-medium text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {member.attendance || 'N/A'}
              </div>
            </div>
          </div>
        </div>
        
        {/* Performance Section */}
        <div className="border-t border-gray-200 my-3" />
        
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <div className="text-sm text-gray-600">
              Performance
            </div>
            <div className="text-sm font-bold flex items-center">
              {member.performance}% {getPerformanceEmoji(member.performance)}
            </div>
          </div>
          
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full"
              style={{ 
                width: `${member.performance}%`,
                backgroundColor: getPerformanceColor(member.performance)
              }}
            />
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex justify-between p-3 pt-2">
        <button 
          className="text-sm font-medium text-teal-600 hover:text-teal-800 px-0 py-1 min-w-0"
          onClick={() => onScheduleClick(member)}
        >
          View Schedule
        </button>
        
        <div className="flex">
          <div title="Send Message" className="p-1 rounded hover:bg-gray-100 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <div title="More Info" className="p-1 rounded hover:bg-gray-100 cursor-pointer ml-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResponsiveCrewCard