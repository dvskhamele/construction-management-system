'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { getAvailableLocales, t as translate } from '../utils/i18n';

interface LanguageContextType {
  locale: string;
  setLocale: (locale: string) => void;
  t: (key: string) => string;
  availableLocales: string[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<string>(() => {
    // Get locale from localStorage or default to 'en'
    if (typeof window !== 'undefined') {
      return localStorage.getItem('locale') || 'en';
    }
    return 'en';
  });

  useEffect(() => {
    // Save locale to localStorage when it changes
    localStorage.setItem('locale', locale);
    
    // Update HTML lang attribute
    document.documentElement.lang = locale;
  }, [locale]);

  const value = {
    locale,
    setLocale,
    t: (key: string) => translate(key as any, locale), // Using 'any' to allow any string key
    availableLocales: getAvailableLocales(),
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};