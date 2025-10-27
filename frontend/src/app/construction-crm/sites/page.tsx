// Simplified Site Management Page for Construction CRM
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
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
  Ruler,
  Lock,
  Unlock,
  Shield,
  TrendingUp,
  TrendingDown,
  User,
  DollarSign
} from 'lucide-react';

export default function SiteManagementPage() {
  const [sites, setSites] = useState([
    {
      id: 1,
      name: 'Downtown Complex - Site A',
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
      client: 'Metro Developments',
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
      }
    },
    {
      id: 2,
      name: 'Residential Towers - Site B',
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
      client: 'Urban Homes Ltd',
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
        authorizedContacts: ['site_engineer', 'project_manager'],
        contactHistory: [
          { date: '2025-03-19', contactType: 'secure_call', with: 'Suresh Reddy', purpose: 'Electrical inspection' },
          { date: '2025-03-17', contactType: 'secure_message', with: 'Priya Patel', purpose: 'Outlet spacing issue' }
        ]
      }
    }
  ]);

  const [engineers] = useState([
    { id: 1, name: 'Anil Sharma', maxSites: 2, currentSites: 2, specialty: 'civil', contact: 'anil@construction.com' },
    { id: 2, name: 'Priya Patel', maxSites: 2, currentSites: 2, specialty: 'electrical', contact: 'priya@construction.com' },
    { id: 3, name: 'Suresh Reddy', maxSites: 2, currentSites: 1, specialty: 'structural', contact: 'suresh@construction.com' }
  ]);

  const [contractors] = useState([
    { id: 1, name: 'Raj Construction', specialty: 'civil', rating: 4.5 },
    { id: 2, name: 'Sharma Masonry', specialty: 'masonry', rating: 4.2 },
    { id: 3, name: 'Electrical Experts', specialty: 'electrical', rating: 4.0 }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSite, setSelectedSite] = useState(sites[0]);
  const [newSite, setNewSite] = useState({
    name: '',
    address: '',
    projectType: 'residential',
    size: '',
    siteEngineerId: '',
    area: '',
    client: '',
    projectValue: ''
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const statusColors: Record<string, string> = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    suspended: 'bg-red-100 text-red-800',
    planning: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-blue-100 text-blue-800'
  };

  const phaseColors: Record<string, string> = {
    pre_construction: 'bg-gray-100 text-gray-800',
    foundation: 'bg-blue-100 text-blue-800',
    framing: 'bg-yellow-100 text-yellow-800',
    electrical: 'bg-purple-100 text-purple-800',
    plumbing: 'bg-green-100 text-green-800',
    finishing: 'bg-pink-100 text-pink-800'
  };

  const priorityColors: Record<string, string> = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
    urgent: 'bg-rose-100 text-rose-800'
  };

  const issueTypeColors: Record<string, string> = {
    spacing: 'bg-purple-100 text-purple-800',
    dimension: 'bg-blue-100 text-blue-800',
    code_violation: 'bg-red-100 text-red-800',
    conflict: 'bg-yellow-100 text-yellow-800',
    clarity: 'bg-indigo-100 text-indigo-800'
  };

  const contactMethodColors: Record<string, string> = {
    crm_only: 'bg-blue-100 text-blue-800',
    engineer_only: 'bg-green-100 text-green-800',
    restricted: 'bg-red-100 text-red-800',
    direct: 'bg-purple-100 text-purple-800'
  };

  const filteredSites = sites.filter(site => {
    const matchesFilter = filter === 'all' || site.status === filter;
    const matchesSearch = site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          site.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          site.siteEngineer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          site.client.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAddSite = () => {
    if (!newSite.name || !newSite.address || !newSite.siteEngineerId) return;

    const siteObj = {
      id: sites.length + 1,
      ...newSite,
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
      location: newSite.address.split(',')[0],
      area: newSite.area || '250 sq ft',
      projectValue: parseInt(newSite.projectValue) || 0,
      lastUpdated: new Date().toISOString().split('T')[0],
      reports: [],
      upcomingTasks: [],
      siteIssues: [],
      communicationRestrictions: {
        directContact: false,
        contactMethod: 'crm_only',
        authorizedContacts: ['site_engineer', 'project_manager'],
        contactHistory: []
      }
    };

    setSites([siteObj as any, ...sites]);
    setNewSite({
      name: '',
      address: '',
      projectType: 'residential',
      size: '',
      siteEngineerId: '',
      area: '',
      client: '',
      projectValue: ''
    });
    setShowAddForm(false);
  };

  const handleAddContractorToSite = (siteId: number, contractorId: number) => {
    setSites(prevSites => 
      prevSites.map(site => {
        if (site.id === siteId) {
          const contractor = contractors.find(c => c.id === contractorId);
          if (contractor && !site.assignedContractors.some(c => c.id === contractorId)) {
            return {
              ...site,
              assignedContractors: [...site.assignedContractors, { 
                id: contractorId, 
                name: contractor.name, 
                status: 'pending',
                workType: contractor.specialty,
                contactMethod: 'crm_only'
              }],
              totalContractors: site.totalContractors + 1
            };
          }
        }
        return site;
      })
    );
    
    if (selectedSite.id === siteId) {
      const contractor = contractors.find(c => c.id === contractorId);
      if (contractor && !selectedSite.assignedContractors.some(c => c.id === contractorId)) {
        setSelectedSite(prevSite => ({
          ...prevSite,
          assignedContractors: [...prevSite.assignedContractors, { 
            id: contractorId, 
            name: contractor.name, 
            status: 'pending',
            workType: contractor.specialty,
            contactMethod: 'crm_only'
          }],
          totalContractors: prevSite.totalContractors + 1
        }));
      }
    }
  };

  // Check if any engineer is overloaded
  const overloadedEngineers = engineers.filter(eng => 
    sites.filter(s => (typeof s.siteEngineerId === 'string' ? parseInt(s.siteEngineerId) : s.siteEngineerId) === eng.id).length > eng.maxSites
  );

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Site Management System</h1>
          <p className="text-gray-600 mt-2">
            Manage sites, engineers, contractors, and real-time progress
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Site
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
            The following engineers are managing more sites than their limit:
            {overloadedEngineers.map(eng => ` ${eng.name} (${sites.filter(s => (typeof s.siteEngineerId === 'string' ? parseInt(s.siteEngineerId) : s.siteEngineerId) === eng.id).length}/${eng.maxSites})`).join(', ')}
          </p>
          <p className="text-xs text-red-600 mt-1">
            Assign additional engineers to balance the workload
          </p>
        </div>
      )}

      {/* Add Site Form */}
      {showAddForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New Site</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Site Name</label>
                <Input
                  value={newSite.name}
                  onChange={(e) => setNewSite({...newSite, name: e.target.value})}
                  placeholder="Site Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <Input
                  value={newSite.address}
                  onChange={(e) => setNewSite({...newSite, address: e.target.value})}
                  placeholder="Full Address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Project Type</label>
                <select 
                  value={newSite.projectType} 
                  onChange={(e) => setNewSite({...newSite, projectType: e.target.value})}
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
                  value={newSite.siteEngineerId} 
                  onChange={(e) => setNewSite({...newSite, siteEngineerId: e.target.value})}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="">Select Engineer</option>
                  {engineers.map(eng => (
                    <option key={eng.id} value={eng.id}>
                      {eng.name} - {eng.specialty} ({sites.filter(s => (typeof s.siteEngineerId === 'string' ? parseInt(s.siteEngineerId) : s.siteEngineerId) === eng.id).length}/{eng.maxSites} sites)
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Size (sq ft)</label>
                <Input
                  value={newSite.size}
                  onChange={(e) => setNewSite({...newSite, size: e.target.value})}
                  placeholder="Size in sq ft"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Client</label>
                <Input
                  value={newSite.client}
                  onChange={(e) => setNewSite({...newSite, client: e.target.value})}
                  placeholder="Client Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Area</label>
                <Input
                  value={newSite.area}
                  onChange={(e) => setNewSite({...newSite, area: e.target.value})}
                  placeholder="Area details"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Project Value (₹)</label>
                <Input
                  type="number"
                  value={newSite.projectValue}
                  onChange={(e) => setNewSite({...newSite, projectValue: e.target.value})}
                  placeholder="Project Value in Rupees"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleAddSite}>
                <Plus className="mr-2 h-4 w-4" />
                Add Site
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
                  placeholder="Search by site, address, engineer, or client..."
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
        {/* Sites List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Building className="mr-2 h-5 w-5" />
                Sites ({filteredSites.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredSites.map((site) => {
                  const engineer = engineers.find(e => e.id === (typeof site.siteEngineerId === 'string' ? parseInt(site.siteEngineerId) : site.siteEngineerId));
                  const isOverloaded = engineer && sites.filter(s => (typeof s.siteEngineerId === 'string' ? parseInt(s.siteEngineerId) : s.siteEngineerId) === engineer.id).length > engineer.maxSites;
                  
                  return (
                    <div 
                      key={site.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedSite?.id === site.id 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:bg-gray-50'
                      } ${isOverloaded ? 'border-red-300 bg-red-50' : ''}`}
                      onClick={() => setSelectedSite(site)}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium">{site.name}</h3>
                        <div className="flex gap-2">
                          <Badge className={statusColors[site.status as keyof typeof statusColors]}>
                            {site.status}
                          </Badge>
                          <Badge variant="outline">
                            {site.progress}%
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{site.client}</p>
                      <div className="flex items-center text-xs text-gray-500 mt-2">
                        <MapPin className="mr-1 h-3 w-3" />
                        {site.location}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <User className="mr-1 h-3 w-3" />
                        {site.siteEngineer} ({site.assignedContractors.length} contractors)
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Square className="mr-1 h-3 w-3" />
                        {site.area}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <DollarSign className="mr-1 h-3 w-3" />
                        ₹{site.projectValue?.toLocaleString()}
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress: {site.progress}%</span>
                          <span>{site.currentPhase.replace('_', ' ')}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${site.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      {site.criticalIssues > 0 && (
                        <div className="flex items-center text-xs text-red-600 mt-2">
                          <AlertTriangle className="mr-1 h-3 w-3" />
                          {site.criticalIssues} critical issue{site.criticalIssues > 1 ? 's' : ''}
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

        {/* Site Details */}
        <div className="lg:col-span-2">
          {selectedSite && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center">
                        <Building className="mr-2 h-5 w-5" />
                        {selectedSite.name}
                      </CardTitle>
                      <p className="text-gray-600 mt-1">{selectedSite.client} • {selectedSite.area}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={statusColors[selectedSite.status as keyof typeof statusColors]}>
                        {selectedSite.status}
                      </Badge>
                      <Badge className={phaseColors[selectedSite.currentPhase as keyof typeof phaseColors]}>
                        {selectedSite.currentPhase.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-medium mb-3">Site Information</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Address:</span>
                          <span>{selectedSite.address}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Project Type:</span>
                          <span>{selectedSite.projectType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Start Date:</span>
                          <span>{selectedSite.startDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Expected Completion:</span>
                          <span>{selectedSite.expectedCompletion}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Project Value:</span>
                          <span>₹{selectedSite.projectValue?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Area:</span>
                          <span>{selectedSite.area}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Current Phase:</span>
                          <Badge className={phaseColors[selectedSite.currentPhase]}>
                            {selectedSite.currentPhase.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Team Information</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Site Engineer:</span>
                          <div>
                            <div>{selectedSite.siteEngineer}</div>
                            <div className="text-xs text-gray-600">
                              {engineers.find(e => e.id === (typeof selectedSite.siteEngineerId === 'string' ? parseInt(selectedSite.siteEngineerId) : selectedSite.siteEngineerId))?.currentSites || 0}/
                              {engineers.find(e => e.id === (typeof selectedSite.siteEngineerId === 'string' ? parseInt(selectedSite.siteEngineerId) : selectedSite.siteEngineerId))?.maxSites || 2} sites
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Contractors:</span>
                          <span>{selectedSite.totalContractors}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Active Contractors:</span>
                          <span>{selectedSite.activeContractors}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Pending Tasks:</span>
                          <span>{selectedSite.pendingTasks}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Critical Issues:</span>
                          <span>{selectedSite.criticalIssues}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Updated:</span>
                          <span>{selectedSite.lastUpdated}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Progress:</span>
                          <span>{selectedSite.progress}%</span>
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
                          <span className="font-medium">Direct Contact:</span> {selectedSite.communicationRestrictions.directContact ? 'Allowed' : 'Restricted'}
                          </p>
                        <p className="text-sm text-blue-700">
                          <span className="font-medium">Contact Method:</span> {selectedSite.communicationRestrictions.contactMethod.replace('_', ' ')}
                        </p>
                        <p className="text-sm text-blue-700">
                          <span className="font-medium">Authorized Contacts:</span> {selectedSite.communicationRestrictions.authorizedContacts.join(', ')}
                        </p>
                        {selectedSite.communicationRestrictions.contactHistory.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm text-blue-700 font-medium">Contact History:</p>
                            <ul className="text-xs text-blue-700 mt-1">
                              {selectedSite.communicationRestrictions.contactHistory.map((contact, idx) => (
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

                  {/* Assigned Contractors */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">Assigned Contractors ({selectedSite.assignedContractors.length})</h4>
                      <Button variant="outline" size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Contractor
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {selectedSite.assignedContractors.map((contractor, index) => (
                        <div key={index} className="flex justify-between items-center p-3 border rounded">
                          <div>
                            <div className="font-medium">{contractor.name}</div>
                            <Badge className={`${contactMethodColors[contractor.contactMethod as keyof typeof contactMethodColors]} text-xs mt-1`}>
                              {contractor.contactMethod.replace('_', ' ')}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={contractor.status === 'active' ? 'default' : 'secondary'}>
                              {contractor.status}
                            </Badge>
                            <Badge className={contactMethodColors[contractor.workType as keyof typeof contactMethodColors]}>
                              {contractor.workType}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-3">
                      <label className="block text-sm font-medium mb-1">Add Contractor</label>
                      <select 
                        onChange={(e) => handleAddContractorToSite(selectedSite.id, parseInt(e.target.value))}
                        className="w-full border rounded-md px-3 py-2"
                        defaultValue=""
                      >
                        <option value="">Select Contractor to Add</option>
                        {contractors
                          .filter(c => !selectedSite.assignedContractors.some(sc => sc.id === c.id))
                          .map(c => (
                            <option key={c.id} value={c.id}>
                              {c.name} ({c.specialty})
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  {/* Site Issues */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">Site Issues ({selectedSite.siteIssues.length})</h4>
                      <Button variant="outline" size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Report Issue
                      </Button>
                    </div>

                    <div className="space-y-3">
                      {selectedSite.siteIssues.map((issue) => (
                        <div key={issue.id} className="border-l-4 border-red-200 pl-4 py-2 bg-red-50 rounded-r">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center">
                                <Badge className={`${issueTypeColors[issue.type as keyof typeof issueTypeColors]} mr-2`}>
                                  {issue.type.replace('_', ' ')}
                                </Badge>
                                <Badge className={priorityColors[issue.priority]}>
                                  {issue.priority}
                                </Badge>
                              </div>
                              <p className="font-medium mt-2">{issue.description}</p>
                              <div className="flex items-center text-xs text-gray-600 mt-1">
                                <User className="mr-1 h-3 w-3" />
                                Reported by {issue.reportedBy} on {issue.reportedDate}
                              </div>
                              {issue.resolutionNotes && (
                                <p className="text-sm text-gray-700 mt-2">
                                  <span className="font-medium">Resolution:</span> {issue.resolutionNotes}
                                </p>
                              )}
                              {issue.measurements && (
                                <div className="mt-2 p-2 bg-white border rounded">
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Expected:</span>
                                    <span>{issue.measurements.expected} {issue.measurements.unit}</span>
                                  </div>
                                  <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Actual:</span>
                                    <span>{issue.measurements.actual} {issue.measurements.unit}</span>
                                  </div>
                                </div>
                              )}
                            </div>
                            <Badge className={statusColors[issue.status as keyof typeof statusColors]}>
                              {issue.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reports */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Recent Reports ({selectedSite.reports.length})</h4>
                    <div className="space-y-3">
                      {selectedSite.reports.map((report) => (
                        <div key={report.id} className="flex justify-between items-center p-3 border rounded">
                          <div>
                            <div className="font-medium">{report.content}</div>
                            <div className="text-xs text-gray-600 mt-1">{report.date}</div>
                          </div>
                          <Badge className={statusColors[report.status as keyof typeof statusColors]}>
                            {report.status.replace('-', ' ')}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Upcoming Tasks */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Upcoming Tasks ({selectedSite.upcomingTasks.length})</h4>
                    <div className="space-y-3">
                      {selectedSite.upcomingTasks.map((task) => (
                        <div key={task.id} className="flex justify-between items-center p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{task.task}</div>
                            <div className="text-sm text-gray-600 mt-1">Due: {task.dueDate}</div>
                          </div>
                          <Badge className={priorityColors[task.priority]}>
                            {task.priority}
                          </Badge>
                        </div>
                      ))}
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