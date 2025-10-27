// Communication System Page for Construction CRM
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  User,
  Search,
  Plus,
  Send,
  Video,
  FileText,
  HardHat,
  Building,
  MapPin,
  Calendar,
  Hash,
  RotateCcw,
  ZoomIn,
  Ruler,
  Square,
  Layers,
  Lock,
  Unlock,
  Shield,
  Wrench,
  Hammer,
  Scale,
  TrendingUp,
  TrendingDown,
  Eye
} from 'lucide-react';

export default function CommunicationSystemPage() {
  const [communications, setCommunications] = useState([
    {
      id: 1,
      type: 'site_visit',
      title: 'Foundation Discussion - Building A',
      project: 'Downtown Complex',
      site: 'Site A',
      date: '2025-03-20',
      time: '10:30 AM',
      participants: [
        { id: 1, name: 'Anil Sharma', role: 'Site Engineer', canContact: true, contactMethod: 'crm_only' },
        { id: 2, name: 'Raj Contractor', role: 'Contractor', canContact: false, contactMethod: 'engineer_only' },
        { id: 3, name: 'Rajesh Designer', role: 'Designer', canContact: true, contactMethod: 'crm_only' }
      ],
      status: 'completed',
      messages: [
        {
          id: 1,
          sender: 'Anil Sharma',
          role: 'Site Engineer',
          message: 'Foundation work needs adjustment. Spacing between columns should be maximum 6m as per building code. Current spacing is 7.2m.',
          timestamp: '2025-03-20 10:35',
          attachments: [],
          isSecure: true,
          type: 'technical_feedback'
        },
        {
          id: 2,
          sender: 'Raj Contractor',
          role: 'Contractor',
          message: 'Understood. Will adjust the spacing as per engineer\'s instruction.',
          timestamp: '2025-03-20 10:40',
          attachments: [],
          isSecure: true,
          type: 'revision_update'
        }
      ],
      notes: 'Discussed foundation spacing adjustments. Contractor will update drawings.',
      duration: '45 min',
      attachments: ['foundation-discussion-notes.pdf'],
      canInitiateCall: false,
      contactRestrictions: {
        contractorToEngineer: false,
        engineerToContractor: true,
        designerToContractor: true,
        allContactThroughCrm: true,
        contactHistory: [
          {
            date: '2025-03-19',
            contactType: 'Call',
            with: 'Raj Contractor',
            purpose: 'Discuss foundation spacing'
          }
        ]
      }
    },
    {
      id: 2,
      type: 'project_update',
      title: 'Electrical Rough-in Status',
      project: 'Downtown Complex',
      site: 'Site A',
      date: '2025-03-19',
      time: '2:15 PM',
      participants: [
        { id: 1, name: 'Priya Patel', role: 'Site Engineer', canContact: true, contactMethod: 'crm_only' },
        { id: 4, name: 'Electrical Contractor', role: 'Contractor', canContact: false, contactMethod: 'engineer_only' },
        { id: 5, name: 'Suresh Designer', role: 'Designer', canContact: true, contactMethod: 'crm_only' }
      ],
      status: 'in_progress',
      messages: [
        {
          id: 1,
          sender: 'Priya Patel',
          role: 'Site Engineer',
          message: 'Electrical conduit installation is 80% complete. Need to schedule inspection. Outlet spacing needs to be within 6m as per electrical code.',
          timestamp: '2025-03-19 2:20',
          attachments: [],
          isSecure: true,
          type: 'progress_update'
        },
        {
          id: 2,
          sender: 'Electrical Contractor',
          role: 'Contractor',
          message: 'Installation on schedule. Outlet spacing corrected to 6m as per code requirements.',
          timestamp: '2025-03-19 2:25',
          attachments: [],
          isSecure: true,
          type: 'resolution_update'
        }
      ],
      notes: 'Electrical work on schedule. Inspection needed by EOD.',
      duration: '30 min',
      attachments: [],
      canInitiateCall: false,
      contactRestrictions: {
        contractorToEngineer: false,
        engineerToContractor: true,
        designerToContractor: true,
        allContactThroughCrm: true,
        contactHistory: [
          {
            date: '2025-03-18',
            contactType: 'Email',
            with: 'Electrical Contractor',
            purpose: 'Schedule inspection'
          }
        ]
      }
    }
  ]);

  const [employees] = useState([
    { id: 1, name: 'Anil Sharma', role: 'Site Engineer', department: 'Engineering', phone: '+91 98765 43210', email: 'anil@construction.com', canContact: true, contactMethod: 'crm_only' },
    { id: 2, name: 'Raj Contractor', role: 'Contractor', department: 'Contractor', phone: '+91 98765 43211', email: 'contact@rajconstruction.com', canContact: false, contactMethod: 'engineer_only' },
    { id: 3, name: 'Rajesh Designer', role: 'Designer', department: 'Design', phone: '+91 98765 43212', email: 'rajesh@design.com', canContact: true, contactMethod: 'crm_only' },
    { id: 4, name: 'Electrical Contractor', role: 'Contractor', department: 'Contractor', phone: '+91 98765 43213', email: 'contact@electricalexperts.com', canContact: false, contactMethod: 'engineer_only' },
    { id: 5, name: 'Priya Patel', role: 'Site Engineer', department: 'Engineering', phone: '+91 98765 43214', email: 'priya@construction.com', canContact: true, contactMethod: 'crm_only' },
    { id: 6, name: 'Suresh Designer', role: 'Designer', department: 'Design', phone: '+91 98765 43215', email: 'suresh@design.com', canContact: true, contactMethod: 'crm_only' },
    { id: 7, name: 'Client Representative', role: 'Client', department: 'Client', phone: '+91 98765 43216', email: 'rep@client.com', canContact: true, contactMethod: 'crm_only' }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCommunication, setSelectedCommunication] = useState(communications[0]);
  const [newMessage, setNewMessage] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [contactForm, setContactForm] = useState({
    recipient: '',
    subject: '',
    message: '',
    callType: 'message'
  });

  const statusColors: Record<string, string> = {
    scheduled: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    missed: 'bg-red-100 text-red-800'
  };

  const typeColors: Record<string, string> = {
    site_visit: 'bg-purple-100 text-purple-800',
    project_update: 'bg-blue-100 text-blue-800',
    meeting: 'bg-green-100 text-green-800',
    urgent: 'bg-red-100 text-red-800'
  };

  const roleColors: Record<string, string> = {
    'Site Engineer': 'bg-blue-100 text-blue-800',
    'Contractor': 'bg-yellow-100 text-yellow-800',
    'Designer': 'bg-purple-100 text-purple-800',
    'Client': 'bg-green-100 text-green-800',
    'Inspector': 'bg-orange-100 text-orange-800',
    'Manager': 'bg-cyan-100 text-cyan-800',
    'Architect': 'bg-indigo-100 text-indigo-800'
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

  const priorityColors = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
    urgent: 'bg-rose-100 text-rose-800'
  };

  const issueTypeColors = {
    spacing: 'bg-purple-100 text-purple-800',
    dimension: 'bg-blue-100 text-blue-800',
    code_violation: 'bg-red-100 text-red-800',
    conflict: 'bg-yellow-100 text-yellow-800',
    clarity: 'bg-indigo-100 text-indigo-800'
  };

  const reviewerStatusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    not_required: 'bg-gray-100 text-gray-800'
  };

  const filteredCommunications = communications.filter(comm => {
    const matchesFilter = filter === 'all' || comm.type === filter;
    const matchesSearch = comm.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          comm.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          comm.site.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          comm.participants.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          comm.messages.some(m => m.message.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const handleAddMessage = () => {
    if (!newMessage.trim()) return;

    const secureMessage = {
      id: Date.now(),
      sender: 'Current User',
      role: 'Site Engineer',
      message: newMessage,
      timestamp: new Date().toISOString().split('T')[0] + ' ' + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      attachments: [],
      isSecure: true,
      type: 'general_message'
    };

    const updatedComms = communications.map(comm => {
      if (comm.id === selectedCommunication.id) {
        return {
          ...comm,
          messages: [...comm.messages, secureMessage]
        };
      }
      return comm;
    });

    setCommunications(updatedComms);
    const updatedCommunication = updatedComms.find(c => c.id === selectedCommunication.id);
    if (updatedCommunication) {
      setSelectedCommunication(updatedCommunication);
    }
    setNewMessage('');
  };

  const handleSecureContact = () => {
    if (!contactForm.recipient || !contactForm.subject || !contactForm.message) return;

    alert(`Secure ${contactForm.callType} initiated to ${contactForm.recipient} through CRM system. Direct contact information not revealed.`);
    setContactForm({
      recipient: '',
      subject: '',
      message: '',
      callType: 'message'
    });
    setShowAddForm(false);
  };

  // Get all direct reports for secure contact form
  const directReports = employees.filter(user => 
    user.role === 'Contractor' || 
    user.role === 'Site Engineer' || 
    user.role === 'Designer'
  );

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Secure Communications System</h1>
          <p className="text-gray-600 mt-2">
            Manage communications, prevent unauthorized number exchanges, and maintain contact logs
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="mr-2 h-4 w-4" />
            Secure Contact
          </Button>
          <Button variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            New Chat
          </Button>
        </div>
      </div>

      {/* Pain Point Alerts */}
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
              Communication Pain Points & Solutions
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

      {/* Contact Form Modal */}
      {showAddForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Secure Contact Form</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Contact Type</label>
                <select 
                  value={contactForm.callType} 
                  onChange={(e) => setContactForm({...contactForm, callType: e.target.value})}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="message">Secure Message</option>
                  <option value="call">Secure Call</option>
                  <option value="video">Secure Video Call</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Recipient</label>
                <select 
                  value={contactForm.recipient} 
                  onChange={(e) => setContactForm({...contactForm, recipient: e.target.value})}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="">Select Recipient</option>
                  {directReports.map(user => (
                    <option key={user.id} value={user.name}>
                      {user.name} - {user.role} ({user.department})
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <Input
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                  placeholder="Subject of communication"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <Textarea
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  placeholder="Your message content..."
                  rows={3}
                />
              </div>
              
              <div className="flex gap-2">
                <Button onClick={handleSecureContact}>
                  <Send className="mr-2 h-4 w-4" />
                  Send Securely
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-800">
                <AlertTriangle className="inline mr-2 h-4 w-4" />
                All communications are logged in the system. Direct phone numbers are not shared.
                The system ensures proper communication channels are followed.
              </p>
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
                  placeholder="Search communications by title, project, site, or participant..."
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
                <option value="all">All Types</option>
                <option value="site_visit">Site Visits</option>
                <option value="project_update">Project Updates</option>
                <option value="meeting">Meetings</option>
                <option value="urgent">Urgent</option>
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
        {/* Communications List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Communications ({filteredCommunications.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCommunications.map((comm) => (
                  <div 
                    key={comm.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedCommunication?.id === comm.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedCommunication(comm)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{comm.title}</h3>
                      <div className="flex gap-2">
                        <Badge className={`${typeColors[comm.type] || 'bg-gray-100 text-gray-800'}`}>
                          {comm.type.replace('_', ' ')}
                        </Badge>
                        <Badge className={`${statusColors[comm.status] || 'bg-gray-100 text-gray-800'}`}>
                          {comm.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{comm.project} - {comm.site}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-2">
                      <Clock className="mr-1 h-3 w-3" />
                      {comm.date} at {comm.time}
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Users className="mr-1 h-3 w-3" />
                      {comm.participants.length} participants
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {comm.participants.slice(0, 3).map((p, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {p.name}
                        </Badge>
                      ))}
                      {comm.participants.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{comm.participants.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Communication Details */}
        <div className="lg:col-span-2">
          {selectedCommunication && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center">
                        <MessageSquare className="mr-2 h-5 w-5" />
                        {selectedCommunication.title}
                      </CardTitle>
                      <p className="text-gray-600 mt-1">{selectedCommunication.project} • {selectedCommunication.site}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={`${typeColors[selectedCommunication.type] || 'bg-gray-100 text-gray-800'}`}>
                        {selectedCommunication.type.replace('_', ' ')}
                      </Badge>
                      <Badge className={`${statusColors[selectedCommunication.status] || 'bg-gray-100 text-gray-800'}`}>
                        {selectedCommunication.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-medium mb-3">Communication Details</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date & Time:</span>
                          <span>{selectedCommunication.date} at {selectedCommunication.time}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span>{selectedCommunication.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <Badge className={`${statusColors[selectedCommunication.status] || 'bg-gray-100 text-gray-800'}`}>
                            {selectedCommunication.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Type:</span>
                          <Badge className={`${typeColors[selectedCommunication.type] || 'bg-gray-100 text-gray-800'}`}>
                            {selectedCommunication.type.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Participants</h4>
                      <div className="space-y-2">
                        {selectedCommunication.participants.map((participant, index) => (
                          <div key={index} className="flex justify-between items-center p-2 border rounded">
                            <div>
                              <div className="font-medium">{participant.name}</div>
                              <Badge className={`${roleColors[participant.role] || 'bg-gray-100 text-gray-800'} text-xs mt-1`}>
                                {participant.role}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              {participant.canContact ? (
                                <Badge variant="default" className="text-xs">
                                  Authorized
                                </Badge>
                              ) : (
                                <Badge variant="secondary" className="text-xs">
                                  Restricted
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
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
                          <span className="font-medium">Direct Contact:</span> {selectedCommunication.contactRestrictions.contractorToEngineer ? 'Allowed' : 'Restricted'}
                          </p>
                        <p className="text-sm text-blue-700">
                          <span className="font-medium">Contact Methods:</span> Participant-specific contact methods apply
                        </p>
                        <p className="text-sm text-blue-700">
                          <span className="font-medium">Authorized Contacts:</span> See participant list for contact permissions
                        </p>
                        {selectedCommunication.contactRestrictions.contactHistory.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm text-blue-700 font-medium">Contact History:</p>
                            <ul className="text-xs text-blue-700 mt-1">
                              {selectedCommunication.contactRestrictions.contactHistory.map((contact, idx) => (
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

                  {/* Messages */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Messages ({selectedCommunication.messages.length})</h4>
                    <div className="space-y-4 mb-4 max-h-96 overflow-y-auto pr-2">
                      {selectedCommunication.messages.map((msg) => (
                        <div key={msg.id} className={`p-3 rounded-lg ${msg.sender === 'Current User' ? 'bg-blue-50 ml-10' : 'bg-gray-50 mr-10'}`}>
                          <div className="flex justify-between items-start mb-1">
                            <div>
                              <div className="font-medium">{msg.sender}</div>
                              <Badge className={`${roleColors[msg.role]} text-xs mt-1`}>
                                {msg.role}
                              </Badge>
                            </div>
                            <span className="text-xs text-gray-500">{msg.timestamp}</span>
                          </div>
                          <p className="text-gray-700">{msg.message}</p>
                          {msg.isSecure && (
                            <div className="flex items-center text-xs text-green-600 mt-1">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Secure Communication
                            </div>
                          )}
                          {msg.type && (
                            <div className="flex items-center text-xs text-blue-600 mt-1">
                              <MessageSquare className="mr-1 h-3 w-3" />
                              {msg.type.replace('_', ' ')}
                            </div>
                          )}
                          {msg.attachments.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {msg.attachments.map((attachment, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs flex items-center">
                                  <FileText className="mr-1 h-3 w-3" />
                                  {attachment}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                      />
                      <Button onClick={handleAddMessage}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Attachments */}
                  {selectedCommunication.attachments.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Attachments</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCommunication.attachments.map((attachment, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center cursor-pointer">
                            <FileText className="mr-1 h-3 w-3" />
                            {attachment}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Notes</h4>
                    <p className="text-gray-700">{selectedCommunication.notes}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 flex-wrap">
                    <Button variant="outline" disabled={!selectedCommunication.participants.some(p => p.canContact)}>
                      <Phone className="mr-2 h-4 w-4" />
                      Secure Call
                    </Button>
                    <Button variant="outline" disabled={!selectedCommunication.participants.some(p => p.canContact)}>
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