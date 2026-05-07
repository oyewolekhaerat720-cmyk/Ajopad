import { FaTimes } from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";
import { formatMoney, getGroupIcon } from "../../utils/helpers";

export const RecordContributionModal = ({ onClose, onRecord, group, formData, setFormData }) => {
  return (
    <div 
      className="fixed inset-0 bg-[rgba(6,5,4,0.88)] backdrop-blur-[10px] z-50 flex items-center justify-center p-6"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-bg2 border border-border2 rounded-[20px] p-9 w-full max-w-[500px] max-h-[90vh] overflow-y-auto relative">
        <button 
          className="absolute top-[18px] right-[18px] bg-none border-none text-ink3 text-[22px] cursor-pointer leading-none transition-colors duration-150 flex items-center justify-center hover:text-ink"
          onClick={onClose}
        >
          <FaTimes />
        </button>
        <div className="font-family-fd text-[28px] font-semibold text-ink mb-[5px] tracking-[-0.3px] flex items-center gap-2.5">
          <GiPayMoney size={28} /> Record contribution
        </div>
        <div className="text-[13px] text-ink2 mb-6 font-light flex items-center gap-2">
          {getGroupIcon(group.icon, { size: 18 })}
          {group.name}
        </div>
        
        <div className="mb-4">
          <label className="text-[11px] font-medium text-ink2 block mb-1.5 tracking-[0.4px] font-family-fm uppercase">Member *</label>
          <select 
            className="w-full bg-bg3 border border-border rounded-rs text-ink font-family-fb text-[14px] py-[11px] px-[13px] outline-none transition-colors duration-200 focus:border-gold appearance-none cursor-pointer"
            value={formData.mid} 
            onChange={e => setFormData({ ...formData, mid: e.target.value })}
          >
            <option value="">Select member...</option>
            {group.members.map(member => (
              <option key={member.id} value={member.id}>{member.name}</option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label className="text-[11px] font-medium text-ink2 block mb-1.5 tracking-[0.4px] font-family-fm uppercase">Amount (₦) *</label>
          <input 
            className="w-full bg-bg3 border border-border rounded-rs text-ink font-family-fb text-[14px] py-[11px] px-[13px] outline-none transition-colors duration-200 placeholder:text-ink3 focus:border-gold"
            type="number" 
            placeholder={`Standard: ${formatMoney(group.amount)}`} 
            value={formData.amount} 
            onChange={e => setFormData({ ...formData, amount: e.target.value })} 
          />
        </div>
        
        <div className="mb-4">
          <label className="text-[11px] font-medium text-ink2 block mb-1.5 tracking-[0.4px] font-family-fm uppercase">Note (optional)</label>
          <input 
            className="w-full bg-bg3 border border-border rounded-rs text-ink font-family-fb text-[14px] py-[11px] px-[13px] outline-none transition-colors duration-200 placeholder:text-ink3 focus:border-gold"
            placeholder="e.g. April contribution" 
            value={formData.note} 
            onChange={e => setFormData({ ...formData, note: e.target.value })} 
          />
        </div>
        
        <div className="flex gap-2.5 mt-6 justify-end">
          <button 
            className="text-[13px] font-normal text-ink2 bg-transparent border border-border2 py-[10px] px-[22px] rounded-[100px] cursor-pointer transition-all duration-200 whitespace-nowrap inline-flex items-center gap-2 hover:border-gold hover:text-gold"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="text-[13px] font-semibold text-[#060504] bg-gold border-none py-[10px] px-[22px] rounded-[100px] cursor-pointer transition-all duration-200 whitespace-nowrap inline-flex items-center gap-2 hover:bg-gold2 hover:-translate-y-[1px]"
            onClick={onRecord}
          >
            Record →
          </button>
        </div>
      </div>
    </div>
  );
};