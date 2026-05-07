export const Toast = ({ message, type = "success", show }) => {
  return (
    <div className={`fixed bottom-[26px] left-1/2 -translate-x-1/2 translate-y-[60px] bg-card2 border border-border2 text-ink py-[11px] px-6 rounded-full text-[13px] font-medium z-[999] transition-transform duration-300 pointer-events-none whitespace-nowrap shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${show ? "translate-x-1/2 translate-y-0" : ""} ${type === "success" ? "border-[rgba(42,157,106,0.35)] text-green" : type === "error" ? "border-[rgba(192,57,43,0.35)] text-red" : ""}`}>
      {message}
    </div>
  );
};