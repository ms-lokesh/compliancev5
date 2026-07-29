import { LayoutDashboard, Plug, ShieldCheck, ChevronDown } from 'lucide-react';

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
    <aside className="w-[260px] bg-[#0A111F] flex flex-col h-full shrink-0 z-20 text-slate-300 font-sans border-r border-[#152136]">
      {/* Brand */}
      <div className="h-16 flex items-center px-5 shrink-0">
        <div className="flex items-center gap-2 text-white font-semibold text-lg cursor-pointer">
          <div className="w-6 h-6 border-[1.5px] border-white rounded-[4px] flex items-center justify-center shrink-0">
            <div className="w-2.5 h-2.5 bg-blue-500 rounded-[2px]" />
          </div>
          Compliance Management
        </div>
      </div>

      
      {/* Navigation */}
      <div className="flex-1 px-3 flex flex-col gap-0.5 overflow-y-auto">
        {navItems.map((item, idx) => (
          <button 
            key={idx}
            onClick={() => onNavigate(item.label)}
            className={`flex items-center gap-3 px-3 py-2 rounded-md text-[13px] font-medium transition-colors ${
              activePage === item.label 
                ? 'bg-blue-600 text-white' 
                : 'text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <item.icon className={`w-4 h-4 ${activePage === item.label ? 'text-white' : 'text-slate-400'}`} />
            {item.label}
          </button>
        ))}
      </div>
      
      {/* Bottom Context Info */}
      <div className="p-5 border-t border-[#1F2C41] text-xs">
        <div className="mb-4">
          <p className="text-slate-500 mb-1">Framework</p>
          <p className="text-white font-medium">SOC 2 Type II</p>
        </div>
        <div>
          <p className="text-slate-500 mb-1">Control Category</p>
          <p className="text-slate-300 leading-tight">CC6 - Logical & Physical<br/>Access Controls</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
