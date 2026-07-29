import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ShieldCheck, Activity, AlertTriangle, FileText, CheckCircle, XCircle, BarChart3 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';

const trendData = [
  { name: 'Jan', score: 72 },
  { name: 'Feb', score: 75 },
  { name: 'Mar', score: 78 },
  { name: 'Apr', score: 82 },
  { name: 'May', score: 85 },
  { name: 'Jun', score: 88 },
];

const riskData = [
  { name: 'Critical', value: 12, color: '#ef4444' },
  { name: 'High', value: 24, color: '#f97316' },
  { name: 'Medium', value: 36, color: '#eab308' },
  { name: 'Low', value: 48, color: '#3b82f6' },
];

const frameworks = [
  { id: 'soc2', name: 'SOC 2 Type II', status: 'Active', passed: 145, failed: 8, risks: 3, coverage: 95 },
  { id: 'iso27001', name: 'ISO 27001', status: 'Active', passed: 110, failed: 15, risks: 7, coverage: 88 },
  { id: 'hipaa', name: 'HIPAA', status: 'In Progress', passed: 65, failed: 22, risks: 12, coverage: 75 },
  { id: 'gdpr', name: 'GDPR', status: 'Active', passed: 88, failed: 4, risks: 1, coverage: 98 },
  { id: 'iso42001', name: 'ISO 42001', status: 'Planning', passed: 42, failed: 35, risks: 24, coverage: 45 },
  { id: 'pci', name: 'PCI DSS', status: 'Active', passed: 210, failed: 12, risks: 5, coverage: 92 },
].map(fw => ({
  ...fw,
  score: Math.round((fw.passed / (fw.passed + fw.failed)) * 100)
}));

const ExecutiveDashboard = () => {
  const navigate = useNavigate();

  const handleFrameworkClick = (id: string) => {
    navigate(`/frameworks/${id}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Executive Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Enterprise-wide compliance posture overview</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
          Generate Executive Report
        </button>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Overall Compliance', value: '84%', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Active Frameworks', value: '6', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Critical Risks', value: '12', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-50' },
          { label: 'Evidence Coverage', value: '82%', icon: CheckCircle, color: 'text-indigo-500', bg: 'bg-indigo-50' },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{kpi.label}</p>
              <p className="text-3xl font-bold text-slate-800 mt-1">{kpi.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-full ${kpi.bg} flex items-center justify-center`}>
              <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Compliance Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} domain={[0, 100]} />
                <Tooltip />
                <Area type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Risk Distribution</h3>
          <div className="h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {riskData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Frameworks Grid */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Compliance Frameworks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {frameworks.map((fw) => (
            <div 
              key={fw.id}
              onClick={() => handleFrameworkClick(fw.id)}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{fw.name}</h4>
                <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                  fw.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                  fw.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                  'bg-slate-100 text-slate-700'
                }`}>
                  {fw.status}
                </span>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-slate-500">Compliance Score</span>
                  <span className="font-semibold text-slate-800">{fw.score}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      fw.score > 90 ? 'bg-emerald-500' : 
                      fw.score > 75 ? 'bg-blue-500' : 
                      'bg-amber-500'
                    }`}
                    style={{ width: `${fw.score}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm mt-4 pt-4 border-t border-slate-100">
                <div>
                  <p className="text-slate-500 mb-1 flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5 text-emerald-500" /> Passed</p>
                  <p className="font-semibold text-slate-800">{fw.passed}</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1 flex items-center gap-1"><XCircle className="w-3.5 h-3.5 text-red-500" /> Failed</p>
                  <p className="font-semibold text-slate-800">{fw.failed}</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1 flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Risks</p>
                  <p className="font-semibold text-slate-800">{fw.risks}</p>
                </div>
                <div>
                  <p className="text-slate-500 mb-1 flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-blue-500" /> Coverage</p>
                  <p className="font-semibold text-slate-800">{fw.coverage}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;
