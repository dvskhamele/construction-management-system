"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Milestone {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
}

const ProjectProgressTracker = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [newMilestoneName, setNewMilestoneName] = useState('');
  const [newMilestoneStartDate, setNewMilestoneStartDate] = useState('');
  const [newMilestoneEndDate, setNewMilestoneEndDate] = useState('');
  const [newMilestoneStatus, setNewMilestoneStatus] = useState<'Not Started' | 'In Progress' | 'Completed'>('Not Started');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    logAnalytics('ToolOpened', 'ProjectProgressTracker');
    const storedMilestones = localStorage.getItem('projectMilestones');
    if (storedMilestones) {
      setMilestones(JSON.parse(storedMilestones));
    }
  }, []);

  const logAnalytics = async (eventType: string, eventDetails: string) => {
    const timestamp = new Date().toISOString();
    const logContent = `## Analytics Event: ${eventType}\n\n**Timestamp:** ${timestamp}\n**Tool:** ProjectProgressTracker\n**Details:** ${eventDetails}\n\n---\n`;
    console.log(logContent);
  };

  const handleAddMilestone = () => {
    setError('');
    if (!newMilestoneName || !newMilestoneStartDate || !newMilestoneEndDate) {
      setError('Please fill in all milestone fields.');
      return;
    }

    const newMilestone: Milestone = {
      id: Date.now(),
      name: newMilestoneName,
      startDate: newMilestoneStartDate,
      endDate: newMilestoneEndDate,
      status: newMilestoneStatus,
    };

    const updatedMilestones = [...milestones, newMilestone];
    setMilestones(updatedMilestones);
    localStorage.setItem('projectMilestones', JSON.stringify(updatedMilestones));

    setNewMilestoneName('');
    setNewMilestoneStartDate('');
    setNewMilestoneEndDate('');
    setNewMilestoneStatus('Not Started');

    logAnalytics('ToolSubmitted', 'MilestoneAdded');
  };

  const handleUpdateMilestoneStatus = (id: number, status: 'Not Started' | 'In Progress' | 'Completed') => {
    const updatedMilestones = milestones.map(m => m.id === id ? { ...m, status } : m);
    setMilestones(updatedMilestones);
    localStorage.setItem('projectMilestones', JSON.stringify(updatedMilestones));
    logAnalytics('ToolSubmitted', `MilestoneStatusUpdated - ${id}: ${status}`);
  };

  const handleLeadCapture = () => {
    if (email) {
      logAnalytics('LeadCaptured', `ProjectProgressTracker - ${email}`);
      alert('Thank you for your interest! We will keep you updated.');
    } else {
      alert('Please enter your email address.');
    }
  };

  const handleViewProgress = () => {
    logAnalytics('ToolSubmitted', 'ViewProgress');
    router.push('/tools/project-progress-tracker/result');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Project Progress Tracker</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Add New Milestone</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="milestoneName" className="block text-sm font-medium text-gray-700">Milestone Name</label>
            <input
              type="text"
              id="milestoneName"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={newMilestoneName}
              onChange={(e) => setNewMilestoneName(e.target.value)}
              placeholder="e.g., Foundation Complete"
            />
          </div>
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
            <input
              type="date"
              id="startDate"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={newMilestoneStartDate}
              onChange={(e) => setNewMilestoneStartDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
            <input
              type="date"
              id="endDate"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={newMilestoneEndDate}
              onChange={(e) => setNewMilestoneEndDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select
              id="status"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={newMilestoneStatus}
              onChange={(e) => setNewMilestoneStatus(e.target.value as 'Not Started' | 'In Progress' | 'Completed')}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={handleAddMilestone}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Milestone
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Current Milestones</h2>
        {milestones.length === 0 ? (
          <p className="text-gray-600">No milestones added yet. Add one above!</p>
        ) : (
          <ul className="space-y-4">
            {milestones.map((milestone) => (
              <li key={milestone.id} className="border-b border-gray-200 pb-4">
                <p className="text-lg font-medium">{milestone.name}</p>
                <p className="text-sm text-gray-600">{milestone.startDate} to {milestone.endDate}</p>
                <div className="flex items-center mt-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${milestone.status === 'Completed' ? 'bg-green-200 text-green-800' : milestone.status === 'In Progress' ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-200 text-gray-800'}`}>
                    {milestone.status}
                  </span>
                  <select
                    className="ml-4 border border-gray-300 rounded-md shadow-sm p-1 text-sm"
                    value={milestone.status}
                    onChange={(e) => handleUpdateMilestoneStatus(milestone.id, e.target.value as 'Not Started' | 'In Progress' | 'Completed')}
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </li>
            ))}
          </ul>
        )}
        {milestones.length > 0 && (
          <button
            onClick={handleViewProgress}
            className="mt-6 w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            View Detailed Progress
          </button>
        )}
      </div>

      <div className="bg-gray-100 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Stay Updated!</h2>
        <p className="text-center text-gray-700 mb-4">Enter your email to receive updates on new tools and features.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            className="flex-grow border border-gray-300 rounded-md shadow-sm p-2"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleLeadCapture}
            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectProgressTracker;
