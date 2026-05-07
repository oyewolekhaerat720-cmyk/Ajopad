import { formatMoney } from "../../utils/helpers";

export const GroupStats = ({ group }) => {
  const paidThisCycle = group.members.filter(m => m.status === "paid").length;
  
  const stats = [
    { 
      label: "Collected", 
      value: formatMoney(group.collected), 
      subtext: `of ${formatMoney(group.target)} target`, 
      color: "gold" 
    },
    { 
      label: "Members", 
      value: group.members.length, 
      subtext: `${paidThisCycle} paid this cycle`, 
      color: "white" 
    },
    { 
      label: "Contribution", 
      value: formatMoney(group.amount), 
      subtext: `per ${group.frequency}`, 
      color: "white", 
      small: true 
    },
    { 
      label: "Next Payout", 
      value: group.nextPayout, 
      subtext: "", 
      color: "white", 
      small: true 
    }
  ];

  return (
    <div className="sr grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="sc bg-card border border-border rounded-xl p-6 relative overflow-hidden hover:border-gold/30 transition-colors"
        >
          <div className="scl text-xs uppercase tracking-widest font-fm text-ink3">
            {stat.label}
          </div>

          <div className={`scv mt-3 font-fd font-bold tracking-tight ${
            stat.small ? "text-2xl" : "text-3xl"
          } ${stat.color === "gold" ? "text-gold" : "text-ink"}`}>
            {stat.value}
          </div>

          {stat.subtext && (
            <div className="scc text-xs font-fm mt-2 text-ink2">
              {stat.subtext}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};