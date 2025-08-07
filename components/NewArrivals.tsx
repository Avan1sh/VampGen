'use client'

import { Product } from '@/data/products'
import { HeartIcon, ShoppingBagIcon, EyeIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid, StarIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

interface NewArrivalsProps {
  products: Product[]
  isVisible: boolean
}

export default function NewArrivals({ products, isVisible }: NewArrivalsProps) {
  const [wishlist, setWishlist] = useState<number[]>([])
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  
  // Show the latest 4 products (assuming higher IDs are newer)
  const newProducts = products.slice(-4).reverse()

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const calculateDiscount = (originalPrice: string, salePrice: string) => {
    const original = parseFloat(originalPrice.replace('$', ''))
    const sale = parseFloat(salePrice.replace('$', ''))
    return Math.round(((original - sale) / original) * 100)
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            New <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Arrivals</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover the latest additions to our dark fashion collection. Fresh styles that embody gothic elegance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newProducts.map((product, index) => (
            <div
              key={product.id}
              className={`group cursor-pointer transition-all duration-500 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-green-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/20 relative">
                
                {/* New Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                    NEW
                  </span>
                </div>

                {/* Discount Badge */}
                <div className="absolute top-3 left-16 z-10">
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    -{calculateDiscount(product.originalPrice, product.price)}%
                  </span>
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleWishlist(product.id)
                  }}
                  className="absolute top-3 right-3 z-10 p-2 rounded-full bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700 transition-colors duration-200"
                >
                  {wishlist.includes(product.id) ? (
                    <HeartIconSolid className="h-4 w-4 text-red-500" />
                  ) : (
                    <HeartIcon className="h-4 w-4 text-white" />
                  )}
                </button>

                {/* Product Image */}
                <div className="h-80 bg-gradient-to-b from-green-800/20 to-gray-800 flex items-center justify-center overflow-hidden relative">
                  {product.image.startsWith('/api/placeholder') ? (
                    <div className="text-6xl opacity-50 group-hover:opacity-70 transition-opacity duration-300">
                      🧛‍♀️
                    </div>
                  ) : (
                    <>
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          console.log('Image failed to load:', product.image);
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.innerHTML = '<div class="text-6xl opacity-50">🧛‍♀️</div>';
                        }}
                      />
                      
                      {/* Hover Overlay */}
                      <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 flex items-center justify-center space-x-4 ${
                        hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                      }`}>
                        <button className="p-3 bg-green-600 rounded-full hover:bg-green-700 transition-colors duration-200 transform hover:scale-110">
                          <EyeIcon className="h-5 w-5 text-white" />
                        </button>
                        <button className="p-3 bg-green-600 rounded-full hover:bg-green-700 transition-colors duration-200 transform hover:scale-110">
                          <ShoppingBagIcon className="h-5 w-5 text-white" />
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  {/* Category & Rating */}
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-green-400 font-medium">{product.category}</span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className={`h-3 w-3 ${i < 4 ? 'text-yellow-400' : 'text-gray-600'}`} />
                      ))}
                      <span className="text-xs text-gray-400 ml-1">(4.0)</span>
                    </div>
                  </div>

                  {/* Product Name */}
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-green-300 transition-colors line-clamp-2">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Price Section */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-red-400">{product.price}</span>
                      <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    </div>
                    <span className="text-xs text-green-400 font-medium">Just Arrived!</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-2 px-4 rounded-lg font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:scale-105">
                      Add to Cart
                    </button>
                    <button className="px-4 py-2 border border-green-500 text-green-400 rounded-lg hover:bg-green-500 hover:text-white transition-colors duration-200">
                      <EyeIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
