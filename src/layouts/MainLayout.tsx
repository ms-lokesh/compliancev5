import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { ChatWidget } from '../components/ChatWidget';
import SnsSquareLogo from '../components/SnsSquareLogo';
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
      <aside className="w-[260px] bg-white flex flex-col h-full shrink-0 z-20 text-slate-600 border-r border-slate-200">
        {/* Brand */}
        <div className="h-16 flex items-center justify-center px-5 shrink-0 bg-white border-b border-slate-200">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
            <SnsSquareLogo className="h-12 w-auto" mode="light" />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Platform</p>
          {navItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleNavigate(item.path)}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium transition-colors ${activePage === item.label
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
            >
              <item.icon className={`w-4 h-4 ${activePage === item.label ? 'text-white' : 'text-slate-500'}`} />
              {item.label}
            </button>
          ))}

          <div className="mt-8 mb-2">
            <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Administration</p>
          </div>
          {orgItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleNavigate(item.path)}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium transition-colors ${activePage === item.label
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
            >
              <item.icon className={`w-4 h-4 ${activePage === item.label ? 'text-white' : 'text-slate-500'}`} />
              {item.label}
            </button>
          ))}
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto px-8 py-6 flex flex-col justify-between">
          <div className="flex-1">
            <Outlet />
          </div>
          <footer className="mt-12 border-t border-slate-200 pt-6 pb-2 flex items-center justify-end gap-6">
            <div className="flex flex-col text-right">
              <span className="text-slate-500 text-sm">
                @2026 SNS square. All rights reserved
              </span>
              <span className="text-slate-400 text-xs font-medium mt-0.5">
                Compliance Management Platform
              </span>
            </div>
            <div className="flex items-center">
              <SnsSquareLogo className="h-8 w-auto" mode="light" />
            </div>
          </footer>
        </main>
      </div>

      <ChatWidget />
    </div>
  );
};

export default MainLayout;
