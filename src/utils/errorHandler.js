export class BusTrackerError extends Error {
  constructor(message, code = 'UNKNOWN_ERROR') {
    super(message);
    this.code = code;
    this.name = 'BusTrackerError';
  }
}

export class APIError extends BusTrackerError {
  constructor(message, statusCode) {
    super(message, 'API_ERROR');
    this.statusCode = statusCode;
  }
}

export class ValidationError extends BusTrackerError {
  constructor(message, field) {
    super(message, 'VALIDATION_ERROR');
    this.field = field;
  }
}

export const handleError = (error, context = '') => {
  console.error(\Error in \:\, error);
  
  if (error instanceof BusTrackerError) {
    return {
      message: error.message,
      code: error.code,
    };
  }
  
  return {
    message: 'An unexpected error occurred',
    code: 'UNKNOWN_ERROR',
  };
};
