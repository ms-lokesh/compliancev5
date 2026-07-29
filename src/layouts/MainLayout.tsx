import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { ChatWidget } from '../components/ChatWidget';
import {
  LayoutDashboard,
  FileText,
  CheckSquare,
  Plug,
  Database,
  AlertTriangle,
  BarChart,
  Building,
  Users,
  Settings,
  Cpu,
  ShieldCheck
} from 'lucide-react';

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active item based on pathname
  const getActiveItem = () => {
    const path = location.pathname;
    if (path.startsWith('/dashboard')) return 'Dashboard';
    if (path.startsWith('/frameworks')) return 'Frameworks';
    if (path.startsWith('/assessments')) return 'Assessments';
    if (path.startsWith('/connectors')) return 'Connectors';
    if (path.startsWith('/evidence')) return 'Evidence';
    if (path.startsWith('/risks')) return 'Risk Management';
    if (path.startsWith('/reports')) return 'Reports';
    if (path.startsWith('/management-system')) return 'Management System';
    if (path.startsWith('/policies')) return 'Policies';
    if (path.startsWith('/organization')) return 'Organization';
    if (path.startsWith('/users')) return 'Users';
    if (path.startsWith('/settings')) return 'Settings';
    return 'Dashboard';
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: FileText, label: 'Frameworks', path: '/frameworks/soc2' },
    { icon: Plug, label: 'Connectors', path: '/connectors' },
    { icon: AlertTriangle, label: 'Risk Management', path: '/risks' },
    { icon: Cpu, label: 'Management System', path: '/management-system' },
    { icon: ShieldCheck, label: 'Policies', path: '/policies' },
    { icon: Database, label: 'Evidence', path: '/evidence' },
    { icon: BarChart, label: 'Reports', path: '/reports' },
    { icon: CheckSquare, label: 'Assessments', path: '/assessments' },
  ];

  const orgItems = [
    { icon: Building, label: 'Organization', path: '/organization' },
    { icon: Users, label: 'Users', path: '/users' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const activePage = getActiveItem();

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <aside className="w-[260px] bg-[#0A111F] flex flex-col h-full shrink-0 z-20 text-slate-300 border-r border-[#152136]">
        {/* Brand */}
        <div className="h-16 flex items-center px-5 shrink-0 border-b border-[#1F2C41]">
          <div className="flex items-center gap-3 text-white font-semibold text-lg cursor-pointer" onClick={() => navigate('/dashboard')}>
            <div className="w-8 h-8 border-[2px] border-white rounded-[6px] flex items-center justify-center shrink-0">
              <div className="w-3.5 h-3.5 bg-blue-500 rounded-[2px]" />
            </div>
            Compliance Management
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Platform</p>
          {navItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleNavigate(item.path)}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium transition-colors ${activePage === item.label
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
            >
              <item.icon className={`w-4 h-4 ${activePage === item.label ? 'text-white' : 'text-slate-400'}`} />
              {item.label}
            </button>
          ))}

          <div className="mt-8 mb-2">
            <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Administration</p>
          </div>
          {orgItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleNavigate(item.path)}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium transition-colors ${activePage === item.label
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
            >
              <item.icon className={`w-4 h-4 ${activePage === item.label ? 'text-white' : 'text-slate-400'}`} />
              {item.label}
            </button>
          ))}
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto px-8 py-6">
          <Outlet />
        </main>
      </div>

      <ChatWidget />
    </div>
  );
};

export default MainLayout;
