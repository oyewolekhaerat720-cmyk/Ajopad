import { FaTimes } from "react-icons/fa";
import { HiUserAdd } from "react-icons/hi";
import { getGroupIcon } from "../../utils/helpers";

export const AddMemberModal = ({ onClose, onAdd, group, formData, setFormData }) => {
  return (
    <div 
      className="ov fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="mod bg-bg2 border border-border2 rounded-3xl p-9 w-full max-w-md max-h-[90vh] overflow-y-auto relative">
        
        {/* Close Button */}
        <button 
          className="mc absolute top-6 right-6 text-2xl text-ink3 hover:text-ink transition-colors"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        {/* Title */}
        <div className="mt flex items-center gap-3 text-ink mb-2">
          <HiUserAdd size={28} className="text-gold" /> 
          Add a member
        </div>

        {/* Group Info */}
        <div className="ms flex items-center gap-2 text-ink2 mb-8">
          Adding to: {getGroupIcon(group.icon, { size: 18 })} {group.name}
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          <div className="fg">
            <label className="fl">Full Name *</label>
            <input 
              className="fi" 
              placeholder="e.g. Amaka Eze" 
              value={formData.name} 
              onChange={e => setFormData({ ...formData, name: e.target.value })} 
            />
          </div>
          
          <div className="fg">
            <label className="fl">Phone Number *</label>
            <input 
              className="fi" 
              placeholder="e.g. 080-1234-5678" 
              value={formData.phone} 
              onChange={e => setFormData({ ...formData, phone: e.target.value })} 
            />
          </div>
          
          <div className="fg">
            <label className="fl">Role</label>
            <select 
              className="fsl" 
              value={formData.role} 
              onChange={e => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="Member">Member</option>
              <option value="Co-Admin">Co-Admin</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mf flex gap-3 mt-10 justify-end">
          <button className="bs" onClick={onClose}>Cancel</button>
          <button className="bp" onClick={onAdd}>Add Member →</button>
        </div>
      </div>
    </div>
  );
};