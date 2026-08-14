export const validators = {
  isEmail: (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  isPhoneNumber: (phone) => {
    return /^\+?[1-9]\d{1,14}$/.test(phone.replace(/\D/g, ''));
  },

  isBusNumber: (busNumber) => {
    return /^[A-Z]{2,3}\d{1,4}$/.test(busNumber);
  },

  isValidRoute: (route) => {
    return route && route.startPoint && route.endPoint && route.distance > 0;
  },

  isValidLocation: (lat, lng) => {
    return typeof lat === 'number' && typeof lng === 'number' && 
           lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
  }
};

export const validate = (value, rule) => {
  if (typeof rule === 'function') {
    return rule(value);
  }
  return validators[rule] ? validators[rule](value) : false;
};
