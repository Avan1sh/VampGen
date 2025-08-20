'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { TrashIcon, ShoppingBagIcon, HeartIcon } from '@heroicons/react/24/outline'
import { HeartIcon as HeartIconSolid, StarIcon } from '@heroicons/react/24/solid'

interface WishlistItem {
  id: number
  name: string
  price: string
  originalPrice: string
  image: string
  category: string
  addedDate: string
  inStock: boolean
  size?: string
  color?: string
}

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Sample wishlist data - in real app, this would come from context/state management
  useEffect(() => {
    // Simulate loading wishlist data
    const sampleWishlistItems: WishlistItem[] = [
      {
        id: 5,
        name: "Shadow Silk Corset",
        price: "$79.99",
        originalPrice: "$109.99",
        image: "/api/placeholder/400/400",
        category: "Lingerie",
        addedDate: "2025-08-10",
        inStock: true,
        size: "M",
        color: "Black"
      },
      {
        id: 7,
        name: "Raven Wing Cape",
        price: "$159.99",
        originalPrice: "$219.99",
        image: "/api/placeholder/400/400",
        category: "Outerwear",
        addedDate: "2025-08-08",
        inStock: true
      },
      {
        id: 12,
        name: "Blackthorn Leather Jacket",
        price: "$189.99",
        originalPrice: "$249.99",
        image: "/api/placeholder/400/400",
        category: "Outerwear",
        addedDate: "2025-08-05",
        inStock: false
      },
      {
        id: 14,
        name: "Morticia's Evening Dress",
        price: "$159.99",
        originalPrice: "$219.99",
        image: "/api/placeholder/400/400",
        category: "Dresses",
        addedDate: "2025-08-03",
        inStock: true,
        size: "S",
        color: "Black"
      },
      {
        id: 16,
        name: "Blood Moon Ring Set",
        price: "$44.99",
        originalPrice: "$64.99",
        image: "/api/placeholder/400/400",
        category: "Accessories",
        addedDate: "2025-08-01",
        inStock: true
      }
    ]
    
    setTimeout(() => {
      setWishlistItems(sampleWishlistItems)
      setIsLoading(false)
    }, 500)
  }, [])

  const removeFromWishlist = (id: number) => {
    setWishlistItems(items => items.filter(item => item.id !== id))
  }

  const addToCart = (id: number) => {
    // In real app, this would add to cart
    alert('Item added to cart!')
  }

  const calculateDiscount = (originalPrice: string, salePrice: string) => {
    const original = parseFloat(originalPrice.replace('$', ''))
    const sale = parseFloat(salePrice.replace('$', ''))
    return Math.round(((original - sale) / original) * 100)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const totalValue = wishlistItems.reduce((total, item) => {
    return total + parseFloat(item.price.replace('$', ''))
  }, 0)

  const totalSavings = wishlistItems.reduce((total, item) => {
    const original = parseFloat(item.originalPrice.replace('$', ''))
    const sale = parseFloat(item.price.replace('$', ''))
    return total + (original - sale)
  }, 0)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-400"></div>
      </div>
    )
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center">
            <HeartIcon className="w-24 h-24 text-gray-400 mx-auto mb-8" />
            <h1 className="text-4xl font-bold text-white mb-4">Your Wishlist is Empty</h1>
            <p className="text-gray-300 text-lg mb-8">
              Start building your collection of dark desires. Save items you love for later.
            </p>
            <Link 
              href="/products"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-red-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
            >
              Discover Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">My Wishlist</h1>
          <p className="text-gray-300 mb-4">
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for your dark collection
          </p>
          
          {/* Wishlist Stats */}
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="bg-gray-800/50 rounded-lg px-4 py-2">
              <span className="text-gray-400">Total Value: </span>
              <span className="text-white font-semibold">${totalValue.toFixed(2)}</span>
            </div>
            <div className="bg-gray-800/50 rounded-lg px-4 py-2">
              <span className="text-gray-400">Total Savings: </span>
              <span className="text-green-400 font-semibold">${totalSavings.toFixed(2)}</span>
            </div>
            <div className="bg-gray-800/50 rounded-lg px-4 py-2">
              <span className="text-gray-400">In Stock: </span>
              <span className="text-white font-semibold">
                {wishlistItems.filter(item => item.inStock).length} of {wishlistItems.length}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button 
            onClick={() => {
              wishlistItems.filter(item => item.inStock).forEach(item => addToCart(item.id))
            }}
            className="bg-gradient-to-r from-purple-600 to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
          >
            Add All to Cart
          </button>
          <button 
            onClick={() => setWishlistItems(items => items.filter(item => item.inStock))}
            className="bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all duration-300"
          >
            Remove Out of Stock
          </button>
          <Link 
            href="/products"
            className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300 border border-gray-600"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item, index) => (
            <div 
              key={item.id}
              className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-purple-500/20 transform hover:scale-[1.02] transition-all duration-300 relative"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Stock Status Badge */}
              <div className="absolute top-3 left-3 z-10">
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                  item.inStock 
                    ? 'bg-green-500 text-white' 
                    : 'bg-red-500 text-white'
                }`}>
                  {item.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {/* Discount Badge */}
              <div className="absolute top-3 right-12 z-10">
                <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  -{calculateDiscount(item.originalPrice, item.price)}%
                </span>
              </div>

              {/* Remove from Wishlist Button */}
              <button
                onClick={() => removeFromWishlist(item.id)}
                className="absolute top-3 right-3 z-10 p-2 rounded-full bg-gray-800/80 backdrop-blur-sm hover:bg-red-600 transition-colors duration-200"
              >
                <HeartIconSolid className="h-4 w-4 text-red-500 hover:text-white" />
              </button>

              {/* Product Image */}
              <div className="h-64 bg-gradient-to-b from-purple-800/20 to-gray-800 flex items-center justify-center overflow-hidden relative">
                {item.image.startsWith('/api/placeholder') ? (
                  <div className="text-6xl opacity-50">🧛‍♀️</div>
                ) : (
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover object-center hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement!.innerHTML = '<div class="text-6xl opacity-50">🧛‍♀️</div>';
                    }}
                  />
                )}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button 
                    onClick={() => addToCart(item.id)}
                    disabled={!item.inStock}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${
                      item.inStock
                        ? 'bg-purple-600 text-white hover:bg-purple-700 transform hover:scale-105'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                {/* Category & Added Date */}
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-purple-400 font-medium">{item.category}</span>
                  <span className="text-xs text-gray-400">Added {formatDate(item.addedDate)}</span>
                </div>

                {/* Product Name */}
                <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                  {item.name}
                </h3>

                {/* Size and Color */}
                {(item.size || item.color) && (
                  <div className="flex gap-4 mb-3">
                    {item.size && (
                      <span className="text-gray-300 text-sm">Size: <span className="text-white">{item.size}</span></span>
                    )}
                    {item.color && (
                      <span className="text-gray-300 text-sm">Color: <span className="text-white">{item.color}</span></span>
                    )}
                  </div>
                )}

                {/* Price Section */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xl font-bold text-red-400">{item.price}</span>
                  <span className="text-lg text-gray-500 line-through">{item.originalPrice}</span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className={`h-3 w-3 ${i < 4 ? 'text-yellow-400' : 'text-gray-600'}`} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400">(4.0)</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => addToCart(item.id)}
                    disabled={!item.inStock}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 ${
                      item.inStock
                        ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 transform hover:scale-105'
                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingBagIcon className="h-4 w-4 inline mr-2" />
                    {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="px-4 py-2 border border-red-500 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-colors duration-200"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recently Viewed or Recommended */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">You Might Also Like</h2>
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 border border-purple-500/20 text-center">
            <p className="text-gray-300 mb-4">
              Discover more dark treasures that match your style
            </p>
            <Link 
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-red-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
            >
              Explore More Products
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
