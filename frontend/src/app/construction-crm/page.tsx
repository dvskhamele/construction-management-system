// Construction CRM Dashboard Page
'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  HardHat, 
  FileText, 
  Building, 
  User, 
  DollarSign, 
  MessageSquare, 
  BarChart3,
  Calendar,
  Phone,
  MapPin,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Wrench,
  Hammer,
  Scale,
  Shield,
  Lock,
  Eye
} from 'lucide-react';
import Link from 'next/link';

export default function ConstructionCrmDashboard() {
  const [dashboardStats, setDashboardStats] = useState({
    totalProjects: 12,
    activeSites: 8,
    totalContractors: 24,
    totalEmployees: 32,
    pendingPayments: 5,
    openIssues: 3,
    totalClients: 18,
    monthlyRevenue: 2500000,
    drawingIssues: 2,
    contractorComms: 1,
    budgetOverruns: 0,
    qualityChecks: 45
  });

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      type: 'project',
      title: 'New Project Started',
      description: 'Downtown Commercial Complex - Phase 1',
      time: '2 hours ago',
      status: 'active'
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment Released',
      description: 'Payment of ₹1,20,000 released to Raj Construction',
      time: '4 hours ago',
      status: 'completed'
    },
    {
      id: 3,
      type: 'issue',
      title: 'Drawing Issue Reported',
      description: 'Foundation Plan - Column spacing needs adjustment',
      time: '6 hours ago',
      status: 'open'
    },
    {
      id: 4,
      type: 'contractor',
      title: 'New Contractor Added',
      description: 'Sharma Masonry registered as new contractor',
      time: '1 day ago',
      status: 'active'
    },
    {
      id: 5,
      type: 'quality',
      title: 'Quality Check Completed',
      description: 'Brick work 8-inch leveling verified - Site A',
      time: '3 hours ago',
      status: 'completed'
    },
    {
      id: 6,
      type: 'budget',
      title: 'Budget Adjustment Required',
      description: 'Material cost increased by 8% for Downtown Complex',
      time: '5 hours ago',
      status: 'pending'
    }
  ]);

  const [upcomingTasks, setUpcomingTasks] = useState([
    {
      id: 1,
      title: 'Site Inspection - Building A',
      dueDate: '2025-03-25',
      priority: 'high',
      assignedTo: 'Anil Sharma',
      project: 'Downtown Complex',
      type: 'inspection'
    },
    {
      id: 2,
      title: 'Drawing Approval - Electrical Layout',
      dueDate: '2025-03-26',
      priority: 'medium',
      assignedTo: 'Priya Patel',
      project: 'Residential Towers',
      type: 'approval'
    },
    {
      id: 3,
      title: 'Payment Due - Plumbing Work',
      dueDate: '2025-03-27',
      priority: 'high',
      assignedTo: 'Finance Team',
      project: 'Commercial Plaza',
      type: 'payment'
    },
    {
      id: 4,
      title: 'Contractor Meeting - Raj Construction',
      dueDate: '2025-03-25',
      priority: 'medium',
      assignedTo: 'Site Engineer',
      project: 'Downtown Complex',
      type: 'meeting'
    },
    {
      id: 5,
      title: 'Quality Check - Brick Work',
      dueDate: '2025-03-26',
      priority: 'high',
      assignedTo: 'Quality Team',
      project: 'Residential Towers',
      type: 'quality'
    }
  ]);

  const [painPointAlerts, setPainPointAlerts] = useState([
    {
      id: 1,
      type: 'drawing',
      title: 'Drawing Spacing Issue',
      description: 'Column spacing discrepancy detected in Foundation Plan',
      priority: 'high',
      project: 'Downtown Complex',
      action: 'Review Drawing'
    },
    {
      id: 2,
      type: 'communication',
      title: 'Unauthorized Communication Attempt',
      description: 'Contractor attempted direct contact with client',
      priority: 'critical',
      project: 'Residential Towers',
      action: 'Block & Warn'
    },
    {
      id: 3,
      type: 'quality',
      title: 'Work Quality Concern',
      description: '4-inch brick work instead of 8-inch as per specification',
      priority: 'high',
      project: 'Commercial Plaza',
      action: 'Inspect & Rectify'
    }
  ]);

  const stats = [
    { title: 'Total Projects', value: dashboardStats.totalProjects, icon: Building, color: 'bg-blue-100 text-blue-600' },
    { title: 'Active Sites', value: dashboardStats.activeSites, icon: HardHat, color: 'bg-green-100 text-green-600' },
    { title: 'Contractors', value: dashboardStats.totalContractors, icon: Users, color: 'bg-purple-100 text-purple-600' },
    { title: 'Employees', value: dashboardStats.totalEmployees, icon: User, color: 'bg-orange-100 text-orange-600' },
    { title: 'Pending Payments', value: dashboardStats.pendingPayments, icon: DollarSign, color: 'bg-yellow-100 text-yellow-600' },
    { title: 'Open Issues', value: dashboardStats.openIssues, icon: AlertTriangle, color: 'bg-red-100 text-red-600' },
    { title: 'Drawing Issues', value: dashboardStats.drawingIssues, icon: FileText, color: 'bg-indigo-100 text-indigo-600' },
    { title: 'Quality Checks', value: dashboardStats.qualityChecks, icon: CheckCircle, color: 'bg-emerald-100 text-emerald-600' }
  ];

  const priorityColors: { [key: string]: string } = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
    critical: 'bg-rose-100 text-rose-800'
  };

  const alertIcons: { [key: string]: React.ForwardRefExoticComponent<Omit<React.SVGProps<SVGSVGElement>, "ref"> & React.RefAttributes<SVGSVGElement>> } = {
    drawing: FileText,
    communication: MessageSquare,
    quality: CheckCircle,
    budget: DollarSign,
    schedule: Calendar
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Construction CRM Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage projects, contractors, employees, and clients in one place
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            New Project
          </Button>
          <Button variant="outline">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Alerts
          </Button>
        </div>
      </div>

      {/* Pain Point Alerts */}
      {painPointAlerts.length > 0 && (
        <div className="mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                Critical Pain Point Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {painPointAlerts.map((alert) => {
                  const AlertIcon = alertIcons[alert.type] || AlertTriangle;
                  return (
                    <div key={alert.id} className="flex items-start p-3 border border-red-200 bg-red-50 rounded-lg">
                      <AlertIcon className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium text-red-800">{alert.title}</h4>
                          <Badge className={priorityColors[alert.priority]}>
                            {alert.priority.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-red-700 mt-1">{alert.description}</p>
                        <p className="text-xs text-red-600 mt-1">Project: {alert.project}</p>
                      </div>
                      <Button variant="outline" size="sm" className="ml-2">
                        {alert.action}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center">
                <div className={`p-3 rounded-full ${stat.color} mr-4`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start border-b pb-3 last:border-b-0 hover:bg-gray-50 p-2 rounded">
                    <div className="mr-3 mt-1">
                      {activity.type === 'project' && <Building className="h-5 w-5 text-blue-500" />}
                      {activity.type === 'payment' && <DollarSign className="h-5 w-5 text-green-500" />}
                      {activity.type === 'issue' && <AlertTriangle className="h-5 w-5 text-yellow-500" />}
                      {activity.type === 'contractor' && <Users className="h-5 w-5 text-purple-500" />}
                      {activity.type === 'quality' && <CheckCircle className="h-5 w-5 text-emerald-500" />}
                      {activity.type === 'budget' && <DollarSign className="h-5 w-5 text-yellow-500" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{activity.title}</h4>
                      <p className="text-sm text-gray-600">{activity.description}</p>
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <Clock className="mr-1 h-3 w-3" />
                        {activity.time}
                      </div>
                    </div>
                    <Badge variant={activity.status === 'completed' ? 'default' : activity.status === 'active' ? 'secondary' : 'outline'}>
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Tasks and Pain Points */}
        <div className="space-y-6">
          {/* Upcoming Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Upcoming Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="border rounded-lg p-3 hover:bg-gray-50">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-sm">{task.title}</h4>
                      <Badge variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}>
                        {task.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{task.project}</p>
                    <p className="text-xs text-gray-600 mt-1">Due: {task.dueDate}</p>
                    <p className="text-xs text-gray-600 mt-1">Assigned: {task.assignedTo}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pain Point Resolution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Pain Point Resolution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center">
                    <Lock className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-sm font-medium text-blue-800">Communication Control</span>
                  </div>
                  <p className="text-xs text-blue-700 mt-1">All contractor communication routed through CRM</p>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center">
                    <Eye className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm font-medium text-green-800">Drawing Sync</span>
                  </div>
                  <p className="text-xs text-green-700 mt-1">Real-time drawing coordination with version control</p>
                </div>
                
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="flex items-center">
                    <Scale className="h-4 w-4 text-purple-500 mr-2" />
                    <span className="text-sm font-medium text-purple-800">Budget Management</span>
                  </div>
                  <p className="text-xs text-purple-700 mt-1">Smart budgeting with automatic updates</p>
                </div>
                
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <div className="flex items-center">
                    <Hammer className="h-4 w-4 text-amber-500 mr-2" />
                    <span className="text-sm font-medium text-amber-800">Quality Assurance</span>
                  </div>
                  <p className="text-xs text-amber-700 mt-1">Real-time quality checks with photo verification</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link href="/construction-crm/contractors">
                  <Card className="hover:bg-gray-50 cursor-pointer transition-colors">
                    <CardContent className="p-4 flex flex-col items-center">
                      <HardHat className="h-8 w-8 text-blue-500 mb-2" />
                      <h3 className="font-medium text-center">Contractors</h3>
                      <p className="text-sm text-gray-600">{dashboardStats.totalContractors} contractors</p>
                    </CardContent>
                  </Card>
                </Link>
                
                <Link href="/construction-crm/sites">
                  <Card className="hover:bg-gray-50 cursor-pointer transition-colors">
                    <CardContent className="p-4 flex flex-col items-center">
                      <Building className="h-8 w-8 text-green-500 mb-2" />
                      <h3 className="font-medium text-center">Sites</h3>
                      <p className="text-sm text-gray-600">{dashboardStats.activeSites} active sites</p>
                    </CardContent>
                  </Card>
                </Link>
                
                <Link href="/construction-crm/employees">
                  <Card className="hover:bg-gray-50 cursor-pointer transition-colors">
                    <CardContent className="p-4 flex flex-col items-center">
                      <User className="h-8 w-8 text-purple-500 mb-2" />
                      <h3 className="font-medium text-center">Employees</h3>
                      <p className="text-sm text-gray-600">{dashboardStats.totalEmployees} employees</p>
                    </CardContent>
                  </Card>
                </Link>
                
                <Link href="/construction-crm/clients">
                  <Card className="hover:bg-gray-50 cursor-pointer transition-colors">
                    <CardContent className="p-4 flex flex-col items-center">
                      <Users className="h-8 w-8 text-orange-500 mb-2" />
                      <h3 className="font-medium text-center">Clients</h3>
                      <p className="text-sm text-gray-600">{dashboardStats.totalClients} clients</p>
                    </CardContent>
                  </Card>
                </Link>
                
                <Link href="/construction-crm/projects">
                  <Card className="hover:bg-gray-50 cursor-pointer transition-colors">
                    <CardContent className="p-4 flex flex-col items-center">
                      <BarChart3 className="h-8 w-8 text-red-500 mb-2" />
                      <h3 className="font-medium text-center">Projects</h3>
                      <p className="text-sm text-gray-600">{dashboardStats.totalProjects} projects</p>
                    </CardContent>
                  </Card>
                </Link>
                
                <Link href="/construction-crm/drawings">
                  <Card className="hover:bg-gray-50 cursor-pointer transition-colors">
                    <CardContent className="p-4 flex flex-col items-center">
                      <FileText className="h-8 w-8 text-indigo-500 mb-2" />
                      <h3 className="font-medium text-center">Drawings</h3>
                      <p className="text-sm text-gray-600">Manage drawings</p>
                    </CardContent>
                  </Card>
                </Link>
                
                <Link href="/construction-crm/finance">
                  <Card className="hover:bg-gray-50 cursor-pointer transition-colors">
                    <CardContent className="p-4 flex flex-col items-center">
                      <DollarSign className="h-8 w-8 text-yellow-500 mb-2" />
                      <h3 className="font-medium text-center">Finance</h3>
                      <p className="text-sm text-gray-600">{dashboardStats.pendingPayments} pending payments</p>
                    </CardContent>
                  </Card>
                </Link>
                
                <Link href="/construction-crm/communications">
                  <Card className="hover:bg-gray-50 cursor-pointer transition-colors">
                    <CardContent className="p-4 flex flex-col items-center">
                      <MessageSquare className="h-8 w-8 text-cyan-500 mb-2" />
                      <h3 className="font-medium text-center">Communications</h3>
                      <p className="text-sm text-gray-600">{dashboardStats.openIssues} open issues</p>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}