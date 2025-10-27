// Drawing Management Page for Construction CRM
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  MessageSquare, 
  Upload,
  Download,
  Eye,
  User,
  Mail,
  Phone,
  Search,
  Plus,
  Send,
  Video,
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
  TrendingUp,
  TrendingDown
} from 'lucide-react';

export default function DrawingManagementPage() {
  const [drawings, setDrawings] = useState<Array<{
    id: number;
    title: string;
    version: string;
    project: string;
    site: string;
    status: string;
    category: string;
    type: string;
    createdBy: string;
    createdDate: string;
    lastModified: string;
    approvedBy: string | null;
    approvedDate: string | null;
    fileUrl: string;
    size: string;
    area: string;
    revisionHistory: Array<{
      version: string;
      date: string;
      changes: string;
      approved: boolean;
    }>;
    issues: Array<{
      id: number;
      type: string;
      priority: string;
      reportedBy: string;
      reportedDate: string;
      description: string;
      status: string;
      assignedTo: string;
      dueDate: string;
      resolutionNotes: string;
      category: string;
      relatedTo: string;
      measurements: {
        expected: string;
        actual: string;
        unit: string;
      };
    }>;
    reviewers: Array<{
      id: number;
      name: string;
      role: string;
      status: string;
      reviewedDate: string | null;
      contactMethod: string;
    }>;
    comments: Array<{
      id: number;
      author: string;
      role: string;
      timestamp: string;
      message: string;
      attachments: any[];
      isSecure: boolean;
      type: string;
    }>;
    permissions: {
      view: string[];
      edit: string[];
      approve: string[];
      download?: boolean;
      share?: boolean;
    };
  }>>([
    {
      id: 1,
      title: 'Foundation Plan - Building A',
      version: 'v2.3',
      project: 'Downtown Complex',
      site: 'Site A',
      status: 'changes_requested',
      category: 'foundation',
      type: 'structural',
      createdBy: 'Rajesh Sharma',
      createdDate: '2025-03-15',
      lastModified: '2025-03-20',
      approvedBy: 'Anil Kumar',
      approvedDate: null,
      fileUrl: '/drawings/foundation-plan-v2.3.pdf',
      size: '2.4 MB',
      area: '250 sq ft',
      revisionHistory: [
        { version: 'v1.0', date: '2025-03-10', changes: 'Initial design', approved: true },
        { version: 'v2.0', date: '2025-03-12', changes: 'Updated column spacing', approved: true },
        { version: 'v2.1', date: '2025-03-15', changes: 'Added foundation details', approved: true },
        { version: 'v2.2', date: '2025-03-18', changes: 'Revised spacing per engineer feedback', approved: false },
        { version: 'v2.3', date: '2025-03-20', changes: 'Corrected spacing to 6m max', approved: false }
      ],
      issues: [
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
      reviewers: [
        { id: 1, name: 'Anil Kumar', role: 'Structural Engineer', status: 'pending', reviewedDate: null, contactMethod: 'crm_only' },
        { id: 2, name: 'Priya Patel', role: 'Architect', status: 'approved', reviewedDate: '2025-03-16', contactMethod: 'crm_only' },
        { id: 3, name: 'Raj Contractor', role: 'Contractor', status: 'pending', reviewedDate: null, contactMethod: 'engineer_only' }
      ],
      comments: [
        {
          id: 1,
          author: 'Anil Kumar',
          role: 'Structural Engineer',
          message: 'Spacing still needs adjustment. Maximum should be 6m per code.',
          timestamp: '2025-03-20 10:30',
          attachments: [],
          isSecure: true,
          type: 'technical_feedback'
        },
        {
          id: 2,
          author: 'Raj Contractor',
          role: 'Contractor',
          message: 'Understood. Will adjust the spacing as per engineer\'s instruction.',
          timestamp: '2025-03-20 10:40',
          attachments: [],
          isSecure: true,
          type: 'revision_update'
        }
      ],
      permissions: {
        view: ['architect', 'engineer', 'contractor'],
        edit: ['designer'],
        approve: ['engineer', 'architect']
      }
    },
    {
      id: 2,
      title: 'Electrical Layout - Floor 3',
      version: 'v1.1',
      project: 'Downtown Complex',
      site: 'Site A',
      status: 'pending_approval',
      category: 'electrical',
      type: 'electrical',
      createdBy: 'Priya Patel',
      createdDate: '2025-03-12',
      lastModified: '2025-03-18',
      approvedBy: null,
      approvedDate: null,
      fileUrl: '/drawings/electrical-layout-floor3-v1.1.pdf',
      size: '1.8 MB',
      area: '200 sq ft',
      revisionHistory: [
        { version: 'v1.0', date: '2025-03-12', changes: 'Initial electrical layout', approved: false },
        { version: 'v1.1', date: '2025-03-18', changes: 'Updated outlet placements', approved: false }
      ],
      issues: [
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
      reviewers: [
        { id: 1, name: 'Suresh Reddy', role: 'Electrical Engineer', status: 'pending', reviewedDate: null, contactMethod: 'crm_only' },
        { id: 2, name: 'Anil Kumar', role: 'Structural Engineer', status: 'not_required', reviewedDate: null, contactMethod: 'crm_only' },
        { id: 3, name: 'Sharma Electrical', role: 'Contractor', status: 'pending', reviewedDate: null, contactMethod: 'engineer_only' }
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
        approve: ['engineer', 'architect']
      }
    }
  ]);


  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDrawing, setSelectedDrawing] = useState(drawings[0]);
  const [newComment, setNewComment] = useState('');
  const [newIssue, setNewIssue] = useState({
    type: '',
    priority: 'medium',
    description: ''
  });
  const [showAddIssue, setShowAddIssue] = useState(false);

  const statusColors: { [key: string]: string } = {
    draft: 'bg-gray-100 text-gray-800',
    pending_approval: 'bg-yellow-100 text-yellow-800',
    changes_requested: 'bg-red-100 text-red-800',
    approved: 'bg-green-100 text-green-800',
    in_review: 'bg-blue-100 text-blue-800'
  };

  const priorityColors: { [key: string]: string } = {
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
    clarity: 'bg-indigo-100 text-indigo-800'
  };

  const reviewerStatusColors: { [key: string]: string } = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    not_required: 'bg-gray-100 text-gray-800'
  };

  const contactMethodColors: { [key: string]: string } = {
    crm_only: 'bg-blue-100 text-blue-800',
    engineer_only: 'bg-green-100 text-green-800',
    restricted: 'bg-red-100 text-red-800',
    direct: 'bg-purple-100 text-purple-800'
  };

  const filteredDrawings = drawings.filter(drawing => {
    const matchesFilter = filter === 'all' || drawing.status === filter;
    const matchesCategory = categoryFilter === 'all' || drawing.category === categoryFilter;
    const matchesSearch = drawing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          drawing.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          drawing.createdBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          drawing.issues.some(issue => issue.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesCategory && matchesSearch;
  });

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const updatedDrawings = drawings.map(drawing => {
      if (drawing.id === selectedDrawing.id) {
        const newCommentObj = {
          id: Date.now(),
          author: 'Current User',
          role: 'Site Engineer',
          message: newComment,
          timestamp: new Date().toISOString().split('T')[0] + ' ' + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          attachments: [],
          isSecure: true,
          type: 'general_message'
        };
        return {
          ...drawing,
          comments: [...drawing.comments, newCommentObj]
        };
      }
      return drawing;
    });

    setDrawings(updatedDrawings);
    const updatedSelectedDrawing = updatedDrawings.find(d => d.id === selectedDrawing.id);
    if (updatedSelectedDrawing) {
      setSelectedDrawing(updatedSelectedDrawing);
    }
    setNewComment('');
  };

  const handleAddIssue = () => {
    if (!newIssue.type || !newIssue.description) return;

    const updatedDrawings = drawings.map(drawing => {
      if (drawing.id === selectedDrawing.id) {
        const newIssueObj = {
          id: Date.now(),
          ...newIssue,
          reportedBy: 'Current User',
          reportedDate: new Date().toISOString().split('T')[0],
          status: 'open',
          assignedTo: selectedDrawing.createdBy,
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days from now
          resolutionNotes: '',
          category: drawing.category,
          relatedTo: 'drawing_specification',
          measurements: {
            expected: 'As per design',
            actual: 'Not as per design',
            unit: 'meters'
          }
        };
        return {
          ...drawing,
          issues: [...drawing.issues, newIssueObj],
          status: 'changes_requested'
        };
      }
      return drawing;
    });

    setDrawings(updatedDrawings);
    const updatedSelectedDrawing = updatedDrawings.find(d => d.id === selectedDrawing.id);
    if (updatedSelectedDrawing) {
      setSelectedDrawing(updatedSelectedDrawing);
    }
    setNewIssue({ type: '', priority: 'medium', description: '' });
    setShowAddIssue(false);
  };

  const handleApproveDrawing = (drawingId: number, reviewerId: number) => {
    const updatedDrawings = drawings.map(drawing => {
      if (drawing.id === drawingId) {
        const updatedReviewers = drawing.reviewers.map(reviewer => 
          reviewer.id === reviewerId 
            ? { ...reviewer, status: 'approved', reviewedDate: new Date().toISOString().split('T')[0] }
            : reviewer
        );
        
        // Check if all required reviewers have approved
        const allApproved = updatedReviewers.every(r => r.status === 'approved' || r.status === 'not_required');
        const newStatus = allApproved ? 'approved' : drawing.status;
        
        return {
          ...drawing,
          reviewers: updatedReviewers,
          status: newStatus,
          approvedDate: allApproved ? new Date().toISOString().split('T')[0] : null
        };
      }
      return drawing;
    });

    setDrawings(updatedDrawings);
    const updatedSelectedDrawing = updatedDrawings.find(d => d.id === drawingId);
    if (updatedSelectedDrawing) {
      setSelectedDrawing(updatedSelectedDrawing);
    }
  };

  const handleRejectDrawing = (drawingId: number, reviewerId: number) => {
    const updatedDrawings = drawings.map(drawing => {
      if (drawing.id === drawingId) {
        const updatedReviewers = drawing.reviewers.map(reviewer => 
          reviewer.id === reviewerId 
            ? { ...reviewer, status: 'rejected', reviewedDate: new Date().toISOString().split('T')[0] }
            : reviewer
        );
        
        return {
          ...drawing,
          reviewers: updatedReviewers,
          status: 'changes_requested'
        };
      }
      return drawing;
    });

    setDrawings(updatedDrawings);
    const updatedSelectedDrawing = updatedDrawings.find(d => d.id === drawingId);
    if (updatedSelectedDrawing) {
      setSelectedDrawing(updatedSelectedDrawing);
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Drawing Management System</h1>
          <p className="text-gray-600 mt-2">
            Manage drawings, resolve spacing issues, and coordinate approvals
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button onClick={() => setShowAddIssue(!showAddIssue)}>
            <Plus className="mr-2 h-4 w-4" />
            Report Issue
          </Button>
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Upload Drawing
          </Button>
        </div>
      </div>

      {/* Pain Point Alerts */}
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
              Drawing Coordination Pain Points & Solutions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center">
                  <Lock className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="font-medium text-blue-800">Drawing Spacing Resolution</span>
                </div>
                <p className="text-xs text-blue-700 mt-1">
                  Auto-validation of spacing measurements. Prevents 7.2m instead of 6m max column spacing.
                </p>
              </div>
              
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-medium text-green-800">Engineer-Contractor Coordination</span>
                </div>
                <p className="text-xs text-green-700 mt-1">
                  Secure communication channels. Prevents unauthorized number exchanges.
                </p>
              </div>
              
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center">
                  <Eye className="h-5 w-5 text-purple-500 mr-2" />
                  <span className="font-medium text-purple-800">Drawing Issue Tracking</span>
                </div>
                <p className="text-xs text-purple-700 mt-1">
                  Real-time issue tracking with measurement verification.
                </p>
              </div>
              
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center">
                  <HardHat className="h-5 w-5 text-amber-500 mr-2" />
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

      {/* Search and Filter */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search by title, project, creator, or issue description..."
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
                <option value="draft">Draft</option>
                <option value="pending_approval">Pending Approval</option>
                <option value="changes_requested">Changes Requested</option>
                <option value="approved">Approved</option>
                <option value="in_review">In Review</option>
              </select>
              <select 
                value={categoryFilter} 
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border rounded-md px-3 py-2"
              >
                <option value="all">All Categories</option>
                <option value="foundation">Foundation</option>
                <option value="structural">Structural</option>
                <option value="electrical">Electrical</option>
                <option value="plumbing">Plumbing</option>
                <option value="architectural">Architectural</option>
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
        {/* Drawings List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Drawings ({filteredDrawings.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredDrawings.map((drawing) => (
                  <div 
                    key={drawing.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedDrawing?.id === drawing.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedDrawing(drawing)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{drawing.title}</h3>
                      <div className="flex gap-2">
                        <Badge className={statusColors[drawing.status]}>
                          {drawing.status.replace('_', ' ')}
                        </Badge>
                        <Badge variant="outline">
                          {drawing.version}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{drawing.project} - {drawing.site}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-2">
                      <MapPin className="mr-1 h-3 w-3" />
                      {drawing.site}
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <User className="mr-1 h-3 w-3" />
                      {drawing.createdBy} • {drawing.createdDate}
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <FileText className="mr-1 h-3 w-3" />
                      {drawing.size} • {drawing.type}
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <Square className="mr-1 h-3 w-3" />
                      {drawing.area}
                    </div>
                    {drawing.issues.some(issue => issue.priority === 'high') && (
                      <div className="flex items-center text-xs text-red-600 mt-2">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        {drawing.issues.filter(i => i.priority === 'high').length} high priority issues
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Drawing Details */}
        <div className="lg:col-span-2">
          {selectedDrawing && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center">
                        <FileText className="mr-2 h-5 w-5" />
                        {selectedDrawing.title} - {selectedDrawing.version}
                      </CardTitle>
                      <p className="text-gray-600 mt-1">{selectedDrawing.project} • {selectedDrawing.category}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={statusColors[selectedDrawing.status]}>
                        {selectedDrawing.status.replace('_', ' ')}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-medium mb-3">Drawing Information</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Created By:</span>
                          <span>{selectedDrawing.createdBy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Created Date:</span>
                          <span>{selectedDrawing.createdDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Modified:</span>
                          <span>{selectedDrawing.lastModified}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">File Size:</span>
                          <span>{selectedDrawing.size}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Drawing Type:</span>
                          <span>{selectedDrawing.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Category:</span>
                          <span>{selectedDrawing.category}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Area:</span>
                          <span>{selectedDrawing.area}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Approval Status</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <Badge className={statusColors[selectedDrawing.status]}>
                            {selectedDrawing.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Approved By:</span>
                          <span>{selectedDrawing.approvedBy || 'Pending'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Approved Date:</span>
                          <span>{selectedDrawing.approvedDate || 'Pending'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Issues:</span>
                          <span>{selectedDrawing.issues.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Comments:</span>
                          <span>{selectedDrawing.comments.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>



                  {/* Reviewers */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Reviewers</h4>
                    <div className="space-y-3">
                      {selectedDrawing.reviewers.map((reviewer) => (
                        <div key={reviewer.id} className="flex justify-between items-center p-3 border rounded">
                          <div>
                            <div className="font-medium">{reviewer.name}</div>
                            <Badge className={`${contactMethodColors[reviewer.contactMethod]} text-xs mt-1`}>
                              {reviewer.role}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={reviewerStatusColors[reviewer.status]}>
                              {reviewer.status}
                            </Badge>
                            {reviewer.status === 'pending' && (
                              <div className="flex gap-1">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleApproveDrawing(selectedDrawing.id, reviewer.id)}
                                >
                                  <CheckCircle className="h-3 w-3" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleRejectDrawing(selectedDrawing.id, reviewer.id)}
                                >
                                  <AlertTriangle className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Issues */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium">Issues ({selectedDrawing.issues.length})</h4>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowAddIssue(!showAddIssue)}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Report Issue
                      </Button>
                    </div>

                    {showAddIssue && (
                      <Card className="mb-4 p-4">
                        <h5 className="font-medium mb-3">Report New Issue</h5>
                        <div className="space-y-3">
                          <select 
                            value={newIssue.type} 
                            onChange={(e) => setNewIssue({...newIssue, type: e.target.value})}
                            className="w-full border rounded-md px-3 py-2"
                          >
                            <option value="">Select Issue Type</option>
                            <option value="spacing">Spacing Issue</option>
                            <option value="dimension">Dimension Issue</option>
                            <option value="code_violation">Code Violation</option>
                            <option value="conflict">Design Conflict</option>
                            <option value="clarity">Clarity Issue</option>
                          </select>
                          <select 
                            value={newIssue.priority} 
                            onChange={(e) => setNewIssue({...newIssue, priority: e.target.value})}
                            className="w-full border rounded-md px-3 py-2"
                          >
                            <option value="low">Low Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="high">High Priority</option>
                            <option value="urgent">Urgent</option>
                          </select>
                          <Textarea
                            value={newIssue.description}
                            onChange={(e) => setNewIssue({...newIssue, description: e.target.value})}
                            placeholder="Describe the issue..."
                            rows={3}
                          />
                          <div className="flex gap-2">
                            <Button onClick={handleAddIssue}>
                              <AlertTriangle className="mr-2 h-4 w-4" />
                              Report Issue
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={() => setShowAddIssue(false)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </Card>
                    )}

                    <div className="space-y-3">
                      {selectedDrawing.issues.map((issue) => (
                        <div key={issue.id} className="border-l-4 border-red-200 pl-4 py-2 bg-red-50 rounded-r">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center">
                                <Badge className={`${issueTypeColors[issue.type]} mr-2`}>
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
                            <Badge className={reviewerStatusColors[issue.status]}>
                              {issue.status}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Comments */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Comments ({selectedDrawing.comments.length})</h4>
                    <div className="space-y-4 mb-4">
                      {selectedDrawing.comments.map((comment) => (
                        <div key={comment.id} className="border-b pb-3 last:border-b-0">
                          <div className="flex items-center mb-1">
                            <User className="h-4 w-4 mr-2 text-gray-600" />
                            <span className="font-medium">{comment.author}</span>
                            <span className="text-xs text-gray-500 ml-2">({comment.role})</span>
                            <span className="text-xs text-gray-500 ml-auto">{comment.timestamp}</span>
                          </div>
                          <p className="text-gray-700">{comment.message}</p>
                          {comment.attachments.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {comment.attachments.map((attachment, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {attachment}
                                </Badge>
                              ))}
                            </div>
                          )}
                          {comment.isSecure && (
                            <div className="flex items-center text-xs text-green-600 mt-1">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Secure Communication
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                      />
                      <Button onClick={handleAddComment}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Revision History */}
                  <div>
                    <h4 className="font-medium mb-3">Revision History</h4>
                    <div className="space-y-3">
                      {selectedDrawing.revisionHistory.map((revision, index) => (
                        <div key={index} className="flex items-center p-2 border rounded">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <span className="text-sm font-medium">{revision.version.replace('v', '')}</span>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{revision.version}</div>
                            <div className="text-sm text-gray-600">{revision.changes}</div>
                            <div className="text-xs text-gray-500">{revision.date}</div>
                          </div>
                          {revision.approved && (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                      ))}
                    </div>
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