'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ChangeOrderCalculator() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    materialCost: '5000',
    laborHours: '40',
    laborRate: '250',
    subcontractorCost: '0',
    overheadMarkup: '15',
    profitMarkup: '10',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams(formData).toString();
    router.push(`/tools/change-order-cost-calculator/result?${query}`);
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
            Change Order Cost Calculator
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
            Quickly price a change order, including overhead and profit, to present to your client.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="font-semibold text-lg text-slate-800 border-b pb-2">Direct Costs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="materialCost" className="block text-sm font-medium text-slate-700">Additional Material Cost (INR)</label>
                    <input type="number" name="materialCost" value={formData.materialCost} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="subcontractorCost" className="block text-sm font-medium text-slate-700">Additional Subcontractor Cost (INR)</label>
                    <input type="number" name="subcontractorCost" value={formData.subcontractorCost} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="laborHours" className="block text-sm font-medium text-slate-700">Additional Labor Hours</label>
                    <input type="number" name="laborHours" value={formData.laborHours} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="laborRate" className="block text-sm font-medium text-slate-700">Labor Rate (INR/hour)</label>
                    <input type="number" name="laborRate" value={formData.laborRate} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
            </div>
            <div className="border-t pt-6">
              <h3 className="font-semibold text-lg text-slate-800 mb-4 border-b pb-2">Markup</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="overheadMarkup" className="block text-sm font-medium text-slate-700">Overhead Markup (%)</label>
                    <input type="number" name="overheadMarkup" value={formData.overheadMarkup} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="profitMarkup" className="block text-sm font-medium text-slate-700">Profit Markup (%)</label>
                    <input type="number" name="profitMarkup" value={formData.profitMarkup} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
              </div>
            </div>
            <div className="pt-6">
              <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-teal-600 hover:bg-teal-700">
                Calculate Change Order Cost
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
