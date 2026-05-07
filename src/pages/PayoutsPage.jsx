import { PageHeader } from "../sections/shared/PageHeader";
import { formatMoney, getGroupIcon } from "../utils/helpers";

export const PayoutsPage = ({ groups }) => {
  return (
    <>
      <PageHeader 
        title="Payout <em>Schedule</em>" 
        subtitle="Upcoming and completed payouts across all groups" 
      />
      
      <div className="flex flex-col gap-5">
        {groups.map(group => (
          <div key={group.id} className="card bg-card border border-border rounded-xl p-6">
            
            {/* Group Header */}
            <div className="cht flex justify-between items-start mb-6">
              <div>
                <div className="ctit flex items-center gap-3 text-ink">
                  {getGroupIcon(group.icon, { size: 18 })}
                  {group.name}
                </div>
                <div className="csub text-ink3 text-sm mt-1">
                  Next: {group.nextPayout}
                </div>
              </div>
              <span className={`gst ${group.status === 'active' ? 'active' : group.status === 'completed' ? 'completed' : 'pending'}`}>
                {group.status}
              </span>
            </div>

            {/* Payout Rows */}
            {group.members.map((member, i) => (
              <div 
                key={member.id} 
                className="payout-row flex items-center flex-wrap gap-4 py-4 border-b border-border/50 last:border-b-0"
              >
                <div className="payout-order w-7 h-7 rounded-lg bg-bg3 flex items-center justify-center text-xs font-medium text-ink2 flex-shrink-0">
                  {i + 1}
                </div>

                <div className="payout-name flex-1 min-w-[140px] text-ink text-[13px]">
                  {member.name}
                </div>

                <div className="payout-amount font-fd text-[15px] text-gold whitespace-nowrap">
                  {formatMoney(group.amount * group.members.length)}
                </div>

                <div className="payout-cycle text-xs text-ink3 font-fm whitespace-nowrap">
                  {i === 0 ? group.nextPayout : `Cycle ${i + 1}`}
                </div>

                <span className={`bdg ${i === 0 ? 'bdg-go' : 'bdg-gr'}`}>
                  {i === 0 ? "next" : "pending"}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};