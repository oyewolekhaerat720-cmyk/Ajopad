import { useState } from "react";
import { PageHeader } from "../sections/shared/PageHeader";
import { formatMoney } from "../utils/helpers";

export const PaymentsPage = ({ groups, onMakePayment }) => {
  const [groupId, setGroupId] = useState(groups[0]?.id ?? "");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handlePay = () => {
    if (!groupId || !amount) return;
    onMakePayment(groupId, parseInt(amount), note || "PayPal payment");
    setAmount("");
    setNote("");
  };

  return (
    <>
      <PageHeader 
        title="Pay <em>with</em> AjoPay" 
        subtitle="A PayPal-style payment experience for your contributions." 
      />

      {/* Header Card */}
      <div className="card bg-card border border-border rounded-xl p-6 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="pt font-fd text-[22px] text-ink">Secure payment</div>
            <div className="ps text-ink2 mt-1">
              Select a group and pay your contribution using a fast checkout experience.
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-5 py-2.5 rounded-2xl bg-white/10 text-gold font-bold">PayPal</div>
            <div className="px-5 py-2.5 rounded-2xl bg-white/10 text-ink3">Visa</div>
          </div>
        </div>
      </div>

      <div className="gg grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Payment Form */}
        <div className="card bg-card border border-border rounded-xl p-6">
          <div className="ctit">Payment details</div>
          
          <div className="space-y-6 mt-6">
            <div>
              <label className="fl">Choose group</label>
              <select
                value={groupId}
                onChange={(e) => setGroupId(Number(e.target.value))}
                className="fi w-full"
              >
                {groups.map(group => (
                  <option key={group.id} value={group.id}>{group.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="fl">Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="fi w-full"
              />
            </div>

            <div>
              <label className="fl">Note</label>
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Payment note (optional)"
                className="fi w-full"
              />
            </div>

            <button 
              className="bp w-full py-4 text-base" 
              onClick={handlePay}
            >
              Pay with PayPal
            </button>
          </div>
        </div>

        {/* PayPal Preview */}
        <div className="card bg-gradient-to-b from-[#211C19] to-[#1D1915] border border-border rounded-xl p-6">
          <div className="ctit text-ink">PayPal preview</div>
          
          <div className="mt-6 space-y-4">
            <div className="bg-white/5 rounded-2xl p-5">
              <div className="ps text-ink2">Selected group</div>
              <div className="text-ink font-semibold mt-2 text-lg">
                {groups.find(g => g.id === groupId)?.name || "Choose a group"}
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-5">
              <div className="ps text-ink2">Amount to pay</div>
              <div className="text-ink font-semibold mt-2 text-lg">
                {amount ? formatMoney(amount) : "—"}
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-5">
              <div className="ps text-ink2">Method</div>
              <div className="text-ink font-semibold mt-2 text-lg">PayPal</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};