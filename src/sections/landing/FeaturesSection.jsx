import { FaUsers, FaChartLine, FaBell, FaLock, FaCalendarAlt, FaMobileAlt } from "react-icons/fa";

export const FeaturesSection = () => {
  const features = [
    { icon: <FaUsers size={30} />, title: "Unlimited members", description: "Add as many members as your group needs. No caps. Each member gets their own contribution history and status." },
    { icon: <FaChartLine size={30} />, title: "Live dashboards", description: "Real-time progress tracking, payout schedules, and contribution history — visualised beautifully." },
    { icon: <FaBell size={30} />, title: "Smart tracking", description: "Always know who has paid and who owes. Instant contribution recording with full audit trail." },
    { icon: <FaLock size={30} />, title: "Secure & private", description: "Your group data is protected. Only members you add can see your group's information." },
    { icon: <FaCalendarAlt size={30} />, title: "Payout scheduling", description: "Auto-generate rotation schedules. See whose turn is next and plan your finances with confidence." },
    { icon: <FaMobileAlt size={30} />, title: "Works everywhere", description: "Mobile-first design that works perfectly on any device. Manage your groups on the go." }
  ];

  return (
    <div className="sec-full" id="ft">
      <div className="sec-full-in">
        <div className="eyebrow">Features</div>
        <div className="sh">Everything your <em>ajo needs</em></div>
        
        <div className="feat-grid">
          {features.map(feature => (
            <div key={feature.title} className="feat-card">
              <div className="feat-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};