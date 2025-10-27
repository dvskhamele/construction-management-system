'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';

export default function RoiResultPage() {
  const searchParams = useSearchParams();
  const initialInvestment = parseFloat(searchParams?.get('initialInvestment') || '0') || 0;
  const annualRevenue = parseFloat(searchParams?.get('annualRevenue') || '0') || 0;
  const annualOperatingCosts = parseFloat(searchParams?.get('annualOperatingCosts') || '0') || 0;

  const annualProfit = annualRevenue - annualOperatingCosts;
  const roiPercentage = initialInvestment > 0 ? (annualProfit / initialInvestment) * 100 : 0;
  const paybackPeriod = annualProfit > 0 ? initialInvestment / annualProfit : 0;

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);

  return (
    <main className="bg-slate-50 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl">
            Project Financial Analysis
          </h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Key Financial Metrics</h2>
            <div className="flex justify-between items-center">
              <span className="text-lg text-slate-600">Return on Investment (ROI):</span>
              <span className="text-3xl font-bold text-emerald-600">{roiPercentage.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg text-slate-600">Payback Period:</span>
              <span className="text-3xl font-bold text-emerald-600">{paybackPeriod.toFixed(2)} years</span>
            </div>
            <div className="border-t pt-4 flex justify-between items-center">
              <span className="text-lg text-slate-600">Annual Profit:</span>
              <span className="text-xl font-semibold text-slate-800">{formatCurrency(annualProfit)}</span>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Download Financing Guide</h2>
            <p className="text-slate-600 mb-4">Get our free guide to financing construction projects in India, including tips on loans and investor relations.</p>
            <form className="flex gap-2">
                <input type="email" placeholder="Enter your email" required className="flex-grow block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" />
                <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700">
                    Download Guide
                </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
