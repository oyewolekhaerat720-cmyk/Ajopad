import { 
  MdHome, MdDashboard, MdGroup, MdPayments, MdChat, MdSettings 
} from "react-icons/md";
import { GiPayMoney, GiTrophy } from "react-icons/gi";
import { HiOutlineUsers } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";

export const Sidebar = ({ activePage, onPageChange, onLogoClick, groupsCount, adminProfile }) => {
  const mainMenu = [
    { id: "landing", icon: <MdHome size={18} />, label: "Home" },
    { id: "dashboard", icon: <MdDashboard size={18} />, label: "Dashboard" },
    { id: "groups", icon: <MdGroup size={18} />, label: "My Groups" },
    { id: "groupchat", icon: <MdChat size={18} />, label: "Group Chat" },
    { id: "payments", icon: <MdPayments size={18} />, label: "Pay" },
    { id: "contributions", icon: <GiPayMoney size={18} />, label: "Contributions" },
    { id: "payouts", icon: <GiTrophy size={18} />, label: "Payouts" }
  ];

  const accountMenu = [
    { id: "members", icon: <HiOutlineUsers size={18} />, label: "All Members" },
    { id: "settings", icon: <MdSettings size={18} />, label: "Settings" }
  ];

  return (
    <aside className="sidebar">
      <div className="sb-logo" onClick={onLogoClick}>Ajo<em>Pad</em></div>
      
      <div className="sb-lbl">Main</div>
      {mainMenu.map(item => (
        <div 
          key={item.id} 
          className={`si ${activePage === item.id ? "act" : ""}`} 
          onClick={() => onPageChange(item.id)}
        >
          <span className="si-ic">{item.icon}</span>
          {item.label}
        </div>
      ))}
      
      <div className="sb-lbl">Account</div>
      {accountMenu.map(item => (
        <div 
          key={item.id} 
          className={`si ${activePage === item.id ? "act" : ""}`} 
          onClick={() => onPageChange(item.id)}
        >
          <span className="si-ic">{item.icon}</span>
          {item.label}
        </div>
      ))}
      
      <div className="sb-bot">
        <div className="sb-usr">
          <div className="sb-av"><FaUserCircle size={20} /></div>
          <div className="sb-ui">
            <p>{adminProfile.fullName}</p>
            <span>Admin · {groupsCount} groups</span>
          </div>
        </div>
      </div>
    </aside>
  );
};