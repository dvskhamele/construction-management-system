'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ConcreteCalculator() {
  const router = useRouter();
  const [calcType, setCalcType] = useState('Slab');
  const [units, setUnits] = useState('Meters');
  const [formData, setFormData] = useState({
    slabLength: '10',
    slabWidth: '5',
    slabThickness: '0.15',
    columnDiameter: '0.5',
    columnHeight: '3',
    numberOfColumns: '1',
    concreteGrade: 'M20',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const requiredFields = calcType === 'Slab' 
      ? ['slabLength', 'slabWidth', 'slabThickness'] 
      : ['columnDiameter', 'columnHeight', 'numberOfColumns'];
      
    requiredFields.forEach(key => {
      if (!formData[key as keyof typeof formData] || isNaN(parseFloat(formData[key as keyof typeof formData])) || parseFloat(formData[key as keyof typeof formData]) <= 0) {
        newErrors[key] = 'Please enter a valid positive number.';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const queryData = { ...formData, calcType, units };
      const query = new URLSearchParams(queryData).toString();
      router.push(`/tools/concrete-material-calculator/result?${query}`);
    }
  };

  return (
    <main className="bg-slate-50 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl">
            Concrete & Material Calculator
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
            Calculate the required concrete volume and material quantities for slabs and columns.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Calculation Type and Units */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Calculation Type</label>
                <div className="flex gap-4">
                  <button type="button" onClick={() => setCalcType('Slab')} className={`px-4 py-2 rounded-lg text-sm font-medium w-full ${calcType === 'Slab' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700'}`}>Slab</button>
                  <button type="button" onClick={() => setCalcType('Column')} className={`px-4 py-2 rounded-lg text-sm font-medium w-full ${calcType === 'Column' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700'}`}>Column</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Units</label>
                <div className="flex gap-4">
                  <button type="button" onClick={() => setUnits('Meters')} className={`px-4 py-2 rounded-lg text-sm font-medium w-full ${units === 'Meters' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700'}`}>Meters</button>
                  <button type="button" onClick={() => setUnits('Feet')} className={`px-4 py-2 rounded-lg text-sm font-medium w-full ${units === 'Feet' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700'}`}>Feet</button>
                </div>
              </div>
            </div>

            {/* Conditional Fields */}
            {calcType === 'Slab' ? (
              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-semibold text-lg text-slate-800">Slab Dimensions</h3>
                <div>
                  <label htmlFor="slabLength" className="block text-sm font-medium text-slate-700">Length ({units})</label>
                  <input type="number" name="slabLength" id="slabLength" value={formData.slabLength} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
                  {errors.slabLength && <p className="mt-1 text-sm text-rose-600">{errors.slabLength}</p>}
                </div>
                <div>
                  <label htmlFor="slabWidth" className="block text-sm font-medium text-slate-700">Width ({units})</label>
                  <input type="number" name="slabWidth" id="slabWidth" value={formData.slabWidth} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
                  {errors.slabWidth && <p className="mt-1 text-sm text-rose-600">{errors.slabWidth}</p>}
                </div>
                <div>
                  <label htmlFor="slabThickness" className="block text-sm font-medium text-slate-700">Thickness ({units})</label>
                  <input type="number" name="slabThickness" id="slabThickness" value={formData.slabThickness} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
                  {errors.slabThickness && <p className="mt-1 text-sm text-rose-600">{errors.slabThickness}</p>}
                </div>
              </div>
            ) : (
              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-semibold text-lg text-slate-800">Column Dimensions</h3>
                <div>
                  <label htmlFor="columnDiameter" className="block text-sm font-medium text-slate-700">Diameter ({units})</label>
                  <input type="number" name="columnDiameter" id="columnDiameter" value={formData.columnDiameter} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
                  {errors.columnDiameter && <p className="mt-1 text-sm text-rose-600">{errors.columnDiameter}</p>}
                </div>
                <div>
                  <label htmlFor="columnHeight" className="block text-sm font-medium text-slate-700">Height ({units})</label>
                  <input type="number" name="columnHeight" id="columnHeight" value={formData.columnHeight} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
                  {errors.columnHeight && <p className="mt-1 text-sm text-rose-600">{errors.columnHeight}</p>}
                </div>
                <div>
                  <label htmlFor="numberOfColumns" className="block text-sm font-medium text-slate-700">Number of Columns</label>
                  <input type="number" name="numberOfColumns" id="numberOfColumns" value={formData.numberOfColumns} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
                  {errors.numberOfColumns && <p className="mt-1 text-sm text-rose-600">{errors.numberOfColumns}</p>}
                </div>
              </div>
            )}

            {/* Concrete Grade */}
            <div className="pt-4 border-t">
              <label htmlFor="concreteGrade" className="block text-sm font-medium text-slate-700">Concrete Grade</label>
              <select id="concreteGrade" name="concreteGrade" value={formData.concreteGrade} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm">
                <option>M20 (1:1.5:3 Ratio)</option>
                <option>M25 (1:1:2 Ratio)</option>
                <option>M30 (1:1:3 Ratio)</option>
              </select>
            </div>
            
            <div className="pt-6">
              <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-teal-600 hover:bg-teal-700">
                Calculate Materials
              </button>
            </div>
          </form>
        </div>
        
        {/* Contractor Tracking Integration Preview */}
        <div className="max-w-2xl mx-auto mt-8">
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-slate-800 mb-3">Project & Contractor Integration</h2>
            <p className="text-slate-600 mb-4">
              After calculating material requirements, connect your project to the CRM system for automated deadline tracking and contractor updates.
            </p>
            <div className="flex items-center text-sm text-blue-700 bg-blue-100 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Material calculations will be automatically linked to project tasks and contractor assignments
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
