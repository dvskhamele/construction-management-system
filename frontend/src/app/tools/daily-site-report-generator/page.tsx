
'use client';

import React, { useState } from 'react';
import Head from 'next/head';

export default function DailySiteReportGenerator() {
  const [input1, setInput1] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    setResult(null);

    // Basic validation
    if (!input1) {
      setError('Please enter a value for Input 1.');
      return;
    }

    try {
      const response = await fetch('/api/tools/daily-site-report-generator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input1: parseFloat(input1) }),
      });

      if (!response.ok) {
        throw new Error('Calculation failed.');
      }

      const data = await response.json();
      setResult(data.result);

    } catch (err) {
      setError((err as Error)?.message || 'An unexpected error occurred during calculation.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>Daily Site Report Generator - BuildMate</title>
        <meta name="description" content="Automates the creation of daily site reports, including weather conditions, work progress, resource allocation, and any issues encountered." />
        <meta property="og:title" content="Daily Site Report Generator - BuildMate" />
        <meta property="og:description" content="Automates the creation of daily site reports, including weather conditions, work progress, resource allocation, and any issues encountered." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourdomain.com/tools/daily-site-report-generator" />
      </Head>

      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
          Daily Site Report Generator
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Automates the creation of daily site reports, including weather conditions, work progress, resource allocation, and any issues encountered.
        </p>

        <div className="space-y-6">
          <div>
            <label htmlFor="input1" className="block text-sm font-medium text-gray-700">
              Input 1
            </label>
            <input
              type="number"
              id="input1"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
              placeholder="e.g., 100"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleSubmit}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Calculate
          </button>
        </div>

        {result !== null && (
          <div className="mt-8 pt-8 border-t border-gray-200 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 text-center">Result</h2>
            <p className="text-lg text-gray-800">
              <span className="font-semibold">Calculated Result:</span> {result}
            </p>

            <div className="mt-6 p-4 bg-teal-50 border-l-4 border-teal-500 text-teal-800">
              <p className="font-bold">Get a detailed report!</p>
              <p className="text-sm">Enter your email to receive a comprehensive report.</p>
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
