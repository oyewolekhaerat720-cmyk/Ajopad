import { GiWallet, GiTakeMyMoney } from "react-icons/gi";
import { FaUsers, FaCalendarAlt } from "react-icons/fa";
import { MdGroup } from "react-icons/md";
import { formatMoney } from "../../utils/helpers";

export const DashboardStats = ({ totalSaved, activeGroups, totalMembers, groupsCount }) => {
  const stats = [
    { label: "Total Saved", value: formatMoney(totalSaved), subtext: "↑ +₦35,000 this week", icon: <GiWallet size={24} />, color: "gold" },
    { label: "Active Groups", value: activeGroups, subtext: `of ${groupsCount} total`, icon: <MdGroup size={24} />, color: "white" },
    { label: "Total Members", value: totalMembers, subtext: "across all groups", icon: <FaUsers size={24} />, color: "green" },
    { label: "Next Payout", value: "May 15", subtext: "Lagos Hustlers", icon: <FaCalendarAlt size={24} />, color: "white" }
  ];

  return (
    <div className="sr">
      {stats.map(stat => (
        <div key={stat.label} className="sc">
          <div className="scl">{stat.label}</div>
          <div className={`scv ${stat.color === "gold" ? "g" : stat.color === "green" ? "gr" : ""}`}>
            {stat.value}
          </div>
          {stat.subtext && <div className="scc">{stat.subtext}</div>}
          <div className="sci">{stat.icon}</div>
        </div>
      ))}
    </div>
  );
};