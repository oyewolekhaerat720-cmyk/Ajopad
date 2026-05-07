export const EmptyState = ({ icon, title, description }) => (
  <div className="empty">
    <div className="ei">{icon}</div>
    <div className="etit">{title}</div>
    <div className="edesc">{description}</div>
  </div>
);