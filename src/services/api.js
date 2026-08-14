const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const API_TIMEOUT = import.meta.env.VITE_API_TIMEOUT || 5000;

export const fetchBuses = async () => {
  try {
    const response = await fetch(\\/api/buses\, {
      timeout: API_TIMEOUT
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching buses:', error);
    throw error;
  }
};

export const fetchBusRoutes = async () => {
  try {
    const response = await fetch(\\/api/routes\);
    return await response.json();
  } catch (error) {
    console.error('Error fetching routes:', error);
    throw error;
  }
};

export const updateBusLocation = async (busId, location) => {
  try {
    const response = await fetch(\\/api/buses/\/location\, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(location)
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating bus location:', error);
    throw error;
  }
};
