import { PageHeader } from "../sections/shared/PageHeader";
import { Avatar } from "../Components/shared/Avatar";
import { Badge } from "../Components/shared/Badge";

export const MembersPage = ({ groups }) => {
  const allMembers = groups.flatMap(group => 
    group.members.map(member => ({
      ...member,
      groupName: group.name,
      groupIcon: group.icon
    }))
  );

  return (
    <>
      <PageHeader title="All <em>Members</em>" subtitle="Everyone across your savings circles" />
      
      <div className="card">
        <table className="tbl">
          <thead>
            <tr>
              <th>Name</th>
              <th>Group</th>
              <th>Role</th>
              <th>Contributions</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {allMembers.map((member, i) => {
              const statusType = member.status === "paid" ? "success" : member.status === "current" ? "warning" : "default";
              const roleType = member.role === "Admin" ? "warning" : "default";
              
              return (
                <tr key={i}>
                  <td>
                    <div className="tnc">
                      <Avatar name={member.name} />
                      <div>
                        <div className="tn">{member.name}</div>
                        <div className="tr">{member.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: 12, color: "var(--ink2)" }}>
                      {member.groupIcon} {member.groupName}
                    </span>
                  </td>
                  <td>
                    <Badge type={roleType}>{member.role}</Badge>
                  </td>
                  <td>
                    <span style={{ fontFamily: "var(--fm)", fontSize: 12 }}>
                      {member.paid}/{member.total}
                    </span>
                  </td>
                  <td>
                    <Badge type={statusType}>{member.status}</Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};