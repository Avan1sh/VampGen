'use client'

import { Category } from '@/data/products'
import Link from 'next/link'

interface FeaturedCategoriesProps {
  categories: Category[]
  isVisible: boolean
}

export default function FeaturedCategories({ categories, isVisible }: FeaturedCategoriesProps) {
  return (
    <section className="py-20 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 bg-gradient-to-br from-white to-purple-300 bg-clip-text text-transparent drop-shadow-sm">
            Shop By Category
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Explore our diverse collection organized by style and purpose. From everyday gothic wear to special occasion pieces.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              href={`/products?category=${encodeURIComponent(category.name)}`}
              className={`group cursor-pointer transition-all duration-500 hover:scale-105 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-black/40 backdrop-blur-md rounded-3xl p-8 border border-white/5 hover:border-purple-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] text-center relative overflow-hidden flex flex-col h-full">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="text-6xl mb-6 flex justify-center items-center">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:bg-purple-500/20 group-hover:scale-110 transition-all duration-500 shadow-inner">
                    {category.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors relative z-10">
                  {category.name}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed relative z-10">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link 
            href="/collections"
            className="inline-block px-10 py-4 bg-white/5 backdrop-blur-md border border-purple-500/30 text-purple-100 font-bold tracking-wide rounded-full hover:bg-white/10 hover:border-purple-400 hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all duration-300 transform hover:-translate-y-1"
          >
            View All Collections
          </Link>
        </div>
      </div>
    </section>
  )
}
