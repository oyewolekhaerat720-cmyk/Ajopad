import { FiArrowRight } from "react-icons/fi";

export const Navbar = ({ onOpenApp }) => {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="nav flex items-center justify-between px-13 py-5 fixed top-0 left-0 right-0 z-50 bg-black/88 backdrop-blur-3xl border-b border-gold/10">
      <div className="logo font-fd text-[26px] font-bold text-ink tracking-wide cursor-pointer">
        Ajo<em className="text-gold">Pad</em>
      </div>

      <div className="nav-r flex items-center gap-1">
        <button 
          className="nl text-xs text-ink2 hover:text-ink hover:bg-white/5 px-4 py-2 rounded-full transition-all"
          onClick={() => scrollToSection("hw")}
        >
          How it works
        </button>
        
        <button 
          className="nl text-xs text-ink2 hover:text-ink hover:bg-white/5 px-4 py-2 rounded-full transition-all"
          onClick={() => scrollToSection("ft")}
        >
          Features
        </button>

        <button 
          className="nc text-xs font-semibold bg-gold text-bg px-6 py-[9px] rounded-full flex items-center gap-2 hover:bg-gold2 active:scale-95 transition-all"
          onClick={onOpenApp}
        >
          Open App <FiArrowRight size={14} />
        </button>
      </div>
    </nav>
  );
};