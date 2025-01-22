import React from 'react';
    import AvailabilityChecker from './components/AvailabilityChecker';
    import { Menu } from 'lucide-react';

    function App() {
      return (
        <div className="min-h-screen bg-gray-100">
          {/* Header */}
          <header className="bg-black text-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex items-center justify-between py-3">
                <div className="flex items-center space-x-4">
                  <img 
                    src="https://vtr.com/nuevo/static/logo-vtr-mobile-c3fd646ecc204518e6e088d19929bbbd.svg" 
                    alt="VTR Logo" 
                    className="h-8"
                  />
                </div>
                <button className="p-2">
                  <Menu size={24} />
                </button>
              </div>
            </div>
          </header>

          {/* Availability Checkers */}
          <div className="space-y-4">
            <div className="px-0">
              <AvailabilityChecker />
            </div>
            {/* Main content */}
            <main className="max-w-7xl mx-auto px-4 py-6">
              <p className="text-gray-600">Sección de productos o planes</p>
            </main>
            <div className="max-w-7xl mx-auto px-4">
              <AvailabilityChecker isInitiallyExpanded={true} noAccordion={true} />
            </div>
             {/* Duplicated main content */}
            <main className="max-w-7xl mx-auto px-4 py-6">
              <p className="text-gray-600">Resto del sitio</p>
            </main>
          </div>
        </div>
      );
    }

    export default App;
