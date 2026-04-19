import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../styles/globals.css'
import CustomNavbar from '@/components/navbar'
import { AuthProvider } from '@/hooks/useAuth'
import InteractiveStarsBackground from '@/components/InteractiveStarsBackground'

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
      <body className={`${inter.className} bg-black min-h-screen relative`}>
        <InteractiveStarsBackground />
        <AuthProvider>
          <div className="min-h-screen relative z-10 flex flex-col">
            <CustomNavbar />
            <main className="w-full flex-grow">
              {children}
            </main>
            
            <footer className="bg-black/50 backdrop-blur-md border-t border-purple-500/20 mt-auto relative z-10">
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