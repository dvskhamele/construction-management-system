// Contractor Management Page for Construction CRM
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  HardHat, 
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
  FileText,
  Building,
  Wrench,
  Shield,
  Lock,
  Unlock,
  User,
  Hash,
  Eye
} from 'lucide-react';

export default function ContractorManagementPage() {
  const [contractors, setContractors] = useState([
    {
      id: 1,
      name: 'Raj Construction',
      company: 'Raj Construction Pvt Ltd',
      contactPerson: 'Raj Kumar',
      phone: '+91 98765 43210',
      email: 'contact@rajconstruction.com',
      address: '123 Construction Ave, Delhi',
      specialization: 'civil',
      experience: 8,
      rating: 4.5,
      projectsCompleted: 15,
      currentProjects: 3,
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
      skills: ['carpentry', 'masonry', 'plumbing', 'electrical'],
      certifications: ['Safety Certified', 'Quality Certified'],
      recruitmentSource: 'indeed',
      applicationDate: '2025-03-10',
      interviewDate: '2025-03-12',
      hiringStatus: 'hired',
      onboardingStatus: 'completed',
      contractSigned: true,
      contractStartDate: '2025-03-15',
      contractEndDate: '2026-03-15',
      probationPeriod: '3 months',
      probationEndDate: '2025-06-15',
      salaryStructure: {
        baseSalary: 0,
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
        { id: 2, name: 'Residential Complex', duration: '8 months', role: 'civil_contractor', qualityRating: 4.0, issues: 2 }
      ],
      references: [
        { id: 1, name: 'Previous Client', company: 'Metro Developments', phone: '+91 98765 43212', email: 'client@metro.com', relationship: 'Previous Client', verified: true },
        { id: 2, name: 'Previous Contractor', company: 'Urban Construction', phone: '+91 98765 43213', email: 'contractor@urban.com', relationship: 'Previous Partner', verified: false }
      ],
      documents: [
        { id: 1, name: 'License Certificate', type: 'license', url: '/documents/license-raj-construction.pdf', verified: true },
        { id: 2, name: 'Insurance Certificate', type: 'insurance', url: '/documents/insurance-raj-construction.pdf', verified: true },
        { id: 3, name: 'Tax Registration', type: 'tax', url: '/documents/tax-raj-construction.pdf', verified: true },
        { id: 4, name: 'Bank Details', type: 'bank', url: '/documents/bank-raj-construction.pdf', verified: true },
        { id: 5, name: 'Safety Certification', type: 'certification', url: '/documents/safety-cert-raj-construction.pdf', verified: true }
      ],
      communicationRestrictions: {
        directContact: false,
        contactMethod: 'crm_only',
        authorizedContacts: ['site_engineer', 'project_manager'],
        contactHistory: [
          { date: '2025-03-20', contactType: 'secure_call', with: 'Anil Sharma', purpose: 'Foundation work discussion' },
          { date: '2025-03-18', contactType: 'secure_message', with: 'Priya Patel', purpose: 'Drawing clarification' }
        ]
      }
    },
    {
      id: 2,
      name: 'Sharma Masonry',
      company: 'Sharma Masonry Works',
      contactPerson: 'Amit Sharma',
      phone: '+91 98765 43212',
      email: 'info@sharmamasonry.com',
      address: '456 Building St, Delhi',
      specialization: 'masonry',
      experience: 6,
      rating: 4.2,
      projectsCompleted: 12,
      currentProjects: 2,
      totalAmount: 1800000,
      lastProject: 'Residential Towers',
      lastProjectDate: '2025-03-10',
      status: 'active',
      licenseNumber: 'LC-2025-002',
      emergencyContact: '+91 98765 43213',
      bankDetails: {
        accountNumber: '0987654321',
        ifsc: 'ICIC0000456',
        bankName: 'ICICI Bank'
      },
      insuranceInfo: { policyNumber: 'POL-54321', expiryDate: '2026-05-20' },
      taxInfo: { gstin: '12ABCDE5678F2Z3' },
      availability: 'busy',
      skills: ['masonry', 'concrete work', 'brick work'],
      certifications: ['Mason Certified'],
      recruitmentSource: 'apna',
      applicationDate: '2025-03-08',
      interviewDate: '2025-03-10',
      hiringStatus: 'hired',
      onboardingStatus: 'completed',
      contractSigned: true,
      contractStartDate: '2025-03-12',
      contractEndDate: '2026-03-12',
      probationPeriod: '3 months',
      probationEndDate: '2025-06-12',
      salaryStructure: {
        baseSalary: 0,
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
        { id: 1, name: 'Office Complex', duration: '4 months', role: 'masonry_contractor', qualityRating: 4.2, issues: 0 },
        { id: 2, name: 'Residential Complex', duration: '6 months', role: 'masonry_contractor', qualityRating: 4.0, issues: 1 }
      ],
      references: [
        { id: 1, name: 'Previous Client', company: 'Premier Builders', phone: '+91 98765 43214', email: 'client@premier.com', relationship: 'Previous Client', verified: true },
        { id: 2, name: 'Previous Contractor', company: 'Elite Construction', phone: '+91 98765 43215', email: 'contractor@elite.com', relationship: 'Previous Partner', verified: false }
      ],
      documents: [
        { id: 1, name: 'License Certificate', type: 'license', url: '/documents/license-sharma-masonry.pdf', verified: true },
        { id: 2, name: 'Insurance Certificate', type: 'insurance', url: '/documents/insurance-sharma-masonry.pdf', verified: true },
        { id: 3, name: 'Tax Registration', type: 'tax', url: '/documents/tax-sharma-masonry.pdf', verified: true },
        { id: 4, name: 'Bank Details', type: 'bank', url: '/documents/bank-sharma-masonry.pdf', verified: true },
        { id: 5, name: 'Mason Certification', type: 'certification', url: '/documents/mason-cert-sharma-masonry.pdf', verified: true }
      ],
      communicationRestrictions: {
        directContact: false,
        contactMethod: 'engineer_only',
        authorizedContacts: ['site_engineer', 'project_manager'],
        contactHistory: [
          { date: '2025-03-19', contactType: 'secure_call', with: 'Anil Sharma', purpose: 'Brick work schedule' }
        ]
      }
    }
  ]);

  const [applications, setApplications] = useState([
    {
      id: 3,
      name: 'Electrical Experts',
      company: 'Electrical Experts Solutions',
      contactPerson: 'Priya Electrical',
      phone: '+91 98765 43214',
      email: 'contact@electricalexperts.com',
      address: '789 Electrical Rd, Delhi',
      specialization: 'electrical',
      experience: 5,
      rating: 0,
      projectsCompleted: 0,
      currentProjects: 0,
      totalAmount: 0,
      lastProject: '',
      lastProjectDate: '',
      status: 'inactive',
      licenseNumber: '',
      emergencyContact: '+91 98765 43215',
      bankDetails: {
        accountNumber: '',
        ifsc: '',
        bankName: ''
      },
      insuranceInfo: { policyNumber: '', expiryDate: '' },
      taxInfo: { gstin: '' },
      availability: 'available',
      skills: ['electrical', 'automation', 'lighting'],
      certifications: ['Electrical Inspector'],
      recruitmentSource: 'indeed',
      applicationDate: '2025-03-20',
      interviewDate: '',
      hiringStatus: 'applied',
      onboardingStatus: 'pending',
      contractSigned: false,
      contractStartDate: '',
      contractEndDate: '',
      probationPeriod: '3 months',
      probationEndDate: '',
      salaryStructure: {
        baseSalary: 0,
        projectBased: true,
        paymentTerms: 'milestone_based',
        advancePercentage: 25,
        milestonePercentage: 60,
        completionPercentage: 15
      },
      performanceMetrics: {
        qualityScore: 0,
        timelinessScore: 0,
        budgetCompliance: 0,
        safetyRecord: 'pending',
        lastEvaluation: ''
      },
      projects: [],
      references: [],
      documents: [],
      communicationRestrictions: {
        directContact: false,
        contactMethod: 'engineer_only',
        authorizedContacts: ['site_engineer', 'project_manager'],
        contactHistory: []
      }
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContractor, setSelectedContractor] = useState(contractors[0]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newContractor, setNewContractor] = useState({
    name: '',
    company: '',
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    specialization: '',
    experience: '',
    licenseNumber: '',
    emergencyContact: '',
    recruitmentSource: 'indeed'
  });

  const statusColors: { [key: string]: string } = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    suspended: 'bg-red-100 text-red-800',
    applied: 'bg-blue-100 text-blue-800',
    hired: 'bg-green-100 text-green-800'
  };

  const availabilityColors: { [key: string]: string } = {
    available: 'bg-green-100 text-green-800',
    busy: 'bg-yellow-100 text-yellow-800',
    unavailable: 'bg-red-100 text-red-800'
  };

  const specializationColors: { [key: string]: string } = {
    civil: 'bg-blue-100 text-blue-800',
    electrical: 'bg-yellow-100 text-yellow-800',
    plumbing: 'bg-green-100 text-green-800',
    masonry: 'bg-purple-100 text-purple-800',
    carpentry: 'bg-orange-100 text-orange-800'
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

  const allContractors = [...contractors, ...applications];

  const filteredContractors = allContractors.filter(contractor => {
    const matchesFilter = filter === 'all' || contractor.status === filter;
    const matchesSearch = contractor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contractor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contractor.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contractor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAddContractor = () => {
    if (!newContractor.name || !newContractor.company || !newContractor.contactPerson) return;

    const contractorObj = {
      id: allContractors.length + 1,
      ...newContractor,
      experience: parseInt(newContractor.experience) || 0,
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
      applicationDate: new Date().toISOString().split('T')[0],
      interviewDate: '',
      hiringStatus: 'applied',
      onboardingStatus: 'pending',
      contractSigned: false,
      contractStartDate: '',
      contractEndDate: '',
      probationPeriod: '3 months',
      probationEndDate: '',
      salaryStructure: {
        baseSalary: 0,
        projectBased: true,
        paymentTerms: 'milestone_based',
        advancePercentage: 25,
        milestonePercentage: 60,
        completionPercentage: 15
      },
      performanceMetrics: {
        qualityScore: 0,
        timelinessScore: 0,
        budgetCompliance: 0,
        safetyRecord: 'pending',
        lastEvaluation: ''
      },
      projects: [],
      references: [],
      documents: [],
      bankDetails: {
        accountNumber: '',
        ifsc: '',
        bankName: ''
      },
      insuranceInfo: { policyNumber: '', expiryDate: '' },
      taxInfo: { gstin: '' },
      communicationRestrictions: {
        directContact: false,
        contactMethod: 'engineer_only',
        authorizedContacts: ['site_engineer', 'project_manager'],
        contactHistory: []
      }
    };

    setApplications([contractorObj, ...applications]);
    setNewContractor({
      name: '',
      company: '',
      contactPerson: '',
      phone: '',
      email: '',
      address: '',
      specialization: '',
      experience: '',
      licenseNumber: '',
      emergencyContact: '',
      recruitmentSource: 'indeed'
    });
    setShowAddForm(false);
  };

  const handleHireContractor = (contractorId: number) => {
    const application = applications.find(app => app.id === contractorId);
    if (!application) return;

    const hiredContractor = {
      ...application,
      status: 'active',
      hiringStatus: 'hired',
      onboardingStatus: 'completed',
      contractSigned: true,
      contractStartDate: new Date().toISOString().split('T')[0],
      contractEndDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 year from now
      probationPeriod: '3 months',
      probationEndDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 months from now
      interviewDate: new Date().toISOString().split('T')[0],
      performanceMetrics: {
        ...application.performanceMetrics,
        lastEvaluation: new Date().toISOString().split('T')[0]
      }
    };

    setContractors([...contractors, hiredContractor]);
    setApplications(applications.filter(app => app.id !== contractorId));
    setSelectedContractor(hiredContractor);
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Contractor Management System</h1>
          <p className="text-gray-600 mt-2">
            Manage contractors, prevent unauthorized number exchanges, and ensure proper communication
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Contractor
          </Button>
        </div>
      </div>

      {/* Pain Point Alerts */}
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
              Contractor Management Pain Points & Solutions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center">
                  <Lock className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="font-medium text-blue-800">Number Exchange Prevention</span>
                </div>
                <p className="text-xs text-blue-700 mt-1">
                  All contractor numbers are masked. Communication goes through secure CRM channels only.
                </p>
              </div>
              
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-medium text-green-800">Hierarchical Communication</span>
                </div>
                <p className="text-xs text-green-700 mt-1">
                  Contractors can only communicate with assigned engineers. All contact through CRM.
                </p>
              </div>
              
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center">
                  <Eye className="h-5 w-5 text-purple-500 mr-2" />
                  <span className="font-medium text-purple-800">Real-time Monitoring</span>
                </div>
                <p className="text-xs text-purple-700 mt-1">
                  All communication logged in system. Prevents unauthorized bypass and business loss.
                </p>
              </div>
              
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center">
                  <Wrench className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="font-medium text-amber-800">Field Issue Resolution</span>
                </div>
                <p className="text-xs text-amber-700 mt-1">
                  Critical issues like 4-inch instead of 8-inch brick work resolved through system.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Contractor Form */}
      {showAddForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New Contractor</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Company Name</label>
                <Input
                  value={newContractor.name}
                  onChange={(e) => setNewContractor({...newContractor, name: e.target.value})}
                  placeholder="Contractor Company Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Contact Person</label>
                <Input
                  value={newContractor.contactPerson}
                  onChange={(e) => setNewContractor({...newContractor, contactPerson: e.target.value})}
                  placeholder="Contact Person Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <Input
                  value={newContractor.phone}
                  onChange={(e) => setNewContractor({...newContractor, phone: e.target.value})}
                  placeholder="Phone Number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  value={newContractor.email}
                  onChange={(e) => setNewContractor({...newContractor, email: e.target.value})}
                  placeholder="Email Address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Specialization</label>
                <select 
                  value={newContractor.specialization} 
                  onChange={(e) => setNewContractor({...newContractor, specialization: e.target.value})}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="">Select Specialization</option>
                  <option value="civil">Civil</option>
                  <option value="electrical">Electrical</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="masonry">Masonry</option>
                  <option value="carpentry">Carpentry</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Experience (years)</label>
                <Input
                  type="number"
                  value={newContractor.experience}
                  onChange={(e) => setNewContractor({...newContractor, experience: e.target.value})}
                  placeholder="Years of Experience"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">License Number</label>
                <Input
                  value={newContractor.licenseNumber}
                  onChange={(e) => setNewContractor({...newContractor, licenseNumber: e.target.value})}
                  placeholder="License Number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Emergency Contact</label>
                <Input
                  value={newContractor.emergencyContact}
                  onChange={(e) => setNewContractor({...newContractor, emergencyContact: e.target.value})}
                  placeholder="Emergency Contact Number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Recruitment Source</label>
                <select 
                  value={newContractor.recruitmentSource} 
                  onChange={(e) => setNewContractor({...newContractor, recruitmentSource: e.target.value})}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="indeed">Indeed</option>
                  <option value="apna">Apna</option>
                  <option value="naukri">Naukri</option>
                  <option value="referral">Referral</option>
                  <option value="direct">Direct</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Address</label>
                <Input
                  value={newContractor.address}
                  onChange={(e) => setNewContractor({...newContractor, address: e.target.value})}
                  placeholder="Full Address"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleAddContractor}>
                <Plus className="mr-2 h-4 w-4" />
                Add Contractor
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
                  placeholder="Search by contractor, company, or specialization..."
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
        {/* Contractor List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HardHat className="mr-2 h-5 w-5" />
                Contractors & Applications ({filteredContractors.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredContractors.map((contractor) => (
                  <div 
                    key={contractor.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedContractor?.id === contractor.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedContractor(contractor)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{contractor.name}</h3>
                      <div className="flex gap-2">
                        <Badge className={specializationColors[contractor.specialization]}>
                          {contractor.specialization}
                        </Badge>
                        <Badge className={statusColors[contractor.status]}>
                          {contractor.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{contractor.company}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-2">
                      <User className="mr-1 h-3 w-3" />
                      {contractor.contactPerson}
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Phone className="mr-1 h-3 w-3" />
                      {contractor.phone ? '***-***-' + contractor.phone.slice(-3) : 'No phone'}
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Mail className="mr-1 h-3 w-3" />
                      {contractor.email || 'No email'}
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <MapPin className="mr-1 h-3 w-3" />
                      {contractor.address ? contractor.address.substring(0, 30) + '...' : 'No address'}
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <HardHat className="mr-1 h-3 w-3" />
                      {contractor.experience || 0} years experience
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {contractor.rating || 0} rating
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <DollarSign className="mr-1 h-3 w-3" />
                      ₹{(contractor.totalAmount || 0).toLocaleString()} total
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Building className="mr-1 h-3 w-3" />
                      {contractor.projectsCompleted || 0} projects
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Calendar className="mr-1 h-3 w-3" />
                      Applied: {contractor.applicationDate}
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Wrench className="mr-1 h-3 w-3" />
                      {contractor.recruitmentSource}
                    </div>
                    {!contractor.communicationRestrictions.directContact && (
                      <div className="flex items-center text-xs text-blue-600 mt-2">
                        <Lock className="mr-1 h-3 w-3" />
                        Communication restricted
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contractor Details */}
        <div className="lg:col-span-2">
          {selectedContractor && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center">
                        <HardHat className="mr-2 h-5 w-5" />
                        {selectedContractor.name}
                      </CardTitle>
                      <p className="text-gray-600 mt-1">{selectedContractor.company}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={specializationColors[selectedContractor.specialization]}>
                        {selectedContractor.specialization}
                      </Badge>
                      <Badge className={statusColors[selectedContractor.status]}>
                        {selectedContractor.status}
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
                          <User className="mr-2 h-4 w-4 text-gray-600" />
                          <span className="text-gray-600">Contact Person: </span>
                          <span className="ml-1">{selectedContractor.contactPerson}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="mr-2 h-4 w-4 text-gray-600" />
                          <span className="text-gray-600">Primary: </span>
                          <span className="ml-1">
                            {selectedContractor.communicationRestrictions.directContact 
                              ? selectedContractor.phone 
                              : (selectedContractor.phone ? '***-***-' + selectedContractor.phone.slice(-3) : 'No phone')}
                          </span>
                        </div>
                        {selectedContractor.emergencyContact && (
                          <div className="flex items-center">
                            <Phone className="mr-2 h-4 w-4 text-gray-600" />
                            <span className="text-gray-600">Emergency: </span>
                            <span className="ml-1">
                              {selectedContractor.communicationRestrictions.directContact 
                                ? selectedContractor.emergencyContact 
                                : '***-***-' + selectedContractor.emergencyContact.slice(-3)}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center">
                          <Mail className="mr-2 h-4 w-4 text-gray-600" />
                          <span className="text-gray-600">Email: </span>
                          <span className="ml-1">{selectedContractor.email || 'No email'}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4 text-gray-600" />
                          <span className="text-gray-600">Address: </span>
                          <span className="ml-1">{selectedContractor.address || 'No address'}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Professional Details</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Specialization:</span>
                          <Badge className={specializationColors[selectedContractor.specialization]}>
                            {selectedContractor.specialization}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Experience:</span>
                          <span>{selectedContractor.experience || 0} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Rating:</span>
                          <div className="flex items-center">
                            <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span>{selectedContractor.rating || 0}</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Projects:</span>
                          <span>{selectedContractor.projectsCompleted || 0} completed</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Current Projects:</span>
                          <span>{selectedContractor.currentProjects || 0}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Availability:</span>
                          <Badge className={availabilityColors[selectedContractor.availability]}>
                            {selectedContractor.availability}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Recruitment Source:</span>
                          <Badge className={recruitmentSourceColors[selectedContractor.recruitmentSource]}>
                            {selectedContractor.recruitmentSource}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Application Date:</span>
                          <span>{selectedContractor.applicationDate}</span>
                        </div>
                        {selectedContractor.interviewDate && (
                          <div className="flex justify-between">
                            <span className="text-gray-600">Interview Date:</span>
                            <span>{selectedContractor.interviewDate}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Hiring Status:</span>
                          <Badge className={statusColors[selectedContractor.hiringStatus]}>
                            {selectedContractor.hiringStatus}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Onboarding Status:</span>
                          <Badge className={statusColors[selectedContractor.onboardingStatus]}>
                            {selectedContractor.onboardingStatus}
                          </Badge>
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
                          <span className="font-medium">Direct Contact:</span> {selectedContractor.communicationRestrictions.directContact ? 'Allowed' : 'Restricted'}
                          </p>
                        <p className="text-sm text-blue-700">
                          <span className="font-medium">Contact Method:</span> {selectedContractor.communicationRestrictions.contactMethod.replace('_', ' ')}
                        </p>
                        <p className="text-sm text-blue-700">
                          <span className="font-medium">Authorized Contacts:</span> {selectedContractor.communicationRestrictions.authorizedContacts.join(', ')}
                        </p>
                        {selectedContractor.communicationRestrictions.contactHistory.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm text-blue-700 font-medium">Contact History:</p>
                            <ul className="text-xs text-blue-700 mt-1">
                              {selectedContractor.communicationRestrictions.contactHistory.map((contact, idx) => (
                                <li key={idx} className="ml-2">
                                  {contact.date}: {contact.contactType} with {contact.with} - {contact.purpose}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <p className="text-sm text-blue-700 mt-2">
                          <AlertTriangle className="inline mr-1 h-3 w-3" />
                          All communication must go through CRM system to prevent unauthorized contact exchanges.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Skills & Certifications */}
                  {(selectedContractor.skills?.length > 0 || selectedContractor.certifications?.length > 0) && (
                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Skills & Certifications</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedContractor.skills?.map((skill, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center">
                            <Wrench className="mr-1 h-3 w-3" />
                            {skill}
                          </Badge>
                        ))}
                        {selectedContractor.certifications?.map((cert, index) => (
                          <Badge key={index} variant="outline" className="flex items-center">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Projects */}
                  {selectedContractor.projects?.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Previous Projects ({selectedContractor.projects.length})</h4>
                      <div className="space-y-3">
                        {selectedContractor.projects.map((project) => (
                          <div key={project.id} className="border rounded-lg p-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium">{project.name}</div>
                                <Badge className={`${specializationColors[project.role.split('_')[0]]} mt-1`}>
                                  {project.role.replace('_', ' ')}
                                </Badge>
                              </div>
                              <div className="flex flex-col items-end">
                                <div className="flex items-center">
                                  <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span>{project.qualityRating}</span>
                                </div>
                                <div className="text-xs text-gray-600 mt-1">{project.duration}</div>
                                <div className="text-xs text-gray-600">
                                  {project.issues} {project.issues === 1 ? 'issue' : 'issues'}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* References */}
                  {selectedContractor.references?.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-medium mb-3">References ({selectedContractor.references.length})</h4>
                      <div className="space-y-3">
                        {selectedContractor.references.map((reference) => (
                          <div key={reference.id} className="border rounded-lg p-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="font-medium">{reference.name}</div>
                                <div className="text-sm text-gray-600">{reference.company}</div>
                                <div className="text-xs text-gray-500 mt-1">{reference.relationship}</div>
                              </div>
                              <Badge variant={reference.verified ? "default" : "secondary"} className="text-xs">
                                {reference.verified ? 'Verified' : 'Pending'}
                              </Badge>
                            </div>
                            <div className="flex items-center text-xs text-gray-600 mt-2">
                              <Phone className="mr-1 h-3 w-3" />
                              {reference.phone}
                            </div>
                            <div className="flex items-center text-xs text-gray-600 mt-1">
                              <Mail className="mr-1 h-3 w-3" />
                              {reference.email}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Documents */}
                  {selectedContractor.documents?.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Documents ({selectedContractor.documents.length})</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedContractor.documents.map((document) => (
                          <Badge key={document.id} variant="secondary" className="flex items-center">
                            <FileText className="mr-1 h-3 w-3" />
                            {document.name}
                            {document.verified && (
                              <CheckCircle className="ml-1 h-3 w-3" />
                            )}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Financial Information */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Financial Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium mb-2">Bank Details</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Bank:</span>
                            <span>{selectedContractor.bankDetails?.bankName || 'Not Provided'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Account:</span>
                            <span>
                              {selectedContractor.bankDetails?.accountNumber 
                                ? selectedContractor.bankDetails.accountNumber.slice(0, 4) + '****' + selectedContractor.bankDetails.accountNumber.slice(-4) 
                                : 'Not Provided'}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">IFSC:</span>
                            <span>{selectedContractor.bankDetails?.ifsc || 'Not Provided'}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium mb-2">Insurance & Tax</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Policy:</span>
                            <span>{selectedContractor.insuranceInfo?.policyNumber || 'Not Provided'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Expiry:</span>
                            <span>{selectedContractor.insuranceInfo?.expiryDate || 'Not Provided'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">GSTIN:</span>
                            <span>{selectedContractor.taxInfo?.gstin || 'Not Provided'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Salary Structure */}
                  {selectedContractor.salaryStructure && (
                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Salary Structure</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border rounded-lg p-3 text-center">
                          <div className="text-lg font-bold">{selectedContractor.salaryStructure.advancePercentage}%</div>
                          <div className="text-sm text-gray-600 mt-1">Advance</div>
                        </div>
                        <div className="border rounded-lg p-3 text-center">
                          <div className="text-lg font-bold">{selectedContractor.salaryStructure.milestonePercentage}%</div>
                          <div className="text-sm text-gray-600 mt-1">Milestone</div>
                        </div>
                        <div className="border rounded-lg p-3 text-center">
                          <div className="text-lg font-bold">{selectedContractor.salaryStructure.completionPercentage}%</div>
                          <div className="text-sm text-gray-600 mt-1">Completion</div>
                        </div>
                      </div>
                      <div className="mt-3 text-sm text-gray-600">
                        <span className="font-medium">Payment Terms:</span> {selectedContractor.salaryStructure.paymentTerms.replace('_', ' ')}
                      </div>
                    </div>
                  )}

                  {/* Performance Metrics */}
                  {selectedContractor.performanceMetrics && (
                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Performance Metrics</h4>
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div className="border rounded-lg p-3 text-center">
                          <div className="text-lg font-bold">{selectedContractor.performanceMetrics.qualityScore}</div>
                          <div className="text-sm text-gray-600 mt-1">Quality</div>
                        </div>
                        <div className="border rounded-lg p-3 text-center">
                          <div className="text-lg font-bold">{selectedContractor.performanceMetrics.timelinessScore}</div>
                          <div className="text-sm text-gray-600 mt-1">Timeliness</div>
                        </div>
                        <div className="border rounded-lg p-3 text-center">
                          <div className="text-lg font-bold">{selectedContractor.performanceMetrics.budgetCompliance}</div>
                          <div className="text-sm text-gray-600 mt-1">Budget</div>
                        </div>
                        <div className="border rounded-lg p-3 text-center">
                          <div className="text-lg font-bold capitalize">{selectedContractor.performanceMetrics.safetyRecord}</div>
                          <div className="text-sm text-gray-600 mt-1">Safety</div>
                        </div>
                        <div className="border rounded-lg p-3 text-center">
                          <div className="text-lg font-bold">{selectedContractor.performanceMetrics.lastEvaluation || 'Never'}</div>
                          <div className="text-sm text-gray-600 mt-1">Last Eval</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 flex-wrap">
                    {selectedContractor.hiringStatus === 'applied' && (
                      <Button 
                        variant="outline" 
                        onClick={() => handleHireContractor(selectedContractor.id)}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Hire Contractor
                      </Button>
                    )}
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
                      <Users className="mr-2 h-4 w-4" />
                      Assign Project
                    </Button>
                    <Button variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      View Contracts
                    </Button>
                    <Button variant="outline">
                      <DollarSign className="mr-2 h-4 w-4" />
                      Manage Payments
                    </Button>
                  </div>
                  
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-sm text-yellow-800">
                      <AlertTriangle className="inline mr-1 h-4 w-4" />
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