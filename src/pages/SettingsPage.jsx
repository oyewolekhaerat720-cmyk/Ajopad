import { useState } from "react";
import { PageHeader } from "../sections/shared/PageHeader";
import { formatMoney } from "../utils/helpers";
import { FiSave } from "react-icons/fi";

export const SettingsPage = ({ 
  groupsCount, 
  activeGroups, 
  totalMembers, 
  totalSaved, 
  adminProfile, 
  onUpdateProfile 
}) => {
  const [profile, setProfile] = useState(adminProfile);

  const handleChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onUpdateProfile(profile);
  };

  return (
    <>
      <PageHeader 
        title="Account <em>Settings</em>" 
        subtitle="Manage your profile and preferences" 
      />
      
      <div className="settings-grid grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Profile Information */}
        <div className="card bg-card border border-border rounded-xl p-6">
          <div className="ctit mb-6">Profile Information</div>
          
          <div className="space-y-6">
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
            
            <button className="bp w-full flex items-center justify-center gap-2" onClick={handleSave}>
              <FiSave size={16} /> Save Changes
            </button>
          </div>
        </div>
        
        {/* Summary Card */}
        <div className="card bg-card border border-border rounded-xl p-6">
          <div className="ctit mb-6">Summary</div>
          
          <div className="space-y-1">
            {[
              ["Total groups", groupsCount],
              ["Active groups", activeGroups],
              ["Total members", totalMembers],
              ["Total saved", formatMoney(totalSaved)]
            ].map(([label, value]) => (
              <div 
                key={label} 
                className="flex justify-between items-center py-4 border-b border-border/50 last:border-b-0 text-sm"
              >
                <span className="text-ink3">{label}</span>
                <span className="text-gold font-fd font-semibold text-[15px]">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};