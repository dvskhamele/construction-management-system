'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';

// Map locale codes to display names
const localeDisplayNames: Record<string, string> = {
  en: 'English',
  hi: 'हिंदी (Hindi)',
  bn: 'বাংলা (Bengali)',
  te: 'తెలుగు (Telugu)',
  mr: 'मराठी (Marathi)',
  ta: 'தமிழ் (Tamil)',
  gu: 'ગુજરાતી (Gujarati)',
  kn: 'ಕನ್ನಡ (Kannada)',
  ml: 'മലയാളം (Malayalam)',
  pa: 'ਪੰਜਾਬੀ (Punjabi)',
  ur: 'اردو (Urdu)',
  or: 'ଓଡ଼ିଆ (Odia)',
  as: 'অসমীয়া (Assamese)',
  ne: 'नेपाली (Nepali)',
  sd: 'سنڌي (Sindhi)',
};

const LanguageSelector = () => {
  const { locale, setLocale, availableLocales } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(e.target.value);
  };

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="language-select" className="text-sm text-slate-600 hidden sm:block">
        Language:
      </label>
      <select
        id="language-select"
        value={locale}
        onChange={handleChange}
        className="px-3 py-1.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-slate-800"
      >
        {availableLocales.map((loc) => (
          <option key={loc} value={loc}>
            {localeDisplayNames[loc] || loc}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;