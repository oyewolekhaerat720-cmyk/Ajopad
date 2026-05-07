import { formatMoney } from "../../utils/helpers";

export const ScheduleList = ({ members, nextPayout }) => {
  return (
    <div className="card bg-card border border-border rounded-xl p-2">
      {members.map((member, i) => (
        <div 
          key={member.id} 
          className="srow flex items-center gap-4 px-5 py-4 border-b border-border/50 last:border-b-0 hover:bg-white/5 transition-colors"
        >
          {/* Turn / Order */}
          <div className="sturn w-7 h-7 rounded-full bg-gold-dim border border-gold/20 flex items-center justify-center font-fm text-xs text-gold flex-shrink-0">
            {i + 1}
          </div>

          {/* Member Name */}
          <div className="flex-1 text-ink text-[13px]">
            {member.name}
          </div>

          {/* Cycle / Date */}
          <div className="text-xs text-ink3 font-fm whitespace-nowrap">
            {i === 0 ? nextPayout : `Cycle ${i + 1}`}
          </div>

          {/* Status Badge */}
          <span className={`bdg ${i === 0 ? "bdg-go" : "bdg-gr"}`}>
            {i === 0 ? "next" : "pending"}
          </span>
        </div>
      ))}
    </div>
  );
};