'use client'

import { Category } from '@/data/products'

interface CategoriesProps {
  categories: Category[];
  isVisible: boolean;
}

export default function Categories({ categories, isVisible }: CategoriesProps) {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-black via-purple-900 to-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16 text-white">
          Explore Our <span className="bg-gradient-to-r from-purple-400 to-red-400 bg-clip-text text-transparent">Dark Collections</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className={`group cursor-pointer transition-all duration-500 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-8 text-center border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{category.name}</h3>
                <p className="text-gray-400 text-sm">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
