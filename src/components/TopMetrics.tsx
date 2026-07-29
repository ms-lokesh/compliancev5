import { Cpu, ArrowUp, ArrowRight, X } from 'lucide-react';
import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const TopMetrics = ({ data }: { data: any }) => {
  const [activeModal, setActiveModal] = useState<'systems' | 'issues' | null>(null);
  const score = data?.score ?? 87;
  const passed = data?.passed ?? 10;
  const partial = data?.partial ?? 3;
  const failed = data?.failed ?? 1;
  const total = passed + partial + failed;

  const chartData = [
    { name: 'Compliant', value: passed, color: '#22c55e' },
    { name: 'Partial', value: partial, color: '#f59e0b' },
    { name: 'Non-Compliant', value: failed, color: '#ef4444' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      
      {/* 1. Overall Compliance */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 flex flex-col items-center relative overflow-hidden">
        <h3 className="text-[13px] font-semibold text-slate-700 self-start w-full mb-1">Overall Compliance (CC6)</h3>
        <div className="relative w-full h-28 flex flex-col items-center justify-end mt-2">
           <svg viewBox="0 0 100 55" className="w-40 h-auto overflow-visible absolute top-0">
             <path d="M 10,50 A 40,40 0 0,1 90,50" fill="none" stroke="#f1f5f9" strokeWidth="12" strokeLinecap="round" />
             <path d="M 10,50 A 40,40 0 0,1 90,50" fill="none" stroke="#22c55e" strokeWidth="12" strokeLinecap="round" 
                   strokeDasharray="125.66" strokeDashoffset={125.66 * (1 - score / 100)} className="transition-all duration-300 hover:stroke-green-400 cursor-pointer" />
             <title>Compliant: {score}%</title>
           </svg>
           <div className="flex flex-col items-center z-10 mb-2">
             <span className="text-3xl font-bold text-slate-800 leading-none">{score}%</span>
             <span className="text-[11px] font-medium text-green-600 mt-1">Compliant</span>
           </div>
        </div>
        <div className="flex items-center gap-1 text-[11px] text-green-600 font-medium mt-4">
          <ArrowUp className="w-3 h-3" />
          <span>8% vs last period</span>
        </div>
      </div>

      {/* 2. Controls Status */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 flex flex-col">
        <h3 className="text-[13px] font-semibold text-slate-700 mb-3">Controls Status (CC6)</h3>
        <div className="flex flex-col gap-2 flex-1">
          <div className="flex items-center gap-2">
             <div className="w-3.5 h-3.5 rounded-full bg-green-500 flex items-center justify-center text-white text-[8px]">✓</div>
             <span className="text-sm font-bold text-slate-800 w-4">{passed}</span>
             <span className="text-[13px] text-slate-600">Compliant</span>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-3.5 h-3.5 rounded-full bg-amber-500 flex items-center justify-center text-white text-[8px]">!</div>
             <span className="text-sm font-bold text-slate-800 w-4">{partial}</span>
             <span className="text-[13px] text-slate-600">Partially Compliant</span>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-3.5 h-3.5 rounded-full bg-red-500 flex items-center justify-center text-white text-[10px]">×</div>
             <span className="text-sm font-bold text-slate-800 w-4">{failed}</span>
             <span className="text-[13px] text-slate-600">Non-Compliant</span>
          </div>
          <div className="flex items-center gap-2 opacity-50">
             <div className="w-3.5 h-3.5 rounded-full bg-slate-300 border border-white" />
             <span className="text-sm font-bold text-slate-800 w-4">0</span>
             <span className="text-[13px] text-slate-600">Not Applicable</span>
          </div>
        </div>
        <div className="text-[11px] text-slate-500 font-medium mt-3 border-t border-slate-100 pt-2">
          Total: {total} Mandatory Controls
        </div>
      </div>

      {/* 3. AI / ML Systems */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 flex flex-col justify-between">
        <h3 className="text-[13px] font-semibold text-slate-700">AI / ML Systems in Scope</h3>
        <div className="flex items-center justify-between mt-1">
          <div>
            <span className="text-4xl font-bold text-slate-800">8</span>
            <div className="text-[12px] text-slate-600 mt-2">
              <p>Production: 6</p>
              <p>Non-Production: 2</p>
            </div>
          </div>
          <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
            <Cpu className="w-8 h-8 text-indigo-400 stroke-1" />
          </div>
        </div>
        <button 
          onClick={() => setActiveModal('systems')}
          className="flex items-center gap-1 text-[12px] font-medium text-blue-600 hover:text-blue-700 mt-4"
        >
          View All Systems <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* 4. Access Reviews */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 flex flex-col items-center">
        <h3 className="text-[13px] font-semibold text-slate-700 self-start w-full">Access Reviews</h3>
        <div className="relative w-24 h-24 mt-2">
           <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={[{name: 'Completed', value: 92}, {name: 'Pending', value: 8}]} cx="50%" cy="50%" innerRadius={34} outerRadius={46} dataKey="value" stroke="none" cornerRadius={2}>
                  <Cell fill="#22c55e" />
                  <Cell fill="#f1f5f9" />
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '6px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', fontSize: '11px', padding: '4px 8px' }}
                  itemStyle={{ color: '#334155', fontWeight: 500 }}
                  formatter={(value: any, name: any) => [`${value}%`, name]}
                />
              </PieChart>
           </ResponsiveContainer>
           <div className="absolute inset-0 flex flex-col items-center justify-center pt-1">
             <span className="text-xl font-bold text-slate-800">92%</span>
             <span className="text-[9px] text-slate-500 -mt-1">Completed</span>
           </div>
        </div>
        <div className="text-[11px] font-medium text-slate-600 mt-auto pt-4">
          Next Review Due: Jun 30, 2025
        </div>
      </div>

      {/* 5. Open Issues */}
      <div className="bg-white rounded-lg border border-slate-200 p-4 flex flex-col justify-between">
        <h3 className="text-[13px] font-semibold text-slate-700">Open Issues</h3>
        <div className="mt-2">
          <span className="text-4xl font-bold text-red-600">2</span>
          <div className="flex items-center gap-3 text-[12px] font-medium mt-3">
             <div className="flex gap-1"><span className="text-slate-600">High:</span> <span className="text-red-600">1</span></div>
             <div className="flex gap-1"><span className="text-slate-600">Medium:</span> <span className="text-amber-500">1</span></div>
             <div className="flex gap-1"><span className="text-slate-600">Low:</span> <span>0</span></div>
          </div>
        </div>
        <button 
          onClick={() => setActiveModal('issues')}
          className="flex items-center gap-1 text-[12px] font-medium text-blue-600 hover:text-blue-700 mt-auto"
        >
          View All Issues <ArrowRight className="w-3 h-3" />
        </button>
      </div>

    {/* Modal Overlay */}
      {activeModal && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden">
            <div className="flex items-center justify-between p-5 border-b border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800">
                {activeModal === 'systems' ? 'AI / ML Systems Inventory' : 'Open Issues Tracking'}
              </h2>
              <button 
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5">
              {activeModal === 'systems' ? (
                <div className="space-y-4">
                  {[
                    { name: 'Recommendation Engine', type: 'Production', risk: 'High', status: 'Compliant' },
                    { name: 'Fraud Detection Model', type: 'Production', risk: 'Critical', status: 'Compliant' },
                    { name: 'Customer Support Bot', type: 'Production', risk: 'Medium', status: 'Partial' },
                    { name: 'Pricing Optimizer', type: 'Production', risk: 'High', status: 'Compliant' },
                    { name: 'Churn Predictor (Staging)', type: 'Non-Production', risk: 'Low', status: 'Compliant' },
                    { name: 'Sentiment Analyzer v2', type: 'Non-Production', risk: 'Medium', status: 'Non-Compliant' },
                  ].map((sys, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-slate-200 rounded-lg bg-slate-50 gap-4">
                      <div>
                        <p className="font-semibold text-slate-800">{sys.name}</p>
                        <p className="text-sm text-slate-500 mt-1">{sys.type}</p>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className={`px-2.5 py-1 rounded-full font-medium ${sys.risk === 'Critical' || sys.risk === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>Risk: {sys.risk}</span>
                        <span className={`font-medium ${sys.status === 'Compliant' ? 'text-green-600' : sys.status === 'Partial' ? 'text-amber-500' : 'text-red-500'}`}>{sys.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {[
                    { id: 'ISS-409', title: 'Service account missing rotation policy', severity: 'High', date: 'May 10, 2025' },
                    { id: 'ISS-412', title: 'Inactive admins detected in AWS IAM', severity: 'Medium', date: 'May 11, 2025' },
                  ].map((issue, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-slate-200 rounded-lg bg-slate-50 gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-400">{issue.id}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${issue.severity === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{issue.severity}</span>
                        </div>
                        <p className="font-medium text-slate-800 mt-2">{issue.title}</p>
                      </div>
                      <div className="text-sm text-slate-500 whitespace-nowrap">
                        Reported: {issue.date}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-slate-200 bg-slate-50 text-right">
              <button 
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopMetrics;
