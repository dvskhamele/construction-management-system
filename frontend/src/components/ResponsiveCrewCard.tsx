'use client'

import React from 'react'
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
import { 
  Email as EmailIcon, 
  Info as InfoIcon, 
  CalendarToday as CalendarIcon,
  People as PeopleIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material'

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
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 2,
        borderRadius: 3,
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          boxShadow: 4,
          transform: 'translateY(-2px)'
        }
      }}
    >
      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        {/* Header with avatar and info */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
          <Avatar 
            sx={{ 
              bgcolor: 'teal.main',
              width: 48,
              height: 48,
              fontSize: '1.25rem',
              fontWeight: 'medium'
            }}
          >
            {member.name.charAt(0)}
          </Avatar>
          
          <Box sx={{ ml: 2, flexGrow: 1, minWidth: 0 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                fontWeight: 'bold',
                mb: 0.5,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {member.name}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {member.position}
            </Typography>
          </Box>
          
          <Chip 
            label={member.status}
            color={getStatusColor(member.status)}
            size="small"
            sx={{ 
              height: 'auto',
              '& .MuiChip-label': {
                display: 'block',
                whiteSpace: 'normal'
              }
            }}
          />
        </Box>
        
        {/* Info Grid */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr' }, gap: 1.5 }}>
            <Box sx={{ bgcolor: 'grey.50', p: 1.5, borderRadius: 1.5 }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                Department
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 'medium',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {member.department}
              </Typography>
            </Box>
            
            <Box sx={{ bgcolor: 'grey.50', p: 1.5, borderRadius: 1.5 }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                Schedule
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 'medium',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {member.schedule}
              </Typography>
            </Box>
            
            <Box sx={{ bgcolor: 'grey.50', p: 1.5, borderRadius: 1.5 }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                Hire Date
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 'medium',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {new Date(member.hireDate).toLocaleDateString()}
              </Typography>
            </Box>
            
            <Box sx={{ bgcolor: 'grey.50', p: 1.5, borderRadius: 1.5 }}>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                Attendance
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 'medium',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {member.attendance || 'N/A'}
              </Typography>
            </Box>
          </Box>
        </Box>
        
        {/* Performance Section */}
        <Divider sx={{ my: 1 }} />
        
        <Box sx={{ mb: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              Performance
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              {member.performance}% {getPerformanceEmoji(member.performance)}
            </Typography>
          </Box>
          
          <LinearProgress 
            variant="determinate" 
            value={member.performance}
            sx={{ 
              height: 8, 
              borderRadius: 1,
              backgroundColor: 'grey.200',
              '& .MuiLinearProgress-bar': {
                backgroundColor: getPerformanceColor(member.performance)
              }
            }}
          />
        </Box>
      </CardContent>
      
      {/* Actions */}
      <CardActions sx={{ justifyContent: 'space-between', p: 2, pt: 1 }}>
        <Button 
          size="small" 
          variant="text"
          onClick={() => onScheduleClick(member)}
          sx={{ 
            fontWeight: 'medium',
            textTransform: 'none',
            minWidth: 0,
            p: 0.5
          }}
        >
          View Schedule
        </Button>
        
        <Box>
          <Tooltip title="Send Message">
            <IconButton size="small">
              <EmailIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="More Info">
            <IconButton size="small">
              <InfoIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>
    </Card>
  )
}

export default ResponsiveCrewCard