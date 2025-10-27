'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EscalationCalculator() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    currentCost: '100000',
    annualInflationRate: '6',
    projectDurationYears: '3',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams(formData).toString();
    router.push(`/tools/cost-escalation-calculator/result?${query}`);
  };

  return (
    <main className="bg-slate-50 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl">
            Construction Cost Escalation Calculator
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
            Project the future cost of materials or labor based on an assumed annual inflation rate.
          </p>
        </div>

        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="currentCost" className="block text-sm font-medium text-slate-700">Current Cost (INR)</label>
                <input type="number" name="currentCost" value={formData.currentCost} onChange={(e) => setFormData({...formData, currentCost: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="annualInflationRate" className="block text-sm font-medium text-slate-700">Annual Inflation Rate (%)</label>
                    <input type="number" step="0.1" name="annualInflationRate" value={formData.annualInflationRate} onChange={(e) => setFormData({...formData, annualInflationRate: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="projectDurationYears" className="block text-sm font-medium text-slate-700">Project Duration (Years)</label>
                    <input type="number" name="projectDurationYears" value={formData.projectDurationYears} onChange={(e) => setFormData({...formData, projectDurationYears: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
            </div>
            <div className="pt-6">
              <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-teal-600 hover:bg-teal-700">
                Calculate Future Cost
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
