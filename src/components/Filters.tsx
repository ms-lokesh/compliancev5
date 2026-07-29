import { ChevronDown } from 'lucide-react';

const Filters = () => {
  const filters = [
    { label: "AI / ML System", value: "All Systems" },
    { label: "Environment", value: "All" },
    { label: "Owner", value: "All" },
  ];

  return (
    <div className="flex items-center gap-4 py-4">
      {filters.map((filter, idx) => (
        <div key={idx} className="flex flex-col gap-1 w-48">
          <label className="text-[11px] font-medium text-slate-500">{filter.label}</label>
          <div className="flex items-center justify-between px-3 py-1.5 bg-white border border-slate-200 rounded-md text-[13px] text-slate-700 cursor-pointer hover:border-slate-300">
            <span>{filter.value}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Filters;
