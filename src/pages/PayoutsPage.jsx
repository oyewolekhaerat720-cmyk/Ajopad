import { PageHeader } from "../sections/shared/PageHeader";
import { formatMoney, getGroupIcon } from "../utils/helpers";

export const PayoutsPage = ({ groups }) => {
  return (
    <>
      <PageHeader title="Payout <em>Schedule</em>" subtitle="Upcoming and completed payouts across all groups" />
      
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {groups.map(group => (
          <div key={group.id} className="card cp">
            <div className="cht">
              <div>
                <div className="ctit" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {getGroupIcon(group.icon, { size: 18 })}
                  {group.name}
                </div>
                <div className="csub">Next: {group.nextPayout}</div>
              </div>
              <span className={`gst ${group.status}`}>{group.status}</span>
            </div>
            
            {group.members.map((member, i) => (
              <div key={member.id} className="payout-row">
                <div className="payout-order">{i + 1}</div>
                <div className="payout-name" style={{ flex: 1, fontSize: 13, color: "var(--ink)" }}>{member.name}</div>
                <div className="payout-amount" style={{ fontSize: 14, fontFamily: "var(--fd)", color: "var(--gold)", marginRight: 12 }}>
                  {formatMoney(group.amount * group.members.length)}
                </div>
                <div className="payout-cycle" style={{ fontSize: 11, color: "var(--ink3)", fontFamily: "var(--fm)", marginRight: 10 }}>
                  {i === 0 ? group.nextPayout : `Cycle ${i + 1}`}
                </div>
                <span className={`bdg ${i === 0 ? "bdg-go" : "bdg-gr"}`}>
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