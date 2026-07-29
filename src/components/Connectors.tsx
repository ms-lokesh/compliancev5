import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Cloud, GitBranch, Briefcase, DownloadCloud, CheckCircle } from 'lucide-react';

interface ConnectorsProps {
  onAssessmentComplete: (data: any) => void;
}

const Connectors = ({ onAssessmentComplete }: ConnectorsProps) => {
  const navigate = useNavigate();
  const [selectedConnector, setSelectedConnector] = useState('GitHub');
  const [isCollecting, setIsCollecting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleCollect = async () => {
    setIsCollecting(true);
    setSuccessMsg('');
    
    try {
      // Simulate network delay for demo purposes
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccessMsg(`Success! Data collected. Switching to Overview...`);
      setTimeout(() => {
        const stored = JSON.parse(localStorage.getItem('compliance_evidence') || '[]');
        const newEvidence = {
          id: `EV-${1045 + stored.length}`,
          name: `${selectedConnector} Auto-Sync Data`,
          source: selectedConnector,
          date: new Date().toISOString().split('T')[0],
          status: 'Valid',
          mapped: 'CC6.x'
        };
        localStorage.setItem('compliance_evidence', JSON.stringify([newEvidence, ...stored]));

        onAssessmentComplete({ score: 87, passed: 10, failed: 2, total: 12 });
        navigate('/frameworks/soc2/controls/cc6');
      }, 1500);
    } catch (err) {
      setSuccessMsg("Failed to connect to webhook.");
    } finally {
      setIsCollecting(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto mt-8">
      <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Data Connectors</h2>
        <p className="text-sm text-slate-500 mb-8">Select a platform below to trigger data collection and evidence sync for your compliance controls.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div 
            onClick={() => setSelectedConnector('AWS')}
            className={`p-6 rounded-xl border cursor-pointer transition-all ${selectedConnector === 'AWS' ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-slate-200 bg-white hover:border-blue-300'}`}
          >
            <Cloud className={`w-8 h-8 mb-4 ${selectedConnector === 'AWS' ? 'text-blue-600' : 'text-slate-400'}`} />
            <h3 className="font-semibold text-slate-800">AWS</h3>
            <p className="text-xs text-slate-500 mt-2">Collects IAM, Security Groups, and CloudTrail logs.</p>
          </div>
          
          <div 
            onClick={() => setSelectedConnector('GitHub')}
            className={`p-6 rounded-xl border cursor-pointer transition-all ${selectedConnector === 'GitHub' ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-slate-200 bg-white hover:border-blue-300'}`}
          >
            <GitBranch className={`w-8 h-8 mb-4 ${selectedConnector === 'GitHub' ? 'text-blue-600' : 'text-slate-400'}`} />
            <h3 className="font-semibold text-slate-800">GitHub</h3>
            <p className="text-xs text-slate-500 mt-2">Collects PR approvals, branch protections, and access logs.</p>
          </div>
          
          <div 
            onClick={() => setSelectedConnector('Jira')}
            className={`p-6 rounded-xl border cursor-pointer transition-all ${selectedConnector === 'Jira' ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'border-slate-200 bg-white hover:border-blue-300'}`}
          >
            <Briefcase className={`w-8 h-8 mb-4 ${selectedConnector === 'Jira' ? 'text-blue-600' : 'text-slate-400'}`} />
            <h3 className="font-semibold text-slate-800">Jira</h3>
            <p className="text-xs text-slate-500 mt-2">Collects ticket statuses, approvals, and change management evidence.</p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-6">
          <div className="text-sm font-medium text-slate-700">
            Selected Integration: <span className="text-blue-600 font-bold">{selectedConnector}</span>
          </div>
          <div className="flex items-center gap-4">
            {successMsg && (
              <span className="flex items-center gap-2 text-sm font-medium text-green-600 bg-green-50 px-4 py-2 rounded-lg border border-green-200">
                <CheckCircle className="w-4 h-4" />
                {successMsg}
              </span>
            )}
            <button 
              onClick={handleCollect}
              disabled={isCollecting}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all ${isCollecting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'}`}
            >
              <DownloadCloud className={`w-5 h-5 ${isCollecting ? 'animate-pulse' : ''}`} />
              {isCollecting ? 'Collecting Data...' : 'Collect Data'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connectors;
