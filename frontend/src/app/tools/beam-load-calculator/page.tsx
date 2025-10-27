"use client";
import { useState, useEffect } from "react";
import Head from "next/head";

const BeamLoadCalculator = () => {
  const [span, setSpan] = useState("");
  const [load, setLoad] = useState(""); // Uniformly distributed load in kN/m
  const [bendingMoment, setBendingMoment] = useState<string | null>(null);
  const [shearForce, setShearForce] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const calculateLoads = () => {
    const beamSpan = parseFloat(span);
    const uniformLoad = parseFloat(load);

    if (beamSpan > 0 && uniformLoad > 0) {
      // For a simply supported beam with UDL:
      // Max Bending Moment (M_max) = (w * L^2) / 8
      // Max Shear Force (V_max) = (w * L) / 2
      const calculatedBendingMoment = (uniformLoad * beamSpan * beamSpan) / 8;
      const calculatedShearForce = (uniformLoad * beamSpan) / 2;

      setBendingMoment(calculatedBendingMoment.toFixed(2));
      setShearForce(calculatedShearForce.toFixed(2));
      localStorage.setItem("beamLoadCalculator", JSON.stringify({ span, load, bendingMoment: calculatedBendingMoment.toFixed(2), shearForce: calculatedShearForce.toFixed(2) }));
      logAnalyticsEvent("Beam_Load_Estimation", { beamSpan, uniformLoad });
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
    const existingLeads = JSON.parse(localStorage.getItem("beam_load_leads") || "[]");
    const newLeads = [...existingLeads, { email: leadEmail, timestamp: new Date().toISOString() }];
    localStorage.setItem("beam_load_leads", JSON.stringify(newLeads));
  };

  const logAnalyticsEvent = (eventName: string, eventData: any) => {
    const existingEvents = JSON.parse(localStorage.getItem("analytics_events") || "[]");
    const newEvent = { name: eventName, data: eventData, timestamp: new Date().toISOString() };
    const newEvents = [...existingEvents, newEvent];
    localStorage.setItem("analytics_events", JSON.stringify(newEvents));
  };

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("beamLoadCalculator") || "{}");
    if (savedData) {
      setSpan(savedData.span);
      setLoad(savedData.load);
      setBendingMoment(savedData.bendingMoment);
      setShearForce(savedData.shearForce);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Beam Load Calculator (Simply Supported UDL) | BuildMate</title>
        <meta name="description" content="Estimate maximum bending moment and shear force for simply supported beams under uniformly distributed load with our free online calculator. Essential for structural engineers."/>
        <meta property="og:title" content="Beam Load Calculator | BuildMate" />
        <meta property="og:description" content="A free tool for structural engineers to accurately estimate beam loads." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://constructioncrm.vercel.app/tools/beam-load-calculator" />
        <meta property="og:image" content="https://constructioncrm.vercel.app/og-image-beam-load-calculator.png" />
      </Head>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Beam Load Calculator</h1>
          <p className="text-center text-gray-600 mb-8">Estimate bending moment and shear force for simply supported beams with UDL.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label htmlFor="span" className="block text-sm font-medium text-gray-700 mb-1">Beam Span (meters)</label>
              <input type="number" id="span" value={span} onChange={(e) => setSpan(e.target.value)} placeholder="e.g., 5" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div className="form-group">
              <label htmlFor="load" className="block text-sm font-medium text-gray-700 mb-1">Uniformly Distributed Load (kN/m)</label>
              <input type="number" id="load" value={load} onChange={(e) => setLoad(e.target.value)} placeholder="e.g., 10" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
            </div>
          </div>

          <div className="text-center mt-8">
            <button onClick={calculateLoads} className="w-full md:w-auto bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition-colors">Calculate</button>
          </div>

          {bendingMoment && shearForce && (
            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-800 text-center">Estimated Loads</h2>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                  <div className="p-4 bg-white rounded-md shadow-sm">
                      <p className="text-sm text-gray-500">Max Bending Moment (kNm)</p>
                      <p className="text-2xl font-bold text-blue-600">{bendingMoment}</p>
                  </div>
                  <div className="p-4 bg-white rounded-md shadow-sm">
                      <p className="text-sm text-gray-500">Max Shear Force (kN)</p>
                      <p className="text-2xl font-bold text-blue-600">{shearForce}</p>
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

export default BeamLoadCalculator;