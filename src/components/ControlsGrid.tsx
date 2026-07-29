import { useState } from 'react';
import { X } from 'lucide-react';

interface SystemDetails {
  id: string;
  name: string;
  desc: string;
  status: string;
  evidence: string;
  last: string;
  next: string;
  benefit: string;
  isAiOnly?: boolean;
  enterpriseSystems: string[];
  aiSystems: string[];
}

const ControlsGrid = ({ data: _data, usesAiMl = true }: { data?: any, usesAiMl?: boolean }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeControl, setActiveControl] = useState<SystemDetails | null>(null);
  const [drawerType, setDrawerType] = useState<'ai' | 'non-ai'>('ai');

  const rawControls: SystemDetails[] = [
    { 
      id: "1", name: "Multi-Factor Authentication", desc: "MFA for all users and privileged accounts", 
      status: "Compliant", evidence: "AWS IAM", last: "May 5, 2025", next: "Aug 5, 2025", benefit: "Prevents unauthorized access",
      enterpriseSystems: ['GitHub', 'AWS IAM', 'Azure AD', 'Jira', 'ServiceNow'],
      aiSystems: ['Recommendation Engine', 'Pricing Optimization', 'Fraud Detection', 'Inventory Forecast', 'Customer Personalization']
    },
    { 
      id: "2", name: "Role-Based Access Control (RBAC)", desc: "Restrict access based on roles", 
      status: "Compliant", evidence: "AWS IAM / GitHub", last: "May 6, 2025", next: "Aug 6, 2025", benefit: "Enforces least privilege",
      enterpriseSystems: ['GitHub', 'AWS IAM', 'Azure AD', 'Jira', 'ServiceNow'],
      aiSystems: ['Recommendation Engine', 'Pricing Optimization', 'Fraud Detection', 'Inventory Forecast', 'Customer Personalization']
    },
    { 
      id: "3", name: "Least Privilege Access", desc: "Users/service accounts have minimum access", 
      status: "Partially Compliant", evidence: "AWS IAM", last: "May 6, 2025", next: "Aug 6, 2025", benefit: "Reduces blast radius",
      enterpriseSystems: ['GitHub', 'AWS IAM', 'Azure AD', 'Jira', 'ServiceNow'],
      aiSystems: ['Recommendation Engine', 'Pricing Optimization', 'Fraud Detection', 'Inventory Forecast', 'Customer Personalization']
    },
    { 
      id: "4", name: "User Provisioning & Deprovisioning", desc: "Automated joiner, mover, leaver process", 
      status: "Compliant", evidence: "Jira / GitHub", last: "May 4, 2025", next: "Aug 4, 2025", benefit: "Ensures timely access revokes",
      enterpriseSystems: ['GitHub', 'AWS IAM', 'Azure AD', 'Jira', 'ServiceNow', 'Workday'],
      aiSystems: ['Recommendation Engine', 'Pricing Optimization', 'Fraud Detection', 'Inventory Forecast']
    },
    { 
      id: "5", name: "Periodic Access Reviews", desc: "Quarterly access certification", 
      status: "Non-Compliant", evidence: "Jira", last: "Jan 15, 2025", next: "Now Overdue", benefit: "Identifies orphaned accounts",
      enterpriseSystems: ['GitHub', 'AWS IAM', 'Azure AD', 'Jira', 'ServiceNow', 'Databricks', 'Snowflake', 'Tableau'],
      aiSystems: ['Recommendation Engine', 'Customer Personalization']
    },
    { 
      id: "6", name: "Service Account Governance", desc: "Manage lifecycle of service accounts", 
      status: "Partially Compliant", evidence: "AWS IAM", last: "May 7, 2025", next: "Aug 7, 2025", benefit: "Controls automated access",
      enterpriseSystems: ['AWS IAM', 'Jira'],
      aiSystems: ['Fraud Detection', 'Inventory Forecast']
    },
    { 
      id: "7", name: "Secrets Management", desc: "Secure storage of API keys/secrets", 
      status: "Compliant", evidence: "AWS Secrets Manager", last: "May 6, 2025", next: "Aug 6, 2025", benefit: "Prevents credential leaks",
      enterpriseSystems: ['AWS IAM', 'GitHub'],
      aiSystems: ['Recommendation Engine', 'Pricing Optimization', 'Customer Personalization', 'Inventory Forecast', 'Fraud Detection']
    },
    { 
      id: "8", name: "Branch Protection Rules", desc: "Requires PR approvals and reviews", 
      status: "Compliant", evidence: "GitHub", last: "May 2, 2025", next: "Aug 2, 2025", benefit: "Improves code integrity",
      enterpriseSystems: ['GitHub'],
      aiSystems: ['Recommendation Engine', 'Pricing Optimization', 'Customer Personalization', 'Inventory Forecast', 'Fraud Detection']
    },
    { 
      id: "9", name: "Change Management Approvals", desc: "Require manager approval for releases", 
      status: "Compliant", evidence: "Jira", last: "May 3, 2025", next: "Aug 3, 2025", benefit: "Ensures authorized changes",
      enterpriseSystems: ['GitHub', 'Jira', 'ServiceNow'],
      aiSystems: ['Pricing Optimization']
    },
    { 
      id: "10", name: "Network Access Controls", desc: "Restrict network access to systems", 
      status: "Compliant", evidence: "AWS VPC / SG", last: "May 6, 2025", next: "Aug 6, 2025", benefit: "Limits network exposure",
      enterpriseSystems: ['AWS IAM'],
      aiSystems: ['Recommendation Engine', 'Pricing Optimization', 'Fraud Detection', 'Inventory Forecast', 'Customer Personalization']
    }
  ];

  // In this iteration, we don't hide the controls, just adjust AI scope based on `usesAiMl`
  const controls = rawControls;

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Compliant': return 'text-green-600';
      case 'Partially Compliant': return 'text-orange-500';
      case 'Non-Compliant': return 'text-red-500';
      case 'Not Applicable': return 'text-slate-500';
      default: return 'text-slate-600';
    }
  };

  const openDrawer = (control: SystemDetails, type: 'ai' | 'non-ai') => {
    setActiveControl(control);
    setDrawerType(type);
    setDrawerOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden mb-6">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-[13px] font-semibold text-slate-800">CC6 Mandatory Controls – Compliance Status</h2>
          <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100 text-[10px] font-medium">Mandatory</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-[11px] font-semibold text-slate-800 bg-white">
                <th className="px-4 py-3 min-w-[200px]">Control</th>
                <th className="px-4 py-3 min-w-[250px]">Description</th>
                <th className="px-4 py-3 text-center">AI/ML Systems</th>
                <th className="px-4 py-3 text-center">Non-AI/ML Systems</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Evidence</th>
                <th className="px-4 py-3">Benefit</th>
              </tr>
            </thead>
            <tbody className="text-[11px] divide-y divide-slate-100 text-slate-700">
              {controls.map((ctrl, idx) => {
                const entCount = ctrl.enterpriseSystems.length;
                const aiCount = usesAiMl ? ctrl.aiSystems.length : 0;

                return (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-semibold text-slate-800">
                      {ctrl.name}
                    </td>
                    <td className="px-4 py-3 text-slate-500">
                      {ctrl.desc}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span 
                        onClick={() => openDrawer(ctrl, 'ai')}
                        className="text-blue-600 font-semibold cursor-pointer hover:underline text-sm"
                      >
                        {aiCount}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span 
                        onClick={() => openDrawer(ctrl, 'non-ai')}
                        className="text-blue-600 font-semibold cursor-pointer hover:underline text-sm"
                      >
                        {entCount}
                      </span>
                    </td>
                    <td className={`px-4 py-3 font-semibold ${getStatusColor(ctrl.status)}`}>{ctrl.status}</td>
                    <td className="px-4 py-3">{ctrl.evidence}</td>
                    <td className="px-4 py-3 text-slate-500">{ctrl.benefit}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
          Showing 1 to {controls.length} of {controls.length} controls
        </div>
      </div>

      {/* Drawer Overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm transition-opacity"
            onClick={() => setDrawerOpen(false)}
          ></div>
          
          {/* Drawer Panel */}
          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl border-l border-slate-200 flex flex-col transform transition-transform duration-300 ease-in-out">
            {/* Drawer Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-start justify-between bg-slate-50">
              <div>
                <h3 className="text-lg font-bold text-slate-800 leading-tight pr-4">
                  {drawerType === 'ai' ? 'AI/ML Systems' : 'Non-AI/ML Systems'}
                </h3>
                <p className="text-sm font-semibold text-slate-500 mt-2">
                  CC6.{activeControl?.id} - {activeControl?.name}
                </p>
              </div>
              <button 
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors mt-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto p-6">
              
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
                <span className="text-sm font-semibold text-slate-700">Total Systems</span>
                <span className="text-xl font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                  {drawerType === 'ai' 
                    ? (usesAiMl ? (activeControl?.aiSystems.length || 0) : 0) 
                    : (activeControl?.enterpriseSystems.length || 0)}
                </span>
              </div>

              {drawerType === 'ai' ? (
                <>
                  {!usesAiMl ? (
                    <p className="text-sm text-slate-500 leading-relaxed">No AI/ML systems are currently in scope for this organization.</p>
                  ) : activeControl?.aiSystems.length ? (
                    <ul className="space-y-3">
                      {activeControl.aiSystems.map((sys, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                          {sys}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-slate-500 italic">None in scope for this control.</p>
                  )}
                </>
              ) : (
                <>
                  {activeControl?.enterpriseSystems.length ? (
                    <ul className="space-y-3">
                      {activeControl.enterpriseSystems.map((sys, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                          {sys}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-slate-500 italic">None in scope for this control.</p>
                  )}
                </>
              )}

              <div className="mt-8 pt-6 border-t border-slate-100">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Status</p>
                <span className={`font-semibold ${getStatusColor(activeControl?.status || '')}`}>
                  {activeControl?.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ControlsGrid;
