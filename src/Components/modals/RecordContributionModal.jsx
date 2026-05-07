import { FaTimes } from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";
import { formatMoney } from "../../utils/helpers";

export const RecordContributionModal = ({ onClose, onRecord, group, formData, setFormData }) => {
  return (
    <div className="ov" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="mod">
        <button className="mc" onClick={onClose}><FaTimes /></button>
        <div className="mt"><GiPayMoney size={28} /> Record contribution</div>
        <div className="ms">{group.icon} {group.name}</div>
        
        <div className="fg">
          <label className="fl">Member *</label>
          <select 
            className="fsl" 
            value={formData.mid} 
            onChange={e => setFormData({ ...formData, mid: e.target.value })}
          >
            <option value="">Select member...</option>
            {group.members.map(member => (
              <option key={member.id} value={member.id}>{member.name}</option>
            ))}
          </select>
        </div>
        
        <div className="fg">
          <label className="fl">Amount (₦) *</label>
          <input 
            className="fi" 
            type="number" 
            placeholder={`Standard: ${formatMoney(group.amount)}`} 
            value={formData.amount} 
            onChange={e => setFormData({ ...formData, amount: e.target.value })} 
          />
        </div>
        
        <div className="fg">
          <label className="fl">Note (optional)</label>
          <input 
            className="fi" 
            placeholder="e.g. April contribution" 
            value={formData.note} 
            onChange={e => setFormData({ ...formData, note: e.target.value })} 
          />
        </div>
        
        <div className="mf">
          <button className="bs" onClick={onClose}>Cancel</button>
          <button className="bp" onClick={onRecord}>Record →</button>
        </div>
      </div>
    </div>
  );
};