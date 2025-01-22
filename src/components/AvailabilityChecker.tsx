import React, { useState, useEffect, useRef } from 'react';
    import { MapPin, ChevronDown, ChevronUp, Crosshair, Check, Loader2, X } from 'lucide-react';
    import { validateRut, formatRut, validatePhone, formatPhone } from '../utils/validation';

    // Define possible states for the availability check
    type CheckState = 'initial' | 'checking' | 'available' | 'unavailable';

    // Define the form data structure
    interface FormData {
      address: string;
      isApartment: boolean;
      rut: string;
      phone: string;
    }

    interface AvailabilityCheckerProps {
      isInitiallyExpanded?: boolean;
      noAccordion?: boolean;
    }

    function AvailabilityChecker({ isInitiallyExpanded = false, noAccordion = false }: AvailabilityCheckerProps) {
      const [isExpanded, setIsExpanded] = useState(isInitiallyExpanded);
      const [checkState, setCheckState] = useState<CheckState>('initial');
      const [formData, setFormData] = useState<FormData>({
        address: '',
        isApartment: false,
        rut: '',
        phone: '',
      });

      // Validation states
      const [isAddressValid, setIsAddressValid] = useState(false);
      const [rutValidation, setRutValidation] = useState<{ isValid: boolean; message?: string }>({ isValid: false });
      const [phoneValidation, setPhoneValidation] = useState<{ isValid: boolean; message?: string }>({ isValid: false });
      const rutInputRef = useRef<HTMLInputElement>(null);

      const handleAddressChange = (value: string) => {
        setFormData(prev => ({ ...prev, address: value }));
        setIsAddressValid(value.length > 10);
      };

      const handleRutChange = (value: string) => {
        setFormData(prev => ({ ...prev, rut: value }));
        setRutValidation(validateRut(value));
      };

      const handleRutBlur = () => {
        if (rutInputRef.current) {
          const currentRut = rutInputRef.current.value;
          const formattedRut = formatRut(currentRut);
          if (currentRut !== formattedRut) {
            setFormData(prev => ({ ...prev, rut: formattedRut }));
            setRutValidation(validateRut(formattedRut));
          }
        }
      };

      const handlePhoneChange = (value: string) => {
        const formattedPhone = formatPhone(value);
        setFormData(prev => ({ ...prev, phone: formattedPhone }));
        setPhoneValidation(validatePhone(formattedPhone));
      };

      const handleUseLocation = () => {
        handleAddressChange('Av. Hernando de Aguirre 1133');
      };

      const handleSubmit = async () => {
        if (!isAddressValid) return;

        setCheckState('checking');
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Randomly determine availability for demo purposes
        const isAvailable = Math.random() > 0.5;
        setCheckState(isAvailable ? 'available' : 'unavailable');
      };

      const renderCheckingState = () => (
        <div className="p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="animate-spin text-blue-500" size={32} />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Estamos verificando el servicio en su dirección
              </h3>
              <div className="mt-2 space-y-2">
                <p className="text-sm text-gray-600 flex items-center justify-center">
                  <Check className="text-green-500 mr-2" size={16} />
                  Verificando los servicios existentes
                </p>
                <p className="text-sm text-gray-600 flex items-center justify-center">
                  <Loader2 className="animate-spin text-gray-400 mr-2" size={16} />
                  Verificando planes y ofertas disponibles
                </p>
              </div>
            </div>
          </div>
        </div>
      );

      const renderAvailableState = () => (
        <div className="p-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <Check className="text-green-500 mt-0.5 mr-3" size={20} />
              <div>
                <h4 className="font-semibold text-green-900">¡Tenemos factibilidad!</h4>
                <p className="text-sm text-green-800">
                  Podemos instalar el servicio en tu dirección:<br />
                  {formData.address}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Por favor, ingresa tus datos</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">RUT</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.rut}
                  onChange={(e) => handleRutChange(e.target.value)}
                  onBlur={handleRutBlur}
                  placeholder="Ej. 123456789"
                  maxLength={12}
                  ref={rutInputRef}
                  className={`w-full px-4 py-2 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 
                    ${rutValidation.isValid ? 'border-green-500' : 'border-gray-300'}`}
                />
                 {rutValidation.isValid && (
                  <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" size={20} />
                )}
                {rutValidation.message && (
                  <p className="mt-1 text-sm text-red-500">{rutValidation.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <div className="relative">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="Ej. 985923283"
                  maxLength={9}
                  className={`w-full px-4 py-2 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 
                    ${phoneValidation.isValid ? 'border-green-500' : 'border-gray-300'}`}
                />
                {phoneValidation.isValid && (
                  <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" size={20} />
                )}
                {phoneValidation.message && (
                  <p className="mt-1 text-sm text-red-500">{phoneValidation.message}</p>
                )}
              </div>
            </div>

            <button
              onClick={() => {}}
              disabled={!rutValidation.isValid || !phoneValidation.isValid}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300
                ${
                  rutValidation.isValid && phoneValidation.isValid
                    ? 'bg-pink-500 hover:bg-pink-600'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
            >
              Continuar
            </button>
          </div>
        </div>
      );

      const renderUnavailableState = () => (
        <div className="p-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <div className="text-yellow-400 mt-0.5 mr-3">
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-yellow-900">Actualmente no disponible</h4>
                <p className="text-sm text-yellow-800">
                  Por ahora, nuestro servicio no está disponible en tu dirección, pero estamos trabajando para expandir nuestra cobertura.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Déjanos tus datos</h3>
            <p className="text-sm text-gray-600">
              Te notificaremos cuando el servicio esté disponible en tu zona.
            </p>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">RUT</label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.rut}
                  onChange={(e) => handleRutChange(e.target.value)}
                  onBlur={handleRutBlur}
                  placeholder="Ej. 123456789"
                  maxLength={12}
                  ref={rutInputRef}
                  className={`w-full px-4 py-2 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 
                    ${rutValidation.isValid ? 'border-green-500' : 'border-gray-300'}`}
                />
                 {rutValidation.isValid && (
                  <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" size={20} />
                )}
                {rutValidation.message && (
                  <p className="mt-1 text-sm text-red-500">{rutValidation.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <div className="relative">
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="Ej. 985923283"
                  maxLength={9}
                  className={`w-full px-4 py-2 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 
                    ${phoneValidation.isValid ? 'border-green-500' : 'border-gray-300'}`}
                />
                {phoneValidation.isValid && (
                  <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" size={20} />
                )}
                {phoneValidation.message && (
                  <p className="mt-1 text-sm text-red-500">{phoneValidation.message}</p>
                )}
              </div>
            </div>

            <button
              onClick={() => {}}
              disabled={!rutValidation.isValid || !phoneValidation.isValid}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300
                ${
                  rutValidation.isValid && phoneValidation.isValid
                    ? 'bg-pink-500 hover:bg-pink-600'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
            >
              Continuar
            </button>
          </div>
        </div>
      );

      const renderInitialState = () => (
        <div className="p-4 space-y-4">
          <div className="text-center mb-6">
             {!noAccordion && (
              <h3 className="text-xl font-bold text-gray-900">
                Verifica la disponibilidad de los servicios&nbsp;en&nbsp;tu&nbsp;zona
              </h3>
             )}
             {noAccordion && (
              <div className="flex flex-col items-center">
                <MapPin className="text-blue-500 mb-2" size={48} />
                <h3 className="text-2xl font-bold text-gray-900">
                  Verifica la disponibilidad en tu zona
                </h3>
              </div>
             )}
            <p className="text-gray-600 mt-2">
              Ingresa tu dirección para conocer los planes disponibles en tu ubicación y asegurar una instalación exitosa.
            </p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Dirección completa
                </label>
                <button
                  onClick={handleUseLocation}
                  className="text-blue-500 flex items-center text-sm hover:text-blue-600"
                >
                  <Crosshair size={16} className="mr-1" />
                  Usar mi ubicación
                </button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleAddressChange(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 
                    ${isAddressValid ? 'border-green-500' : 'border-gray-300'}`}
                  placeholder="Ej: Av. Hernando de Aguirre 1133"
                />
                {isAddressValid && (
                  <Check className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500" size={20} />
                )}
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isApartment"
                checked={formData.isApartment}
                onChange={(e) => setFormData(prev => ({ ...prev, isApartment: e.target.checked }))}
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isApartment" className="ml-2 text-sm text-gray-700">
                ¿Es un Depto. o Casa Interior?
              </label>
            </div>

            <button
              onClick={handleSubmit}
              disabled={!isAddressValid}
              className={`w-full py-3 px-4 rounded-lg text-white font-medium transition-all duration-300
                ${
                  isAddressValid
                    ? 'bg-pink-500 hover:bg-pink-600'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
            >
              Consultar factibilidad
            </button>
          </div>
        </div>
      );

      const renderContent = () => {
        switch (checkState) {
          case 'checking':
            return renderCheckingState();
          case 'available':
            return renderAvailableState();
          case 'unavailable':
            return renderUnavailableState();
          default:
            return renderInitialState();
        }
      };

      return (
        <div className="w-full bg-white shadow-md rounded-lg border border-gray-100 transition-all duration-300">
          {!noAccordion && (
            <button
              onClick={() => {
                if (checkState !== 'initial') {
                  setCheckState('initial');
                }
                setIsExpanded(!isExpanded);
              }}
              className="w-full px-4 py-3 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              aria-expanded={isExpanded}
              aria-controls="availability-form"
            >
              <div className="flex items-center space-x-3">
                <MapPin className="text-blue-500" size={24} />
                <div>
                  <h2 className="font-semibold text-gray-900">Verifica la disponibilidad de los servicios&nbsp;en&nbsp;tu&nbsp;zona</h2>
                </div>
              </div>
              {isExpanded ? (
                <ChevronUp className="text-gray-500" size={20} />
              ) : (
                <ChevronDown className="text-gray-500" size={20} />
              )}
            </button>
          )}

          <div
            id="availability-form"
            className={`overflow-hidden transition-all duration-300 ${
              isExpanded || noAccordion ? 'max-h-[800px] border-t border-gray-100' : 'max-h-0'
            }`}
          >
            {renderContent()}
          </div>
        </div>
      );
    }

    export default AvailabilityChecker;
