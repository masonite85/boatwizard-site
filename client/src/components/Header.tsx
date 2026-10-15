import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoPath from "@assets/BoatWizardLogoNoTag-01.png";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-marine-navy shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => scrollToSection('home')}
            >
              <img 
                src={logoPath} 
                alt="BoatWizard Logo" 
                className="h-14 w-auto"
              />
            </button>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-white hover:text-marine-light transition-all duration-300 relative group py-2 px-4 rounded-lg hover:bg-blue-600/20 hover:shadow-lg hover:scale-105"
            >
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/20 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-white hover:text-marine-light transition-all duration-300 relative group py-2 px-4 rounded-lg hover:bg-blue-600/20 hover:shadow-lg hover:scale-105"
            >
              <span className="relative z-10">Services</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/20 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-white hover:text-marine-light transition-all duration-300 relative group py-2 px-4 rounded-lg hover:bg-blue-600/20 hover:shadow-lg hover:scale-105"
            >
              <span className="relative z-10">Contact</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/20 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-marine-blue"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-marine-blue">
            <div className="flex flex-col space-y-4 pt-4">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-white hover:text-marine-light transition-all duration-300 text-left py-2 px-3 rounded-lg hover:bg-blue-600/20 hover:translate-x-2 relative group"
              >
                <span className="relative z-10">Home</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-white hover:text-marine-light transition-all duration-300 text-left py-2 px-3 rounded-lg hover:bg-blue-600/20 hover:translate-x-2 relative group"
              >
                <span className="relative z-10">Services</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-white hover:text-marine-light transition-all duration-300 text-left py-2 px-3 rounded-lg hover:bg-blue-600/20 hover:translate-x-2 relative group"
              >
                <span className="relative z-10">Contact</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
