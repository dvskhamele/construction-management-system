import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import PWAInstaller from '../components/PWAInstaller'
import { PWAProvider } from '../context/PWAContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'BuildMate - Construction Operations Management',
  description: 'Manage construction operations efficiently',
}

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <PWAProvider>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-title" content="BuildMate" />
          <meta name="theme-color" content="#0d9488" />
          <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
          <link rel="manifest" href="/manifest.json" />
          <title>BuildMate - Construction Operations Management</title>
          <meta name="description" content="Manage construction operations efficiently" />
        </head>
        <body className={`${inter.className} bg-gradient-to-br from-slate-50 to-slate-100`}>
          <div className="min-h-screen flex flex-col">
            {children}
          </div>
          <PWAInstaller />
        </body>
      </html>
    </PWAProvider>
  )
}