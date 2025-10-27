// Enhanced Client Management with Requirement Capture
'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Home, 
  FileText, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  User,
  Search,
  Plus,
  Eye,
  EyeOff,
  Building,
  Sofa,
  Car,
  Monitor,
  Wine,
  Utensils
} from 'lucide-react';

export default function EnhancedClientManagementPage() {
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'Rajesh Gupta',
      company: 'Metro Developments',
      contactPerson: 'Rajesh Gupta',
      primaryPhone: '+91 98765 43210',
      secondaryPhone: '+91 98765 43211',
      email: 'rajesh@metrodev.com',
      address: 'Delhi, India',
      status: 'active',
      clientType: 'commercial',
      projects: [
        {
          id: 1,
          name: 'Downtown Complex',
          type: 'commercial',
          status: 'active',
          startDate: '2025-01-15',
          budget: 12500000,
          requirements: {
            size: '250 sq ft',
            rooms: 12,
            entries: 2,
            bathrooms: 8,
            audioVideoRooms: 1,
            barRooms: 1,
            parking: 20,
            drawingRooms: 2,
            kitchens: 3,
            customFeatures: ['smart home automation', 'energy efficient design'],
            preferences: ['modern design', 'premium materials', 'sustainable features']
          },
          designOptions: [
            { id: 1, name: 'Option A - Modern Layout', size: '20x40', cost: 12000000, status: 'pending_client_approval' },
            { id: 2, name: 'Option B - Traditional Layout', size: '25x35', cost: 11500000, status: 'client_rejected' },
            { id: 3, name: 'Option C - Luxury Layout', size: '30x30', cost: 13000000, status: 'client_approved' }
          ],
          currentDesign: 'Option C - Luxury Layout',
          contractor: 'Raj Construction',
          timeline: '18 months'
        }
      ],
      requirements: {
        contactVisibility: 'restricted', // Only managers can see real numbers
        projectPreferences: ['commercial', 'residential'],
        budgetRange: '1cr-5cr',
        timeline: '6-18 months',
        specialRequests: ['eco-friendly', 'modern design']
      },
      contactRestrictions: {
        directNumber: false, // Client numbers are restricted
        contactMethod: 'through_crm', // All contact through CRM
        authorizedContacts: ['manager', 'senior_engineer']
      },
      lastContact: '2025-03-20',
      totalProjects: 1,
      totalValue: 12500000
    },
    {
      id: 2,
      name: 'Priya Sharma',
      company: 'Urban Homes Ltd',
      contactPerson: 'Priya Sharma',
      primaryPhone: '+91 98765 43212',
      secondaryPhone: '+91 98765 43213',
      email: 'priya@urbanhomes.com',
      address: 'Mumbai, India',
      status: 'active',
      clientType: 'residential',
      projects: [
        {
          id: 2,
          name: 'Residential Towers',
          type: 'residential',
          status: 'active',
          startDate: '2025-02-01',
          budget: 8750000,
          requirements: {
            size: '200 sq ft',
            rooms: 8,
            entries: 1,
            bathrooms: 6,
            audioVideoRooms: 0,
            barRooms: 0,
            parking: 15,
            drawingRooms: 1,
            kitchens: 2,
            customFeatures: ['garden area', 'open floor plan'],
            preferences: ['family friendly', 'spacious design']
          },
          designOptions: [
            { id: 1, name: 'Family Layout', size: '20x30', cost: 8500000, status: 'client_approved' }
          ],
          currentDesign: 'Family Layout',
          contractor: 'Sharma Masonry',
          timeline: '12 months'
        }
      ],
      requirements: {
        contactVisibility: 'restricted',
        projectPreferences: ['residential'],
        budgetRange: '50L-1cr',
        timeline: '6-12 months',
        specialRequests: ['family friendly', 'eco-conscious']
      },
      contactRestrictions: {
        directNumber: false,
        contactMethod: 'through_crm',
        authorizedContacts: ['manager', 'senior_engineer']
      },
      lastContact: '2025-03-18',
      totalProjects: 1,
      totalValue: 8750000
    }
  ]);

  const [allEmployees] = useState([
    {
      id: 1,
      name: 'Anil Sharma',
      role: 'Site Engineer',
      department: 'Engineering',
      phone: '+91 98765 43214',
      email: 'anil@construction.com',
      visibleToClient: false, // Employee numbers not visible to clients
      canContactClient: true,
      contactRestrictions: {
        directNumber: false, // Employee numbers are hidden
        contactMethod: 'through_crm' // All contact through CRM
      }
    },
    {
      id: 2,
      name: 'Priya Patel',
      role: 'Designer',
      department: 'Design',
      phone: '+91 98765 43215',
      email: 'priya@design.com',
      visibleToClient: false,
      canContactClient: true,
      contactRestrictions: {
        directNumber: false,
        contactMethod: 'through_crm'
      }
    },
    {
      id: 3,
      name: 'Manager',
      role: 'Project Manager',
      department: 'Management',
      phone: '+91 98765 43216',
      email: 'manager@construction.com',
      visibleToClient: true, // Managers can be visible to clients
      canContactClient: true,
      contactRestrictions: {
        directNumber: true,
        contactMethod: 'direct'
      }
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState(clients[0]);
  const [showAddClient, setShowAddClient] = useState(false);
  const [showRequirementForm, setShowRequirementForm] = useState(false);
  const [newRequirement, setNewRequirement] = useState({
    size: '',
    rooms: '',
    entries: '',
    bathrooms: '',
    audioVideoRooms: '',
    barRooms: '',
    parking: '',
    drawingRooms: '',
    kitchens: '',
    customFeatures: '',
    preferences: ''
  });

  const [newClient, setNewClient] = useState({
    name: '',
    company: '',
    contactPerson: '',
    primaryPhone: '',
    secondaryPhone: '',
    email: '',
    address: '',
    clientType: 'residential'
  });

  const statusColors: Record<string, string> = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    lead: 'bg-yellow-100 text-yellow-800',
    prospect: 'bg-blue-100 text-blue-800'
  };

  const typeColors: Record<string, string> = {
    residential: 'bg-purple-100 text-purple-800',
    commercial: 'bg-blue-100 text-blue-800',
    industrial: 'bg-gray-100 text-gray-800'
  };

  const designStatusColors: Record<string, string> = {
    'pending_client_approval': 'bg-yellow-100 text-yellow-800',
    'client_rejected': 'bg-red-100 text-red-800',
    'client_approved': 'bg-green-100 text-green-800'
  };

  const filteredClients = clients.filter(client => {
    const matchesFilter = filter === 'all' || client.status === filter;
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAddClient = () => {
    const newClientObj = {
      id: clients.length + 1,
      ...newClient,
      status: 'lead',
      projects: [],
      requirements: {
        contactVisibility: 'restricted',
        projectPreferences: [],
        budgetRange: '',
        timeline: '',
        specialRequests: []
      },
      contactRestrictions: {
        directNumber: false,
        contactMethod: 'through_crm',
        authorizedContacts: ['manager', 'senior_engineer']
      },
      lastContact: new Date().toISOString().split('T')[0],
      totalProjects: 0,
      totalValue: 0
    };
    
    setClients([newClientObj, ...clients]);
    setNewClient({
      name: '',
      company: '',
      contactPerson: '',
      primaryPhone: '',
      secondaryPhone: '',
      email: '',
      address: '',
      clientType: 'residential'
    });
    setShowAddClient(false);
  };

  const handleAddRequirement = () => {
    if (!newRequirement.size) return;

    const updatedClients = clients.map(client => {
      if (client.id === selectedClient.id && client.projects.length > 0) {
        const updatedProjects = client.projects.map(project => {
          if (project.id === client.projects[0].id) { // For demo, just update the first project
            return {
              ...project,
              requirements: {
                ...project.requirements,
                size: newRequirement.size || project.requirements.size,
                rooms: newRequirement.rooms ? parseInt(newRequirement.rooms) : project.requirements.rooms,
                entries: newRequirement.entries ? parseInt(newRequirement.entries) : project.requirements.entries,
                bathrooms: newRequirement.bathrooms ? parseInt(newRequirement.bathrooms) : project.requirements.bathrooms,
                audioVideoRooms: newRequirement.audioVideoRooms ? parseInt(newRequirement.audioVideoRooms) : project.requirements.audioVideoRooms,
                barRooms: newRequirement.barRooms ? parseInt(newRequirement.barRooms) : project.requirements.barRooms,
                parking: newRequirement.parking ? parseInt(newRequirement.parking) : project.requirements.parking,
                drawingRooms: newRequirement.drawingRooms ? parseInt(newRequirement.drawingRooms) : project.requirements.drawingRooms,
                kitchens: newRequirement.kitchens ? parseInt(newRequirement.kitchens) : project.requirements.kitchens,
                customFeatures: newRequirement.customFeatures ? [...project.requirements.customFeatures, newRequirement.customFeatures] : project.requirements.customFeatures,
                preferences: newRequirement.preferences ? [...project.requirements.preferences, newRequirement.preferences] : project.requirements.preferences
              }
            };
          }
          return project;
        });
        
        return {
          ...client,
          projects: updatedProjects
        };
      }
      return client;
    });

    setClients(updatedClients);
    const updatedClient = updatedClients.find(c => c.id === selectedClient.id);
    if (updatedClient) {
      setSelectedClient(updatedClient);
    }
    setNewRequirement({
      size: '',
      rooms: '',
      entries: '',
      bathrooms: '',
      audioVideoRooms: '',
      barRooms: '',
      parking: '',
      drawingRooms: '',
      kitchens: '',
      customFeatures: '',
      preferences: ''
    });
    setShowRequirementForm(false);
  };

  // Function to toggle phone number visibility for employees
  const [showEmployeeNumbers, setShowEmployeeNumbers] = useState(false);

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Client Management System</h1>
          <p className="text-gray-600 mt-2">
            Capture client requirements, manage contacts, and control visibility
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button onClick={() => setShowAddClient(!showAddClient)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Client
          </Button>
          <Button variant="outline" onClick={() => setShowEmployeeNumbers(!showEmployeeNumbers)}>
            {showEmployeeNumbers ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
            {showEmployeeNumbers ? 'Hide' : 'Show'} Employee Numbers
          </Button>
        </div>
      </div>

      {/* Add Client Form */}
      {showAddClient && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add New Client</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Client Name</label>
                <Input
                  value={newClient.name}
                  onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                  placeholder="Client Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Company</label>
                <Input
                  value={newClient.company}
                  onChange={(e) => setNewClient({...newClient, company: e.target.value})}
                  placeholder="Company Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Contact Person</label>
                <Input
                  value={newClient.contactPerson}
                  onChange={(e) => setNewClient({...newClient, contactPerson: e.target.value})}
                  placeholder="Contact Person"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Client Type</label>
                <select 
                  value={newClient.clientType} 
                  onChange={(e) => setNewClient({...newClient, clientType: e.target.value})}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Primary Phone</label>
                <Input
                  value={newClient.primaryPhone}
                  onChange={(e) => setNewClient({...newClient, primaryPhone: e.target.value})}
                  placeholder="Primary Phone Number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <Input
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                  placeholder="Email Address"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Address</label>
                <Input
                  value={newClient.address}
                  onChange={(e) => setNewClient({...newClient, address: e.target.value})}
                  placeholder="Full Address"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button onClick={handleAddClient}>
                <Users className="mr-2 h-4 w-4" />
                Add Client
              </Button>
              <Button variant="outline" onClick={() => setShowAddClient(false)}>
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
                  placeholder="Search by client name, company, or contact..."
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
                <option value="lead">Lead</option>
                <option value="prospect">Prospect</option>
                <option value="inactive">Inactive</option>
              </select>
              <Button variant="outline">
                <FileText className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Client List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Clients ({filteredClients.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredClients.map((client) => (
                  <div 
                    key={client.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedClient?.id === client.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedClient(client)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{client.name}</h3>
                      <div className="flex gap-2">
                        <Badge className={typeColors[client.clientType]}>
                          {client.clientType}
                        </Badge>
                        <Badge className={statusColors[client.status]}>
                          {client.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{client.company}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-2">
                      <User className="mr-1 h-3 w-3" />
                      {client.contactPerson}
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Building className="mr-1 h-3 w-3" />
                      {client.projects.length} project{client.projects.length !== 1 ? 's' : ''} • ₹{client.totalValue?.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Client Details */}
        <div className="lg:col-span-2">
          {selectedClient && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center">
                        <Users className="mr-2 h-5 w-5" />
                        {selectedClient.name}
                      </CardTitle>
                      <p className="text-gray-600 mt-1">{selectedClient.company} • {selectedClient.contactPerson}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={statusColors[selectedClient.status]}>
                        {selectedClient.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
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
                          <span className="text-gray-600">Contact: </span>
                          <span className="ml-1">{selectedClient.contactPerson}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="mr-2 h-4 w-4 text-gray-600" />
                          <span className="text-gray-600">Primary: </span>
                          <span className="ml-1">
                            {selectedClient.contactRestrictions.directNumber 
                              ? selectedClient.primaryPhone 
                              : '***-***-' + selectedClient.primaryPhone.slice(-3)}
                          </span>
                        </div>
                        {selectedClient.secondaryPhone && (
                          <div className="flex items-center">
                            <Phone className="mr-2 h-4 w-4 text-gray-600" />
                            <span className="text-gray-600">Secondary: </span>
                            <span className="ml-1">
                              {selectedClient.contactRestrictions.directNumber 
                                ? selectedClient.secondaryPhone 
                                : '***-***-' + selectedClient.secondaryPhone.slice(-3)}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center">
                          <Mail className="mr-2 h-4 w-4 text-gray-600" />
                          <span className="text-gray-600">Email: </span>
                          <span className="ml-1">{selectedClient.email}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="mr-2 h-4 w-4 text-gray-600" />
                          <span className="text-gray-600">Address: </span>
                          <span className="ml-1">{selectedClient.address}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Business Details</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Client Type:</span>
                          <Badge className={typeColors[selectedClient.clientType]}>
                            {selectedClient.clientType}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <Badge className={statusColors[selectedClient.status]}>
                            {selectedClient.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Projects:</span>
                          <span>{selectedClient.totalProjects}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Value:</span>
                          <span>₹{selectedClient.totalValue?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Contact:</span>
                          <span>{selectedClient.lastContact}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Restrictions Notice */}
                  <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <h4 className="font-medium text-blue-800">Contact Restrictions</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      <span className="font-medium">Visibility:</span> {selectedClient.requirements.contactVisibility} • 
                      <span className="font-medium ml-2">Method:</span> {selectedClient.contactRestrictions.contactMethod} • 
                      <span className="font-medium ml-2">Authorized Contacts:</span> {selectedClient.contactRestrictions.authorizedContacts.join(', ')}
                    </p>
                  </div>

                  {/* Projects */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">Projects ({selectedClient.projects.length})</h4>
                      <Button variant="outline" size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Project
                      </Button>
                    </div>
                    <div className="space-y-4">
                      {selectedClient.projects.map((project) => (
                        <div key={project.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-medium">{project.name}</h5>
                              <Badge className={`${typeColors[project.type]} mt-1`}>
                                {project.type}
                              </Badge>
                            </div>
                            <Badge className={statusColors[project.status]}>
                              {project.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                            <div className="text-sm">
                              <span className="text-gray-600">Start Date:</span>
                              <div>{project.startDate}</div>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-600">Budget:</span>
                              <div>₹{project.budget?.toLocaleString()}</div>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-600">Contractor:</span>
                              <div>{project.contractor}</div>
                            </div>
                            <div className="text-sm">
                              <span className="text-gray-600">Timeline:</span>
                              <div>{project.timeline}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Design Options and Requirements */}
                  {selectedClient.projects.length > 0 && (
                    <div className="mb-6">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium">Design Options & Requirements</h4>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setShowRequirementForm(!showRequirementForm)}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Requirements
                        </Button>
                      </div>

                      {/* Requirement Form */}
                      {showRequirementForm && (
                        <Card className="mb-4 p-4">
                          <h5 className="font-medium mb-3">Capture Requirements</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Area Size (sq ft)</label>
                              <Input
                                value={newRequirement.size}
                                onChange={(e) => setNewRequirement({...newRequirement, size: e.target.value})}
                                placeholder="e.g., 250 sq ft"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Number of Rooms</label>
                              <Input
                                type="number"
                                value={newRequirement.rooms}
                                onChange={(e) => setNewRequirement({...newRequirement, rooms: e.target.value})}
                                placeholder="e.g., 4"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Number of Entries</label>
                              <Input
                                type="number"
                                value={newRequirement.entries}
                                onChange={(e) => setNewRequirement({...newRequirement, entries: e.target.value})}
                                placeholder="e.g., 1"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Number of Bathrooms</label>
                              <Input
                                type="number"
                                value={newRequirement.bathrooms}
                                onChange={(e) => setNewRequirement({...newRequirement, bathrooms: e.target.value})}
                                placeholder="e.g., 3"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Audio/Video Rooms</label>
                              <Input
                                type="number"
                                value={newRequirement.audioVideoRooms}
                                onChange={(e) => setNewRequirement({...newRequirement, audioVideoRooms: e.target.value})}
                                placeholder="e.g., 1"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Bar Rooms</label>
                              <Input
                                type="number"
                                value={newRequirement.barRooms}
                                onChange={(e) => setNewRequirement({...newRequirement, barRooms: e.target.value})}
                                placeholder="e.g., 0"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Parking Spaces</label>
                              <Input
                                type="number"
                                value={newRequirement.parking}
                                onChange={(e) => setNewRequirement({...newRequirement, parking: e.target.value})}
                                placeholder="e.g., 2"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Drawing Rooms</label>
                              <Input
                                type="number"
                                value={newRequirement.drawingRooms}
                                onChange={(e) => setNewRequirement({...newRequirement, drawingRooms: e.target.value})}
                                placeholder="e.g., 1"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Kitchens</label>
                              <Input
                                type="number"
                                value={newRequirement.kitchens}
                                onChange={(e) => setNewRequirement({...newRequirement, kitchens: e.target.value})}
                                placeholder="e.g., 1"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium mb-1">Custom Features</label>
                              <Input
                                value={newRequirement.customFeatures}
                                onChange={(e) => setNewRequirement({...newRequirement, customFeatures: e.target.value})}
                                placeholder="e.g., smart home, garden"
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium mb-1">Preferences</label>
                              <Input
                                value={newRequirement.preferences}
                                onChange={(e) => setNewRequirement({...newRequirement, preferences: e.target.value})}
                                placeholder="e.g., modern design, eco-friendly"
                              />
                            </div>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Button onClick={handleAddRequirement}>
                              <FileText className="mr-2 h-4 w-4" />
                              Save Requirements
                            </Button>
                            <Button variant="outline" onClick={() => setShowRequirementForm(false)}>
                              Cancel
                            </Button>
                          </div>
                        </Card>
                      )}

                      {/* Current Requirements */}
                      {selectedClient.projects[0].requirements && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="p-3 border rounded text-center">
                            <Sofa className="mx-auto h-6 w-6 text-blue-500 mb-1" />
                            <div className="text-sm font-medium">{selectedClient.projects[0].requirements.rooms} Rooms</div>
                          </div>
                          <div className="p-3 border rounded text-center">
                            <Utensils className="mx-auto h-6 w-6 text-green-500 mb-1" />
                            <div className="text-sm font-medium">{selectedClient.projects[0].requirements.kitchens} Kitchens</div>
                          </div>
                          <div className="p-3 border rounded text-center">
                            <Home className="mx-auto h-6 w-6 text-purple-500 mb-1" />
                            <div className="text-sm font-medium">{selectedClient.projects[0].requirements.bathrooms} Baths</div>
                          </div>
                          <div className="p-3 border rounded text-center">
                            <Car className="mx-auto h-6 w-6 text-yellow-500 mb-1" />
                            <div className="text-sm font-medium">{selectedClient.projects[0].requirements.parking} Parking</div>
                          </div>
                          <div className="p-3 border rounded text-center">
                            <Monitor className="mx-auto h-6 w-6 text-indigo-500 mb-1" />
                            <div className="text-sm font-medium">{selectedClient.projects[0].requirements.audioVideoRooms} AV Rooms</div>
                          </div>
                          <div className="p-3 border rounded text-center">
                            <Wine className="mx-auto h-6 w-6 text-red-500 mb-1" />
                            <div className="text-sm font-medium">{selectedClient.projects[0].requirements.barRooms} Bar Rooms</div>
                          </div>
                        </div>
                      )}

                      {/* Design Options */}
                      {selectedClient.projects[0].designOptions && (
                        <div className="mt-4">
                          <h5 className="font-medium mb-3">Design Options</h5>
                          <div className="space-y-3">
                            {selectedClient.projects[0].designOptions.map((option) => (
                              <div key={option.id} className="border rounded-lg p-3">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <div className="font-medium">{option.name}</div>
                                    <div className="text-sm text-gray-600">{option.size} • ₹{option.cost?.toLocaleString()}</div>
                                  </div>
                                  <Badge className={designStatusColors[option.status]}>
                                    {option.status.replace('_', ' ')}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Communication Buttons */}
                  <div className="flex gap-2">
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
                      Schedule Meeting
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Employee Directory with Visibility Controls */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="mr-2 h-5 w-5" />
                    Project Team Members
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {allEmployees.map((employee) => (
                      <div key={employee.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{employee.name}</div>
                            <Badge className="text-xs mt-1">
                              {employee.role}
                            </Badge>
                          </div>
                          <Badge variant={employee.visibleToClient ? "default" : "secondary"} className="text-xs">
                            {employee.visibleToClient ? "Visible" : "Hidden"}
                          </Badge>
                        </div>
                        
                        <div className="mt-3 text-sm text-gray-600">
                          <div>Department: {employee.department}</div>
                          <div className="mt-1 flex items-center">
                            <Phone className="mr-2 h-4 w-4" />
                            {showEmployeeNumbers || employee.visibleToClient 
                              ? employee.phone 
                              : '***-***-' + employee.phone.slice(-3)}
                          </div>
                          <div className="mt-1 flex items-center">
                            <Mail className="mr-2 h-4 w-4" />
                            {employee.email}
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <div className="flex items-center text-xs">
                            {employee.contactRestrictions.directNumber ? (
                              <span className="text-green-600">Direct contact allowed</span>
                            ) : (
                              <span className="text-yellow-600">CRM contact only</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
                    <p className="text-sm text-gray-700">
                      <span className="font-medium">Employee Contact Visibility:</span> 
                      {' '}{showEmployeeNumbers ? 'All numbers visible to authorized users' : 'Numbers masked for privacy'}
                      {' '}• Only authorized personnel can see full contact details
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