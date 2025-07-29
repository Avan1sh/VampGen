'use client'

import { Product } from '@/data/products'

interface ProductGridProps {
  products: Product[];
  isVisible: boolean;
}

export default function ProductGrid({ products, isVisible }: ProductGridProps) {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 via-purple-900 to-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          More <span className="bg-gradient-to-r from-red-400 to-purple-400 bg-clip-text text-transparent">Products</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className={`group cursor-pointer transition-all duration-500 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${(index + 4) * 100}ms` }}
            >
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
                <div className="h-80 bg-gradient-to-b from-purple-800/20 to-gray-800 flex items-center justify-center overflow-hidden">
                  {product.image.startsWith('/api/placeholder') ? (
                    <div className="text-6xl opacity-50 group-hover:opacity-70 transition-opacity duration-300">
                      🧛‍♀️
                    </div>
                  ) : (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        console.log('Image failed to load:', product.image);
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = '<div class="text-6xl opacity-50">🧛‍♀️</div>';
                      }}
                    />
                  )}
                </div>
                <div className="p-6">
                  <div className="text-sm text-purple-400 mb-2">{product.category}</div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="text-xl font-bold text-red-400">{product.price}</div>
                    <div className="text-sm text-gray-500 line-through">{product.originalPrice}</div>
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
