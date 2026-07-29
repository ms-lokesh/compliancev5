import { BarChart, Search, Filter, Download, FileText, FileSpreadsheet, FileIcon } from 'lucide-react';

const Reports = () => {
  const reports = [
    { id: 1, name: 'Q2 2026 Executive Compliance Summary', type: 'Executive', format: 'PDF', date: '2026-07-01', size: '2.4 MB' },
    { id: 2, name: 'SOC 2 Type II Gap Analysis', type: 'Audit Readiness', format: 'PDF', date: '2026-06-15', size: '4.1 MB' },
    { id: 3, name: 'ISO 27001 Evidence Inventory', type: 'Data Export', format: 'Excel', date: '2026-06-10', size: '1.2 MB' },
    { id: 4, name: 'Monthly Access Review Sign-offs', type: 'Access Control', format: 'PDF', date: '2026-06-01', size: '845 KB' },
    { id: 5, name: 'AI Systems Risk Posture', type: 'AI Governance', format: 'PDF', date: '2026-05-20', size: '3.6 MB' },
  ];

  const getFormatIcon = (format: string) => {
    switch(format) {
      case 'PDF': return <FileText className="w-5 h-5 text-red-500" />;
      case 'Excel': return <FileSpreadsheet className="w-5 h-5 text-emerald-600" />;
      default: return <FileIcon className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <BarChart className="w-6 h-6 text-indigo-600" />
            Reports
          </h1>
          <p className="text-slate-500 text-sm mt-1">Generate, download, and manage compliance and audit reports</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700 transition-colors">
          Generate New Report
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {['Executive Summaries', 'Audit Readiness', 'Data Exports', 'Custom Reports'].map((category, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-100 transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-800">{category}</h3>
            </div>
            <p className="text-xs text-slate-500">View available templates</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="relative w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search reports..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-300 bg-white rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50">
            <Filter className="w-4 h-4" /> Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-white text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">Report Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Date Generated</th>
                <th className="px-6 py-4">Size</th>
                <th className="px-6 py-4 text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {getFormatIcon(report.format)}
                      <span className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors cursor-pointer">{report.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium text-xs">
                      {report.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{report.date}</td>
                  <td className="px-6 py-4 text-slate-500 text-xs">{report.size}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors inline-flex">
                      <Download className="w-4 h-4" />
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

export default Reports;
