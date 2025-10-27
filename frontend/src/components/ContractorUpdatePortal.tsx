'use client';

import React, { useState } from 'react';

interface ContractorUpdatePortalProps {
  projectId: string;
  projectName: string;
  tasks: Array<{
    id: string;
    name: string;
    status: 'completed' | 'in-progress' | 'pending';
    deadline?: string;
    assignedContractor?: string;
  }>;
  onStatusUpdate?: (taskId: string, newStatus: string) => void;
}

const ContractorUpdatePortal: React.FC<ContractorUpdatePortalProps> = ({ 
  projectId, 
  projectName, 
  tasks,
  onStatusUpdate 
}) => {
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [updateStatus, setUpdateStatus] = useState<'completed' | 'in-progress' | 'pending'>('in-progress');
  const [updateNotes, setUpdateNotes] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateSubmit = async () => {
    if (!selectedTask) {
      alert('Please select a task to update');
      return;
    }

    setIsLoading(true);
    try {
      // API call to update the task status
      const response = await fetch('/api/tools/construction-profit-calculator', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resultId: projectId, // Using projectId as resultId for this case
          taskId: selectedTask,
          status: updateStatus,
          notes: updateNotes
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Task updated successfully:', result);
      
      alert('Task status updated successfully!');
      setUpdateNotes('');
      
      // Call parent callback if provided
      if (onStatusUpdate) {
        onStatusUpdate(selectedTask, updateStatus);
      }
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Error updating task. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const statusColors = {
    completed: 'text-emerald-600 bg-emerald-100',
    'in-progress': 'text-amber-600 bg-amber-100',
    pending: 'text-slate-500 bg-slate-100'
  };

  return (
    <div className="bg-blue-50 rounded-2xl shadow-xl p-6 border border-blue-200">
      <h2 className="text-xl font-bold text-slate-800 mb-2 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
        Contractor Update Portal - {projectName}
      </h2>
      <p className="text-slate-600 mb-4">Update task status and report work completion.</p>
      
      <div className="space-y-3 mb-4">
        <h3 className="font-medium text-slate-700">Current Tasks:</h3>
        {tasks.map((task) => (
          <div key={task.id} className="flex justify-between items-center p-3 bg-white rounded-lg border">
            <span className="font-medium">{task.name}</span>
            <span className={`text-sm font-semibold px-2 py-1 rounded-full ${statusColors[task.status]}`}>
              {task.status.replace('-', ' ')}
            </span>
          </div>
        ))}
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Select Task to Update</label>
          <select 
            value={selectedTask || ''}
            onChange={(e) => setSelectedTask(e.target.value)}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          >
            <option value="">Select a task</option>
            {tasks.map((task) => (
              <option key={task.id} value={task.id}>{task.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">New Status</label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input 
                type="radio" 
                name="status" 
                value="pending" 
                checked={updateStatus === 'pending'}
                onChange={(e) => setUpdateStatus(e.target.value as any)}
                className="text-teal-600 focus:ring-teal-500"
              />
              <span className="ml-2 text-slate-700">Pending</span>
            </label>
            <label className="inline-flex items-center">
              <input 
                type="radio" 
                name="status" 
                value="in-progress" 
                checked={updateStatus === 'in-progress'}
                onChange={(e) => setUpdateStatus(e.target.value as any)}
                className="text-teal-600 focus:ring-teal-500"
              />
              <span className="ml-2 text-slate-700">In Progress</span>
            </label>
            <label className="inline-flex items-center">
              <input 
                type="radio" 
                name="status" 
                value="completed" 
                checked={updateStatus === 'completed'}
                onChange={(e) => setUpdateStatus(e.target.value as any)}
                className="text-teal-600 focus:ring-teal-500"
              />
              <span className="ml-2 text-slate-700">Completed</span>
            </label>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Update Notes</label>
          <textarea
            value={updateNotes}
            onChange={(e) => setUpdateNotes(e.target.value)}
            placeholder="Add details about the work completed..."
            rows={3}
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          />
        </div>
        
        <button 
          onClick={handleUpdateSubmit}
          disabled={isLoading || !selectedTask}
          className="w-full inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-blue-700 bg-blue-100 hover:bg-blue-200 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Updating...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
              </svg>
              Submit Update
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ContractorUpdatePortal;