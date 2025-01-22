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

  const dv = cleaned.slice(-1).toUpperCase();
  const numbers = cleaned.slice(0, -1);
  
  if (!/^\d+$/.test(numbers)) {
    return { isValid: false, message: 'RUT debe contener solo números' };
  }
  
  const numbersInt = parseInt(numbers);
  if (numbersInt < 1 || numbersInt > 99999999) {
    return { isValid: false, message: 'RUT fuera de rango válido' };
  }

  let sum = 0;
  let multiplier = 2;
  
  // Calculate verification digit
  for (let i = numbers.length - 1; i >= 0; i--) {
    sum += parseInt(numbers[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  
  const expectedDV = 11 - (sum % 11);
  let calculatedDV: string;
  
  if (expectedDV === 11) calculatedDV = '0';
  else if (expectedDV === 10) calculatedDV = 'K';
  else calculatedDV = expectedDV.toString();
  
  if (dv !== calculatedDV) {
    return { isValid: false, message: 'Dígito verificador incorrecto' };
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
  
  if (cleaned[0] !== '9') {
    return { isValid: false, message: 'Teléfono móvil debe comenzar con 9' };
  }
  
  return { isValid: true };
};