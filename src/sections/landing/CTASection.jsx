import { FiArrowRight } from "react-icons/fi";

export const CTASection = ({ onOpenApp }) => (
  <div className="cta-sec">
    <h2>Ready to <em>start saving?</em></h2>
    <p>Join thousands of Nigerians already using AjoPad to manage their savings circles.</p>
    <button className="bpri" onClick={onOpenApp}>
      Open AjoPad free <FiArrowRight size={16} />
    </button>
  </div>
);