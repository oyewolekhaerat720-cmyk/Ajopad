export const ProgressBar = ({ percentage, showLabel = false }) => {
  return (
    <div className="mb-3">
      {showLabel && (
        <div className="flex justify-between text-[11px] text-ink3 mb-[5px] font-family-fm items-center gap-1">
          <span>{percentage}%</span>
        </div>
      )}
      <div className="bg-bg3 rounded-full h-1 overflow-hidden">
        <div 
          className="h-1 rounded-full bg-gradient-to-r from-gold to-gold2 transition-all duration-600 ease-out" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};