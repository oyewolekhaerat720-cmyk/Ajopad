import { FaTimes } from "react-icons/fa";
import { MdGroupAdd } from "react-icons/md";
import { formatMoney } from "../../utils/helpers";

export const CreateGroupModal = ({ onClose, onCreate, formData, setFormData }) => {
  const totalTarget = formData.amount && formData.dur 
    ? formatMoney(parseInt(formData.amount) * parseInt(formData.dur))
    : "—";

  return (
    <div className="ov" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="mod">
        <button className="mc" onClick={onClose}><FaTimes /></button>
        <div className="mt"><MdGroupAdd size={28} /> Create a new group</div>
        <div className="ms">Set up your savings circle in seconds. An icon will be assigned automatically.</div>
        
        <div className="fg">
          <label className="fl">Group Name *</label>
          <input 
            className="fi" 
            placeholder="e.g. Lagos Hustlers" 
            value={formData.name} 
            onChange={e => setFormData({ ...formData, name: e.target.value })} 
          />
        </div>
        
        <div className="fg">
          <label className="fl">Description</label>
          <input 
            className="fi" 
            placeholder="What is this group saving for?" 
            value={formData.desc} 
            onChange={e => setFormData({ ...formData, desc: e.target.value })} 
          />
        </div>
        
        <div className="fr">
          <div className="fg">
            <label className="fl">Amount (₦) *</label>
            <input 
              className="fi" 
              type="number" 
              placeholder="e.g. 25000" 
              value={formData.amount} 
              onChange={e => setFormData({ ...formData, amount: e.target.value })} 
            />
          </div>
          <div className="fg">
            <label className="fl">Frequency</label>
            <select 
              className="fsl" 
              value={formData.freq} 
              onChange={e => setFormData({ ...formData, freq: e.target.value })}
            >
              {["Weekly", "Bi-weekly", "Monthly", "Quarterly"].map(f => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="fg">
          <label className="fl">Duration (cycles)</label>
          <input 
            className="fi" 
            type="number" 
            placeholder="e.g. 12" 
            value={formData.dur} 
            onChange={e => setFormData({ ...formData, dur: e.target.value })} 
          />
          <div className="fh">Total target: {totalTarget}</div>
        </div>
        
        <div className="mf">
          <button className="bs" onClick={onClose}>Cancel</button>
          <button className="bp" onClick={onCreate}>Create Group →</button>
        </div>
      </div>
    </div>
  );
};