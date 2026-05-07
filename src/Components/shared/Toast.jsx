export const Toast = ({ message, type = "success", show }) => {
  return (
    <div className={`toast ${show ? "show" : ""} ${type}`}>
      {message}
    </div>
  );
};