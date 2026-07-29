import React from 'react';

const RightPanel = () => {
  return (
    <aside className="w-80 bg-white border-l border-slate-200 h-full shrink-0 p-6 flex flex-col gap-6 overflow-y-auto z-20">
      <div>
        <h3 className="font-semibold text-slate-900 mb-4">Live Compliance Summary</h3>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500">Overall Score</span>
            <span className="text-sm font-semibold text-success">92%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500">Open Findings</span>
            <span className="text-sm font-semibold text-danger">3 Critical</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500">Evidence Coverage</span>
            <span className="text-sm font-semibold text-slate-900">89%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-500">Last Assessment</span>
            <span className="text-sm font-semibold text-slate-900">2 hrs ago</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <button className="w-full py-2 bg-secondary text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm">
          Generate Report
        </button>
        <button className="w-full py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
          Export PDF
        </button>
        <button className="w-full py-2 bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm">
          Download Evidence
        </button>
      </div>

      <div>
        <h3 className="font-semibold text-slate-900 mb-4">Executive Summary</h3>
        <div className="text-sm text-slate-600 flex flex-col gap-3">
          <p><strong>Top Risks:</strong> IAM Misconfigurations, Unencrypted S3 Buckets.</p>
          <p><strong>Recommendations:</strong> Review 3 open critical findings in AWS connector. Rotate stale GitHub credentials.</p>
          <p><strong>Next Audit Date:</strong> Oct 15, 2026</p>
        </div>
      </div>
      
      <div className="mt-auto pt-4 border-t border-slate-200">
        <h3 className="font-semibold text-slate-900 mb-4">Recent Activities</h3>
        <div className="flex flex-col gap-3 relative before:absolute before:inset-y-0 before:left-1.5 before:w-px before:bg-slate-200">
          {[
             "Evidence collected from GitHub", 
             "AWS IAM role risk generated", 
             "SOC2 CC6.1 Control validated"
          ].map((act, i) => (
            <div key={i} className="flex gap-3 relative z-10">
              <div className="w-3 h-3 rounded-full bg-blue-100 border-2 border-secondary mt-1 shrink-0" />
              <p className="text-xs text-slate-600">{act}</p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default RightPanel;
