export const Tabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="flex gap-[2px] bg-bg3 rounded-rs p-[3px] mb-[22px] w-fit">
      {tabs.map(tab => (
        <button 
          key={tab} 
          className={`text-[13px] text-ink2 bg-none border-none py-[7px] px-[18px] rounded-[6px] cursor-pointer transition-all duration-150 hover:text-ink ${activeTab === tab ? "bg-card2 text-ink shadow-[0_1px_4px_rgba(0,0,0,0.3)]" : ""}`} 
          onClick={() => onTabChange(tab)}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
};