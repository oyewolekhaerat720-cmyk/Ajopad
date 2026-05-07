import { formatMoney } from "../../utils/helpers";
import { getColorForName } from "../../utils/helpers";
import { MdHome, MdWork, MdLocationCity, MdGroup } from "react-icons/md";

// Icon mapping
const iconMap = {
  home: <MdHome size={20} />,
  work: <MdWork size={20} />,
  location_city: <MdLocationCity size={20} />,
};

export const GroupCard = ({ group, onClick }) => {
  const progress = Math.round((group.collected / group.target) * 100);
  
  return (
    <div className="gc" onClick={onClick}>
      <div className="gch">
        <div className="gci">
          {iconMap[group.icon] || <MdGroup size={20} />}
        </div>
        <span className={`gst ${group.status}`}>{group.status}</span>
      </div>
      <div className="gcn">{group.name}</div>
      <div className="gcd">{group.description}</div>
      
      <div className="mavs">
        {group.members.slice(0, 4).map(member => {
          const colors = getColorForName(member.name);
          return (
            <div key={member.id} className="mav" style={{ background: colors.bg, color: colors.c }}>
              {member.name[0]}
            </div>
          );
        })}
        {group.members.length > 4 && (
          <div className="mav mav-m">+{group.members.length - 4}</div>
        )}
      </div>
      
      <div className="gprog">
        <div className="gpt">
          <span>{formatMoney(group.collected)} saved</span>
          <span>{progress}%</span>
        </div>
        <div className="pbar">
          <div className="pfill" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      
      <div className="gmeta">
        <div className="gm"><strong>{group.members.length}</strong> members</div>
        <div className="gm"><strong>{formatMoney(group.amount)}</strong>/{group.frequency}</div>
      </div>
    </div>
  );
};