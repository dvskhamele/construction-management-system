'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BrickCalculator() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    wallLength: '20',
    wallHeight: '10',
    units: 'Feet',
    wallThickness: '9',
    brickSize: 'Standard Indian Brick (230x110x70 mm)',
    mortarJointThickness: '10',
    mortarRatio: '1:6',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams(formData).toString();
    router.push(`/tools/brick-mortar-calculator/result?${query}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <main className="bg-slate-50 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl">
            Brick & Mortar Calculator
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
            Estimate the number of bricks and the required mortar for your wall construction.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="wallLength" className="block text-sm font-medium text-slate-700">Wall Length</label>
                    <input type="number" name="wallLength" value={formData.wallLength} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                <div>
                    <label htmlFor="wallHeight" className="block text-sm font-medium text-slate-700">Wall Height</label>
                    <input type="number" name="wallHeight" value={formData.wallHeight} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
                 <div>
                    <label htmlFor="units" className="block text-sm font-medium text-slate-700">Units</label>
                    <select name="units" value={formData.units} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-white rounded-md">
                        <option>Feet</option>
                        <option>Meters</option>
                    </select>
                </div>
                 <div>
                    <label htmlFor="wallThickness" className="block text-sm font-medium text-slate-700">Wall Thickness (inches)</label>
                    <input type="number" name="wallThickness" value={formData.wallThickness} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
                </div>
            </div>
            <div className="border-t pt-6 space-y-6">
                <div>
                    <label htmlFor="brickSize" className="block text-sm font-medium text-slate-700">Brick Size</label>
                    <select name="brickSize" value={formData.brickSize} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-white rounded-md">
                        <option>Standard Indian Brick (230x110x70 mm)</option>
                        <option>Modular Brick (190x90x90 mm)</option>
                    </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="mortarJointThickness" className="block text-sm font-medium text-slate-700">Mortar Joint (mm)</label>
                        <input type="number" name="mortarJointThickness" value={formData.mortarJointThickness} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md" />
                    </div>
                    <div>
                        <label htmlFor="mortarRatio" className="block text-sm font-medium text-slate-700">Mortar Ratio (Cement:Sand)</label>
                        <select name="mortarRatio" value={formData.mortarRatio} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 bg-white rounded-md">
                            <option>1:4</option>
                            <option>1:5</option>
                            <option>1:6</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="pt-6">
              <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-teal-600 hover:bg-teal-700">
                Calculate
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
