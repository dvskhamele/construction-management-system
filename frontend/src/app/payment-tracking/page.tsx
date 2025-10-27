// Payment Tracking Page for Construction Management System
'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  Calendar,
  User,
  FileText, 
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Search
} from 'lucide-react';

export default function PaymentTrackingPage() {
  const [payments, setPayments] = useState([
    {
      id: 1,
      projectId: 1,
      projectName: 'Downtown Complex',
      contractorId: 1,
      contractorName: 'Raj Construction',
      drawingId: 1,
      drawingTitle: 'Foundation Plan - Building A',
      milestone: 'Foundation Completed',
      amount: 125000,
      status: 'pending',
      dueDate: '2025-03-25',
      issuedDate: '2025-03-20',
      description: 'Payment for completed foundation work as per drawing specifications',
      approvalStatus: 'approved',
      invoiceNumber: 'INV-001'
    },
    {
      id: 2,
      projectId: 1,
      projectName: 'Downtown Complex',
      contractorId: 2,
      contractorName: 'Sharma Electrical',
      drawingId: 2,
      drawingTitle: 'Electrical Layout - Floor 3',
      milestone: 'Electrical Rough-in',
      amount: 75000,
      status: 'overdue',
      dueDate: '2025-03-15',
      issuedDate: '2025-03-10',
      description: 'Payment for electrical rough-in work',
      approvalStatus: 'approved',
      invoiceNumber: 'INV-002'
    },
    {
      id: 3,
      projectId: 2,
      projectName: 'Residential Towers',
      contractorId: 1,
      contractorName: 'Raj Construction',
      drawingId: 3,
      drawingTitle: 'Structural Plan - Tower B',
      milestone: 'Structural Framework',
      amount: 250000,
      status: 'paid',
      dueDate: '2025-03-10',
      issuedDate: '2025-03-05',
      description: 'Payment for structural framework completion',
      approvalStatus: 'approved',
      invoiceNumber: 'INV-003'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPayment, setSelectedPayment] = useState(null);

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    paid: 'bg-green-100 text-green-800',
    overdue: 'bg-red-100 text-red-800',
    initiated: 'bg-blue-100 text-blue-800'
  };

  const approvalStatusColors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800'
  };

  const filteredPayments = payments.filter(payment => {
    const matchesFilter = filter === 'all' || payment.status === filter;
    const matchesSearch = payment.contractorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          payment.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          payment.drawingTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalPending = payments
    .filter(p => p.status === 'pending' || p.status === 'overdue')
    .reduce((sum, p) => sum + p.amount, 0);
  
  const totalPaid = payments
    .filter(p => p.status === 'paid')
    .reduce((sum, p) => sum + p.amount, 0);

  const handlePaymentStatusChange = (paymentId: number, newStatus: string) => {
    setPayments(prevPayments => 
      prevPayments.map(payment => 
        payment.id === paymentId 
          ? { ...payment, status: newStatus, paidDate: newStatus === 'paid' ? new Date().toISOString().split('T')[0] : (payment as any).paidDate }
          : payment
      )
    );
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Payment Tracking System</h1>
          <p className="text-gray-600 mt-2">
            Track payments linked to drawing approvals and project milestones
          </p>
        </div>
        <Button className="mt-4 md:mt-0">
          <DollarSign className="mr-2 h-4 w-4" />
          Add Payment
        </Button>
      </div>

      {/* Payment Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pending</p>
                <p className="text-2xl font-bold">₹{totalPending.toLocaleString()}</p>
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
                <p className="text-sm font-medium text-gray-600">Total Paid</p>
                <p className="text-2xl font-bold">₹{totalPaid.toLocaleString()}</p>
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
                <p className="text-2xl font-bold">{payments.filter(p => p.status === 'overdue').length}</p>
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
                  placeholder="Search by contractor, project, or drawing..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button 
                variant={filter === 'pending' ? 'default' : 'outline'}
                onClick={() => setFilter('pending')}
              >
                Pending
              </Button>
              <Button 
                variant={filter === 'paid' ? 'default' : 'outline'}
                onClick={() => setFilter('paid')}
              >
                Paid
              </Button>
              <Button 
                variant={filter === 'overdue' ? 'default' : 'outline'}
                onClick={() => setFilter('overdue')}
              >
                Overdue
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="mr-2 h-5 w-5" />
            Payment Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Invoice</th>
                  <th className="text-left py-2">Project</th>
                  <th className="text-left py-2">Contractor</th>
                  <th className="text-left py-2">Drawing</th>
                  <th className="text-left py-2">Milestone</th>
                  <th className="text-left py-2">Amount</th>
                  <th className="text-left py-2">Due Date</th>
                  <th className="text-left py-2">Status</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b hover:bg-gray-50">
                    <td className="py-3">
                      <div className="font-medium">{payment.invoiceNumber}</div>
                      <div className="text-sm text-gray-600">{payment.issuedDate}</div>
                    </td>
                    <td className="py-3">{payment.projectName}</td>
                    <td className="py-3">{payment.contractorName}</td>
                    <td className="py-3">
                      <div className="flex items-center">
                        <FileText className="mr-2 h-4 w-4" />
                        {payment.drawingTitle}
                      </div>
                    </td>
                    <td className="py-3">{payment.milestone}</td>
                    <td className="py-3">₹{payment.amount.toLocaleString()}</td>
                    <td className="py-3">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        {payment.dueDate}
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex flex-col">
                        <Badge className={statusColors[payment.status as keyof typeof statusColors]}>
                          {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                        </Badge>
                        <Badge className={`mt-1 ${approvalStatusColors[payment.approvalStatus as keyof typeof approvalStatusColors]}`}>
                          {payment.approvalStatus.charAt(0).toUpperCase() + payment.approvalStatus.slice(1)}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          disabled={payment.status === 'paid'}
                          onClick={() => handlePaymentStatusChange(payment.id, 'paid')}
                        >
                          Mark Paid
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                        >
                          View
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPayments.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No payments found matching your criteria
            </div>
          )}
        </CardContent>
      </Card>

      {/* Payment Issues Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5" />
            Payment Issues & Disputes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Invoice #INV-002 - Overdue Payment</h4>
                <p className="text-sm text-gray-600">Sharma Electrical - Electrical Rough-in</p>
                <p className="text-sm text-gray-600">₹75,000 due on 2025-03-15</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Contact Contractor</Button>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Disputed Payment - Foundation Plan</h4>
                <p className="text-sm text-gray-600">Raj Construction - Drawing Issue</p>
                <p className="text-sm text-gray-600">Payment on hold due to drawing revision requirement</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Resolve</Button>
                <Button variant="outline" size="sm">View Details</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}