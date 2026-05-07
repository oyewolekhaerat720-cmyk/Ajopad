export const StatsStrip = () => {
  const stats = [
    { value: "₦2.4B+", label: "Total saved" },
    { value: "14,000+", label: "Active groups" },
    { value: "98.7%", label: "Payout success" },
    { value: "36", label: "States covered" }
  ];

  return (
    <div className="sstrip">
      {stats.map(stat => (
        <div key={stat.label} className="ssi">
          <div className="ssv">{stat.value}</div>
          <div className="ssl">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};