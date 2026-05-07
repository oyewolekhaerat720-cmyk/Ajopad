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
      <PageHeader 
        title="All <em>Members</em>" 
        subtitle="Everyone across your savings circles" 
      />
      
      <div className="card bg-card border border-border rounded-xl overflow-hidden">
        <table className="tbl w-full min-w-[520px] border-collapse">
          <thead>
            <tr>
              <th className="text-left px-6 py-4 text-xs font-medium text-ink3 uppercase tracking-wider font-fm">Name</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-ink3 uppercase tracking-wider font-fm">Group</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-ink3 uppercase tracking-wider font-fm">Role</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-ink3 uppercase tracking-wider font-fm">Contributions</th>
              <th className="text-left px-6 py-4 text-xs font-medium text-ink3 uppercase tracking-wider font-fm">Status</th>
            </tr>
          </thead>
          <tbody>
            {allMembers.map((member, i) => {
              const statusType = member.status === "paid" ? "success" : member.status === "current" ? "warning" : "default";
              const roleType = member.role === "Admin" ? "warning" : "default";
              
              return (
                <tr key={i} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="tnc flex items-center gap-3">
                      <Avatar name={member.name} />
                      <div>
                        <div className="tn text-ink font-medium">{member.name}</div>
                        <div className="tr text-ink3 text-xs font-fm">{member.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-ink2 text-sm">
                      {member.groupIcon} {member.groupName}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge type={roleType}>{member.role}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-fm text-sm text-ink2">
                      {member.paid}/{member.total}
                    </span>
                  </td>
                  <td className="px-6 py-4">
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