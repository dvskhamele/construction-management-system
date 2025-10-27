'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';

export default function RiskResultPage() {
  const searchParams = useSearchParams();

  const pointValues = {
    Low: 1, Easy: 1, Good: 1,
    Medium: 2, Moderate: 2, Average: 2,
    High: 3, Difficult: 3, Poor: 3,
  } as const;

  const riskFactors = {
    budgetComplexity: searchParams?.get('budgetComplexity') || 'Medium',
    scheduleComplexity: searchParams?.get('scheduleComplexity') || 'Medium',
    teamExperience: searchParams?.get('teamExperience') || 'Medium',
    siteAccessibility: searchParams?.get('siteAccessibility') || 'Moderate',
    materialAvailability: searchParams?.get('materialAvailability') || 'Average',
  };

  const riskScore = Object.values(riskFactors).reduce((acc, value) => acc + (pointValues[value as keyof typeof pointValues] || 0), 0);

  let riskCategory = 'Low Risk';
  let riskColor = 'text-emerald-600';
  if (riskScore > 7) {
    riskCategory = 'High Risk';
    riskColor = 'text-rose-600';
  } else if (riskScore > 4) {
    riskCategory = 'Medium Risk';
    riskColor = 'text-amber-600';
  }

  return (
    <main className="bg-slate-50 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl">
            Project Risk Analysis
          </h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Risk Score</h2>
            <div className="text-center">
              <p className={`text-7xl font-extrabold ${riskColor}`}>{riskScore}</p>
              <p className={`text-2xl font-bold ${riskColor}`}>{riskCategory}</p>
            </div>
            <div className="border-t pt-4">
              <h3 className="font-semibold text-lg text-slate-800 mb-2">Contributing Factors:</h3>
              <ul className="list-disc list-inside space-y-1 text-slate-600">
                <li>Budget Complexity: <span className="font-semibold">{riskFactors.budgetComplexity}</span></li>
                <li>Schedule Complexity: <span className="font-semibold">{riskFactors.scheduleComplexity}</span></li>
                <li>Team Experience: <span className="font-semibold">{riskFactors.teamExperience}</span></li>
                <li>Site Accessibility: <span className="font-semibold">{riskFactors.siteAccessibility}</span></li>
                <li>Material Availability: <span className="font-semibold">{riskFactors.materialAvailability}</span></li>
              </ul>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Download Risk Management Plan</h2>
            <p className="text-slate-600 mb-4">Get a comprehensive Risk Management Plan template to proactively address the factors identified in this analysis.</p>
            <form className="flex gap-2">
                <input type="email" placeholder="Enter your email" required className="flex-grow block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" />
                <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700">
                    Download Template
                </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
