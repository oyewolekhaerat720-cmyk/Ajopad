import { PageHeader } from "../sections/shared/PageHeader";
import { DashboardStats } from "../Components/dashboard/DashboardStats";
import { DashboardGroupsList } from "../Components/dashboard/DashboardGroupsList";
import { ActivityFeed } from "../Components/dashboard/ActivityFeed";

export const HomePage = ({ groups, totalSaved, activeGroups, totalMembers, onGroupSelect, onCreateGroup }) => {
  return (
    <>
      <PageHeader title="Welcome <em>Home</em>" subtitle="Start here to manage your ajo groups, contributions, and reminders." />

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
