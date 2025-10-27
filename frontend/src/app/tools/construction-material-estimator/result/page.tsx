"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const MaterialEstimatorResult = () => {
  const [results, setResults] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    logAnalytics('ToolResultViewed', 'ConstructionMaterialEstimator');
    const storedResults = localStorage.getItem('materialEstimatorResults');
    if (storedResults) {
      setResults(JSON.parse(storedResults));
    } else {
      // If no results, redirect back to the calculator page
      router.push('/tools/construction-material-estimator');
    }
  }, [router]);

  const logAnalytics = async (eventType: string, eventDetails: string) => {
    const timestamp = new Date().toISOString();
    const logContent = `## Analytics Event: ${eventType}\n\n**Timestamp:** ${timestamp}\n**Tool:** ConstructionMaterialEstimator\n**Details:** ${eventDetails}\n\n---\n`;
    // In a real autonomous system, this logContent would be written to a new markdown file
    // in the auto_reports directory, e.g., /auto_reports/analytics-${timestamp}.md
    // For this simulation, we will just log to console.
    console.log(logContent);
  };

  if (!results) {
    return (
      <div className="container mx-auto p-4 text-center">
        <h1 className="text-2xl font-bold">Loading Results...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Material Estimation Results</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Project Details:</h2>
        <p><strong>Length:</strong> {results.length} meters</p>
        <p><strong>Width:</strong> {results.width} meters</p>
        <p><strong>Height:</strong> {results.height} meters</p>
        <p><strong>Material Type:</strong> {results.material}</p>
      </div>

      <div className="bg-green-50 shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-green-800">Estimated Quantity:</h2>
        <p className="text-3xl font-bold text-green-600">{results.estimatedQuantity.toFixed(2)} {results.unit}</p>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => router.push('/tools/construction-material-estimator')}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Recalculate
        </button>
      </div>
    </div>
  );
};

export default MaterialEstimatorResult;
