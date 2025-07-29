'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import AuthModal from '@/components/AuthModal'
import Hero from '@/components/Hero'
import ProductSlider from '@/components/ProductSlider'
import Categories from '@/components/Categories'
import ProductGrid from '@/components/ProductGrid'
import CallToAction from '@/components/CallToAction'
import { sliderProducts, categories } from '@/data/products'

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

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-purple-900 to-black">
      {/* Hero Section */}
      <Hero isVisible={isVisible} />

      {/* Product Slider Section */}
      <ProductSlider products={sliderProducts} onShopNow={handleShopNow} />

      {/* Categories Section */}
      <Categories categories={categories} isVisible={isVisible} />

      {/* Featured Products Grid */}
      <ProductGrid products={sliderProducts} isVisible={isVisible} />

      {/* Call to Action Section */}
      <CallToAction isAuthenticated={isAuthenticated} onShopNow={handleShopNow} />

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