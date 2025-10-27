'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LaborCostEstimator() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    skilledWorkers: '10',
    skilledWorkerWage: '1200',
    semiSkilledWorkers: '20',
    semiSkilledWorkerWage: '800',
    unskilledWorkers: '30',
    unskilledWorkerWage: '500',
    projectDurationDays: '90',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    for (const key in formData) {
      if (!formData[key as keyof typeof formData] || isNaN(parseFloat(formData[key as keyof typeof formData])) || parseFloat(formData[key as keyof typeof formData]) < 0) {
        newErrors[key] = 'Please enter a valid non-negative number.';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const query = new URLSearchParams(formData).toString();
      router.push(`/tools/construction-labor-cost-estimator/result?${query}`);
    }
  };

  return (
    <main className="bg-slate-50 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl">
            Construction Labor Cost Estimator
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
            Accurately estimate the labor costs for your project based on team size, duration, and daily wages.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              {/* Skilled Workers */}
              <div className="md:col-span-2 font-semibold text-lg text-slate-800 border-b pb-2">Skilled Labor</div>
              <div>
                <label htmlFor="skilledWorkers" className="block text-sm font-medium text-slate-700">Number of Skilled Workers</label>
                <input type="number" name="skilledWorkers" id="skilledWorkers" value={formData.skilledWorkers} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" />
                {errors.skilledWorkers && <p className="mt-1 text-sm text-rose-600">{errors.skilledWorkers}</p>}
              </div>
              <div>
                <label htmlFor="skilledWorkerWage" className="block text-sm font-medium text-slate-700">Avg. Daily Wage (INR)</label>
                <input type="number" name="skilledWorkerWage" id="skilledWorkerWage" value={formData.skilledWorkerWage} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" />
                {errors.skilledWorkerWage && <p className="mt-1 text-sm text-rose-600">{errors.skilledWorkerWage}</p>}
              </div>

              {/* Semi-Skilled Workers */}
              <div className="md:col-span-2 font-semibold text-lg text-slate-800 border-b pb-2 pt-4">Semi-Skilled Labor</div>
              <div>
                <label htmlFor="semiSkilledWorkers" className="block text-sm font-medium text-slate-700">Number of Semi-Skilled Workers</label>
                <input type="number" name="semiSkilledWorkers" id="semiSkilledWorkers" value={formData.semiSkilledWorkers} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" />
                {errors.semiSkilledWorkers && <p className="mt-1 text-sm text-rose-600">{errors.semiSkilledWorkers}</p>}
              </div>
              <div>
                <label htmlFor="semiSkilledWorkerWage" className="block text-sm font-medium text-slate-700">Avg. Daily Wage (INR)</label>
                <input type="number" name="semiSkilledWorkerWage" id="semiSkilledWorkerWage" value={formData.semiSkilledWorkerWage} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" />
                {errors.semiSkilledWorkerWage && <p className="mt-1 text-sm text-rose-600">{errors.semiSkilledWorkerWage}</p>}
              </div>

              {/* Unskilled Workers */}
              <div className="md:col-span-2 font-semibold text-lg text-slate-800 border-b pb-2 pt-4">Unskilled Labor</div>
              <div>
                <label htmlFor="unskilledWorkers" className="block text-sm font-medium text-slate-700">Number of Unskilled Workers</label>
                <input type="number" name="unskilledWorkers" id="unskilledWorkers" value={formData.unskilledWorkers} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" />
                {errors.unskilledWorkers && <p className="mt-1 text-sm text-rose-600">{errors.unskilledWorkers}</p>}
              </div>
              <div>
                <label htmlFor="unskilledWorkerWage" className="block text-sm font-medium text-slate-700">Avg. Daily Wage (INR)</label>
                <input type="number" name="unskilledWorkerWage" id="unskilledWorkerWage" value={formData.unskilledWorkerWage} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" />
                {errors.unskilledWorkerWage && <p className="mt-1 text-sm text-rose-600">{errors.unskilledWorkerWage}</p>}
              </div>

               {/* Project Duration */}
              <div className="md:col-span-2 font-semibold text-lg text-slate-800 border-b pb-2 pt-4">Project Timeline</div>
              <div className="md:col-span-2">
                <label htmlFor="projectDurationDays" className="block text-sm font-medium text-slate-700">Total Project Duration (in Days)</label>
                <input type="number" name="projectDurationDays" id="projectDurationDays" value={formData.projectDurationDays} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" />
                {errors.projectDurationDays && <p className="mt-1 text-sm text-rose-600">{errors.projectDurationDays}</p>}
              </div>
            </div>
            
            <div className="pt-6">
              <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                Estimate Labor Cost
              </button>
            </div>
          </form>
        </div>
        
        {/* Contractor Tracking Integration Preview */}
        <div className="max-w-3xl mx-auto mt-8">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-3">Project & Contractor Integration</h2>
            <p className="text-slate-600 mb-4">
              After calculating labor costs, connect your project to the CRM system for automated deadline tracking and contractor management.
            </p>
            <div className="flex items-center text-sm text-blue-700 bg-blue-100 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Labor estimates will be automatically linked to crew assignments and project schedules
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
