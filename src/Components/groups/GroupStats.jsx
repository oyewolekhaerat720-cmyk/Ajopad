import { formatMoney } from "../../utils/helpers";

export const GroupStats = ({ group }) => {
  const paidThisCycle = group.members.filter(m => m.status === "paid").length;
  
  const stats = [
    { label: "Collected", value: formatMoney(group.collected), subtext: `of ${formatMoney(group.target)} target`, color: "gold" },
    { label: "Members", value: group.members.length, subtext: `${paidThisCycle} paid this cycle`, color: "white" },
    { label: "Contribution", value: formatMoney(group.amount), subtext: `per ${group.frequency}`, color: "white", small: true },
    { label: "Next Payout", value: group.nextPayout, subtext: "", color: "white", small: true }
  ];

  return (
    <div className="sr">
      {stats.map(stat => (
        <div key={stat.label} className="sc">
          <div className="scl">{stat.label}</div>
          <div className={`scv ${stat.color === "gold" ? "g" : ""}`} style={stat.small ? { fontSize: 20 } : {}}>
            {stat.value}
          </div>
          {stat.subtext && <div className="scc">{stat.subtext}</div>}
        </div>
      ))}
    </div>
  );
};