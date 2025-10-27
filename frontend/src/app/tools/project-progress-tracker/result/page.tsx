"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Milestone {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
}

const ProjectProgressResult = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const router = useRouter();

  useEffect(() => {
    logAnalytics('ToolResultViewed', 'ProjectProgressTracker');
    const storedMilestones = localStorage.getItem('projectMilestones');
    if (storedMilestones) {
      setMilestones(JSON.parse(storedMilestones));
    } else {
      router.push('/tools/project-progress-tracker');
    }
  }, [router]);

  const logAnalytics = async (eventType: string, eventDetails: string) => {
    const timestamp = new Date().toISOString();
    const logContent = `## Analytics Event: ${eventType}\n\n**Timestamp:** ${timestamp}\n**Tool:** ProjectProgressTracker\n**Details:** ${eventDetails}\n\n---\n`;
    console.log(logContent);
  };

  const calculateProgress = () => {
    if (milestones.length === 0) return 0;
    const completed = milestones.filter(m => m.status === 'Completed').length;
    return (completed / milestones.length) * 100;
  };

  if (milestones.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold">Loading Progress...</h1>
      </div>
    );
  }

  const overallProgress = calculateProgress();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Project Progress Summary</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Overall Project Progress:</h2>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div
            className="bg-blue-600 h-4 rounded-full"
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
        <p className="text-center text-xl font-bold">{overallProgress.toFixed(2)}% Completed</p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Milestone Breakdown:</h2>
        <ul className="space-y-4">
          {milestones.map((milestone) => (
            <li key={milestone.id} className="border-b border-gray-200 pb-4">
              <p className="text-lg font-medium">{milestone.name}</p>
              <p className="text-sm text-gray-600">{milestone.startDate} to {milestone.endDate}</p>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${milestone.status === 'Completed' ? 'bg-green-200 text-green-800' : milestone.status === 'In Progress' ? 'bg-yellow-200 text-yellow-800' : 'bg-gray-200 text-gray-800'}`}>
                {milestone.status}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => router.push('/tools/project-progress-tracker')}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Back to Tracker
        </button>
      </div>
    </div>
  );
};

export default ProjectProgressResult;
