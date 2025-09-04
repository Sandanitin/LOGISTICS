import React from 'react';
import PropTypes from 'prop-types';
import './LoadingSpinner.css';

const LoadingSpinner = ({ size = 'medium' }) => {
  const sizeMap = {
    small: '1rem',
    medium: '2rem',
    large: '3rem',
  };

  return (
    <div 
      className="loading-spinner" 
      style={{
        width: sizeMap[size] || sizeMap.medium,
        height: sizeMap[size] || sizeMap.medium,
      }}
    >
      <div className="spinner" />
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default React.memo(LoadingSpinner);
