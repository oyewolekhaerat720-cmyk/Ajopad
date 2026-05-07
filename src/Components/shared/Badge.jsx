import React from 'react';

export const Badge = ({ type, children }) => {
  const getBadgeStyles = (type) => {
    switch (type) {
      case 'active':
        return { backgroundColor: '#4CAF50', color: 'white' };
      case 'inactive':
        return { backgroundColor: '#9E9E9E', color: 'white' };
      case 'pending':
        return { backgroundColor: '#FF9800', color: 'white' };
      case 'admin':
        return { backgroundColor: '#2196F3', color: 'white' };
      case 'member':
        return { backgroundColor: '#607D8B', color: 'white' };
      default:
        return { backgroundColor: '#9E9E9E', color: 'white' };
    }
  };

  const styles = getBadgeStyles(type);

  return (
    <span
      style={{
        ...styles,
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 'bold',
        display: 'inline-block',
        textTransform: 'capitalize'
      }}
    >
      {children}
    </span>
  );
};