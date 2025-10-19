'use client'

import './globals.css'
import { Inter } from 'next/font/google'
import PWAInstaller from '../components/PWAInstaller'
import { PWAProvider } from '../context/PWAContext'
import { AutomationProvider } from '../context/AutomationContext'
import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PWAProvider>
      <AutomationProvider>
        <html lang="en">
          <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-title" content="BuildMate" />
            <meta name="theme-color" content="#0d9488" />
            <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
            <link rel="manifest" href="/manifest.json" />
            <title>BuildMate - Construction Process Automation</title>
            <meta name="description" content="BuildMate is a true construction process automation platform that helps builders plan, deploy, track & manage end to end project development" />
          </head>
          <body className={`${inter.className} overflow-x-hidden`} style={{ margin: 0, padding: 0 }}>
            <div className="flex flex-col min-h-screen w-full max-w-full">
              {children}
              <Footer />
            </div>
            <PWAInstaller />
          </body>
        </html>
      </AutomationProvider>
    </PWAProvider>
  )
}