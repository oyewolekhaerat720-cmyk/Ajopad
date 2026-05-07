import { FiArrowRight } from "react-icons/fi";

export const Navbar = ({ onOpenApp }) => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="nav">
      <div className="logo">Ajo<em>Pad</em></div>
      <div className="nav-r">
        <button className="nl" onClick={() => scrollToSection("hw")}>How it works</button>
        <button className="nl" onClick={() => scrollToSection("ft")}>Features</button>
        <button className="nc" onClick={onOpenApp}>
          Open App <FiArrowRight size={14} />
        </button>
      </div>
    </nav>
  );
};