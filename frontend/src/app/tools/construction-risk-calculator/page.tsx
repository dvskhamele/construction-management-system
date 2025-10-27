'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RiskCalculator() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    budgetComplexity: 'Medium',
    scheduleComplexity: 'Medium',
    teamExperience: 'Medium',
    siteAccessibility: 'Moderate',
    materialAvailability: 'Average',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams(formData).toString();
    router.push(`/tools/construction-risk-calculator/result?${query}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <main className="bg-slate-50 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl">
            Simple Construction Risk Calculator
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
            Get a high-level risk score for your project based on key complexity factors.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="budgetComplexity" className="block text-sm font-medium text-slate-700">Budget Complexity</label>
              <select name="budgetComplexity" value={formData.budgetComplexity} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-white rounded-md">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div>
              <label htmlFor="scheduleComplexity" className="block text-sm font-medium text-slate-700">Schedule Complexity</label>
              <select name="scheduleComplexity" value={formData.scheduleComplexity} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-white rounded-md">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div>
              <label htmlFor="teamExperience" className="block text-sm font-medium text-slate-700">Team Experience with Similar Projects</label>
              <select name="teamExperience" value={formData.teamExperience} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-white rounded-md">
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div>
              <label htmlFor="siteAccessibility" className="block text-sm font-medium text-slate-700">Site Accessibility</label>
              <select name="siteAccessibility" value={formData.siteAccessibility} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-white rounded-md">
                <option>Easy</option>
                <option>Moderate</option>
                <option>Difficult</option>
              </select>
            </div>
            <div>
              <label htmlFor="materialAvailability" className="block text-sm font-medium text-slate-700">Material Availability in Region</label>
              <select name="materialAvailability" value={formData.materialAvailability} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-white rounded-md">
                <option>Good</option>
                <option>Average</option>
                <option>Poor</option>
              </select>
            </div>
            <div className="pt-6">
              <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-teal-600 hover:bg-teal-700">
                Calculate Risk Score
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
