// Financial Management Page for Construction CRM
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  Calendar, 
  Users, 
  HardHat, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  FileText, 
  TrendingUp,
  Search,
  Plus,
  Download,
  Upload,
  Send,
  Phone,
  Mail,
  User,
  Building,
  MapPin,
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
  Eye,
  Scale
} from 'lucide-react';

export default function FinancialManagementPage() {
  const [payments, setPayments] = useState([
    {
      id: 1,
      type: 'contractor_payout',
      contractorName: 'Raj Construction',
      projectName: 'Downtown Complex',
      siteName: 'Site A',
      description: 'Foundation work completion payment',
      amount: 125000,
      status: 'completed',
      dueDate: '2025-03-15',
      issuedDate: '2025-03-10',
      paidDate: '2025-03-14',
      paymentMethod: 'bank_transfer',
      referenceNumber: 'BANK123456',
      milestone: 'Foundation Completed',
      approvedBy: 'Manager',
      approvedDate: '2025-03-09',
      notes: 'Payment for foundation work as per contract terms. Drawing verified by site engineer.',
      attachments: ['foundation-completion-cert.pdf'],
      category: 'construction',
      priority: 'high'
    },
    {
      id: 2,
      type: 'salary',
      employeeName: 'Anil Sharma',
      employeeRole: 'Site Engineer',
      description: 'Monthly salary for March 2025',
      amount: 75000,
      status: 'pending',
      dueDate: '2025-04-05',
      issuedDate: '2025-04-01',
      paidDate: null,
      paymentMethod: 'bank_transfer',
      referenceNumber: '',
      milestone: 'Monthly Salary',
      approvedBy: 'HR',
      approvedDate: '2025-03-28',
      notes: 'March salary including project bonus. Overtime for weekend concreting work.',
      attachments: [],
      category: 'salary',
      priority: 'high'
    },
    {
      id: 3,
      type: 'material_payment',
      supplierName: 'Steel Suppliers Inc',
      projectName: 'Downtown Complex',
      description: 'Steel material payment',
      amount: 85000,
      status: 'overdue',
      dueDate: '2025-03-10',
      issuedDate: '2025-03-05',
      paidDate: null,
      paymentMethod: 'check',
      referenceNumber: 'CHK7890',
      milestone: 'Material Delivery',
      approvedBy: 'Manager',
      approvedDate: '2025-03-04',
      notes: 'Overdue payment for steel supply',
      attachments: ['material-invoice.pdf'],
      category: 'materials',
      priority: 'urgent'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(payments[0]);
  const [showAddForm, setShowAddForm] = useState(false);

  const [newPayment, setNewPayment] = useState({
    type: 'contractor_payout',
    contractorName: '',
    employeeName: '',
    projectName: '',
    siteName: '',
    description: '',
    amount: '',
    dueDate: new Date().toISOString().split('T')[0],
    milestone: '',
    notes: ''
  });

  const statusColors: { [key: string]: string } = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    overdue: 'bg-red-100 text-red-800',
    cancelled: 'bg-gray-100 text-gray-800'
  };

  const typeColors: { [key: string]: string } = {
    contractor_payout: 'bg-blue-100 text-blue-800',
    salary: 'bg-green-100 text-green-800',
    material_payment: 'bg-purple-100 text-purple-800',
    equipment_rental: 'bg-yellow-100 text-yellow-800'
  };

  const categoryColors: { [key: string]: string } = {
    construction: 'bg-blue-100 text-blue-800',
    salary: 'bg-green-100 text-green-800',
    materials: 'bg-purple-100 text-purple-800',
    equipment: 'bg-yellow-100 text-yellow-800',
    other: 'bg-gray-100 text-gray-800'
  };

  const priorityColors: { [key: string]: string } = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
    urgent: 'bg-rose-100 text-rose-800'
  };

  const filteredPayments = payments.filter(payment => {
    const matchesFilter = filter === 'all' || payment.status === filter;
    const matchesSearch = payment.contractorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          payment.employeeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          payment.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          payment.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAddPayment = () => {
    if (!newPayment.description || !newPayment.amount) return;

    // Create a simple payment object for contractor payouts
    const paymentObj = {
      id: payments.length + 1,
      type: newPayment.type,
      contractorName: newPayment.contractorName,
      projectName: newPayment.projectName,
      siteName: newPayment.siteName,
      description: newPayment.description,
      amount: parseFloat(newPayment.amount),
      status: 'pending',
      dueDate: newPayment.dueDate,
      issuedDate: new Date().toISOString().split('T')[0],
      paidDate: '',
      paymentMethod: 'bank_transfer',
      referenceNumber: '',
      approvedBy: '',
      approvedDate: '',
      attachments: [],
      category: 'construction',
      priority: 'medium',
      milestone: newPayment.milestone || '',
      notes: newPayment.notes || ''
    };

    setPayments([paymentObj, ...payments]);
    setNewPayment({
      type: 'contractor_payout',
      contractorName: '',
      employeeName: '',
      projectName: '',
      siteName: '',
      description: '',
      amount: '',
      dueDate: new Date().toISOString().split('T')[0],
      milestone: '',
      notes: ''
    });
    setShowAddForm(false);
  };

  const handleApprovePayment = (paymentId: number) => {
    setPayments(prev => 
      prev.map(p => 
        p.id === paymentId 
          ? { ...p, status: 'approved', approvedDate: new Date().toISOString().split('T')[0] } 
          : p
      )
    );
    
    if (selectedPayment.id === paymentId) {
      setSelectedPayment(prev => ({
        ...prev,
        status: 'approved',
        approvedDate: new Date().toISOString().split('T')[0]
      }));
    }
  };

  const handleCompletePayment = (paymentId: number) => {
    setPayments(prev => 
      prev.map(p => 
        p.id === paymentId 
          ? { 
              id: p.id,
              type: p.type,
              contractorName: p.contractorName || '',
              projectName: p.projectName || '',
              siteName: p.siteName || '',
              description: p.description || '',
              amount: p.amount || 0,
              status: 'completed',
              dueDate: p.dueDate || '',
              issuedDate: p.issuedDate || '',
              paidDate: new Date().toISOString().split('T')[0],
              paymentMethod: p.paymentMethod || '',
              referenceNumber: p.referenceNumber || '',
              approvedBy: p.approvedBy || '',
              approvedDate: p.approvedDate || '',
              milestone: p.milestone || '',
              notes: p.notes || '',
              attachments: p.attachments || [],
              category: p.category || '',
              priority: p.priority || '',
              supplierName: p.supplierName,
              employeeName: p.employeeName,
              employeeRole: p.employeeRole
            } as any
          : p
      )
    );
    
    if (selectedPayment.id === paymentId) {
      setSelectedPayment(prev => ({
        ...prev,
        status: 'completed',
        paidDate: new Date().toISOString().split('T')[0]
      } as any));
    }
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Financial Management System</h1>
          <p className="text-gray-600 mt-2">
            Manage contractor payouts, salaries, and project expenses
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button onClick={() => setShowAddForm(!showAddForm)}>
            <Plus className="mr-2 h-4 w-4" />
            New Payment
          </Button>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Payout Rules
          </Button>
        </div>
      </div>

      {/* Pain Point Alerts */}
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
              Financial Management Pain Points & Solutions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center">
                  <Lock className="h-5 w-5 text-blue-500 mr-2" />
                  <span className="font-medium text-blue-800">Payment Issue Resolution</span>
                </div>
                <p className="text-xs text-blue-700 mt-1">
                  Payment issues resolved through milestone tracking. ₹250/sq ft auto-calculated.
                </p>
              </div>
              
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-medium text-green-800">Contractor Hiring Management</span>
                </div>
                <p className="text-xs text-green-700 mt-1">
                  Structured contractor hiring with rating system. New contractors trained properly.
                </p>
              </div>
              
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center">
                  <Eye className="h-5 w-5 text-purple-500 mr-2" />
                  <span className="font-medium text-purple-800">Drawing Management</span>
                </div>
                <p className="text-xs text-purple-700 mt-1">
                  Payment linked to approved drawings. No payment without proper drawing verification.
                </p>
              </div>
              
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center">
                  <Wrench className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="font-medium text-amber-800">Business Loss Prevention</span>
                </div>
                <p className="text-xs text-amber-700 mt-1">
                  Contractor number exchange prevented. All payments processed through CRM only.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Payment Form */}
      {showAddForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create New Payment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Payment Type</label>
                <select 
                  value={newPayment.type} 
                  onChange={(e) => setNewPayment({...newPayment, type: e.target.value})}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="contractor_payout">Contractor Payout</option>
                  <option value="salary">Employee Salary</option>
                  <option value="material_payment">Material Payment</option>
                  <option value="equipment_rental">Equipment Rental</option>
                </select>
              </div>
              
              {newPayment.type === 'contractor_payout' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Contractor</label>
                  <Input
                    value={newPayment.contractorName}
                    onChange={(e) => setNewPayment({...newPayment, contractorName: e.target.value})}
                    placeholder="Contractor Name"
                  />
                </div>
              )}
              
              {newPayment.type === 'salary' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Employee</label>
                  <Input
                    value={newPayment.employeeName}
                    onChange={(e) => setNewPayment({...newPayment, employeeName: e.target.value})}
                    placeholder="Employee Name"
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium mb-1">Project</label>
                <Input
                  value={newPayment.projectName}
                  onChange={(e) => setNewPayment({...newPayment, projectName: e.target.value})}
                  placeholder="Project Name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Site</label>
                <Input
                  value={newPayment.siteName}
                  onChange={(e) => setNewPayment({...newPayment, siteName: e.target.value})}
                  placeholder="Site Name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Amount (₹)</label>
                <Input
                  type="number"
                  value={newPayment.amount}
                  onChange={(e) => setNewPayment({...newPayment, amount: e.target.value})}
                  placeholder="Payment amount"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Milestone</label>
                <Input
                  value={newPayment.milestone}
                  onChange={(e) => setNewPayment({...newPayment, milestone: e.target.value})}
                  placeholder="Milestone or reason"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Due Date</label>
                <Input
                  type="date"
                  value={newPayment.dueDate}
                  onChange={(e) => setNewPayment({...newPayment, dueDate: e.target.value})}
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Description</label>
                <Input
                  value={newPayment.description}
                  onChange={(e) => setNewPayment({...newPayment, description: e.target.value})}
                  placeholder="Payment description"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Notes</label>
                <Input
                  value={newPayment.notes}
                  onChange={(e) => setNewPayment({...newPayment, notes: e.target.value})}
                  placeholder="Additional notes"
                />
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button onClick={handleAddPayment}>
                <Plus className="mr-2 h-4 w-4" />
                Create Payment
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
                  placeholder="Search by contractor, employee, project, or description..."
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
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="completed">Completed</option>
                <option value="overdue">Overdue</option>
                <option value="cancelled">Cancelled</option>
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
        {/* Payments List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5" />
                Payments ({filteredPayments.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredPayments.map((payment) => (
                  <div 
                    key={payment.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedPayment?.id === payment.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedPayment(payment)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">
                          {payment.type === 'salary' ? payment.employeeName : payment.contractorName}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">{payment.projectName}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex gap-2">
                          <Badge className={typeColors[payment.type]}>
                            {payment.type.replace('_', ' ')}
                          </Badge>
                          <Badge className={statusColors[payment.status]}>
                            {payment.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <div className="text-lg font-bold mt-1">₹{payment.amount?.toLocaleString()}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-xs text-gray-500 mt-2">
                      <Calendar className="mr-1 h-3 w-3" />
                      Due: {payment.dueDate}
                    </div>
                    
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <FileText className="mr-1 h-3 w-3" />
                      {payment.milestone}
                    </div>
                    
                    {payment.priority && (
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        <Badge className={priorityColors[payment.priority]}>
                          {payment.priority}
                        </Badge>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Details */}
        <div className="lg:col-span-2">
          {selectedPayment && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center">
                        <DollarSign className="mr-2 h-5 w-5" />
                        Payment Details #{selectedPayment.id}
                      </CardTitle>
                      <p className="text-gray-600 mt-1">{selectedPayment.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={typeColors[selectedPayment.type]}>
                        {selectedPayment.type.replace('_', ' ')}
                      </Badge>
                      <Badge className={statusColors[selectedPayment.status]}>
                        {selectedPayment.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-medium mb-3">Payment Information</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Description:</span>
                          <span>{selectedPayment.description}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Amount:</span>
                          <span className="font-bold">₹{selectedPayment.amount?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <Badge className={statusColors[selectedPayment.status]}>
                            {selectedPayment.status.replace('_', ' ')}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Due Date:</span>
                          <span>{selectedPayment.dueDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Issued Date:</span>
                          <span>{selectedPayment.issuedDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Paid Date:</span>
                          <span>{selectedPayment.paidDate || 'Not Paid'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Payment Method:</span>
                          <span>{selectedPayment.paymentMethod.replace('_', ' ')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Reference Number:</span>
                          <span>{selectedPayment.referenceNumber || 'None'}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Project Details</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Milestone:</span>
                          <span>{selectedPayment.milestone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Approved By:</span>
                          <span>{selectedPayment.approvedBy || 'Pending'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Approved Date:</span>
                          <span>{selectedPayment.approvedDate || 'Pending'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Project:</span>
                          <span>{selectedPayment.projectName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Site:</span>
                          <span>{selectedPayment.siteName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Type:</span>
                          <span>{selectedPayment.type.replace('_', ' ')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Category:</span>
                          <Badge className={categoryColors[selectedPayment.category]}>
                            {selectedPayment.category}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Priority:</span>
                          <Badge className={priorityColors[selectedPayment.priority]}>
                            {selectedPayment.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {selectedPayment.notes && (
                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Notes</h4>
                      <p className="text-gray-700">{selectedPayment.notes}</p>
                    </div>
                  )}

                  {/* Attachments */}
                  {selectedPayment.attachments && selectedPayment.attachments.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Attachments</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedPayment.attachments.map((attachment, index) => (
                          <Badge key={index} variant="secondary" className="flex items-center">
                            <FileText className="mr-1 h-3 w-3" />
                            {attachment}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 flex-wrap">
                    {selectedPayment.status === 'pending' && (
                      <>
                        <Button 
                          variant="outline" 
                          onClick={() => handleApprovePayment(selectedPayment.id)}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => handleCompletePayment(selectedPayment.id)}
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark Paid
                        </Button>
                      </>
                    )}
                    
                    {selectedPayment.status === 'approved' && (
                      <Button 
                        variant="outline" 
                        onClick={() => handleCompletePayment(selectedPayment.id)}
                      >
                        <DollarSign className="mr-2 h-4 w-4" />
                        Process Payment
                      </Button>
                    )}
                    
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      Export
                    </Button>
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Add Receipt
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

              {/* Payment Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="mr-2 h-5 w-5" />
                    Payment Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <div className="font-medium">Salary Payments</div>
                        <div className="text-sm text-gray-600">Monthly by 5th</div>
                      </div>
                      <Badge variant="secondary">Automatic</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <div className="font-medium">Milestone Payments</div>
                        <div className="text-sm text-gray-600">Upon completion + inspection</div>
                      </div>
                      <Badge variant="secondary">Conditional</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <div className="font-medium">Festival Bonuses</div>
                        <div className="text-sm text-gray-600">Before Diwali</div>
                      </div>
                      <Badge variant="secondary">Annual</Badge>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-sm text-yellow-800">
                      <AlertTriangle className="inline mr-2 h-4 w-4" />
                      Ensure all milestone payments are linked to approved drawings and completed work verification.
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