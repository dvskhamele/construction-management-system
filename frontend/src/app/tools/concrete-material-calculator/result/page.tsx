'use client';
'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import ContractorTracking from '@/components/ContractorTracking';
import ContractorUpdatePortal from '@/components/ContractorUpdatePortal';

export default function ConcreteResultPage() {
  const searchParams = useSearchParams();

  // --- B. JS Logic ---
  const getNumericParam = (name: string) => {
    const param = searchParams?.get(name);
    return param ? parseFloat(param) || 0 : 0;
  };
  const getStringParam = (name: string) => searchParams?.get(name) || '';

  const calcType = getStringParam('calcType');
  const units = getStringParam('units');
  const concreteGrade = getStringParam('concreteGrade').split(' ')[0]; // e.g., 'M20'

  const ftToM = 0.3048;
  const conversionFactor = units === 'Feet' ? ftToM : 1;

  let volume = 0;
  if (calcType === 'Slab') {
    const length = getNumericParam('slabLength') * conversionFactor;
    const width = getNumericParam('slabWidth') * conversionFactor;
    const thickness = getNumericParam('slabThickness') * conversionFactor;
    volume = length * width * thickness;
  } else { // Column
    const diameter = getNumericParam('columnDiameter') * conversionFactor;
    const height = getNumericParam('columnHeight') * conversionFactor;
    const count = getNumericParam('numberOfColumns');
    const radius = diameter / 2;
    volume = Math.PI * Math.pow(radius, 2) * height * count;
  }

  const gradeRatios = {
    M20: { ratio: [1, 1.5, 3], sum: 5.5 },
    M25: { ratio: [1, 1, 2], sum: 4 },
    M30: { ratio: [1, 1, 3], sum: 5 }, // Note: M30 is often a design mix, this is an approximation
  } as const;

  const selectedGrade = gradeRatios[concreteGrade as keyof typeof gradeRatios] || gradeRatios.M20;
  const dryVolume = volume * 1.54;

  const cementVolume = (dryVolume * selectedGrade.ratio[0]) / selectedGrade.sum;
  const cementBags = Math.ceil(cementVolume / 0.0347);

  const sandVolume = (dryVolume * selectedGrade.ratio[1]) / selectedGrade.sum;
  const sandCFT = sandVolume * 35.3147;

  const aggregateVolume = (dryVolume * selectedGrade.ratio[2]) / selectedGrade.sum;
  const aggregateCFT = aggregateVolume * 35.3147;

  // --- D. Result Page UI ---
  return (
    <main className="bg-slate-50 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl">
            Concrete Material Estimation
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
            Here is the estimated quantity of materials required for your concrete work.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Results Table */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2 mb-6">Required Materials</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-teal-50 p-4 rounded-lg">
                <span className="text-lg font-medium text-teal-800">Total Concrete Volume:</span>
                <span className="text-2xl font-bold text-teal-800">{volume.toFixed(2)} m³</span>
              </div>
              <div className="border-t pt-4">
                <table className="min-w-full">
                  <thead className="text-left">
                    <tr>
                      <th className="pb-2 text-slate-600">Material</th>
                      <th className="pb-2 text-slate-600">Required Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-3 font-medium">Cement (50kg bags)</td>
                      <td className="py-3 font-bold text-lg">{cementBags} bags</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-3 font-medium">Sand</td>
                      <td className="py-3 font-bold text-lg">{sandCFT.toFixed(2)} cft</td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium">Aggregate</td>
                      <td className="py-3 font-bold text-lg">{aggregateCFT.toFixed(2)} cft</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="text-xs text-slate-500 pt-4">
                * Disclaimer: Calculations are based on standard mix ratios and include a 1.54 factor for dry volume. Actual requirements may vary. Always add a buffer for wastage.
              </div>
            </div>
          </div>

          {/* Right Column: Contractor Integration */}
          <div className="space-y-8">
            <ContractorTracking 
              toolName="Concrete Material Calculator" 
              toolResult={{
                calcType,
                units,
                concreteGrade,
                volume: parseFloat(volume.toFixed(2)),
                cementBags,
                sandCFT: parseFloat(sandCFT.toFixed(2)),
                aggregateCFT: parseFloat(aggregateCFT.toFixed(2)),
                dryVolume: parseFloat(dryVolume.toFixed(2))
              }}
            />
            
            <div className="bg-blue-50 rounded-2xl shadow-xl p-6 border border-blue-200">
              <h2 className="text-xl font-bold text-slate-800 mb-2 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                Material Tracking Portal
              </h2>
              <p className="text-slate-600 mb-4">Track material delivery and usage for your concrete work.</p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                  <span className="font-medium">Material Order</span>
                  <span className="text-sm text-amber-600 font-semibold">Pending</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                  <span className="font-medium">Delivery Schedule</span>
                  <span className="text-sm text-amber-600 font-semibold">Scheduled</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                  <span className="font-medium">Quality Check</span>
                  <span className="text-sm text-slate-500 font-semibold">Not Started</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contractor Update Portal */}
        <div className="mt-8">
          <ContractorUpdatePortal 
            projectId={`concrete_proj_${Date.now()}`}
            projectName="Concrete Work Project"
            tasks={[
              { id: 'prep', name: 'Site Preparation', status: 'completed', deadline: '2025-04-10' },
              { id: 'mix', name: 'Concrete Mixing', status: 'in-progress', deadline: '2025-04-15' },
              { id: 'pour', name: 'Concrete Pouring', status: 'pending', deadline: '2025-04-20' },
            ]}
          />
        </div>
      </div>
    </main>
  );
}
