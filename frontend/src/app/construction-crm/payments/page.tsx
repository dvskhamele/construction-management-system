// Payment Management Page for Construction CRM
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
  Video,
  Phone,
  Mail,
  User,
  Wrench,
  Hammer,
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
  TrendingDown
} from 'lucide-react';

export default function PaymentManagementPage() {
  const [payments, setPayments] = useState([
    {
      id: 1,
      type: 'contractor_payout',
      contractorId: 1,
      contractorName: 'Raj Construction',
      projectId: 1,
      projectName: 'Downtown Complex',
      siteId: 1,
      siteName: 'Site A',
      description: 'Foundation work completion payment',
      amount: 125000,
      currency: 'INR',
      status: 'completed',
      dueDate: '2025-03-15',
      issuedDate: '2025-03-10',
      paidDate: '2025-03-14',
      paymentMethod: 'bank_transfer',
      referenceNumber: 'BANK123456',
      milestone: 'Foundation Completed',
      approvedBy: 'Manager',
      approvedDate: '2025-03-09',
      notes: 'Payment for foundation work as per contract terms. Drawing spacing corrected to 6m max.',
      attachments: ['foundation-completion-cert.pdf'],
      taxDeduction: 0,
      netAmount: 125000,
      category: 'construction',
      priority: 'high',
      payoutRules: {
        directPayment: false,
        paymentThroughCrm: true,
        approvalRequired: true,
        releaseCriteriaMet: true
      }
    },
    {
      id: 2,
      type: 'salary',
      employeeId: 1,
      employeeName: 'Anil Sharma',
      employeeRole: 'Site Engineer',
      description: 'Monthly salary for March 2025',
      amount: 75000,
      currency: 'INR',
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
      taxDeduction: 5000,
      netAmount: 70000,
      category: 'salary',
      priority: 'high',
      payoutRules: {
        directPayment: true,
        paymentThroughCrm: true,
        approvalRequired: true,
        releaseCriteriaMet: true
      }
    },
    {
      id: 3,
      type: 'material_payment',
      supplierId: 1,
      supplierName: 'Steel Suppliers Inc',
      projectId: 1,
      projectName: 'Downtown Complex',
      description: 'Steel material payment',
      amount: 85000,
      currency: 'INR',
      status: 'overdue',
      dueDate: '2025-03-10',
      issuedDate: '2025-03-05',
      paidDate: null,
      paymentMethod: 'check',
      referenceNumber: 'CHK7890',
      milestone: 'Material Delivery',
      approvedBy: 'Manager',
      approvedDate: '2025-03-04',
      notes: 'Overdue payment for steel supply. Supplier requesting immediate payment.',
      attachments: ['material-invoice.pdf'],
      taxDeduction: 0,
      netAmount: 85000,
      category: 'materials',
      priority: 'urgent',
      payoutRules: {
        directPayment: false,
        paymentThroughCrm: true,
        approvalRequired: true,
        releaseCriteriaMet: true
      }
    }
  ]);

  const [payoutRules] = useState([
    {
      id: 1,
      description: 'Foundation completion',
      milestone: 'foundation_completed',
      percentage: 15,
      condition: 'foundation_inspection_passed',
      applicableTo: ['contractor'],
      timing: 'after_inspection',
      verificationRequired: ['drawing_verification', 'site_inspection'],
      qualityThreshold: '90%',
      paymentRestrictions: {
        directPayment: false,
        paymentThroughCrm: true,
        approvalRequired: true
      }
    },
    {
      id: 2,
      description: 'Framing completion',
      milestone: 'framing_completed',
      percentage: 25,
      condition: 'framing_inspection_passed',
      applicableTo: ['contractor'],
      timing: 'after_inspection',
      verificationRequired: ['drawing_verification', 'site_inspection'],
      qualityThreshold: '95%',
      paymentRestrictions: {
        directPayment: false,
        paymentThroughCrm: true,
        approvalRequired: true
      }
    },
    {
      id: 3,
      description: 'Monthly salary',
      milestone: 'monthly',
      percentage: 100,
      condition: 'timesheet_approved',
      applicableTo: ['employee'],
      timing: 'by_5th_of_month',
      verificationRequired: ['timesheet_verification'],
      qualityThreshold: '100%',
      paymentRestrictions: {
        directPayment: true,
        paymentThroughCrm: true,
        approvalRequired: true
      }
    },
    {
      id: 4,
      description: 'Diwali bonus',
      milestone: 'festival',
      percentage: 10,
      condition: 'festival_date',
      applicableTo: ['employee'],
      timing: 'before_festival',
      verificationRequired: ['performance_evaluation'],
      qualityThreshold: '85%',
      paymentRestrictions: {
        directPayment: true,
        paymentThroughCrm: true,
        approvalRequired: true
      }
    },
    {
      id: 5,
      description: 'Quality rectification work',
      milestone: 'quality_rectification',
      percentage: 100,
      condition: 'quality_work_verified',
      applicableTo: ['contractor'],
      timing: 'after_verification',
      verificationRequired: ['quality_inspection', 'retraining_completion'],
      qualityThreshold: '100%',
      paymentRestrictions: {
        directPayment: false,
        paymentThroughCrm: true,
        approvalRequired: true
      }
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(payments[0]);
  const [showNewPaymentForm, setShowNewPaymentForm] = useState(false);
  const [showPayoutRules, setShowPayoutRules] = useState(false);

  const [newPayment, setNewPayment] = useState({
    type: 'contractor_payout',
    contractorId: '',
    employeeId: '',
    projectId: '',
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
    const matchesStatus = filter === 'all' || payment.status === filter;
    const matchesCategory = categoryFilter === 'all' || payment.category === categoryFilter;
    const matchesSearch = payment.contractorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          payment.employeeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          payment.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          payment.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesCategory && matchesSearch;
  });

  // Calculate financial summary
  const summary = {
    totalPending: payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
    totalOverdue: payments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0),
    totalCompleted: payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0),
    totalOutstanding: payments.filter(p => p.status === 'pending' || p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0),
    totalPayments: payments.length,
    avgPayment: payments.length > 0 ? payments.reduce((sum, p) => sum + p.amount, 0) / payments.length : 0
  };

  const handleAddPayment = () => {
    if (!newPayment.description || !newPayment.amount) return;

    const paymentObj = {
      id: payments.length + 1,
      type: newPayment.type,
      contractorId: newPayment.contractorId ? parseInt(newPayment.contractorId) : null,
      contractorName: newPayment.type === 'contractor_payout' ? 'New Contractor' : undefined,
      employeeId: newPayment.employeeId ? parseInt(newPayment.employeeId) : null,
      employeeName: newPayment.type === 'salary' ? 'New Employee' : undefined,
      projectId: newPayment.projectId ? parseInt(newPayment.projectId) : null,
      projectName: 'New Project',
      description: newPayment.description,
      amount: parseFloat(newPayment.amount),
      currency: 'INR',
      status: 'pending',
      dueDate: newPayment.dueDate,
      issuedDate: new Date().toISOString().split('T')[0],
      paidDate: null,
      paymentMethod: 'bank_transfer',
      referenceNumber: '',
      milestone: newPayment.milestone,
      approvedBy: '',
      approvedDate: null,
      notes: newPayment.notes,
      attachments: [],
      taxDeduction: 0,
      netAmount: parseFloat(newPayment.amount),
      category: newPayment.type === 'salary' ? 'salary' : 'construction',
      priority: 'medium',
      payoutRules: {
        directPayment: false,
        paymentThroughCrm: true,
        approvalRequired: true,
        releaseCriteriaMet: true
      }
    };

    setPayments([paymentObj as any, ...payments]);
    setNewPayment({
      type: 'contractor_payout',
      contractorId: '',
      employeeId: '',
      projectId: '',
      description: '',
      amount: '',
      dueDate: new Date().toISOString().split('T')[0],
      milestone: '',
      notes: ''
    });
    setShowNewPaymentForm(false);
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
          ? { ...p, status: 'completed', paidDate: new Date().toISOString().split('T')[0] } as any 
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

  // Get unique contractors and employees for the form
  const contractors = [
    { id: 1, name: 'Raj Construction', specialty: 'civil', rating: 4.5 },
    { id: 2, name: 'Sharma Masonry', specialty: 'masonry', rating: 4.2 },
    { id: 3, name: 'Electrical Experts', specialty: 'electrical', rating: 4.0 }
  ];

  const employees = [
    { id: 1, name: 'Anil Sharma', role: 'Site Engineer', department: 'Engineering' },
    { id: 2, name: 'Priya Patel', role: 'Designer', department: 'Design' },
    { id: 3, name: 'Raj Contractor', role: 'Contractor Manager', department: 'Contractor' }
  ];

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Financial Management System</h1>
          <p className="text-gray-600 mt-2">
            Manage contractor payouts, salaries, and project expenses with security restrictions
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button onClick={() => setShowNewPaymentForm(!showNewPaymentForm)}>
            <Plus className="mr-2 h-4 w-4" />
            New Payment
          </Button>
          <Button variant="outline" onClick={() => setShowPayoutRules(!setShowPayoutRules)}>
            <FileText className="mr-2 h-4 w-4" />
            Payout Rules
          </Button>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-xl font-bold">₹{summary.totalPending?.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-red-100 mr-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Overdue</p>
                <p className="text-xl font-bold">₹{summary.totalOverdue?.toLocaleString()}</p>
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
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-xl font-bold">₹{summary.totalCompleted?.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 mr-4">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Outstanding</p>
                <p className="text-xl font-bold">₹{summary.totalOutstanding?.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 mr-4">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Payment</p>
                <p className="text-xl font-bold">₹{Math.round(summary.avgPayment).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
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
                  <span className="font-medium text-blue-800">Payment Restrictions</span>
                </div>
                <p className="text-xs text-blue-700 mt-1">
                  All contractor payments restricted until work verified. Payments linked to approved drawings.
                </p>
              </div>
              
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-medium text-green-800">Quality Assurance</span>
                </div>
                <p className="text-xs text-green-700 mt-1">
                  Payment only after 8-inch brick work verification. Prevents 4-inch only payment.
                </p>
              </div>
              
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <div className="flex items-center">
                  <Eye className="h-5 w-5 text-purple-500 mr-2" />
                  <span className="font-medium text-purple-800">Real-time Monitoring</span>
                </div>
                <p className="text-xs text-purple-700 mt-1">
                  All payment requests logged in system. Prevents unauthorized bypass and business loss.
                </p>
              </div>
              
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-center">
                  <Wrench className="h-5 w-5 text-amber-500 mr-2" />
                  <span className="font-medium text-amber-800">Field Issue Resolution</span>
                </div>
                <p className="text-xs text-amber-700 mt-1">
                  Critical issues like 4-inch instead of 8-inch brick work resolved before payment.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Payment Form */}
      {showNewPaymentForm && (
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
                  <select 
                    value={newPayment.contractorId} 
                    onChange={(e) => setNewPayment({...newPayment, contractorId: e.target.value})}
                    className="w-full border rounded-md px-3 py-2"
                  >
                    <option value="">Select Contractor</option>
                    {contractors.map(c => (
                      <option key={c.id} value={c.id}>{c.name} ({c.specialty})</option>
                    ))}
                  </select>
                </div>
              )}
              
              {newPayment.type === 'salary' && (
                <div>
                  <label className="block text-sm font-medium mb-1">Employee</label>
                  <select 
                    value={newPayment.employeeId} 
                    onChange={(e) => setNewPayment({...newPayment, employeeId: e.target.value})}
                    className="w-full border rounded-md px-3 py-2"
                  >
                    <option value="">Select Employee</option>
                    {employees.map(e => (
                      <option key={e.id} value={e.id}>{e.name} ({e.role})</option>
                    ))}
                  </select>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium mb-1">Project</label>
                <select 
                  value={newPayment.projectId} 
                  onChange={(e) => setNewPayment({...newPayment, projectId: e.target.value})}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="">Select Project</option>
                  <option value="1">Downtown Complex</option>
                  <option value="2">Residential Towers</option>
                  <option value="3">Commercial Plaza</option>
                </select>
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
                <Textarea
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
              <Button variant="outline" onClick={() => setShowNewPaymentForm(false)}>
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
              <select 
                value={categoryFilter} 
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border rounded-md px-3 py-2"
              >
                <option value="all">All Categories</option>
                <option value="construction">Construction</option>
                <option value="salary">Salary</option>
                <option value="materials">Materials</option>
                <option value="equipment">Equipment</option>
                <option value="other">Other</option>
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
                    
                    {payment.priority && (
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        <Badge className={priorityColors[payment.priority]}>
                          {payment.priority}
                        </Badge>
                      </div>
                    )}
                    
                    {payment.payoutRules && !payment.payoutRules.directPayment && (
                      <div className="flex items-center text-xs text-blue-600 mt-1">
                        <Lock className="mr-1 h-3 w-3" />
                        Payment restricted
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
                          <span className="text-gray-600">Net Amount:</span>
                          <span>₹{selectedPayment.netAmount?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax Deduction:</span>
                          <span>₹{selectedPayment.taxDeduction?.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Currency:</span>
                          <span>{selectedPayment.currency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Payment Method:</span>
                          <span>{selectedPayment.paymentMethod.replace('_', ' ')}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Timeline</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Issued Date:</span>
                          <span>{selectedPayment.issuedDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Due Date:</span>
                          <span>{selectedPayment.dueDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Paid Date:</span>
                          <span>{selectedPayment.paidDate || 'Not Paid'}</span>
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
                          <span className="text-gray-600">Priority:</span>
                          <Badge className={priorityColors[selectedPayment.priority]}>
                            {selectedPayment.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-medium mb-3">Recipient</h4>
                      <div className="space-y-2">
                        {selectedPayment.type === 'salary' ? (
                          <>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Name:</span>
                              <span>{selectedPayment.employeeName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Role:</span>
                              <span>{selectedPayment.employeeRole}</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Company:</span>
                              <span>{selectedPayment.contractorName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">ID:</span>
                              <span>{selectedPayment.contractorId}</span>
                            </div>
                          </>
                        )}
                        <div className="flex justify-between">
                          <span className="text-gray-600">Reference:</span>
                          <span>{selectedPayment.referenceNumber || 'None'}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Project Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Project:</span>
                          <span>{selectedPayment.projectName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Site:</span>
                          <span>{selectedPayment.siteName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Milestone:</span>
                          <span>{selectedPayment.milestone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Category:</span>
                          <Badge className={categoryColors[selectedPayment.category]}>
                            {selectedPayment.category}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Restrictions Notice */}
                  <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <div className="flex items-start">
                      <Shield className="mr-2 h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-800">Payment Restrictions</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          <span className="font-medium">Direct Payment:</span> {selectedPayment.payoutRules.directPayment ? 'Allowed' : 'Restricted'}
                          </p>
                        <p className="text-sm text-blue-700">
                          <span className="font-medium">Payment Method:</span> {selectedPayment.payoutRules.paymentThroughCrm ? 'Through CRM' : 'Direct'}
                        </p>
                        <p className="text-sm text-blue-700">
                          <span className="font-medium">Approval Required:</span> {selectedPayment.payoutRules.approvalRequired ? 'Yes' : 'No'}
                        </p>
                        <p className="text-sm text-blue-700">
                          <span className="font-medium">Release Criteria Met:</span> {selectedPayment.payoutRules.releaseCriteriaMet ? 'Yes' : 'No'}
                        </p>
                        <p className="text-sm text-blue-700 mt-2">
                          <AlertTriangle className="inline mr-1 h-4 w-4" />
                          Note: Direct payment without CRM approval is prohibited. All payments must go through CRM system.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Notes and Attachments */}
                  {selectedPayment.notes && (
                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Notes</h4>
                      <p className="text-gray-700">{selectedPayment.notes}</p>
                    </div>
                  )}

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
                      Note: Direct payment without CRM approval is prohibited. All payments must go through CRM system.
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
                        <div className="font-medium">Diwali Bonus</div>
                        <div className="text-sm text-gray-600">Before Diwali</div>
                      </div>
                      <Badge variant="secondary">Annual</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded">
                      <div>
                        <div className="font-medium">Quality Rectification</div>
                        <div className="text-sm text-gray-600">After verification</div>
                      </div>
                      <Badge variant="secondary">Quality Based</Badge>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-sm text-yellow-800">
                      <AlertTriangle className="inline mr-2 h-4 w-4" />
                      Ensure all milestone payments are linked to approved drawings and completed work verification.
                      Payment restrictions prevent unauthorized releases until quality checks are completed.
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