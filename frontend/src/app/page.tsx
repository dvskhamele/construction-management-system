'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('template')

  const features = [
    {
      title: "QR Code Tracking",
      description: "Unique QR codes attached to every area ensures authenticity of photos and provides documents required at site.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
        </svg>
      )
    },
    {
      title: "Auto Scheduling",
      description: "Auto calculating the new schedule of a project with every task and start/finish status.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Project Gallery",
      description: "All site photos auto-stored which are automatically sorted area wise, date wise etc.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Field-to-Office Connect",
      description: "QR based mobile and web application connect field and office team seamlessly.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      )
    },
    {
      title: "Triggers & Notifications",
      description: "Auto generated whatsapp and email notifications. Prepones your revenues linked with construction.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      )
    },
    {
      title: "Quality Management",
      description: "Records every work done at site along with the date, person responsible and photos of every task done at site.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )
    }
  ]

  const pricingPlans = [
    {
      id: 'basic',
      name: 'BuildMate Basic',
      price: '₹15,000',
      description: 'Essential construction management features for small projects',
      features: [
        'QR-based site tracking',
        'Basic project scheduling',
        'Photo gallery with date sorting',
        'Mobile-responsive interface',
        'Email notifications',
        'Up to 3 project sites',
        '5GB storage'
      ],
      cta: 'Start Free Trial'
    },
    {
      id: 'professional',
      name: 'BuildMate Professional',
      price: '₹35,000',
      description: 'Comprehensive solution for medium-sized construction businesses',
      features: [
        'All Basic features',
        'Advanced scheduling with auto-calculation',
        'WhatsApp notifications',
        'QR document management',
        'Triggers for revenue generation',
        'Up to 10 project sites',
        '20GB storage',
        'Priority support'
      ],
      cta: 'Start 14-Day Trial',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'BuildMate Enterprise',
      price: '₹65,000',
      description: 'Complete construction process automation platform',
      features: [
        'All Professional features',
        'Unlimited project sites',
        'API access for custom integrations',
        'MSP, Excel, Primavera compatibility',
        'Advanced analytics & reporting',
        'Dedicated account manager',
        'Custom training sessions',
        'White-label options',
        '100GB storage'
      ],
      cta: 'Contact Sales'
    }
  ]

  const benefits = [
    "Saves 2-3 manhours everyday for site team members",
    "Keeps the project completion date visible at every minute",
    "Enhance your project quality with comprehensive tracking",
    "Reduces project delays by 40% with proactive scheduling",
    "Provides 100% transparency between field and office teams",
    "Affordable rates at par with industry standard"
  ]

  const useCases = [
    "Construction companies seeking centralized project management",
    "Real estate developers managing multiple sites",
    "Contractors wanting to modernize operations",
    "Infrastructure projects requiring detailed tracking",
    "Building firms with diverse construction needs",
    "Project managers needing real-time updates"
  ]

  const technologies = [
    { name: "Next.js 14+", category: "Frontend Framework" },
    { name: "TypeScript", category: "Language" },
    { name: "Tailwind CSS", category: "Styling" },
    { name: "React", category: "UI Library" },
    { name: "Node.js", category: "Backend Runtime" },
    { name: "Express", category: "Backend Framework" },
    { name: "MongoDB", category: "Database" },
    { name: "QR Code API", category: "Tracking Technology" },
    { name: "Vercel", category: "Deployment" },
    { name: "Recharts", category: "Data Visualization" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 overflow-x-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6 flex-wrap">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.617 1.842 3.683a1 1 0 01-.213 1.106l-1.317 1.318a1 1 0 01-.944.29l-1.817-.545L10 13l-3.78 1.26a1 1 0 01-.945-.29l-1.317-1.317a1 1 0 01-.213-1.106l1.842-3.683-1.233-.617a1 1 0 01.894-1.789l1.599.799L9 5.405V3a1 1 0 011-1zm0 16a3 3 0 100-6 3 3 0 000 6z" />
                  </svg>
                </div>
                <span className="ml-2 text-xl font-bold text-slate-800">BuildMate</span>
              </div>
            </div>
            <nav className="hidden md:flex space-x-10 flex-wrap">
              <a href="#features" className="text-slate-600 hover:text-teal-600 font-medium">Features</a>
              <a href="#pricing" className="text-slate-600 hover:text-teal-600 font-medium">Pricing</a>
              <a href="#benefits" className="text-slate-600 hover:text-teal-600 font-medium">Benefits</a>
              <a href="#tech" className="text-slate-600 hover:text-teal-600 font-medium">Technology</a>
            </nav>
            <div className="flex items-center space-x-4 flex-wrap">
              <button 
                onClick={() => router.push('/login')}
                className="text-slate-600 hover:text-teal-600 font-medium"
              >
                Sign In
              </button>
              <button 
                onClick={() => router.push('/dashboard')}
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300"
              >
                Live Demo
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6">
              BuildMate: Construction Process Automation
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10">
              True construction process automation platform that helps builders plan, deploy, track & manage end to end project development.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => router.push('/dashboard')}
                className="bg-gradient-to-r from-teal-500 to-teal-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:from-teal-600 hover:to-teal-700 transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Build Your Project
              </button>
              <button 
                onClick={() => setIsPreviewOpen(true)}
                className="bg-white text-teal-600 border border-teal-500 px-8 py-4 rounded-lg font-medium text-lg hover:bg-slate-50 transition duration-300"
              >
                Preview Features
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Design Illustration Section */}
      <section id="design" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Design Illustration</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our unique approach to construction management through innovative tools
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Construction Process Automation</h3>
                <p className="text-slate-600 mb-4">
                  Our platform automates the entire construction process from planning to project completion. 
                  With BuildMate, you can manage every aspect of your project from a single dashboard.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Real-time project tracking</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Automated scheduling and rescheduling</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>QR code-based verification</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Field-Office Integration</h3>
                <p className="text-slate-600 mb-4">
                  Connect your field teams with office management through our seamless platform integration.
                  Everyone has access to the same information in real-time.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Mobile and web accessibility</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Automated notifications</span>
                  </li>
                  <li className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Document management system</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center">
                  <div className="w-64 h-64 bg-gradient-to-br from-teal-200 to-teal-300 rounded-full flex items-center justify-center">
                    <div className="w-48 h-48 bg-gradient-to-br from-teal-300 to-teal-400 rounded-full flex items-center justify-center">
                      <div className="text-center p-4">
                        <div className="bg-white rounded-lg p-4 shadow-lg mb-4">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-teal-600 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-bold text-white">BuildMate Process</h3>
                        <p className="text-white text-sm mt-2">Automated Construction Management</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -top-4 -right-4 bg-white rounded-lg shadow-lg p-4 w-40">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium">Active</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">Field Teams Connected</p>
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow-lg p-4 w-40">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm font-medium">Synced</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">Real-time Updates</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">BuildMate Features</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need to efficiently manage your construction projects in one place
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-slate-50 rounded-2xl p-6 shadow-md hover:shadow-lg transition duration-300 border border-slate-100">
                <div className="w-12 h-12 rounded-lg bg-teal-100 text-teal-600 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Key Benefits</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Transform your construction operations with measurable improvements
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <p className="ml-3 text-lg text-slate-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Perfect For</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our system adapts to various construction environments
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-6 shadow-sm border border-slate-100">
                <h3 className="text-lg font-semibold text-slate-800">{useCase}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Build Your Project Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Build Your Project on Time Every Time</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
              Our proven 4-step process helps you execute construction projects efficiently and on schedule.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200 transform transition duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-100 to-teal-200 text-teal-600 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">01</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Know Your Daily Schedule</h3>
                <p className="text-slate-600">Work widget updates engineers, supers and foreman with daily schedule to keep everyone aligned on tasks and deadlines.</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200 transform transition duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-100 to-teal-200 text-teal-600 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">02</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Scan QR Code</h3>
                <p className="text-slate-600">Scan QR code at the job site to know the daily activity with timelines and access required documents instantly.</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200 transform transition duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-100 to-teal-200 text-teal-600 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">03</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Click Picture</h3>
                <p className="text-slate-600">Capture the image of the jobsite upon completion of the task for authentic record keeping and progress tracking.</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200 transform transition duration-300 hover:-translate-y-2">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-100 to-teal-200 text-teal-600 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">04</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Mark Start/FINISH/WIP</h3>
                <p className="text-slate-600">Follow step-wise instruction and mark status while beginning the task, during work-in-progress, and after completion.</p>
              </div>
            </div>
            
            <div className="mt-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-8 text-white max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Ready to Build Your Project?</h3>
              <p className="text-teal-100 mb-6">
                Join hundreds of construction companies already using BuildMate to deliver projects on time and enhance quality.
              </p>
              <button 
                onClick={() => router.push('/dashboard')}
                className="bg-white text-teal-600 px-8 py-4 rounded-lg font-medium text-lg hover:bg-slate-100 transition duration-300 shadow-lg"
              >
                Start Building Today
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Compatible Tools Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Compatible with Your Existing Tools</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Works seamlessly with MSP, Excel, Google sheets, Primavera and other tools you already use
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-slate-100 rounded-lg px-6 py-4 flex items-center">
              <div className="bg-green-500 w-3 h-3 rounded-full mr-3"></div>
              <span className="font-medium text-slate-700">Microsoft Project (MSP)</span>
            </div>
            <div className="bg-slate-100 rounded-lg px-6 py-4 flex items-center">
              <div className="bg-green-500 w-3 h-3 rounded-full mr-3"></div>
              <span className="font-medium text-slate-700">Excel/Google Sheets</span>
            </div>
            <div className="bg-slate-100 rounded-lg px-6 py-4 flex items-center">
              <div className="bg-green-500 w-3 h-3 rounded-full mr-3"></div>
              <span className="font-medium text-slate-700">Primavera</span>
            </div>
            <div className="bg-slate-100 rounded-lg px-6 py-4 flex items-center">
              <div className="bg-green-500 w-3 h-3 rounded-full mr-3"></div>
              <span className="font-medium text-slate-700">AutoCAD</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Choose the plan that fits your construction business needs and budget
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan) => (
              <div 
                key={plan.id} 
                className={`rounded-2xl shadow-lg overflow-hidden ${
                  plan.popular 
                    ? 'ring-2 ring-teal-500 transform scale-105 z-10 bg-white' 
                    : 'bg-white'
                }`}
              >
                {plan.popular && (
                  <div className="bg-teal-500 text-white text-center py-2">
                    <span className="text-sm font-semibold">MOST POPULAR</span>
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-extrabold text-slate-900">{plan.price}</span>
                    <span className="text-slate-600">/year</span>
                  </div>
                  <p className="text-slate-600 mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-2 text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => {
                      setSelectedPlan(plan.id)
                      if (plan.id === 'basic') {
                        // Handle basic plan
                        alert(`Getting started with ${plan.name}`)
                      } else {
                        // Handle other plans
                        alert(`${plan.name} trial would be implemented here`)
                      }
                    }}
                    className={`w-full py-3 px-4 rounded-lg font-medium transition duration-300 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-teal-500 to-teal-600 text-white hover:from-teal-600 hover:to-teal-700 shadow-md'
                        : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section id="tech" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Modern Technology Stack</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Built with cutting-edge technologies for optimal performance
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-slate-50 rounded-lg p-4 text-center hover:bg-slate-100 transition duration-300">
                <h3 className="font-semibold text-slate-800">{tech.name}</h3>
                <p className="text-sm text-slate-600 mt-1">{tech.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-teal-500 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Construction Management?</h2>
          <p className="text-xl text-teal-100 max-w-3xl mx-auto mb-10">
            Join hundreds of construction companies already using BuildMate to streamline their operations and improve project delivery.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => router.push('/dashboard')}
              className="bg-white text-teal-600 px-8 py-4 rounded-lg font-medium text-lg hover:bg-slate-100 transition duration-300 shadow-lg"
            >
              View Live Demo
            </button>
            <button 
              onClick={() => setIsPreviewOpen(true)}
              className="bg-teal-700 text-white border border-teal-300 px-8 py-4 rounded-lg font-medium text-lg hover:bg-teal-800 transition duration-300"
            >
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>

      {/* FAQS Section */}
      <section id="faqs" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Construction people all over the world are happily using BuildMate. Here are answers to common questions.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">What is BuildMate and how does it help in construction management?</h3>
              <p className="text-slate-600">BuildMate is a true construction process automation platform that helps builders plan, deploy, track & manage end to end project development. Our qr based mobile and web application connect field and office team, giving everyone on the jobsite tools to execute day to day tasks.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">How does the QR tracking system work?</h3>
              <p className="text-slate-600">QR code attached to every area ensures authenticity of the photos and also provides documents required at site. This unique site management software gives everyone on the jobsite tools to execute day to day tasks while maintaining authenticity of all records.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">What compatibility does BuildMate offer with existing tools?</h3>
              <p className="text-slate-600">BuildMate is compatible with all previous tools like MSP, Excel, Google sheets, Primavera etc. This allows for smooth integration with your existing workflows without disrupting your current processes.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">How does auto-scheduling work?</h3>
              <p className="text-slate-600">BuildMate auto calculates the new schedule of a project with every task and start/finish status. This ensures that your project timeline remains accurate and up-to-date based on the actual progress on site.</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-slate-800 mb-2">How much time can BuildMate save for my team?</h3>
              <p className="text-slate-600">BuildMate saves 2-3 manhours everyday for site team members which were being utilized for emails/report making/rescheduling and other mundane works. This allows your team to focus on actual construction activities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Contact Us</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Have questions? Get in touch with our team to learn how BuildMate can transform your construction projects.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-800 mb-4">BuildMate Solutions Private Limited</h3>
                <div className="space-y-3 text-slate-600">
                  <p>LA LAGUNE HOUSE NO-1702 BLOCK-D, SECTOR-54, GOLF COURSE ROAD, GURGAON, Gurgaon, Haryana, 122002</p>
                  <p>Phone: +91 98765 43210</p>
                  <p>Email: support@buildmate.app</p>
                  <p>Website: www.buildmate.app</p>
                </div>
                
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-slate-800 mb-3">Our Values</h4>
                  <ul className="space-y-2 text-slate-600">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Affordable: We promise to offer you the best rate we can - at par with the industry standard</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Quality: Enhance your project quality with comprehensive tracking</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Reliability: Keeps the completion date of the project visible at every minute</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Your Name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                    <input 
                      type="text" 
                      id="company" 
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Company Name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                    <textarea 
                      id="message" 
                      rows={4}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:from-teal-600 hover:to-teal-700 transition duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.617 1.842 3.683a1 1 0 01-.213 1.106l-1.317 1.318a1 1 0 01-.944.29l-1.817-.545L10 13l-3.78 1.26a1 1 0 01-.945-.29l-1.317-1.317a1 1 0 01-.213-1.106l1.842-3.683-1.233-.617a1 1 0 01.894-1.789l1.599.799L9 5.405V3a1 1 0 011-1zm0 16a3 3 0 100-6 3 3 0 000 6z" />
                  </svg>
                </div>
                <span className="ml-2 text-xl font-bold text-white">BuildMate</span>
              </div>
              <p className="mt-4 text-sm">
                True construction process automation platform.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Templates</a></li>
                <li><a href="#" className="hover:text-white transition">Releases</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#about" className="hover:text-white transition">About</a></li>
                <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
                <li><a href="#faqs" className="hover:text-white transition">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition">Status</a></li>
                <li><a href="#" className="hover:text-white transition">Help Center</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-sm text-center">
            <p>© 2025 BuildMate. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto max-w-[calc(100vw-2rem)]">
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center sticky top-0 bg-white">
              <h3 className="text-lg font-semibold text-slate-800">BuildMate Feature Preview</h3>
              <button 
                onClick={() => setIsPreviewOpen(false)}
                className="text-slate-400 hover:text-slate-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="aspect-video bg-slate-100 rounded-lg mb-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-teal-500 to-teal-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-semibold text-slate-800 mb-2">Interactive Construction Dashboard</h4>
                  <p className="text-slate-600 max-w-md mx-auto">
                    Experience the full BuildMate dashboard with real-time project analytics, QR tracking, 
                    and progress monitoring.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="text-3xl font-bold text-teal-600 mb-1">95%</div>
                  <div className="text-slate-600">Project Completion Rate</div>
                </div>
                <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="text-3xl font-bold text-teal-600 mb-1">40%</div>
                  <div className="text-slate-600">Reduction in Delays</div>
                </div>
                <div className="bg-gradient-to-br from-white to-slate-50 rounded-xl p-4 border border-slate-100">
                  <div className="text-3xl font-bold text-teal-600 mb-1">2x</div>
                  <div className="text-slate-600">Team Productivity</div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-slate-800 mb-4">Key Features Included:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Real-time Dashboard</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>QR Code Tracking</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Auto Scheduling</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Photo Gallery</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>WhatsApp/Email Notifications</span>
                  </li>
                  <li className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Project Management</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  onClick={() => setIsPreviewOpen(false)}
                  className="px-4 py-2 text-slate-700 hover:text-slate-900 font-medium rounded-lg"
                >
                  Close
                </button>
                <button 
                  onClick={() => {
                    setIsPreviewOpen(false)
                    router.push('/dashboard')
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition duration-300"
                >
                  View Full Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}