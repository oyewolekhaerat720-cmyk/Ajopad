export const ActivityFeed = ({ groups }) => {
  const getActivityDotClass = (type) => {
    if (type === "g") return "adot g";
    if (type === "go") return "adot go";
    return "adot r";
  };

  const allActivities = groups.flatMap(group => group.activity).slice(0, 8);

  return (
    <div className="card cp">
      <div className="cht">
        <div>
          <div className="ctit">Activity</div>
          <div className="csub">Latest updates</div>
        </div>
      </div>
      <div className="af">
        {allActivities.map((activity, i) => (
          <div key={i} className="ai">
            <div className={getActivityDotClass(activity.type)}></div>
            <div>
              <div className="at" dangerouslySetInnerHTML={{ __html: activity.text }}></div>
              <div className="atm">{activity.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};