import { useEffect } from 'react';
import HeroSection from '@/sections/HeroSection';
import LookbookSection from '@/sections/LookbookSection';
import FeaturedCollectionSection from '@/sections/FeaturedCollectionSection';
import MarqueeStatsSection from '@/sections/MarqueeStatsSection';
import EditorialShowcaseSection from '@/sections/EditorialShowcaseSection';
import ShopByWorldSection from '@/sections/ShopByWorldSection';
import NewsletterSection from '@/sections/NewsletterSection';

export default function HomePage() {
  // When arriving with a hash (e.g. "/#featured" from the cart page),
  // smooth-scroll to that section after it has rendered.
  useEffect(() => {
    const { hash } = window.location;
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) {
      requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }));
    }
  }, []);

  return (
    <main>
      <HeroSection />
      <LookbookSection />
      <FeaturedCollectionSection />
      <MarqueeStatsSection />
      <EditorialShowcaseSection />
      <ShopByWorldSection />
      <NewsletterSection />
    </main>
  );
}
