import React from 'react';
import { ArrowRight } from 'lucide-react';

const EvidencePipeline = () => {
  const stages = [
    { name: "Connectors", queue: "0", processed: "28M", success: "99.9%", failed: "0.1%" },
    { name: "Collectors", queue: "12", processed: "28M", success: "99.8%", failed: "0.2%" },
    { name: "Normalizer", queue: "45", processed: "28M", success: "100%", failed: "0%" },
    { name: "Evidence Store", queue: "0", processed: "28M", success: "100%", failed: "0%" },
    { name: "Validator", queue: "89", processed: "12M", success: "98.5%", failed: "1.5%" },
    { name: "Risk Engine", queue: "5", processed: "2.1M", success: "100%", failed: "0%" },
    { name: "Dashboard", queue: "0", processed: "-", success: "-", failed: "-" },
  ];

  return (
    <section className="bg-white rounded-xl shadow-soft border border-slate-100 p-6 overflow-x-auto">
      <h2 className="text-lg font-semibold text-slate-900 mb-6">Evidence Processing Pipeline</h2>
      
      <div className="flex items-center min-w-max pb-4">
        {stages.map((stage, idx) => (
          <React.Fragment key={idx}>
            <div className="flex flex-col w-40 bg-slate-50 border border-slate-200 rounded-lg p-3">
              <h4 className="font-semibold text-slate-800 text-sm mb-3 text-center">{stage.name}</h4>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-500">Queue</span>
                <span className="font-medium text-slate-700">{stage.queue}</span>
              </div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-500">Processed</span>
                <span className="font-medium text-slate-700">{stage.processed}</span>
              </div>
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-slate-500">Success</span>
                <span className="font-medium text-success">{stage.success}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Failed</span>
                <span className="font-medium text-danger">{stage.failed}</span>
              </div>
            </div>
            
            {idx < stages.length - 1 && (
              <div className="px-3 text-slate-300">
                <ArrowRight className="w-5 h-5 animate-pulse" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default EvidencePipeline;
