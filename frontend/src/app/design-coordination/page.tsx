// Design Coordination Page for Construction Management System
'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users,
  MessageSquare,
  FileText,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  User,
  Send
} from 'lucide-react';

export default function DesignCoordinationPage() {
  const [communications, setCommunications] = useState([
    {
      id: 1,
      project: 'Downtown Complex',
      drawingId: 1,
      drawingTitle: 'Foundation Plan - Building A',
      issueType: 'spacing',
      priority: 'high',
      status: 'open',
      createdDate: '2025-03-18',
      lastUpdated: '2025-03-20',
      description: 'Column spacing does not match building code requirements. Needs adjustment to meet 6m maximum spacing.',
      designer: {
        id: 1,
        name: 'Rajesh Sharma',
        role: 'Designer',
        contact: 'rajesh@designfirm.com',
        phone: '+91 98765 43210'
      },
      engineer: {
        id: 1,
        name: 'Anil Kumar',
        role: 'Structural Engineer',
        contact: 'anil@eng.com',
        phone: '+91 98765 43211'
      },
      contractor: {
        id: 1,
        name: 'Raj Construction',
        role: 'Contractor',
        contact: 'contact@rajconstruction.com',
        phone: '+91 98765 43212'
      },
      comments: [
        {
          id: 1,
          author: 'Anil Kumar',
          role: 'Engineer',
          message: 'Noted the spacing issue. Please adjust column positions to meet code requirements.',
          timestamp: '2025-03-18 09:30'
        },
        {
          id: 2,
          author: 'Rajesh Sharma',
          role: 'Designer',
          message: 'Working on revised spacing. Will have updated drawing by tomorrow.',
          timestamp: '2025-03-18 14:15'
        },
        {
          id: 3,
          author: 'Raj Contractor',
          role: 'Contractor',
          message: 'This will impact our construction schedule. Please prioritize the update.',
          timestamp: '2025-03-19 10:00'
        }
      ]
    },
    {
      id: 2,
      project: 'Residential Towers',
      drawingId: 2,
      drawingTitle: 'Electrical Layout - Floor 5',
      issueType: 'specification',
      priority: 'medium',
      status: 'resolved',
      createdDate: '2025-03-15',
      lastUpdated: '2025-03-17',
      description: 'Outlet specifications do not match contractor requirements. Need to change from 15A to 20A outlets.',
      designer: {
        id: 2,
        name: 'Priya Patel',
        role: 'Designer',
        contact: 'priya@designfirm.com',
        phone: '+91 98765 43213'
      },
      engineer: {
        id: 2,
        name: 'Suresh Reddy',
        role: 'Electrical Engineer',
        contact: 'suresh@eng.com',
        phone: '+91 98765 43214'
      },
      contractor: {
        id: 2,
        name: 'Sharma Electrical',
        role: 'Contractor',
        contact: 'info@sharmaelec.com',
        phone: '+91 98765 43215'
      },
      comments: [
        {
          id: 1,
          author: 'Sharma Electrical',
          role: 'Contractor',
          message: 'Our equipment requires 20A outlets instead of 15A. Please update drawing.',
          timestamp: '2025-03-15 11:00'
        },
        {
          id: 2,
          author: 'Priya Patel',
          role: 'Designer',
          message: 'Updated outlet specifications to 20A as requested.',
          timestamp: '2025-03-16 15:30'
        },
        {
          id: 3,
          author: 'Suresh Reddy',
          role: 'Engineer',
          message: 'Specification change approved. Updated drawing v1.2 is ready.',
          timestamp: '2025-03-17 09:45'
        }
      ]
    }
  ]);

  const [selectedComm, setSelectedComm] = useState(communications[0]);
  const [newComment, setNewComment] = useState('');
  const [filter, setFilter] = useState('all');

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

  const filteredCommunications = communications.filter(comm => {
    if (filter === 'all') return true;
    return comm.status === filter;
  });

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const updatedComms = communications.map(comm => {
      if (comm.id === selectedComm.id) {
        const newCommentObj = {
          id: Date.now(),
          author: 'Current User',
          role: 'Designer',
          message: newComment,
          timestamp: new Date().toISOString().split('T')[0] + ' ' + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        };
        return {
          ...comm,
          comments: [...comm.comments, newCommentObj],
          lastUpdated: new Date().toISOString().split('T')[0],
          status: 'in_progress'
        };
      }
      return comm;
    });

    setCommunications(updatedComms);
    const foundComm = updatedComms.find(c => c.id === selectedComm.id);
    if (foundComm) {
      setSelectedComm(foundComm);
    } else if (updatedComms.length > 0) {
      // If the selected item was deleted, select the first item in the list
      setSelectedComm(updatedComms[0]);
    }
    // If no items left, we keep the old selection (even though it's deleted)
    setNewComment('');
  };

  const handleResolveIssue = (commId: number) => {
    const updatedComms = communications.map(comm => 
      comm.id === commId ? { ...comm, status: 'resolved' } : comm
    );
    setCommunications(updatedComms);
    const foundComm = updatedComms.find(c => c.id === commId);
    if (foundComm) {
      setSelectedComm(foundComm);
    } else if (updatedComms.length > 0) {
      // If the selected item was deleted, select the first item in the list
      setSelectedComm(updatedComms[0]);
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Design Coordination System</h1>
          <p className="text-gray-600 mt-2">
            Facilitate communication between designers, engineers, and contractors
          </p>
        </div>
        <Button className="mt-4 md:mt-0">
          <MessageSquare className="mr-2 h-4 w-4" />
          New Coordination
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Communication List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5" />
                  Coordination Issues
                </CardTitle>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant={filter === 'all' ? 'default' : 'outline'}
                    onClick={() => setFilter('all')}
                  >
                    All
                  </Button>
                  <Button 
                    size="sm" 
                    variant={filter === 'open' ? 'default' : 'outline'}
                    onClick={() => setFilter('open')}
                  >
                    Open
                  </Button>
                  <Button 
                    size="sm" 
                    variant={filter === 'resolved' ? 'default' : 'outline'}
                    onClick={() => setFilter('resolved')}
                  >
                    Resolved
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCommunications.map((comm) => (
                  <div 
                    key={comm.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedComm?.id === comm.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedComm(comm)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium line-clamp-1">{comm.drawingTitle}</h3>
                      <div className="flex gap-2">
                        <Badge className={priorityColors[comm.priority as keyof typeof priorityColors]}>
                          {comm.priority}
                        </Badge>
                        <Badge className={statusColors[comm.status as keyof typeof statusColors]}>
                          {comm.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{comm.project}</p>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-1">{comm.description}</p>
                    <div className="flex items-center text-xs text-gray-500 mt-2">
                      <Clock className="mr-1 h-3 w-3" />
                      Updated: {comm.lastUpdated}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Communication Details */}
        <div className="lg:col-span-2">
          {selectedComm && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center">
                        <FileText className="mr-2 h-5 w-5" />
                        {selectedComm.drawingTitle}
                      </CardTitle>
                      <p className="text-gray-600 mt-1">{selectedComm.project}</p>
                    </div>
                    <div className="flex gap-2">
                      {selectedComm.status === 'open' && (
                        <Button 
                          variant="outline"
                          onClick={() => handleResolveIssue(selectedComm.id)}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark Resolved
                        </Button>
                      )}
                      <Button variant="outline">
                        <FileText className="mr-2 h-4 w-4" />
                        View Drawing
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-medium mb-3">Team Information</h4>
                      
                      <div className="mb-4 p-3 border rounded-lg">
                        <div className="flex items-center mb-2">
                          <User className="mr-2 h-4 w-4 text-blue-600" />
                          <span className="font-medium">Designer</span>
                        </div>
                        <p className="text-sm">{selectedComm.designer.name}</p>
                        <p className="text-xs text-gray-600">{selectedComm.designer.contact}</p>
                        <p className="text-xs text-gray-600 flex items-center">
                          <Phone className="mr-1 h-3 w-3" />
                          {selectedComm.designer.phone}
                        </p>
                      </div>

                      <div className="mb-4 p-3 border rounded-lg">
                        <div className="flex items-center mb-2">
                          <User className="mr-2 h-4 w-4 text-green-600" />
                          <span className="font-medium">Engineer</span>
                        </div>
                        <p className="text-sm">{selectedComm.engineer.name}</p>
                        <p className="text-xs text-gray-600">{selectedComm.engineer.contact}</p>
                        <p className="text-xs text-gray-600 flex items-center">
                          <Phone className="mr-1 h-3 w-3" />
                          {selectedComm.engineer.phone}
                        </p>
                      </div>

                      <div className="p-3 border rounded-lg">
                        <div className="flex items-center mb-2">
                          <User className="mr-2 h-4 w-4 text-purple-600" />
                          <span className="font-medium">Contractor</span>
                        </div>
                        <p className="text-sm">{selectedComm.contractor.name}</p>
                        <p className="text-xs text-gray-600">{selectedComm.contractor.contact}</p>
                        <p className="text-xs text-gray-600 flex items-center">
                          <Phone className="mr-1 h-3 w-3" />
                          {selectedComm.contractor.phone}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Issue Details</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Issue Type:</span>
                          <span>{selectedComm.issueType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Priority:</span>
                          <Badge className={priorityColors[selectedComm.priority]}>
                            {selectedComm.priority}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <Badge className={statusColors[selectedComm.status]}>
                            {selectedComm.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Created:</span>
                          <span>{selectedComm.createdDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Updated:</span>
                          <span>{selectedComm.lastUpdated}</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <h4 className="font-medium mb-2">Description</h4>
                        <p className="text-gray-700">{selectedComm.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Communication Thread</h4>
                    <div className="space-y-4">
                      {selectedComm.comments.map((comment) => (
                        <div key={comment.id} className="border-l-4 border-blue-200 pl-4 py-1">
                          <div className="flex items-center mb-1">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarFallback>{comment.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{comment.author}</span>
                            <span className="text-xs text-gray-500 ml-2">({comment.role})</span>
                            <span className="text-xs text-gray-500 ml-auto">{comment.timestamp}</span>
                          </div>
                          <p className="text-gray-700">{comment.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">Add Comment</h4>
                    <div className="flex gap-2">
                      <Input
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Type your message here..."
                      />
                      <Button onClick={handleAddComment}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button variant="outline" className="flex flex-col items-center p-4">
                      <Phone className="h-6 w-6 mb-2" />
                      <span>Call Designer</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center p-4">
                      <Mail className="h-6 w-6 mb-2" />
                      <span>Email Team</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center p-4">
                      <MapPin className="h-6 w-6 mb-2" />
                      <span>Schedule Meeting</span>
                    </Button>
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