'use client'

interface HeroProps {
  isVisible: boolean;
}

export default function Hero({ isVisible }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-900 via-purple-900 to-black">
      {/* Background Image */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-red-900/50">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: "url('/images/homebg/homebg.png')",
          }}
        ></div>
      </div>
      {/* Additional overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30"></div>

      <div className={`relative z-10 text-center px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-red-400 to-purple-600 bg-clip-text text-transparent drop-shadow-2xl">
          VampGen
        </h1>
      </div>
    </section>
  )
}
