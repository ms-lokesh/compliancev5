import { AlertTriangle, ArrowRight } from 'lucide-react';

const AtRiskControls = () => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 mb-4">
      <h3 className="text-[13px] font-semibold text-slate-700 mb-4">Top Non-Compliant / At-Risk Controls</h3>
      
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[12px] font-semibold text-slate-800">Periodic Access Reviews</span>
              <span className="text-[11px] text-slate-600 mt-0.5">Access review is overdue for Q2</span>
              <span className="text-[10px] font-medium text-slate-500 mt-1">Due: Apr 30, 2025</span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-red-50 text-red-600 border border-red-100 text-[10px] font-medium shrink-0">High</span>
        </div>

        <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[12px] font-semibold text-slate-800">Least Privilege Access</span>
              <span className="text-[11px] text-slate-600 mt-0.5 leading-tight">3 service accounts have excessive permissions</span>
              <span className="text-[10px] font-medium text-slate-500 mt-1">Due: May 20, 2025</span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-600 border border-amber-100 text-[10px] font-medium shrink-0">Medium</span>
        </div>
      </div>
      
      <button className="flex items-center gap-1 text-[11px] font-medium text-blue-600 hover:text-blue-700 mt-3">
        View All Issues <ArrowRight className="w-3 h-3" />
      </button>
    </div>
  );
};

export default AtRiskControls;
