import React from 'react';
import PropTypes from 'prop-types';

const sizeMap = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-4',
};

const LoadingSpinner = ({ size = 'md', color = 'primary', className = '' }) => {
  const spinnerSize = sizeMap[size] || sizeMap.md;
  const colorClass = {
    primary: 'border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent',
    white: 'border-t-white border-r-transparent border-b-transparent border-l-transparent',
    dark: 'border-t-gray-800 border-r-transparent border-b-transparent border-l-transparent',
  }[color] || colorClass.primary;

  return (
    <div className={`inline-block ${className}`} role="status">
      <div
        className={`animate-spin rounded-full ${spinnerSize} ${colorClass}`}
        style={{
          borderStyle: 'solid',
          borderColor: 'currentColor',
          borderTopColor: 'transparent',
          borderRightColor: 'transparent',
          borderBottomColor: 'transparent',
        }}
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  color: PropTypes.oneOf(['primary', 'white', 'dark']),
  className: PropTypes.string,
};

export default LoadingSpinner;
