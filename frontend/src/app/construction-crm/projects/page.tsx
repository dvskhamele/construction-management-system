// Project Management Page for Construction CRM
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Heart,
  Star,
  DollarSign,
  Building, 
  MapPin, 
  HardHat, 
  Users, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Phone, 
  Mail, 
  Search, 
  Plus, 
  Send, 
  Video, 
  FileText, 
  Wrench,
  Hammer,
  Scale,
  Square,
  Hash,
  Layers,
  RotateCcw,
  ZoomIn,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Shield,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

export default function ProjectManagementPage() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'Downtown Complex',
      client: 'Metro Developments',
      address: '123 Construction Ave, Delhi',
      status: 'active',
      projectType: 'commercial',
      size: '250 sq ft',
      siteEngineer: 'Anil Sharma',
      siteEngineerId: 1,
      assignedContractors: [
        { id: 1, name: 'Raj Construction', status: 'active', workType: 'civil', contactMethod: 'crm_only' },
        { id: 2, name: 'Sharma Masonry', status: 'active', workType: 'masonry', contactMethod: 'crm_only' }
      ],
      startDate: '2025-01-15',
      expectedCompletion: '2025-08-30',
      progress: 65,
      currentPhase: 'framing',
      totalContractors: 2,
      activeContractors: 2,
      pendingTasks: 3,
      criticalIssues: 1,
      engineerMaxSites: 2,
      actualSites: 2,
      location: 'Delhi',
      area: '250 sq ft',
      projectValue: 12500000,
      lastUpdated: '2025-03-20',
      reports: [
        { id: 1, date: '2025-03-20', content: 'Brickwork completed 8 inch as per specs', status: 'completed' },
        { id: 2, date: '2025-03-19', content: 'Foundation inspection passed', status: 'completed' }
      ],
      upcomingTasks: [
        { id: 1, task: 'Plastering work', dueDate: '2025-03-25', priority: 'high' },
        { id: 2, task: 'Electrical conduit installation', dueDate: '2025-03-28', priority: 'medium' }
      ],
      siteIssues: [
        {
          id: 1,
          type: 'spacing',
          priority: 'high',
          reportedBy: 'Anil Kumar',
          reportedDate: '2025-03-18',
          description: 'Column spacing exceeds 6m maximum as per building code. Current spacing is 7.2m.',
          status: 'open',
          assignedTo: 'Rajesh Sharma',
          dueDate: '2025-03-25',
          resolutionNotes: 'Updated in v2.2 but still needs adjustment',
          category: 'structural',
          relatedTo: 'column_spacing',
          measurements: {
            expected: '6m max',
            actual: '7.2m',
            unit: 'meters'
          }
        },
        {
          id: 2,
          type: 'dimension',
          priority: 'medium',
          reportedBy: 'Contractor Team',
          reportedDate: '2025-03-19',
          description: 'Foundation dimensions do not match site survey measurements.',
          status: 'resolved',
          assignedTo: 'Rajesh Sharma',
          dueDate: '2025-03-22',
          resolutionNotes: 'Updated dimensions in v2.3',
          category: 'structural',
          relatedTo: 'foundation_dimensions',
          measurements: {
            expected: 'Match survey',
            actual: 'Off by 10cm',
            unit: 'centimeters'
          }
        }
      ],
      communicationRestrictions: {
        directContact: false,
        contactMethod: 'crm_only',
        authorizedContacts: ['site_engineer', 'project_manager'],
        contactHistory: [
          { date: '2025-03-20', contactType: 'secure_call', with: 'Anil Sharma', purpose: 'Foundation work discussion' },
          { date: '2025-03-18', contactType: 'secure_message', with: 'Priya Patel', purpose: 'Drawing clarification' }
        ]
      },
      phases: [
        { id: 1, name: 'Pre-construction', status: 'completed', startDate: '2025-01-15', endDate: '2025-01-30', progress: 100 },
        { id: 2, name: 'Foundation', status: 'completed', startDate: '2025-01-31', endDate: '2025-02-15', progress: 100 },
        { id: 3, name: 'Framing', status: 'in_progress', startDate: '2025-02-16', endDate: '2025-03-30', progress: 65 },
        { id: 4, name: 'Electrical', status: 'pending', startDate: '2025-04-01', endDate: '2025-04-30', progress: 0 },
        { id: 5, name: 'Plumbing', status: 'pending', startDate: '2025-05-01', endDate: '2025-05-31', progress: 0 },
        { id: 6, name: 'Finishing', status: 'pending', startDate: '2025-06-01', endDate: '2025-07-31', progress: 0 },
        { id: 7, name: 'Final Inspection', status: 'pending', startDate: '2025-08-01', endDate: '2025-08-30', progress: 0 }
      ],
      milestones: [
        { id: 1, name: 'Site Preparation', date: '2025-01-30', status: 'completed', amount: 500000 },
        { id: 2, name: 'Foundation Complete', date: '2025-02-15', status: 'completed', amount: 1200000 },
        { id: 3, name: 'Framing 50%', date: '2025-03-15', status: 'completed', amount: 800000 },
        { id: 4, name: 'Framing Complete', date: '2025-03-30', status: 'in_progress', amount: 1000000 },
        { id: 5, name: 'Electrical Rough-in', date: '2025-04-15', status: 'pending', amount: 750000 },
        { id: 6, name: 'Plumbing Rough-in', date: '2025-05-15', status: 'pending', amount: 600000 },
        { id: 7, name: 'Interior Finishing', date: '2025-07-15', status: 'pending', amount: 1500000 },
        { id: 8, name: 'Final Inspection', date: '2025-08-30', status: 'pending', amount: 250000 }
      ],
      budget: {
        total: 12500000,
        spent: 8150000,
        remaining: 4350000,
        perSqFt: 250,
        breakdown: {
          foundation: { allocated: 2000000, spent: 1700000, remaining: 300000 },
          framing: { allocated: 2500000, spent: 1800000, remaining: 700000 },
          electrical: { allocated: 1500000, spent: 0, remaining: 1500000 },
          plumbing: { allocated: 1200000, spent: 0, remaining: 1200000 },
          finishing: { allocated: 3500000, spent: 0, remaining: 3500000 },
          inspection: { allocated: 500000, spent: 0, remaining: 500000 },
          contingency: { allocated: 1300000, spent: 0, remaining: 1300000 }
        }
      },
      timeline: {
        startDate: '2025-01-15',
        endDate: '2025-08-30',
        currentDay: 65,
        totalDays: 227,
        daysBehind: 0,
        daysAhead: 0,
        completionPercentage: 28.6
      },
      team: {
        architect: 'Rajesh Designer',
        structuralEngineer: 'Anil Kumar',
        electricalEngineer: 'Suresh Reddy',
        plumbingEngineer: 'Priya Patel',
        projectManager: 'Manager Patel',
        siteEngineer: 'Anil Sharma',
        qualityEngineer: 'Quality Inspector',
        billingEngineer: 'Billing Team'
      },
      clientRequirements: {
        rooms: 12,
        entries: 2,
        bathrooms: 8,
        audioVideoRooms: 1,
        barRooms: 1,
        parkingSpaces: 20,
        drawingRooms: 2,
        kitchens: 3,
        customDemands: ['smart home automation', 'energy efficient design'],
        preferences: ['modern design', 'premium materials', 'sustainable features'],
        familyMembers: ['Mr. Gupta', 'Mrs. Gupta', 'Children'],
        visitDates: ['2025-01-10', '2025-02-05', '2025-03-15'],
        approvalDates: ['2025-01-12', '2025-02-08', '2025-03-18']
      },
      contractorIssues: [
        {
          id: 1,
          contractor: 'Raj Construction',
          issueType: 'quality',
          description: 'Labour done 4 inch only not 8 inch as specified',
          status: 'resolved',
          reportedDate: '2025-03-20',
          resolvedDate: '2025-03-22',
          resolutionNotes: 'Rectified work and retrained labour',
          category: 'masonry',
          relatedTo: 'brick_thickness',
          measurements: {
            expected: '8 inch',
            actual: '4 inch',
            unit: 'inches'
          }
        },
        {
          id: 2,
          contractor: 'Sharma Masonry',
          issueType: 'spacing',
          description: 'Column spacing does not match design specifications',
          status: 'open',
          reportedDate: '2025-03-18',
          resolvedDate: null,
          resolutionNotes: 'Still needs adjustment',
          category: 'structural',
          relatedTo: 'column_spacing',
          measurements: {
            expected: '6m max',
            actual: '7.2m',
            unit: 'meters'
          }
        }
      ],
      paymentIssues: [
        {
          id: 1,
          contractor: 'Raj Construction',
          issueType: 'delay',
          description: 'Payment delayed due to incomplete milestone documentation',
          status: 'resolved',
          reportedDate: '2025-03-15',
          resolvedDate: '2025-03-18',
          resolutionNotes: 'Documentation completed and payment released',
          category: 'financial',
          relatedTo: 'milestone_payment',
          amount: 250000
        },
        {
          id: 2,
          contractor: 'Sharma Masonry',
          issueType: 'dispute',
          description: 'Dispute over material quality affecting payment',
          status: 'open',
          reportedDate: '2025-03-20',
          resolvedDate: null,
          resolutionNotes: 'Awaiting quality inspection report',
          category: 'financial',
          relatedTo: 'material_quality',
          amount: 180000
        }
      ],
      hiringIssues: [
        {
          id: 1,
          issueType: 'shortage',
          description: 'Skilled labour shortage for electrical work',
          status: 'resolved',
          reportedDate: '2025-03-10',
          resolvedDate: '2025-03-15',
          resolutionNotes: 'Hired additional electricians through Apna',
          category: 'labour',
          relatedTo: 'electrical_work',
          contractorsInvolved: ['Electrical Experts']
        },
        {
          id: 2,
          issueType: 'retention',
          description: 'High turnover rate among masonry workers',
          status: 'open',
          reportedDate: '2025-03-18',
          resolvedDate: null,
          resolutionNotes: 'Implementing retention incentives',
          category: 'labour',
          relatedTo: 'masonry_workers',
          contractorsInvolved: ['Sharma Masonry', 'Raj Construction']
        }
      ],
      managementIssues: [
        {
          id: 1,
          issueType: 'coordination',
          description: 'Poor coordination between civil and electrical contractors',
          status: 'resolved',
          reportedDate: '2025-03-05',
          resolvedDate: '2025-03-10',
          resolutionNotes: 'Implemented daily standup meetings',
          category: 'communication',
          relatedTo: 'civil_electrical_coordination',
          contractorsInvolved: ['Raj Construction', 'Electrical Experts']
        },
        {
          id: 2,
          issueType: 'oversight',
          description: 'Site engineer managing 3 projects exceeding limit',
          status: 'open',
          reportedDate: '2025-03-15',
          resolvedDate: null,
          resolutionNotes: 'Need to redistribute workload',
          category: 'management',
          relatedTo: 'site_engineer_overload',
          contractorsInvolved: ['Anil Sharma']
        }
      ],
      siteVisits: [
        {
          id: 1,
          date: '2025-03-20',
          visitor: 'Client Representative',
          purpose: 'Foundation work inspection',
          outcome: 'Approved with minor corrections',
          notes: 'Column spacing needs adjustment per building code',
          attachments: ['foundation-inspection-report.pdf'],
          followUpRequired: true,
          followUpDate: '2025-03-25',
          followUpNotes: 'Adjust column spacing to 6m max'
        },
        {
          id: 2,
          date: '2025-03-15',
          visitor: 'Architect',
          purpose: 'Design review and coordination',
          outcome: 'Approved with recommendations',
          notes: 'Discuss client custom demands for audio/video rooms',
          attachments: ['design-review-notes.pdf'],
          followUpRequired: false,
          followUpDate: null,
          followUpNotes: null
        }
      ],
      fieldGrowth: {
        labourCount: 45,
        skilledLabour: 15,
        unskilledLabour: 30,
        supervisorCount: 3,
        contractorCount: 2,
        engineerCount: 1,
        growthRate: 12,
        retentionRate: 85,
        productivity: 78,
        safetyScore: 94
      },
      timeManagement: {
        regularHours: 10,
        overtimeHours: 2,
        sundayWork: true,
        holidayWork: true,
        amavasWork: true,
        workSchedule: 'flexible',
        shiftManagement: 'rotating',
        leaveCalendar: 'tracked',
        attendance: 'monitored'
      },
      technicalWork: {
        designSync: true,
        drawingIssues: 2,
        drawingChanges: 1,
        contractorIssues: 2,
        paymentIssues: 2,
        hiringIssues: 2,
        managementIssues: 2,
        siteVisitSync: true,
        realTimeReports: true,
        stageWorkTracking: true
      },
      communication: {
        phoneNumberVisibility: true,
        realTimeUpdates: true,
        fieldTravel: true,
        employeeDiscussions: true,
        otherStateLabours: true,
        interiorCoordination: true,
        externalCoordination: true,
        diwaliSiteWork: false,
        technicalIssues: true,
        floorSettingEmergencies: true
      }
    },
    {
      id: 2,
      name: 'Residential Towers',
      client: 'Urban Homes Ltd',
      address: '456 Building St, Delhi',
      status: 'active',
      projectType: 'residential',
      size: '200 sq ft',
      siteEngineer: 'Priya Patel',
      siteEngineerId: 2,
      assignedContractors: [
        { id: 3, name: 'Electrical Experts', status: 'active', workType: 'electrical', contactMethod: 'crm_only' },
        { id: 1, name: 'Raj Construction', status: 'pending', workType: 'civil', contactMethod: 'crm_only' }
      ],
      startDate: '2025-02-01',
      expectedCompletion: '2025-11-15',
      progress: 42,
      currentPhase: 'electrical',
      totalContractors: 2,
      activeContractors: 1,
      pendingTasks: 5,
      criticalIssues: 0,
      engineerMaxSites: 2,
      actualSites: 2,
      location: 'Delhi',
      area: '200 sq ft',
      projectValue: 8750000,
      lastUpdated: '2025-03-20',
      reports: [
        { id: 1, date: '2025-03-20', content: 'Electrical conduit installation is 80% complete', status: 'in-progress' },
        { id: 2, date: '2025-03-18', content: 'Plumbing work completed', status: 'completed' }
      ],
      upcomingTasks: [
        { id: 1, task: 'Plastering work', dueDate: '2025-03-26', priority: 'high' },
        { id: 2, task: 'Flooring installation', dueDate: '2025-04-02', priority: 'medium' }
      ],
      siteIssues: [
        {
          id: 1,
          type: 'code_violation',
          priority: 'high',
          reportedBy: 'Suresh Reddy',
          reportedDate: '2025-03-17',
          description: 'Outlet spacing does not comply with electrical code requirements.',
          status: 'open',
          assignedTo: 'Priya Patel',
          dueDate: '2025-03-24',
          resolutionNotes: 'Updating layout to comply with code',
          category: 'electrical',
          relatedTo: 'outlet_spacing',
          measurements: {
            expected: '6m max between outlets',
            actual: '8m between some outlets',
            unit: 'meters'
          }
        }
      ],
      communicationRestrictions: {
        directContact: false,
        contactMethod: 'engineer_only',
        authorizedContacts: ['site_engineer', 'project_manager', 'electrical_engineer'],
        contactHistory: [
          { date: '2025-03-19', contactType: 'secure_call', with: 'Suresh Reddy', purpose: 'Electrical inspection' },
          { date: '2025-03-17', contactType: 'secure_message', with: 'Priya Patel', purpose: 'Outlet spacing issue' }
        ]
      },
      phases: [
        { id: 1, name: 'Pre-construction', status: 'completed', startDate: '2025-02-01', endDate: '2025-02-15', progress: 100 },
        { id: 2, name: 'Foundation', status: 'completed', startDate: '2025-02-16', endDate: '2025-03-15', progress: 100 },
        { id: 3, name: 'Framing', status: 'completed', startDate: '2025-03-16', endDate: '2025-04-30', progress: 100 },
        { id: 4, name: 'Electrical', status: 'in_progress', startDate: '2025-05-01', endDate: '2025-06-15', progress: 42 },
        { id: 5, name: 'Plumbing', status: 'pending', startDate: '2025-06-16', endDate: '2025-07-31', progress: 0 },
        { id: 6, name: 'Finishing', status: 'pending', startDate: '2025-08-01', endDate: '2025-10-15', progress: 0 },
        { id: 7, name: 'Final Inspection', status: 'pending', startDate: '2025-10-16', endDate: '2025-11-15', progress: 0 }
      ],
      milestones: [
        { id: 1, name: 'Site Preparation', date: '2025-02-15', status: 'completed', amount: 400000 },
        { id: 2, name: 'Foundation Complete', date: '2025-03-15', status: 'completed', amount: 1000000 },
        { id: 3, name: 'Framing Complete', date: '2025-04-30', status: 'completed', amount: 900000 },
        { id: 4, name: 'Electrical Rough-in 50%', date: '2025-05-30', status: 'in_progress', amount: 600000 },
        { id: 5, name: 'Electrical Rough-in Complete', date: '2025-06-15', status: 'pending', amount: 600000 },
        { id: 6, name: 'Plumbing Rough-in', date: '2025-07-15', status: 'pending', amount: 500000 },
        { id: 7, name: 'Interior Finishing', date: '2025-09-30', status: 'pending', amount: 1200000 },
        { id: 8, name: 'Final Inspection', date: '2025-11-15', status: 'pending', amount: 200000 }
      ],
      budget: {
        total: 8750000,
        spent: 3650000,
        remaining: 5100000,
        perSqFt: 250,
        breakdown: {
          foundation: { allocated: 1800000, spent: 1800000, remaining: 0 },
          framing: { allocated: 2000000, spent: 2000000, remaining: 0 },
          electrical: { allocated: 1500000, spent: 750000, remaining: 750000 },
          plumbing: { allocated: 1200000, spent: 0, remaining: 1200000 },
          finishing: { allocated: 2000000, spent: 0, remaining: 2000000 },
          inspection: { allocated: 250000, spent: 0, remaining: 250000 }
        }
      },
      timeline: {
        startDate: '2025-02-01',
        endDate: '2025-11-15',
        currentDay: 49,
        totalDays: 287,
        daysBehind: 0,
        daysAhead: 0,
        completionPercentage: 17.1
      },
      team: {
        architect: 'Rajesh Designer',
        structuralEngineer: 'Anil Kumar',
        electricalEngineer: 'Suresh Reddy',
        plumbingEngineer: 'Priya Patel',
        projectManager: 'Manager Patel',
        siteEngineer: 'Priya Patel',
        qualityEngineer: 'Quality Inspector',
        billingEngineer: 'Billing Team'
      },
      clientRequirements: {
        rooms: 8,
        entries: 1,
        bathrooms: 6,
        audioVideoRooms: 0,
        barRooms: 0,
        parkingSpaces: 15,
        drawingRooms: 1,
        kitchens: 2,
        customDemands: ['garden area', 'open floor plan'],
        preferences: ['family friendly', 'spacious design'],
        familyMembers: ['Mr. Sharma', 'Mrs. Sharma', 'Children'],
        visitDates: ['2025-01-20', '2025-02-15', '2025-03-10'],
        approvalDates: ['2025-01-22', '2025-02-18', '2025-03-12']
      },
      contractorIssues: [
        {
          id: 1,
          contractor: 'Electrical Experts',
          issueType: 'code_violation',
          description: 'Outlet spacing does not comply with electrical code requirements',
          status: 'open',
          reportedDate: '2025-03-17',
          resolvedDate: null,
          resolutionNotes: 'Updating layout to comply with code',
          category: 'electrical',
          relatedTo: 'outlet_spacing',
          measurements: {
            expected: '6m max between outlets',
            actual: '8m between some outlets',
            unit: 'meters'
          }
        }
      ],
      paymentIssues: [],
      hiringIssues: [],
      managementIssues: [],
      siteVisits: [
        {
          id: 1,
          date: '2025-03-15',
          visitor: 'Client Representative',
          purpose: 'Electrical work inspection',
          outcome: 'Approved with recommendations',
          notes: 'Outlet spacing needs to be within 6m as per electrical code',
          attachments: ['electrical-inspection-report.pdf'],
          followUpRequired: true,
          followUpDate: '2025-03-20',
          followUpNotes: 'Adjust outlet spacing per code requirements'
        }
      ],
      fieldGrowth: {
        labourCount: 32,
        skilledLabour: 12,
        unskilledLabour: 20,
        supervisorCount: 2,
        contractorCount: 2,
        engineerCount: 1,
        growthRate: 8,
        retentionRate: 92,
        productivity: 85,
        safetyScore: 96
      },
      timeManagement: {
        regularHours: 10,
        overtimeHours: 1,
        sundayWork: false,
        holidayWork: false,
        amavasWork: false,
        workSchedule: 'standard',
        shiftManagement: 'fixed',
        leaveCalendar: 'tracked',
        attendance: 'monitored'
      },
      technicalWork: {
        designSync: true,
        drawingIssues: 1,
        drawingChanges: 0,
        contractorIssues: 1,
        paymentIssues: 0,
        hiringIssues: 0,
        managementIssues: 0,
        siteVisitSync: true,
        realTimeReports: true,
        stageWorkTracking: true
      },
      communication: {
        phoneNumberVisibility: true,
        realTimeUpdates: true,
        fieldTravel: true,
        employeeDiscussions: true,
        otherStateLabours: true,
        interiorCoordination: true,
        externalCoordination: true,
        diwaliSiteWork: false,
        technicalIssues: true,
        floorSettingEmergencies: false
      }
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    client: '',
    address: '',
    projectType: 'residential',
    size: '',
    siteEngineerId: '',
    area: '',
    projectValue: ''
  });

  const statusColors: { [key: string]: string } = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    suspended: 'bg-red-100 text-red-800',
    planning: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-blue-100 text-blue-800'
  };

  const phaseColors: { [key: string]: string } = {
    pre_construction: 'bg-gray-100 text-gray-800',
    foundation: 'bg-blue-100 text-blue-800',
    framing: 'bg-yellow-100 text-yellow-800',
    electrical: 'bg-purple-100 text-purple-800',
    plumbing: 'bg-green-100 text-green-800',
    finishing: 'bg-pink-100 text-pink-800',
    final_inspection: 'bg-indigo-100 text-indigo-800',
    completed: 'bg-green-100 text-green-800',
    in_progress: 'bg-blue-100 text-blue-800',
    pending: 'bg-yellow-100 text-yellow-800'
  };

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
    urgent: 'bg-rose-100 text-rose-800'
  };

  const issueTypeColors: { [key: string]: string } = {
    spacing: 'bg-purple-100 text-purple-800',
    dimension: 'bg-blue-100 text-blue-800',
    code_violation: 'bg-red-100 text-red-800',
    conflict: 'bg-yellow-100 text-yellow-800',
    clarity: 'bg-indigo-100 text-indigo-800',
    quality: 'bg-orange-100 text-orange-800',
    structural: 'bg-cyan-100 text-cyan-800',
    electrical: 'bg-violet-100 text-violet-800',
    plumbing: 'bg-teal-100 text-teal-800',
    masonry: 'bg-amber-100 text-amber-800'
  };

  const reviewerStatusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    not_required: 'bg-gray-100 text-gray-800'
  };

  const contactMethodColors = {
    crm_only: 'bg-blue-100 text-blue-800',
    engineer_only: 'bg-green-100 text-green-800',
    restricted: 'bg-red-100 text-red-800',
    direct: 'bg-purple-100 text-purple-800'
  };

  const securityLevelColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || project.status === filter;
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.siteEngineer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          project.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAddProject = () => {
    if (!newProject.name || !newProject.client || !newProject.address) return;

    const projectObj = {
      id: projects.length + 1,
      ...newProject,
      status: 'planning',
      assignedContractors: [],
      startDate: new Date().toISOString().split('T')[0],
      expectedCompletion: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year from now
      progress: 0,
      currentPhase: 'pre_construction',
      totalContractors: 0,
      activeContractors: 0,
      pendingTasks: 0,
      criticalIssues: 0,
      engineerMaxSites: 2,
      actualSites: 1,
      location: newProject.address.split(',')[0],
      area: newProject.area || '250 sq ft',
      projectValue: parseInt(newProject.projectValue) || 0,
      lastUpdated: new Date().toISOString().split('T')[0],
      reports: [],
      upcomingTasks: [],
      siteIssues: [],
      communicationRestrictions: {
        directContact: false,
        contactMethod: 'crm_only',
        authorizedContacts: ['site_engineer', 'project_manager'],
        contactHistory: []
      },
      phases: [
        { id: 1, name: 'Pre-construction', status: 'pending', startDate: new Date().toISOString().split('T')[0], endDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], progress: 0 },
        { id: 2, name: 'Foundation', status: 'pending', startDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], progress: 0 },
        { id: 3, name: 'Framing', status: 'pending', startDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], endDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], progress: 0 },
        { id: 4, name: 'Electrical', status: 'pending', startDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], progress: 0 },
        { id: 5, name: 'Plumbing', status: 'pending', startDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], endDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], progress: 0 },
        { id: 6, name: 'Finishing', status: 'pending', startDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], endDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], progress: 0 },
        { id: 7, name: 'Final Inspection', status: 'pending', startDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], endDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], progress: 0 }
      ],
      milestones: [
        { id: 1, name: 'Site Preparation', date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], status: 'pending', amount: 0 },
        { id: 2, name: 'Foundation Complete', date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], status: 'pending', amount: 0 },
        { id: 3, name: 'Framing Complete', date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], status: 'pending', amount: 0 },
        { id: 4, name: 'Electrical Rough-in', date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], status: 'pending', amount: 0 },
        { id: 5, name: 'Plumbing Rough-in', date: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], status: 'pending', amount: 0 },
        { id: 6, name: 'Interior Finishing', date: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], status: 'pending', amount: 0 },
        { id: 7, name: 'Final Inspection', date: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], status: 'pending', amount: 0 }
      ],
      budget: {
        total: parseInt(newProject.projectValue) || 0,
        spent: 0,
        remaining: parseInt(newProject.projectValue) || 0,
        perSqFt: 250,
        breakdown: {
          foundation: { allocated: 0, spent: 0, remaining: 0 },
          framing: { allocated: 0, spent: 0, remaining: 0 },
          electrical: { allocated: 0, spent: 0, remaining: 0 },
          plumbing: { allocated: 0, spent: 0, remaining: 0 },
          finishing: { allocated: 0, spent: 0, remaining: 0 },
          inspection: { allocated: 0, spent: 0, remaining: 0 },
          contingency: { allocated: 0, spent: 0, remaining: 0 }
        }
      },
      timeline: {
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year from now
        currentDay: 0,
        totalDays: 365,
        daysBehind: 0,
        daysAhead: 0,
        completionPercentage: 0
      },
      team: {
        architect: '',
        structuralEngineer: '',
        electricalEngineer: '',
        plumbingEngineer: '',
        projectManager: '',
        siteEngineer: newProject.siteEngineerId ? projects.find(p => p.siteEngineerId === parseInt(newProject.siteEngineerId))?.siteEngineer : '',
        qualityEngineer: '',
        billingEngineer: ''
      },
      clientRequirements: {
        rooms: 0,
        entries: 0,
        bathrooms: 0,
        audioVideoRooms: 0,
        barRooms: 0,
        parkingSpaces: 0,
        drawingRooms: 0,
        kitchens: 0,
        customDemands: [],
        preferences: [],
        familyMembers: [],
        visitDates: [],
        approvalDates: []
      },
      contractorIssues: [],
      paymentIssues: [],
      hiringIssues: [],
      managementIssues: [],
      siteVisits: [],
      fieldGrowth: {
        labourCount: 0,
        skilledLabour: 0,
        unskilledLabour: 0,
        supervisorCount: 0,
        contractorCount: 0,
        engineerCount: 0,
        growthRate: 0,
        retentionRate: 0,
        productivity: 0,
        safetyScore: 0
      },
      timeManagement: {
        regularHours: 10,
        overtimeHours: 0,
        sundayWork: false,
        holidayWork: false,
        amavasWork: false,
        workSchedule: 'standard',
        shiftManagement: 'fixed',
        leaveCalendar: 'tracked',
        attendance: 'monitored'
      },
      technicalWork: {
        designSync: true,
        drawingIssues: 0,
        drawingChanges: 0,
        contractorIssues: 0,
        paymentIssues: 0,
        hiringIssues: 0,
        managementIssues: 0,
        siteVisitSync: true,
        realTimeReports: true,
        stageWorkTracking: true
      },
      communication: {
        phoneNumberVisibility: true,
        realTimeUpdates: true,
        fieldTravel: true,
        employeeDiscussions: true,
        otherStateLabours: true,
        interiorCoordination: true,
        externalCoordination: true,
        diwaliSiteWork: false,
        technicalIssues: true,
        floorSettingEmergencies: false
      }
    };

    setProjects([projectObj as any, ...projects]);
    setNewProject({
      name: '',
      client: '',
      address: '',
      projectType: 'residential',
      size: '',
      siteEngineerId: '',
      area: '',
      projectValue: ''
    });
    setShowAddForm(false);
  };

  // Check if any engineer is overloaded
  const overloadedEngineers = projects.filter(project => 
    projects.filter(p => p.siteEngineerId === project.siteEngineerId).length > project.engineerMaxSites
  );

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Project Management System</h1>
          <p className="text-gray-600 mt-2">
            Manage projects, coordinate with contractors, and prevent unauthorized number exchanges
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Project
          </Button>
          <Button variant="outline">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Alerts
          </Button>
        </div>
      </div>

      {/* Overloaded Engineers Warning */}
      {overloadedEngineers.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-red-600" />
            <h3 className="font-medium text-red-800">Overloaded Engineers</h3>
          </div>
          <p className="text-sm text-red-700 mt-1">
            The following engineers are managing more projects than their limit:
            {overloadedEngineers.map(eng => ` ${eng.siteEngineer} (${projects.filter(p => p.siteEngineerId === eng.siteEngineerId).length}/${eng.engineerMaxSites})`).join(', ')}
          </p>
          <p className="text-xs text-red-600 mt-1">
            Assign additional engineers to balance the workload
          </p>
        </div>
      )}

      {/* Add Project Form */}
      {showAddForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New Project</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Project Name</label>
                <Input
                  value={newProject.name}
                  onChange={(e) => setNewProject({...newProject, name: e.target.value})}
                  placeholder="Project Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Client</label>
                <Input
                  value={newProject.client}
                  onChange={(e) => setNewProject({...newProject, client: e.target.value})}
                  placeholder="Client Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <Input
                  value={newProject.address}
                  onChange={(e) => setNewProject({...newProject, address: e.target.value})}
                  placeholder="Full Address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Project Type</label>
                <select 
                  value={newProject.projectType} 
                  onChange={(e) => setNewProject({...newProject, projectType: e.target.value})}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="infrastructure">Infrastructure</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Site Engineer</label>
                <select 
                  value={newProject.siteEngineerId} 
                  onChange={(e) => setNewProject({...newProject, siteEngineerId: e.target.value})}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="">Select Engineer</option>
                  {projects.map(proj => (
                    <option key={proj.id} value={proj.siteEngineerId}>
                      {proj.siteEngineer} - {proj.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Size (sq ft)</label>
                <Input
                  value={newProject.size}
                  onChange={(e) => setNewProject({...newProject, size: e.target.value})}
                  placeholder="Size in sq ft"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Area</label>
                <Input
                  value={newProject.area}
                  onChange={(e) => setNewProject({...newProject, area: e.target.value})}
                  placeholder="Area details"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Project Value (₹)</label>
                <Input
                  type="number"
                  value={newProject.projectValue}
                  onChange={(e) => setNewProject({...newProject, projectValue: e.target.value})}
                  placeholder="Project Value in Rupees"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleAddProject}>
                <Plus className="mr-2 h-4 w-4" />
                Add Project
              </Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filter */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search by project, client, engineer, or address..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="border rounded-md px-3 py-2"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="planning">Planning</option>
                <option value="completed">Completed</option>
                <option value="suspended">Suspended</option>
              </select>
              <Button variant="outline">
                <AlertTriangle className="h-4 w-4" />
                Alerts
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                Projects ({filteredProjects.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredProjects.map((project) => {
                  const engineer = projects.find(p => p.siteEngineerId === project.siteEngineerId);
                  const isOverloaded = engineer && projects.filter(p => p.siteEngineerId === engineer.siteEngineerId).length > engineer.engineerMaxSites;
                  
                  return (
                    <div 
                      key={project.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedProject?.id === project.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:bg-gray-50'
                      } ${isOverloaded ? 'border-red-300 bg-red-50' : ''}`}
                      onClick={() => setSelectedProject(project)}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{project.name}</h3>
                        <div className="flex gap-2">
                          <Badge className={statusColors[project.status]}>
                            {project.status}
                          </Badge>
                          <Badge variant="outline">
                            {project.progress}%
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{project.client}</p>
                      <div className="flex items-center text-xs text-gray-500 mt-2">
                        <MapPin className="mr-1 h-3 w-3" />
                        {project.address}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Users className="mr-1 h-3 w-3" />
                        {project.siteEngineer} ({project.assignedContractors.length} contractors)
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Square className="mr-1 h-3 w-3" />
                        {project.area}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <DollarSign className="mr-1 h-3 w-3" />
                        ₹{project.projectValue?.toLocaleString()}
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress: {project.progress}%</span>
                          <span>{project.currentPhase.replace('_', ' ')}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      {project.criticalIssues > 0 && (
                        <div className="flex items-center text-xs text-red-600 mt-2">
                          <AlertTriangle className="mr-1 h-3 w-3" />
                          {project.criticalIssues} critical issue{project.criticalIssues > 1 ? 's' : ''}
                        </div>
                      )}
                      {isOverloaded && (
                        <div className="flex items-center text-xs text-red-600 mt-1">
                          <AlertTriangle className="mr-1 h-3 w-3" />
                          Engineer overloaded
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Project Details */}
        <div className="lg:col-span-2">
          {selectedProject && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center">
                        <Building className="mr-2 h-5 w-5" />
                        {selectedProject.name}
                      </CardTitle>
                      <p className="text-gray-600 mt-1">{selectedProject.client} • {selectedProject.area}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={statusColors[selectedProject.status]}>
                        {selectedProject.status}
                      </Badge>
                      <Badge className={phaseColors[selectedProject.currentPhase]}>
                        {selectedProject.currentPhase.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-medium mb-3">Project Information</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Client:</span>
                          <span>{selectedProject.client}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Address:</span>
                          <span>{selectedProject.address}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Project Type:</span>
                          <span>{selectedProject.projectType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Size:</span>
                          <span>{selectedProject.size} sq ft</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Area:</span>
                          <span>{selectedProject.area}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Project Value:</span>
                          <span>₹{selectedProject.projectValue?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Start Date:</span>
                          <span>{selectedProject.startDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Expected Completion:</span>
                          <span>{selectedProject.expectedCompletion}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Progress:</span>
                          <span>{selectedProject.progress}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Current Phase:</span>
                          <Badge className={phaseColors[selectedProject.currentPhase]}>
                            {selectedProject.currentPhase.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Team Information</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Site Engineer:</span>
                          <span>{selectedProject.siteEngineer}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Architect:</span>
                          <span>{selectedProject.team.architect || 'Not assigned'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Structural Engineer:</span>
                          <span>{selectedProject.team.structuralEngineer || 'Not assigned'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Electrical Engineer:</span>
                          <span>{selectedProject.team.electricalEngineer || 'Not assigned'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Plumbing Engineer:</span>
                          <span>{selectedProject.team.plumbingEngineer || 'Not assigned'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Project Manager:</span>
                          <span>{selectedProject.team.projectManager || 'Not assigned'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Quality Engineer:</span>
                          <span>{selectedProject.team.qualityEngineer || 'Not assigned'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Billing Engineer:</span>
                          <span>{selectedProject.team.billingEngineer || 'Not assigned'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Contractors:</span>
                          <span>{selectedProject.totalContractors}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Active Contractors:</span>
                          <span>{selectedProject.activeContractors}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Restrictions Notice */}
                  <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <div className="flex items-start">
                      <Shield className="mr-2 h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800">Contact Restrictions</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          <span className="font-medium">Direct Contact:</span> {selectedProject.communicationRestrictions.directContact ? 'Allowed' : 'Restricted'}
                          </p>
                        <p className="text-sm text-blue-700">
                          <span className="font-medium">Contact Method:</span> {selectedProject.communicationRestrictions.contactMethod.replace('_', ' ')}
                        </p>
                        <p className="text-sm text-blue-700">
                          <span className="font-medium">Authorized Contacts:</span> {selectedProject.communicationRestrictions.authorizedContacts.join(', ')}
                        </p>
                        {selectedProject.communicationRestrictions.contactHistory.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm text-blue-700 font-medium">Contact History:</p>
                            <ul className="text-xs text-blue-700 mt-1">
                              {selectedProject.communicationRestrictions.contactHistory.map((contact, idx) => (
                                <li key={idx} className="ml-2">
                                  {contact.date}: {contact.contactType} with {contact.with} - {contact.purpose}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <p className="text-sm text-blue-700 mt-2">
                          <AlertTriangle className="inline mr-1 h-4 w-4" />
                          All communication must go through CRM system to prevent unauthorized contact exchanges.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Phases Progress */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Project Phases</h4>
                    <div className="space-y-3">
                      {selectedProject.phases.map((phase) => (
                        <div key={phase.id} className="flex items-center p-2 border rounded">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <span className="text-sm font-medium">{phase.id}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div className="font-medium">{phase.name}</div>
                              <Badge className={phaseColors[phase.status]}>
                                {phase.status.replace('_', ' ')}
                              </Badge>
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                              {phase.startDate} to {phase.endDate}
                            </div>
                            <div className="mt-2">
                              <div className="flex justify-between text-xs mb-1">
                                <span>Progress: {phase.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${phase.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Milestones */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Milestones</h4>
                    <div className="space-y-3">
                      {selectedProject.milestones.map((milestone) => (
                        <div key={milestone.id} className="flex justify-between items-center p-2 border rounded">
                          <div>
                            <div className="font-medium">{milestone.name}</div>
                            <div className="text-xs text-gray-600 mt-1">Due: {milestone.date}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={statusColors[milestone.status]}>
                              {milestone.status.replace('_', ' ')}
                            </Badge>
                            <span className="text-sm font-medium">₹{milestone.amount?.toLocaleString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Budget */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Budget Overview</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-lg font-bold">₹{selectedProject.budget.total?.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">Total Budget</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-lg font-bold">₹{selectedProject.budget.spent?.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">Spent</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-lg font-bold">₹{selectedProject.budget.remaining?.toLocaleString()}</div>
                        <div className="text-xs text-gray-600">Remaining</div>
                      </div>
                    </div>
                    <div className="border rounded-lg p-3">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Per Sq Ft:</span>
                        <span>₹{selectedProject.budget.perSqFt?.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Completion:</span>
                        <span>{Math.round((selectedProject.budget.spent / selectedProject.budget.total) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${(selectedProject.budget.spent / selectedProject.budget.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Project Timeline</h4>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-lg font-bold">{selectedProject.timeline.currentDay}</div>
                        <div className="text-xs text-gray-600">Current Day</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-lg font-bold">{selectedProject.timeline.totalDays}</div>
                        <div className="text-xs text-gray-600">Total Days</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-lg font-bold">{selectedProject.timeline.daysBehind}</div>
                        <div className="text-xs text-gray-600">Days Behind</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-lg font-bold">{selectedProject.timeline.daysAhead}</div>
                        <div className="text-xs text-gray-600">Days Ahead</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-lg font-bold">{selectedProject.timeline.completionPercentage}%</div>
                        <div className="text-xs text-gray-600">Completed</div>
                      </div>
                    </div>
                  </div>

                  {/* Client Requirements */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Client Requirements</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-lg font-bold">{selectedProject.clientRequirements.rooms}</div>
                        <div className="text-xs text-gray-600">Rooms</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-lg font-bold">{selectedProject.clientRequirements.bathrooms}</div>
                        <div className="text-xs text-gray-600">Bathrooms</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-lg font-bold">{selectedProject.clientRequirements.parkingSpaces}</div>
                        <div className="text-xs text-gray-600">Parking Spaces</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-lg font-bold">{selectedProject.clientRequirements.kitchens}</div>
                        <div className="text-xs text-gray-600">Kitchens</div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.clientRequirements.customDemands.map((demand, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center">
                            <Star className="mr-1 h-3 w-3" />
                            {demand}
                          </Badge>
                        ))}
                        {selectedProject.clientRequirements.preferences.map((pref, index) => (
                          <Badge key={index} variant="outline" className="flex items-center">
                            <Heart className="mr-1 h-3 w-3" />
                            {pref}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Issues Tracking */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">Issues Tracking</h4>
                      <Button variant="outline" size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Report Issue
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-3">
                        <h5 className="font-medium mb-2 flex items-center">
                          <AlertTriangle className="mr-2 h-4 w-4 text-red-500" />
                          Contractor Issues ({selectedProject.contractorIssues.length})
                        </h5>
                        <div className="space-y-2">
                          {selectedProject.contractorIssues.map((issue) => (
                            <div key={issue.id} className="border-l-2 border-red-200 pl-2 py-1">
                              <div className="flex justify-between">
                                <span className="text-sm">{issue.contractor}</span>
                                <Badge className={`${issueTypeColors[issue.issueType]} text-xs`}>
                                  {issue.issueType.replace('_', ' ')}
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-600 mt-1">{issue.description}</p>
                              <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>{issue.reportedDate}</span>
                                <Badge className={`${statusColors[issue.status]} text-xs`}>
                                  {issue.status}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="border rounded-lg p-3">
                        <h5 className="font-medium mb-2 flex items-center">
                          <DollarSign className="mr-2 h-4 w-4 text-yellow-500" />
                          Payment Issues ({selectedProject.paymentIssues.length})
                        </h5>
                        <div className="space-y-2">
                          {selectedProject.paymentIssues.map((issue) => (
                            <div key={issue.id} className="border-l-2 border-yellow-200 pl-2 py-1">
                              <div className="flex justify-between">
                                <span className="text-sm">{issue.contractor}</span>
                                <Badge className={`${issueTypeColors[issue.issueType]} text-xs`}>
                                  {issue.issueType.replace('_', ' ')}
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-600 mt-1">{issue.description}</p>
                              <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>₹{issue.amount?.toLocaleString()}</span>
                                <Badge className={`${statusColors[issue.status]} text-xs`}>
                                  {issue.status}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="border rounded-lg p-3">
                        <h5 className="font-medium mb-2 flex items-center">
                          <Users className="mr-2 h-4 w-4 text-blue-500" />
                          Hiring Issues ({selectedProject.hiringIssues.length})
                        </h5>
                        <div className="space-y-2">
                          {selectedProject.hiringIssues.map((issue) => (
                            <div key={issue.id} className="border-l-2 border-blue-200 pl-2 py-1">
                              <div className="flex justify-between">
                                <span className="text-sm capitalize">{issue.issueType.replace('_', ' ')}</span>
                                <Badge className={`${issueTypeColors[issue.relatedTo]} text-xs`}>
                                  {issue.relatedTo.replace('_', ' ')}
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-600 mt-1">{issue.description}</p>
                              <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>{issue.reportedDate}</span>
                                <Badge className={`${statusColors[issue.status]} text-xs`}>
                                  {issue.status}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="border rounded-lg p-3">
                        <h5 className="font-medium mb-2 flex items-center">
                          <HardHat className="mr-2 h-4 w-4 text-purple-500" />
                          Management Issues ({selectedProject.managementIssues.length})
                        </h5>
                        <div className="space-y-2">
                          {selectedProject.managementIssues.map((issue) => (
                            <div key={issue.id} className="border-l-2 border-purple-200 pl-2 py-1">
                              <div className="flex justify-between">
                                <span className="text-sm capitalize">{issue.issueType.replace('_', ' ')}</span>
                                <Badge className={`${issueTypeColors[issue.relatedTo]} text-xs`}>
                                  {issue.relatedTo.replace('_', ' ')}
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-600 mt-1">{issue.description}</p>
                              <div className="flex justify-between text-xs text-gray-500 mt-1">
                                <span>{issue.reportedDate}</span>
                                <Badge className={`${statusColors[issue.status]} text-xs`}>
                                  {issue.status}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Site Visits */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">Site Visits ({selectedProject.siteVisits.length})</h4>
                      <Button variant="outline" size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Schedule Visit
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {selectedProject.siteVisits.map((visit) => (
                        <div key={visit.id} className="border rounded-lg p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">{visit.purpose}</div>
                              <div className="text-sm text-gray-600 mt-1">{visit.visitor} • {visit.date}</div>
                              <div className="text-sm text-gray-600 mt-1">{visit.outcome}</div>
                              <p className="text-sm text-gray-700 mt-2">{visit.notes}</p>
                            </div>
                            <Badge className={visit.followUpRequired ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}>
                              {visit.followUpRequired ? 'Follow-up Required' : 'Completed'}
                            </Badge>
                          </div>
                          {visit.attachments.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {visit.attachments.map((attachment, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  <FileText className="mr-1 h-3 w-3" />
                                  {attachment}
                                </Badge>
                              ))}
                            </div>
                          )}
                          {visit.followUpRequired && (
                            <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded">
                              <div className="flex justify-between text-sm">
                                <span className="font-medium">Follow-up:</span>
                                <span>{visit.followUpDate}</span>
                              </div>
                              <p className="text-sm text-gray-700 mt-1">{visit.followUpNotes}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Field Growth */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Field Growth Metrics</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-lg font-bold">{selectedProject.fieldGrowth.labourCount}</div>
                        <div className="text-xs text-gray-600">Total Labour</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-lg font-bold">{selectedProject.fieldGrowth.skilledLabour}</div>
                        <div className="text-xs text-gray-600">Skilled Labour</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-lg font-bold">{selectedProject.fieldGrowth.unskilledLabour}</div>
                        <div className="text-xs text-gray-600">Unskilled Labour</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-lg font-bold">{selectedProject.fieldGrowth.supervisorCount}</div>
                        <div className="text-xs text-gray-600">Supervisors</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-lg font-bold">{selectedProject.fieldGrowth.contractorCount}</div>
                        <div className="text-xs text-gray-600">Contractors</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-lg font-bold">{selectedProject.fieldGrowth.growthRate}%</div>
                        <div className="text-xs text-gray-600">Growth Rate</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-lg font-bold">{selectedProject.fieldGrowth.retentionRate}%</div>
                        <div className="text-xs text-gray-600">Retention Rate</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-lg font-bold">{selectedProject.fieldGrowth.productivity}%</div>
                        <div className="text-xs text-gray-600">Productivity</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-lg font-bold">{selectedProject.fieldGrowth.safetyScore}</div>
                        <div className="text-xs text-gray-600">Safety Score</div>
                      </div>
                    </div>
                  </div>

                  {/* Time Management */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Time Management</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-lg font-bold">{selectedProject.timeManagement.regularHours} hrs</div>
                        <div className="text-xs text-gray-600">Regular Hours</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-lg font-bold">{selectedProject.timeManagement.overtimeHours} hrs</div>
                        <div className="text-xs text-gray-600">Overtime Hours</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <Badge className={selectedProject.timeManagement.sundayWork ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {selectedProject.timeManagement.sundayWork ? 'Yes' : 'No'}
                        </Badge>
                        <div className="text-xs text-gray-600 mt-1">Sunday Work</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <Badge className={selectedProject.timeManagement.holidayWork ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {selectedProject.timeManagement.holidayWork ? 'Yes' : 'No'}
                        </Badge>
                        <div className="text-xs text-gray-600 mt-1">Holiday Work</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                      <div className="border rounded-lg p-3 text-center">
                        <Badge className={selectedProject.timeManagement.amavasWork ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {selectedProject.timeManagement.amavasWork ? 'Yes' : 'No'}
                        </Badge>
                        <div className="text-xs text-gray-600 mt-1">Amavas Work</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-sm font-medium">{selectedProject.timeManagement.workSchedule.replace('_', ' ')}</div>
                        <div className="text-xs text-gray-600 mt-1">Work Schedule</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-sm font-medium">{selectedProject.timeManagement.shiftManagement.replace('_', ' ')}</div>
                        <div className="text-xs text-gray-600 mt-1">Shift Management</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-sm font-medium">{selectedProject.timeManagement.leaveCalendar.replace('_', ' ')}</div>
                        <div className="text-xs text-gray-600 mt-1">Leave Calendar</div>
                      </div>
                    </div>
                  </div>

                  {/* Technical Work */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Technical Work Coordination</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="border rounded-lg p-3 text-center">
                        <Badge className={selectedProject.technicalWork.designSync ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {selectedProject.technicalWork.designSync ? 'Synced' : 'Not Synced'}
                        </Badge>
                        <div className="text-xs text-gray-600 mt-1">Design Sync</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-lg font-bold">{selectedProject.technicalWork.drawingIssues}</div>
                        <div className="text-xs text-gray-600">Drawing Issues</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-lg font-bold">{selectedProject.technicalWork.drawingChanges}</div>
                        <div className="text-xs text-gray-600">Drawing Changes</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-lg font-bold">{selectedProject.technicalWork.contractorIssues}</div>
                        <div className="text-xs text-gray-600">Contractor Issues</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-lg font-bold">{selectedProject.technicalWork.paymentIssues}</div>
                        <div className="text-xs text-gray-600">Payment Issues</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-lg font-bold">{selectedProject.technicalWork.hiringIssues}</div>
                        <div className="text-xs text-gray-600">Hiring Issues</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-lg font-bold">{selectedProject.technicalWork.managementIssues}</div>
                        <div className="text-xs text-gray-600">Management Issues</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <Badge className={selectedProject.technicalWork.siteVisitSync ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {selectedProject.technicalWork.siteVisitSync ? 'Synced' : 'Not Synced'}
                        </Badge>
                        <div className="text-xs text-gray-600 mt-1">Site Visit Sync</div>
                      </div>
                    </div>
                  </div>

                  {/* Communication */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Communication Features</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="border rounded-lg p-3 text-center">
                        <Badge className={selectedProject.communication.phoneNumberVisibility ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {selectedProject.communication.phoneNumberVisibility ? 'Visible' : 'Hidden'}
                        </Badge>
                        <div className="text-xs text-gray-600 mt-1">Phone Numbers</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <Badge className={selectedProject.communication.realTimeUpdates ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {selectedProject.communication.realTimeUpdates ? 'Enabled' : 'Disabled'}
                        </Badge>
                        <div className="text-xs text-gray-600 mt-1">Real-time Updates</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <Badge className={selectedProject.communication.fieldTravel ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {selectedProject.communication.fieldTravel ? 'Enabled' : 'Disabled'}
                        </Badge>
                        <div className="text-xs text-gray-600 mt-1">Field Travel</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <Badge className={selectedProject.communication.employeeDiscussions ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {selectedProject.communication.employeeDiscussions ? 'Enabled' : 'Disabled'}
                        </Badge>
                        <div className="text-xs text-gray-600 mt-1">Employee Discussions</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                      <div className="border rounded-lg p-3 text-center">
                        <Badge className={selectedProject.communication.otherStateLabours ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {selectedProject.communication.otherStateLabours ? 'Enabled' : 'Disabled'}
                        </Badge>
                        <div className="text-xs text-gray-600 mt-1">Other State Labours</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <Badge className={selectedProject.communication.interiorCoordination ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {selectedProject.communication.interiorCoordination ? 'Enabled' : 'Disabled'}
                        </Badge>
                        <div className="text-xs text-gray-600 mt-1">Interior Coordination</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <Badge className={selectedProject.communication.externalCoordination ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {selectedProject.communication.externalCoordination ? 'Enabled' : 'Disabled'}
                        </Badge>
                        <div className="text-xs text-gray-600 mt-1">External Coordination</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <Badge className={selectedProject.communication.diwaliSiteWork ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {selectedProject.communication.diwaliSiteWork ? 'Enabled' : 'Disabled'}
                        </Badge>
                        <div className="text-xs text-gray-600 mt-1">Diwali Site Work</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 flex-wrap">
                    <Button variant="outline">
                      <Phone className="mr-2 h-4 w-4" />
                      Secure Call
                    </Button>
                    <Button variant="outline">
                      <Mail className="mr-2 h-4 w-4" />
                      Secure Message
                    </Button>
                    <Button variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Visit
                    </Button>
                    <Button variant="outline">
                      <HardHat className="mr-2 h-4 w-4" />
                      Site Report
                    </Button>
                    <Button variant="outline">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Update Progress
                    </Button>
                    <Button variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      View Drawings
                    </Button>
                    <Button variant="outline">
                      <Users className="mr-2 h-4 w-4" />
                      Assign Project
                    </Button>
                    <Button variant="outline">
                      <DollarSign className="mr-2 h-4 w-4" />
                      Manage Payments
                    </Button>
                  </div>
                  
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-sm text-yellow-800">
                      <AlertTriangle className="inline mr-2 h-4 w-4" />
                      Note: Direct phone number sharing is prohibited. All communication must go through CRM system.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}