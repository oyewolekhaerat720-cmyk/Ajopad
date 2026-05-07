import { PageHeader } from "../sections/shared/PageHeader";
import { EmptyState } from "../sections/shared/EmptyState";
import { MdAttachMoney, MdFavorite } from "react-icons/md";

export const ContributionsPage = ({ groups }) => {
  const allContributions = groups.flatMap(group => 
    group.activity.filter(a => a.type === "g").map(activity => ({
      ...activity,
      groupName: group.name
    }))
  );

  return (
    <>
      <PageHeader 
        title="All <em>Contributions</em>" 
        subtitle="Full transaction history across all groups" 
      />
      
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {allContributions.length === 0 ? (
          <EmptyState 
            icon={<MdAttachMoney size={28} />} 
            title="No contributions yet" 
            description="Contributions will appear here once recorded." 
          />
        ) : (
          allContributions.map((contribution, i) => (
            <div 
              key={i} 
              className="flex items-center justify-between flex-wrap gap-4 px-5 py-4 border-b border-[#2A2520]/50 last:border-b-0 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-9 h-9 bg-green-dim border border-green/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MdFavorite size={18} className="text-green" />
                </div>

                <div className="min-w-0 flex-1">
                  <div 
                    className="text-[13px] text-ink2 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: contribution.text }}
                  />
                  <div className="text-xs text-ink3 font-mono mt-1">
                    {contribution.groupName} · {contribution.time}
                  </div>
                </div>
              </div>

              <span className="text-xs font-medium px-3 py-1 bg-green-dim text-green border border-green/20 rounded-full inline-flex items-center">
                Recorded
              </span>
            </div>
          ))
        )}
      </div>
    </>
  );
};