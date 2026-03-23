import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'airbnb2 - Trouvez des logements uniques',
  description: 'Clone Airbnb - Trouvez des logements pour vos vacances',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="border-t border-gray-200 py-8 mt-16">
          <div className="container mx-auto px-4 text-center text-gray-600">
            <p>© 2024 airbnb2. Ceci est une démonstration.</p>
            <p className="text-sm mt-2">Inspiré par Airbnb</p>
          </div>
        </footer>
      </body>
    </html>
  )
}