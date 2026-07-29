import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts';

const dataLine = [
  { name: 'Jan', score: 82 }, { name: 'Feb', score: 85 }, { name: 'Mar', score: 84 },
  { name: 'Apr', score: 88 }, { name: 'May', score: 89 }, { name: 'Jun', score: 92 },
];

const dataArea = [
  { name: 'Jan', evidence: 4000 }, { name: 'Feb', evidence: 5000 }, { name: 'Mar', evidence: 6500 },
  { name: 'Apr', evidence: 8000 }, { name: 'May', evidence: 11000 }, { name: 'Jun', evidence: 14500 },
];

const dataBar = [
  { name: 'AWS', low: 40, med: 24, high: 12, crit: 2 },
  { name: 'GitHub', low: 30, med: 13, high: 4, crit: 0 },
  { name: 'Okta', low: 20, med: 8, high: 1, crit: 0 },
];

const dataPie = [
  { name: 'SOC2', value: 400 },
  { name: 'ISO27001', value: 300 },
  { name: 'GDPR', value: 300 },
  { name: 'HIPAA', value: 200 },
];
const COLORS = ['#2563EB', '#16A34A', '#F59E0B', '#DC2626'];

const dataRadar = [
  { subject: 'Uptime', A: 100, fullMark: 100 },
  { subject: 'Latency', A: 85, fullMark: 100 },
  { subject: 'Errors', A: 98, fullMark: 100 },
  { subject: 'Sync', A: 90, fullMark: 100 },
  { subject: 'Coverage', A: 80, fullMark: 100 },
];

const ChartsSection = () => {
  return (
    <section>
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Analytics & Trends</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        
        {/* Line Chart */}
        <div className="bg-white rounded-xl shadow-soft border border-slate-100 p-6 h-80">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Compliance Trend</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dataLine} margin={{ top: 5, right: 20, bottom: 25, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis domain={[70, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
              <Line type="monotone" dataKey="score" stroke="#2563EB" strokeWidth={3} dot={{ r: 4, fill: '#2563EB', strokeWidth: 0 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stacked Bar */}
        <div className="bg-white rounded-xl shadow-soft border border-slate-100 p-6 h-80">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Risk Severity by Source</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataBar} margin={{ top: 5, right: 20, bottom: 25, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
              <Bar dataKey="low" stackId="a" fill="#16A34A" />
              <Bar dataKey="med" stackId="a" fill="#F59E0B" />
              <Bar dataKey="high" stackId="a" fill="#ea580c" />
              <Bar dataKey="crit" stackId="a" fill="#DC2626" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Area Chart */}
        <div className="bg-white rounded-xl shadow-soft border border-slate-100 p-6 h-80">
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Evidence Collection</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dataArea} margin={{ top: 5, right: 20, bottom: 25, left: 0 }}>
              <defs>
                <linearGradient id="colorEv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
              <Area type="monotone" dataKey="evidence" stroke="#2563EB" fillOpacity={1} fill="url(#colorEv)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Donut Chart */}
        <div className="bg-white rounded-xl shadow-soft border border-slate-100 p-6 h-80 flex flex-col items-center">
          <h3 className="text-sm font-semibold text-slate-800 mb-2 w-full text-left">Framework Distribution</h3>
          <div className="flex-1 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={dataPie} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                  {dataPie.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="bg-white rounded-xl shadow-soft border border-slate-100 p-6 h-80 flex flex-col items-center xl:col-span-2">
          <h3 className="text-sm font-semibold text-slate-800 mb-2 w-full text-left">Connector Health</h3>
          <div className="flex-1 w-full max-w-sm">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dataRadar}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                <Radar name="System Health" dataKey="A" stroke="#2563EB" fill="#2563EB" fillOpacity={0.3} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default ChartsSection;
