import { Building, Edit2, Mail, Phone, MapPin, Globe } from 'lucide-react';

const Organization = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Building className="w-6 h-6 text-blue-600" />
            Organization Profile
          </h1>
          <p className="text-slate-500 text-sm mt-1">Manage your company details and legal entity information</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 transition-colors">
          <Edit2 className="w-4 h-4" /> Edit Profile
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-sm">
              <Building className="w-10 h-10 text-slate-400" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Acme Corp</h2>
            <p className="text-sm text-slate-500 mb-4">Enterprise Technology Solutions</p>
            <div className="w-full pt-4 border-t border-slate-100 flex justify-between text-sm">
              <span className="text-slate-500">Established</span>
              <span className="font-semibold text-slate-700">2014</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="p-4 border-b border-slate-100 bg-slate-50 rounded-t-xl">
              <h3 className="font-bold text-slate-800">Contact Information</h3>
            </div>
            <div className="p-6 grid sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">Primary Email</p>
                  <p className="font-medium text-slate-900">compliance@acmecorp.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">Phone Number</p>
                  <p className="font-medium text-slate-900">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">Website</p>
                  <p className="font-medium text-blue-600">https://acmecorp.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">Headquarters</p>
                  <p className="font-medium text-slate-900">123 Tech Boulevard<br/>San Francisco, CA 94105</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Organization;
