export const Button = ({ children, variant = "primary", size = "md", onClick, className = "" }) => {
  const variants = { primary: "bp", secondary: "bs", icon: "bi" };
  const sizes = { sm: "bsm", md: "", lg: "" };
  
  return (
    <button 
      className={`${variants[variant]} ${sizes[size]} ${className}`} 
      onClick={onClick}
    >
      {children}
    </button>
  );
};