export const ActivityFeed = ({ groups }) => {
  const getActivityDotClass = (type) => {
    if (type === "g") return "bg-green";
    if (type === "go") return "bg-gold";
    return "bg-red";
  };

  const allActivities = groups.flatMap(group => group.activity).slice(0, 8);

  return (
    <div className="card bg-card border border-border rounded-xl p-6">
      <div className="cht flex justify-between items-start mb-6">
        <div>
          <div className="ctit font-fd text-[17px] font-semibold text-ink">Activity</div>
          <div className="csub text-xs text-ink3 font-fm">Latest updates</div>
        </div>
      </div>

      <div className="af flex flex-col">
        {allActivities.map((activity, i) => (
          <div 
            key={i} 
            className="ai flex gap-4 py-4 border-b border-border/50 last:border-b-0"
          >
            {/* Activity Dot */}
            <div className={`adot w-2 h-2 mt-[5px] rounded-full flex-shrink-0 ${getActivityDotClass(activity.type)}`} />

            <div className="flex-1 min-w-0">
              <div 
                className="at text-[13px] text-ink2 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: activity.text }} 
              />
              <div className="atm text-xs text-ink3 font-fm mt-1">
                {activity.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};