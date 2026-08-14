import { useState, useEffect } from 'react';
import { fetchBuses } from '../services/api';
import { REFRESH_INTERVAL } from '../constants';

export const useBusLocation = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusesData = async () => {
      try {
        setLoading(true);
        const data = await fetchBuses();
        setBuses(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBusesData();
    const interval = setInterval(fetchBusesData, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return { buses, loading, error };
};
