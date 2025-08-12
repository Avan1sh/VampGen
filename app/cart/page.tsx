'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { TrashIcon, MinusIcon, PlusIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { HeartIcon } from '@heroicons/react/24/solid'

interface CartItem {
  id: number
  name: string
  price: string
  originalPrice: string
  image: string
  category: string
  quantity: number
  size?: string
  color?: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Sample cart data - in real app, this would come from context/state management
  useEffect(() => {
    // Simulate loading cart data
    const sampleCartItems: CartItem[] = [
      {
        id: 1,
        name: "Midnight Velvet Coat",
        price: "$129.99",
        originalPrice: "$179.99",
        image: "/images/Product/midnight-velvet-coat.png",
        category: "Outerwear",
        quantity: 1,
        size: "M",
        color: "Black"
      },
      {
        id: 2,
        name: "Gothic Rose Dress",
        price: "$89.99",
        originalPrice: "$119.99",
        image: "/images/Product/gothic-rose-dress.png",
        category: "Dresses",
        quantity: 2,
        size: "S",
        color: "Dark Red"
      },
      {
        id: 4,
        name: "Vampire Crown Necklace",
        price: "$39.99",
        originalPrice: "$59.99",
        image: "/images/Product/vampire-crown-necklace.png",
        category: "Accessories",
        quantity: 1
      }
    ]
    
    setTimeout(() => {
      setCartItems(sampleCartItems)
      setIsLoading(false)
    }, 500)
  }, [])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const moveToWishlist = (id: number) => {
    // In real app, this would add to wishlist and remove from cart
    removeItem(id)
    alert('Item moved to wishlist!')
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''))
      return total + (price * item.quantity)
    }, 0)
  }

  const calculateSavings = () => {
    return cartItems.reduce((total, item) => {
      const originalPrice = parseFloat(item.originalPrice.replace('$', ''))
      const salePrice = parseFloat(item.price.replace('$', ''))
      return total + ((originalPrice - salePrice) * item.quantity)
    }, 0)
  }

  const subtotal = calculateSubtotal()
  const savings = calculateSavings()
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-400"></div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-black">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center">
            <ShoppingBagIcon className="w-24 h-24 text-gray-400 mx-auto mb-8" />
            <h1 className="text-4xl font-bold text-white mb-4">Your Cart is Empty</h1>
            <p className="text-gray-300 text-lg mb-8">
              Discover our dark collection and add some mysterious pieces to your wardrobe.
            </p>
            <Link 
              href="/products"
              className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-red-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-red-700 transition-all duration-300 transform hover:scale-105"
            >
              Continue Shopping
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
          <h1 className="text-4xl font-bold text-white mb-2">Shopping Cart</h1>
          <p className="text-gray-300">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your dark collection
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <div 
                key={item.id}
                className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 border border-purple-500/20 transform hover:scale-[1.02] transition-all duration-300"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Product Image */}
                  <div className="w-full md:w-48 h-48 bg-gradient-to-b from-purple-800/20 to-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
                    {item.image.startsWith('/api/placeholder') ? (
                      <div className="text-6xl opacity-50">🧛‍♀️</div>
                    ) : (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover object-center"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.innerHTML = '<div class="text-6xl opacity-50">🧛‍♀️</div>';
                        }}
                      />
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
                        <p className="text-purple-400 text-sm">{item.category}</p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-400 transition-colors duration-200"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>

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

                    {/* Price */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold text-red-400">{item.price}</span>
                      <span className="text-lg text-gray-500 line-through">{item.originalPrice}</span>
                      <span className="text-sm text-green-400 font-semibold">
                        Save {Math.round(((parseFloat(item.originalPrice.replace('$', '')) - parseFloat(item.price.replace('$', ''))) / parseFloat(item.originalPrice.replace('$', ''))) * 100)}%
                      </span>
                    </div>

                    {/* Quantity and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-gray-300 text-sm">Quantity:</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white transition-colors duration-200"
                          >
                            <MinusIcon className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center text-white font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white transition-colors duration-200"
                          >
                            <PlusIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => moveToWishlist(item.id)}
                        className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors duration-200"
                      >
                        <HeartIcon className="w-4 h-4" />
                        <span className="text-sm">Move to Wishlist</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-6 border border-purple-500/20 sticky top-8">
              <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-400">
                  <span>You Save:</span>
                  <span>-${savings.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping:</span>
                  <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax:</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-600 pt-3">
                  <div className="flex justify-between text-xl font-bold text-white">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {shipping > 0 && (
                <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-3 mb-6">
                  <p className="text-purple-300 text-sm text-center">
                    Add ${(100 - subtotal).toFixed(2)} more for FREE shipping!
                  </p>
                </div>
              )}

              <button className="w-full bg-gradient-to-r from-purple-600 to-red-600 text-white font-bold py-4 rounded-lg hover:from-purple-700 hover:to-red-700 transition-all duration-300 transform hover:scale-105 mb-4">
                Proceed to Checkout
              </button>

              <Link 
                href="/products"
                className="w-full block text-center py-3 text-purple-400 hover:text-purple-300 transition-colors duration-200 border border-purple-500/30 rounded-lg hover:bg-purple-900/20"
              >
                Continue Shopping
              </Link>
            </div>
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
