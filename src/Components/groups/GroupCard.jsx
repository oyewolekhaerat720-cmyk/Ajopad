import { formatMoney } from "../../utils/helpers";
import { getColorForName } from "../../utils/helpers";

export const GroupCard = ({ group, onClick }) => {
  const progress = Math.round((group.collected / group.target) * 100);
  
  return (
    <div 
      className="gc bg-card border border-border rounded-xl p-6 cursor-pointer hover:border-gold/30 hover:-translate-y-1 transition-all duration-200"
      onClick={onClick}
    >
      {/* Header */}
      <div className="gch flex justify-between items-start mb-4">
        <div className="gci w-11 h-11 bg-gold-dim border border-gold/20 rounded-2xl flex items-center justify-center text-2xl">
          {group.icon}
        </div>
        <span className={`gst ${group.status || 'pending'}`}>
          {group.status || 'Active'}
        </span>
      </div>

      {/* Group Name */}
      <div className="gcn font-fd text-[20px] font-semibold text-ink mb-1">
        {group.name}
      </div>

      {/* Description */}
      <div className="gcd text-ink2 text-sm mb-5 line-clamp-2">
        {group.description}
      </div>

      {/* Member Avatars */}
      <div className="mavs flex -space-x-2 mb-5">
        {group.members.slice(0, 4).map((member) => {
          const colors = getColorForName(member.name);
          return (
            <div 
              key={member.id} 
              className="mav w-7 h-7 rounded-full border-2 border-card flex items-center justify-center text-xs font-bold"
              style={{ 
                backgroundColor: colors.bg, 
                color: colors.c 
              }}
            >
              {member.name[0]}
            </div>
          );
        })}
        
        {group.members.length > 4 && (
          <div className="mav mav-m w-7 h-7 bg-bg3 text-ink3 text-[9px] border-2 border-card flex items-center justify-center font-medium">
            +{group.members.length - 4}
          </div>
        )}
      </div>

      {/* Progress */}
      <div className="gprog mb-5">
        <div className="gpt flex justify-between text-xs text-ink3 font-fm mb-1.5">
          <span>{formatMoney(group.collected)} saved</span>
          <span>{progress}%</span>
        </div>
        <div className="pbar bg-bg3 h-1.5 rounded-full overflow-hidden">
          <div 
            className="pfill h-full bg-gradient-to-r from-gold to-gold2 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Meta */}
      <div className="gmeta flex gap-6 text-xs">
        <div className="gm">
          <strong className="text-ink">{group.members.length}</strong> members
        </div>
        <div className="gm">
          <strong className="text-ink">{formatMoney(group.amount)}</strong>/{group.frequency}
        </div>
      </div>
    </div>
  );
};