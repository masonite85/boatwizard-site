import { Anchor } from "lucide-react";
import logoPath from "@assets/BoatWizardLogoNoTag-01.png";

export default function Footer() {
  return (
    <footer className="text-white py-8 bg-[#030817]">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                <img 
                  src={logoPath} 
                  alt="BoatWizard Logo" 
                  className="h-8 w-auto"
                />
              </button>
            </div>

          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Engine Repair</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Maintenance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mobile Service</a></li>

            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Brands</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Mercury</li>
              <li>Yamaha</li>
              <li>Suzuki</li>
              <li>Evinrude</li>
              <li>Honda</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <div>616-439-4452</div>
              <div>Grant, MI</div>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
