import { FaTimes } from "react-icons/fa";
import { HiUserAdd } from "react-icons/hi";
import { getGroupIcon } from "../../utils/helpers";

export const AddMemberModal = ({ onClose, onAdd, group, formData, setFormData }) => {
  return (
    <div className="ov" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="mod">
        <button className="mc" onClick={onClose}><FaTimes /></button>
        <div className="mt"><HiUserAdd size={28} /> Add a member</div>
        <div className="ms" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          Adding to: {getGroupIcon(group.icon, { size: 18 })} {group.name}
        </div>
        
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
            <option>Member</option>
            <option>Co-Admin</option>
          </select>
        </div>
        
        <div className="mf">
          <button className="bs" onClick={onClose}>Cancel</button>
          <button className="bp" onClick={onAdd}>Add Member →</button>
        </div>
      </div>
    </div>
  );
};