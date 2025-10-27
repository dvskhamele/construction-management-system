'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TimelineEstimator() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    projectType: 'Residential Building',
    projectSize: '2000',
    units: 'Square Feet',
    complexity: 'Medium',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams(formData).toString();
    router.push(`/tools/construction-timeline-estimator/result?${query}`);
  };

  return (
    <main className="bg-slate-50 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl">
            Construction Project Timeline Estimator
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
            Get a high-level estimate of your project's duration and key phases.
          </p>
        </div>

        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="projectType" className="block text-sm font-medium text-slate-700">Project Type</label>
              <select id="projectType" name="projectType" value={formData.projectType} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({...formData, projectType: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-white rounded-md shadow-sm">
                <option>Residential Building</option>
                <option>Commercial Building</option>
                <option>Interior Renovation</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label htmlFor="projectSize" className="block text-sm font-medium text-slate-700">Project Area</label>
                    <input type="number" name="projectSize" id="projectSize" value={formData.projectSize} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, projectSize: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="units" className="block text-sm font-medium text-slate-700">Units</label>
                    <select id="units" name="units" value={formData.units} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({...formData, units: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-white rounded-md shadow-sm">
                        <option>Square Feet</option>
                        <option>Square Meters</option>
                    </select>
                </div>
            </div>

            <div>
              <label htmlFor="complexity" className="block text-sm font-medium text-slate-700">Project Complexity</label>
              <select id="complexity" name="complexity" value={formData.complexity} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({...formData, complexity: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-white rounded-md shadow-sm">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            
            <div className="pt-6">
              <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-teal-600 hover:bg-teal-700">
                Estimate Timeline
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
