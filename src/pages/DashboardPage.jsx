import { DashboardStats } from "../Components/dashboard/DashboardStats";
import { DashboardGroupsList } from "../Components/dashboard/DashboardGroupsList";
import { ActivityFeed } from "../Components/dashboard/ActivityFeed";

export const DashboardPage = ({ groups, totalSaved, activeGroups, totalMembers, onGroupSelect, onCreateGroup }) => {
  return (
    <>
      <div className="ph mb-7">
        <div className="pt font-fd text-[34px] font-semibold text-ink tracking-[-0.5px] leading-none flex items-center gap-2">
          Good morning, <em className="italic text-gold">Chidi</em>
        </div>
        <div className="ps text-ink2 text-[13px] mt-1.5 font-light">
          Here's an overview of all your savings circles
        </div>
      </div>
      
      <DashboardStats
        totalSaved={totalSaved}
        activeGroups={activeGroups}
        totalMembers={totalMembers}
        groupsCount={groups.length}
      />
      
      <div className="dashboard-grid grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5 lg:gap-[18px]">
        <DashboardGroupsList 
          groups={groups} 
          onGroupSelect={onGroupSelect} 
          onCreateGroup={onCreateGroup} 
        />
        <ActivityFeed groups={groups} />
      </div>
    </>
  );
};