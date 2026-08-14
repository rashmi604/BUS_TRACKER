import React from 'react';
import '../styles/loading.css';

export const Loading = ({ message = 'Loading...' }) => (
  <div className='loading-container'>
    <div className='spinner'></div>
    <p>{message}</p>
  </div>
);

export const SkeletonLoader = ({ count = 3 }) => (
  <div className='skeleton-loader'>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className='skeleton-item'>
        <div className='skeleton-line'></div>
        <div className='skeleton-line short'></div>
      </div>
    ))}
  </div>
);
