// Chilean RUT Validation
    export const cleanRut = (rut: string): string => {
      return rut.replace(/[^0-9kK-]/g, '');
    };

    export const formatRut = (rut: string): string => {
      const cleaned = cleanRut(rut);
      if (cleaned.length < 2) return cleaned;
      
      const dv = cleaned.slice(-1);
      const numbers = cleaned.slice(0, -1);
      const formatted = numbers.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      
      return `${formatted}-${dv}`;
    };

    export const validateRut = (rut: string): { isValid: boolean; message?: string } => {
      const cleaned = cleanRut(rut);
      
      if (cleaned.length < 2) {
        return { isValid: false, message: 'RUT inválido' };
      }
      
      return { isValid: true };
    };

    // Chilean Mobile Phone Validation
    export const cleanPhone = (phone: string): string => {
      return phone.replace(/\D/g, '');
    };

    export const formatPhone = (phone: string): string => {
      const cleaned = cleanPhone(phone);
      if (cleaned.length === 0) return '';
      return cleaned;
    };

    export const validatePhone = (phone: string): { isValid: boolean; message?: string } => {
      const cleaned = cleanPhone(phone);
      
      if (cleaned.length !== 9) {
        return { isValid: false, message: 'Teléfono debe tener 9 dígitos' };
      }
      
      return { isValid: true };
    };
