import { ShieldAlert, CheckCircle, Database, LayoutTemplate } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';

const HeroSection = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4">
      <div className="xl:col-span-1 bg-white rounded-xl shadow-soft border border-slate-100 p-6 flex flex-col items-center justify-center">
        <div className="relative w-32 h-32 flex items-center justify-center mb-2">
          {/* Circular animated score placeholder */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="8" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="#16a34a" strokeWidth="8" strokeDasharray="282.7" strokeDashoffset="22.6" className="animate-[spin_2s_ease-out_forwards]" />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-3xl font-bold text-slate-900">92%</span>
          </div>
        </div>
        <span className="text-sm font-semibold text-success bg-green-50 px-3 py-1 rounded-full">Compliant</span>
        <p className="text-xs text-slate-500 mt-2">Overall Compliance Score</p>
      </div>

      {[
        { title: "Critical Risks", value: "3", icon: ShieldAlert, color: "text-danger", bg: "bg-red-50", stroke: "#DC2626", chart: "line", data: [{v: 12}, {v: 10}, {v: 8}, {v: 6}, {v: 4}, {v: 3}] },
        { title: "Open Findings", value: "14", icon: CheckCircle, color: "text-warning", bg: "bg-amber-50", stroke: "#F59E0B", chart: "area", data: [{v: 24}, {v: 20}, {v: 22}, {v: 18}, {v: 15}, {v: 14}] },
        { title: "Connected Systems", value: "12", icon: Database, color: "text-secondary", bg: "bg-blue-50", stroke: "#2563EB", chart: "bar", data: [{v: 4}, {v: 6}, {v: 8}, {v: 10}, {v: 11}, {v: 12}] },
        { title: "Active Frameworks", value: "4", icon: LayoutTemplate, color: "text-slate-700", bg: "bg-slate-100", stroke: "#334155", chart: "bar", data: [{v: 2}, {v: 3}, {v: 3}, {v: 4}, {v: 4}, {v: 4}] },
      ].map((stat, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow-soft border border-slate-100 p-6 flex flex-col justify-between group">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-slate-500">{stat.title}</h3>
            <div className={`p-2 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
          </div>
          <div className="flex items-end justify-between mt-4">
            <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
            <div className="h-10 w-24">
              <ResponsiveContainer width="100%" height="100%">
                {stat.chart === 'line' ? (
                  <LineChart data={stat.data}>
                    <Line type="monotone" dataKey="v" stroke={stat.stroke} strokeWidth={2} dot={false} isAnimationActive={false} />
                  </LineChart>
                ) : stat.chart === 'area' ? (
                  <AreaChart data={stat.data}>
                    <Area type="monotone" dataKey="v" stroke={stat.stroke} fill={stat.stroke} fillOpacity={0.2} strokeWidth={2} isAnimationActive={false} />
                  </AreaChart>
                ) : (
                  <BarChart data={stat.data}>
                    <Bar dataKey="v" fill={stat.stroke} radius={[2, 2, 0, 0]} isAnimationActive={false} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default HeroSection;
