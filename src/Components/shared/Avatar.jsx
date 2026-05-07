import { getColorForName } from "../../utils/helpers";

export const Avatar = ({ name, size = "md" }) => {
  const colors = getColorForName(name);
  const sizes = { sm: 26, md: 34, lg: 44 };
  
  const sizeClasses = {
    sm: "w-[26px] h-[26px] text-[10px]",
    md: "w-[34px] h-[34px] text-[12px]",
    lg: "w-[44px] h-[44px] text-[14px]"
  };
  
  return (
    <div 
      className={`flex items-center justify-center rounded-full flex-shrink-0 font-semibold ${sizeClasses[size]}`}
      style={{ 
        background: colors.bg, 
        color: colors.c
      }}
    >
      {name[0]}
    </div>
  );
};