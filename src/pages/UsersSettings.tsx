import { Users, UserPlus, Shield, Key } from 'lucide-react';

const UsersSettings = () => {
  const users = [
    { name: 'Jane Doe', email: 'jane@acmecorp.com', role: 'Admin', status: 'Active', mfa: true },
    { name: 'John Smith', email: 'john@acmecorp.com', role: 'Compliance Officer', status: 'Active', mfa: true },
    { name: 'Emily Chen', email: 'emily@acmecorp.com', role: 'Auditor', status: 'Pending', mfa: false },
    { name: 'Michael Brown', email: 'michael@acmecorp.com', role: 'Engineer', status: 'Active', mfa: true },
    { name: 'Sarah Wilson', email: 'sarah@acmecorp.com', role: 'Engineer', status: 'Active', mfa: true },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-600" />
            Users & Roles
          </h1>
          <p className="text-slate-500 text-sm mt-1">Manage user access and platform permissions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-sm hover:bg-indigo-700 transition-colors">
          <UserPlus className="w-4 h-4" /> Invite User
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-center">MFA</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {users.map((user, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{user.name}</div>
                        <div className="text-xs text-slate-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                      {user.role === 'Admin' && <Shield className="w-3.5 h-3.5 text-indigo-500" />}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-md font-medium text-xs ${
                      user.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {user.mfa ? (
                      <span className="inline-flex p-1 bg-emerald-100 text-emerald-600 rounded-full"><Key className="w-3.5 h-3.5" /></span>
                    ) : (
                      <span className="inline-flex p-1 bg-slate-100 text-slate-400 rounded-full"><Key className="w-3.5 h-3.5" /></span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-indigo-600 font-medium text-sm transition-colors">
                      Edit
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

export default UsersSettings;
