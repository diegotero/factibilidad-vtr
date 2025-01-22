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

      {/* Availability Checker */}
      <AvailabilityChecker />

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <p className="text-gray-600">Contenido principal de la aplicación...</p>
      </main>
    </div>
  );
}

export default App;