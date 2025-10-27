'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';

export default function EscalationResultPage() {
  const searchParams = useSearchParams();
  const currentCost = parseFloat(searchParams?.get('currentCost') || '0') || 0;
  const annualInflationRate = parseFloat(searchParams?.get('annualInflationRate') || '0') || 0;
  const projectDurationYears = parseFloat(searchParams?.get('projectDurationYears') || '0') || 0;

  const r = annualInflationRate / 100;
  const n = projectDurationYears;
  const futureCost = currentCost * Math.pow(1 + r, n);
  const costIncrease = futureCost - currentCost;

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

  return (
    <main className="bg-slate-50 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl">
            Cost Escalation Estimate
          </h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Projected Costs</h2>
            <div className="text-center">
              <p className="text-lg text-slate-600">Future Cost after {projectDurationYears} years</p>
              <p className="text-6xl font-extrabold text-teal-600">{formatCurrency(futureCost)}</p>
            </div>
            <div className="text-center border-t pt-4">
              <p className="text-lg text-slate-600">Total Cost Increase</p>
              <p className="text-3xl font-bold text-rose-600">{formatCurrency(costIncrease)}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Get Annual Cost Report</h2>
            <p className="text-slate-600 mb-4">Download our annual report on construction material and labor cost trends across India.</p>
            <form className="flex gap-2">
                <input type="email" placeholder="Enter your email" required className="flex-grow block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" />
                <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700">
                    Download Report
                </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
