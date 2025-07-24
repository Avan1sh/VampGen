import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import CustomNavbar from '@/components/navbar'
import { AuthProvider } from '@/hooks/useAuth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Thrifty - Vampire Generator',
  description: 'A vampire character generator application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-b from-gray-900 via-purple-900 to-black min-h-screen`}>
        <AuthProvider>
          <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black">
            <CustomNavbar />
            <main className="w-full">
              {children}
            </main>
            
            <footer className="bg-gradient-to-b from-black to-gray-900 border-t border-purple-500/20 mt-auto">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center text-gray-300">
                  <p>&copy; 2025 VampGen - Gothic Fashion for GenZ. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}