import { Settings, Bell, Shield, Database, Lock } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Settings className="w-6 h-6 text-slate-600" />
            Platform Settings
          </h1>
          <p className="text-slate-500 text-sm mt-1">Configure integrations, notifications, and security</p>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-1 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 font-semibold rounded-lg text-sm transition-colors text-left">
            <Shield className="w-4 h-4" /> Security & MFA
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 font-semibold rounded-lg text-sm transition-colors text-left">
            <Bell className="w-4 h-4" /> Notifications
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 font-semibold rounded-lg text-sm transition-colors text-left">
            <Database className="w-4 h-4" /> Data Retention
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 font-semibold rounded-lg text-sm transition-colors text-left">
            <Lock className="w-4 h-4" /> API Keys
          </button>
        </div>

        <div className="md:col-span-3">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-lg font-bold text-slate-900">Security Preferences</h2>
              <p className="text-sm text-slate-500 mt-1">Manage global security policies for all users in the workspace.</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-800">Require MFA</h3>
                  <p className="text-sm text-slate-500">Enforce multi-factor authentication for all platform users.</p>
                </div>
                <div className="w-12 h-6 bg-blue-600 rounded-full relative cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
                </div>
              </div>
              <hr className="border-slate-100" />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-800">Session Timeout</h3>
                  <p className="text-sm text-slate-500">Automatically log out inactive users.</p>
                </div>
                <select className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-blue-500">
                  <option>30 Minutes</option>
                  <option>1 Hour</option>
                  <option>4 Hours</option>
                </select>
              </div>
              <hr className="border-slate-100" />
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-slate-800">SSO Enforcement</h3>
                  <p className="text-sm text-slate-500">Prevent users from bypassing SSO with local passwords.</p>
                </div>
                <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 shadow-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
