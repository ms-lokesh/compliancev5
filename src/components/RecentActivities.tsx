import { ArrowRight } from 'lucide-react';

const RecentActivities = () => {
  const activities = [
    { date: "May 12, 2025 09:15 AM", desc: "User jdoe accessed model: Demand_Forecast_v3", loc: "Databricks" },
    { date: "May 12, 2025 08:42 AM", desc: "Service account ml-pipeline-prod accessed S3 bucket", loc: "AWS IAM" },
    { date: "May 11, 2025 11:30 PM", desc: "User asmith updated role assignment", loc: "Okta" },
    { date: "May 11, 2025 07:20 PM", desc: "User rbrown downloaded training dataset", loc: "Snowflake" },
    { date: "May 11, 2025 05:10 PM", desc: "MFA challenge failed for user kwhite", loc: "Okta" },
  ];

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[13px] font-semibold text-slate-700">Recent Access Activities (Sample)</h3>
        <button className="flex items-center gap-1 text-[11px] font-medium text-blue-600 hover:text-blue-700">
          View All <ArrowRight className="w-3 h-3" />
        </button>
      </div>
      
      <div className="flex flex-col divide-y divide-slate-100">
        {activities.map((act, idx) => (
          <div key={idx} className="flex items-center py-2 gap-4 text-[11px]">
            <span className="text-slate-500 w-32 shrink-0">{act.date}</span>
            <span className="text-slate-700 flex-1 truncate">{act.desc}</span>
            <span className="text-slate-500 w-24 shrink-0 text-right">{act.loc}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400">
        <div className="flex items-center gap-1">
           <div className="w-3 h-3 rounded-full border border-slate-300 flex items-center justify-center text-[8px]">i</div>
           All times shown in Pacific Time (PT)
        </div>
        <div className="flex items-center gap-2">
          <span>AI Governance Reporter™</span>
          <span>•</span>
          <span>SOC 2 Type II</span>
          <span>•</span>
          <span>CC6 Dashboard</span>
        </div>
      </div>
    </div>
  );
};

export default RecentActivities;
