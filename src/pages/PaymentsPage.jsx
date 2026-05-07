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
      <PageHeader title="Pay <em>with</em> AjoPay" subtitle="A PayPal-style payment experience for your contributions." />

      <div className="card" style={{ padding: 24, marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 18 }}>
          <div>
            <div className="pt">Secure payment</div>
            <div className="ps">Select a group and pay your contribution using a fast checkout experience.</div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: "rgba(255,255,255,.06)", color: "var(--gold)", fontWeight: 700 }}>PayPal</div>
            <div style={{ padding: "10px 16px", borderRadius: 12, background: "rgba(255,255,255,.06)", color: "var(--ink3)" }}>Visa</div>
          </div>
        </div>
      </div>

      <div className="gg" style={{ gap: 20 }}>
        <div className="card" style={{ flex: 1, padding: 24 }}>
          <div className="ctit">Payment details</div>
          <div style={{ display: "grid", gap: 16, marginTop: 18 }}>
            <div>
              <label className="fl">Choose group</label>
              <select
                value={groupId}
                onChange={(e) => setGroupId(Number(e.target.value))}
                style={{ width: "100%", padding: 12, borderRadius: 14, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.02)", color: "var(--ink)" }}
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
                style={{ width: "100%", padding: 12, borderRadius: 14, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.02)", color: "var(--ink)" }}
              />
            </div>
            <div>
              <label className="fl">Note</label>
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Payment note (optional)"
                style={{ width: "100%", padding: 12, borderRadius: 14, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.02)", color: "var(--ink)" }}
              />
            </div>
            <button className="bp" style={{ width: "100%" }} onClick={handlePay}>Pay with PayPal</button>
          </div>
        </div>

        <div className="card" style={{ flex: 1, padding: 24, background: "linear-gradient(180deg, rgba(33, 28, 25, 0.95), rgba(29, 25, 21, 0.95))" }}>
          <div className="ctit">PayPal preview</div>
          <div style={{ marginTop: 14, display: "grid", gap: 14 }}>
            <div style={{ padding: 16, borderRadius: 18, background: "rgba(255,255,255,.04)" }}>
              <div className="ps">Selected group</div>
              <div style={{ fontWeight: 600, marginTop: 6 }}>{groups.find(group => group.id === groupId)?.name || "Choose a group"}</div>
            </div>
            <div style={{ padding: 16, borderRadius: 18, background: "rgba(255,255,255,.04)" }}>
              <div className="ps">Amount to pay</div>
              <div style={{ fontWeight: 600, marginTop: 6 }}>{amount ? formatMoney(amount) : "—"}</div>
            </div>
            <div style={{ padding: 16, borderRadius: 18, background: "rgba(255,255,255,.04)" }}>
              <div className="ps">Method</div>
              <div style={{ fontWeight: 600, marginTop: 6 }}>PayPal</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};