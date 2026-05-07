import { 
  MdHome, MdDashboard, MdGroup, MdPayments, MdSettings, MdChat 
} from "react-icons/md";
import { GiPayMoney, GiTrophy } from "react-icons/gi";
import { HiOutlineUsers } from "react-icons/hi";
import { FaUserCircle, FaPaypal } from "react-icons/fa";

export const Sidebar = ({ activePage, onPageChange, onLogoClick, groupsCount, adminProfile, memberSession, onMemberLogout }) => {
  const mainMenu = memberSession ? [
    { id: "groupchat", icon: <MdChat size={18} />, label: "Group Chat" }
  ] : [
    { id: "landing", icon: <MdHome size={18} />, label: "Home" },
    { id: "dashboard", icon: <MdDashboard size={18} />, label: "Dashboard" },
    { id: "groups", icon: <MdGroup size={18} />, label: "My Groups" },
    { id: "groupchat", icon: <MdChat size={18} />, label: "Group Chat" },
    { id: "payments", icon: <FaPaypal size={18} />, label: "Pay" },
    { id: "contributions", icon: <GiPayMoney size={18} />, label: "Contributions" },
    { id: "payouts", icon: <GiTrophy size={18} />, label: "Payouts" }
  ];

  const accountMenu = memberSession ? [] : [
    { id: "members", icon: <HiOutlineUsers size={18} />, label: "All Members" },
    { id: "settings", icon: <MdSettings size={18} />, label: "Settings" }
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-bg2 border-r border-border flex flex-col py-6 overflow-y-auto min-h-0">
      <div 
        className="font-family-fd text-[22px] font-bold text-ink px-6 pb-6 border-b border-border mb-[14px] cursor-pointer"
        onClick={onLogoClick}
      >
        Ajo<em className="text-gold not-italic">Pad</em>
      </div>
      
      <div className="font-family-fm text-[10px] text-ink3 tracking-[2px] uppercase px-6 mt-[14px] mb-1">Main</div>
      {mainMenu.map(item => (
        <div 
          key={item.id} 
          className={`flex items-center gap-[11px] py-[10px] px-6 text-[13px] text-ink2 cursor-pointer transition-all duration-150 border-l-2 border-transparent my-[1px] hover:text-ink hover:bg-white/5 ${activePage === item.id ? "text-gold border-l-gold bg-gold-dim" : ""}`} 
          onClick={() => onPageChange(item.id)}
        >
          <span className="text-[15px] w-5 text-center">{item.icon}</span>
          {item.label}
        </div>
      ))}
      
      {!memberSession && (
        <>
          <div className="font-family-fm text-[10px] text-ink3 tracking-[2px] uppercase px-6 mt-[14px] mb-1">Account</div>
          {accountMenu.map(item => (
            <div 
              key={item.id} 
              className={`flex items-center gap-[11px] py-[10px] px-6 text-[13px] text-ink2 cursor-pointer transition-all duration-150 border-l-2 border-transparent my-[1px] hover:text-ink hover:bg-white/5 ${activePage === item.id ? "text-gold border-l-gold bg-gold-dim" : ""}`} 
              onClick={() => onPageChange(item.id)}
            >
              <span className="text-[15px] w-5 text-center">{item.icon}</span>
              {item.label}
            </div>
          ))}
        </>
      )}
      
      <div className="mt-auto pt-4 px-6 border-t border-border">
        <div className="flex flex-col items-start gap-2.5">
          <div className="w-[34px] h-[34px] rounded-full bg-gold-dim border border-gold/25 flex items-center justify-center text-[13px] text-gold font-semibold">
            <FaUserCircle size={20} />
          </div>
          <div>
            <p className="text-[13px] font-medium text-ink">{memberSession ? "Member chat" : adminProfile.fullName}</p>
            <span className="text-[11px] text-ink3 font-family-fm">{memberSession ? "Limited access" : `Admin · ${groupsCount} groups`}</span>
          </div>
        </div>
        {memberSession && (
          <button 
            className="text-[13px] font-normal text-ink2 bg-transparent border border-border2 py-[10px] px-[22px] rounded-full cursor-pointer transition-all duration-200 whitespace-nowrap inline-flex items-center gap-2 hover:border-gold hover:text-gold w-full mt-3"
            onClick={onMemberLogout}
          >
            Sign out
          </button>
        )}
      </div>
    </aside>
  );
};