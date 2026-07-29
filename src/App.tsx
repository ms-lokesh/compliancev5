import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ExecutiveDashboard from './pages/ExecutiveDashboard';
import FrameworkDashboard from './pages/FrameworkDashboard';
import ControlDashboard from './pages/ControlDashboard';
import MainLayout from './layouts/MainLayout';
import Connectors from './components/Connectors';
import Evidence from './pages/Evidence';
import Assessments from './pages/Assessments';
import Risks from './pages/Risks';
import Reports from './pages/Reports';
import AIManagementPage from './pages/AIManagementPage';
import PoliciesPage from './pages/PoliciesPage';
import Organization from './pages/Organization';
import UsersSettings from './pages/UsersSettings';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<ExecutiveDashboard />} />
          <Route path="/frameworks/:id" element={<FrameworkDashboard />} />
          <Route path="/frameworks/:id/controls/:categoryId" element={<ControlDashboard />} />

          <Route path="/connectors" element={<Connectors onAssessmentComplete={() => { }} />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/evidence" element={<Evidence />} />
          <Route path="/risks" element={<Risks />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/management-system" element={<AIManagementPage />} />
          <Route path="/policies" element={<PoliciesPage />} />
          <Route path="/organization" element={<Organization />} />
          <Route path="/users" element={<UsersSettings />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
