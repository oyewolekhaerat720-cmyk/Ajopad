export const ProgressBar = ({ percentage, showLabel = false }) => {
  return (
    <div className="gprog">
      {showLabel && (
        <div className="gpt">
          <span>{percentage}%</span>
        </div>
      )}
      <div className="pbar">
        <div className="pfill" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};