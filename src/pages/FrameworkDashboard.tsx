import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, ShieldCheck, AlertTriangle, PlayCircle } from 'lucide-react';

const categories = [
  { id: 'cc1', name: 'CC1 - Control Environment', score: 95, status: 'Compliant', passed: 18, failed: 1 },
  { id: 'cc2', name: 'CC2 - Communication and Information', score: 88, status: 'Compliant', passed: 12, failed: 2 },
  { id: 'cc3', name: 'CC3 - Risk Assessment', score: 75, status: 'Needs Attention', passed: 9, failed: 3 },
  { id: 'cc4', name: 'CC4 - Monitoring Activities', score: 100, status: 'Compliant', passed: 15, failed: 0 },
  { id: 'cc5', name: 'CC5 - Control Activities', score: 92, status: 'Compliant', passed: 22, failed: 2 },
  { id: 'cc6', name: 'CC6 - Logical & Physical Access Controls', score: 84, status: 'Needs Attention', passed: 45, failed: 8 },
  { id: 'cc7', name: 'CC7 - System Operations', score: 65, status: 'At Risk', passed: 14, failed: 8 },
];

const FrameworkDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    score: 92,
    passed: 145,
    failed: 8,
    loading: true
  });

  useEffect(() => {
    // In a real app we'd map framework ID to an assessment_id. Using 1 as a mock.
    fetch('http://localhost:8000/api/dashboard/1')
      .then(res => res.json())
      .then(data => {
        if(data && data.overall_score !== undefined) {
          setStats({
            score: Math.round(data.overall_score),
            passed: data.passed_controls,
            failed: data.failed_controls,
            loading: false
          });
        }
      })
      .catch(err => {
        console.error("Failed to fetch dashboard stats", err);
        setStats(s => ({...s, loading: false}));
      });
  }, []);

  // In a real app, fetch framework details based on ID
  const frameworkName = id === 'soc2' ? 'SOC 2 Type II' : id?.toUpperCase();

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === 'cc6') {
      navigate(`/frameworks/${id}/controls/${categoryId}`);
    } else {
      navigate(`/frameworks/${id}/controls/${categoryId}`);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/dashboard')}
          className="p-2 rounded-lg hover:bg-slate-200 text-slate-500 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{frameworkName} Framework</h1>
          <p className="text-sm text-slate-500 mt-1">Detailed assessment view and control categories</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Overall Score</p>
              <p className="text-2xl font-bold text-slate-800">{stats.loading ? '...' : `${stats.score}%`}</p>
            </div>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${stats.score}%` }} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">Assessment Status</p>
            <p className="text-xl font-bold text-slate-800">Active Monitoring</p>
            <p className="text-sm text-slate-500 mt-1">Last scan: 2 hours ago</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
            <PlayCircle className="w-6 h-6 text-emerald-500" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex gap-4 justify-around items-center">
          <div className="text-center">
            <p className="text-sm font-medium text-slate-500 mb-1">Passed</p>
            <p className="text-2xl font-bold text-emerald-600">{stats.loading ? '...' : stats.passed}</p>
          </div>
          <div className="w-px h-12 bg-slate-200"></div>
          <div className="text-center">
            <p className="text-sm font-medium text-slate-500 mb-1">Failed</p>
            <p className="text-2xl font-bold text-red-600">{stats.loading ? '...' : stats.failed}</p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Control Categories (Common Criteria)</h3>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-sm font-medium text-slate-500">
                <th className="p-4 py-3">Category</th>
                <th className="p-4 py-3 text-center">Score</th>
                <th className="p-4 py-3">Status</th>
                <th className="p-4 py-3 text-center">Passed</th>
                <th className="p-4 py-3 text-center">Failed</th>
                <th className="p-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {categories.map((cat) => (
                <tr 
                  key={cat.id} 
                  className="hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => handleCategoryClick(cat.id)}
                >
                  <td className="p-4 font-medium text-slate-800">{cat.name}</td>
                  <td className="p-4 text-center">
                    <span className="font-semibold">{cat.score}%</span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${
                      cat.status === 'Compliant' ? 'bg-emerald-100 text-emerald-700' :
                      cat.status === 'Needs Attention' ? 'bg-amber-100 text-amber-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {cat.status === 'Compliant' && <CheckCircle className="w-3.5 h-3.5" />}
                      {cat.status === 'Needs Attention' && <AlertTriangle className="w-3.5 h-3.5" />}
                      {cat.status === 'At Risk' && <XCircle className="w-3.5 h-3.5" />}
                      {cat.status}
                    </span>
                  </td>
                  <td className="p-4 text-center text-emerald-600 font-medium">{cat.passed}</td>
                  <td className="p-4 text-center text-red-600 font-medium">{cat.failed}</td>
                  <td className="p-4 text-right">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                      View Controls &rarr;
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

export default FrameworkDashboard;
