'use client'

import { useState, useEffect } from 'react'
import { sliderProducts, categories } from '@/data/products'
import ProductGrid from '@/components/ProductGrid'

// Define collection types
const collections = [
  {
    id: 'all',
    name: 'All Collections',
    description: 'Discover our complete range of dark fashion and accessories',
    image: '/images/collections/all-collections.jpg'
  },
  {
    id: 'dark-academia',
    name: 'Dark Academia',
    description: 'Scholarly elegance meets gothic sophistication',
    image: '/images/collections/dark-academia.jpg',
    tags: ['academic', 'scholarly', 'vintage']
  },
  {
    id: 'vampire-chic',
    name: 'Vampire Chic',
    description: 'Embrace your inner darkness with our vampire-inspired collection',
    image: '/images/collections/vampire-chic.jpg',
    tags: ['vampiric', 'mysterious', 'dramatic']
  },
  {
    id: 'gothic-street',
    name: 'Gothic Street',
    description: 'Modern gothic style for everyday wear',
    image: '/images/collections/gothic-street.jpg',
    tags: ['street', 'modern', 'edgy']
  }
]

export default function CollectionsPage() {
  const [selectedCollection, setSelectedCollection] = useState('all')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Filter products based on selected collection
  const getFilteredProducts = () => {
    if (selectedCollection === 'all') {
      return sliderProducts
    }
    
    // Filter products by collection tags or categories
    return sliderProducts.filter(product => {
      const collection = collections.find(c => c.id === selectedCollection)
      if (!collection || !collection.tags) return false
      
      return collection.tags.some(tag => 
        product.name.toLowerCase().includes(tag) ||
        product.category.toLowerCase().includes(tag) ||
        product.description?.toLowerCase().includes(tag)
      )
    })
  }

  const filteredProducts = getFilteredProducts()
  const selectedCollectionData = collections.find(c => c.id === selectedCollection)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black">
      {/* Hero Section */}
      <div className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
          }`}>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Our <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Collections</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Explore our carefully curated collections of dark fashion, gothic accessories, and vampire-inspired pieces. 
              Each collection tells a story of elegance, mystery, and timeless style.
            </p>
          </div>
        </div>
      </div>

      {/* Collection Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          {collections.map((collection) => (
            <button
              key={collection.id}
              onClick={() => setSelectedCollection(collection.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCollection === collection.id
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {collection.name}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Collection Info */}
      {selectedCollectionData && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {selectedCollectionData.name}
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {selectedCollectionData.description}
            </p>
            {selectedCollectionData.tags && (
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {selectedCollectionData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-800 text-purple-300 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {filteredProducts.length > 0 ? (
          <>
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-white mb-4">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'} Found
              </h3>
            </div>
            <ProductGrid 
              products={filteredProducts} 
              isVisible={isVisible} 
              showHeader={false} 
              showViewAllButton={false}
            />
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-3.5a2 2 0 00-2 2v3a2 2 0 002 2h3.5m-16 0h3.5a2 2 0 012-2v3a2 2 0 01-2 2H4z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">
              No products found in this collection
            </h3>
            <p className="text-gray-400 mb-6">
              This collection is currently being curated. Check back soon for new arrivals!
            </p>
            <button
              onClick={() => setSelectedCollection('all')}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200"
            >
              View All Collections
            </button>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-purple-900 to-pink-900 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-white mb-4">
            Stay Updated
          </h3>
          <p className="text-purple-100 mb-8 text-lg">
            Be the first to know about new collections, exclusive pieces, and special offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-purple-300/30 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <button className="px-6 py-3 bg-white text-purple-900 font-semibold rounded-lg hover:bg-purple-50 transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
