import { FileText, CheckSquare, Database, AlertTriangle, BarChart, Settings, Building, Users } from 'lucide-react';

const PlaceholderPage = ({ title, icon: Icon, description }: { title: string, icon: any, description: string }) => (
  <div className="flex flex-col items-center justify-center h-[70vh] text-center bg-white rounded-xl border border-slate-200">
    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
      <Icon className="w-8 h-8 text-slate-400" />
    </div>
    <h2 className="text-xl font-semibold text-slate-800 mb-2">{title}</h2>
    <p className="text-slate-500 max-w-md">{description}</p>
  </div>
);

export const Assessments = () => (
  <PlaceholderPage 
    title="Assessments" 
    icon={CheckSquare} 
    description="Manage your compliance assessments, track progress, and review completion status." 
  />
);



export const Risks = () => (
  <PlaceholderPage 
    title="Risks & Findings" 
    icon={AlertTriangle} 
    description="View and manage compliance risks, severity, and remediation progress." 
  />
);

export const Reports = () => (
  <PlaceholderPage 
    title="Reports" 
    icon={BarChart} 
    description="Generate executive, audit, and gap analysis reports. Export as PDF or Excel." 
  />
);

export const Organization = () => (
  <PlaceholderPage 
    title="Organization Settings" 
    icon={Building} 
    description="Manage your organization profile, business units, and enabled frameworks." 
  />
);

export const UsersSettings = () => (
  <PlaceholderPage 
    title="Users & Roles" 
    icon={Users} 
    description="Manage user access, roles, and permissions across the platform." 
  />
);

export const SettingsPage = () => (
  <PlaceholderPage 
    title="Platform Settings" 
    icon={Settings} 
    description="Configure API keys, notifications, and platform integrations." 
  />
);
