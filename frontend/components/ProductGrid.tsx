'use client'

import { Product } from '@/data/products'
import { HeartIcon, ShoppingBagIcon, EyeIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid, StarIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import Link from 'next/link'

interface ProductGridProps {
  products: Product[];
  isVisible: boolean;
  showHeader?: boolean;
  showViewAllButton?: boolean;
}

export default function ProductGrid({ products, isVisible, showHeader = true, showViewAllButton = true }: ProductGridProps) {
  const [wishlist, setWishlist] = useState<number[]>([])
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)

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
    <section className="py-20 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {showHeader && (
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 bg-gradient-to-br from-white to-purple-300 bg-clip-text text-transparent drop-shadow-sm">
              Featured Products
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Discover our curated collection of dark fashion pieces that embody elegance, mystery, and timeless gothic style.
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`group cursor-pointer transition-all duration-500 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${(index + 4) * 100}ms` }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 relative">
                
                {/* Discount Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-red-500/20 backdrop-blur-md border border-red-500/30 text-red-200 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
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
                <div className="h-80 bg-gradient-to-b from-purple-800/20 to-gray-800 flex items-center justify-center overflow-hidden relative">
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
                        <button className="p-3 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors duration-200 transform hover:scale-110">
                          <EyeIcon className="h-5 w-5 text-white" />
                        </button>
                        <button className="p-3 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors duration-200 transform hover:scale-110">
                          <ShoppingBagIcon className="h-5 w-5 text-white" />
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    {/* Category & Rating */}
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs tracking-wider text-purple-300 uppercase font-semibold">{product.category}</span>
                      <div className="flex items-center space-x-1 border border-white/10 px-2 py-0.5 rounded-full bg-black/20">
                        <StarIcon className="h-3 w-3 text-yellow-400" />
                        <span className="text-xs text-gray-300 ml-1">4.0</span>
                      </div>
                    </div>

                    {/* Product Name */}
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-400 mb-6 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <div>
                    {/* Price Section */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-white">{product.price}</span>
                        <span className="text-sm text-purple-300/60 line-through">{product.originalPrice}</span>
                      </div>
                      <span className="text-xs text-emerald-400/90 font-medium px-2 py-1 bg-emerald-400/10 rounded-full border border-emerald-400/20">In Stock</span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button className="flex-1 bg-gradient-to-r from-purple-600 to-purple-800 border border-purple-500/50 text-white py-2.5 px-4 rounded-xl font-bold hover:from-purple-500 hover:to-purple-700 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300 transform hover:-translate-y-1">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Products Button */}
        {showViewAllButton && (
          <div className="text-center mt-16">
            <Link 
              href="/products"
              className="inline-block px-10 py-4 bg-white/5 backdrop-blur-md border border-purple-500/30 text-purple-100 font-bold tracking-wide rounded-full hover:bg-white/10 hover:border-purple-400 hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all duration-300 transform hover:-translate-y-1"
            >
              View All Products
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
