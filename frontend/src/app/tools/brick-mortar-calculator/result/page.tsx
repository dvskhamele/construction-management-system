'use client';
import React from 'react';
import { notFound } from 'next/navigation';

type Props = {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
};

export default function BrickResultPage({ searchParams = {} }: Props) {
  const getNumericParam = (name: string) => parseFloat(searchParams[name] as string || '0');

  const wallLength = getNumericParam('wallLength');
  const wallHeight = getNumericParam('wallHeight');
  const units = searchParams.units as string || 'Feet';
  const wallThicknessInches = getNumericParam('wallThickness');
  const brickSizeStr = searchParams.brickSize as string || '';
  const mortarJointThickness = getNumericParam('mortarJointThickness');
  const mortarRatioStr = searchParams.mortarRatio as string || '1:6';

  const lengthM = units === 'Feet' ? wallLength * 0.3048 : wallLength;
  const heightM = units === 'Feet' ? wallHeight * 0.3048 : wallHeight;
  const thicknessM = wallThicknessInches * 0.0254;

  const brickDimensions = {
    'Standard Indian Brick (230x110x70 mm)': { l: 0.23, w: 0.11, h: 0.07 },
    'Modular Brick (190x90x90 mm)': { l: 0.19, w: 0.09, h: 0.09 },
  };
  const brick = (brickSizeStr in brickDimensions ? brickDimensions[brickSizeStr as keyof typeof brickDimensions] : brickDimensions['Standard Indian Brick (230x110x70 mm)']) || brickDimensions['Standard Indian Brick (230x110x70 mm)'];
  const jointM = mortarJointThickness / 1000;

  const wallVolume = lengthM * heightM * thicknessM;
  const brickVolumeWithMortar = (brick.l + jointM) * (brick.w + jointM) * (brick.h + jointM);
  const brickVolume = brick.l * brick.w * brick.h;
  
  const numberOfBricks = Math.ceil(wallVolume / brickVolumeWithMortar);
  const totalBrickVolume = numberOfBricks * brickVolume;
  const mortarVolume = wallVolume - totalBrickVolume;
  const dryMortarVolume = mortarVolume * 1.33; // Add 33% for dry volume

  const ratioParts = mortarRatioStr.split(':').map(Number);
  const ratioSum = ratioParts[0] + ratioParts[1];
  const cementVolume = (dryMortarVolume * ratioParts[0]) / ratioSum;
  const cementBags = Math.ceil(cementVolume / 0.0347);
  const sandVolume = (dryMortarVolume * ratioParts[1]) / ratioSum;
  const sandCFT = sandVolume * 35.3147;

  return (
    <main className="bg-slate-50 py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl">Brick & Mortar Estimation</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-slate-800 border-b pb-2 mb-6">Material Quantities</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-teal-50 p-4 rounded-lg">
                <span className="text-lg font-medium text-teal-800">Total Bricks Required:</span>
                <span className="text-2xl font-bold text-teal-800">{numberOfBricks}</span>
              </div>
              <div className="border-t pt-4">
                <h3 className="font-semibold text-lg text-slate-800 mb-2">Mortar Mix ({mortarRatioStr})</h3>
                <div className="flex justify-between text-md">
                    <span>Cement (50kg bags):</span>
                    <span className="font-medium">{cementBags} bags</span>
                </div>
                <div className="flex justify-between text-md mt-2">
                    <span>Sand:</span>
                    <span className="font-medium">{sandCFT.toFixed(2)} cft</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Download Guide</h2>
            <p className="text-slate-600 mb-4">Download our free guide on standard brick sizes and mortar ratios for different load-bearing structures.</p>
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
