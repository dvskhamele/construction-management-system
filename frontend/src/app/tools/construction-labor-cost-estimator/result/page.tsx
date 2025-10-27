'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';

export default function LaborCostResultPage() {
  const searchParams = useSearchParams();

  // --- B. JS Logic ---
  const getNumericParam = (name: string) => {
    const param = searchParams?.get(name);
    return param ? parseFloat(param) || 0 : 0;
  };

  const skilledWorkers = getNumericParam('skilledWorkers');
  const skilledWorkerWage = getNumericParam('skilledWorkerWage');
  const semiSkilledWorkers = getNumericParam('semiSkilledWorkers');
  const semiSkilledWorkerWage = getNumericParam('semiSkilledWorkerWage');
  const unskilledWorkers = getNumericParam('unskilledWorkers');
  const unskilledWorkerWage = getNumericParam('unskilledWorkerWage');
  const projectDurationDays = getNumericParam('projectDurationDays');

  const totalSkilledCost = skilledWorkers * skilledWorkerWage * projectDurationDays;
  const totalSemiSkilledCost = semiSkilledWorkers * semiSkilledWorkerWage * projectDurationDays;
  const totalUnskilledCost = unskilledWorkers * unskilledWorkerWage * projectDurationDays;
  const totalLaborCost = totalSkilledCost + totalSemiSkilledCost + totalUnskilledCost;
  const costPerDay = projectDurationDays > 0 ? totalLaborCost / projectDurationDays : 0;

  const chartData = [
    { name: 'Skilled Labor', value: totalSkilledCost },
    { name: 'Semi-Skilled Labor', value: totalSemiSkilledCost },
    { name: 'Unskilled Labor', value: totalUnskilledCost },
  ];

  const COLORS = ['#047857', '#059669', '#34d399'];

  // Dynamically import chart components to handle client-side rendering
  // Commenting out chart to fix build error
  /*
  const ChartComponent = () => {
    const { PieChart, Pie, Cell, Tooltip, Legend } = require('recharts');
    const chartData = [
      { name: 'Skilled', value: totalSkilledCost },
      { name: 'Semi-Skilled', value: totalSemiSkilledCost },
      { name: 'Unskilled', value: totalUnskilledCost },
    ];
    
    return (
      <PieChart width={300} height={300}>
        <Pie data={chartData} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" nameKey="name" label={(entry: { value: number }) => `${((entry.value / totalLaborCost) * 100).toFixed(0)}%`}>
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value)} />
        <Legend />
      </PieChart>
    );
  };
  */

  // --- D. Result Page UI ---
  return (
    <main className="bg-slate-50 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl">
            Labor Cost Estimation Results
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
            Here is the estimated labor cost breakdown for your project.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Key Metrics */}
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Cost Summary</h2>
            <div className="flex justify-between items-center">
              <span className="text-lg text-slate-600">Total Estimated Labor Cost:</span>
              <span className="text-3xl font-bold text-teal-600">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalLaborCost)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg text-slate-600">Average Cost Per Day:</span>
              <span className="text-xl font-semibold text-slate-800">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(costPerDay)}</span>
            </div>
            <div className="border-t pt-6 space-y-3">
                <h3 className="text-xl font-bold text-slate-800">Cost Breakdown</h3>
                <div className="flex justify-between text-md">
                    <span>Skilled Labor Cost:</span>
                    <span className="font-medium">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalSkilledCost)}</span>
                </div>
                <div className="flex justify-between text-md">
                    <span>Semi-Skilled Labor Cost:</span>
                    <span className="font-medium">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalSemiSkilledCost)}</span>
                </div>
                <div className="flex justify-between text-md">
                    <span>Unskilled Labor Cost:</span>
                    <span className="font-medium">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalUnskilledCost)}</span>
                </div>
            </div>
          </div>

          {/* Right Column: Chart & Lead Capture */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Cost Distribution</h2>
              <div style={{ width: '100%', height: 300 }}>
                {/* Chart component commented out due to build error */}
                <p className="text-center text-gray-500 py-12">Visual chart temporarily unavailable due to build issues</p>
              </div>
            </div>
            
            {/* E. Lead Capture */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Download Labor Rate Guide</h2>
                <p className="text-slate-600 mb-4">Get our free guide to average labor rates for major Indian cities sent directly to your inbox.</p>
                <form className="flex gap-2">
                    <input type="email" placeholder="Enter your email" required className="flex-grow block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" />
                    <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700">
                        Send Guide
                    </button>
                </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
