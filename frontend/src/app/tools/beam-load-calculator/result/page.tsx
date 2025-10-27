'use client';
import React from 'react';
import { notFound } from 'next/navigation';

type Props = {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
};

export default function BeamLoadResultPage({ searchParams = {} }: Props) {
  const load = parseFloat(searchParams.load as string || '0');
  const length = parseFloat(searchParams.length as string || '0');
  const units = searchParams.units as string || 'Metric';

  const maxMoment = (load * Math.pow(length, 2)) / 8;
  const maxShear = (load * length) / 2;

  const momentUnit = units === 'Metric' ? 'kNm' : 'lb-ft';
  const shearUnit = units === 'Metric' ? 'kN' : 'lbs';

  return (
    <main className="bg-slate-50 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl">
            Beam Load Analysis
          </h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2">Calculated Forces</h2>
            <div className="flex justify-between items-center">
              <span className="text-lg text-slate-600">Max Bending Moment:</span>
              <span className="text-3xl font-bold text-teal-600">{maxMoment.toFixed(2)} {momentUnit}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg text-slate-600">Max Shear Force:</span>
              <span className="text-3xl font-bold text-teal-600">{maxShear.toFixed(2)} {shearUnit}</span>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Download Beam Guide</h2>
            <p className="text-slate-600 mb-4">Get our free guide on common beam types and their load-bearing characteristics.</p>
            <form className="flex gap-2">
                <input type="email" placeholder="Enter your email" required className="flex-grow block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" />
                <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700">
                    Download
                </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
