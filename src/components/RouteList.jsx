import React, { useState } from 'react';
import '../styles/route-list.css';

const RouteList = ({ routes, onSelectRoute }) => {
  const [expandedRoute, setExpandedRoute] = useState(null);

  const toggleRoute = (routeId) => {
    setExpandedRoute(expandedRoute === routeId ? null : routeId);
  };

  return (
    <div className='route-list'>
      <h3>Available Routes</h3>
      <div className='routes-container'>
        {routes.map((route) => (
          <div key={route.id} className='route-item'>
            <div 
              className='route-header' 
              onClick={() => {
                toggleRoute(route.id);
                onSelectRoute(route);
              }}
            >
              <span className='route-number'>{route.number}</span>
              <span className='route-name'>{route.name}</span>
              <span className='bus-count'>{route.busCount} buses</span>
            </div>
            {expandedRoute === route.id && (
              <div className='route-details'>
                <p><strong>Start:</strong> {route.startPoint}</p>
                <p><strong>End:</strong> {route.endPoint}</p>
                <p><strong>Distance:</strong> {route.distance} km</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RouteList;
