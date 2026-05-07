import { FiPlus } from "react-icons/fi";
import { formatMoney, getGroupIcon } from "../../utils/helpers";

export const DashboardGroupsList = ({ groups, onGroupSelect, onCreateGroup }) => {
  const getStatusClass = (status) => {
    if (status === "active") return "gst active";
    if (status === "pending") return "gst pending";
    return "gst completed";
  };

  return (
    <div className="card cp">
      <div className="cht">
        <div>
          <div className="ctit">Your Groups</div>
          <div className="csub">All savings circles</div>
        </div>
        <button className="bp bsm" onClick={onCreateGroup}>
          <FiPlus size={14} /> New Group
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {groups.map(group => (
          <div 
            key={group.id} 
            style={{ 
              display: "flex", 
              alignItems: "center", 
              flexWrap: "wrap",
              gap: 14, 
              padding: "13px 15px", 
              background: "var(--bg3)", 
              borderRadius: "var(--rs)", 
              cursor: "pointer", 
              transition: "border-color .15s", 
              border: "1px solid var(--border)" 
            }} 
            onClick={() => onGroupSelect(group)}
            onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(201,168,76,.3)"} 
            onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
          >
            <div style={{ fontSize: 22, width: 40, height: 40, background: "var(--gold-dim)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {getGroupIcon(group.icon, { size: 22 })}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)", marginBottom: 4 }}>{group.name}</div>
              <div className="pbar">
                <div className="pfill" style={{ width: `${Math.round((group.collected / group.target) * 100)}%` }}></div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "var(--gold)", fontFamily: "var(--fd)" }}>{formatMoney(group.collected)}</div>
              <div style={{ fontSize: 10, color: "var(--ink3)", fontFamily: "var(--fm)" }}>{Math.round((group.collected / group.target) * 100)}%</div>
            </div>
            <span className={getStatusClass(group.status)}>{group.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};