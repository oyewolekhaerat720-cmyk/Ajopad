export const PageHeader = ({ title, subtitle }) => (
  <div className="ph">
    <div className="pt" dangerouslySetInnerHTML={{ __html: title }} />
    <div className="ps">{subtitle}</div>
  </div>
);