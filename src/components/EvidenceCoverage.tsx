import { ArrowUp } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const EvidenceCoverage = () => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 mb-4 flex items-center justify-between">
      <div className="flex flex-col">
        <h3 className="text-[13px] font-semibold text-slate-700">Evidence Coverage (CC6)</h3>
        <span className="text-[11px] text-slate-500 mt-0.5">Total Evidence Items</span>
        <div className="flex items-end gap-3 mt-1">
          <span className="text-3xl font-bold text-slate-800 leading-none">128</span>
          <div className="flex items-center gap-1 text-[10px] text-green-600 font-medium mb-1">
            <ArrowUp className="w-3 h-3" />
            <span>12 vs last period</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-center shrink-0">
        <div className="relative w-[72px] h-[72px] flex items-center justify-center">
          <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
            <circle cx="18" cy="18" r="15.91549430918954" fill="none" stroke="#f1f5f9" strokeWidth="4" />
            <circle cx="18" cy="18" r="15.91549430918954" fill="none" stroke="#22c55e" strokeWidth="4" strokeDasharray="91 100" strokeDashoffset="0" strokeLinecap="round" className="transition-all duration-300 hover:stroke-green-400 cursor-pointer" />
            <title>Coverage: 91%</title>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[13px] font-bold text-slate-800">91%</span>
          </div>
        </div>
        <span className="text-[10px] text-slate-500 font-medium -mt-1">Coverage</span>
      </div>
    </div>
  );
};

export default EvidenceCoverage;
