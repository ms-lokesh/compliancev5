import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const ComplianceStatusChart = ({ data: _data }: { data?: any }) => {
  const data = [
    { name: 'Compliant', value: 10, color: '#22c55e' },
    { name: 'Partially Compliant', value: 3, color: '#eab308' },
    { name: 'Non-Compliant', value: 1, color: '#ef4444' },
    { name: 'Not Applicable', value: 0, color: '#cbd5e1' },
  ];

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 mb-4">
      <h3 className="text-[13px] font-semibold text-slate-700 mb-4">Compliance by Status (CC6)</h3>
      <div className="flex items-center gap-4">
        <div className="w-28 h-28 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data.filter(d => d.value > 0)}
                cx="50%"
                cy="50%"
                innerRadius={32}
                outerRadius={48}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
                cornerRadius={2}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', fontSize: '12px' }}
                itemStyle={{ color: '#334155', fontWeight: 500 }}
                formatter={(value: any, name: any) => [`${value} controls`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex flex-col gap-3 flex-1">
           <div className="flex items-start gap-2">
             <div className="w-2.5 h-2.5 rounded-full mt-1 shrink-0 bg-[#22c55e]" />
             <div className="flex flex-col">
                <div className="flex gap-1 items-center">
                  <span className="text-[13px] font-bold text-slate-800">10</span>
                  <span className="text-[11px] font-medium text-slate-500">(71%)</span>
                </div>
                <span className="text-[11px] text-slate-600">Compliant</span>
             </div>
           </div>
           
           <div className="flex items-start gap-2">
             <div className="w-2.5 h-2.5 rounded-full mt-1 shrink-0 bg-[#eab308]" />
             <div className="flex flex-col">
                <div className="flex gap-1 items-center">
                  <span className="text-[13px] font-bold text-slate-800">3</span>
                  <span className="text-[11px] font-medium text-slate-500">(21%)</span>
                </div>
                <span className="text-[11px] text-slate-600">Partially Compliant</span>
             </div>
           </div>
           
           <div className="flex items-start gap-2">
             <div className="w-2.5 h-2.5 rounded-full mt-1 shrink-0 bg-[#ef4444]" />
             <div className="flex flex-col">
                <div className="flex gap-1 items-center">
                  <span className="text-[13px] font-bold text-slate-800">1</span>
                  <span className="text-[11px] font-medium text-slate-500">(7%)</span>
                </div>
                <span className="text-[11px] text-slate-600">Non-Compliant</span>
             </div>
           </div>
           
           <div className="flex items-start gap-2 opacity-50">
             <div className="w-2.5 h-2.5 rounded-full mt-1 shrink-0 bg-slate-300" />
             <div className="flex flex-col">
                <div className="flex gap-1 items-center">
                  <span className="text-[13px] font-bold text-slate-800">0</span>
                  <span className="text-[11px] font-medium text-slate-500">(0%)</span>
                </div>
                <span className="text-[11px] text-slate-600">Not Applicable</span>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceStatusChart;
