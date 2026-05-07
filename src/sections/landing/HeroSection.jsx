import { FiArrowRight } from "react-icons/fi";

export const HeroSection = ({ onOpenApp }) => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="hero">
      <div className="hbg"></div>
      <div className="hgrid"></div>
      <div className="horb horb1"></div>
      <div className="horb horb2"></div>
      
      <div className="hi">
        <div className="htag">
          <span className="hdot"></span>
          Now live — Beta v1.0
        </div>
        
        <h1>
          <em>Save together,</em>
          <strong>Grow together.</strong>
        </h1>
        
        <p className="hsub">
          AjoPad brings Nigeria's most trusted communal savings tradition into the digital age. 
          Manage ajo groups, track contributions, and never miss a payout — all in one elegant platform.
        </p>
        
        <div className="hbtns">
          <button className="bpri" onClick={onOpenApp}>
            Start saving free <FiArrowRight size={16} />
          </button>
          <button className="bsec" onClick={() => scrollToSection("hw")}>
            See how it works
          </button>
        </div>
      </div>
    </div>
  );
};