import { Search, Bell, Moon, UserCircle, Settings, ChevronDown, Building2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const isControlsPage = location.pathname.includes('/controls/');

  return (
    <header className="h-[72px] bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 z-10 sticky top-0 shadow-sm">
      <div className="flex items-center gap-6 flex-1">
        {/* Search Bar */}
        <div className="relative w-96 hidden md:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="Search frameworks, controls, evidence..."
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        {/* Global Context (Organization / Environment) */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
          <Building2 className="w-4 h-4 text-slate-500" />
          <div className="flex flex-col text-xs">
            <span className="text-slate-800 font-medium leading-none">Acme Corp</span>
            <span className="text-slate-500 leading-none mt-1">Production Env</span>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 ml-1" />
        </div>

        <div className="w-px h-8 bg-slate-200 hidden lg:block" />
        
        {/* Action Icons */}
        <div className="flex items-center gap-3">
          <button className="relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-600">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-slate-100 transition-colors text-slate-600">
            <Moon className="w-5 h-5" />
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-200 cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm">
            JD
          </div>
          <div className="hidden sm:flex flex-col text-sm">
            <span className="font-semibold text-slate-800 leading-none">Jane Doe</span>
            <span className="text-xs text-slate-500 leading-none mt-1">Compliance Manager</span>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </div>
      </div>
    </header>
  );
};

export default Header;
