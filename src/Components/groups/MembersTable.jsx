import { Avatar } from "../shared/Avatar";
import { Badge } from "../shared/Badge";

export const MembersTable = ({ members, onRemoveMember }) => {
  return (
    <div className="card">
      <table className="tbl">
        <thead>
          <tr>
            <th>Member</th>
            <th>Code</th>
            <th>Contributions</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {members.map(member => {
            const statusType = member.status === "paid" ? "success" : member.status === "current" ? "warning" : "default";
            
            return (
              <tr key={member.id}>
                <td>
                  <div className="tnc">
                    <Avatar name={member.name} />
                    <div>
                      <div className="tn">{member.name}</div>
                      <div className="tr">{member.role} · {member.phone}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span style={{ fontFamily: "var(--fm)", fontSize: 12, letterSpacing: 1 }}>{member.loginCode || "—"}</span>
                </td>
                <td>
                  <span style={{ fontFamily: "var(--fm)", fontSize: 12 }}>{member.paid}/{member.total}</span>
                </td>
                <td>
                  <Badge type={statusType}>{member.status}</Badge>
                </td>
                <td>
                  {member.role !== "Admin" && (
                    <button className="bi" onClick={() => onRemoveMember(member.id)} title="Remove">✕</button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};