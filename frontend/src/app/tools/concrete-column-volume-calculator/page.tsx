
"use client";
import { useState, useEffect } from "react";
import Head from "next/head";

const ConcreteColumnVolumeCalculator = () => {
  const [columnType, setColumnType] = useState("rectangular");
  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [diameter, setDiameter] = useState("");
  const [height, setHeight] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [totalVolumeCubicMeters, setTotalVolumeCubicMeters] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const calculateVolume = () => {
    let singleColumnVolume = 0;
    const numColumns = parseFloat(quantity);

    if (columnType === "rectangular") {
      const rectLength = parseFloat(length);
      const rectWidth = parseFloat(width);
      const rectHeight = parseFloat(height);
      if (rectLength > 0 && rectWidth > 0 && rectHeight > 0) {
        singleColumnVolume = rectLength * rectWidth * rectHeight;
      }
    } else if (columnType === "circular") {
      const circDiameter = parseFloat(diameter);
      const circHeight = parseFloat(height);
      if (circDiameter > 0 && circHeight > 0) {
        const radius = circDiameter / 2;
        singleColumnVolume = Math.PI * radius * radius * circHeight;
      }
    }

    if (singleColumnVolume > 0 && numColumns > 0) {
      const totalVolume = singleColumnVolume * numColumns;
      setTotalVolumeCubicMeters(totalVolume.toFixed(2));
      localStorage.setItem("concreteColumnCalculator", JSON.stringify({ columnType, length, width, diameter, height, quantity, totalVolumeCubicMeters: totalVolume.toFixed(2) }));
      logAnalyticsEvent("Concrete_Column_Volume_Estimation", { columnType, length, width, diameter, height, quantity });
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
    const existingLeadsStr = localStorage.getItem("concrete_column_leads");
    const existingLeads = existingLeadsStr ? JSON.parse(existingLeadsStr) : [];
    const newLeads = [...existingLeads, { email: leadEmail, timestamp: new Date().toISOString() }];
    localStorage.setItem("concrete_column_leads", JSON.stringify(newLeads));
  };

  const logAnalyticsEvent = (eventName: string, eventData: any) => {
    const existingEventsStr = localStorage.getItem("analytics_events");
    const existingEvents = existingEventsStr ? JSON.parse(existingEventsStr) : [];
    const newEvent = { name: eventName, data: eventData, timestamp: new Date().toISOString() };
    const newEvents = [...existingEvents, newEvent];
    localStorage.setItem("analytics_events", JSON.stringify(newEvents));
  };

  useEffect(() => {
    const savedDataStr = localStorage.getItem("concreteColumnCalculator");
    if (savedDataStr) {
      const savedData = JSON.parse(savedDataStr);
      if (savedData) {
        setColumnType(savedData.columnType);
        setLength(savedData.length);
        setWidth(savedData.width);
        setDiameter(savedData.diameter);
        setHeight(savedData.height);
        setQuantity(savedData.quantity);
        setTotalVolumeCubicMeters(savedData.totalVolumeCubicMeters);
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>Concrete Column Volume Calculator | BuildMate</title>
        <meta name="description" content="Estimate the volume of concrete required for rectangular and circular columns with our free online calculator. Essential for accurate concrete ordering."/>
        <meta property="og:title" content="Concrete Column Volume Calculator | BuildMate" />
        <meta property="og:description" content="A free tool for Indian contractors to accurately estimate concrete column volumes." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://constructioncrm.vercel.app/tools/concrete-column-volume-calculator" />
        <meta property="og:image" content="https://constructioncrm.vercel.app/og-image-concrete-column-calculator.png" />
      </Head>
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Concrete Column Volume Calculator</h1>
          <p className="text-center text-gray-600 mb-8">Estimate the volume of concrete required for your columns.</p>

          <div className="grid grid-cols-1 gap-6">
            <div className="form-group">
              <label htmlFor="columnType" className="block text-sm font-medium text-gray-700 mb-1">Column Type</label>
              <select id="columnType" value={columnType} onChange={(e) => setColumnType(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option value="rectangular">Rectangular</option>
                <option value="circular">Circular</option>
              </select>
            </div>

            {columnType === "rectangular" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label htmlFor="length" className="block text-sm font-medium text-gray-700 mb-1">Length (meters)</label>
                  <input type="number" id="length" value={length} onChange={(e) => setLength(e.target.value)} placeholder="e.g., 0.3" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <div className="form-group">
                  <label htmlFor="width" className="block text-sm font-medium text-gray-700 mb-1">Width (meters)</label>
                  <input type="number" id="width" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="e.g., 0.3" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
                </div>
              </div>
            )}

            {columnType === "circular" && (
              <div className="form-group">
                <label htmlFor="diameter" className="block text-sm font-medium text-gray-700 mb-1">Diameter (meters)</label>
                <input type="number" id="diameter" value={diameter} onChange={(e) => setDiameter(e.target.value)} placeholder="e.g., 0.4" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="height" className="block text-sm font-medium text-gray-700 mb-1">Height (meters)</label>
              <input type="number" id="height" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g., 3" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
            </div>
            <div className="form-group">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity of Columns</label>
              <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="e.g., 10" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
            </div>
          </div>

          <div className="text-center mt-8">
            <button onClick={calculateVolume} className="w-full md:w-auto bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition-colors">Calculate</button>
          </div>

          {totalVolumeCubicMeters && (
            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg text-center">
              <h2 className="text-2xl font-semibold text-gray-800">Estimated Total Volume</h2>
              <p className="text-4xl font-bold text-blue-600 mt-4">{totalVolumeCubicMeters} Cubic Meters</p>
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

export default ConcreteColumnVolumeCalculator;
