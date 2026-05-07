import { useState } from "react";
import { PageHeader } from "../sections/shared/PageHeader";
import { formatMoney } from "../utils/helpers";
import { FiSave } from "react-icons/fi";

export const SettingsPage = ({ groupsCount, activeGroups, totalMembers, totalSaved, adminProfile, onUpdateProfile }) => {
  const [profile, setProfile] = useState(adminProfile);

  const handleChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onUpdateProfile(profile);
  };

  return (
    <>
      <PageHeader title="Account <em>Settings</em>" subtitle="Manage your profile and preferences" />
      
      <div className="settings-grid">
        <div className="card cp">
          <div className="ctit" style={{ marginBottom: 18 }}>Profile Information</div>
          
          <div className="fg">
            <label className="fl">Full Name</label>
            <input 
              className="fi" 
              value={profile.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
          </div>
          
          <div className="fg">
            <label className="fl">Phone</label>
            <input 
              className="fi" 
              value={profile.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>
          
          <div className="fg">
            <label className="fl">Email</label>
            <input 
              className="fi" 
              value={profile.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
          
          <button className="bp" onClick={handleSave}>
            <FiSave size={14} /> Save Changes
          </button>
        </div>
        
        <div className="card cp">
          <div className="ctit" style={{ marginBottom: 18 }}>Summary</div>
          
          {[
            ["Total groups", groupsCount],
            ["Active groups", activeGroups],
            ["Total members", totalMembers],
            ["Total saved", formatMoney(totalSaved)]
          ].map(([label, value]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(42,37,32,.35)", fontSize: 13 }}>
              <span style={{ color: "var(--ink3)" }}>{label}</span>
              <span style={{ color: "var(--gold)", fontWeight: 600, fontFamily: "var(--fd)", fontSize: 15 }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
