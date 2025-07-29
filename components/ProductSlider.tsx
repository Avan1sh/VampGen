'use client'

import { useState, useEffect } from 'react'
import { Button } from '@heroui/button'
import { Product } from '@/data/products'

interface ProductSliderProps {
  products: Product[];
  onShopNow: () => void;
}

export default function ProductSlider({ products, onShopNow }: ProductSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(timer)
  }, [products.length])

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 via-purple-900 to-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Featured <span className="bg-gradient-to-r from-purple-400 to-red-400 bg-clip-text text-transparent">Products</span>
        </h2>
        
        {/* Slider Container */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-gray-800 to-gray-900 border border-purple-500/20">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {products.map((product) => (
                <div key={product.id} className="w-full flex-shrink-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Product Image */}
                    <div className="md:w-1/2 h-80 md:h-[28rem] bg-gradient-to-b from-purple-800/20 to-gray-800 flex items-center justify-center overflow-hidden">
                      {product.image.startsWith('/api/placeholder') ? (
                        <div className="text-8xl opacity-50">🧛‍♀️</div>
                      ) : (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover object-center"
                          onError={(e) => {
                            console.log('ProductSlider - Image failed to load:', product.image);
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.parentElement!.innerHTML = '<div class="text-8xl opacity-50">🧛‍♀️</div>';
                          }}
                          onLoad={() => {
                            console.log('ProductSlider - Image loaded successfully:', product.image);
                          }}
                        />
                      )}
                    </div>
                    
                    {/* Product Info */}
                    <div className="md:w-1/2 p-8 flex flex-col justify-center">
                      <div className="text-sm text-purple-400 mb-2">{product.category}</div>
                      <h3 className="text-3xl font-bold text-white mb-4">{product.name}</h3>
                      <p className="text-gray-300 mb-6 leading-relaxed">{product.description}</p>
                      
                      <div className="flex items-center gap-4 mb-6">
                        <span className="text-3xl font-bold text-red-400">{product.price}</span>
                        <span className="text-lg text-gray-500 line-through">{product.originalPrice}</span>
                      </div>
                      
                      <div className="flex gap-4">
                        <Button
                          size="lg"
                          className="bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 text-white font-semibold px-6 py-3 rounded-full transform hover:scale-105 transition-all duration-300"
                          onClick={onShopNow}
                        >
                          Shop Now
                        </Button>
                        <Button
                          variant="bordered"
                          size="lg"
                          className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black px-6 py-3 rounded-full transition-all duration-300"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Slider Controls */}
          <div className="flex justify-center mt-8 gap-4">
            {/* Previous Button */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + products.length) % products.length)}
              className="p-3 rounded-full bg-purple-600/20 hover:bg-purple-600/40 text-white transition-all duration-300 hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            {/* Dots Indicator */}
            <div className="flex items-center gap-2">
              {products.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-purple-400 scale-125' 
                      : 'bg-gray-600 hover:bg-purple-600/50'
                  }`}
                />
              ))}
            </div>
            
            {/* Next Button */}
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % products.length)}
              className="p-3 rounded-full bg-purple-600/20 hover:bg-purple-600/40 text-white transition-all duration-300 hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
