
"use client";
import { useState, useEffect } from "react";
import Head from "next/head";

const BrickBlockCalculator = () => {
  const [wallArea, setWallArea] = useState("");
  const [brickLength, setBrickLength] = useState("190"); // Standard brick size in mm
  const [brickWidth, setBrickWidth] = useState("90");
  const [brickHeight, setBrickHeight] = useState("90");
  const [mortarThickness, setMortarThickness] = useState("10"); // Default 10mm mortar
  const [mixRatioCement, setMixRatioCement] = useState("1");
  const [mixRatioSand, setMixRatioSand] = useState("4");
  const [wastage, setWastage] = useState("5"); // Default 5% wastage
  const [materials, setMaterials] = useState<{
    bricks: number;
    cementBags: string;
    sandCubicFeet: string;
  } | null>(null);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const calculateMaterials = () => {
    const area = parseFloat(wallArea);
    const bLength = parseFloat(brickLength) / 1000; // Convert mm to meters
    const bWidth = parseFloat(brickWidth) / 1000; // Convert mm to meters
    const bHeight = parseFloat(brickHeight) / 1000; // Convert mm to meters
    const mThickness = parseFloat(mortarThickness) / 1000; // Convert mm to meters
    const cementRatio = parseFloat(mixRatioCement);
    const sandRatio = parseFloat(mixRatioSand);
    const wastagePercent = parseFloat(wastage);

    if (area > 0 && bLength > 0 && bHeight > 0 && mThickness >= 0 && cementRatio > 0 && sandRatio > 0) {
      // Calculate number of bricks
      const brickWithMortarLength = bLength + mThickness;
      const brickWithMortarHeight = bHeight + mThickness;
      const bricksPerSqMeter = 1 / (brickWithMortarLength * brickWithMortarHeight);
      let numberOfBricks = area * bricksPerSqMeter;
      numberOfBricks += numberOfBricks * (wastagePercent / 100);

      // Calculate mortar volume
      const volumeOfWall = area * (bWidth + mThickness); // Assuming wall thickness is brick width + mortar
      const volumeOfBricks = numberOfBricks * bLength * bWidth * bHeight;
      const wetMortarVolume = volumeOfWall - volumeOfBricks;
      const dryMortarVolume = wetMortarVolume * 1.33; // Increase by 33% for dry volume

      const totalRatio = cementRatio + sandRatio;
      const cementVolume = (cementRatio / totalRatio) * dryMortarVolume;
      const sandVolume = (sandRatio / totalRatio) * dryMortarVolume;

      const cementBags = cementVolume * 28.8; // Assuming 1 bag = 0.0347 cubic meters
      const sandCubicFeet = sandVolume * 35.3147; // Convert cubic meters to cubic feet

      const estimatedMaterials = {
        bricks: Math.ceil(numberOfBricks),
        cementBags: cementBags.toFixed(2),
        sandCubicFeet: sandCubicFeet.toFixed(2),
      };

      setMaterials(estimatedMaterials);
      localStorage.setItem("brickBlockCalculator", JSON.stringify({ wallArea, brickLength, brickWidth, brickHeight, mortarThickness, mixRatioCement, mixRatioSand, wastage, materials: estimatedMaterials }));
      logAnalyticsEvent("Brick_Block_Estimation", { area, bLength, bWidth, bHeight, mThickness, cementRatio, sandRatio, wastagePercent });
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log("Lead captured:", email);
      saveLead(email);
      setIsSubmitted(true);
      setEmail("");
    }
  };

  const saveLead = (leadEmail: string) => {
    const existingLeadsStr = localStorage.getItem("brick_block_leads");
    const existingLeads = existingLeadsStr ? JSON.parse(existingLeadsStr) : [];
    const newLeads = [...existingLeads, { email: leadEmail, timestamp: new Date().toISOString() }];
    localStorage.setItem("brick_block_leads", JSON.stringify(newLeads));
  };

  const logAnalyticsEvent = (eventName: string, eventData: any) => {
    const existingEventsStr = localStorage.getItem("analytics_events");
    const existingEvents = existingEventsStr ? JSON.parse(existingEventsStr) : [];
    const newEvent = { name: eventName, data: eventData, timestamp: new Date().toISOString() };
    const newEvents = [...existingEvents, newEvent];
    localStorage.setItem("analytics_events", JSON.stringify(newEvents));
  };

  useEffect(() => {
    const savedDataStr = localStorage.getItem("brickBlockCalculator");
    if (savedDataStr) {
      const savedData = JSON.parse(savedDataStr);
      if (savedData) {
        setWallArea(savedData.wallArea);
        setBrickLength(savedData.brickLength);
        setBrickWidth(savedData.brickWidth);
        setBrickHeight(savedData.brickHeight);
        setMortarThickness(savedData.mortarThickness);
        setMixRatioCement(savedData.mixRatioCement);
        setMixRatioSand(savedData.mixRatioSand);
        setWastage(savedData.wastage);
        setMaterials(savedData.materials);
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>Brick/Block Calculator & Mortar Estimator | BuildMate</title>
        <meta name="description" content="Estimate the number of bricks/blocks, cement, and sand for mortar with our free online calculator. Essential for Indian masonry projects."/>
        <meta property="og:title" content="Brick/Block Calculator & Mortar Estimator | BuildMate" />
        <meta property="og:description" content="A free tool for Indian contractors to accurately estimate bricks/blocks and mortar materials." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://constructioncrm.vercel.app/tools/brick-block-calculator" />
        <meta property="og:image" content="https://constructioncrm.vercel.app/og-image-brick-block-calculator.png" />
      </Head>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Brick/Block Calculator & Mortar Estimator</h1>
          <p className="text-center text-gray-600 mb-8">Estimate bricks/blocks, cement, and sand for your masonry work.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label htmlFor="wallArea" className="block text-sm font-medium text-gray-700 mb-1">Wall Area (sq. m)</label>
              <input type="number" id="wallArea" value={wallArea} onChange={(e) => setWallArea(e.target.value)} placeholder="e.g., 100" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div className="form-group">
              <label htmlFor="brickLength" className="block text-sm font-medium text-gray-700 mb-1">Brick/Block Length (mm)</label>
              <input type="number" id="brickLength" value={brickLength} onChange={(e) => setBrickLength(e.target.value)} placeholder="e.g., 190" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div className="form-group">
              <label htmlFor="brickWidth" className="block text-sm font-medium text-gray-700 mb-1">Brick/Block Width (mm)</label>
              <input type="number" id="brickWidth" value={brickWidth} onChange={(e) => setBrickWidth(e.target.value)} placeholder="e.g., 90" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div className="form-group">
              <label htmlFor="brickHeight" className="block text-sm font-medium text-gray-700 mb-1">Brick/Block Height (mm)</label>
              <input type="number" id="brickHeight" value={brickHeight} onChange={(e) => setBrickHeight(e.target.value)} placeholder="e.g., 90" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div className="form-group">
              <label htmlFor="mortarThickness" className="block text-sm font-medium text-gray-700 mb-1">Mortar Thickness (mm)</label>
              <input type="number" id="mortarThickness" value={mortarThickness} onChange={(e) => setMortarThickness(e.target.value)} placeholder="e.g., 10" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div className="form-group">
              <label htmlFor="mixRatioCement" className="block text-sm font-medium text-gray-700 mb-1">Mortar Mix Ratio (Cement)</label>
              <input type="number" id="mixRatioCement" value={mixRatioCement} onChange={(e) => setMixRatioCement(e.target.value)} placeholder="e.g., 1" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div className="form-group">
              <label htmlFor="mixRatioSand" className="block text-sm font-medium text-gray-700 mb-1">Mortar Mix Ratio (Sand)</label>
              <input type="number" id="mixRatioSand" value={mixRatioSand} onChange={(e) => setMixRatioSand(e.target.value)} placeholder="e.g., 4" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div className="form-group">
              <label htmlFor="wastage" className="block text-sm font-medium text-gray-700 mb-1">Wastage (%)</label>
              <input type="number" id="wastage" value={wastage} onChange={(e) => setWastage(e.target.value)} placeholder="e.g., 5" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
            </div>
          </div>

          <div className="text-center mt-8">
            <button onClick={calculateMaterials} className="w-full md:w-auto bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition-colors">Calculate</button>
          </div>

          {materials && (
            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-800 text-center">Estimated Materials</h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-white rounded-md shadow-sm">
                      <p className="text-sm text-gray-500">Bricks/Blocks</p>
                      <p className="text-2xl font-bold text-blue-600">{materials.bricks}</p>
                  </div>
                  <div className="p-4 bg-white rounded-md shadow-sm">
                      <p className="text-sm text-gray-500">Cement Bags</p>
                      <p className="text-2xl font-bold text-blue-600">{materials.cementBags}</p>
                  </div>
                  <div className="p-4 bg-white rounded-md shadow-sm">
                      <p className="text-sm text-gray-500">Sand (Cubic Feet)</p>
                      <p className="text-2xl font-bold text-blue-600">{materials.sandCubicFeet}</p>
                  </div>
              </div>
            </div>
          )}

          <div className="mt-10 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Get More Tools & Insights</h3>
            <p className="text-gray-600 mb-6">Join our newsletter for more free tools, industry news, and tips for construction professionals in India.</p>
            {isSubmitted ? (
              <p className="text-green-600 font-semibold">Thank you for subscribing!</p>
            ) : (
              <form onSubmit={handleEmailSubmit} className="flex flex-col md:flex-row justify-center items-center gap-4">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
                <button type="submit" className="w-full md:w-auto bg-green-600 text-white font-bold py-2 px-6 rounded-md hover:bg-green-700 transition-colors">Subscribe</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BrickBlockCalculator;
