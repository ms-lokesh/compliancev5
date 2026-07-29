import { useState, useEffect } from 'react';
import { Database, Search, Filter, Download, FileText, CheckCircle2 } from 'lucide-react';

const MOCK_EVIDENCE = [
  { id: 'EV-1042', name: 'AWS IAM Password Policy', source: 'AWS', date: '2025-05-15', status: 'Valid', mapped: 'CC6.1' },
  { id: 'EV-1043', name: 'GitHub Branch Protection Rules', source: 'GitHub', date: '2025-05-14', status: 'Valid', mapped: 'CC6.8' },
  { id: 'EV-1044', name: 'Jira Access Reviews Q1', source: 'Jira', date: '2025-04-01', status: 'Valid', mapped: 'CC6.2' },
];

const Evidence = () => {
  const [evidenceList, setEvidenceList] = useState<any[]>(MOCK_EVIDENCE);

  useEffect(() => {
    const stored = localStorage.getItem('compliance_evidence');
    if (stored) {
      const parsed = JSON.parse(stored);
      setEvidenceList([...parsed, ...MOCK_EVIDENCE]);
    }
  }, []);

  return (
    <div className="flex flex-col h-full gap-6 max-w-6xl mx-auto w-full mt-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Database className="w-6 h-6 text-blue-600" />
            Evidence Repository
          </h1>
          <p className="text-sm text-slate-500 mt-1">Central repository for all collected evidence and artifacts.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm transition-colors">
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search evidence..." 
              className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-semibold text-slate-500 uppercase tracking-wider bg-white">
                <th className="px-6 py-4">Evidence ID</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Source</th>
                <th className="px-6 py-4">Collection Date</th>
                <th className="px-6 py-4">Mapped Controls</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="text-[13px] divide-y divide-slate-100 text-slate-700">
              {evidenceList.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-blue-600">{item.id}</td>
                  <td className="px-6 py-4 font-medium flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-400" />
                    {item.name}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded text-[11px] font-medium text-slate-600">
                      {item.source}
                    </span>
                  </td>
                  <td className="px-6 py-4">{item.date}</td>
                  <td className="px-6 py-4 font-medium text-slate-600">{item.mapped}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 w-fit">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-[12px] transition-colors">View Data</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Evidence;
