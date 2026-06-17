import { Routes, Route } from 'react-router';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { Toaster } from '@/components/ui/sonner';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import FilmGrainOverlay from '@/components/FilmGrainOverlay';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import ProductDetailPage from '@/pages/ProductDetailPage';
import CartPage from '@/pages/CartPage';

export default function App() {
  useSmoothScroll();

  return (
    <div className="bg-void min-h-screen">
      <CustomCursor />
      <FilmGrainOverlay />
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>

      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
}
