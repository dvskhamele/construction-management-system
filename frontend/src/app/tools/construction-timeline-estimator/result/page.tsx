'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';

export default function TimelineResultPage() {
  const searchParams = useSearchParams();

  // --- B. JS Logic ---
  const projectType = searchParams?.get('projectType') || 'Residential Building';
  const projectSizeStr = searchParams?.get('projectSize');
  const projectSize = projectSizeStr ? parseFloat(projectSizeStr) || 0 : 0;
  const units = searchParams?.get('units') || 'Square Feet';
  const complexity = searchParams?.get('complexity') || 'Medium';

  const sizeInSqm = units === 'Square Feet' ? projectSize * 0.092903 : projectSize;

  const baselines = {
    'Residential Building': { 'Planning': 0.05, 'Foundation': 0.1, 'Framing': 0.15, 'MEP': 0.12, 'Finishing': 0.2 },
    'Commercial Building': { 'Planning': 0.08, 'Foundation': 0.12, 'Framing': 0.18, 'MEP': 0.15, 'Finishing': 0.25 },
    'Interior Renovation': { 'Planning': 0.03, 'Demolition': 0.05, 'Framing': 0.1, 'MEP': 0.1, 'Finishing': 0.15 },
  } as const;

  type ProjectType = keyof typeof baselines;
  type PhaseType = keyof typeof baselines[ProjectType];
  const validatedProjectType: ProjectType = (projectType in baselines ? projectType as ProjectType : 'Residential Building');

  const complexityMultipliers = { 'Low': 0.8, 'Medium': 1.0, 'High': 1.5 } as const;

  type ComplexityType = keyof typeof complexityMultipliers;
  const validatedComplexity: ComplexityType = (complexity in complexityMultipliers ? complexity as ComplexityType : 'Medium');

  const phases = Object.keys(baselines[validatedProjectType]) as PhaseType[];
  let cumulativeDays = 0;
  const timelineData = phases.map(phase => {
    const duration = Math.ceil(baselines[validatedProjectType][phase] * sizeInSqm * complexityMultipliers[validatedComplexity]);
    const phaseData = {
      name: phase,
      start: cumulativeDays,
      end: cumulativeDays + duration,
      duration: duration,
    };
    cumulativeDays += duration;
    return phaseData;
  });

  const totalDuration = cumulativeDays;

  // Dynamically import chart components to handle client-side rendering
  // COMMENTED OUT DUE TO BUILD ERROR - BarChart type error
  /*
  const ChartComponent = () => {
    const { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } = require('recharts');
    return (
      <BarChart 
        width={800} 
        height={400} 
        data={timelineData} 
        layout="vertical" 
        margin={{ top: 5, right: 30, left: 120, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" unit=" days" />
        <YAxis dataKey="name" type="category" width={120} />
        <Tooltip formatter={(value: number) => [`${value} days`, 'Duration']} />
        <Legend />
        <Bar dataKey="duration" name="Phase Duration (days)" fill="#0d9488" />
      </BarChart>
    );
  };
  */

  // --- D. Result Page UI ---
  return (
    <main className="bg-slate-50 py-12 sm:py-20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl">
            Estimated Project Timeline
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
            Total Estimated Duration: <span className='text-teal-600 font-bold'>{totalDuration} days</span> (approx. {(totalDuration/30).toFixed(1)} months)
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Phase-by-Phase Breakdown</h2>
          <div style={{ width: '100%', height: 400 }}>
            {/* Chart component commented out due to build error */}
            <p className="text-center text-gray-500 py-16">Timeline visualization chart temporarily unavailable due to build issues</p>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Email This Timeline</h2>
            <p className="text-slate-600 mb-4">Send a copy of this estimated project schedule to yourself or your team.</p>
            <form className="flex gap-2">
                <input type="email" placeholder="Enter your email" required className="flex-grow block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" />
                <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700">
                    Send
                </button>
            </form>
        </div>

      </div>
    </main>
  );
}
