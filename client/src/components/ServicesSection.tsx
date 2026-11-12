import { Wrench, Settings, Ambulance, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ServicesSection() {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const services = [
    {
      icon: Wrench,
      title: "Engine Repair & Maintenance",
      items: [
        "Carburetor service",
        "Fuel system cleaning",
        "Electrical diagnostics",
        "Seasonal tune-ups",
        "Oil changes",
        "Winterization service",
        "Pre-season preparation"
      ]
    }
  ];

  return (
    <section id="services" className="py-16 bg-white relative overflow-hidden">
      {/* Marine wave pattern background with gradient fade */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wave-pattern" x="0" y="0" width="120" height="60" patternUnits="userSpaceOnUse">
              <path d="M0 30 Q30 10 60 30 T120 30" stroke="#1e40af" strokeWidth="2" fill="none"/>
              <path d="M0 40 Q30 20 60 40 T120 40" stroke="#1e40af" strokeWidth="1.5" fill="none"/>
              <circle cx="20" cy="45" r="1" fill="#1e40af" opacity="0.6"/>
              <circle cx="80" cy="35" r="1" fill="#1e40af" opacity="0.6"/>
              <circle cx="100" cy="50" r="0.8" fill="#1e40af" opacity="0.4"/>
            </pattern>
            <linearGradient id="fade-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity={1}/>
              <stop offset="15%" stopColor="white" stopOpacity={0.7}/>
              <stop offset="100%" stopColor="white" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#wave-pattern)" opacity="0.1"/>
          <rect width="100%" height="100%" fill="url(#fade-gradient)"/>
        </svg>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold marine-navy mb-4"> Marine Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Comprehensive motor repair and maintenance services include:</p>
        </div>
        
        <div className="grid md:grid-cols-1 gap-8 max-w-4xl mx-auto">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="text-center mb-8">
                    <IconComponent className="text-marine-blue text-4xl mb-3 mx-auto" />
                    <h3 className="text-xl font-semibold marine-navy">{service.title}</h3>
                  </div>
                  <div className="max-w-lg mx-auto">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-600 mb-6">
                      {service.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center">
                          <Check className="text-marine-blue mr-2 h-4 w-4 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button 
                    className="w-full bg-marine-light hover:bg-blue-600 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 relative overflow-hidden group"
                    onClick={scrollToContact}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-300/0 via-blue-300/30 to-blue-300/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <span className="relative z-10">Request Service</span>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
