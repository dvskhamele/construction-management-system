'use client';
'use client';

import React from 'react';
import { notFound, useSearchParams } from 'next/navigation';
import ContractorTracking from '@/components/ContractorTracking';
import ContractorUpdatePortal from '@/components/ContractorUpdatePortal';

type Props = {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
};

export default function BudgetResultPage({ searchParams = {} }: Props) {
  const getNumericParam = (name: string) => parseFloat(searchParams[name] as string || '0');

  const categories = ['Materials', 'Labor', 'Subcontractors', 'Equipment', 'Overhead'];
  const results = categories.map(cat => {
    const budgeted = getNumericParam(`budgeted${cat}`);
    const actual = getNumericParam(`actual${cat}`);
    const variance = budgeted - actual;
    const variancePercentage = budgeted > 0 ? (variance / budgeted) * 100 : 0;
    return { name: cat, Budgeted: budgeted, Actual: actual, Variance: variance, 'Variance %': variancePercentage };
  });

  const totalBudget = results.reduce((sum, item) => sum + item.Budgeted, 0);
  const totalActual = results.reduce((sum, item) => sum + item.Actual, 0);
  const totalVariance = totalBudget - totalActual;
  const totalVariancePercentage = totalBudget > 0 ? (totalVariance / totalBudget) * 100 : 0;

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);
  const VarianceColor = ({ value }: { value: number }) => (
    <span className={value >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
      {formatCurrency(value)} ({value >= 0 ? 'Under' : 'Over'})
    </span>
  );

  // ChartComponent using dynamic import
  const ChartComponent = () => {
    if (typeof window !== 'undefined') {
      const recharts = require('recharts');
      const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } = recharts;
      return (
        <BarChart 
          width={600} 
          height={300} 
          data={results} 
          margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value: number) => new Intl.NumberFormat('en-IN', { notation: 'compact', compactDisplay: 'short' }).format(value)} />
          <Tooltip formatter={(value: number) => formatCurrency(value)} />
          <Legend />
          <Bar dataKey="Budgeted" fill="#64748b" />
          <Bar dataKey="Actual" fill="#0d9488" />
        </BarChart>
      );
    }
    return <div className="text-center text-gray-500 py-12">Loading chart...</div>;
  };

  return (
    <main className="bg-slate-50 py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl">Budget vs. Actuals Analysis</h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
            Here is the financial variance report for your project.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2 mb-6">Overall Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                    <p className="text-lg text-slate-600">Total Budget</p>
                    <p className="text-3xl font-bold text-slate-800">{formatCurrency(totalBudget)}</p>
                </div>
                <div>
                    <p className="text-lg text-slate-600">Total Actual Spend</p>
                    <p className="text-3xl font-bold text-slate-800">{formatCurrency(totalActual)}</p>
                </div>
                <div>
                    <p className="text-lg text-slate-600">Total Variance</p>
                    <p className={`text-3xl font-bold ${totalVariance >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>{formatCurrency(totalVariance)}</p>
                    <p className={`text-sm ${totalVariance >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>{totalVariancePercentage.toFixed(2)}% {totalVariance >= 0 ? 'Under Budget' : 'Over Budget'}</p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Variance by Category</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr>
                                <th className="text-left py-2 pr-2 font-medium text-slate-600">Category</th>
                                <th className="text-right py-2 px-2 font-medium text-slate-600">Budgeted</th>
                                <th className="text-right py-2 px-2 font-medium text-slate-600">Actual</th>
                                <th className="text-right py-2 pl-2 font-medium text-slate-600">Variance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map(item => (
                                <tr key={item.name} className="border-t">
                                    <td className="py-3 pr-2 font-medium">{item.name}</td>
                                    <td className="py-3 px-2 text-right">{formatCurrency(item.Budgeted)}</td>
                                    <td className="py-3 px-2 text-right">{formatCurrency(item.Actual)}</td>
                                    <td className="py-3 pl-2 text-right font-semibold"><VarianceColor value={item.Variance} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Visual Comparison</h2>
                <div style={{ width: '100%', height: 300 }}>
                    <ChartComponent />
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Get Deeper Insights</h2>
              <p className="text-slate-600 mb-4">Receive a detailed variance analysis report and our top 5 tips for construction cost control.</p>
              <form className="flex gap-2">
                  <input type="email" placeholder="Enter your email" required className="flex-grow block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" />
                  <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700">
                      Send Report
                  </button>
              </form>
          </div>
          
          {/* Contractor Tracking Integration */}
          <ContractorTracking 
            toolName="Budget vs Actuals Calculator" 
            toolResult={{
              categories: results,
              totalBudget,
              totalActual,
              totalVariance,
              totalVariancePercentage
            }}
          />
        </div>
        
        {/* Contractor Update Portal */}
        <div className="mt-8">
          <ContractorUpdatePortal 
            projectId={`budget_proj_${Date.now()}`}
            projectName="Budget Monitoring Project"
            tasks={[
              { id: 'cost-tracking', name: 'Cost Tracking Setup', status: 'completed', deadline: '2025-04-10' },
              { id: 'variance-analysis', name: 'Variance Analysis', status: 'in-progress', deadline: '2025-04-15' },
              { id: 'budget-revision', name: 'Budget Revision', status: 'pending', deadline: '2025-04-20' },
            ]}
          />
        </div>

      </div>
    </main>
  );
}
