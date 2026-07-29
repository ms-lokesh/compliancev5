import { GitBranch, Layout, Cloud } from 'lucide-react'; // Layout used as Jira placeholder since Jira icon isn't in lucid by default

const EvidenceOverview = () => {
  const sources = [
    {
      name: "GitHub",
      icon: GitBranch,
      stats: { Collected: 4210, Pending: 12, Failed: 0 },
      items: ["Repositories", "Collaborators", "Branch Protection", "Secrets", "Actions"]
    },
    {
      name: "Jira",
      icon: Layout,
      stats: { Collected: 890, Pending: 45, Failed: 2 },
      items: ["Projects", "Users", "Permissions", "Issue Workflow", "Audit Logs"]
    },
    {
      name: "AWS",
      icon: Cloud,
      stats: { Collected: 12450, Pending: 0, Failed: 14 },
      items: ["IAM Users", "IAM Roles", "Security Groups", "CloudTrail", "KMS", "S3"]
    }
  ];

  return (
    <section>
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Evidence Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sources.map((src, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-soft border border-slate-100 p-6">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-100 rounded-lg">
                  <src.icon className="w-5 h-5 text-slate-700" />
                </div>
                <h3 className="font-semibold text-slate-900">{src.name}</h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 block">Collected</span>
                <span className="text-sm font-semibold text-slate-900">{src.stats.Collected}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {src.items.map((item, i) => (
                <span key={i} className="px-2.5 py-1 bg-slate-50 border border-slate-200 rounded-md text-xs font-medium text-slate-600">
                  {item}
                </span>
              ))}
            </div>

            <div className="flex justify-between items-center text-sm pt-4 border-t border-slate-100">
              <div className="flex gap-4">
                <div>
                  <span className="w-2 h-2 inline-block rounded-full bg-warning mr-2"></span>
                  <span className="text-slate-600">{src.stats.Pending} Pending</span>
                </div>
                <div>
                  <span className="w-2 h-2 inline-block rounded-full bg-danger mr-2"></span>
                  <span className="text-slate-600">{src.stats.Failed} Failed</span>
                </div>
              </div>
              <button className="text-secondary font-medium hover:underline text-xs">View All</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EvidenceOverview;
