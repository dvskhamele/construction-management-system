
"use client";
import { useState, useEffect } from "react";
import Head from "next/head";

const ConcreteSlabVolumeCalculator = () => {
  const [slabType, setSlabType] = useState("rectangular");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [diameter, setDiameter] = useState("");
  const [thickness, setThickness] = useState("");
  const [volumeCubicMeters, setVolumeCubicMeters] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const calculateVolume = () => {
    let calculatedVolume = 0;

    if (slabType === "rectangular") {
      const rectLength = parseFloat(length);
      const rectWidth = parseFloat(width);
      const rectThickness = parseFloat(thickness) / 1000; // Convert mm to meters
      if (rectLength > 0 && rectWidth > 0 && rectThickness > 0) {
        calculatedVolume = rectLength * rectWidth * rectThickness;
      }
    } else if (slabType === "circular") {
      const circDiameter = parseFloat(diameter);
      const circThickness = parseFloat(thickness) / 1000; // Convert mm to meters
      if (circDiameter > 0 && circThickness > 0) {
        const radius = circDiameter / 2;
        calculatedVolume = Math.PI * radius * radius * circThickness;
      }
    }

    if (calculatedVolume > 0) {
      setVolumeCubicMeters(calculatedVolume.toFixed(2));
      localStorage.setItem("concreteSlabVolumeCalculator", JSON.stringify({ slabType, length, width, diameter, thickness, volumeCubicMeters: calculatedVolume.toFixed(2) }));
      logAnalyticsEvent("Concrete_Slab_Volume_Estimation", { slabType, length, width, diameter, thickness });
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
    const existingLeadsStr = localStorage.getItem("concrete_slab_leads");
    const existingLeads = existingLeadsStr ? JSON.parse(existingLeadsStr) : [];
    const newLeads = [...existingLeads, { email: leadEmail, timestamp: new Date().toISOString() }];
    localStorage.setItem("concrete_slab_leads", JSON.stringify(newLeads));
  };

  const logAnalyticsEvent = (eventName: string, eventData: any) => {
    const existingEventsStr = localStorage.getItem("analytics_events");
    const existingEvents = existingEventsStr ? JSON.parse(existingEventsStr) : [];
    const newEvent = { name: eventName, data: eventData, timestamp: new Date().toISOString() };
    const newEvents = [...existingEvents, newEvent];
    localStorage.setItem("analytics_events", JSON.stringify(newEvents));
  };

  useEffect(() => {
    const savedDataStr = localStorage.getItem("concreteSlabVolumeCalculator");
    if (savedDataStr) {
      const savedData = JSON.parse(savedDataStr);
      if (savedData) {
        setSlabType(savedData.slabType);
        setLength(savedData.length);
        setWidth(savedData.width);
        setDiameter(savedData.diameter);
        setThickness(savedData.thickness);
        setVolumeCubicMeters(savedData.volumeCubicMeters);
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>Concrete Slab Volume Calculator | BuildMate</title>
        <meta name="description" content="Estimate the volume of concrete required for rectangular and circular slabs with our free online calculator. Essential for accurate concrete ordering."/>
        <meta property="og:title" content="Concrete Slab Volume Calculator | BuildMate" />
        <meta property="og:description" content="A free tool for Indian contractors to accurately estimate concrete slab volumes." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://constructioncrm.vercel.app/tools/concrete-slab-volume-calculator" />
        <meta property="og:image" content="https://constructioncrm.vercel.app/og-image-concrete-slab-calculator.png" />
      </Head>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Concrete Slab Volume Calculator</h1>
          <p className="text-center text-gray-600 mb-8">Estimate the volume of concrete required for your slabs.</p>

          <div className="grid grid-cols-1 gap-6">
            <div className="form-group">
              <label htmlFor="slabType" className="block text-sm font-medium text-gray-700 mb-1">Slab Type</label>
              <select id="slabType" value={slabType} onChange={(e) => setSlabType(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option value="rectangular">Rectangular</option>
                <option value="circular">Circular</option>
              </select>
            </div>

            {slabType === "rectangular" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-1">Length (meters)</label>
                  <input type="number" id="length" value={length} onChange={(e) => setLength(e.target.value)} placeholder="e.g., 5" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <div className="form-group">
                  <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-1">Width (meters)</label>
                  <input type="number" id="width" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="e.g., 4" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
                </div>
              </div>
            )}

            {slabType === "circular" && (
              <div className="form-group">
                <label htmlFor="diameter" className="block text-sm font-medium text-gray-700 mb-1">Diameter (meters)</label>
                <input type="number" id="diameter" value={diameter} onChange={(e) => setDiameter(e.target.value)} placeholder="e.g., 3" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="thickness" className="block text-sm font-medium text-gray-700 mb-1">Thickness (mm)</label>
              <input type="number" id="thickness" value={thickness} onChange={(e) => setThickness(e.target.value)} placeholder="e.g., 150" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
            </div>
          </div>

          <div className="text-center mt-8">
            <button onClick={calculateVolume} className="w-full md:w-auto bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition-colors">Calculate</button>
          </div>

          {volumeCubicMeters && (
            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg text-center">
              <h2 className="text-2xl font-semibold text-gray-800">Estimated Volume</h2>
              <p className="text-4xl font-bold text-blue-600 mt-4">{volumeCubicMeters} Cubic Meters</p>
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

export default ConcreteSlabVolumeCalculator;
