'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ContractorTrackingProps {
  toolName: string;
  toolResult: any; // Pass the tool's calculated result data
  projectId?: string;
}

const ContractorTracking: React.FC<ContractorTrackingProps> = ({ toolName, toolResult, projectId }) => {
  const router = useRouter();
  const [projectName, setProjectName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [contractor, setContractor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Create a project/task in the CRM system via API
      // Determine the API endpoint based on the tool name
      let apiEndpoint = '/api/tools/construction-profit-calculator';
      if (toolName.includes('Budget')) {
        apiEndpoint = '/api/tools/budget-vs-actuals-calculator';
      } else if (toolName.includes('Concrete')) {
        apiEndpoint = '/api/tools/concrete-material-calculator';
      } else if (toolName.includes('Labor')) {
        apiEndpoint = '/api/tools/construction-labor-cost-estimator';
      }
      
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...toolResult,
          projectName,
          deadline,
          contractorId: contractor
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('Project created with ID:', result.resultId);
      
      alert('Project created successfully and added to CRM!');
      router.push('/construction-crm/projects');
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Error creating project. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-xl font-bold text-slate-800 mb-4">Project Integration</h2>
      <p className="text-slate-600 mb-4">Connect {toolName} results to your CRM for contractor tracking and deadline management.</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Project Name</label>
          <input 
            type="text" 
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Enter project name" 
            required
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Estimated Deadline</label>
          <input 
            type="date" 
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" 
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Assign Contractor</label>
          <select 
            value={contractor}
            onChange={(e) => setContractor(e.target.value)}
            required
            className="w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm">
            <option value="">Select contractor</option>
            <option value="Raj Construction">Raj Construction</option>
            <option value="Sharma Masonry">Sharma Masonry</option>
            <option value="Mehta Electrical">Mehta Electrical</option>
            <option value="Patel Plumbing">Patel Plumbing</option>
            <option value="Singh Painting">Singh Painting</option>
          </select>
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Add to CRM & Track Updates
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContractorTracking;