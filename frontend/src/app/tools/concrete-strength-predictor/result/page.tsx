'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';

export default function StrengthResultPage() {
  const searchParams = useSearchParams();
  const sevenDayStrengthStr = searchParams?.get('sevenDayStrength');
  const sevenDayStrength = sevenDayStrengthStr ? parseFloat(sevenDayStrengthStr) || 0 : 0;
  const units = searchParams?.get('units') || 'MPa';
  const concreteGrade = searchParams?.get('concreteGrade') || 'M20';

  const predictedStrength = sevenDayStrength * 1.5;
  const targetStrength = parseInt(concreteGrade.substring(1));

  const meetsRequirement = predictedStrength >= targetStrength;

  return (
    <main className="bg-slate-50 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl">
            Concrete Strength Prediction
          </h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Strength Analysis</h2>
            <div className="text-center">
              <p className="text-lg text-slate-600">Predicted 28-Day Strength</p>
              <p className={`text-6xl font-extrabold ${meetsRequirement ? 'text-emerald-600' : 'text-rose-600'}`}>
                {predictedStrength.toFixed(2)} <span className="text-4xl">{units}</span>
              </p>
            </div>
            <div className={`p-4 rounded-lg ${meetsRequirement ? 'bg-emerald-50 border-emerald-300' : 'bg-rose-50 border-rose-300'} border`}>
              <p className={`text-center font-semibold text-lg ${meetsRequirement ? 'text-emerald-800' : 'text-rose-800'}`}>
                {meetsRequirement 
                  ? `This meets or exceeds the required ${targetStrength} ${units} for ${concreteGrade} grade.`
                  : `Warning: This may not meet the required ${targetStrength} ${units} for ${concreteGrade} grade.`}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Get Concrete Mix Guide</h2>
            <p className="text-slate-600 mb-4">Download our free guide on concrete mix design, curing times, and testing procedures.</p>
            <form className="flex gap-2">
                <input type="email" placeholder="Enter your email" required className="flex-grow block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" />
                <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700">
                    Download Now
                </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
