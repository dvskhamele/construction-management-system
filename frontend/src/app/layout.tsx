import './globals.css'
import { Inter } from 'next/font/google'
import PWAInstaller from '../components/PWAInstaller'
import { PWAProvider } from '../context/PWAContext'
import { AutomationProvider } from '../context/AutomationContext'
import { LanguageProvider } from '../context/LanguageContext'
import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'BuildMate: All-in-One Construction Management Platform for India',
    template: '%s | BuildMate',
  },
  description: 'Increase efficiency, reduce costs, and gain complete control over your construction projects with BuildMate. The #1 platform for contractors in India, featuring project management, CRM, crew tracking, and Vastu-aligned dashboards.',
  keywords: ['construction management software India', 'construction ERP', 'project management software', 'contractor software India', 'Vastu construction', 'construction CRM'],
  openGraph: {
    title: 'BuildMate: All-in-One Construction Management Platform for India',
    description: 'The #1 platform for contractors in India to increase efficiency, reduce costs, and gain complete control over their projects.',
    url: 'https://your-domain.com',
    siteName: 'BuildMate',
    images: [
      {
        url: 'https://your-domain.com/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BuildMate: All-in-One Construction Management Platform for India',
    description: 'The #1 platform for contractors in India to increase efficiency, reduce costs, and gain complete control over their projects.',
    images: ['https://your-domain.com/twitter-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <LanguageProvider>
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
            </head>
            <body className={`${inter.className} overflow-x-hidden`} style={{ margin: 0, padding: 0 }}>
              <div className="flex flex-col min-h-screen w-full max-w-full">
                {children}
                <Footer />
              </div>
              <PWAInstaller />
              <script type="application/ld+json">
                {JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "SoftwareApplication",
                  "name": "BuildMate",
                  "url": "https://your-domain.com",
                  "applicationCategory": "BusinessApplication",
                  "operatingSystem": "Web",
                  "description": "The all-in-one construction management platform for Indian contractors to manage projects, finances, and field operations with unparalleled efficiency and clarity.",
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.8",
                    "ratingCount": "88"
                  },
                  "offers": {
                    "@type": "Offer",
                    "price": "20000",
                    "priceCurrency": "INR"
                  }
                })}
              </script>
            </body>
          </html>
        </AutomationProvider>
      </PWAProvider>
    </LanguageProvider>
  )
}