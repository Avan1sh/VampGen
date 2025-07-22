'use client'

import { useState } from 'react'
import { Button } from '@heroui/button'
import { Card, CardBody, CardHeader } from '@heroui/react'
import { useAuth } from '@/hooks/useAuth'
import AuthModal from '@/components/AuthModal'

export default function HomePage() {
  const { user, isAuthenticated } = useAuth()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login')

  const handleGetStarted = () => {
    if (!isAuthenticated) {
      setAuthModalMode('signup')
      setIsAuthModalOpen(true)
    } else {
      // Navigate to generator or show generator content
      alert('Welcome to the generator! (Generator functionality coming soon)')
    }
  }

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome to Thrifty Vampire Generator! 🧛‍♂️
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        {isAuthenticated 
          ? `Welcome back, ${user?.firstName}! Ready to create some vampires?`
          : 'Create your own unique vampire character with our generator tool.'
        }
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <h3 className="text-xl font-semibold">🎭 Character Creation</h3>
          </CardHeader>
          <CardBody>
            <p className="text-gray-600">
              Generate unique vampire characters with custom traits, backgrounds, and abilities.
            </p>
          </CardBody>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <h3 className="text-xl font-semibold">🎨 Customization</h3>
          </CardHeader>
          <CardBody>
            <p className="text-gray-600">
              Personalize your vampires with different clans, powers, and appearance options.
            </p>
          </CardBody>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <h3 className="text-xl font-semibold">📚 Gallery</h3>
          </CardHeader>
          <CardBody>
            <p className="text-gray-600">
              Save and share your created vampire characters with the community.
            </p>
          </CardBody>
        </Card>
      </div>

      <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg shadow-md p-8 max-w-2xl mx-auto">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">
          Ready to Start Creating?
        </h2>
        <p className="text-gray-600 mb-6">
          {isAuthenticated 
            ? 'You\'re all set! Click below to start generating your vampire characters.'
            : 'Sign up now to start creating your own vampire characters and save them to your personal gallery.'
          }
        </p>
        
        <div className="space-y-4">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-3"
            onClick={handleGetStarted}
          >
            {isAuthenticated ? 'Start Generating' : 'Get Started'}
          </Button>
          
          {!isAuthenticated && (
            <div className="text-sm text-gray-500">
              Already have an account?{' '}
              <Button
                variant="light"
                size="sm"
                className="text-purple-600 hover:text-purple-700 p-0 h-auto min-w-0"
                onClick={() => {
                  setAuthModalMode('login')
                  setIsAuthModalOpen(true)
                }}
              >
                Sign in here
              </Button>
            </div>
          )}
        </div>

        {isAuthenticated && (
          <div className="mt-6 p-4 bg-white/50 rounded-lg">
            <p className="text-sm text-gray-600">
              💡 Tip: You can access the generator anytime from the navigation menu above!
            </p>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode={authModalMode}
        onAuthSuccess={() => setIsAuthModalOpen(false)}
      />
    </div>
  )
}