import { formatMoney } from "../../utils/helpers";

export const ScheduleList = ({ members, nextPayout }) => {
  return (
    <div className="card" style={{ padding: "8px 16px" }}>
      {members.map((member, i) => (
        <div key={member.id} className="srow">
          <div className="sturn">{i + 1}</div>
          <div style={{ flex: 1, fontSize: 13, color: "var(--ink)" }}>{member.name}</div>
          <div style={{ fontSize: 11, color: "var(--ink3)", fontFamily: "var(--fm)" }}>
            {i === 0 ? nextPayout : `Cycle ${i + 1}`}
          </div>
          <span className={`bdg ${i === 0 ? "bdg-go" : "bdg-gr"}`}>
            {i === 0 ? "next" : "pending"}
          </span>
        </div>
      ))}
    </div>
  );
};