'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StrengthPredictor() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    sevenDayStrength: '20',
    units: 'MPa',
    concreteGrade: 'M30',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams(formData).toString();
    router.push(`/tools/concrete-strength-predictor/result?${query}`);
  };

  return (
    <main className="bg-slate-50 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl">
            Concrete Strength Predictor (7 to 28 Day)
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
            Estimate the 28-day compressive strength of your concrete based on its 7-day test results.
          </p>
        </div>

        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="sevenDayStrength" className="block text-sm font-medium text-slate-700">7-Day Compressive Strength</label>
                    <input type="number" name="sevenDayStrength" value={formData.sevenDayStrength} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({...formData, sevenDayStrength: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="units" className="block text-sm font-medium text-slate-700">Units</label>
                    <select name="units" value={formData.units} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({...formData, units: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-white rounded-md">
                        <option>MPa</option>
                        <option>psi</option>
                    </select>
                </div>
            </div>
            <div>
              <label htmlFor="concreteGrade" className="block text-sm font-medium text-slate-700">Target Concrete Grade</label>
              <select name="concreteGrade" value={formData.concreteGrade} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({...formData, concreteGrade: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-white rounded-md">
                <option>M20</option>
                <option>M25</option>
                <option>M30</option>
                <option>M40</option>
              </select>
            </div>
            <div className="pt-6">
              <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-teal-600 hover:bg-teal-700">
                Predict 28-Day Strength
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
