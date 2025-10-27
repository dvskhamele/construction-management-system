'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DailyLogGenerator() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    projectName: 'Downtown Office Complex',
    date: new Date().toISOString().split('T')[0],
    weather: 'Sunny, 32°C',
    crewOnSite: '5 Skilled, 10 Semi-skilled, 15 Unskilled',
    workAccomplished: 'Completed foundation pouring for sector A.\\nStarted excavation for sector B.',
    materialsDelivered: '500 bags of cement, 10 tons of steel rebar.',
    safetyIncidents: 'None reported.',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams(formData).toString();
    router.push(`/tools/daily-log-generator/result?${query}`);
  };

  return (
    <main className="bg-slate-50 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl">
            Digital Construction Daily Log Generator
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
            Quickly generate a professional Daily Progress Report (DPR) for your construction site.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="projectName" className="block text-sm font-medium text-slate-700">Project Name</label>
                <input type="text" name="projectName" id="projectName" value={formData.projectName} onChange={(e) => setFormData({...formData, projectName: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-slate-700">Date</label>
                <input type="date" name="date" id="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
              </div>
            </div>
            <div>
              <label htmlFor="weather" className="block text-sm font-medium text-slate-700">Weather Conditions</label>
              <input type="text" name="weather" id="weather" value={formData.weather} onChange={(e) => setFormData({...formData, weather: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
            </div>
            <div>
              <label htmlFor="crewOnSite" className="block text-sm font-medium text-slate-700">Crew on Site</label>
              <textarea name="crewOnSite" id="crewOnSite" rows={3} value={formData.crewOnSite} onChange={(e) => setFormData({...formData, crewOnSite: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md"></textarea>
            </div>
            <div>
              <label htmlFor="workAccomplished" className="block text-sm font-medium text-slate-700">Work Accomplished Today</label>
              <textarea name="workAccomplished" id="workAccomplished" rows={5} value={formData.workAccomplished} onChange={(e) => setFormData({...formData, workAccomplished: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md"></textarea>
            </div>
            <div>
              <label htmlFor="materialsDelivered" className="block text-sm font-medium text-slate-700">Materials Delivered</label>
              <textarea name="materialsDelivered" id="materialsDelivered" rows={3} value={formData.materialsDelivered} onChange={(e) => setFormData({...formData, materialsDelivered: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md"></textarea>
            </div>
            <div>
              <label htmlFor="safetyIncidents" className="block text-sm font-medium text-slate-700">Safety Incidents or Observations</label>
              <textarea name="safetyIncidents" id="safetyIncidents" rows={3} value={formData.safetyIncidents} onChange={(e) => setFormData({...formData, safetyIncidents: e.target.value})} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md"></textarea>
            </div>
            <div className="pt-6">
              <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-teal-600 hover:bg-teal-700">
                Generate Daily Log
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
