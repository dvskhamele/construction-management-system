"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ConstructionMaterialEstimator = () => {
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [material, setMaterial] = useState('concrete');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    logAnalytics('ToolOpened', 'ConstructionMaterialEstimator');
  }, []);

  const logAnalytics = async (eventType: string, eventDetails: string) => {
    const timestamp = new Date().toISOString();
    const logContent = `## Analytics Event: ${eventType}\n\n**Timestamp:** ${timestamp}\n**Tool:** ConstructionMaterialEstimator\n**Details:** ${eventDetails}\n\n---\n`;
    // In a real autonomous system, this logContent would be written to a new markdown file
    // in the auto_reports directory, e.g., /auto_reports/analytics-${timestamp}.md
    // For this simulation, we will just log to console.
    console.log(logContent);
  };

  const handleCalculate = () => {
    setError('');
    const numLength = parseFloat(length);
    const numWidth = parseFloat(width);
    const numHeight = parseFloat(height);

    if (isNaN(numLength) || isNaN(numWidth) || isNaN(numHeight) || numLength <= 0 || numWidth <= 0 || numHeight <= 0) {
      setError('Please enter valid positive numbers for all dimensions.');
      return;
    }

    // Simple material estimation logic (can be expanded)
    let estimatedQuantity = 0;
    let unit = '';

    switch (material) {
      case 'concrete':
        estimatedQuantity = numLength * numWidth * numHeight; // cubic meters
        unit = 'cubic meters';
        break;
      case 'wood':
        estimatedQuantity = numLength * numWidth * numHeight * 10; // arbitrary factor for wood
        unit = 'board feet';
        break;
      case 'paint':
        estimatedQuantity = numLength * numWidth / 10; // arbitrary factor for paint coverage
        unit = 'liters';
        break;
      default:
        estimatedQuantity = 0;
        unit = '';
    }

    localStorage.setItem('materialEstimatorResults', JSON.stringify({
      length: numLength,
      width: numWidth,
      height: numHeight,
      material,
      estimatedQuantity,
      unit,
    }));

    logAnalytics('ToolSubmitted', 'ConstructionMaterialEstimator');
    router.push('/tools/construction-material-estimator/result');
  };

  const handleLeadCapture = () => {
    if (email) {
      logAnalytics('LeadCaptured', `ConstructionMaterialEstimator - ${email}`);
      alert('Thank you for your interest! We will keep you updated.');
      // In a real scenario, this email would be saved to a blog/log file.
    } else {
      alert('Please enter your email address.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Construction Material Estimator</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="length" className="block text-sm font-medium text-gray-700">Length (meters)</label>
            <input
              type="number"
              id="length"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              placeholder="e.g., 10"
            />
          </div>
          <div>
            <label htmlFor="width" className="block text-sm font-medium text-gray-700">Width (meters)</label>
            <input
              type="number"
              id="width"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              placeholder="e.g., 5"
            />
          </div>
          <div>
            <label htmlFor="height" className="block text-sm font-medium text-gray-700">Height (meters)</label>
            <input
              type="number"
              id="height"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g., 2"
            />
          </div>
          <div>
            <label htmlFor="material" className="block text-sm font-medium text-gray-700">Material Type</label>
            <select
              id="material"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
            >
              <option value="concrete">Concrete</option>
              <option value="wood">Wood</option>
              <option value="paint">Paint</option>
            </select>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <button
          onClick={handleCalculate}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Calculate Materials
        </button>
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

export default ConstructionMaterialEstimator;
