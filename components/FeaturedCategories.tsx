'use client'

import { Category } from '@/data/products'
import Link from 'next/link'

interface FeaturedCategoriesProps {
  categories: Category[]
  isVisible: boolean
}

export default function FeaturedCategories({ categories, isVisible }: FeaturedCategoriesProps) {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Shop by <span className="bg-gradient-to-r from-purple-400 to-red-400 bg-clip-text text-transparent">Category</span>
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
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 text-center">
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-400 text-sm">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/collections"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-red-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            View All Collections
          </Link>
        </div>
      </div>
    </section>
  )
}
