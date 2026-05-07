import { GiNigeria } from "react-icons/gi";

export const Footer = () => (
  <div className="footer border-t border-border py-8 px-13 bg-bg2 flex justify-between items-center">
    <div className="fl font-fd text-[20px] font-bold text-ink2 flex items-center gap-1">
      Ajo<em className="text-gold">Pad</em>
    </div>
    <div className="fc text-xs text-ink3 font-fm flex items-center gap-1.5">
      © 2026 AjoPad · Built for Nigeria <GiNigeria size={14} />
    </div>
  </div>
);