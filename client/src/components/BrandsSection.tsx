import suzukiLogo from "@assets/suzuki-seeklogo.png";
import yamahaLogo from "@assets/yamaha-seeklogo.png";
import evinrudeLogo from "@assets/evinrude-seeklogo.png";
import mercuryLogo from "@assets/logo1.jpg";
import hondaLogo from "@assets/hondaLogoSmall-04-04.png";
import "@fontsource/revalia";

export default function BrandsSection() {
  const brands = [
    { name: "MERCURY", logo: "M", hasImage: true, image: mercuryLogo },
    { name: "YAMAHA", logo: "Y", hasImage: true, image: yamahaLogo },
    { name: "EVINRUDE", logo: "E", hasImage: true, image: evinrudeLogo }
  ];

  return (
    <section className="pt-1 pb-8 bg-white relative overflow-hidden">
      {/* Subtle marine background pattern */}
      <div className="absolute inset-0 opacity-40">
        {/* Wave-like patterns */}
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="none">
          <path d="M0,100 Q300,40 600,100 T1200,100 L1200,0 L0,0 Z" fill="currentColor" className="text-blue-400 opacity-30"/>
          <path d="M0,160 Q300,100 600,160 T1200,160 L1200,60 L0,60 Z" fill="currentColor" className="text-blue-300 opacity-20"/>
        </svg>
        
        <svg className="absolute bottom-0 left-0 w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="none">
          <path d="M0,300 Q300,360 600,300 T1200,300 L1200,400 L0,400 Z" fill="currentColor" className="text-blue-400 opacity-30"/>
          <path d="M0,240 Q300,300 600,240 T1200,240 L1200,340 L0,340 Z" fill="currentColor" className="text-blue-300 opacity-20"/>
        </svg>
      </div>
      <div className="container mx-auto px-4 relative z-10 h-full flex items-center justify-center">
        <div className="max-w-4xl mx-auto">
          {/* Single row - 3 logos with custom spacing */}
          <div className="flex justify-center items-center pt-[40px] pb-[40px]">
            {/* Mercury Logo */}
            <div className="flex items-center justify-center h-16">
              <img 
                src={mercuryLogo} 
                alt="Logo"
                className="h-16 w-auto object-contain"
              />
            </div>
            
            {/* Space before Evinrude */}
            <div className="w-16"></div>
            
            {/* Evinrude Logo */}
            <div className="flex items-center justify-center h-16">
              <img 
                src={evinrudeLogo} 
                alt="Evinrude Logo"
                className="h-8 w-auto object-contain"
              />
            </div>
            
            {/* Space before Yamaha */}
            <div className="w-16"></div>
            
            {/* Yamaha Logo */}
            <div className="flex items-center justify-center h-16">
              <img 
                src={yamahaLogo} 
                alt="Yamaha Logo"
                className="h-12 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
