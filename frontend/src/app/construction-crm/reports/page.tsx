// Real-time Reporting System for Site Engineers
'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  Calendar, 
  HardHat, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  FileText, 
  BarChart3,
  TrendingUp,
  MapPin,
  Phone,
  MessageSquare
} from 'lucide-react';

export default function RealTimeReportingSystem() {
  const [reports, setReports] = useState([
    {
      id: 1,
      date: '2025-03-20',
      time: '09:00 AM',
      site: 'Downtown Complex - Site A',
      siteId: 1,
      engineer: 'Anil Sharma',
      engineerId: 1,
      projectPhase: 'framing',
      status: 'on_schedule',
      weather: 'sunny',
      temperature: 28,
      workers: 45,
      tasksCompleted: 12,
      tasksPending: 8,
      issues: [
        { id: 1, type: 'technical', description: 'Column spacing needs adjustment', priority: 'high', resolved: false },
        { id: 2, type: 'material', description: 'Bricks running low', priority: 'medium', resolved: true }
      ],
      progress: 65,
      workDone: [
        'Foundation completed',
        'Framing 80% complete',
        'Electrical conduit installed'
      ],
      nextTasks: [
        'Plastering work',
        'Window installation',
        'Plumbing rough-in'
      ],
      photos: ['work-progress-1.jpg', 'work-progress-2.jpg'],
      materialsUsed: [
        { item: 'Cement', quantity: '50 bags', status: 'in_stock' },
        { item: 'Steel', quantity: '2500 kg', status: 'in_stock' },
        { item: 'Bricks', quantity: '10000 pcs', status: 'low_stock' }
      ],
      laborReport: {
        mistry: 8,
        laborers: 37,
        attendance: 98 // percentage
      },
      safetyReport: {
        incidents: 0,
        safetyViolations: 1,
        safetyMeasures: 'All workers wearing PPE'
      },
      qualityReport: {
        passed: 12,
        failed: 1,
        remarks: 'Foundation quality excellent, minor plastering issue'
      }
    },
    {
      id: 2,
      date: '2025-03-20',
      time: '10:30 AM',
      site: 'Residential Towers - Site B',
      siteId: 2,
      engineer: 'Priya Patel',
      engineerId: 2,
      projectPhase: 'electrical',
      status: 'delayed',
      weather: 'rainy',
      temperature: 22,
      workers: 28,
      tasksCompleted: 5,
      tasksPending: 12,
      issues: [
        { id: 1, type: 'weather', description: 'Work stopped due to rain', priority: 'high', resolved: false }
      ],
      progress: 42,
      workDone: [
        'Electrical rough-in 80% complete',
        'Plumbing work finished'
      ],
      nextTasks: [
        'Wait for weather to clear',
        'Continue electrical work',
        'Schedule inspection'
      ],
      photos: ['electrical-work.jpg'],
      materialsUsed: [
        { item: 'Cables', quantity: '500m', status: 'in_stock' },
        { item: 'Switches', quantity: '150 pcs', status: 'in_stock' }
      ],
      laborReport: {
        mistry: 5,
        laborers: 23,
        attendance: 100 // percentage
      },
      safetyReport: {
        incidents: 1,
        safetyViolations: 0,
        safetyMeasures: 'Minor incident reported, no injuries'
      },
      qualityReport: {
        passed: 8,
        failed: 0,
        remarks: 'Work quality good'
      }
    }
  ]);

  const [engineers] = useState([
    { id: 1, name: 'Anil Sharma', sites: ['Downtown Complex - Site A'], specialty: 'civil', contact: 'anil@construction.com' },
    { id: 2, name: 'Priya Patel', sites: ['Residential Towers - Site B'], specialty: 'electrical', contact: 'priya@construction.com' }
  ]);

  const [sites] = useState([
    { id: 1, name: 'Downtown Complex - Site A', location: 'Delhi', projectType: 'commercial', progress: 65 },
    { id: 2, name: 'Residential Towers - Site B', location: 'Delhi', projectType: 'residential', progress: 42 }
  ]);

  const [filter, setFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('today');
  const [selectedReport, setSelectedReport] = useState(reports[0]);
  const [showNewReportForm, setShowNewReportForm] = useState(false);

  const [newReport, setNewReport] = useState({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().split(' ')[0].substring(0, 5),
    siteId: '',
    projectPhase: 'foundation',
    weather: 'sunny',
    temperature: '25',
    workers: '',
    tasksCompleted: '',
    tasksPending: '',
    issues: [],
    progress: '',
    workDone: '',
    nextTasks: '',
    newIssue: { type: '', description: '', priority: 'medium' },
    newWorkDone: '',
    newNextTask: ''
  });

  const statusColors: { [key: string]: string } = {
    on_schedule: 'bg-green-100 text-green-800',
    delayed: 'bg-red-100 text-red-800',
    ahead: 'bg-blue-100 text-blue-800',
    at_risk: 'bg-yellow-100 text-yellow-800'
  };

  const priorityColors: { [key: string]: string } = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
    critical: 'bg-rose-100 text-rose-800'
  };

  const materialStatusColors: { [key: string]: string } = {
    in_stock: 'bg-green-100 text-green-800',
    low_stock: 'bg-yellow-100 text-yellow-800',
    out_of_stock: 'bg-red-100 text-red-800'
  };

  const filteredReports = reports.filter(report => {
    const matchesDate = dateFilter === 'today' ? report.date === new Date().toISOString().split('T')[0] : true;
    const matchesStatus = filter === 'all' || report.status === filter;
    return matchesDate && matchesStatus;
  });

  const handleAddReport = () => {
    if (!newReport.siteId || !newReport.workers || !newReport.tasksCompleted || !newReport.tasksPending) return;

    const reportObj = {
      id: reports.length + 1,
      date: newReport.date,
      time: newReport.time,
      site: sites.find(s => s.id === parseInt(newReport.siteId))?.name || 'Unknown Site',
      siteId: parseInt(newReport.siteId),
      engineer: 'Current User',
      engineerId: 1,
      projectPhase: newReport.projectPhase,
      status: 'on_schedule', // Default status
      weather: newReport.weather,
      temperature: parseInt(newReport.temperature),
      workers: parseInt(newReport.workers),
      tasksCompleted: parseInt(newReport.tasksCompleted),
      tasksPending: parseInt(newReport.tasksPending),
      issues: newReport.issues,
      progress: parseInt(newReport.progress),
      workDone: newReport.workDone.split('\n').filter(w => w.trim() !== ''),
      nextTasks: newReport.nextTasks.split('\n').filter(n => n.trim() !== ''),
      photos: [],
      materialsUsed: [],
      laborReport: {
        mistry: 0,
        laborers: parseInt(newReport.workers) || 0,
        attendance: 100
      },
      safetyReport: {
        incidents: 0,
        safetyViolations: 0,
        safetyMeasures: 'Standard safety measures followed'
      },
      qualityReport: {
        passed: parseInt(newReport.tasksCompleted) || 0,
        failed: 0,
        remarks: 'Work in progress'
      }
    };

    setReports([reportObj, ...reports]);
    setNewReport({
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().split(' ')[0].substring(0, 5),
      siteId: '',
      projectPhase: 'foundation',
      weather: 'sunny',
      temperature: '25',
      workers: '',
      tasksCompleted: '',
      tasksPending: '',
      issues: [],
      progress: '',
      workDone: '',
      nextTasks: '',
      newIssue: { type: '', description: '', priority: 'medium' },
      newWorkDone: '',
      newNextTask: ''
    });
    setShowNewReportForm(false);
  };

  const handleAddIssue = () => {
    if (!newReport.newIssue.type || !newReport.newIssue.description) return;

    setNewReport(prev => ({
      ...prev,
      issues: [...prev.issues, newReport.newIssue] as any,
      newIssue: { type: '', description: '', priority: 'medium' }
    }));
  };

  const handleAddWorkDone = () => {
    if (!newReport.newWorkDone.trim()) return;

    setNewReport(prev => ({
      ...prev,
      workDone: prev.workDone ? `${prev.workDone}\n${prev.newWorkDone}` : prev.newWorkDone,
      newWorkDone: ''
    }));
  };

  const handleAddNextTask = () => {
    if (!newReport.newNextTask.trim()) return;

    setNewReport(prev => ({
      ...prev,
      nextTasks: prev.nextTasks ? `${prev.nextTasks}\n${prev.newNextTask}` : prev.newNextTask,
      newNextTask: ''
    }));
  };

  // Calculate summary metrics
  const summary = {
    totalSites: sites.length,
    activeReports: reports.length,
    delayedSites: reports.filter(r => r.status === 'delayed').length,
    totalWorkers: reports.reduce((sum, report) => sum + report.workers, 0),
    avgProgress: reports.length > 0 ? reports.reduce((sum, report) => sum + report.progress, 0) / reports.length : 0,
    totalIssues: reports.reduce((sum, report) => sum + report.issues.length, 0),
    resolvedIssues: reports.reduce((sum, report) => sum + report.issues.filter(i => i.resolved).length, 0)
  };

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Real-Time Site Reporting System</h1>
          <p className="text-gray-600 mt-2">
            Live updates, progress tracking, and issue resolution for site engineers
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button onClick={() => setShowNewReportForm(!showNewReportForm)}>
            <FileText className="mr-2 h-4 w-4" />
            New Report
          </Button>
          <Button variant="outline">
            <BarChart3 className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 mr-4">
                <HardHat className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Active Sites</p>
                <p className="text-2xl font-bold">{summary.totalSites}</p>
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
                <p className="text-sm font-medium text-gray-600">Live Reports</p>
                <p className="text-2xl font-bold">{summary.activeReports}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-yellow-100 mr-4">
                <AlertTriangle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Delayed Sites</p>
                <p className="text-2xl font-bold">{summary.delayedSites}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 mr-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Workers Active</p>
                <p className="text-2xl font-bold">{summary.totalWorkers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Report Form */}
      {showNewReportForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Submit New Site Report</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <Input
                  type="date"
                  value={newReport.date}
                  onChange={(e) => setNewReport({...newReport, date: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Time</label>
                <Input
                  type="time"
                  value={newReport.time}
                  onChange={(e) => setNewReport({...newReport, time: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Site</label>
                <select 
                  value={newReport.siteId} 
                  onChange={(e) => setNewReport({...newReport, siteId: e.target.value})}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="">Select Site</option>
                  {sites.map(site => (
                    <option key={site.id} value={site.id}>{site.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Project Phase</label>
                <select 
                  value={newReport.projectPhase} 
                  onChange={(e) => setNewReport({...newReport, projectPhase: e.target.value})}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="foundation">Foundation</option>
                  <option value="framing">Framing</option>
                  <option value="electrical">Electrical</option>
                  <option value="plumbing">Plumbing</option>
                  <option value="finishing">Finishing</option>
                  <option value="inspection">Inspection</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Weather</label>
                <select 
                  value={newReport.weather} 
                  onChange={(e) => setNewReport({...newReport, weather: e.target.value})}
                  className="w-full border rounded-md px-3 py-2"
                >
                  <option value="sunny">Sunny</option>
                  <option value="cloudy">Cloudy</option>
                  <option value="rainy">Rainy</option>
                  <option value="windy">Windy</option>
                  <option value="storm">Storm</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Temperature (°C)</label>
                <Input
                  type="number"
                  value={newReport.temperature}
                  onChange={(e) => setNewReport({...newReport, temperature: e.target.value})}
                  placeholder="Temperature"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Workers Present</label>
                <Input
                  type="number"
                  value={newReport.workers}
                  onChange={(e) => setNewReport({...newReport, workers: e.target.value})}
                  placeholder="Number of workers"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Progress (%)</label>
                <Input
                  type="number"
                  value={newReport.progress}
                  onChange={(e) => setNewReport({...newReport, progress: e.target.value})}
                  placeholder="Progress percentage"
                  max="100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tasks Completed</label>
                <Input
                  type="number"
                  value={newReport.tasksCompleted}
                  onChange={(e) => setNewReport({...newReport, tasksCompleted: e.target.value})}
                  placeholder="Tasks completed today"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tasks Pending</label>
                <Input
                  type="number"
                  value={newReport.tasksPending}
                  onChange={(e) => setNewReport({...newReport, tasksPending: e.target.value})}
                  placeholder="Tasks pending"
                />
              </div>
            </div>

            {/* Issues Section */}
            <div className="mt-6">
              <h4 className="font-medium mb-3">Issues</h4>
              <div className="space-y-3">
                {newReport.issues.map((issue, index) => (
                  <div key={index} className="flex justify-between items-center p-2 border rounded">
                    <div>
                      <div className="font-medium">{(issue as any).type}</div>
                      <div className="text-sm text-gray-600">{(issue as any).description}</div>
                    </div>
                    <Badge className={(priorityColors as any)[(issue as any).priority]}>
                      {(issue as any).priority}
                    </Badge>
                  </div>
                ))}
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <select 
                    value={newReport.newIssue.type} 
                    onChange={(e) => setNewReport({...newReport, newIssue: {...newReport.newIssue, type: e.target.value}})}
                    className="border rounded-md px-3 py-2"
                  >
                    <option value="">Issue Type</option>
                    <option value="technical">Technical</option>
                    <option value="material">Material</option>
                    <option value="weather">Weather</option>
                    <option value="labor">Labor</option>
                    <option value="equipment">Equipment</option>
                  </select>
                  <select 
                    value={newReport.newIssue.priority} 
                    onChange={(e) => setNewReport({...newReport, newIssue: {...newReport.newIssue, priority: e.target.value}})}
                    className="border rounded-md px-3 py-2"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                  <div className="flex gap-2">
                    <Input
                      value={newReport.newIssue.description}
                      onChange={(e) => setNewReport({...newReport, newIssue: {...newReport.newIssue, description: e.target.value}})}
                      placeholder="Issue description"
                    />
                    <Button onClick={handleAddIssue} size="sm">
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Work Done Section */}
            <div className="mt-6">
              <h4 className="font-medium mb-3">Work Done Today</h4>
              <div className="space-y-2">
                {newReport.workDone.split('\n').filter(w => w.trim() !== '').map((work, index) => (
                  <div key={index} className="flex items-center p-2 border rounded">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>{work}</span>
                  </div>
                ))}
                
                <div className="flex gap-2">
                  <Input
                    value={newReport.newWorkDone}
                    onChange={(e) => setNewReport({...newReport, newWorkDone: e.target.value})}
                    placeholder="Add completed task"
                  />
                  <Button onClick={handleAddWorkDone} size="sm">
                    Add
                  </Button>
                </div>
              </div>
            </div>

            {/* Next Tasks Section */}
            <div className="mt-6">
              <h4 className="font-medium mb-3">Next Tasks</h4>
              <div className="space-y-2">
                {newReport.nextTasks.split('\n').filter(n => n.trim() !== '').map((task, index) => (
                  <div key={index} className="flex items-center p-2 border rounded">
                    <Clock className="mr-2 h-4 w-4 text-blue-500" />
                    <span>{task}</span>
                  </div>
                ))}
                
                <div className="flex gap-2">
                  <Input
                    value={newReport.newNextTask}
                    onChange={(e) => setNewReport({...newReport, newNextTask: e.target.value})}
                    placeholder="Add next task"
                  />
                  <Button onClick={handleAddNextTask} size="sm">
                    Add
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button onClick={handleAddReport}>
                <FileText className="mr-2 h-4 w-4" />
                Submit Report
              </Button>
              <Button variant="outline" onClick={() => setShowNewReportForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex gap-2">
              <select 
                value={dateFilter} 
                onChange={(e) => setDateFilter(e.target.value)}
                className="border rounded-md px-3 py-2"
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="week">This Week</option>
                <option value="all">All Dates</option>
              </select>
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="border rounded-md px-3 py-2"
              >
                <option value="all">All Statuses</option>
                <option value="on_schedule">On Schedule</option>
                <option value="delayed">Delayed</option>
                <option value="ahead">Ahead of Schedule</option>
                <option value="at_risk">At Risk</option>
              </select>
            </div>
            <div className="flex-1">
              <Input placeholder="Search reports..." />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reports List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5" />
                Site Reports ({filteredReports.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredReports.map((report) => (
                  <div 
                    key={report.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedReport?.id === report.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedReport(report)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{report.site}</h3>
                        <p className="text-sm text-gray-600 mt-1">{report.engineer}</p>
                      </div>
                      <div className="flex flex-col items-end">
                        <Badge className={statusColors[report.status]}>
                          {report.status.replace('_', ' ')}
                        </Badge>
                        <div className="text-xs text-gray-500 mt-1">{report.date} {report.time}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-xs text-gray-500 mt-2">
                      <HardHat className="mr-1 h-3 w-3" />
                      {report.workers} workers • {report.projectPhase}
                    </div>
                    
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Progress: {report.progress}%</span>
                        <span>{report.weather}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${report.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {report.issues.length > 0 && (
                      <div className="flex items-center text-xs text-red-600 mt-2">
                        <AlertTriangle className="mr-1 h-3 w-3" />
                        {report.issues.length} issue{report.issues.length > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Details */}
        <div className="lg:col-span-2">
          {selectedReport && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center">
                        <Activity className="mr-2 h-5 w-5" />
                        {selectedReport.site} - Daily Report
                      </CardTitle>
                      <p className="text-gray-600 mt-1">
                        {selectedReport.date} at {selectedReport.time} • {selectedReport.engineer}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={statusColors[selectedReport.status]}>
                        {selectedReport.status.replace('_', ' ')}
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
                      <h4 className="font-medium mb-3">Report Overview</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Phase:</span>
                          <span>{selectedReport.projectPhase}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Weather:</span>
                          <span>{selectedReport.weather} ({selectedReport.temperature}°C)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Workers:</span>
                          <span>{selectedReport.workers}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tasks:</span>
                          <span>{selectedReport.tasksCompleted} completed, {selectedReport.tasksPending} pending</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-3">Progress</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Overall Progress</span>
                            <span>{selectedReport.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-blue-600 h-3 rounded-full" 
                              style={{ width: `${selectedReport.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-medium mb-2">Labor Report</h5>
                          <div className="flex justify-between text-xs">
                            <span>Mistry: {selectedReport.laborReport.mistry}</span>
                            <span>Laborers: {selectedReport.laborReport.laborers}</span>
                            <span>Attendance: {selectedReport.laborReport.attendance}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Issues */}
                  {selectedReport.issues.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Issues ({selectedReport.issues.length})</h4>
                      <div className="space-y-3">
                        {selectedReport.issues.map((issue) => (
                          <div key={issue.id} className="border-l-4 border-red-200 pl-4 py-2 bg-red-50 rounded-r">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center gap-2">
                                  <Badge className={priorityColors[issue.priority]}>
                                    {issue.priority}
                                  </Badge>
                                  <span className="font-medium">{issue.type}</span>
                                </div>
                                <p className="text-gray-700 mt-1">{issue.description}</p>
                              </div>
                              <Badge variant={issue.resolved ? "default" : "secondary"}>
                                {issue.resolved ? 'Resolved' : 'Open'}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Work Done */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Work Done Today ({selectedReport.workDone.length})</h4>
                    <div className="space-y-2">
                      {selectedReport.workDone.map((work, index) => (
                        <div key={index} className="flex items-center p-2 border rounded">
                          <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                          <span>{work}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Next Tasks */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Next Tasks ({selectedReport.nextTasks.length})</h4>
                    <div className="space-y-2">
                      {selectedReport.nextTasks.map((task, index) => (
                        <div key={index} className="flex items-center p-2 border rounded">
                          <Clock className="mr-2 h-4 w-4 text-blue-500" />
                          <span>{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Materials Used */}
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Materials Status</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {selectedReport.materialsUsed.map((material, index) => (
                        <div key={index} className="border rounded-lg p-3">
                          <div className="font-medium">{material.item}</div>
                          <div className="text-sm text-gray-600">{material.quantity}</div>
                          <Badge className={`${materialStatusColors[material.status]} mt-2 text-xs`}>
                            {material.status.replace('_', ' ')}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Safety and Quality Reports */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-medium mb-3">Safety Report</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Incidents:</span>
                          <span className={selectedReport.safetyReport.incidents > 0 ? "text-red-600" : "text-green-600"}>
                            {selectedReport.safetyReport.incidents}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Violations:</span>
                          <span>{selectedReport.safetyReport.safetyViolations}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600">Measures: </span>
                          <span>{selectedReport.safetyReport.safetyMeasures}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Quality Report</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Passed:</span>
                          <span className="text-green-600">{selectedReport.qualityReport.passed}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Failed:</span>
                          <span className="text-red-600">{selectedReport.qualityReport.failed}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600">Remarks: </span>
                          <span>{selectedReport.qualityReport.remarks}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 flex-wrap">
                    <Button variant="outline">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Notify Team
                    </Button>
                    <Button variant="outline">
                      <Phone className="mr-2 h-4 w-4" />
                      Call Engineer
                    </Button>
                    <Button variant="outline">
                      <FileText className="mr-2 h-4 w-4" />
                      Generate PDF
                    </Button>
                    <Button variant="outline">
                      <Activity className="mr-2 h-4 w-4" />
                      Update Progress
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions for Site Engineer */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Button variant="outline" className="flex flex-col items-center p-4">
                      <FileText className="h-6 w-6 mb-2" />
                      <span>Submit Report</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center p-4">
                      <AlertTriangle className="h-6 w-6 mb-2" />
                      <span>Report Issue</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center p-4">
                      <CheckCircle className="h-6 w-6 mb-2" />
                      <span>Quality Check</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center p-4">
                      <MapPin className="h-6 w-6 mb-2" />
                      <span>Location Update</span>
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