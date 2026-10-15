import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MobileServiceSection from "@/components/MobileServiceSection";
import ServicesSection from "@/components/ServicesSection";
import BrandsSection from "@/components/BrandsSection";
import AboutSection from "@/components/AboutSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <BrandsSection />
      <MobileServiceSection />
      <ServicesSection />
      <ContactSection />
      <AboutSection />
      <Footer />
    </div>
  );
}
