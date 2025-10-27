'use client';
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ContractorTracking from '@/components/ContractorTracking';

// Main component for the Profitability Calculator
export default function ConstructionProfitCalculator() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    totalContractValue: '1000000',
    materialCosts: '300000',
    laborCosts: '250000',
    subcontractorCosts: '150000',
    equipmentRentalCosts: '50000',
    overheadPercentage: '15',
    contingencyPercentage: '10',
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
      // In a real scenario, we would save the inputs and get a result ID
      // For this autonomous agent, we'll pass the data via query params
      const query = new URLSearchParams(formData).toString();
      router.push(`/tools/construction-profit-calculator/result?${query}`);
    }
  };

  return (
    <main className="bg-slate-50 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl">
            Construction Project Profitability Calculator
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
            Estimate the potential profit and margin of your next construction project before you even lay the foundation.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="totalContractValue" className="block text-sm font-medium text-slate-700">Total Contract Value (INR)</label>
                <input type="number" name="totalContractValue" id="totalContractValue" value={formData.totalContractValue} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                {errors.totalContractValue && <p className="mt-1 text-sm text-rose-600">{errors.totalContractValue}</p>}
              </div>
              <div>
                <label htmlFor="materialCosts" className="block text-sm font-medium text-slate-700">Material Costs (INR)</label>
                <input type="number" name="materialCosts" id="materialCosts" value={formData.materialCosts} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                {errors.materialCosts && <p className="mt-1 text-sm text-rose-600">{errors.materialCosts}</p>}
              </div>
              <div>
                <label htmlFor="laborCosts" className="block text-sm font-medium text-slate-700">Labor Costs (INR)</label>
                <input type="number" name="laborCosts" id="laborCosts" value={formData.laborCosts} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                {errors.laborCosts && <p className="mt-1 text-sm text-rose-600">{errors.laborCosts}</p>}
              </div>
              <div>
                <label htmlFor="subcontractorCosts" className="block text-sm font-medium text-slate-700">Subcontractor Costs (INR)</label>
                <input type="number" name="subcontractorCosts" id="subcontractorCosts" value={formData.subcontractorCosts} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                {errors.subcontractorCosts && <p className="mt-1 text-sm text-rose-600">{errors.subcontractorCosts}</p>}
              </div>
              <div>
                <label htmlFor="equipmentRentalCosts" className="block text-sm font-medium text-slate-700">Equipment Costs (INR)</label>
                <input type="number" name="equipmentRentalCosts" id="equipmentRentalCosts" value={formData.equipmentRentalCosts} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                {errors.equipmentRentalCosts && <p className="mt-1 text-sm text-rose-600">{errors.equipmentRentalCosts}</p>}
              </div>
              <div>
                <label htmlFor="overheadPercentage" className="block text-sm font-medium text-slate-700">Overhead (%)</label>
                <input type="number" name="overheadPercentage" id="overheadPercentage" value={formData.overheadPercentage} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                {errors.overheadPercentage && <p className="mt-1 text-sm text-rose-600">{errors.overheadPercentage}</p>}
              </div>
               <div>
                <label htmlFor="contingencyPercentage" className="block text-sm font-medium text-slate-700">Contingency Buffer (%)</label>
                <input type="number" name="contingencyPercentage" id="contingencyPercentage" value={formData.contingencyPercentage} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />
                {errors.contingencyPercentage && <p className="mt-1 text-sm text-rose-600">{errors.contingencyPercentage}</p>}
              </div>
            </div>
            
            <div>
              <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
                Calculate Profitability
              </button>
            </div>
          </form>
        </div>
        
        {/* Contractor Tracking Integration Preview */}
        <div className="max-w-2xl mx-auto mt-8">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-3">Project & Contractor Integration</h2>
            <p className="text-slate-600 mb-4">
              After calculating profitability, connect your project to the CRM system for automated deadline tracking and contractor updates.
            </p>
            <div className="flex items-center text-sm text-blue-700 bg-blue-100 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              All calculations will be automatically saved and accessible through the CRM dashboard
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
