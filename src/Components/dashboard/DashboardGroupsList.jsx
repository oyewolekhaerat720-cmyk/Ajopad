import { FiPlus } from "react-icons/fi";
import { formatMoney, getGroupIcon } from "../../utils/helpers";

export const DashboardGroupsList = ({ groups, onGroupSelect, onCreateGroup }) => {
  const getStatusClass = (status) => {
    if (status === "active") return "gst active";
    if (status === "pending") return "gst pending";
    return "gst completed";
  };

  return (
    <div className="card bg-card border border-border rounded-xl p-6">
      <div className="cht flex justify-between items-start mb-6">
        <div>
          <div className="ctit font-fd text-[17px] font-semibold text-ink">Your Groups</div>
          <div className="csub text-xs text-ink3 font-fm">All savings circles</div>
        </div>
        <button className="bp bsm flex items-center gap-1.5" onClick={onCreateGroup}>
          <FiPlus size={14} /> New Group
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {groups.map(group => {
          const progress = Math.round((group.collected / group.target) * 100);
          
          return (
            <div
              key={group.id}
              onClick={() => onGroupSelect(group)}
              className="group flex items-center flex-wrap gap-4 p-4 bg-bg3 hover:bg-card2 border border-border hover:border-gold/30 rounded-xl cursor-pointer transition-all duration-200"
            >
              {/* Icon */}
              <div className="w-10 h-10 bg-gold-dim rounded-xl flex items-center justify-center flex-shrink-0">
                {getGroupIcon(group.icon, { size: 22 })}
              </div>

              {/* Group Info */}
              <div className="flex-1 min-w-0">
                <div className="text-ink font-medium text-[13px] mb-2.5 line-clamp-1">
                  {group.name}
                </div>
                <div className="pbar bg-bg3 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="pfill h-full bg-gradient-to-r from-gold to-gold2 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Amount & Progress */}
              <div className="text-right">
                <div className="font-fd text-gold text-[15px] font-semibold">
                  {formatMoney(group.collected)}
                </div>
                <div className="text-[10px] text-ink3 font-fm tracking-wider">
                  {progress}%
                </div>
              </div>

              {/* Status */}
              <span className={getStatusClass(group.status)}>
                {group.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};