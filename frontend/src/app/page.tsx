'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-xl font-bold text-slate-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-teal-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>BuildMate</span>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/features" className="text-slate-600 hover:text-teal-600 font-medium">Features</Link>
              <Link href="/pricing" className="text-slate-600 hover:text-teal-600 font-medium">Pricing</Link>
              <Link href="/demo" className="text-slate-600 hover:text-teal-600 font-medium">Demo</Link>
              <Link href="/login" className="text-slate-600 hover:text-teal-600 font-medium">Login</Link>
            </nav>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-slate-600 hover:text-slate-900"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          
          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200">
              <div className="flex flex-col space-y-4">
                <Link href="/features" className="text-slate-600 hover:text-teal-600 font-medium">Features</Link>
                <Link href="/pricing" className="text-slate-600 hover:text-teal-600 font-medium">Pricing</Link>
                <Link href="/demo" className="text-slate-600 hover:text-teal-600 font-medium">Demo</Link>
                <Link href="/login" className="text-slate-600 hover:text-teal-600 font-medium">Login</Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-teal-500 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Tired of Losing Days on Chaos?
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
              Most builders waste 20–30% of their month chasing updates, managing WhatsApp chaos, and fixing preventable errors.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/signup" 
                className="bg-white text-teal-600 hover:bg-slate-100 font-bold py-4 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                Try Free for 45 Days
              </Link>
              <Link 
                href="/demo" 
                className="bg-transparent border-2 border-white text-white hover:bg-teal-700 font-bold py-4 px-8 rounded-lg text-lg transition duration-300"
              >
                See Live Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Competitor Comparison Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Why BuildMate is Better</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Compare BuildMate with other construction management platforms
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-slate-100">
                <tr>
                  <th className="py-4 px-6 text-left text-slate-800 font-bold">Feature</th>
                  <th className="py-4 px-6 text-center text-slate-800 font-bold">BuildMate</th>
                  <th className="py-4 px-6 text-center text-slate-800 font-bold">Buildern</th>
                  <th className="py-4 px-6 text-center text-slate-800 font-bold">Houzz Pro</th>
                  <th className="py-4 px-6 text-center text-slate-800 font-bold">Contractor Foreman</th>
                  <th className="py-4 px-6 text-center text-slate-800 font-bold">Bluebeam</th>
                  <th className="py-4 px-6 text-center text-slate-800 font-bold">Buildup</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-4 px-6 text-slate-700 font-medium">Monthly Price</td>
                  <td className="py-4 px-6 text-center text-teal-600 font-bold">₹999</td>
                  <td className="py-4 px-6 text-center text-red-500 font-bold">$250</td>
                  <td className="py-4 px-6 text-center text-red-500 font-bold">$250</td>
                  <td className="py-4 px-6 text-center text-red-500 font-bold">$99</td>
                  <td className="py-4 px-6 text-center text-red-500 font-bold">$260</td>
                  <td className="py-4 px-6 text-center text-red-500 font-bold">$149.99</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-4 px-6 text-slate-700 font-medium">Auto Task Flow</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                  <td className="py-4 px-6 text-center text-red-500">✗</td>
                  <td className="py-4 px-6 text-center text-red-500">✗</td>
                  <td className="py-4 px-6 text-center text-red-500">✗</td>
                  <td className="py-4 px-6 text-center text-red-500">✗</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-slate-700 font-medium">Crew View</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                  <td className="py-4 px-6 text-center text-red-500">✗</td>
                  <td className="py-4 px-6 text-center text-red-500">✗</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                  <td className="py-4 px-6 text-center text-red-500">✗</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-4 px-6 text-slate-700 font-medium">Client Dashboard</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                  <td className="py-4 px-6 text-center text-red-500">✗</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-slate-700 font-medium">Auto Reports</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                  <td className="py-4 px-6 text-center text-red-500">✗</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-4 px-6 text-slate-700 font-medium">Vastu Guidance</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                  <td className="py-4 px-6 text-center text-red-500">✗</td>
                  <td className="py-4 px-6 text-center text-red-500">✗</td>
                  <td className="py-4 px-6 text-center text-red-500">✗</td>
                  <td className="py-4 px-6 text-center text-red-500">✗</td>
                  <td className="py-4 px-6 text-center text-red-500">✗</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 text-slate-700 font-medium">WhatsApp Integration</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                  <td className="py-4 px-6 text-center text-red-500">✗</td>
                  <td className="py-4 px-6 text-center text-green-500">✓</td>
                  <td className="py-4 px-6 text-center text-red-500">✗</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">The Real Pain</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Builders face the same problems every day. BuildMate solves them automatically.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border-l-4 border-rose-500 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mb-3">Workers Don't Update Progress</h3>
              <p className="text-slate-700">Daily confusion + client complaints</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border-l-4 border-amber-500 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mb-3">Material Tracking is Messy</h3>
              <p className="text-slate-700">Delays, cash stuck, rework</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border-l-4 border-emerald-500 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mb-3">Clients Keep Calling for Updates</h3>
              <p className="text-slate-700">You lose credibility</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border-l-4 border-blue-500 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mb-3">Engineers Forget Tasks</h3>
              <p className="text-slate-700">Small mistakes → big cost</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border-l-4 border-purple-500 lg:col-span-2 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 mb-3">Data Scattered Across Platforms</h3>
              <p className="text-slate-700">No clarity, no control — WhatsApp, Excel, PDFs everywhere</p>
            </div>
          </div>
          
          <div className="mt-12 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/3 mb-6 md:mb-0">
                <p className="text-xl italic">
                  "Before BuildMate, I spent 3 hours every morning just checking WhatsApp for updates. Now I just open the dashboard — everything's already synced."
                </p>
                <p className="mt-4 font-bold">— Ramesh, Contractor, Mumbai</p>
              </div>
              <div className="md:w-1/3 flex justify-center">
                <div className="bg-white bg-opacity-20 rounded-full p-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">BuildMate Solution</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Your construction projects self-manage.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-slate-800">Auto-creates milestones and tasks based on real actions</h3>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-slate-800">Auto-updates progress & client dashboards</h3>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-slate-800">Auto-generates reports, invoices, and reminders</h3>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-slate-800">Works with minimal internet, low tech, zero management</h3>
                  </div>
                </li>
              </ul>
              
              <div className="mt-8 bg-slate-50 p-6 rounded-2xl shadow-sm">
                <p className="italic text-slate-700">
                  "It's like having a site manager who never sleeps. Everything flows naturally, and my team actually follows it."
                </p>
                <p className="mt-4 font-bold text-slate-800">— Amit Patel, Builder, Indore</p>
              </div>
            </div>
            
            <div className="bg-slate-50 rounded-2xl shadow-md p-8">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-br from-teal-400 to-teal-600 rounded-full p-4 w-24 h-24 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-center text-slate-800 mb-4">Results We Deliver</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-700">Daily progress visibility</span>
                    <span className="font-bold text-slate-800">100% clarity</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div className="bg-teal-500 h-2.5 rounded-full" style={{width: '100%'}}></div>
                  </div>
                  <div className="text-sm text-slate-500 mt-1">was 20–30% unknown</div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-700">Project delays</span>
                    <span className="font-bold text-slate-800">↓ 8%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div className="bg-teal-500 h-2.5 rounded-full" style={{width: '78%'}}></div>
                  </div>
                  <div className="text-sm text-slate-500 mt-1">was 22% avg</div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-700">Site rework</span>
                    <span className="font-bold text-slate-800">↓ 4%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div className="bg-teal-500 h-2.5 rounded-full" style={{width: '73%'}}></div>
                  </div>
                  <div className="text-sm text-slate-500 mt-1">was 15%</div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-slate-700">Client follow-ups</span>
                    <span className="font-bold text-slate-800">1/day</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div className="bg-teal-500 h-2.5 rounded-full" style={{width: '90%'}}></div>
                  </div>
                  <div className="text-sm text-slate-500 mt-1">was 7–10/day</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Social Proof</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Trusted by builders across India - Delhi, Mumbai, Indore, and more
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600">150+</div>
              <div className="text-lg text-slate-600">Active construction companies</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600">1500+</div>
              <div className="text-lg text-slate-600">Projects tracked</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-teal-600">4.9/5</div>
              <div className="text-lg text-slate-600">Average rating</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <p className="italic text-slate-700">
                "I was skeptical, but BuildMate replaced 3 Excel sheets and 5 WhatsApp groups in one app. My life is easier."
              </p>
              <p className="mt-4 font-bold text-slate-800">— Raj Sharma, Builder, Noida</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <p className="italic text-slate-700">
                "My clients now get updates without calling me every day. BuildMate basically runs itself."
              </p>
              <p className="mt-4 font-bold text-slate-800">— Neha Gupta, Project Manager, Delhi</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <p className="italic text-slate-700">
                "Even my supervisors with zero tech experience can use it. I can finally focus on bigger projects."
              </p>
              <p className="mt-4 font-bold text-slate-800">— Manoj Singh, Contractor, Gurgaon</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <p className="italic text-slate-700">
                "We completed 3 residential projects 2 months ahead of schedule using BuildMate. I literally stopped chasing engineers every morning."
              </p>
              <p className="mt-4 font-bold text-slate-800">— Suresh Kumar, Contractor, Mumbai</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <p className="italic text-slate-700">
                "Honestly, I thought software like this would be complicated. My 19-year-old supervisor runs it daily. No training needed."
              </p>
              <p className="mt-4 font-bold text-slate-800">— Neha Gupta, PM, Indore</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <p className="italic text-slate-700">
                "My clients actually comment on how clear and professional my reports look. Even they feel the discipline."
              </p>
              <p className="mt-4 font-bold text-slate-800">— Manoj Singh, Builder, Pune</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Powerful Features</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Built for lazy thekedars, distracted clients, and low attention spans
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-6 rounded-2xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800">Auto Task Flow</h3>
              </div>
              <p className="text-slate-700 mb-4">
                Creates next tasks automatically
              </p>
              <p className="italic text-sm text-slate-600">
                "I don't touch project plans manually. BuildMate does it for me." — Vikram Joshi, Builder
              </p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-2xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800">Crew View</h3>
              </div>
              <p className="text-slate-700 mb-4">
                Shows only today's tasks to workers
              </p>
              <p className="italic text-sm text-slate-600">
                "Even my untrained site supervisors use it flawlessly." — Anita Sharma, Builder
              </p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-2xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800">Client Dashboard</h3>
              </div>
              <p className="text-slate-700 mb-4">
                Gives instant progress to clients
              </p>
              <p className="italic text-sm text-slate-600">
                "Clients stopped calling me 10x a day." — Ramesh, Contractor
              </p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-2xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800">Auto Reports & Invoices</h3>
              </div>
              <p className="text-slate-700 mb-4">
                Instant, accurate, no Excel
              </p>
              <p className="italic text-sm text-slate-600">
                "I saved ~15 hours/month on reporting alone." — Amit Patel, Builder
              </p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-2xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800">Predictive Reminders</h3>
              </div>
              <p className="text-slate-700 mb-4">
                Suggests actions before delays
              </p>
              <p className="italic text-sm text-slate-600">
                "It's like the system thinks ahead for me. No rework anymore." — Suresh Kumar, Contractor
              </p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-2xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 p-3 rounded-lg mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-800">Vastu Guidance</h3>
              </div>
              <p className="text-slate-700 mb-4">
                Site alignment recommendations
              </p>
              <p className="italic text-sm text-slate-600">
                "My clients love the Vastu-aligned reports." — Manoj Singh, Builder
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Simple Pricing</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              All plans come with self-managing logic built-in — zero manual setup. 45-day risk-free trial.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="border border-slate-200 rounded-2xl p-8 bg-white shadow-sm">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Basic</h3>
              <div className="text-4xl font-bold text-slate-800 mb-6">₹999<span className="text-lg font-normal text-slate-600">/month</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-slate-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Core project + crew tracking</span>
                </li>
                <li className="flex items-center text-slate-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Auto task flow</span>
                </li>
                <li className="flex items-center text-slate-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Vastu guidance</span>
                </li>
              </ul>
              <p className="text-sm text-slate-600 mb-6">Used by contractors in Delhi, Mumbai, Indore, and other cities</p>
              <Link 
                href="/signup" 
                className="block w-full bg-slate-800 text-white text-center py-3 px-4 rounded-lg font-medium hover:bg-slate-700 transition"
              >
                Start Free Trial
              </Link>
            </div>
            
            {/* Professional Plan - Popular */}
            <div className="border-2 border-teal-500 rounded-2xl p-8 relative bg-white shadow-md">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-teal-500 text-white text-sm font-bold px-4 py-1 rounded-full">
                MOST POPULAR
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Professional</h3>
              <div className="text-4xl font-bold text-slate-800 mb-6">₹12,000<span className="text-lg font-normal text-slate-600">/year</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-slate-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>All Basic features</span>
                </li>
                <li className="flex items-center text-slate-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Auto reports & resource management</span>
                </li>
                <li className="flex items-center text-slate-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>WhatsApp integration</span>
                </li>
                <li className="flex items-center text-slate-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Advanced Vastu templates</span>
                </li>
              </ul>
              <p className="text-sm text-slate-600 mb-6">Used by builders across India, avg. 30% faster completion</p>
              <Link 
                href="/signup" 
                className="block w-full bg-teal-600 text-white text-center py-3 px-4 rounded-lg font-medium hover:bg-teal-700 transition"
              >
                Start Free Trial
              </Link>
            </div>
            
            {/* Enterprise Plan */}
            <div className="border border-slate-200 rounded-2xl p-8 bg-white shadow-sm">
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Enterprise</h3>
              <div className="text-4xl font-bold text-slate-800 mb-6">₹24,000<span className="text-lg font-normal text-slate-600">/year</span></div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-slate-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>All Professional features</span>
                </li>
                <li className="flex items-center text-slate-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Unlimited projects</span>
                </li>
                <li className="flex items-center text-slate-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>White-label customization</span>
                </li>
                <li className="flex items-center text-slate-800">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Priority support</span>
                </li>
              </ul>
              <p className="text-sm text-slate-600 mb-6">For large construction firms across India</p>
              <Link 
                href="/signup" 
                className="block w-full bg-slate-800 text-white text-center py-3 px-4 rounded-lg font-medium hover:bg-slate-700 transition"
              >
                Start Free Trial
              </Link>
            </div>
            
            {/* Special Offer */}
            <div className="mt-8 text-center">
              <p className="text-xl text-slate-700 font-semibold">Or pay annually upfront to save significantly!</p>
              <p className="text-lg text-slate-600">₹8,999 per year when paid annually (₹899.92/month average)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Builders Love BuildMate */}
      <section className="py-16 bg-gradient-to-r from-slate-800 to-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Builders Love BuildMate</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Stop losing time, money, and credibility.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="bg-slate-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Stop chasing workers</h3>
              <p className="text-slate-300">System auto-updates progress</p>
            </div>
            
            <div className="text-center">
              <div className="bg-slate-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Stop answering repeat calls</h3>
              <p className="text-slate-300">Clients get auto-updates</p>
            </div>
            
            <div className="text-center">
              <div className="bg-slate-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Stop opening 10 Excel sheets/day</h3>
              <p className="text-slate-300">Everything in one place</p>
            </div>
          </div>
          
          <div className="bg-slate-700 rounded-2xl p-8 text-center">
            <p className="text-xl italic mb-4">
              "Honestly, I thought software like this would be complicated. My 19-year-old supervisor runs it daily. No training needed."
            </p>
            <p className="font-bold">— Neha Gupta, PM, Delhi</p>
          </div>
        </div>
      </section>

      {/* Vastu Ready Templates */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Vastu-Ready Templates</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Optional vastu alignment for your projects
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl shadow-sm text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">East-facing Initiation</h3>
              <p className="text-slate-700">New projects start with prosperity energy</p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-2xl shadow-sm text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">North-aligned Reports</h3>
              <p className="text-slate-700">Growth & knowledge direction</p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-2xl shadow-sm text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 4.016M5.618 7.944A11.955 11.955 0 0112 3.988c.618 0 1.227.092 1.807.267M12 7.988v4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">South-end Delivery</h3>
              <p className="text-slate-700">Completion energy alignment</p>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-2xl shadow-sm text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Grid-aligned Interface</h3>
              <p className="text-slate-700">Natural energy balance in UI</p>
            </div>
          </div>
          
          <div className="mt-12 bg-slate-50 rounded-2xl p-8 text-center">
            <p className="text-xl italic text-slate-700 mb-4">
              "My clients actually comment on how clear and professional my reports look. Even they feel the discipline."
            </p>
            <p className="font-bold text-slate-800">— Manoj Singh, Builder, Gurgaon</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-teal-500 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Stop Losing Time, Money, and Credibility</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            BuildMate runs your construction project like a disciplined assistant — without you managing the software.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/signup" 
              className="bg-white text-teal-600 hover:bg-slate-100 font-bold py-4 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              Start Free Trial
            </Link>
            <Link 
              href="/demo" 
              className="bg-transparent border-2 border-white text-white hover:bg-teal-700 font-bold py-4 px-8 rounded-lg text-lg transition duration-300"
            >
              Schedule a Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="text-xl font-bold text-white flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-teal-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.857L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>BuildMate</span>
              </Link>
              <p className="text-sm">
                India's premier construction management platform for construction professionals across Delhi, Mumbai, Indore, Pune, and other cities.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/features" className="hover:text-white transition">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition">Pricing</Link></li>
                <li><Link href="/demo" className="hover:text-white transition">Demo</Link></li>
                <li><Link href="/integrations" className="hover:text-white transition">Integrations</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
                <li><Link href="/guides" className="hover:text-white transition">Guides</Link></li>
                <li><Link href="/support" className="hover:text-white transition">Support</Link></li>
                <li><Link href="/community" className="hover:text-white transition">Community</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white transition">About</Link></li>
                <li><Link href="/careers" className="hover:text-white transition">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition">Privacy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-8 pt-8 text-sm text-center">
            <p>© {new Date().getFullYear()} BuildMate Construction Management. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}