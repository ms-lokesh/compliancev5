import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import TopMetrics from '../components/TopMetrics';
import ControlsGrid from '../components/ControlsGrid';
import GoodToHaveControls from '../components/GoodToHaveControls';
import ComplianceStatusChart from '../components/ComplianceStatusChart';
import AtRiskControls from '../components/AtRiskControls';
import EvidenceCoverage from '../components/EvidenceCoverage';
import RecentActivities from '../components/RecentActivities';

// Simulate getting data from a global state or API
// We'll just pass a dummy empty object to represent "has data" for demo purposes,
// or show empty state if none
const DUMMY_DATA = {
  score: 84,
  mandatoryControls: 65,
  evidenceCoverage: 72
};

const ControlDashboard = () => {
  const { id, categoryId } = useParams();
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState<any>(DUMMY_DATA); // Use dummy data to show the layout
  const [usesAiMl, setUsesAiMl] = useState<boolean>(true);

  // Mock a function to navigate to connectors to get data
  const handleGoToConnectors = () => {
    navigate('/connectors');
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(`/frameworks/${id}`)}
            className="p-2 rounded-lg hover:bg-slate-200 text-slate-500 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{categoryId?.toUpperCase() || 'CC6'} Control Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">Detailed control requirements and evidence status</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-slate-600">Simulate AI/ML Environment</span>
          <button 
            onClick={() => setUsesAiMl(!usesAiMl)}
            className={`w-11 h-6 rounded-full flex items-center transition-colors p-1 ${usesAiMl ? 'bg-blue-600' : 'bg-slate-300'}`}
          >
            <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${usesAiMl ? 'translate-x-5' : 'translate-x-0'}`} />
          </button>
        </div>
      </div>

      {!dashboardData ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center bg-white rounded-xl border border-slate-200">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <ShieldCheck className="w-8 h-8 text-slate-400" />
          </div>
          <h2 className="text-xl font-semibold text-slate-800 mb-2">No Compliance Data Found</h2>
          <p className="text-slate-500 mb-6 max-w-md">Your dashboard is empty. Please navigate to the Connectors page to collect data from your enterprise systems and generate your compliance report.</p>
          <button 
            onClick={handleGoToConnectors}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
          >
            Go to Connectors
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <TopMetrics data={dashboardData} />
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column - 70% */}
            <div className="w-full lg:w-[68%] flex flex-col gap-6">
              <ControlsGrid data={dashboardData} usesAiMl={usesAiMl} />
              <GoodToHaveControls usesAiMl={usesAiMl} />
            </div>
            
            {/* Right Column - 30% */}
            <div className="w-full lg:w-[32%] flex flex-col gap-6">
              <ComplianceStatusChart data={dashboardData} />
              <AtRiskControls />
              <EvidenceCoverage />
              <RecentActivities />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlDashboard;
