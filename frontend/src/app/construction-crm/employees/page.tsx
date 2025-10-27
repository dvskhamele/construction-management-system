// Employee Management Page for Construction CRM
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  Star, 
  AlertTriangle,
  CheckCircle, 
  Clock, 
  Search,
  Plus,
  Send,
  Video,
  FileText,
  Building,
  Wrench,
  HardHat,
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

export default function EmployeeManagementPage() {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: 'Anil Sharma',
      role: 'Site Engineer',
      department: 'Engineering',
      phone: '+91 98765 43210',
      email: 'anil@construction.com',
      address: '123 Engineer Ave, Delhi',
      experience: 8,
      specialization: 'civil',
      rating: 4.5,
      projectsCompleted: 15,
      currentProjects: 2,
      totalAmount: 2500000,
      lastProject: 'Downtown Complex',
      lastProjectDate: '2025-03-15',
      status: 'active',
      licenseNumber: 'LC-2025-001',
      emergencyContact: '+91 98765 43211',
      bankDetails: {
        accountNumber: '1234567890',
        ifsc: 'HDFC0000123',
        bankName: 'HDFC Bank'
      },
      insuranceInfo: { policyNumber: 'POL-12345', expiryDate: '2026-03-15' },
      taxInfo: { gstin: '12ABCDE1234F1Z5' },
      availability: 'available',
      skills: ['civil', 'structural', 'quality_control'],
      certifications: ['Safety Certified', 'Quality Certified'],
      recruitmentSource: 'indeed',
      applicationDate: '2025-03-10',
      interviewDate: '',
      hiringStatus: 'hired',
      onboardingStatus: 'completed',
      contractSigned: true,
      contractStartDate: '2025-03-15',
      contractEndDate: '2026-03-15',
      probationPeriod: '3 months',
      probationEndDate: '2025-06-15',
      salaryStructure: {
        baseSalary: 75000,
        projectBased: true,
        paymentTerms: 'milestone_based',
        advancePercentage: 25,
        milestonePercentage: 60,
        completionPercentage: 15
      },
      performanceMetrics: {
        qualityScore: 4.2,
        timelinessScore: 4.0,
        budgetCompliance: 4.5,
        safetyRecord: 'excellent',
        lastEvaluation: '2025-03-15'
      },
      projects: [
        { id: 1, name: 'Downtown Complex', duration: '6 months', role: 'civil_contractor', qualityRating: 4.5, issues: 0 },
        { id: 2, name: 'Residential Towers', duration: '8 months', role: 'civil_contractor', qualityRating: 4.0, issues: 2 }
      ],
      references: [
        { id: 1, name: 'Previous Client', company: 'Metro Developments', phone: '+91 98765 43212', email: 'client@metro.com', relationship: 'Previous Client', verified: true },
        { id: 2, name: 'Previous Contractor', company: 'Urban Construction', phone: '+91 98765 43213', email: 'contractor@urban.com', relationship: 'Previous Partner', verified: false }
      ],
      documents: [
        { id: 1, name: 'License Certificate', type: 'license', url: '/documents/license-anil-sharma.pdf', verified: true },
        { id: 2, name: 'Insurance Certificate', type: 'insurance', url: '/documents/insurance-anil-sharma.pdf', verified: true },
        { id: 3, name: 'Tax Registration', type: 'tax', url: '/documents/tax-anil-sharma.pdf', verified: true },
        { id: 4, name: 'Bank Details', type: 'bank', url: '/documents/bank-anil-sharma.pdf', verified: true },
        { id: 5, name: 'Safety Certification', type: 'certification', url: '/documents/safety-cert-anil-sharma.pdf', verified: true }
      ],
      communicationRestrictions: {
        directContact: false,
        contactMethod: 'crm_only',
        authorizedContacts: ['site_engineer', 'project_manager'],
        contactHistory: [
          { date: '2025-03-20', contactType: 'secure_call', with: 'Rajesh Sharma', purpose: 'Foundation work discussion' },
          { date: '2025-03-18', contactType: 'secure_message', with: 'Priya Patel', purpose: 'Drawing clarification' }
        ]
      },
      maxSites: 2,
      actualSites: 2,
      siteAssignments: [
        { id: 1, name: 'Downtown Complex - Site A', status: 'active' },
        { id: 2, name: 'Residential Towers - Site B', status: 'active' }
      ],
      workload: 'balanced',
      workloadStatus: 'optimal',
      leaveHistory: [
        { startDate: '2025-03-01', endDate: '2025-03-05', reason: 'Personal Leave', approvedBy: 'Manager' },
        { startDate: '2025-02-15', endDate: '2025-02-17', reason: 'Sick Leave', approvedBy: 'Manager' }
      ],
      attendance: [
        { date: '2025-03-20', status: 'present', location: 'Site A' },
        { date: '2025-03-19', status: 'present', location: 'Site B' },
        { date: '2025-03-18', status: 'present', location: 'Office' }
      ],
      overtime: [
        { date: '2025-03-20', hours: 2, reason: 'Emergency concreting', approvedBy: 'Manager' },
        { date: '2025-03-19', hours: 3, reason: 'Sunday work', approvedBy: 'Manager' }
      ],
      holidays: [
        { date: '2025-03-25', name: 'Holi', type: 'festival' },
        { date: '2025-03-26', name: 'Holi Holiday', type: 'festival_holiday' },
        { date: '2025-03-27', name: 'Holi Holiday', type: 'festival_holiday' },
        { date: '2025-03-28', name: 'Holi Holiday', type: 'festival_holiday' }
      ],
      workSchedule: {
        regularHours: 10,
        overtimeAllowed: true,
        sundayWork: true,
        holidayWork: true,
        amavasWork: true,
        workLocations: ['Site A', 'Site B'],
        travelRequired: true,
        fieldTravel: true,
        employeesDiscussions: true,
        otherStateLabours: true
      },
      fieldVerification: {
        required: true,
        verifiedBy: 'Site Engineer',
        verificationDate: '2025-03-20',
        status: 'verified'
      },
      technicalSpecs: {
        scale: '1:100',
        units: 'millimeters',
        drawingStandard: 'IS 10752',
        revisionControl: true,
        versionSync: true
      },
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
      comments: [
        {
          id: 1,
          author: 'Anil Kumar',
          role: 'Site Engineer',
          message: 'Spacing still needs adjustment. Maximum should be 6m per code.',
          timestamp: '2025-03-20 10:30',
          attachments: [],
          isSecure: true,
          type: 'technical_feedback'
        },
        {
          id: 2,
          author: 'Rajesh Sharma',
          role: 'Designer',
          message: 'Updated spacing as requested. Please review v2.3.',
          timestamp: '2025-03-20 14:45',
          attachments: ['spacing-adjustments.png'],
          isSecure: true,
          type: 'revision_update'
        }
      ],
      permissions: {
        view: ['architect', 'engineer', 'contractor'],
        edit: ['designer'],
        approve: ['engineer', 'architect'],
        contactRestrictions: {
          contractorToEngineer: false,
          engineerToContractor: true,
          designerToContractor: true,
          allContactThroughCrm: true
        }
      }
    },
    {
      id: 2,
      name: 'Priya Patel',
      role: 'Site Engineer',
      department: 'Engineering',
      phone: '+91 98765 43214',
      email: 'priya@construction.com',
      address: '456 Engineer St, Delhi',
      experience: 6,
      specialization: 'electrical',
      rating: 4.2,
      projectsCompleted: 12,
      currentProjects: 2,
      totalAmount: 1800000,
      lastProject: 'Residential Towers',
      lastProjectDate: '2025-03-10',
      status: 'active',
      licenseNumber: 'LC-2025-002',
      emergencyContact: '+91 98765 43215',
      bankDetails: {
        accountNumber: '0987654321',
        ifsc: 'ICIC0000456',
        bankName: 'ICICI Bank'
      },
      insuranceInfo: { policyNumber: 'POL-54321', expiryDate: '2026-05-20' },
      taxInfo: { gstin: '12ABCDE5678F2Z3' },
      availability: 'busy',
      skills: ['electrical', 'automation', 'lighting'],
      certifications: ['Electrical Inspector'],
      recruitmentSource: 'apna',
      applicationDate: '2025-02-01',
      interviewDate: '',
      hiringStatus: 'hired',
      onboardingStatus: 'completed',
      contractSigned: true,
      contractStartDate: '2025-02-10',
      contractEndDate: '2026-02-10',
      probationPeriod: '3 months',
      probationEndDate: '2025-05-10',
      salaryStructure: {
        baseSalary: 68000,
        projectBased: true,
        paymentTerms: 'milestone_based',
        advancePercentage: 25,
        milestonePercentage: 60,
        completionPercentage: 15
      },
      performanceMetrics: {
        qualityScore: 4.0,
        timelinessScore: 4.2,
        budgetCompliance: 4.3,
        safetyRecord: 'good',
        lastEvaluation: '2025-03-10'
      },
      projects: [
        { id: 3, name: 'Commercial Plaza', duration: '4 months', role: 'electrical_contractor', qualityRating: 4.2, issues: 0 },
        { id: 2, name: 'Residential Towers', duration: '6 months', role: 'electrical_contractor', qualityRating: 4.0, issues: 1 }
      ],
      references: [
        { id: 1, name: 'Previous Client', company: 'Urban Homes Ltd', phone: '+91 98765 43216', email: 'client@urbanhomes.com', relationship: 'Previous Client', verified: true },
        { id: 2, name: 'Previous Contractor', company: 'Elite Construction', phone: '+91 98765 43217', email: 'contractor@elite.com', relationship: 'Previous Partner', verified: false }
      ],
      documents: [
        { id: 1, name: 'License Certificate', type: 'license', url: '/documents/license-priya-patel.pdf', verified: true },
        { id: 2, name: 'Insurance Certificate', type: 'insurance', url: '/documents/insurance-priya-patel.pdf', verified: true },
        { id: 3, name: 'Tax Registration', type: 'tax', url: '/documents/tax-priya-patel.pdf', verified: true },
        { id: 4, name: 'Bank Details', type: 'bank', url: '/documents/bank-priya-patel.pdf', verified: true },
        { id: 5, name: 'Electrical Certification', type: 'certification', url: '/documents/electrical-cert-priya-patel.pdf', verified: true }
      ],
      communicationRestrictions: {
        directContact: false,
        contactMethod: 'crm_only',
        authorizedContacts: ['site_engineer', 'project_manager'],
        contactHistory: [
          { date: '2025-03-19', contactType: 'secure_call', with: 'Suresh Reddy', purpose: 'Electrical inspection' },
          { date: '2025-03-17', contactType: 'secure_message', with: 'Sharma Electrical', purpose: 'Outlet spacing issue' }
        ]
      },
      maxSites: 2,
      actualSites: 2,
      siteAssignments: [
        { id: 3, name: 'Commercial Plaza - Site C', status: 'active' },
        { id: 2, name: 'Residential Towers - Site B', status: 'active' }
      ],
      workload: 'heavy',
      workloadStatus: 'overloaded',
      leaveHistory: [
        { startDate: '2025-02-20', endDate: '2025-02-25', reason: 'Medical Leave', approvedBy: 'Manager' },
        { startDate: '2025-01-15', endDate: '2025-01-17', reason: 'Personal Leave', approvedBy: 'Manager' }
      ],
      attendance: [
        { date: '2025-03-20', status: 'present', location: 'Site C' },
        { date: '2025-03-19', status: 'present', location: 'Site B' },
        { date: '2025-03-18', status: 'present', location: 'Office' }
      ],
      overtime: [
        { date: '2025-03-19', hours: 4, reason: 'Emergency electrical work', approvedBy: 'Manager' },
        { date: '2025-03-18', hours: 2, reason: 'Sunday work', approvedBy: 'Manager' }
      ],
      holidays: [
        { date: '2025-03-25', name: 'Holi', type: 'festival' },
        { date: '2025-03-26', name: 'Holi Holiday', type: 'festival_holiday' },
        { date: '2025-03-27', name: 'Holi Holiday', type: 'festival_holiday' },
        { date: '2025-03-28', name: 'Holi Holiday', type: 'festival_holiday' }
      ],
      workSchedule: {
        regularHours: 10,
        overtimeAllowed: true,
        sundayWork: true,
        holidayWork: true,
        amavasWork: true,
        workLocations: ['Site C', 'Site B'],
        travelRequired: true,
        fieldTravel: true,
        employeesDiscussions: true,
        otherStateLabours: true
      },
      fieldVerification: {
        required: true,
        verifiedBy: 'Site Engineer',
        verificationDate: '2025-03-19',
        status: 'verified'
      },
      technicalSpecs: {
        scale: '1:50',
        units: 'millimeters',
        drawingStandard: 'IS 12345',
        revisionControl: true,
        versionSync: true
      },
      siteIssues: [
        {
          id: 1,
          type: 'code_violation',
          priority: 'high',
          reportedBy: 'Suresh Reddy',
          reportedDate: '2025-03-17',
          description: 'Outlet spacing does not comply with electrical code requirements.',
          status: 'open',
          assignedTo: 'Sharma Electrical',
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
      comments: [
        {
          id: 1,
          author: 'Suresh Reddy',
          role: 'Electrical Engineer',
          message: 'Outlet spacing needs to be within 6m as per electrical code.',
          timestamp: '2025-03-17 09:15',
          attachments: [],
          isSecure: true,
          type: 'code_compliance'
        }
      ],
      permissions: {
        view: ['architect', 'engineer', 'contractor'],
        edit: ['designer'],
        approve: ['engineer', 'architect'],
        contactRestrictions: {
          contractorToEngineer: false,
          engineerToContractor: true,
          designerToContractor: true,
          allContactThroughCrm: true
        }
      }
    },
    {
      id: 3,
      name: 'Suresh Reddy',
      role: 'Site Engineer',
      department: 'Engineering',
      phone: '+91 98765 43218',
      email: 'suresh@construction.com',
      address: '789 Engineer Rd, Delhi',
      experience: 7,
      specialization: 'structural',
      rating: 4.0,
      projectsCompleted: 10,
      currentProjects: 1,
      totalAmount: 1500000,
      lastProject: 'Commercial Plaza',
      lastProjectDate: '2025-03-05',
      status: 'active',
      licenseNumber: 'LC-2025-003',
      emergencyContact: '+91 98765 43219',
      bankDetails: {
        accountNumber: '1122334455',
        ifsc: 'SBI0000789',
        bankName: 'State Bank of India'
      },
      insuranceInfo: { policyNumber: 'POL-98765', expiryDate: '2026-02-10' },
      taxInfo: { gstin: '12ABCDE9876F3Z1' },
      availability: 'available',
      skills: ['structural', 'design', 'analysis'],
      certifications: ['Structural Engineer'],
      recruitmentSource: 'naukri',
      applicationDate: '2025-01-15',
      interviewDate: '',
      hiringStatus: 'hired',
      onboardingStatus: 'completed',
      contractSigned: true,
      contractStartDate: '2025-01-25',
      contractEndDate: '2026-01-25',
      probationPeriod: '3 months',
      probationEndDate: '2025-04-25',
      salaryStructure: {
        baseSalary: 72000,
        projectBased: true,
        paymentTerms: 'milestone_based',
        advancePercentage: 25,
        milestonePercentage: 60,
        completionPercentage: 15
      },
      performanceMetrics: {
        qualityScore: 4.1,
        timelinessScore: 3.8,
        budgetCompliance: 4.2,
        safetyRecord: 'excellent',
        lastEvaluation: '2025-03-05'
      },
      projects: [
        { id: 4, name: 'Industrial Facility', duration: '6 months', role: 'structural_contractor', qualityRating: 4.1, issues: 0 },
        { id: 3, name: 'Commercial Plaza', duration: '8 months', role: 'structural_contractor', qualityRating: 4.0, issues: 1 }
      ],
      references: [
        { id: 1, name: 'Previous Client', company: 'Tech Manufacturing Inc', phone: '+91 98765 43220', email: 'client@tech.com', relationship: 'Previous Client', verified: true },
        { id: 2, name: 'Previous Contractor', company: 'Premium Construction', phone: '+91 98765 43221', email: 'contractor@premium.com', relationship: 'Previous Partner', verified: false }
      ],
      documents: [
        { id: 1, name: 'License Certificate', type: 'license', url: '/documents/license-suresh-reddy.pdf', verified: true },
        { id: 2, name: 'Insurance Certificate', type: 'insurance', url: '/documents/insurance-suresh-reddy.pdf', verified: true },
        { id: 3, name: 'Tax Registration', type: 'tax', url: '/documents/tax-suresh-reddy.pdf', verified: true },
        { id: 4, name: 'Bank Details', type: 'bank', url: '/documents/bank-suresh-reddy.pdf', verified: true },
        { id: 5, name: 'Structural Certification', type: 'certification', url: '/documents/structural-cert-suresh-reddy.pdf', verified: true }
      ],
      communicationRestrictions: {
        directContact: false,
        contactMethod: 'crm_only',
        authorizedContacts: ['site_engineer', 'project_manager'],
        contactHistory: [
          { date: '2025-03-18', contactType: 'secure_call', with: 'Raj Contractor', purpose: 'Structural inspection' },
          { date: '2025-03-16', contactType: 'secure_message', with: 'Priya Patel', purpose: 'Design clarification' }
        ]
      },
      maxSites: 2,
      actualSites: 1,
      siteAssignments: [
        { id: 4, name: 'Industrial Facility - Site D', status: 'active' }
      ],
      workload: 'light',
      workloadStatus: 'underutilized',
      leaveHistory: [
        { startDate: '2025-03-01', endDate: '2025-03-03', reason: 'Personal Leave', approvedBy: 'Manager' },
        { startDate: '2025-02-10', endDate: '2025-02-12', reason: 'Sick Leave', approvedBy: 'Manager' }
      ],
      attendance: [
        { date: '2025-03-20', status: 'present', location: 'Site D' },
        { date: '2025-03-19', status: 'present', location: 'Site D' },
        { date: '2025-03-18', status: 'present', location: 'Office' }
      ],
      overtime: [
        { date: '2025-03-18', hours: 3, reason: 'Emergency structural work', approvedBy: 'Manager' },
        { date: '2025-03-17', hours: 2, reason: 'Sunday work', approvedBy: 'Manager' }
      ],
      holidays: [
        { date: '2025-03-25', name: 'Holi', type: 'festival' },
        { date: '2025-03-26', name: 'Holi Holiday', type: 'festival_holiday' },
        { date: '2025-03-27', name: 'Holi Holiday', type: 'festival_holiday' },
        { date: '2025-03-28', name: 'Holi Holiday', type: 'festival_holiday' }
      ],
      workSchedule: {
        regularHours: 10,
        overtimeAllowed: true,
        sundayWork: true,
        holidayWork: true,
        amavasWork: true,
        workLocations: ['Site D'],
        travelRequired: true,
        fieldTravel: true,
        employeesDiscussions: true,
        otherStateLabours: true
      },
      fieldVerification: {
        required: true,
        verifiedBy: 'Site Engineer',
        verificationDate: '2025-03-18',
        status: 'verified'
      },
      technicalSpecs: {
        scale: '1:20',
        units: 'millimeters',
        drawingStandard: 'IS 456',
        revisionControl: true,
        versionSync: true
      },
      siteIssues: [
        {
          id: 1,
          type: 'structural',
          priority: 'high',
          reportedBy: 'Raj Contractor',
          reportedDate: '2025-03-16',
          description: 'Structural beam design needs adjustment for load requirements.',
          status: 'open',
          assignedTo: 'Suresh Reddy',
          dueDate: '2025-03-23',
          resolutionNotes: 'Updating beam design in v2.1',
          category: 'structural',
          relatedTo: 'beam_design',
          measurements: {
            expected: 'Load capacity 200 kN/m²',
            actual: 'Load capacity 180 kN/m²',
            unit: 'kN/m²'
          }
        }
      ],
      comments: [
        {
          id: 1,
          author: 'Raj Contractor',
          role: 'Contractor',
          message: 'Structural beam design needs adjustment for load requirements.',
          timestamp: '2025-03-16 09:30',
          attachments: [],
          isSecure: true,
          type: 'design_request'
        }
      ],
      permissions: {
        view: ['architect', 'engineer', 'contractor'],
        edit: ['designer'],
        approve: ['engineer', 'architect'],
        contactRestrictions: {
          contractorToEngineer: false,
          engineerToContractor: true,
          designerToContractor: true,
          allContactThroughCrm: true
        }
      }
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    role: 'Site Engineer',
    department: 'Engineering',
    phone: '',
    email: '',
    address: '',
    experience: '',
    specialization: 'civil',
    licenseNumber: '',
    emergencyContact: '',
    recruitmentSource: 'indeed',
    applicationDate: new Date().toISOString().split('T')[0],
    interviewDate: '',
    hiringStatus: 'applied',
    onboardingStatus: 'pending',
    contractSigned: false,
    contractStartDate: null,
    contractEndDate: null,
    probationPeriod: '3 months',
    probationEndDate: null,
    salaryStructure: {
      baseSalary: 0,
      projectBased: true,
      paymentTerms: 'milestone_based',
      advancePercentage: 25,
      milestonePercentage: 60,
      completionPercentage: 15
    },
    bankDetails: {
      accountNumber: '',
      ifsc: '',
      bankName: ''
    },
    insuranceInfo: { policyNumber: '', expiryDate: '' },
    taxInfo: { gstin: '' }
  });

  const statusColors: { [key: string]: string } = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    suspended: 'bg-red-100 text-red-800',
    applied: 'bg-blue-100 text-blue-800',
    hired: 'bg-green-100 text-green-800'
  };

  const availabilityColors = {
    available: 'bg-green-100 text-green-800',
    busy: 'bg-yellow-100 text-yellow-800',
    unavailable: 'bg-red-100 text-red-800'
  };

  const specializationColors: { [key: string]: string } = {
    civil: 'bg-blue-100 text-blue-800',
    electrical: 'bg-yellow-100 text-yellow-800',
    plumbing: 'bg-green-100 text-green-800',
    masonry: 'bg-purple-100 text-purple-800',
    carpentry: 'bg-orange-100 text-orange-800',
    structural: 'bg-cyan-100 text-cyan-800'
  };

  const recruitmentSourceColors: { [key: string]: string } = {
    indeed: 'bg-blue-100 text-blue-800',
    apna: 'bg-green-100 text-green-800',
    naukri: 'bg-purple-100 text-purple-800',
    referral: 'bg-yellow-100 text-yellow-800',
    direct: 'bg-red-100 text-red-800'
  };

  const contactMethodColors: { [key: string]: string } = {
    crm_only: 'bg-blue-100 text-blue-800',
    engineer_only: 'bg-green-100 text-green-800',
    restricted: 'bg-red-100 text-red-800',
    direct: 'bg-purple-100 text-purple-800'
  };

  const workloadStatusColors: { [key: string]: string } = {
    optimal: 'bg-green-100 text-green-800',
    overloaded: 'bg-red-100 text-red-800',
    underutilized: 'bg-yellow-100 text-yellow-800'
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesFilter = filter === 'all' || employee.status === filter;
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          employee.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.role || !newEmployee.department) return;

    const employeeObj = {
      id: employees.length + 1,
      ...newEmployee,
      experience: parseInt(newEmployee.experience) || 0,
      rating: 0,
      projectsCompleted: 0,
      currentProjects: 0,
      totalAmount: 0,
      lastProject: '',
      lastProjectDate: '',
      status: 'inactive',
      availability: 'available',
      skills: [],
      certifications: [],
      maxSites: 2,
      actualSites: 0,
      siteAssignments: [],
      workload: 'light',
      workloadStatus: 'underutilized',
      leaveHistory: [],
      attendance: [],
      overtime: [],
      holidays: [],
      workSchedule: {
        regularHours: 10,
        overtimeAllowed: true,
        sundayWork: true,
        holidayWork: true,
        amavasWork: true,
        workLocations: [],
        travelRequired: false,
        fieldTravel: false,
        employeesDiscussions: false,
        otherStateLabours: false
      },
      fieldVerification: {
        required: true,
        verifiedBy: 'Site Engineer',
        verificationDate: '',
        status: 'not_verified'
      },
      technicalSpecs: {
        scale: '1:100',
        units: 'millimeters',
        drawingStandard: 'IS 10752',
        revisionControl: true,
        versionSync: true
      },
      siteIssues: [],
      comments: [],
      permissions: {
        view: ['architect', 'engineer', 'contractor'],
        edit: ['designer'],
        approve: ['engineer', 'architect'],
        contactRestrictions: {
          contractorToEngineer: false,
          engineerToContractor: true,
          designerToContractor: true,
          allContactThroughCrm: true
        }
      },
      projects: [],
      references: [],
      documents: [],
      communicationRestrictions: {
        directContact: false,
        contactMethod: 'crm_only',
        authorizedContacts: ['site_engineer', 'project_manager'],
        contactHistory: []
      },
      bankDetails: {
        accountNumber: '',
        ifsc: '',
        bankName: ''
      },
      insuranceInfo: { policyNumber: '', expiryDate: '' },
      taxInfo: { gstin: '' },
      recruitmentSource: newEmployee.recruitmentSource || 'indeed',
      applicationDate: newEmployee.applicationDate || new Date().toISOString().split('T')[0],
      interviewDate: newEmployee.interviewDate || '',
      hiringStatus: newEmployee.hiringStatus || 'applied',
      onboardingStatus: newEmployee.onboardingStatus || 'pending',
      contractSigned: newEmployee.contractSigned || false,
      contractStartDate: newEmployee.contractStartDate || '',
      contractEndDate: newEmployee.contractEndDate || '',
      probationPeriod: newEmployee.probationPeriod || '3 months',
      probationEndDate: newEmployee.probationEndDate || '',
      performanceMetrics: {
        qualityScore: 0,
        timelinessScore: 0,
        budgetCompliance: 0,
        safetyRecord: 'pending',
        lastEvaluation: ''
      },
      salaryStructure: {
        baseSalary: 0,
        projectBased: true,
        paymentTerms: 'milestone_based',
        advancePercentage: 25,
        milestonePercentage: 60,
        completionPercentage: 15
      }
    };

    setEmployees([employeeObj, ...employees]);
    setNewEmployee({
      name: '',
      role: 'Site Engineer',
      department: 'Engineering',
      phone: '',
      email: '',
      address: '',
      experience: '',
      specialization: 'civil',
      licenseNumber: '',
      emergencyContact: '',
      recruitmentSource: 'indeed',
      applicationDate: new Date().toISOString().split('T')[0],
      interviewDate: '',
      hiringStatus: 'applied',
      onboardingStatus: 'pending',
      contractSigned: false,
      contractStartDate: null,
      contractEndDate: null,
      probationPeriod: '3 months',
      probationEndDate: null,
      salaryStructure: {
        baseSalary: 0,
        projectBased: true,
        paymentTerms: 'milestone_based',
        advancePercentage: 25,
        milestonePercentage: 60,
        completionPercentage: 15
      },
      bankDetails: {
        accountNumber: '',
        ifsc: '',
        bankName: ''
      },
      insuranceInfo: { policyNumber: '', expiryDate: '' },
      taxInfo: { gstin: '' }
    });
    setShowAddForm(false);
  };

  const handleUpdateEmployee = (employeeId: number, updateData: any) => {
    const updatedEmployees = employees.map(employee => {
      if (employee.id === employeeId) {
        return {
          ...employee,
          ...updateData,
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return employee;
    });

    setEmployees(updatedEmployees);
    const updatedSelectedEmployee = updatedEmployees.find(e => e.id === employeeId);
    if (updatedSelectedEmployee) {
      setSelectedEmployee(updatedSelectedEmployee);
    }
  };

  const handleAssignSite = (employeeId: number, site: any) => {
    const updatedEmployees = employees.map(employee => {
      if (employee.id === employeeId) {
        const updatedSites = employee.siteAssignments.some(s => s.id === site.id)
          ? employee.siteAssignments
          : [...employee.siteAssignments, { id: site.id, name: site.name, status: 'active' }];
          
        const actualSites = updatedSites.length;
        const workloadStatus = actualSites > employee.maxSites ? 'overloaded' : 
                              actualSites < employee.maxSites ? 'underutilized' : 'optimal';
                              
        return {
          ...employee,
          siteAssignments: updatedSites,
          actualSites,
          workloadStatus,
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return employee;
    });

    setEmployees(updatedEmployees);
    const updatedSelectedEmployee = updatedEmployees.find(e => e.id === employeeId);
    if (updatedSelectedEmployee) {
      setSelectedEmployee(updatedSelectedEmployee);
    }
  };

  const handleRemoveSite = (employeeId: number, siteId: number) => {
    const updatedEmployees = employees.map(employee => {
      if (employee.id === employeeId) {
        const updatedSites = employee.siteAssignments.filter(s => s.id !== siteId);
        const actualSites = updatedSites.length;
        const workloadStatus = actualSites > employee.maxSites ? 'overloaded' : 
                              actualSites < employee.maxSites ? 'underutilized' : 'optimal';
                              
        return {
          ...employee,
          siteAssignments: updatedSites,
          actualSites,
          workloadStatus,
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return employee;
    });

    setEmployees(updatedEmployees);
    const updatedSelectedEmployee = updatedEmployees.find(e => e.id === employeeId);
    if (updatedSelectedEmployee) {
      setSelectedEmployee(updatedSelectedEmployee);
    }
  };

  // Check for overloaded employees
  const overloadedEmployees = employees.filter(emp => emp.actualSites > emp.maxSites);

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Employee Management System</h1>
          <p className="text-gray-600 mt-2">
            Manage employees, site assignments, and communication restrictions
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
          <Button variant="outline">
            <User className="mr-2 h-4 w-4" />
            Employee Directory
          </Button>
        </div>
      </div>

      {/* Overloaded Employees Warning */}
      {overloadedEmployees.length > 0 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-red-600" />
            <h3 className="font-medium text-red-800">Overloaded Employees</h3>
          </div>
          <p className="text-sm text-red-700 mt-1">
            The following employees are managing more sites than their limit:
            {overloadedEmployees.map(emp => ` ${emp.name} (${emp.actualSites}/${emp.maxSites})`).join(', ')}
          </p>
          <p className="text-xs text-red-600 mt-1">
            Assign additional employees to balance the workload
          </p>
        </div>
      )}

      {/* Add Employee Form */}
      {showAddForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New Employee</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <Input
                  value={newEmployee.name}
                  onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                  placeholder="Employee Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Role</label>
                <select 
                  value={newEmployee.role} 
                  onChange={(e) => setNewEmployee({...newEmployee, role: e.target.value})}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="Site Engineer">Site Engineer</option>
                  <option value="Project Manager">Project Manager</option>
                  <option value="Architect">Architect</option>
                  <option value="Designer">Designer</option>
                  <option value="Quality Engineer">Quality Engineer</option>
                  <option value="Billing Engineer">Billing Engineer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Department</label>
                <select 
                  value={newEmployee.department} 
                  onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Design">Design</option>
                  <option value="Quality">Quality</option>
                  <option value="Billing">Billing</option>
                  <option value="Management">Management</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Specialization</label>
                <select 
                  value={newEmployee.specialization} 
                  onChange={(e) => setNewEmployee({...newEmployee, specialization: e.target.value})}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="civil">Civil</option>
                  <option value="electrical">Electrical</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="masonry">Masonry</option>
                  <option value="carpentry">Carpentry</option>
                  <option value="structural">Structural</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <Input
                  value={newEmployee.phone}
                  onChange={(e) => setNewEmployee({...newEmployee, phone: e.target.value})}
                  placeholder="Phone Number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                  placeholder="Email Address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Experience (years)</label>
                <Input
                  type="number"
                  value={newEmployee.experience}
                  onChange={(e) => setNewEmployee({...newEmployee, experience: e.target.value})}
                  placeholder="Years of Experience"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">License Number</label>
                <Input
                  value={newEmployee.licenseNumber}
                  onChange={(e) => setNewEmployee({...newEmployee, licenseNumber: e.target.value})}
                  placeholder="License Number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Emergency Contact</label>
                <Input
                  value={newEmployee.emergencyContact}
                  onChange={(e) => setNewEmployee({...newEmployee, emergencyContact: e.target.value})}
                  placeholder="Emergency Contact Number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Recruitment Source</label>
                <select 
                  value={newEmployee.recruitmentSource} 
                  onChange={(e) => setNewEmployee({...newEmployee, recruitmentSource: e.target.value})}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="indeed">Indeed</option>
                  <option value="apna">Apna</option>
                  <option value="naukri">Naukri</option>
                  <option value="referral">Referral</option>
                  <option value="direct">Direct</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Application Date</label>
                <Input
                  type="date"
                  value={newEmployee.applicationDate || ''}
                  onChange={(e) => setNewEmployee({...newEmployee, applicationDate: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Interview Date</label>
                <Input
                  type="date"
                  value={newEmployee.interviewDate || ''}
                  onChange={(e) => setNewEmployee({...newEmployee, interviewDate: e.target.value})}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Address</label>
                <Input
                  value={newEmployee.address}
                  onChange={(e) => setNewEmployee({...newEmployee, address: e.target.value})}
                  placeholder="Full Address"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleAddEmployee}>
                <Plus className="mr-2 h-4 w-4" />
                Add Employee
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
                  placeholder="Search by name, role, department, or specialization..."
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
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
                <option value="applied">Applied</option>
                <option value="hired">Hired</option>
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
        {/* Employee List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Employees ({filteredEmployees.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredEmployees.map((employee) => {
                  const isOverloaded = employee.actualSites > employee.maxSites;
                  
                  return (
                    <div 
                      key={employee.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedEmployee?.id === employee.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:bg-gray-50'
                      } ${isOverloaded ? 'border-red-300 bg-red-50' : ''}`}
                      onClick={() => setSelectedEmployee(employee)}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{employee.name}</h3>
                        <div className="flex gap-2">
                          <Badge className={statusColors[employee.status]}>
                            {employee.status}
                          </Badge>
                          <Badge className={specializationColors[employee.specialization]}>
                            {employee.specialization}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{employee.role} • {employee.department}</p>
                      <div className="flex items-center text-xs text-gray-500 mt-2">
                        <Phone className="mr-1 h-3 w-3" />
                        {employee.communicationRestrictions.directContact 
                          ? employee.phone 
                          : '***-***-' + employee.phone.slice(-3)}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Mail className="mr-1 h-3 w-3" />
                        {employee.email}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <MapPin className="mr-1 h-3 w-3" />
                        {employee.address ? employee.address.substring(0, 30) + '...' : 'No address'}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <HardHat className="mr-1 h-3 w-3" />
                        {employee.experience} years experience
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {employee.rating} rating
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <DollarSign className="mr-1 h-3 w-3" />
                        ₹{(employee.totalAmount || 0).toLocaleString()} total
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Building className="mr-1 h-3 w-3" />
                        {employee.projectsCompleted || 0} projects
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Calendar className="mr-1 h-3 w-3" />
                        Applied: {employee.applicationDate}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Wrench className="mr-1 h-3 w-3" />
                        {employee.recruitmentSource}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Users className="mr-1 h-3 w-3" />
                        {employee.actualSites}/{employee.maxSites} sites
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Clock className="mr-1 h-3 w-3" />
                        {employee.workloadStatus === 'overloaded' ? (
                          <Badge variant="destructive" className="text-xs">
                            Overloaded
                          </Badge>
                        ) : employee.workloadStatus === 'underutilized' ? (
                          <Badge variant="secondary" className="text-xs">
                            Underutilized
                          </Badge>
                        ) : (
                          <Badge className="text-xs">
                            Optimal
                          </Badge>
                        )}
                      </div>
                      {employee.communicationRestrictions.directContact && (
                        <div className="flex items-center text-xs text-blue-600 mt-1">
                          <Lock className="mr-1 h-3 w-3" />
                          Direct contact restricted
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Employee Details */}
        <div className="lg:col-span-2">
          {selectedEmployee && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center">
                        <User className="mr-2 h-5 w-5" />
                        {selectedEmployee.name}
                      </CardTitle>
                      <p className="text-gray-600 mt-1">{selectedEmployee.role} • {selectedEmployee.department}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={statusColors[selectedEmployee.status]}>
                        {selectedEmployee.status}
                      </Badge>
                      <Badge className={specializationColors[selectedEmployee.specialization]}>
                        {selectedEmployee.specialization}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-medium mb-3">Contact Information</h4>
                      <div className="space-y-3">
                        <div className="flex items-center">
                          <Phone className="mr-2 h-4 w-4 text-gray-600" />
                          <span className="text-gray-600">Primary: </span>
                          <span className="ml-1">
                            {selectedEmployee.communicationRestrictions.directContact 
                              ? selectedEmployee.phone 
                              : '***-***-' + selectedEmployee.phone.slice(-3)}
                          </span>
                        </div>
                        {selectedEmployee.emergencyContact && (
                          <div className="flex items-center">
                            <Phone className="mr-2 h-4 w-4 text-gray-600" />
                            <span className="text-gray-600">Emergency: </span>
                            <span className="ml-1">
                              {selectedEmployee.communicationRestrictions.directContact 
                                ? selectedEmployee.emergencyContact 
                                : '***-***-' + selectedEmployee.emergencyContact.slice(-3)}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center">
                          <Mail className="mr-2 h-4 w-4 text-gray-600" />
                          <span className="text-gray-600">Email: </span>
                          <span className="ml-1">{selectedEmployee.email}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4 text-gray-600" />
                          <span className="text-gray-600">Address: </span>
                          <span className="ml-1">{selectedEmployee.address || 'No address'}</span>
                        </div>
                        <div className="flex items-center">
                          <HardHat className="mr-2 h-4 w-4 text-gray-600" />
                          <span className="text-gray-600">Specialization: </span>
                          <Badge className={`${specializationColors[selectedEmployee.specialization]} ml-1`}>
                            {selectedEmployee.specialization}
                          </Badge>
                        </div>
                        <div className="flex items-center">
                          <Star className="mr-2 h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-gray-600">Rating: </span>
                          <span className="ml-1">{selectedEmployee.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Professional Details</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Experience:</span>
                          <span>{selectedEmployee.experience} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">License:</span>
                          <span>{selectedEmployee.licenseNumber || 'Not provided'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Projects Completed:</span>
                          <span>{selectedEmployee.projectsCompleted || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Current Projects:</span>
                          <span>{selectedEmployee.currentProjects || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Amount:</span>
                          <span>₹{(selectedEmployee.totalAmount || 0).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Project:</span>
                          <span>{selectedEmployee.lastProject || 'None'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Project Date:</span>
                          <span>{selectedEmployee.lastProjectDate || 'None'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Recruitment Source:</span>
                          <Badge className={recruitmentSourceColors[selectedEmployee.recruitmentSource]}>
                            {selectedEmployee.recruitmentSource}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Application Date:</span>
                          <span>{selectedEmployee.applicationDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Interview Date:</span>
                          <span>{selectedEmployee.interviewDate || 'Pending'}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Communication Restrictions Notice */}
                  <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <div className="flex items-start">
                      <Shield className="mr-2 h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800">Communication Restrictions</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          <span className="font-medium">Direct Contact:</span> {selectedEmployee.communicationRestrictions.directContact ? 'Allowed' : 'Restricted'}
                          </p>
                        <p className="text-sm text-blue-700">
                          <span className="font-medium">Contact Method:</span> {selectedEmployee.communicationRestrictions.contactMethod.replace('_', ' ')}
                        </p>
                        <p className="text-sm text-blue-700">
                          <span className="font-medium">Authorized Contacts:</span> {selectedEmployee.communicationRestrictions.authorizedContacts.join(', ')}
                        </p>
                        {selectedEmployee.communicationRestrictions.contactHistory.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm text-blue-700 font-medium">Contact History:</p>
                            <ul className="text-xs text-blue-700 mt-1">
                              {selectedEmployee.communicationRestrictions.contactHistory.map((contact, idx) => (
                                <li key={idx} className="ml-2">
                                  {contact.date}: {contact.contactType} with {contact.with} - {contact.purpose}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <p className="text-sm text-blue-700 mt-2">
                          <AlertTriangle className="inline mr-2 h-4 w-4" />
                          All communication must go through CRM system to prevent unauthorized contact exchanges.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Site Assignments */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">Site Assignments ({selectedEmployee.siteAssignments.length})</h4>
                      <div className="flex items-center">
                        <Badge className={workloadStatusColors[selectedEmployee.workloadStatus]}>
                          {selectedEmployee.workloadStatus.replace('_', ' ')}
                        </Badge>
                        <span className="ml-2 text-sm text-gray-600">
                          {selectedEmployee.actualSites}/{selectedEmployee.maxSites} sites
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {selectedEmployee.siteAssignments.map((site) => (
                        <div key={site.id} className="flex justify-between items-center p-3 border rounded">
                          <div>
                            <div className="font-medium">{site.name}</div>
                            <Badge className={`${statusColors[site.status]} text-xs mt-1`}>
                              {site.status}
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleRemoveSite(selectedEmployee.id, site.id)}
                            >
                              Remove
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                            >
                              View Site
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-3">
                      <label className="block text-sm font-medium mb-1">Assign New Site</label>
                      <select 
                        onChange={(e) => handleAssignSite(selectedEmployee.id, JSON.parse(e.target.value))}
                        className="w-full border rounded-md px-3 py-2"
                        defaultValue=""
                      >
                        <option value="">Select Site to Assign</option>
                        {[
                          { id: 1, name: 'Downtown Complex - Site A' },
                          { id: 2, name: 'Residential Towers - Site B' },
                          { id: 3, name: 'Commercial Plaza - Site C' },
                          { id: 4, name: 'Industrial Facility - Site D' }
                        ].filter(s => !selectedEmployee.siteAssignments.some(ss => ss.id === s.id)).map(site => (
                          <option key={site.id} value={JSON.stringify(site)}>
                            {site.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Work Schedule */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Work Schedule</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Regular Hours</span>
                          <Badge variant="outline">{selectedEmployee.workSchedule.regularHours} hrs/day</Badge>
                        </div>
                        <div className="flex items-center text-xs text-gray-600 mt-1">
                          <Clock className="mr-1 h-3 w-3" />
                          Standard work schedule
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Overtime Allowed</span>
                          <Badge variant={selectedEmployee.workSchedule.overtimeAllowed ? "default" : "secondary"}>
                            {selectedEmployee.workSchedule.overtimeAllowed ? "Yes" : "No"}
                          </Badge>
                        </div>
                        <div className="flex items-center text-xs text-gray-600 mt-1">
                          <AlertTriangle className="mr-1 h-3 w-3" />
                          For emergencies and deadlines
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Sunday Work</span>
                          <Badge variant={selectedEmployee.workSchedule.sundayWork ? "default" : "secondary"}>
                            {selectedEmployee.workSchedule.sundayWork ? "Allowed" : "Not Allowed"}
                          </Badge>
                        </div>
                        <div className="flex items-center text-xs text-gray-600 mt-1">
                          <Calendar className="mr-1 h-3 w-3" />
                          For critical project phases
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-3">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Holiday Work</span>
                          <Badge variant={selectedEmployee.workSchedule.holidayWork ? "default" : "secondary"}>
                            {selectedEmployee.workSchedule.holidayWork ? "Allowed" : "Not Allowed"}
                          </Badge>
                        </div>
                        <div className="flex items-center text-xs text-gray-600 mt-1">
                          <Calendar className="mr-1 h-3 w-3" />
                          For Amavas and festival days
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <h5 className="font-medium mb-2">Work Locations</h5>
                      <div className="flex flex-wrap gap-2">
                        {selectedEmployee.workSchedule.workLocations.map((location, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center">
                            <MapPin className="mr-1 h-3 w-3" />
                            {location}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Attendance & Overtime */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Attendance & Overtime</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-3">
                        <h5 className="font-medium mb-2">Recent Attendance</h5>
                        <div className="space-y-2">
                          {selectedEmployee.attendance.slice(0, 3).map((record, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{record.date}</span>
                              <Badge className={record.status === 'present' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                                {record.status}
                              </Badge>
                              <span className="text-gray-600">{record.location}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-3">
                        <h5 className="font-medium mb-2">Overtime Records</h5>
                        <div className="space-y-2">
                          {selectedEmployee.overtime.slice(0, 3).map((record, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{record.date}</span>
                              <span>{record.hours} hrs</span>
                              <span className="text-gray-600">{record.reason}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Leave History */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Leave History</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedEmployee.leaveHistory.map((leave, index) => (
                        <div key={index} className="border rounded-lg p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">{leave.reason}</div>
                              <div className="text-sm text-gray-600 mt-1">
                                {leave.startDate} to {leave.endDate}
                              </div>
                            </div>
                            <Badge variant="outline">
                              {leave.approvedBy}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Holidays */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Upcoming Holidays</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedEmployee.holidays.slice(0, 4).map((holiday, index) => (
                        <div key={index} className="border rounded-lg p-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">{holiday.name}</div>
                              <div className="text-sm text-gray-600 mt-1">
                                {holiday.date}
                              </div>
                            </div>
                            <Badge variant="outline">
                              {holiday.type.replace('_', ' ')}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Skills & Certifications */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Skills & Certifications</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedEmployee.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center">
                          <Wrench className="mr-1 h-3 w-3" />
                          {skill}
                        </Badge>
                      ))}
                      {selectedEmployee.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline" className="flex items-center">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Financial Information */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Financial Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium mb-2">Salary Structure</h5>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Base Salary:</span>
                            <span>₹{selectedEmployee.salaryStructure.baseSalary?.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Project Based:</span>
                            <span>{selectedEmployee.salaryStructure.projectBased ? 'Yes' : 'No'}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Payment Terms:</span>
                            <span>{selectedEmployee.salaryStructure.paymentTerms?.replace('_', ' ')}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Advance (%):</span>
                            <span>{selectedEmployee.salaryStructure.advancePercentage}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Milestone (%):</span>
                            <span>{selectedEmployee.salaryStructure.milestonePercentage}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Completion (%):</span>
                            <span>{selectedEmployee.salaryStructure.completionPercentage}%</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2">Bank & Tax Details</h5>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Bank:</span>
                            <span>{selectedEmployee.bankDetails?.bankName || 'Not provided'}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Account:</span>
                            <span>
                              {selectedEmployee.bankDetails?.accountNumber 
                                ? '****' + selectedEmployee.bankDetails.accountNumber.slice(-4) 
                                : 'Not provided'}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">IFSC:</span>
                            <span>{selectedEmployee.bankDetails?.ifsc || 'Not provided'}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">GSTIN:</span>
                            <span>{selectedEmployee.taxInfo?.gstin || 'Not provided'}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Insurance Policy:</span>
                            <span>{selectedEmployee.insuranceInfo?.policyNumber || 'Not provided'}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Policy Expiry:</span>
                            <span>{selectedEmployee.insuranceInfo?.expiryDate || 'Not provided'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Performance Metrics</h4>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-lg font-bold">{selectedEmployee.performanceMetrics.qualityScore}</div>
                        <div className="text-sm text-gray-600 mt-1">Quality</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-lg font-bold">{selectedEmployee.performanceMetrics.timelinessScore}</div>
                        <div className="text-sm text-gray-600 mt-1">Timeliness</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-lg font-bold">{selectedEmployee.performanceMetrics.budgetCompliance}</div>
                        <div className="text-sm text-gray-600 mt-1">Budget</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <Badge className={selectedEmployee.performanceMetrics.safetyRecord === 'excellent' ? 'bg-green-100 text-green-800' : selectedEmployee.performanceMetrics.safetyRecord === 'good' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}>
                          {selectedEmployee.performanceMetrics.safetyRecord}
                        </Badge>
                        <div className="text-sm text-gray-600 mt-1">Safety</div>
                      </div>
                      <div className="border rounded-lg p-3 text-center">
                        <div className="text-lg font-bold">{selectedEmployee.performanceMetrics.lastEvaluation || 'Never'}</div>
                        <div className="text-sm text-gray-600 mt-1">Last Eval</div>
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