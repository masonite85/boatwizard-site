import { IdCard, Award, Shield } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-white text-[14px] relative overflow-hidden">
      {/* Continuing marine wave pattern background */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="wave-pattern-about" x="0" y="0" width="120" height="60" patternUnits="userSpaceOnUse">
              <path d="M0 30 Q30 10 60 30 T120 30" stroke="#1e40af" strokeWidth="2" fill="none"/>
              <path d="M0 40 Q30 20 60 40 T120 40" stroke="#1e40af" strokeWidth="1.5" fill="none"/>
              <circle cx="20" cy="45" r="1" fill="#1e40af" opacity="0.6"/>
              <circle cx="80" cy="35" r="1" fill="#1e40af" opacity="0.6"/>
              <circle cx="100" cy="50" r="0.8" fill="#1e40af" opacity="0.4"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#wave-pattern-about)" opacity="0.06"/>
        </svg>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
            <h2 className="font-bold marine-navy mb-6 text-[32px]">8+ Years of Marine Excellence</h2>
            <p className="text-lg text-gray-600 mb-6">BoatWizard is a trusted choice for outboard motor repair and maintenance. Our certified technicians combine years of experience with the latest diagnostic equipment to keep your boat running at peak performance.</p>

            <div className="flex flex-wrap gap-8 justify-center">
              <div className="flex items-center text-gray-700">
                <IdCard className="text-marine-blue mr-2 h-5 w-5" />
                Mercury Certified
              </div>

              <div className="flex items-center text-gray-700">
                <Shield className="text-marine-blue mr-2 h-5 w-5" />
                Trusted Service
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
