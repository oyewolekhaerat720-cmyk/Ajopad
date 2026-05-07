import { MdHome, MdWork, MdLocationCity, MdGroup } from "react-icons/md";

// Icon mapping
const iconMap = {
  home: <MdHome size={34} />,
  work: <MdWork size={34} />,
  location_city: <MdLocationCity size={34} />,
};

export const GroupDetailHeader = ({ group }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 14 }}>
    <div style={{ fontSize: 34, width: 54, height: 54, background: "var(--gold-dim)", borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center" }}>
      {iconMap[group.icon] || <MdGroup size={34} />}
    </div>
    <div>
      <div className="pt">{group.name}</div>
      <div className="ps">{group.description}</div>
    </div>
    <span className={`gst ${group.status}`} style={{ marginLeft: "auto" }}>{group.status}</span>
  </div>
);