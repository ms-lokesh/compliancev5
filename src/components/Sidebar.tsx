import { LayoutDashboard, Plug, ShieldCheck, ChevronDown } from 'lucide-react';
import SnsSquareLogo from './SnsSquareLogo';

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
}

const Sidebar = ({ activePage, onNavigate }: SidebarProps) => {
  const navItems = [
    { icon: LayoutDashboard, label: 'Overview' },
    { icon: Plug, label: 'Connectors' },
  ];

  return (
    <aside className="w-[260px] bg-white flex flex-col h-full shrink-0 z-20 text-slate-600 font-sans border-r border-slate-200">
      {/* Brand */}
      <div className="h-16 flex items-center justify-center px-5 shrink-0 bg-white border-b border-slate-200">
        <div className="flex items-center gap-2 cursor-pointer">
          <SnsSquareLogo className="h-12 w-auto" mode="light" />
        </div>
      </div>

      
      {/* Navigation */}
      <div className="flex-1 px-3 flex flex-col gap-0.5 overflow-y-auto animate-fade-in">
        {navItems.map((item, idx) => (
          <button 
            key={idx}
            onClick={() => onNavigate(item.label)}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium transition-colors ${
              activePage === item.label 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <item.icon className={`w-4 h-4 ${activePage === item.label ? 'text-white' : 'text-slate-500'}`} />
            {item.label}
          </button>
        ))}
      </div>
      
      {/* Bottom Context Info */}
      <div className="p-5 border-t border-slate-200 text-xs">
        <div className="mb-4">
          <p className="text-slate-500 mb-1">Framework</p>
          <p className="text-slate-800 font-medium">SOC 2 Type II</p>
        </div>
        <div>
          <p className="text-slate-500 mb-1">Control Category</p>
          <p className="text-slate-600 leading-tight">CC6 - Logical & Physical<br/>Access Controls</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
