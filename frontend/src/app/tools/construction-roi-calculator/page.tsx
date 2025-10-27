'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RoiCalculator() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    initialInvestment: '5000000',
    annualRevenue: '1200000',
    annualOperatingCosts: '200000',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams(formData).toString();
    router.push(`/tools/construction-roi-calculator/result?${query}`);
  };

  return (
    <main className="bg-slate-50 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl">
            Construction Project ROI Calculator
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
            Assess the financial viability and return on investment of your projects.
          </p>
        </div>

        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="initialInvestment" className="block text-sm font-medium text-slate-700">Total Initial Investment (INR)</label>
              <input type="number" name="initialInvestment" value={formData.initialInvestment} onChange={(e) => setFormData({...formData, initialInvestment: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="annualRevenue" className="block text-sm font-medium text-slate-700">Projected Annual Revenue (INR)</label>
              <input type="number" name="annualRevenue" value={formData.annualRevenue} onChange={(e) => setFormData({...formData, annualRevenue: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="annualOperatingCosts" className="block text-sm font-medium text-slate-700">Projected Annual Operating Costs (INR)</label>
              <input type="number" name="annualOperatingCosts" value={formData.annualOperatingCosts} onChange={(e) => setFormData({...formData, annualOperatingCosts: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
            </div>
            <div className="pt-6">
              <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-teal-600 hover:bg-teal-700">
                Calculate ROI
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
