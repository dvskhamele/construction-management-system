// Drawing Communication Page for Construction Management System
'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  FileText, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Users,
  FileDown,
  AlertTriangle
} from 'lucide-react';

export default function DrawingCommunicationPage() {
  const [drawings, setDrawings] = useState([
    {
      id: 1,
      title: 'Foundation Plan - Building A',
      version: 'v2.1',
      status: 'pending_approval',
      category: 'foundation',
      project: 'Downtown Complex',
      designer: 'Rajesh Sharma',
      engineer: 'Anil Kumar',
      contractor: 'Raj Construction',
      createdDate: '2025-03-15',
      dueDate: '2025-03-22',
      fileUrl: '/drawings/foundation-plan-v2.1.pdf',
      notes: 'Updated foundation design based on soil test results',
      approvals: [
        { type: 'designer', name: 'Rajesh Sharma', status: 'approved', date: '2025-03-16' },
        { type: 'engineer', name: 'Anil Kumar', status: 'pending', date: null }
      ],
      comments: [
        { id: 1, author: 'Anil Kumar', role: 'Engineer', message: 'Need to adjust column spacing according to new building codes', timestamp: '2025-03-16 10:30' },
        { id: 2, author: 'Rajesh Sharma', role: 'Designer', message: 'Updated spacing as requested, see revision 2.1', timestamp: '2025-03-16 14:20' }
      ]
    },
    {
      id: 2,
      title: 'Electrical Layout - Floor 3',
      version: 'v1.0',
      status: 'changes_requested',
      category: 'electrical',
      project: 'Downtown Complex',
      designer: 'Priya Patel',
      engineer: 'Suresh Reddy',
      contractor: 'Sharma Electrical',
      createdDate: '2025-03-10',
      dueDate: '2025-03-20',
      fileUrl: '/drawings/electrical-layout-floor3.pdf',
      notes: 'Initial electrical layout for 3rd floor',
      approvals: [
        { type: 'designer', name: 'Priya Patel', status: 'approved', date: '2025-03-11' },
        { type: 'engineer', name: 'Suresh Reddy', status: 'rejected', date: '2025-03-12', reason: 'Insufficient outlet spacing' }
      ],
      comments: [
        { id: 1, author: 'Suresh Reddy', role: 'Engineer', message: 'Outlets too far apart, needs to be within 6m as per code', timestamp: '2025-03-12 09:15' },
        { id: 2, author: 'Priya Patel', role: 'Designer', message: 'Will update with additional outlets', timestamp: '2025-03-12 11:00' }
      ]
    }
  ]);

  const [selectedTab, setSelectedTab] = useState('communications');
  const [selectedDrawing, setSelectedDrawing] = useState(drawings[0]);
  const [newComment, setNewComment] = useState('');
  const [newDrawing, setNewDrawing] = useState({
    title: '',
    category: '',
    project: '',
    designer: '',
    engineer: '',
    contractor: '',
    notes: ''
  });

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const updatedDrawings = drawings.map(drawing => {
      if (drawing.id === selectedDrawing.id) {
        const newCommentObj = {
          id: Date.now(),
          author: 'Current User',
          role: 'Designer',
          message: newComment,
          timestamp: new Date().toISOString().split('T')[0] + ' ' + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        };
        return {
          ...drawing,
          comments: [...drawing.comments, newCommentObj]
        };
      }
      return drawing;
    });

    setDrawings(updatedDrawings);
    const foundDrawing = updatedDrawings.find(d => d.id === selectedDrawing.id);
    if (foundDrawing) {
      setSelectedDrawing(foundDrawing);
    } else if (updatedDrawings.length > 0) {
      // If the selected item was deleted, select the first item in the list
      setSelectedDrawing(updatedDrawings[0]);
    }
    setNewComment('');
  };

  const handleApproveDrawing = (approvalType: string) => {
    const updatedDrawings = drawings.map(drawing => {
      if (drawing.id === selectedDrawing.id) {
        const updatedApprovals = drawing.approvals.map(approval => {
          if (approval.type === approvalType) {
            return {
              ...approval,
              status: 'approved',
              date: new Date().toISOString().split('T')[0]
            };
          }
          return approval;
        });
        return { ...drawing, approvals: updatedApprovals };
      }
      return drawing;
    });

    setDrawings(updatedDrawings);
    const foundDrawing = updatedDrawings.find(d => d.id === selectedDrawing.id);
    if (foundDrawing) {
      setSelectedDrawing(foundDrawing);
    } else if (updatedDrawings.length > 0) {
      // If the selected item was deleted, select the first item in the list
      setSelectedDrawing(updatedDrawings[0]);
    }
  };

  const handleRejectDrawing = (approvalType: string, reason: string) => {
    const updatedDrawings = drawings.map(drawing => {
      if (drawing.id === selectedDrawing.id) {
        const updatedApprovals = drawing.approvals.map(approval => {
          if (approval.type === approvalType) {
            return {
              ...approval,
              status: 'rejected',
              date: new Date().toISOString().split('T')[0],
              reason: reason
            };
          }
          return approval;
        });
        return { ...drawing, approvals: updatedApprovals };
      }
      return drawing;
    });

    setDrawings(updatedDrawings);
    const foundDrawing = updatedDrawings.find(d => d.id === selectedDrawing.id);
    if (foundDrawing) {
      setSelectedDrawing(foundDrawing);
    } else if (updatedDrawings.length > 0) {
      // If the selected item was deleted, select the first item in the list
      setSelectedDrawing(updatedDrawings[0]);
    }
  };

  const statusColors: Record<string, string> = {
    pending_approval: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    changes_requested: 'bg-red-100 text-red-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-teal-100 text-teal-800'
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Drawing Communication & Approval System</h1>
          <p className="text-gray-600 mt-2">
            Track drawing communications, approvals, and resolve issues efficiently
          </p>
        </div>
        <button className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
          <FileDown className="mr-2 h-4 w-4" />
          Upload New Drawing
        </button>
      </div>

      <div className="w-full">
        <div className="grid w-full grid-cols-3 border-b">
          <button 
            className={`py-2 px-4 text-center font-medium ${selectedTab === 'communications' ? 'border-b-2 border-teal-500 text-teal-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setSelectedTab('communications')}
          >
            Drawings
          </button>
          <button 
            className={`py-2 px-4 text-center font-medium ${selectedTab === 'approvals' ? 'border-b-2 border-teal-500 text-teal-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setSelectedTab('approvals')}
          >
            Approvals
          </button>
          <button 
            className={`py-2 px-4 text-center font-medium ${selectedTab === 'issues' ? 'border-b-2 border-teal-500 text-teal-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setSelectedTab('issues')}
          >
            Issues
          </button>
        </div>

        {selectedTab === 'communications' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Drawing List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="flex items-center text-lg font-semibold text-gray-900">
                    <FileText className="mr-2 h-5 w-5" />
                    Project Drawings
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {drawings.map((drawing) => (
                      <div 
                        key={drawing.id}
                        className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                          selectedDrawing.id === drawing.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                        onClick={() => setSelectedDrawing(drawing)}
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium line-clamp-1">{drawing.title}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${statusColors[drawing.status as keyof typeof statusColors]}`}>
                            {drawing.status.replace('_', ' ')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{drawing.project}</p>
                        <div className="flex items-center text-xs text-gray-500 mt-2">
                          <Clock className="mr-1 h-3 w-3" />
                          Due: {drawing.dueDate}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Drawing Details */}
            <div className="lg:col-span-2">
              {selectedDrawing && (
                <div className="bg-white rounded-lg shadow">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="flex items-center text-lg font-semibold text-gray-900">
                          {selectedDrawing.title} - {selectedDrawing.version}
                          <span className={`ml-2 px-2 py-1 text-xs rounded-full ${statusColors[selectedDrawing.status as keyof typeof statusColors]}`}>
                            {selectedDrawing.status.replace('_', ' ')}
                          </span>
                        </h3>
                        <p className="text-gray-600 mt-1">{selectedDrawing.project}</p>
                      </div>
                      <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                        <FileDown className="mr-2 h-4 w-4" />
                        Download
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-medium mb-2">Project Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Category:</span>
                            <span>{selectedDrawing.category}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Created:</span>
                            <span>{selectedDrawing.createdDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Due Date:</span>
                            <span>{selectedDrawing.dueDate}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Team</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarFallback>{selectedDrawing.designer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <span className="text-gray-600">Designer: </span>
                            <span className="ml-1">{selectedDrawing.designer}</span>
                          </div>
                          <div className="flex items-center">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarFallback>{selectedDrawing.engineer.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <span className="text-gray-600">Engineer: </span>
                            <span className="ml-1">{selectedDrawing.engineer}</span>
                          </div>
                          <div className="flex items-center">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarFallback>{selectedDrawing.contractor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <span className="text-gray-600">Contractor: </span>
                            <span className="ml-1">{selectedDrawing.contractor}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-medium mb-2">Notes</h4>
                      <p className="text-gray-700">{selectedDrawing.notes}</p>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Approvals</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {selectedDrawing.approvals.map((approval, index) => (
                          <div key={index} className="border rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{approval.type.charAt(0).toUpperCase() + approval.type.slice(1)}</span>
                              {approval.status === 'approved' ? (
                                <CheckCircle className="h-5 w-5 text-green-500" />
                              ) : approval.status === 'rejected' ? (
                                <XCircle className="h-5 w-5 text-red-500" />
                              ) : (
                                <Clock className="h-5 w-5 text-yellow-500" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{approval.name}</p>
                            {'reason' in approval && approval.reason && (
                              <p className="text-xs text-red-600 mt-1">Reason: {approval.reason}</p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">
                              {approval.date ? `Approved on ${approval.date}` : 'Pending approval'}
                            </p>
                            {approval.status === 'pending' && (
                              <div className="flex gap-2 mt-2">
                                <button 
                                  className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                  onClick={() => handleApproveDrawing(approval.type)}
                                >
                                  Approve
                                </button>
                                <button 
                                  className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                                  onClick={() => handleRejectDrawing(approval.type, 'Needs revision')}
                                >
                                  Reject
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Comments</h4>
                      <div className="space-y-3 mb-4">
                        {selectedDrawing.comments.map((comment) => (
                          <div key={comment.id} className="border-b pb-3 last:border-b-0">
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
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Add a comment..."
                          className="flex-grow block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        />
                        <button 
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                          onClick={handleAddComment}
                        >
                          Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {selectedTab === 'approvals' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="flex items-center text-lg font-semibold text-gray-900">
                <CheckCircle className="mr-2 h-5 w-5" />
                Drawing Approval Dashboard
              </h3>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Drawing</th>
                      <th className="text-left py-2">Project</th>
                      <th className="text-left py-2">Designer</th>
                      <th className="text-left py-2">Engineer</th>
                      <th className="text-left py-2">Status</th>
                      <th className="text-left py-2">Due Date</th>
                      <th className="text-left py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {drawings.map((drawing) => (
                      <tr key={drawing.id} className="border-b">
                        <td className="py-3">
                          <div className="font-medium">{drawing.title}</div>
                          <div className="text-sm text-gray-600">{drawing.version}</div>
                        </td>
                        <td className="py-3">{drawing.project}</td>
                        <td className="py-3">{drawing.designer}</td>
                        <td className="py-3">{drawing.engineer}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 text-xs rounded-full ${statusColors[drawing.status as keyof typeof statusColors]}`}>
                            {drawing.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="py-3">{drawing.dueDate}</td>
                        <td className="py-3">
                          <button className="inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                            Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'issues' && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="flex items-center text-lg font-semibold text-gray-900">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Drawing Issues & Communication Log
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {drawings.map((drawing) => (
                  <div key={drawing.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{drawing.title}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${statusColors[drawing.status as keyof typeof statusColors]}`}>
                        {drawing.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">Project: {drawing.project}</div>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                        <div>
                          <div className="font-medium">{drawing.designer} (Designer)</div>
                          <div className="text-sm text-gray-600">Created the drawing on {drawing.createdDate}</div>
                        </div>
                      </div>
                      {drawing.comments.map((comment) => (
                        <div key={comment.id} className="flex items-start ml-5">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                          <div>
                            <div className="font-medium">{comment.author} ({comment.role})</div>
                            <div className="text-sm text-gray-600">{comment.message}</div>
                            <div className="text-xs text-gray-500">{comment.timestamp}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}