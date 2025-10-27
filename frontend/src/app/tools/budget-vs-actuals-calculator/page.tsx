'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BudgetVsActualsCalculator() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    budgetedMaterials: '300000',
    actualMaterials: '320000',
    budgetedLabor: '250000',
    actualLabor: '240000',
    budgetedSubcontractors: '150000',
    actualSubcontractors: '150000',
    budgetedEquipment: '50000',
    actualEquipment: '65000',
    budgetedOverhead: '112500',
    actualOverhead: '120000',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams(formData).toString();
    router.push(`/tools/budget-vs-actuals-calculator/result?${query}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <main className="bg-slate-50 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl">
            Budget vs. Actuals Calculator
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
            Track cost variances and gain better control over your project's financial health.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 border-b pb-6">
              <h3 className="md:col-span-2 font-semibold text-lg text-slate-800">Material Costs</h3>
              <div>
                <label htmlFor="budgetedMaterials" className="block text-sm font-medium text-slate-700">Budgeted (INR)</label>
                <input type="number" name="budgetedMaterials" value={formData.budgetedMaterials} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label htmlFor="actualMaterials" className="block text-sm font-medium text-slate-700">Actual (INR)</label>
                <input type="number" name="actualMaterials" value={formData.actualMaterials} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 border-b pb-6">
              <h3 className="md:col-span-2 font-semibold text-lg text-slate-800">Labor Costs</h3>
              <div>
                <label htmlFor="budgetedLabor" className="block text-sm font-medium text-slate-700">Budgeted (INR)</label>
                <input type="number" name="budgetedLabor" value={formData.budgetedLabor} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label htmlFor="actualLabor" className="block text-sm font-medium text-slate-700">Actual (INR)</label>
                <input type="number" name="actualLabor" value={formData.actualLabor} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 border-b pb-6">
              <h3 className="md:col-span-2 font-semibold text-lg text-slate-800">Subcontractor Costs</h3>
              <div>
                <label htmlFor="budgetedSubcontractors" className="block text-sm font-medium text-slate-700">Budgeted (INR)</label>
                <input type="number" name="budgetedSubcontractors" value={formData.budgetedSubcontractors} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label htmlFor="actualSubcontractors" className="block text-sm font-medium text-slate-700">Actual (INR)</label>
                <input type="number" name="actualSubcontractors" value={formData.actualSubcontractors} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 border-b pb-6">
              <h3 className="md:col-span-2 font-semibold text-lg text-slate-800">Equipment Costs</h3>
              <div>
                <label htmlFor="budgetedEquipment" className="block text-sm font-medium text-slate-700">Budgeted (INR)</label>
                <input type="number" name="budgetedEquipment" value={formData.budgetedEquipment} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label htmlFor="actualEquipment" className="block text-sm font-medium text-slate-700">Actual (INR)</label>
                <input type="number" name="actualEquipment" value={formData.actualEquipment} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <h3 className="md:col-span-2 font-semibold text-lg text-slate-800">Overhead Costs</h3>
              <div>
                <label htmlFor="budgetedOverhead" className="block text-sm font-medium text-slate-700">Budgeted (INR)</label>
                <input type="number" name="budgetedOverhead" value={formData.budgetedOverhead} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label htmlFor="actualOverhead" className="block text-sm font-medium text-slate-700">Actual (INR)</label>
                <input type="number" name="actualOverhead" value={formData.actualOverhead} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
            </div>

            <div className="pt-6">
              <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-teal-600 hover:bg-teal-700">
                Calculate Variance
              </button>
            </div>
          </form>
        </div>
        
        {/* Contractor Tracking Integration Preview */}
        <div className="max-w-3xl mx-auto mt-8">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-3">Project & Contractor Integration</h2>
            <p className="text-slate-600 mb-4">
              After calculating budget variances, connect your project to the CRM system for automated deadline tracking and contractor updates.
            </p>
            <div className="flex items-center text-sm text-blue-700 bg-blue-100 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Budget variances will be automatically tracked and linked to contractor performance
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
