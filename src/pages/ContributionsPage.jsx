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
      <PageHeader title="All <em>Contributions</em>" subtitle="Full transaction history across all groups" />
      
      <div className="card">
        {allContributions.length === 0 ? (
          <EmptyState icon={<MdAttachMoney size={28} />} title="No contributions yet" description="Contributions will appear here once recorded." />
        ) : (
          allContributions.map((contribution, i) => (
            <div key={i} className="list-row">
              <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 0 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--green-dim)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}><MdFavorite size={18} /></div>
                <div>
                  <div className="at" dangerouslySetInnerHTML={{ __html: contribution.text }}></div>
                  <div className="atm">{contribution.groupName} · {contribution.time}</div>
                </div>
              </div>
              <span className="bdg bdg-g">Recorded</span>
            </div>
          ))
        )}
      </div>
    </>
  );
};