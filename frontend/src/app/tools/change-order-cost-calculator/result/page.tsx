'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';

export default function ChangeOrderResultPage() {
  const searchParams = useSearchParams();
  const getNumericParam = (name: string) => {
    const param = searchParams?.get(name);
    return param ? parseFloat(param) || 0 : 0;
  };

  const materialCost = getNumericParam('materialCost');
  const laborHours = getNumericParam('laborHours');
  const laborRate = getNumericParam('laborRate');
  const subcontractorCost = getNumericParam('subcontractorCost');
  const overheadMarkup = getNumericParam('overheadMarkup');
  const profitMarkup = getNumericParam('profitMarkup');

  const totalLaborCost = laborHours * laborRate;
  const totalDirectCost = materialCost + totalLaborCost + subcontractorCost;
  const overheadAmount = totalDirectCost * (overheadMarkup / 100);
  const profitAmount = totalDirectCost * (profitMarkup / 100);
  const totalChangeOrderCost = totalDirectCost + overheadAmount + profitAmount;

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

  return (
    <main className="bg-slate-50 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl">
            Change Order Cost Summary
          </h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Total Cost for Client</h2>
            <div className="text-center">
              <p className="text-6xl font-extrabold text-teal-600">{formatCurrency(totalChangeOrderCost)}</p>
            </div>
            <div className="border-t pt-6 space-y-3">
                <h3 className="font-semibold text-lg text-slate-800 mb-2">Cost Breakdown</h3>
                <div className="flex justify-between text-md">
                    <span>Total Direct Costs:</span>
                    <span className="font-medium">{formatCurrency(totalDirectCost)}</span>
                </div>
                <div className="flex justify-between text-md">
                    <span>Overhead ({overheadMarkup}%):</span>
                    <span className="font-medium">{formatCurrency(overheadAmount)}</span>
                </div>
                <div className="flex justify-between text-md">
                    <span>Profit ({profitMarkup}%):</span>
                    <span className="font-medium">{formatCurrency(profitAmount)}</span>
                </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Download Change Order Form</h2>
            <p className="text-slate-600 mb-4">Download a professional Change Order Request form to submit to your client.</p>
            <form className="flex gap-2">
                <input type="email" placeholder="Enter your email" required className="flex-grow block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" />
                <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700">
                    Download Form
                </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
