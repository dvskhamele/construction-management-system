
"use client";
import { useState, useEffect } from "react";
import Head from "next/head";

const ConcreteMixDesignCalculator = () => {
  const [concreteVolume, setConcreteVolume] = useState("");
  const [mixGrade, setMixGrade] = useState("M20");
  const [materials, setMaterials] = useState<{
    cementBags: string;
    sandCubicFeet: string;
    aggregateCubicFeet: string;
  } | null>(null);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Standard mix ratios (Cement:Sand:Aggregate) for common concrete grades
  const mixRatios = {
    "M5": { cement: 1, sand: 5, aggregate: 10 },
    "M7.5": { cement: 1, sand: 4, aggregate: 8 },
    "M10": { cement: 1, sand: 3, aggregate: 6 },
    "M15": { cement: 1, sand: 2, aggregate: 4 },
    "M20": { cement: 1, sand: 1.5, aggregate: 3 },
    "M25": { cement: 1, sand: 1, aggregate: 2 },
  } as const;

  const calculateMaterials = () => {
    const volume = parseFloat(concreteVolume);
    const selectedMix = mixRatios[mixGrade as keyof typeof mixRatios];

    if (volume > 0 && selectedMix) {
      const totalRatio = selectedMix.cement + selectedMix.sand + selectedMix.aggregate;
      const dryVolumeFactor = 1.54; // Factor to convert wet volume to dry volume

      const dryVolume = volume * dryVolumeFactor;

      const cementVolume = (selectedMix.cement / totalRatio) * dryVolume;
      const sandVolume = (selectedMix.sand / totalRatio) * dryVolume;
      const aggregateVolume = (selectedMix.aggregate / totalRatio) * dryVolume;

      const cementBags = cementVolume * 28.8; // Assuming 1 bag = 0.0347 cubic meters
      const sandCubicFeet = sandVolume * 35.3147; // Convert cubic meters to cubic feet
      const aggregateCubicFeet = aggregateVolume * 35.3147; // Convert cubic meters to cubic feet

      const estimatedMaterials = {
        cementBags: cementBags.toFixed(2),
        sandCubicFeet: sandCubicFeet.toFixed(2),
        aggregateCubicFeet: aggregateCubicFeet.toFixed(2),
      };

      setMaterials(estimatedMaterials);
      localStorage.setItem("concreteMixCalculator", JSON.stringify({ concreteVolume, mixGrade, materials: estimatedMaterials }));
      logAnalyticsEvent("Concrete_Mix_Design_Estimation", { volume, mixGrade });
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
    const existingLeadsStr = localStorage.getItem("concrete_mix_leads");
    const existingLeads = existingLeadsStr ? JSON.parse(existingLeadsStr) : [];
    const newLeads = [...existingLeads, { email: leadEmail, timestamp: new Date().toISOString() }];
    localStorage.setItem("concrete_mix_leads", JSON.stringify(newLeads));
  };

  const logAnalyticsEvent = (eventName: string, eventData: any) => {
    const existingEventsStr = localStorage.getItem("analytics_events");
    const existingEvents = existingEventsStr ? JSON.parse(existingEventsStr) : [];
    const newEvent = { name: eventName, data: eventData, timestamp: new Date().toISOString() };
    const newEvents = [...existingEvents, newEvent];
    localStorage.setItem("analytics_events", JSON.stringify(newEvents));
  };

  useEffect(() => {
    const savedDataStr = localStorage.getItem("concreteMixCalculator");
    if (savedDataStr) {
      const savedData = JSON.parse(savedDataStr);
      if (savedData) {
        setConcreteVolume(savedData.concreteVolume);
        setMixGrade(savedData.mixGrade);
        setMaterials(savedData.materials);
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>Concrete Mix Design Calculator | BuildMate</title>
        <meta name="description" content="Estimate cement, sand, and aggregate quantities for various concrete mix designs (M5 to M25) with our free online calculator. Essential for quality concrete production."/>
        <meta property="og:title" content="Concrete Mix Design Calculator | BuildMate" />
        <meta property="og:description" content="A free tool for Indian contractors to accurately estimate materials for concrete mix designs." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://constructioncrm.vercel.app/tools/concrete-mix-design-calculator" />
        <meta property="og:image" content="https://constructioncrm.vercel.app/og-image-concrete-mix-calculator.png" />
      </Head>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Concrete Mix Design Calculator</h1>
          <p className="text-center text-gray-600 mb-8">Estimate cement, sand, and aggregate for your concrete mix designs.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label htmlFor="concreteVolume" className="block text-sm font-medium text-gray-700 mb-1">Concrete Volume (Cubic Meters)</label>
              <input type="number" id="concreteVolume" value={concreteVolume} onChange={(e) => setConcreteVolume(e.target.value)} placeholder="e.g., 1" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div className="form-group">
              <label htmlFor="mixGrade" className="block text-sm font-medium text-gray-700 mb-1">Concrete Mix Grade</label>
              <select id="mixGrade" value={mixGrade} onChange={(e) => setMixGrade(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                {Object.keys(mixRatios).map(grade => <option key={grade} value={grade}>{grade}</option>)}
              </select>
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
                      <p className="text-sm text-gray-500">Cement Bags</p>
                      <p className="text-2xl font-bold text-blue-600">{materials.cementBags}</p>
                  </div>
                  <div className="p-4 bg-white rounded-md shadow-sm">
                      <p className="text-sm text-gray-500">Sand (Cubic Feet)</p>
                      <p className="text-2xl font-bold text-blue-600">{materials.sandCubicFeet}</p>
                  </div>
                  <div className="p-4 bg-white rounded-md shadow-sm">
                      <p className="text-sm text-gray-500">Aggregate (Cubic Feet)</p>
                      <p className="text-2xl font-bold text-blue-600">{materials.aggregateCubicFeet}</p>
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

export default ConcreteMixDesignCalculator;
