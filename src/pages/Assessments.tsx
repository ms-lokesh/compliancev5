import { CheckSquare, Plus, Search, Filter, Clock, PlayCircle, CheckCircle2 } from 'lucide-react';

const Assessments = () => {
  const assessments = [
    { id: 1, name: 'SOC 2 Type II Annual Audit', framework: 'SOC 2 Type II', status: 'In Progress', progress: 85, dueDate: '2026-08-15', auditor: 'Ernst & Young' },
    { id: 2, name: 'ISO 27001 Recertification', framework: 'ISO 27001', status: 'In Progress', progress: 42, dueDate: '2026-10-01', auditor: 'BSI Group' },
    { id: 3, name: 'GDPR Data Privacy Review', framework: 'GDPR', status: 'Planned', progress: 0, dueDate: '2026-11-15', auditor: 'Internal Audit' },
    { id: 4, name: 'ISO 42001 Readiness Assessment', framework: 'ISO 42001', status: 'Planned', progress: 0, dueDate: '2026-12-01', auditor: 'TBD' },
    { id: 5, name: 'PCI DSS Q1 Scan', framework: 'PCI DSS', status: 'Completed', progress: 100, dueDate: '2026-03-31', auditor: 'Trustwave' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-blue-600" />
            Assessments
          </h1>
          <p className="text-slate-500 text-sm mt-1">Manage compliance assessments, internal audits, and readiness reviews</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" /> New Assessment
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="relative w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search assessments..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 border border-slate-300 bg-white rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-white text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">Assessment Name</th>
                <th className="px-6 py-4">Framework</th>
                <th className="px-6 py-4">Progress</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Auditor / Lead</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {assessments.map((assessment) => (
                <tr key={assessment.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{assessment.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium text-xs">
                      {assessment.framework}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-full bg-slate-200 rounded-full h-1.5 max-w-[120px]">
                        <div 
                          className={`h-1.5 rounded-full ${assessment.progress === 100 ? 'bg-emerald-500' : 'bg-blue-500'}`} 
                          style={{ width: `${assessment.progress}%` }} 
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-600 w-8">{assessment.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium text-xs w-max ${
                      assessment.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 
                      assessment.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {assessment.status === 'Completed' && <CheckCircle2 className="w-3.5 h-3.5" />}
                      {assessment.status === 'In Progress' && <PlayCircle className="w-3.5 h-3.5" />}
                      {assessment.status === 'Planned' && <Clock className="w-3.5 h-3.5" />}
                      {assessment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{assessment.auditor}</td>
                  <td className="px-6 py-4 text-slate-600">{assessment.dueDate}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 font-medium text-sm hover:text-blue-700">
                      View Details
                    </button>
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

export default Assessments;
