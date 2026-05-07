export const HowItWorksSection = () => {
  const steps = [
    { number: "01", title: "Create your group", description: "Set up a savings circle in minutes. Define contribution amounts, frequency, and duration. Invite members by name and phone." },
    { number: "02", title: "Track contributions", description: "Record every contribution with one tap. Payment history, progress charts, and reminders — everything in real time." },
    { number: "03", title: "Receive your payout", description: "When it's your turn, receive your full payout on schedule. Full transparency — everyone sees the rotation at all times." }
  ];

  return (
    <div className="sec" id="hw">
      <div className="eyebrow">How it works</div>
      <div className="sh">Three steps to <em>financial freedom</em></div>
      
      <div className="how-grid">
        {steps.map(step => (
          <div key={step.number} className="how-card">
            <div className="how-num">{step.number}</div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};