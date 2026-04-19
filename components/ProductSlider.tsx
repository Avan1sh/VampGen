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
    <section className="py-20 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-16 bg-gradient-to-br from-white to-purple-300 bg-clip-text text-transparent drop-shadow-sm text-center">
          Featured Products
        </h2>
        
        {/* Slider Container */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-3xl bg-black/40 backdrop-blur-md border border-white/5 shadow-[0_0_30px_rgba(168,85,247,0.1)]">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {products.map((product) => (
                <div key={product.id} className="w-full flex-shrink-0">
                  <div className="flex flex-col md:flex-row">
                    {/* Product Image */}
                    <div className="md:w-1/2 h-80 md:h-[28rem] bg-black/40 flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
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
                    <div className="md:w-1/2 p-10 flex flex-col justify-center bg-gradient-to-br from-white/[0.02] to-transparent">
                      <div className="text-xs tracking-wider text-purple-300 uppercase font-semibold mb-3">{product.category}</div>
                      <h3 className="text-4xl font-bold text-white mb-4">{product.name}</h3>
                      <p className="text-gray-400 mb-8 leading-relaxed text-lg">{product.description}</p>
                      
                      <div className="flex items-center gap-4 mb-8">
                        <span className="text-4xl font-black text-white">{product.price}</span>
                        <span className="text-xl text-purple-300/60 line-through">{product.originalPrice}</span>
                      </div>
                      
                      <div className="flex gap-4">
                        <Button
                          size="lg"
                          className="flex-1 bg-gradient-to-r from-purple-600 to-purple-800 border border-purple-500/50 text-white py-3 px-6 rounded-xl font-bold hover:from-purple-500 hover:to-purple-700 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all duration-300 transform hover:-translate-y-1"
                          onClick={onShopNow}
                        >
                          Shop Now
                        </Button>
                        <Button
                          variant="bordered"
                          size="lg"
                          className="flex-1 border border-white/20 text-white hover:bg-white/10 hover:border-white/30 px-6 py-3 rounded-xl font-bold transition-all duration-300"
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
