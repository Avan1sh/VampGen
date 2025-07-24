'use client'

import { useState, useEffect } from 'react'
import { Button } from '@heroui/button'
import { useAuth } from '@/hooks/useAuth'
import AuthModal from '@/components/AuthModal'

export default function HomePage() {
  const { user, isAuthenticated } = useAuth()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleShopNow = () => {
    if (!isAuthenticated) {
      setAuthModalMode('signup')
      setIsAuthModalOpen(true)
    } else {
      // Navigate to shop
      alert('Welcome to VampGen Shop! (Shop functionality coming soon)')
    }
  }

  const featuredProducts = [
    {
      id: 1,
      name: "Midnight Velvet Coat",
      price: "$129.99",
      image: "/api/placeholder/300/400",
      category: "Outerwear"
    },
    {
      id: 2,
      name: "Gothic Rose Dress",
      price: "$89.99",
      image: "/api/placeholder/300/400",
      category: "Dresses"
    },
    {
      id: 3,
      name: "Dark Academia Blazer",
      price: "$149.99",
      image: "/api/placeholder/300/400",
      category: "Formal"
    },
    {
      id: 4,
      name: "Vampire Crown Necklace",
      price: "$39.99",
      image: "/api/placeholder/300/400",
      category: "Accessories"
    }
  ]

  const categories = [
    { name: "Dark Academia", icon: "📚", description: "Intellectual gothic vibes" },
    { name: "Vampire Chic", icon: "🧛‍♀️", description: "Classic vampire aesthetic" },
    { name: "Gothic Street", icon: "🖤", description: "Urban dark fashion" },
    { name: "Accessories", icon: "👑", description: "Complete your look" }
  ]

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-purple-900 to-black">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 via-purple-900 to-black">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-red-900/50">
          <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-20"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-red-400 rounded-full animate-ping opacity-80"></div>
          <div className="absolute bottom-32 left-1/4 w-3 h-3 bg-purple-300 rounded-full animate-bounce opacity-40"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-red-300 rounded-full animate-pulse opacity-50"></div>
        </div>

        <div className={`relative z-10 text-center px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-red-400 to-purple-600 bg-clip-text text-transparent animate-pulse">
            VampGen
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            {isAuthenticated 
              ? `Welcome back, ${user?.firstName}! 🦇 Discover your dark side with our latest collection.`
              : 'Embrace the darkness. Express your style. Gothic fashion for the modern GenZ soul.'
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white font-semibold px-8 py-4 rounded-full transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-purple-500/25"
              onClick={handleShopNow}
            >
              {isAuthenticated ? 'Shop Collection' : 'Start Shopping'}
            </Button>
            
            {!isAuthenticated && (
              <Button
                variant="bordered"
                size="lg"
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black px-8 py-4 rounded-full transition-all duration-300"
                onClick={() => {
                  setAuthModalMode('login')
                  setIsAuthModalOpen(true)
                }}
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-purple-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black via-purple-900 to-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            Explore Our <span className="bg-gradient-to-r from-purple-400 to-red-400 bg-clip-text text-transparent">Dark Collections</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div
                key={category.name}
                className={`group cursor-pointer transition-all duration-500 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-8 text-center border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{category.name}</h3>
                  <p className="text-gray-400 text-sm">{category.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 via-purple-900 to-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-white">
            Featured <span className="bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">Products</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <div
                key={product.id}
                className={`group cursor-pointer transition-all duration-500 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${(index + 4) * 100}ms` }}
              >
                <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
                  <div className="h-64 bg-gradient-to-b from-purple-800/20 to-gray-800 flex items-center justify-center">
                    <div className="text-6xl opacity-50 group-hover:opacity-70 transition-opacity duration-300">
                      🧛‍♀️
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-purple-400 mb-2">{product.category}</div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {product.name}
                    </h3>
                    <div className="text-xl font-bold text-red-400">{product.price}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
                onClick={handleShopNow}
              >
                {isAuthenticated ? 'Browse All Products' : 'Join VampGen'}
              </Button>
            </div>
          </div>
        </div>
      </section>

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