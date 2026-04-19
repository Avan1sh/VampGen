'use client'

interface HeroProps {
  isVisible: boolean;
}

export default function Hero({ isVisible }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
          style={{
            backgroundImage: "url('/images/homebg/homebg.png')",
          }}
        ></div>
      </div>
      {/* Subtle purple tint overlay */}
      <div className="absolute inset-0 bg-purple-900/30"></div>
      {/* Additional overlay for smooth transition into the next section */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black"></div>


    </section>
  )
}
