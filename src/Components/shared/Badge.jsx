import React from 'react';

export const Badge = ({ type, children }) => {
  const getBadgeClasses = (type) => {
    switch (type) {
      case 'active':
        return 'bg-green text-white border border-[rgba(42,157,106,0.2)]';
      case 'inactive':
        return 'bg-ink3 text-white border border-border';
      case 'pending':
        return 'bg-gold-dim text-gold border border-[rgba(201,168,76,0.2)]';
      case 'admin':
        return 'bg-blue-500/10 text-blue-400 border border-blue-500/20';
      case 'member':
        return 'bg-[rgba(90,82,72,0.15)] text-ink3 border border-border';
      default:
        return 'bg-ink3 text-white border border-border';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] px-2 py-[3px] rounded-full font-medium font-family-fm ${getBadgeClasses(type)}`}
    >
      {children}
    </span>
  );
};