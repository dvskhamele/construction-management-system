'use client';
'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import ContractorTracking from '@/components/ContractorTracking';
import ContractorUpdatePortal from '@/components/ContractorUpdatePortal';

// Main component for displaying calculator results
export default function CalculatorResultPage() {
  const searchParams = useSearchParams();

  // --- B. JS Logic ---
  const getNumericParam = (name: string) => {
    const param = searchParams?.get(name);
    return param ? parseFloat(param) || 0 : 0;
  };

  const totalContractValue = getNumericParam('totalContractValue');
  const materialCosts = getNumericParam('materialCosts');
  const laborCosts = getNumericParam('laborCosts');
  const subcontractorCosts = getNumericParam('subcontractorCosts');
  const equipmentRentalCosts = getNumericParam('equipmentRentalCosts');
  const overheadPercentage = getNumericParam('overheadPercentage');
  const contingencyPercentage = getNumericParam('contingencyPercentage');

  const totalDirectCosts = materialCosts + laborCosts + subcontractorCosts + equipmentRentalCosts;
  const overheadAmount = totalDirectCosts * (overheadPercentage / 100);
  const totalCosts = totalDirectCosts + overheadAmount;
  const estimatedProfit = totalContractValue - totalCosts;
  const profitMargin = totalContractValue > 0 ? (estimatedProfit / totalContractValue) * 100 : 0;

  const contingencyAmount = totalCosts * (contingencyPercentage / 100);
  const totalCostWithContingency = totalCosts + contingencyAmount;
  const finalProfitWithContingency = totalContractValue - totalCostWithContingency;

  const chartData = [
    {
      name: 'Financials',
      'Contract Value': totalContractValue,
      'Total Costs': totalCosts,
      'Estimated Profit': estimatedProfit,
    },
  ];

  // ChartComponent using dynamic import
  const ChartComponent = () => {
    if (typeof window !== 'undefined') {
      const recharts = require('recharts');
      const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } = recharts;
      const chartData = [
        {
          name: 'Financials',
          'Contract Value': totalContractValue,
          'Total Costs': totalCosts,
          'Estimated Profit': estimatedProfit,
        },
      ];
      
      return (
        <BarChart width={600} height={300} data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value: number) => new Intl.NumberFormat('en-IN', { notation: 'compact', compactDisplay: 'short' }).format(value)} />
          <Tooltip formatter={(value: number) => new Intl.NumberFormat('en-IN').format(value)} />
          <Legend />
          <Bar dataKey="Contract Value" fill="#059669" />
          <Bar dataKey="Total Costs" fill="#be123c" />
          <Bar dataKey="Estimated Profit" fill="#047857" />
        </BarChart>
      );
    }
    return <div className="text-center text-gray-500 py-12">Loading chart...</div>;
  };

  // --- D. Result Page UI ---
  return (
    <main className="bg-slate-50 py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl">
            Profitability Analysis Results
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
            Based on the values you provided, here is your estimated project profitability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Key Metrics */}
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Key Metrics</h2>
            <div className="flex justify-between items-center">
              <span className="text-lg text-slate-600">Estimated Profit:</span>
              <span className="text-2xl font-bold text-emerald-600">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(estimatedProfit)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg text-slate-600">Profit Margin:</span>
              <span className="text-2xl font-bold text-emerald-600">{profitMargin.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg text-slate-600">Total Costs:</span>
              <span className="text-lg font-semibold text-rose-600">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(totalCosts)}</span>
            </div>
            <div className="border-t pt-6">
                <h3 className="text-xl font-bold text-slate-800">Risk Analysis</h3>
                <div className="mt-4 flex justify-between items-center">
                    <span className="text-lg text-slate-600">Contingency Buffer:</span>
                    <span className="text-lg font-semibold text-amber-600">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(contingencyAmount)}</span>
                </div>
                 <div className="mt-2 flex justify-between items-center">
                    <span className="text-lg text-slate-600">Profit (with Contingency):</span>
                    <span className="text-lg font-semibold text-amber-600">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(finalProfitWithContingency)}</span>
                </div>
            </div>
          </div>

          {/* Right Column: Chart & Integration */}
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Visual Breakdown</h2>
              <div style={{ width: '100%', height: 300 }}>
                <ChartComponent />
              </div>
            </div>
            
            {/* Contractor Tracking Integration */}
            <ContractorTracking 
              toolName="Construction Profit Calculator" 
              toolResult={{
                totalContractValue,
                materialCosts,
                laborCosts,
                subcontractorCosts,
                equipmentRentalCosts,
                overheadPercentage,
                contingencyPercentage,
                totalDirectCosts,
                overheadAmount,
                totalCosts,
                estimatedProfit,
                profitMargin,
                contingencyAmount,
                totalCostWithContingency,
                finalProfitWithContingency
              }}
            />
            
            {/* Contractor Update Portal */}
            <ContractorUpdatePortal 
              projectId={`proj_${Date.now()}`}
              projectName="New Construction Project"
              tasks={[
                { id: 'task1', name: 'Foundation Work', status: 'completed', deadline: '2025-04-15' },
                { id: 'task2', name: 'Structural Framing', status: 'in-progress', deadline: '2025-05-20' },
                { id: 'task3', name: 'Electrical Installation', status: 'pending', deadline: '2025-06-10' },
              ]}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
