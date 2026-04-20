'use client'

import { sliderProducts } from '@/data/products'

export default function StatsSection() {
  const totalProducts = sliderProducts.length
  const uniqueCategories = new Set(sliderProducts.map(p => p.category))
  const categories = Array.from(uniqueCategories).length
  const avgDiscount = Math.round(
    sliderProducts.reduce((acc, product) => {
      const original = parseFloat(product.originalPrice.replace('$', ''))
      const sale = parseFloat(product.price.replace('$', ''))
      return acc + ((original - sale) / original) * 100
    }, 0) / totalProducts
  )

  const stats = [
    { label: 'Products', value: totalProducts, icon: '🖤' },
    { label: 'Categories', value: categories, icon: '📦' },
    { label: 'Avg Savings', value: `${avgDiscount}%`, icon: '💰' },
    { label: 'Happy Customers', value: '1.2K+', icon: '😊' }
  ]

  return (
    <section className="py-16 bg-gradient-to-r from-purple-900 to-red-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-purple-200 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
