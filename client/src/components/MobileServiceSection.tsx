import { Truck, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import boatMotorImg from "@assets/Boat_Motor_1768693633233.png";

export default function MobileServiceSection() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 bg-[#040818]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center text-[#ffffff]">
            <div className="flex justify-center overflow-hidden">
              <div className="w-[60%] overflow-hidden flex items-center justify-center">
                <img 
                  src={boatMotorImg} 
                  alt="Professional outboard boat motor - BoatWizard service" 
                  className="w-full h-auto drop-shadow-[0_0_15px_rgba(59,130,246,0.3)] object-cover" 
                  style={{ margin: '-3px' }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center mb-4">
                <Truck className="text-marine-blue text-3xl mr-3" />
                <h2 className="text-3xl font-bold text-white">Mobile Service Available</h2>
              </div>
              <p className="mb-6 text-lg text-[#fcfcfc]">
                Can't bring your boat to us? No problem! Our mobile repair service brings expert technicians directly to your marina, dock, or location with all the tools and parts needed for most repairs.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-[#ffffff]">
                  <CheckCircle className="text-marine-blue mr-3 h-5 w-5" />
                  Servicing the Greater Grand Rapids Michigan Area
                </li>
                <li className="flex items-center text-[#ffffff]">
                  <CheckCircle className="text-marine-blue mr-3 h-5 w-5" />
                  Fully Equipped Mobile Workshop
                </li>
                
              </ul>
              <Button 
                className="bg-marine-blue hover:bg-blue-800 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 relative overflow-hidden group"
                onClick={scrollToContact}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-300/0 via-blue-300/30 to-blue-300/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative z-10">Request Service</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
