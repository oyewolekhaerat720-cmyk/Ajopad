import { getGroupIcon } from "../../utils/helpers";

export const GroupDetailHeader = ({ group }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 14 }}>
    <div style={{ fontSize: 34, width: 54, height: 54, background: "var(--gold-dim)", borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {getGroupIcon(group.icon, { size: 28 })}
    </div>
    <div>
      <div className="pt">{group.name}</div>
      <div className="ps">{group.description}</div>
    </div>
    <span className={`gst ${group.status}`} style={{ marginLeft: "auto" }}>{group.status}</span>
  </div>
);