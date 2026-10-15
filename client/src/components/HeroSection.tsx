import { Phone, Wrench, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@assets/pexels-daniel-szabat-259816403-13040492.jpg";

export default function HeroSection() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative h-72 flex items-center justify-center overflow-hidden">
      {/* Hero background image */}
      <img 
        src={heroImage}
        alt="Professional boat repair services - BoatWizard marine experts"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-marine-navy bg-opacity-70"></div>
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Expert Marine<br />
          <span className="marine-light">Repair Services</span>
        </h1>
        <p className="md:text-xl mb-8 text-gray-200 text-[16px] ml-[0px] mr-[0px]">Professional boat repair and maintenance services with mobile service options available.</p>
        <div className="flex justify-center gap-4">
          <Button 
            size="lg" 
            className="bg-marine-light hover:bg-blue-600 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 relative overflow-hidden group"
            onClick={scrollToContact}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300/0 via-blue-300/30 to-blue-300/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <span className="relative z-10">Request Service</span>
          </Button>
          <button 
            className="h-11 w-11 rounded-full bg-blue-600 hover:ring-2 hover:ring-white transition-all duration-300 flex items-center justify-center"
            onClick={() => window.open('https://www.facebook.com/profile.php?id=61576889759256', '_blank')}
          >
            <span className="text-white text-3xl font-bold">f</span>
          </button>
        </div>
      </div>
    </section>
  );
}
