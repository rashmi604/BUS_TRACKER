import React from 'react';
import { formatTime } from '../utils';
import '../styles/bus-details.css';

const BusDetails = ({ bus }) => {
  if (!bus) {
    return <div className='bus-details'>Select a bus to view details</div>;
  }

  return (
    <div className='bus-details'>
      <h3>{bus.name}</h3>
      <div className='details-grid'>
        <div className='detail-item'>
          <label>Route:</label>
          <span>{bus.route}</span>
        </div>
        <div className='detail-item'>
          <label>Driver:</label>
          <span>{bus.driver}</span>
        </div>
        <div className='detail-item'>
          <label>Last Update:</label>
          <span>{formatTime(bus.lastUpdate)}</span>
        </div>
        <div className='detail-item'>
          <label>Occupancy:</label>
          <span>{bus.occupancy}%</span>
        </div>
        <div className='detail-item'>
          <label>Status:</label>
          <span className={status }>{bus.status}</span>
        </div>
      </div>
    </div>
  );
};

export default BusDetails;
