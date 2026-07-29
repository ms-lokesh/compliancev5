import React from 'react';
import { Database, Search, Cpu, ListTree, FileCheck2, Link, DownloadCloud, GitMerge, FileKey2, AlertTriangle, ShieldAlert, PieChart, FileText, ArrowDown } from 'lucide-react';

const engines = [
  { name: "Business Fact Extraction", purpose: "Extract entities", icon: Search, status: "Active", processed: "1.2M", latency: "42ms" },
  { name: "Compliance Decision", purpose: "Evaluate posture", icon: Cpu, status: "Active", processed: "840K", latency: "120ms" },
  { name: "Framework Recommendation", purpose: "Suggest standards", icon: ListTree, status: "Active", processed: "45K", latency: "80ms" },
  { name: "Evidence Requirement", purpose: "Define controls", icon: FileCheck2, status: "Active", processed: "92K", latency: "65ms" },
  { name: "Connector Orchestrator", purpose: "Manage APIs", icon: Link, status: "Active", processed: "3.4M", latency: "22ms" },
  { name: "Evidence Collection", purpose: "Gather data", icon: DownloadCloud, status: "Active", processed: "8.1M", latency: "145ms" },
  { name: "Normalization", purpose: "Format schema", icon: GitMerge, status: "Active", processed: "8.1M", latency: "30ms" },
  { name: "Control Validation", purpose: "Check rules", icon: FileKey2, status: "Active", processed: "2.3M", latency: "88ms" },
  { name: "Gap Analysis", purpose: "Identify missing", icon: AlertTriangle, status: "Active", processed: "140K", latency: "210ms" },
  { name: "Risk Scoring", purpose: "Calculate severity", icon: ShieldAlert, status: "Active", processed: "140K", latency: "115ms" },
  { name: "Compliance Scoring", purpose: "Rollup scores", icon: PieChart, status: "Active", processed: "12K", latency: "40ms" },
];

const ArchitectureDiagram = () => {
  return (
    <section className="bg-white rounded-xl shadow-soft border border-slate-100 p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-6">Compliance Engine Architecture</h2>
      
      <div className="flex flex-col items-center py-4 w-full max-w-4xl mx-auto">
        
        <div className="flex items-center justify-center bg-slate-800 text-white px-6 py-3 rounded-lg shadow-sm w-64 text-sm font-medium z-10">
          <Database className="w-4 h-4 mr-2" />
          Business Information
        </div>

        {engines.map((engine, idx) => (
          <React.Fragment key={idx}>
            <div className="h-8 w-px bg-slate-300 relative">
              <ArrowDown className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 text-slate-400" />
            </div>
            
            <div className="bg-white border border-slate-200 rounded-xl p-4 w-full flex items-center justify-between shadow-sm hover:shadow-md transition-shadow cursor-default z-10 group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 text-secondary rounded-lg group-hover:bg-secondary group-hover:text-white transition-colors">
                  <engine.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 text-sm">{engine.name} Engine</h4>
                  <p className="text-xs text-slate-500">{engine.purpose}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-8 text-right">
                <div>
                  <p className="text-xs text-slate-400">Records</p>
                  <p className="text-sm font-medium text-slate-700">{engine.processed}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400">Latency</p>
                  <p className="text-sm font-medium text-slate-700">{engine.latency}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success"></div>
                  <span className="text-xs font-medium text-slate-600">{engine.status}</span>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}

        <div className="h-8 w-px bg-slate-300 relative">
          <ArrowDown className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 text-slate-400" />
        </div>

        <div className="flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg shadow-sm w-64 text-sm font-medium z-10">
          <FileText className="w-4 h-4 mr-2" />
          AI Report Generator
        </div>
      </div>
    </section>
  );
};

export default ArchitectureDiagram;
