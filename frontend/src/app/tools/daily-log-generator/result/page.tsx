'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';

export default function DailyLogResultPage() {
  const searchParams = useSearchParams();

  const logData = {
    projectName: searchParams?.get('projectName') || 'N/A',
    date: searchParams?.get('date') || 'N/A',
    weather: searchParams?.get('weather') || 'N/A',
    crewOnSite: searchParams?.get('crewOnSite') || 'N/A',
    workAccomplished: searchParams?.get('workAccomplished') || 'N/A',
    materialsDelivered: searchParams?.get('materialsDelivered') || 'N/A',
    safetyIncidents: searchParams?.get('safetyIncidents') || 'N/A',
  };

  const LogSection = ({ title, content }: { title: string; content: string }) => (
    <div>
      <h3 className="text-lg font-semibold text-slate-800 bg-slate-100 p-2 rounded-t-md">{title}</h3>
      <div className="border border-t-0 p-4 rounded-b-md whitespace-pre-wrap">{content}</div>
    </div>
  );

  return (
    <main className="bg-slate-50 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl">
            Daily Progress Report
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
            Project: <span className="font-semibold text-teal-600">{logData.projectName}</span> | Date: <span className="font-semibold text-teal-600">{logData.date}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 space-y-6">
            <LogSection title="Weather Conditions" content={logData.weather} />
            <LogSection title="Crew on Site" content={logData.crewOnSite} />
            <LogSection title="Work Accomplished Today" content={logData.workAccomplished} />
            <LogSection title="Materials Delivered" content={logData.materialsDelivered} />
            <LogSection title="Safety Incidents or Observations" content={logData.safetyIncidents} />
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Actions</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700">
                  Download as PDF (Simulated)
                </button>
                <button className="w-full flex items-center justify-center px-4 py-2 border border-slate-300 rounded-lg shadow-sm text-base font-medium text-slate-700 bg-white hover:bg-slate-50">
                  Print Report
                </button>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Save Your Logs</h2>
                <p className="text-slate-600 mb-4">Sign up for free to store, manage, and share all your daily logs online.</p>
                <form className="flex gap-2">
                    <input type="email" placeholder="Enter your email" required className="flex-grow block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm" />
                    <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700">
                        Sign Up Free
                    </button>
                </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
