import React from 'react';
import { Bot, Network, Library, BookText, Fingerprint, Workflow, CheckCircle, Calculator, Sparkles, FileText, ArrowRight } from 'lucide-react';

const AICore = () => {
  const steps = [
    { name: "Prompt Engine", icon: Bot },
    { name: "Framework Library", icon: Library },
    { name: "Control Knowledge Base", icon: Network },
    { name: "Policy Knowledge Base", icon: BookText },
    { name: "Evidence Mapping Engine", icon: Fingerprint },
    { name: "Rule Engine", icon: Workflow },
    { name: "AI Validator", icon: CheckCircle },
    { name: "Risk Calculator", icon: Calculator },
    { name: "Recommendation Engine", icon: Sparkles },
    { name: "Report Generator", icon: FileText },
  ];

  return (
    <section className="bg-slate-900 rounded-xl shadow-lg border border-slate-800 p-8 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 p-32 bg-blue-600 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
      
      <div className="flex items-center gap-3 mb-8 relative z-10">
        <div className="p-2 bg-blue-600/20 text-blue-400 rounded-lg border border-blue-500/30">
          <Sparkles className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-white">AI Compliance Engine Workflow</h2>
      </div>

      <div className="flex flex-wrap gap-x-2 gap-y-4 items-center justify-center relative z-10 max-w-5xl mx-auto">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 hover:border-blue-500/50 hover:bg-slate-800 transition-all rounded-xl p-4 flex flex-col items-center justify-center w-40 text-center shadow-lg group cursor-default">
              <step.icon className="w-6 h-6 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
              <span className="text-xs font-medium text-slate-300">{step.name}</span>
            </div>
            
            {idx < steps.length - 1 && (
              <div className="text-slate-600 hidden md:block">
                <ArrowRight className="w-5 h-5" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default AICore;
