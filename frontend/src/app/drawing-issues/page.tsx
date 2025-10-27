// Drawing Issues Page for Construction Management System
'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  FileText, 
  User, 
  Calendar, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Search,
  Filter,
  Download,
  Upload
} from 'lucide-react';

export default function DrawingIssuesPage() {
  const [issues, setIssues] = useState([
    {
      id: 1,
      projectId: 1,
      projectName: 'Downtown Complex',
      drawingId: 1,
      drawingTitle: 'Foundation Plan - Building A',
      issueType: 'dimension_error',
      category: 'structural',
      priority: 'high',
      status: 'open',
      severity: 'critical',
      reportedBy: 'Contractor Team',
      reportedDate: '2025-03-20',
      dueDate: '2025-03-25',
      assignedTo: 'Rajesh Sharma',
      description: 'Foundation dimensions do not match site measurements. Columns placed 2 feet off from actual measurement points.',
      resolutionSteps: [
        'Verify site measurements',
        'Update drawing with correct dimensions',
        'Resubmit for approval'
      ],
      resolutionNotes: '',
      resolvedDate: null,
      files: ['foundation-dimensions-comparison.pdf', 'site-measurement-report.pdf']
    },
    {
      id: 2,
      projectId: 1,
      projectName: 'Downtown Complex',
      drawingId: 2,
      drawingTitle: 'Electrical Layout - Floor 3',
      issueType: 'code_violation',
      category: 'electrical',
      priority: 'medium',
      status: 'in_progress',
      severity: 'major',
      reportedBy: 'Engineer Team',
      reportedDate: '2025-03-18',
      dueDate: '2025-03-22',
      assignedTo: 'Priya Patel',
      description: 'Outlet spacing does not comply with electrical code requirements. Maximum distance between outlets should not exceed 12 feet.',
      resolutionSteps: [
        'Review electrical code requirements',
        'Adjust outlet positions',
        'Resubmit for approval'
      ],
      resolutionNotes: '',
      resolvedDate: null,
      files: ['electrical-code-requirements.pdf', 'outlet-spacing-update.pdf']
    },
    {
      id: 3,
      projectId: 2,
      projectName: 'Residential Towers',
      drawingId: 3,
      drawingTitle: 'Plumbing Layout - Tower B',
      issueType: 'conflict',
      category: 'plumbing',
      priority: 'high',
      status: 'resolved',
      severity: 'major',
      reportedBy: 'Contractor Team',
      reportedDate: '2025-03-15',
      dueDate: '2025-03-18',
      assignedTo: 'Amit Verma',
      description: 'Plumbing lines conflict with electrical conduits. Need to reroute plumbing to avoid interference.',
      resolutionSteps: [
        'Identify conflict points',
        'Reroute plumbing lines',
        'Verify no further conflicts',
        'Resubmit for approval'
      ],
      resolutionNotes: '',
      resolvedDate: null,
      files: ['conflict-analysis.pdf', 'updated-plumbing-layout.pdf']
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIssue, setSelectedIssue] = useState(issues[0]);
  const [newIssue, setNewIssue] = useState({
    projectId: '',
    drawingId: '',
    drawingTitle: '',
    issueType: '',
    category: '',
    priority: 'medium',
    description: '',
    reportedBy: 'Contractor Team',
    dueDate: new Date().toISOString().split('T')[0]
  });

  const priorityColors: Record<string, string> = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
    urgent: 'bg-rose-100 text-rose-800'
  };

  const statusColors: Record<string, string> = {
    open: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    resolved: 'bg-green-100 text-green-800',
    closed: 'bg-gray-100 text-gray-800'
  };

  const severityColors: Record<string, string> = {
    minor: 'bg-blue-100 text-blue-800',
    major: 'bg-yellow-100 text-yellow-800',
    critical: 'bg-red-100 text-red-800'
  };

  const filteredIssues = issues.filter(issue => {
    const matchesFilter = filter === 'all' || issue.status === filter;
    const matchesCategory = categoryFilter === 'all' || issue.category === categoryFilter;
    const matchesSearch = issue.drawingTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          issue.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          issue.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesCategory && matchesSearch;
  });

  const statusCounts = {
    open: issues.filter(i => i.status === 'open').length,
    in_progress: issues.filter(i => i.status === 'in_progress').length,
    resolved: issues.filter(i => i.status === 'resolved').length
  };

  const handleAddIssue = () => {
    const newIssueObj = {
      id: issues.length + 1,
      ...newIssue,
      projectId: parseInt(newIssue.projectId) || 0, // Convert to number
      drawingId: parseInt(newIssue.drawingId) || 0, // Convert to number
      projectName: 'Project Name', // Default project name or should be selected from available projects
      severity: 'medium', // Default severity
      assignedTo: 'Unassigned', // Default assignee
      status: 'open',
      resolvedDate: null, // Initially null
      reportedDate: new Date().toISOString().split('T')[0],
      resolutionSteps: [],
      resolutionNotes: '',
      files: []
    };
    
    setIssues([newIssueObj, ...issues]);
    setNewIssue({
      projectId: '',
      drawingId: '',
      drawingTitle: '',
      issueType: '',
      category: '',
      priority: 'medium',
      description: '',
      reportedBy: 'Contractor Team',
      dueDate: new Date().toISOString().split('T')[0]
    });
  };

  const handleUpdateStatus = (issueId: number, newStatus: string) => {
    setIssues(prevIssues => 
      prevIssues.map(issue => 
        issue.id === issueId 
          ? { ...issue, status: newStatus, resolvedDate: newStatus === 'resolved' ? new Date().toISOString().split('T')[0] : (issue as any).resolvedDate }
          : issue
      )
    );
    
    if (selectedIssue.id === issueId) {
      setSelectedIssue(prevIssue => ({
        ...prevIssue,
        status: newStatus,
        resolvedDate: newStatus === 'resolved' ? new Date().toISOString().split('T')[0] : (prevIssue as any).resolvedDate
      }));
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Drawing Issues Management</h1>
          <p className="text-gray-600 mt-2">
            Track and resolve drawing-related issues efficiently
          </p>
        </div>
        <Button className="mt-4 md:mt-0">
          <AlertTriangle className="mr-2 h-4 w-4" />
          Report New Issue
        </Button>
      </div>

      {/* Issue Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 mr-4">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Open Issues</p>
                <p className="text-2xl font-bold">{statusCounts.open}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold">{statusCounts.in_progress}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 mr-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved</p>
                <p className="text-2xl font-bold">{statusCounts.resolved}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search by drawing, project, or description..."
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
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
              <select 
                value={categoryFilter} 
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border rounded-md px-3 py-2"
              >
                <option value="all">All Categories</option>
                <option value="structural">Structural</option>
                <option value="electrical">Electrical</option>
                <option value="plumbing">Plumbing</option>
                <option value="architectural">Architectural</option>
                <option value="mechanical">Mechanical</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Issue List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Drawing Issues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredIssues.map((issue) => (
                  <div 
                    key={issue.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedIssue?.id === issue.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedIssue(issue)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium line-clamp-1">{issue.drawingTitle}</h3>
                      <div className="flex gap-2">
                        <Badge className={priorityColors[issue.priority as keyof typeof priorityColors]}>
                          {issue.priority}
                        </Badge>
                        <Badge className={statusColors[issue.status as keyof typeof statusColors]}>
                          {issue.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{issue.projectName}</p>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-1">{issue.description}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-2">
                      <Calendar className="mr-1 h-3 w-3" />
                      Due: {issue.dueDate}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Issue Details */}
        <div className="lg:col-span-2">
          {selectedIssue && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center">
                      <AlertTriangle className="mr-2 h-5 w-5" />
                      {selectedIssue.drawingTitle}
                    </CardTitle>
                    <p className="text-gray-600 mt-1">{selectedIssue.projectName}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      size="sm"
                      disabled={selectedIssue.status === 'resolved'}
                      onClick={() => handleUpdateStatus(selectedIssue.id, 'resolved')}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark Resolved
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-medium mb-3">Issue Details</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Issue Type:</span>
                        <span>{selectedIssue.issueType.replace('_', ' ')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Category:</span>
                        <span>{selectedIssue.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Priority:</span>
                        <Badge className={priorityColors[selectedIssue.priority]}>
                          {selectedIssue.priority}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Severity:</span>
                        <Badge className={severityColors[selectedIssue.severity as keyof typeof severityColors]}>
                          {selectedIssue.severity}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <Badge className={statusColors[selectedIssue.status]}>
                          {selectedIssue.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Reported:</span>
                        <span>{selectedIssue.reportedDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Due Date:</span>
                        <span>{selectedIssue.dueDate}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Assigned & Team</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4 text-gray-600" />
                        <span className="text-gray-600">Reported by: </span>
                        <span className="ml-1">{selectedIssue.reportedBy}</span>
                      </div>
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4 text-gray-600" />
                        <span className="text-gray-600">Assigned to: </span>
                        <span className="ml-1">{selectedIssue.assignedTo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Project:</span>
                        <span>{selectedIssue.projectName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Drawing ID:</span>
                        <span>{selectedIssue.drawingId}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-gray-700">{selectedIssue.description}</p>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium mb-2">Resolution Steps</h4>
                  <div className="space-y-2">
                    {selectedIssue.resolutionSteps.map((step, index) => (
                      <div key={index} className="flex items-start">
                        <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                        <div className="text-sm">{step}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedIssue.resolutionNotes && (
                  <div className="mb-6">
                    <h4 className="font-medium mb-2">Resolution Notes</h4>
                    <p className="text-gray-700">{selectedIssue.resolutionNotes}</p>
                  </div>
                )}

                <div className="mb-6">
                  <h4 className="font-medium mb-2">Attached Files</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedIssue.files.map((file, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center">
                        <FileText className="mr-1 h-3 w-3" />
                        {file}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    disabled={selectedIssue.status === 'resolved'}
                    onClick={() => handleUpdateStatus(selectedIssue.id, 'in_progress')}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    Mark In Progress
                  </Button>
                  <Button 
                    variant="outline"
                    disabled={selectedIssue.status === 'resolved'}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Add Files
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* New Issue Form */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Report New Issue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Project</label>
              <Input
                value={newIssue.projectId}
                onChange={(e) => setNewIssue({...newIssue, projectId: e.target.value})}
                placeholder="Project ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Drawing ID</label>
              <Input
                value={newIssue.drawingId}
                onChange={(e) => setNewIssue({...newIssue, drawingId: e.target.value})}
                placeholder="Drawing ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Drawing Title</label>
              <Input
                value={newIssue.drawingTitle}
                onChange={(e) => setNewIssue({...newIssue, drawingTitle: e.target.value})}
                placeholder="Drawing Title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Issue Type</label>
              <select 
                value={newIssue.issueType} 
                onChange={(e) => setNewIssue({...newIssue, issueType: e.target.value})}
                className="w-full border rounded-md px-3 py-2"
              >
                <option value="">Select Issue Type</option>
                <option value="dimension_error">Dimension Error</option>
                <option value="code_violation">Code Violation</option>
                <option value="conflict">Design Conflict</option>
                <option value="incomplete">Incomplete Drawing</option>
                <option value="specification">Specification Issue</option>
                <option value="clarity">Clarity Issue</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select 
                value={newIssue.category} 
                onChange={(e) => setNewIssue({...newIssue, category: e.target.value})}
                className="w-full border rounded-md px-3 py-2"
              >
                <option value="">Select Category</option>
                <option value="structural">Structural</option>
                <option value="electrical">Electrical</option>
                <option value="plumbing">Plumbing</option>
                <option value="architectural">Architectural</option>
                <option value="mechanical">Mechanical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Priority</label>
              <select 
                value={newIssue.priority} 
                onChange={(e) => setNewIssue({...newIssue, priority: e.target.value})}
                className="w-full border rounded-md px-3 py-2"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                value={newIssue.description}
                onChange={(e) => setNewIssue({...newIssue, description: e.target.value})}
                placeholder="Describe the issue in detail..."
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Reported By</label>
              <select 
                value={newIssue.reportedBy} 
                onChange={(e) => setNewIssue({...newIssue, reportedBy: e.target.value})}
                className="w-full border rounded-md px-3 py-2"
              >
                <option value="Contractor Team">Contractor Team</option>
                <option value="Engineer Team">Engineer Team</option>
                <option value="Designer Team">Designer Team</option>
                <option value="Site Team">Site Team</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Due Date</label>
              <Input
                type="date"
                value={newIssue.dueDate}
                onChange={(e) => setNewIssue({...newIssue, dueDate: e.target.value})}
              />
            </div>
          </div>
          <div className="mt-4">
            <Button onClick={handleAddIssue}>
              <AlertTriangle className="mr-2 h-4 w-4" />
              Report Issue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}