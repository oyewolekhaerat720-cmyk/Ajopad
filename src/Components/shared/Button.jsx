export const Button = ({ children, variant = "primary", size = "md", onClick, className = "" }) => {
  const getVariantClasses = (variant) => {
    switch (variant) {
      case 'primary':
        return 'text-[13px] font-semibold text-[#060504] bg-gold border-none py-[10px] px-[22px] rounded-[100px] cursor-pointer transition-all duration-200 whitespace-nowrap inline-flex items-center gap-2 hover:bg-gold2 hover:-translate-y-[1px]';
      case 'secondary':
        return 'text-[13px] font-normal text-ink2 bg-transparent border border-border2 py-[10px] px-[22px] rounded-[100px] cursor-pointer transition-all duration-200 whitespace-nowrap inline-flex items-center gap-2 hover:border-gold hover:text-gold';
      case 'icon':
        return 'bg-none border border-border text-ink2 w-8 h-8 rounded-rs cursor-pointer flex items-center justify-center text-[14px] transition-all duration-150 hover:border-red hover:text-red';
      default:
        return 'text-[13px] font-semibold text-[#060504] bg-gold border-none py-[10px] px-[22px] rounded-[100px] cursor-pointer transition-all duration-200 whitespace-nowrap inline-flex items-center gap-2 hover:bg-gold2 hover:-translate-y-[1px]';
    }
  };

  const getSizeClasses = (size) => {
    switch (size) {
      case 'sm':
        return 'py-[7px] px-[14px] text-[12px]';
      case 'md':
        return '';
      case 'lg':
        return '';
      default:
        return '';
    }
  };

  return (
    <button 
      className={`${getVariantClasses(variant)} ${getSizeClasses(size)} ${className}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
};