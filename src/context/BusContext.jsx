import React, { createContext, useState, useCallback } from 'react';

export const BusContext = createContext();

export const BusProvider = ({ children }) => {
  const [selectedBus, setSelectedBus] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [mapCenter, setMapCenter] = useState([28.6139, 77.2090]);
  const [mapZoom, setMapZoom] = useState(12);

  const updateSelectedBus = useCallback((bus) => {
    setSelectedBus(bus);
    if (bus) {
      setMapCenter([bus.lat, bus.lng]);
      setMapZoom(15);
    }
  }, []);

  const updateSelectedRoute = useCallback((route) => {
    setSelectedRoute(route);
  }, []);

  const value = {
    selectedBus,
    selectedRoute,
    mapCenter,
    mapZoom,
    updateSelectedBus,
    updateSelectedRoute,
    setMapCenter,
    setMapZoom,
  };

  return <BusContext.Provider value={value}>{children}</BusContext.Provider>;
};
