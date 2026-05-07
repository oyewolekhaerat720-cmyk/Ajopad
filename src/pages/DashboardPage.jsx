import { DashboardStats } from "../Components/dashboard/DashboardStats";
import { DashboardGroupsList } from "../Components/dashboard/DashboardGroupsList";
import { ActivityFeed } from "../Components/dashboard/ActivityFeed";

export const DashboardPage = ({ groups, totalSaved, activeGroups, totalMembers, onGroupSelect, onCreateGroup }) => {
  return (
    <>
      <div className="ph">
        <div className="pt">Good morning, <em>Chidi</em> </div>
        <div className="ps">Here's an overview of all your savings circles</div>
      </div>
      
      <DashboardStats
        totalSaved={totalSaved}
        activeGroups={activeGroups}
        totalMembers={totalMembers}
        groupsCount={groups.length}
      />
      
      <div className="dashboard-grid">
        <DashboardGroupsList groups={groups} onGroupSelect={onGroupSelect} onCreateGroup={onCreateGroup} />
        <ActivityFeed groups={groups} />
      </div>
    </>
  );
};
