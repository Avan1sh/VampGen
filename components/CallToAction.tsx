'use client'

import { Button } from '@heroui/button'

interface CallToActionProps {
  isAuthenticated: boolean;
  onShopNow: () => void;
}

export default function CallToAction({ isAuthenticated, onShopNow }: CallToActionProps) {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black via-purple-900 to-gray-900">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-r from-purple-900/50 to-red-900/50 rounded-3xl p-12 border border-purple-500/30 backdrop-blur-sm">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join the Dark Side
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            {isAuthenticated 
              ? 'Explore our complete collection and find your perfect gothic style. New arrivals every week!'
              : 'Sign up for exclusive access to limited collections, early releases, and vampire fashion tips.'
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-300"
              onClick={onShopNow}
            >
              {isAuthenticated ? 'Browse All Products' : 'Join VampGen'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
