import { getColorForName } from "../../utils/helpers";

export const Avatar = ({ name, size = "md" }) => {
  const colors = getColorForName(name);
  const sizes = { sm: 26, md: 34, lg: 44 };
  
  return (
    <div 
      className="tav" 
      style={{ 
        background: colors.bg, 
        color: colors.c, 
        width: sizes[size], 
        height: sizes[size] 
      }}
    >
      {name[0]}
    </div>
  );
};