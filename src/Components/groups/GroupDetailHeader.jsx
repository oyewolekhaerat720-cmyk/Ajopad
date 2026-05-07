import { getGroupIcon } from "../../utils/helpers";

export const GroupDetailHeader = ({ group }) => (
  <div className="flex items-center gap-4 mt-4">
    {/* Icon */}
    <div className="w-14 h-14 bg-gold-dim rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
      {getGroupIcon(group.icon, { size: 28 })}
    </div>

    {/* Text Content */}
    <div className="flex-1 min-w-0">
      <div className="pt font-fd text-[34px] font-semibold text-ink tracking-[-0.5px] leading-none">
        {group.name}
      </div>
      <div className="ps text-ink2 text-[13px] mt-1">
        {group.description}
      </div>
    </div>

    {/* Status Badge */}
    <span className={`gst ${group.status || 'active'} ml-auto`}>
      {group.status || 'Active'}
    </span>
  </div>
);