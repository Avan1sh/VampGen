'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import AuthModal from '@/components/AuthModal'
import Hero from '@/components/Hero'
import ProductSlider from '@/components/ProductSlider'
import ProductGrid from '@/components/ProductGrid'
import FeaturedCategories from '@/components/FeaturedCategories'
import StatsSection from '@/components/StatsSection'
import NewArrivals from '@/components/NewArrivals'
import CallToAction from '@/components/CallToAction'
import { sliderProducts, categories } from '@/data/products'

export default function HomePage() {
  const { user, isAuthenticated } = useAuth()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login')
  const [isVisible, setIsVisible] = useState(false)

  // Show only first 8 products on home page
  const featuredProducts = sliderProducts.slice(0, 8)

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
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-900 via-purple-900 to-black relative">
      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <Hero isVisible={isVisible} />

        {/* Product Slider Section */}
        <ProductSlider products={sliderProducts.slice(0, 4)} onShopNow={handleShopNow} />

        {/* Featured Categories */}
        <FeaturedCategories categories={categories} isVisible={isVisible} />

        {/* Featured Products Grid */}
        <ProductGrid products={featuredProducts} isVisible={isVisible} />

        {/* Stats Section */}
        <StatsSection />

        {/* New Arrivals Section */}
        <NewArrivals products={sliderProducts} isVisible={isVisible} />

        {/* Call to Action Section */}
        <CallToAction isAuthenticated={isAuthenticated} onShopNow={handleShopNow} />
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