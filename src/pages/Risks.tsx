import React, { useState } from 'react';
import { 
  Calendar, Search, Filter, Download, ArrowUp, AlertTriangle, ShieldAlert, AlertCircle, 
  Box, ShieldCheck, Folder, ArrowRight, ChevronRight, Activity, CheckCircle2,
  Lock, Key, Globe, Eye, X
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from 'recharts';

const riskTrendData = [
  { name: 'Feb 2026', open: 20, new: 9, mitigated: 6 },
  { name: 'Mar 2026', open: 22, new: 10, mitigated: 7 },
  { name: 'Apr 2026', open: 26, new: 11, mitigated: 8 },
  { name: 'May 2026', open: 30, new: 13, mitigated: 10 },
  { name: 'Jun 2026', open: 28, new: 12, mitigated: 11 },
  { name: 'Jul 2026', open: 32, new: 14, mitigated: 12 },
];

const riskDistData = [
  { name: 'Critical', value: 3, color: '#EF4444' },
  { name: 'High', value: 6, color: '#F97316' },
  { name: 'Medium', value: 5, color: '#EAB308' },
  { name: 'Low', value: 4, color: '#22C55E' },
];

const riskCatData = [
  { name: 'Prompt Injection', value: 28 },
  { name: 'Data Leakage', value: 20 },
  { name: 'Hallucination', value: 16 },
  { name: 'Excessive IAM Permissions', value: 12 },
  { name: 'Shadow AI', value: 8 },
  { name: 'Model Drift', value: 8 },
  { name: 'Sensitive Data Exposure', value: 8 },
];

const aiSystems = [
  { system: 'Recommendation Engine', bu: 'E-Commerce', model: 'Claude 3', cloud: 'AWS', owner: 'ML Team', score: 75, comp: 92, last: 'Jul 28, 2026', risk: 'High', status: 'Compliant', env: 'Production' },
  { system: 'Fraud Detection Model', bu: 'Finance', model: 'GPT-4.1 Turbo', cloud: 'AWS', owner: 'AI Team', score: 88, comp: 95, last: 'Jul 27, 2026', risk: 'Critical', status: 'Compliant', env: 'Production' },
  { system: 'Customer Support Bot', bu: 'Customer Care', model: 'Llama 3', cloud: 'Azure', owner: 'Support IT', score: 55, comp: 75, last: 'Jul 26, 2026', risk: 'Medium', status: 'Partial', env: 'Production' },
  { system: 'Pricing Optimizer', bu: 'Sales', model: 'Gemini 1.5', cloud: 'GCP', owner: 'Data Science', score: 72, comp: 98, last: 'Jul 25, 2026', risk: 'High', status: 'Compliant', env: 'Production' },
  { system: 'Churn Predictor (Staging)', bu: 'Marketing', model: 'Prophet + ML', cloud: 'AWS', owner: 'Analytics Team', score: 25, comp: 100, last: 'Jul 24, 2026', risk: 'Low', status: 'Compliant', env: 'Non-Production' },
  { system: 'Sentiment Analyzer v2', bu: 'Product', model: 'DistilBERT', cloud: 'AWS', owner: 'ML Team', score: 60, comp: 45, last: 'Jul 23, 2026', risk: 'Medium', status: 'Non-Compliant', env: 'Non-Production' },
];

const aiRiskRegisterData = [
  {id:'AI-RSK-001', name:'Prompt Injection', sys:'Customer Support Bot', cat:'AI Security', cc:'CC6.6', sev:'Critical', status:'Open', owner:'AI Security'},
  {id:'AI-RSK-002', name:'Sensitive Data Leakage', sys:'Fraud Detection Model', cat:'Data Protection', cc:'CC6.7', sev:'High', status:'Open', owner:'AI Security'},
  {id:'AI-RSK-003', name:'Excessive IAM Permissions', sys:'Customer Support Bot', cat:'Access Control', cc:'CC6.3', sev:'High', status:'In Progress', owner:'Cloud Team'},
  {id:'AI-RSK-004', name:'Missing MFA', sys:'AWS IAM', cat:'Identity', cc:'CC6.2', sev:'High', status:'In Progress', owner:'IT Security'},
  {id:'AI-RSK-005', name:'Hallucination', sys:'Recommendation Engine', cat:'AI Reliability', cc:'CC6.6', sev:'Medium', status:'Monitoring', owner:'ML Team'},
  {id:'AI-RSK-006', name:'Model Drift', sys:'Pricing Optimizer', cat:'AI Reliability', cc:'CC6.6', sev:'Medium', status:'Monitoring', owner:'Data Science'},
];

const soc2Data = [
  { name: 'CC6.1 Identity Management', val: 92, status: 'ok' },
  { name: 'CC6.2 Authentication (MFA)', val: 81, status: 'warn' },
  { name: 'CC6.3 Authorization (Access Rights)', val: 74, status: 'warn' },
  { name: 'CC6.6 Logical Access Monitoring', val: 69, status: 'warn' },
  { name: 'CC6.7 Security Monitoring (Logging)', val: 83, status: 'warn' },
];

const evidenceHealthData = [
  { name: 'AWS CloudTrail', status: 'Healthy', color: 'text-emerald-600 bg-emerald-50' },
  { name: 'IAM Reviews', status: 'Healthy', color: 'text-emerald-600 bg-emerald-50' },
  { name: 'GitHub Audit Logs', status: 'Healthy', color: 'text-emerald-600 bg-emerald-50' },
  { name: 'Prompt Logs', status: 'Missing', color: 'text-red-600 bg-red-50' },
  { name: 'Model Evaluation Reports', status: 'Healthy', color: 'text-emerald-600 bg-emerald-50' },
  { name: 'Access Reviews', status: 'Pending', color: 'text-orange-600 bg-orange-50' },
];

const aiRecommendationsData = [
  { text: 'Enable MFA for all privileged users', sev: 'Critical' },
  { text: 'Configure Prompt Firewall for Chatbot', sev: 'High' },
  { text: 'Review and apply least privilege IAM roles', sev: 'High' },
  { text: 'Enable Data Loss Prevention (DLP)', sev: 'Medium' },
  { text: 'Review AI model permissions', sev: 'Medium' },
  { text: 'Schedule quarterly access review', sev: 'Low' },
];

const Risks = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Risk Management</h1>
          <p className="text-sm text-slate-500 mt-1">Monitor AI/ML system risks and continuously evaluate compliance with SOC 2 Type II CC6 controls.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-300 bg-white rounded-lg text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
            <Calendar className="w-4 h-4 text-slate-400" />
            July 1 - July 31, 2026
            <ChevronRight className="w-4 h-4 text-slate-400 rotate-90 ml-1" />
          </button>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search risks, systems, controls..." 
              className="pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm w-64 shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-300 bg-white rounded-lg text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
            <Filter className="w-4 h-4 text-slate-400" /> Filters
          </button>
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-300 bg-white rounded-lg text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
            <Download className="w-4 h-4 text-slate-400" /> Export
          </button>
        </div>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-6 gap-4">
        {[
          { label: 'AI Risk Score', val: '68%', change: '8%', icon: ShieldAlert, color: 'text-red-500', bg: 'bg-red-50' },
          { label: 'Critical Risks', val: '16.0%', change: '3.2%', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50' },
          { label: 'Open Risks', val: '32.0%', change: '5.0%', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' },
          { label: 'AI Systems', val: '12', change: '', sub: 'All active and monitored', icon: Box, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'SOC 2 CC6 Compliance', val: '89.0%', change: '7.0%', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-50', upGood: true },
          { label: 'Evidence Coverage', val: '92.0%', change: '6.0%', icon: Folder, color: 'text-blue-500', bg: 'bg-blue-50', upGood: true },
        ].map((s, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-semibold text-slate-600">{s.label}</span>
              <div className={`p-1.5 rounded-md ${s.bg}`}>
                <s.icon className={`w-4 h-4 ${s.color}`} />
              </div>
            </div>
            <div className="text-2xl font-bold text-slate-900">{s.val}</div>
            {s.change ? (
              <div className={`text-[11px] mt-1 font-semibold flex items-center gap-0.5 ${s.upGood ? 'text-emerald-600' : 'text-red-600'}`}>
                <ArrowUp className="w-3 h-3" /> {s.change} from last month
              </div>
            ) : (
              <div className="text-[11px] mt-1 text-slate-500 font-medium">{s.sub}</div>
            )}
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-slate-800 text-sm">AI Risk Trend</h3>
            <span className="text-[11px] text-slate-500 font-medium border border-slate-200 rounded px-2 py-1">Last 6 Months</span>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={riskTrendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748B'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748B'}} tickFormatter={(v)=>`${v}%`} />
                <Tooltip />
                <Legend iconType="circle" wrapperStyle={{fontSize: 11, fontWeight: 500}} />
                <Line type="monotone" dataKey="open" name="Open Risks (%)" stroke="#EF4444" strokeWidth={2} dot={{r:3}} />
                <Line type="monotone" dataKey="new" name="New Risks (%)" stroke="#F97316" strokeWidth={2} dot={{r:3}} />
                <Line type="monotone" dataKey="mitigated" name="Mitigated Risks (%)" stroke="#22C55E" strokeWidth={2} dot={{r:3}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <h3 className="font-semibold text-slate-800 text-sm mb-4">Risk Distribution</h3>
          <div className="flex-1 flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={riskDistData} innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
                  {riskDistData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-4">
              <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Total</span>
              <span className="text-3xl font-bold text-slate-900 leading-tight">18</span>
              <span className="text-[11px] text-slate-500 font-medium">Risks</span>
            </div>
          </div>
          <div className="mt-4 space-y-2.5 px-6">
            {riskDistData.map(d => (
              <div key={d.name} className="flex justify-between items-center text-[11px] font-semibold">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{backgroundColor: d.color}}></div>
                  <span className="text-slate-600">{d.name}</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-slate-800">{(d.value / 18 * 100).toFixed(1)}%</span>
                  <span className="text-slate-400">({d.value})</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-slate-800 text-sm">AI Risk Categories</h3>
            <span onClick={() => setActiveModal('categories')} className="text-[11px] text-blue-600 font-semibold cursor-pointer hover:underline">View all</span>
          </div>
          <div className="space-y-4 mt-6">
            {riskCatData.map((d, i) => (
              <div key={d.name} className="flex items-center justify-between">
                <span className="text-xs text-slate-600 font-medium w-1/3 truncate pr-2">{d.name}</span>
                <div className="flex-1 mx-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000" style={{
                    width: `${d.value}%`, 
                    backgroundColor: i < 2 ? '#EF4444' : i < 4 ? '#F97316' : '#3B82F6'
                  }}></div>
                </div>
                <span className="text-xs font-semibold text-slate-700 w-8 text-right">{d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Sections Grid */}
      <div className="grid grid-cols-3 gap-6">
        
        {/* Left Col (Span 2) */}
        <div className="col-span-2 space-y-6">
          
          {/* AI Systems Risk Overview */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
              <h3 className="font-semibold text-slate-800 text-sm">AI Systems Risk Overview</h3>
              <span onClick={() => setActiveModal('systems')} className="text-[11px] text-blue-600 font-semibold cursor-pointer hover:underline">View all</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-slate-50/50 border-b border-slate-100 text-slate-500 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3">AI System</th>
                    <th className="px-5 py-3">Business Unit</th>
                    <th className="px-5 py-3">AI Model</th>
                    <th className="px-5 py-3">Cloud</th>
                    <th className="px-5 py-3">Owner</th>
                    <th className="px-5 py-3">Risk Score</th>
                    <th className="px-5 py-3">Compliance</th>
                    <th className="px-5 py-3">Last Assessment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {aiSystems.map((sys, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3 font-semibold text-blue-600 flex items-center gap-2 whitespace-nowrap">
                        <Box className="w-3.5 h-3.5" /> {sys.system}
                      </td>
                      <td className="px-5 py-3 text-slate-600 font-medium">{sys.bu}</td>
                      <td className="px-5 py-3 text-slate-600 font-medium">{sys.model}</td>
                      <td className="px-5 py-3 font-semibold text-blue-600">{sys.cloud}</td>
                      <td className="px-5 py-3 text-slate-600 font-medium">{sys.owner}</td>
                      <td className={`px-5 py-3 font-bold ${sys.score > 70 ? 'text-red-500' : sys.score > 50 ? 'text-orange-500' : 'text-emerald-500'}`}>
                        {sys.score}%
                      </td>
                      <td className="px-5 py-3 flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${sys.comp > 88 ? 'bg-emerald-500' : 'bg-emerald-500'}`} style={{width:`${sys.comp}%`}}></div>
                        </div>
                        <span className="text-slate-600 font-semibold">{sys.comp}%</span>
                      </td>
                      <td className="px-5 py-3 text-slate-500 font-medium">{sys.last}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Risk Register */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
              <h3 className="font-semibold text-slate-800 text-sm">AI Risk Register</h3>
              <span onClick={() => setActiveModal('register')} className="text-[11px] text-blue-600 font-semibold cursor-pointer hover:underline">View all</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-slate-50/50 border-b border-slate-100 text-slate-500 font-semibold uppercase tracking-wider">
                  <tr>
                    <th className="px-5 py-3">Risk ID</th>
                    <th className="px-5 py-3">Risk Name</th>
                    <th className="px-5 py-3">AI System</th>
                    <th className="px-5 py-3">Category</th>
                    <th className="px-5 py-3">CC6 Control</th>
                    <th className="px-5 py-3">Severity</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Owner</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {aiRiskRegisterData.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-2.5 text-slate-500 font-medium">{row.id}</td>
                      <td className="px-5 py-2.5 font-semibold text-slate-800">{row.name}</td>
                      <td className="px-5 py-2.5 text-slate-600 font-medium">{row.sys}</td>
                      <td className="px-5 py-2.5 text-slate-600 font-medium">{row.cat}</td>
                      <td className="px-5 py-2.5 font-semibold text-slate-800">{row.cc}</td>
                      <td className="px-5 py-2.5">
                        <span className={`px-2 py-0.5 rounded uppercase tracking-wider font-bold text-[9px] ${
                          row.sev==='Critical'?'text-red-700 bg-red-100':row.sev==='High'?'text-orange-700 bg-orange-100':'text-amber-700 bg-amber-100'
                        }`}>{row.sev}</span>
                      </td>
                      <td className="px-5 py-2.5">
                        <span className={`px-2 py-0.5 rounded font-semibold text-[10px] ${
                          row.status==='Open'?'text-red-600 bg-red-50':row.status==='In Progress'?'text-blue-600 bg-blue-50':'text-slate-600 bg-slate-100'
                        }`}>{row.status}</span>
                      </td>
                      <td className="px-5 py-2.5 text-slate-600 font-medium">{row.owner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
        </div>

        {/* Right Col */}
        <div className="space-y-6">
          {/* SOC 2 Type II CC6 Control Health */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-slate-800 text-sm">SOC 2 Type II CC6 Control Health</h3>
              <span onClick={() => setActiveModal('soc2')} className="text-[11px] text-blue-600 font-semibold cursor-pointer hover:underline">View all</span>
            </div>
            <div className="space-y-5">
              {soc2Data.map((c) => (
                <div key={c.name} className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700 w-48 truncate">{c.name}</span>
                  <div className="flex-1 mx-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-1000" style={{
                      width:`${c.val}%`, 
                      backgroundColor: c.val > 90 ? '#10B981' : '#F97316'
                    }}></div>
                  </div>
                  <div className="flex items-center gap-1.5 w-12 justify-end">
                    <span className="font-semibold text-slate-700">{c.val}%</span>
                    {c.status === 'ok' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <AlertCircle className="w-3.5 h-3.5 text-orange-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Evidence Health & Recommendations Grid (if it doesn't fit horizontally, we stack them or put side by side depending on width) */}
          <div className="flex flex-col gap-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-semibold text-slate-800 text-sm">Evidence Health</h3>
                <span onClick={() => setActiveModal('evidence')} className="text-[11px] text-blue-600 font-semibold cursor-pointer hover:underline">View all</span>
              </div>
              <div className="space-y-3.5">
                {evidenceHealthData.map((e, idx) => (
                  <div key={idx} className="flex justify-between items-center text-[11px]">
                    <span className="text-slate-700 font-medium flex items-center gap-2">
                      <Box className="w-3.5 h-3.5 text-slate-400"/>
                      {e.name}
                    </span>
                    <span className={`font-semibold px-2 py-0.5 rounded ${e.color}`}>{e.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-semibold text-slate-800 text-sm">AI Recommendations</h3>
                <span onClick={() => setActiveModal('recommendations')} className="text-[11px] text-blue-600 font-semibold cursor-pointer hover:underline">View all</span>
              </div>
              <div className="space-y-4">
                {aiRecommendationsData.map((r, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <span className={`px-2 py-0.5 rounded font-bold text-[9px] uppercase tracking-wider shrink-0 ${
                        r.sev==='Critical'?'text-red-700 bg-red-100':r.sev==='High'?'text-orange-700 bg-orange-100':r.sev==='Medium'?'text-amber-700 bg-amber-100':'text-emerald-700 bg-emerald-100'
                      }`}>{r.sev}</span>
                      <span className="text-[11px] font-medium text-slate-700 truncate group-hover:text-blue-600 transition-colors">{r.text}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-500 shrink-0 ml-2" />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>


      
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">
                {activeModal === 'systems' && 'AI / ML Systems Inventory'}
                {activeModal === 'categories' && 'AI Risk Categories Breakdown'}
                {activeModal === 'register' && 'Full AI Risk Register'}
                {activeModal === 'soc2' && 'SOC 2 Type II CC6 Control Health'}
                {activeModal === 'evidence' && 'Evidence Health Details'}
                {activeModal === 'recommendations' && 'All AI Recommendations'}
              </h2>
              <button 
                onClick={() => setActiveModal(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {activeModal === 'systems' && aiSystems.map((system, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-slate-300 transition-colors shadow-sm">
                    <div>
                      <h3 className="font-bold text-slate-900">{system.system}</h3>
                      <p className="text-sm text-slate-500 mt-1">{system.env}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        system.risk === 'Critical' ? 'bg-red-100 text-red-700' :
                        system.risk === 'High' ? 'bg-orange-100 text-orange-700' :
                        system.risk === 'Medium' ? 'bg-amber-100 text-amber-700' :
                        'bg-emerald-100 text-emerald-700'
                      }`}>
                        Risk: {system.risk}
                      </span>
                      <span className={`font-semibold text-sm ${
                        system.status === 'Compliant' ? 'text-emerald-600' :
                        system.status === 'Partial' ? 'text-amber-600' :
                        'text-red-600'
                      }`}>
                        {system.status}
                      </span>
                    </div>
                  </div>
                ))}
                
                {activeModal === 'categories' && riskCatData.map((d, i) => (
                  <div key={d.name} className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl">
                    <span className="font-semibold text-slate-800 w-1/3">{d.name}</span>
                    <div className="flex-1 mx-4 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000" style={{
                        width: `${d.value}%`, 
                        backgroundColor: i < 2 ? '#EF4444' : i < 4 ? '#F97316' : '#3B82F6'
                      }}></div>
                    </div>
                    <span className="font-bold text-slate-700 w-12 text-right">{d.value}%</span>
                  </div>
                ))}

                {activeModal === 'register' && (
                  <div className="space-y-3">
                    {aiRiskRegisterData.map((row, idx) => (
                      <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-white shadow-sm flex flex-col gap-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-xs text-slate-400 font-semibold">{row.id}</span>
                            <h4 className="font-bold text-slate-800">{row.name}</h4>
                            <p className="text-xs text-slate-600 mt-0.5">{row.sys} • {row.cat}</p>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                            row.sev==='Critical'?'bg-red-100 text-red-700':row.sev==='High'?'bg-orange-100 text-orange-700':'bg-amber-100 text-amber-700'
                          }`}>{row.sev}</span>
                        </div>
                        <div className="flex justify-between items-center mt-2 border-t border-slate-100 pt-3">
                          <span className="text-xs font-medium text-slate-500">Control: {row.cc}</span>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                            row.status==='Open'?'bg-red-50 text-red-600':row.status==='In Progress'?'bg-blue-50 text-blue-600':'bg-slate-100 text-slate-600'
                          }`}>{row.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeModal === 'soc2' && (
                  <div className="space-y-4">
                    {soc2Data.map((c) => (
                      <div key={c.name} className="p-4 border border-slate-200 rounded-xl bg-white shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-slate-800">{c.name}</span>
                          <span className="font-bold text-slate-700">{c.val}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all duration-1000" style={{
                            width:`${c.val}%`, 
                            backgroundColor: c.val > 90 ? '#10B981' : '#F97316'
                          }}></div>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                          {c.status === 'ok' ? 'All checks passed. Control is operating effectively.' : 'Some gaps identified. Review exceptions for remediation.'}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {activeModal === 'evidence' && (
                  <div className="grid grid-cols-2 gap-4">
                    {evidenceHealthData.map((e, idx) => (
                      <div key={idx} className="p-4 border border-slate-200 rounded-xl bg-white shadow-sm flex items-center gap-3">
                        <div className="p-2 bg-slate-50 rounded-lg">
                          <Box className="w-5 h-5 text-slate-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-800 text-sm">{e.name}</h4>
                          <span className={`text-xs font-semibold mt-1 inline-block px-2 py-0.5 rounded ${e.color}`}>{e.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeModal === 'recommendations' && (
                  <div className="space-y-3">
                    {aiRecommendationsData.map((r, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 border border-slate-200 rounded-xl bg-white shadow-sm hover:border-blue-300 transition-colors cursor-pointer group">
                        <span className={`px-2.5 py-1 rounded font-bold text-[10px] uppercase tracking-wider w-20 text-center ${
                          r.sev==='Critical'?'text-red-700 bg-red-100':r.sev==='High'?'text-orange-700 bg-orange-100':r.sev==='Medium'?'text-amber-700 bg-amber-100':'text-emerald-700 bg-emerald-100'
                        }`}>{r.sev}</span>
                        <span className="font-medium text-slate-700 group-hover:text-blue-600 transition-colors flex-1">{r.text}</span>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-end">
              <button 
                onClick={() => setActiveModal(null)}
                className="px-6 py-2 border border-slate-300 rounded-lg font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
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

export default Risks;
