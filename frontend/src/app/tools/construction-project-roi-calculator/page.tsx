'use client';

import React, { useState } from 'react';
import Head from 'next/head';

export default function ConstructionProjectROICalculator() {
  const [projectCost, setProjectCost] = useState('');
  const [expectedRevenue, setExpectedRevenue] = useState('');
  const [projectDuration, setProjectDuration] = useState(''); // in years
  const [discountRate, setDiscountRate] = useState(''); // as percentage
  const [roi, setRoi] = useState<number | null>(null);
  const [npv, setNpv] = useState<number | null>(null);
  const [paybackPeriod, setPaybackPeriod] = useState<number | null>(null);
  const [error, setError] = useState('');

  const calculateROI = async () => {
    setError('');
    setRoi(null);
    setNpv(null);
    setPaybackPeriod(null);

    const cost = parseFloat(projectCost);
    const revenue = parseFloat(expectedRevenue);
    const duration = parseFloat(projectDuration);
    const rate = parseFloat(discountRate) / 100;

    if (isNaN(cost) || isNaN(revenue) || isNaN(duration) || isNaN(rate) || cost <= 0 || duration <= 0) {
      setError('Please enter valid positive numbers for all fields.');
      return;
    }

    // Simulate API call to backend for calculation and logging
    try {
      const response = await fetch('/api/tools/construction-project-roi-calculator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectCost: cost,
          expectedRevenue: revenue,
          projectDuration: duration,
          discountRate: rate,
        }),
      });

      if (!response.ok) {
        throw new Error('Calculation failed.');
      }

      const data = await response.json();
      setRoi(data.roi);
      setNpv(data.npv);
      setPaybackPeriod(data.paybackPeriod);

      // Store inputs and results locally for demonstration (C)
      // In a real scenario, this would be handled by the API route
      const preloginResults = JSON.parse(localStorage.getItem('prelogin_results_roi_calculator') || '[]');
      preloginResults.push({
        id: data.resultId,
        inputs: { cost, revenue, duration, rate },
        results: { roi: data.roi, npv: data.npv, paybackPeriod: data.paybackPeriod },
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('prelogin_results_roi_calculator', JSON.stringify(preloginResults));

    } catch (err) {
      setError((err as Error)?.message || 'An unexpected error occurred during calculation.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Construction Project ROI Calculator - BuildMate</title>
        <meta name="description" content="Calculate the Return on Investment (ROI), Net Present Value (NPV), and Payback Period for your construction projects." />
        {/* Open Graph Tags for sharing */}
        <meta property="og:title" content="Construction Project ROI Calculator - BuildMate" />
        <meta property="og:description" content="Calculate the Return on Investment (ROI), Net Present Value (NPV), and Payback Period for your construction projects." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/tools/construction-project-roi-calculator" />
        {/* <meta property="og:image" content="https://yourdomain.com/images/roi-calculator-share.jpg" /> */}
      </Head>

      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          Construction Project ROI Calculator
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Estimate the Return on Investment (ROI), Net Present Value (NPV), and Payback Period for your construction projects.
        </p>

        <div className="space-y-6">
          <div>
            <label htmlFor="projectCost" className="block text-sm font-medium text-gray-700">
              Project Cost ($)
            </label>
            <input
              type="number"
              id="projectCost"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              value={projectCost}
              onChange={(e) => setProjectCost(e.target.value)}
              placeholder="e.g., 1000000"
            />
          </div>

          <div>
            <label htmlFor="expectedRevenue" className="block text-sm font-medium text-gray-700">
              Expected Revenue ($)
            </label>
            <input
              type="number"
              id="expectedRevenue"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              value={expectedRevenue}
              onChange={(e) => setExpectedRevenue(e.target.value)}
              placeholder="e.g., 1200000"
            />
          </div>

          <div>
            <label htmlFor="projectDuration" className="block text-sm font-medium text-gray-700">
              Project Duration (Years)
            </label>
            <input
              type="number"
              id="projectDuration"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              value={projectDuration}
              onChange={(e) => setProjectDuration(e.target.value)}
              placeholder="e.g., 2"
            />
          </div>

          <div>
            <label htmlFor="discountRate" className="block text-sm font-medium text-gray-700">
              Discount Rate (%)
            </label>
            <input
              type="number"
              id="discountRate"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              value={discountRate}
              onChange={(e) => setDiscountRate(e.target.value)}
              placeholder="e.g., 10"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={calculateROI}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Calculate ROI
          </button>
        </div>

        {roi !== null && (
          <div className="mt-8 pt-8 border-t border-gray-200 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 text-center">Results</h2>
            <p className="text-lg text-gray-800">
              <span className="font-semibold">Return on Investment (ROI):</span> {roi?.toFixed(2)}%
            </p>
            <p className="text-lg text-gray-800">
              <span className="font-semibold">Net Present Value (NPV):</span> ${npv?.toFixed(2)}
            </p>
            <p className="text-lg text-gray-800">
              <span className="font-semibold">Payback Period:</span> {paybackPeriod?.toFixed(2)} years
            </p>

            {/* Lead Capture (E) */}
            <div className="mt-6 p-4 bg-teal-50 border-l-4 border-teal-500 text-teal-800">
              <p className="font-bold">Get a detailed report!</p>
              <p className="text-sm">Enter your email to receive a comprehensive ROI analysis and project recommendations.</p>
              <div className="mt-4 flex">
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="flex-grow border border-teal-300 rounded-l-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                />
                <button className="bg-teal-600 text-white py-2 px-4 rounded-r-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                  Send Report
                </button>
              </div>
            </div>

            {/* Share CTA (Reputation-first virality) */}
            <div className="mt-6 text-center">
              <p className="text-gray-700">Share your results:</p>
              <div className="flex justify-center space-x-4 mt-2">
                <a href="#" className="text-blue-600 hover:text-blue-800">Twitter</a>
                <a href="#" className="text-blue-800 hover:text-blue-900">LinkedIn</a>
                <a href="#" className="text-red-600 hover:text-red-800">Facebook</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
