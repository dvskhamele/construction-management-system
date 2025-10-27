'use client'

import React, { useState, useEffect } from 'react'
import { DebugUtils } from '../utils/debugging'

interface DebugInfo {
  timestamp: number;
  message: string;
  data?: any;
  type: 'INFO' | 'WARN' | 'ERROR' | 'LAYOUT' | 'RESPONSIVE' | 'PERFORMANCE' | 'VERBOSE';
  component?: string;
  screenInfo?: any;
}

interface ScreenInfo {
  width: number;
  height: number;
  breakpoint: string;
  orientation: 'portrait' | 'landscape';
  deviceType: 'mobile' | 'tablet' | 'desktop';
  userAgent: string;
}

interface DebugPanelProps {
  isOpen?: boolean;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const DebugPanel: React.FC<DebugPanelProps> = ({ 
  isOpen = false,
  position = 'bottom-right'
}) => {
  const [isPanelOpen, setIsPanelOpen] = useState(isOpen)
  const [debugLogs, setDebugLogs] = useState<DebugInfo[]>([])
  const [screenInfo, setScreenInfo] = useState<ScreenInfo | null>(null)
  const [activeTab, setActiveTab] = useState('logs')

  // Initialize debugging
  useEffect(() => {
    // Initialize debugging with VERBOSE level
    DebugUtils.init('VERBOSE', (info) => {
      setDebugLogs(prev => [...prev.slice(-99), info]) // Keep last 100 logs
    })
    
    // Get initial screen info
    setScreenInfo(DebugUtils.getScreenInfo())
    
    // Monitor resize events
    const cleanup = DebugUtils.monitorResize((info) => {
      setScreenInfo(info)
    })
    
    // Cleanup
    return () => {
      if (cleanup) cleanup()
    }
  }, [])

  // Toggle panel visibility
  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen)
  }

  // Clear logs
  const clearLogs = () => {
    setDebugLogs([])
  }

  // Check for layout issues
  const checkLayout = () => {
    if (typeof document !== 'undefined') {
      const mainElement = document.querySelector('main')
      if (mainElement) {
        const layoutInfo = DebugUtils.checkLayoutIssues(mainElement as HTMLElement)
        console.log('Layout Info:', layoutInfo)
      }
    }
  }

  // Check for responsive issues
  const checkResponsive = () => {
    const breakpoints = DebugUtils.checkResponsiveBreakpoints()
    console.log('Current breakpoints:', breakpoints)
  }

  // Check for horizontal overflow
  const checkOverflow = () => {
    const hasOverflow = DebugUtils.checkHorizontalOverflow()
    console.log('Has horizontal overflow:', hasOverflow)
  }

  // Get position classes
  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4'
      case 'top-right':
        return 'top-4 right-4'
      case 'bottom-left':
        return 'bottom-4 left-4'
      case 'bottom-right':
        return 'bottom-4 right-4'
      default:
        return 'bottom-4 right-4'
    }
  }

  // Get log type color
  const getLogTypeColor = (type: DebugInfo['type']) => {
    switch (type) {
      case 'ERROR':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'WARN':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'INFO':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'LAYOUT':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'RESPONSIVE':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'PERFORMANCE':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="fixed z-50">
      {/* Toggle Button */}
      <button
        onClick={togglePanel}
        className={`absolute ${getPositionClasses()} bg-gray-800 text-white px-3 py-1 rounded-t-lg text-xs font-mono hover:bg-gray-700 transition-colors`}
      >
        {isPanelOpen ? 'CLOSE DEBUG' : 'OPEN DEBUG'}
      </button>

      {/* Debug Panel */}
      {isPanelOpen && (
        <div 
          className={`absolute ${getPositionClasses()} w-96 h-80 bg-white border border-gray-300 rounded-lg shadow-xl overflow-hidden flex flex-col`}
          style={{ 
            maxHeight: '80vh',
            transform: position.includes('bottom') ? 'translateY(-100%)' : 'translateY(100%)'
          }}
        >
          {/* Panel Header */}
          <div className="bg-gray-800 text-white px-4 py-2 flex justify-between items-center">
            <h3 className="text-sm font-bold">Debug Panel</h3>
            <div className="flex space-x-2">
              <button 
                onClick={clearLogs}
                className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
              >
                Clear
              </button>
              <button 
                onClick={togglePanel}
                className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
              >
                Close
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button 
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'logs' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setActiveTab('logs')}
              >
                Logs
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'layout' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => {
                  setActiveTab('layout')
                  // Trigger layout check
                  setTimeout(() => {
                    const mainElement = document.querySelector('main')
                    if (mainElement) {
                      DebugUtils.checkLayoutIssues(mainElement as HTMLElement)
                    }
                  }, 100)
                }}
              >
                Layout
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'responsive' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => {
                  setActiveTab('responsive')
                  // Trigger responsive check
                  setTimeout(() => {
                    DebugUtils.checkResponsiveBreakpoints()
                  }, 100)
                }}
              >
                Responsive
              </button>
              <button 
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'overflow' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => {
                  setActiveTab('overflow')
                  // Trigger overflow check
                  setTimeout(() => {
                    DebugUtils.checkHorizontalOverflow()
                  }, 100)
                }}
              >
                Overflow
              </button>
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'logs' && (
              <div className="p-2">
                <h4 className="text-xs font-bold mb-2 px-2">Debug Logs ({debugLogs.length})</h4>
                <div className="space-y-1 max-h-64 overflow-y-auto">
                  {debugLogs.map((log, index) => (
                    <div 
                      key={index} 
                      className={`p-2 rounded text-xs border ${getLogTypeColor(log.type)}`}
                    >
                      <div className="flex justify-between">
                        <span className="font-bold">[{log.component}]</span>
                        <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                      </div>
                      <div className="mt-1">{log.message}</div>
                      {log.data && (
                        <pre className="mt-1 text-xs overflow-x-auto">
                          {JSON.stringify(log.data, null, 2)}
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'layout' && (
              <div className="p-4">
                <h4 className="text-xs font-bold mb-2">Layout Information</h4>
                {screenInfo && (
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="font-medium">Width:</span> {screenInfo.width}px
                    </div>
                    <div>
                      <span className="font-medium">Height:</span> {screenInfo.height}px
                    </div>
                    <div>
                      <span className="font-medium">Breakpoint:</span> {screenInfo.breakpoint}
                    </div>
                    <div>
                      <span className="font-medium">Device:</span> {screenInfo.deviceType}
                    </div>
                  </div>
                )}
                <button 
                  className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-xs"
                  onClick={() => {
                    const mainElement = document.querySelector('main')
                    if (mainElement) {
                      DebugUtils.checkLayoutIssues(mainElement as HTMLElement)
                    }
                  }}
                >
                  Check Layout
                </button>
              </div>
            )}

            {activeTab === 'responsive' && (
              <div className="p-4">
                <h4 className="text-xs font-bold mb-2">Responsive Breakpoints</h4>
                <button 
                  className="mt-2 px-3 py-1 bg-green-500 text-white rounded text-xs"
                  onClick={() => DebugUtils.checkResponsiveBreakpoints()}
                >
                  Check Responsive
                </button>
              </div>
            )}

            {activeTab === 'overflow' && (
              <div className="p-4">
                <h4 className="text-xs font-bold mb-2">Horizontal Overflow</h4>
                <button 
                  className="mt-2 px-3 py-1 bg-purple-500 text-white rounded text-xs"
                  onClick={() => DebugUtils.checkHorizontalOverflow()}
                >
                  Check Overflow
                </button>
              </div>
            )}
          </div>

          {/* Panel Footer */}
          <div className="bg-gray-100 px-4 py-2 text-xs text-gray-600 border-t border-gray-200">
            Debug Mode: {DebugUtils ? 'Active' : 'Inactive'}
          </div>
        </div>
      )}
    </div>
  )
}

export default DebugPanel