import React, { useState } from 'react';
import {
  ShieldCheck,
  FileText,
  Download,
  Copy,
  Printer,
  CheckCircle2,
  Lock,
  Building2,
  UserCheck,
  Mail,
  Calendar,
  Layers,
  Sparkles,
  FileSpreadsheet,
  Save,
  Check,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Clock,
  AlertCircle,
  Search,
  Eye,
  Trash2,
  ListFilter
} from 'lucide-react';

export type PolicyStatus = 'Approved' | 'In Review' | 'Open';

export interface TrackedPolicyItem {
  id: string;
  policyCode: string;
  policyName: string;
  templateName: string;
  organizationName: string;
  dpoName: string;
  dpoEmail: string;
  effectiveDate: string;
  versionNumber: string;
  status: PolicyStatus;
  lastUpdated: string;
}

interface PolicyDefinition {
  id: string;
  name: string;
  code: string;
  category: string;
  description: string;
  color: string;
  badge: string;
  templates: { id: string; name: string }[];
  clauses: string[];
}

const POLICIES: PolicyDefinition[] = [
  {
    id: 'iso42001',
    name: 'ISO/IEC 42001:2023',
    code: 'ISO 42001',
    category: 'AI Governance System',
    description: 'Artificial Intelligence Management System (AIMS) governance policy covering ethical AI use, risk mitigation, and algorithmic accountability.',
    color: 'border-blue-500 bg-blue-50/40 text-blue-700',
    badge: 'ISO/IEC Standard',
    templates: [
      { id: 'standard', name: 'Standard AIMS Policy' },
      { id: 'risk_gov', name: 'AI Risk & Impact Assessment' },
      { id: 'tech_ops', name: 'Model Operations & Monitoring Policy' },
    ],
    clauses: [
      'Clause 4: Context of the Organization & AI Stakeholders',
      'Clause 5: Leadership, Commitment & AI Policy Statement',
      'Clause 6: Planning for AI Risk Management & Objectives',
      'Clause 7: Resource Allocation, Competence & Data Quality',
      'Clause 8: Operation of AI Systems & Algorithmic Controls',
      'Clause 9: Performance Evaluation & AI Model Auditing'
    ]
  },
  {
    id: 'gdpr',
    name: 'General Data Protection Regulation',
    code: 'GDPR',
    category: 'Data Privacy & Rights',
    description: 'EU Data Protection compliance policy governing personal data processing, lawful basis, subject rights, and breach notification.',
    color: 'border-emerald-500 bg-emerald-50/40 text-emerald-700',
    badge: 'EU Regulation 2016/679',
    templates: [
      { id: 'standard', name: 'Data Protection & Privacy Policy' },
      { id: 'dpia', name: 'Data Protection Impact Assessment (DPIA)' },
      { id: 'data_transfer', name: 'Cross-Border Data Transfer Policy' },
    ],
    clauses: [
      'Article 5: Principles Relating to Processing of Personal Data',
      'Article 6: Lawfulness of Processing & Legal Basis',
      'Article 12-22: Rights of Data Subjects & Access Procedures',
      'Article 32: Security of Processing & Technical Measures',
      'Article 33: Data Breach Notification Timeline (72 Hours)',
      'Article 35: Data Protection Impact Assessment Requirements'
    ]
  },
  {
    id: 'hipaa',
    name: 'HIPAA Security & Privacy Rule',
    code: 'HIPAA',
    category: 'Healthcare Data Security',
    description: 'Health Insurance Portability and Accountability Act policy establishing safeguards for Protected Health Information (PHI).',
    color: 'border-violet-500 bg-violet-50/40 text-violet-700',
    badge: '45 CFR Part 164',
    templates: [
      { id: 'standard', name: 'HIPAA Security & Privacy Policy' },
      { id: 'baa', name: 'Business Associate Agreement (BAA) Policy' },
      { id: 'breach_resp', name: 'HIPAA Incident & Breach Response Plan' },
    ],
    clauses: [
      '§ 164.308 Administrative Safeguards & Officer Designation',
      '§ 164.310 Physical Safeguards & Facility Access Control',
      '§ 164.312 Technical Safeguards, Access & Audit Controls',
      '§ 164.314 Business Associate Contracts & Obligations',
      '§ 164.404 Notification to Individuals & HHS Secretariat'
    ]
  },
  {
    id: 'soc2',
    name: 'SOC 2 Trust Services Criteria',
    code: 'SOC 2',
    category: 'Security & Confidentiality',
    description: 'AICPA Trust Services Criteria policy defining security, availability, processing integrity, and confidentiality controls.',
    color: 'border-amber-500 bg-amber-50/40 text-amber-700',
    badge: 'AICPA Standard',
    templates: [
      { id: 'standard', name: 'Information Security Management Policy' },
      { id: 'access_control', name: 'Access & Identity Management Policy' },
      { id: 'change_mgmt', name: 'System Change & Release Management Policy' },
    ],
    clauses: [
      'CC1.0 Control Environment & Executive Tone at the Top',
      'CC6.0 Logical and Physical Access Control Measures',
      'CC7.0 System Operations, Vulnerability & Change Management',
      'A1.0 Availability Thresholds & Business Continuity Planning',
      'C1.0 Confidentiality & Data Classification Guidelines'
    ]
  },
  {
    id: 'eu_ai_act',
    name: 'EU AI Act Governance Policy',
    code: 'EU AI Act',
    category: 'Risk-Based AI Safety',
    description: 'Compliance policy for the European Union Artificial Intelligence Act for high-risk AI system registration, transparency, and human oversight.',
    color: 'border-cyan-500 bg-cyan-50/40 text-cyan-700',
    badge: 'Regulation (EU) 2024/1689',
    templates: [
      { id: 'standard', name: 'High-Risk AI System Compliance Policy' },
      { id: 'transparency', name: 'AI System Transparency & Labeling Policy' },
      { id: 'oversight', name: 'Human-in-the-Loop & Oversight Framework' },
    ],
    clauses: [
      'Article 9: Risk Management System for High-Risk AI Models',
      'Article 10: Data & Data Governance Standards for Training Sets',
      'Article 13: Transparency and Provision of Information to Users',
      'Article 14: Human Oversight & Emergency Brake Controls',
      'Article 15: Accuracy, Robustness and Cybersecurity Standards'
    ]
  }
];

const INITIAL_TRACKED_POLICIES: TrackedPolicyItem[] = [
  {
    id: 'pol-1',
    policyCode: 'ISO 42001',
    policyName: 'ISO/IEC 42001:2023 AIMS Policy',
    templateName: 'Standard AIMS Policy',
    organizationName: 'Acme Corporation',
    dpoName: 'Jane Doe',
    dpoEmail: 'jane.doe@acme.com',
    effectiveDate: '2026-07-29',
    versionNumber: 'v1.0',
    status: 'Approved',
    lastUpdated: 'Today at 04:15 PM'
  },
  {
    id: 'pol-2',
    policyCode: 'GDPR',
    policyName: 'General Data Protection & Privacy Policy',
    templateName: 'Data Protection Impact Assessment (DPIA)',
    organizationName: 'Acme Corporation',
    dpoName: 'Jane Doe',
    dpoEmail: 'jane.doe@acme.com',
    effectiveDate: '2026-07-28',
    versionNumber: 'v1.2',
    status: 'In Review',
    lastUpdated: 'Yesterday at 11:30 AM'
  },
  {
    id: 'pol-3',
    policyCode: 'HIPAA',
    policyName: 'HIPAA Security & Safeguards Policy',
    templateName: 'Business Associate Agreement (BAA) Policy',
    organizationName: 'Acme Corporation',
    dpoName: 'Jane Doe',
    dpoEmail: 'jane.doe@acme.com',
    effectiveDate: '2026-07-25',
    versionNumber: 'v1.0',
    status: 'Open',
    lastUpdated: 'Jul 25, 2026'
  },
  {
    id: 'pol-4',
    policyCode: 'SOC 2',
    policyName: 'SOC 2 Information Security Policy',
    templateName: 'Access & Identity Management Policy',
    organizationName: 'Acme Corporation',
    dpoName: 'Jane Doe',
    dpoEmail: 'jane.doe@acme.com',
    effectiveDate: '2026-07-20',
    versionNumber: 'v2.0',
    status: 'Approved',
    lastUpdated: 'Jul 20, 2026'
  },
  {
    id: 'pol-5',
    policyCode: 'EU AI Act',
    policyName: 'EU AI Act High-Risk System Policy',
    templateName: 'Human Oversight & Emergency Controls',
    organizationName: 'Acme Corporation',
    dpoName: 'Jane Doe',
    dpoEmail: 'jane.doe@acme.com',
    effectiveDate: '2026-07-15',
    versionNumber: 'v1.1',
    status: 'In Review',
    lastUpdated: 'Jul 15, 2026'
  }
];

const PoliciesPage: React.FC = () => {
  // Top level active mode: 'create' | 'tracker'
  const [activeTab, setActiveTab] = useState<'create' | 'tracker'>('create');

  // Step State: 1 = Select Policy, 2 = Fill Form & Template, 3 = Preview & Download, 4 = Tracker
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedPolicyId, setSelectedPolicyId] = useState<string>('iso42001');
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('standard');
  const [copied, setCopied] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  // Tracked Policies state
  const [trackedPolicies, setTrackedPolicies] = useState<TrackedPolicyItem[]>(INITIAL_TRACKED_POLICIES);
  const [trackerFilter, setTrackerFilter] = useState<'All' | PolicyStatus>('All');
  const [trackerSearch, setTrackerSearch] = useState<string>('');

  // Form Inputs
  const [formState, setFormState] = useState({
    organizationName: 'Acme Corporation',
    dpoName: 'Jane Doe',
    dpoEmail: 'jane.doe@acme.com',
    systemScope: 'Enterprise Platform, Cloud APIs & Machine Learning Models',
    dataClassification: 'Confidential & Proprietary Data',
    effectiveDate: new Date().toISOString().split('T')[0],
    versionNumber: 'v1.0'
  });

  const selectedPolicy = POLICIES.find(p => p.id === selectedPolicyId) || POLICIES[0];
  const selectedTemplate = selectedPolicy.templates.find(t => t.id === selectedTemplateId) || selectedPolicy.templates[0];

  const handleInputChange = (field: string, value: string) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handlePolicyChange = (policyId: string) => {
    setSelectedPolicyId(policyId);
    const pol = POLICIES.find(p => p.id === policyId);
    if (pol && pol.templates.length > 0) {
      setSelectedTemplateId(pol.templates[0].id);
    }
  };

  // Generate Document Text
  const generateDocumentText = (): string => {
    return `# ${selectedPolicy.name} Compliance Policy
**Document ID:** POL-${selectedPolicy.code.replace(/\s+/g, '')}-${formState.versionNumber.replace('v', '')}
**Effective Date:** ${formState.effectiveDate} | **Version:** ${formState.versionNumber}
**Organization:** ${formState.organizationName}
**Compliance Officer:** ${formState.dpoName} (${formState.dpoEmail})
**Scope of Application:** ${formState.systemScope}
**Data Classification:** ${formState.dataClassification}

---

## 1. Executive Purpose & Scope
This ${selectedTemplate.name} establishes formal rules and procedures governing the operation, assessment, and maintenance of compliance with ${selectedPolicy.name} across ${formState.organizationName}. 
This policy applies to all employees, contractors, automated agents, and system infrastructure operating within ${formState.systemScope}.

---

## 2. Regulatory Standard & Framework
- **Primary Framework:** ${selectedPolicy.name} (${selectedPolicy.badge})
- **Governance Focus:** ${selectedPolicy.category}
- **Document Template:** ${selectedTemplate.name}

---

## 3. Core Policy Requirements & Clause Alignments
${selectedPolicy.clauses.map((c, i) => `### 3.${i + 1} ${c}\n${formState.organizationName} shall enforce automated controls, monitoring, and audit trails to maintain compliance with ${c}. All records will be reviewed quarterly by ${formState.dpoName}.`).join('\n\n')}

---

## 4. Roles & Responsibilities
- **Chief Executive / Operations:** Allocates necessary financial and technical resources to ensure adherence to this policy.
- **Data Protection / Compliance Lead (${formState.dpoName}):** Responsible for enforcing controls, executing audits, and acting as the official point of contact (${formState.dpoEmail}).
- **System Engineers & Operators:** Ensure technical infrastructure and ML models operate within the boundaries of ${formState.dataClassification}.

---

## 5. Document Control & Approval
- **Status:** Approved for Operational Enforcement
- **Review Cycle:** Annual or upon material change to system scope
- **Authorized Signatory:** ${formState.dpoName}, Compliance Officer
- **Date Signed:** ${formState.effectiveDate}
`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateDocumentText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([generateDocumentText()], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${selectedPolicy.code}_Policy_${formState.organizationName.replace(/\s+/g, '_')}_${formState.versionNumber}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveAndTrack = () => {
    const newTrackedItem: TrackedPolicyItem = {
      id: `pol-${Date.now()}`,
      policyCode: selectedPolicy.code,
      policyName: selectedPolicy.name,
      templateName: selectedTemplate.name,
      organizationName: formState.organizationName,
      dpoName: formState.dpoName,
      dpoEmail: formState.dpoEmail,
      effectiveDate: formState.effectiveDate,
      versionNumber: formState.versionNumber,
      status: 'In Review',
      lastUpdated: 'Just now'
    };

    setTrackedPolicies(prev => [newTrackedItem, ...prev]);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setActiveTab('tracker');
      setCurrentStep(4); // Switch to Tracker
    }, 1000);
  };

  const handleStatusChange = (id: string, newStatus: PolicyStatus) => {
    setTrackedPolicies(prev =>
      prev.map(p => (p.id === id ? { ...p, status: newStatus, lastUpdated: 'Just now' } : p))
    );
  };

  const handleDeletePolicy = (id: string) => {
    setTrackedPolicies(prev => prev.filter(p => p.id !== id));
  };

  // Filtered policies list for tracker
  const filteredTrackedPolicies = trackedPolicies.filter(p => {
    const matchesFilter = trackerFilter === 'All' || p.status === trackerFilter;
    const matchesSearch =
      p.policyCode.toLowerCase().includes(trackerSearch.toLowerCase()) ||
      p.policyName.toLowerCase().includes(trackerSearch.toLowerCase()) ||
      p.dpoName.toLowerCase().includes(trackerSearch.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const countApproved = trackedPolicies.filter(p => p.status === 'Approved').length;
  const countInReview = trackedPolicies.filter(p => p.status === 'In Review').length;
  const countOpen = trackedPolicies.filter(p => p.status === 'Open').length;

  return (
    <div className="space-y-6 pb-16">

      {/* Header Banner with Top Level View Mode Switcher */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/80 flex items-center justify-center text-blue-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Policies & Compliance Engine</h1>
              <p className="text-xs text-slate-500 mt-0.5">Generate compliance policies and track active approval statuses across your organization.</p>
            </div>
          </div>
        </div>

        {/* Top Primary View Switcher: Create New Policy vs Policy Tracker */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
          <button
            onClick={() => {
              setActiveTab('create');
              if (currentStep === 4) setCurrentStep(1);
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${activeTab === 'create'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Create New Policy</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('tracker');
              setCurrentStep(4);
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${activeTab === 'tracker'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
          >
            <FileText className="w-4 h-4" />
            <span>Policy Tracker</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold font-mono ${activeTab === 'tracker' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
              {trackedPolicies.length}
            </span>
          </button>
        </div>
      </div>

      {/* Sub Stepper Progress Bar (Only visible during policy creation) */}
      {activeTab === 'create' && (
        <div className="bg-white border border-slate-200/80 rounded-xl p-3 shadow-xs flex items-center justify-between">
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <span>Policy Creation Wizard</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentStep(1)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${currentStep === 1
                ? 'bg-blue-600 text-white shadow-2xs'
                : currentStep > 1
                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
                }`}
            >
              {currentStep > 1 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <span>1.</span>}
              <span>Select Policy</span>
            </button>

            <span className="text-slate-300 text-xs">→</span>

            <button
              onClick={() => setCurrentStep(2)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${currentStep === 2
                ? 'bg-blue-600 text-white shadow-2xs'
                : currentStep > 2
                  ? 'bg-emerald-50 text-emerald-700 font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
                }`}
            >
              {currentStep > 2 ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <span>2.</span>}
              <span>Input Details</span>
            </button>

            <span className="text-slate-300 text-xs">→</span>

            <button
              onClick={() => setCurrentStep(3)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${currentStep === 3
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-slate-500 hover:text-slate-800'
                }`}
            >
              <span>3.</span>
              <span>Review Document</span>
            </button>
          </div>
        </div>
      )}

      {/* ==========================================================================
         STEP 1: SELECT POLICY STANDARD
         ========================================================================== */}
      {activeTab === 'create' && currentStep === 1 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Step 1: Select Policy Standard</h2>
              <p className="text-xs text-slate-500">Choose a framework standard below to proceed with document generation.</p>
            </div>
            <span className="text-xs font-medium text-slate-500">5 Standards</span>
          </div>

          {/* Compact 5-Column Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {POLICIES.map(p => {
              const isSelected = p.id === selectedPolicyId;
              return (
                <div
                  key={p.id}
                  onClick={() => handlePolicyChange(p.id)}
                  className={`cursor-pointer rounded-xl border p-3.5 transition-all duration-200 flex flex-col justify-between ${isSelected
                    ? 'border-blue-600 bg-white shadow-md ring-2 ring-blue-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                    }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {p.code}
                      </span>
                      {isSelected && (
                        <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      )}
                    </div>

                    <h3 className="text-xs font-bold text-slate-900 leading-snug line-clamp-1">{p.name}</h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">{p.description}</p>

                    <div className="pt-1">
                      <span className="text-[10px] font-semibold text-slate-400 block line-clamp-1">{p.badge}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400">{p.templates.length} Templates</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePolicyChange(p.id);
                        setCurrentStep(2);
                      }}
                      className={`px-3 py-1 rounded-md text-xs font-bold transition-all flex items-center gap-1 ${isSelected
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-2xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                    >
                      <span>Next</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Prominent Next Button Bar */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-200">
            <div className="text-xs text-slate-500 font-medium">
              Selected Standard: <strong className="text-slate-900">{selectedPolicy.name} ({selectedPolicy.code})</strong>
            </div>
            <button
              onClick={() => setCurrentStep(2)}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ==========================================================================
         STEP 2: INPUT PARAMETERS & TEMPLATE SELECTOR
         ========================================================================== */}
      {activeTab === 'create' && currentStep === 2 && (
        <div className="space-y-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <button
                onClick={() => setCurrentStep(1)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Policy Selector
              </button>
              <h2 className="text-base font-bold text-slate-900">Step 2: Policy Details & Template Selection</h2>
              <p className="text-xs text-slate-500">Configure parameters for <strong>{selectedPolicy.name}</strong> ({selectedPolicy.badge}).</p>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
              {selectedPolicy.code}
            </span>
          </div>

          {/* Template Selector */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-blue-600" />
              <span>Select Document Template</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {selectedPolicy.templates.map(t => (
                <div
                  key={t.id}
                  onClick={() => setSelectedTemplateId(t.id)}
                  className={`cursor-pointer p-4 rounded-xl border text-left transition-all ${t.id === selectedTemplateId
                    ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-semibold shadow-xs ring-2 ring-blue-500/10'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold">{t.name}</span>
                    {t.id === selectedTemplateId && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                  </div>
                  <p className="text-[11px] text-slate-500 font-normal">Pre-configured clause structure and control mappings.</p>
                </div>
              ))}
            </div>
          </div>

          {/* Policy Inputs Form Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-5">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-3">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Organization & System Parameters</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  Organization Legal Name
                </label>
                <input
                  type="text"
                  value={formState.organizationName}
                  onChange={e => handleInputChange('organizationName', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="e.g. Acme Corporation"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-slate-400" />
                    Compliance Officer / DPO
                  </label>
                  <input
                    type="text"
                    value={formState.dpoName}
                    onChange={e => handleInputChange('dpoName', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g. Jane Doe"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={formState.dpoEmail}
                    onChange={e => handleInputChange('dpoEmail', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g. jane.doe@acme.com"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-slate-400" />
                  Scope of Application & Systems
                </label>
                <input
                  type="text"
                  value={formState.systemScope}
                  onChange={e => handleInputChange('systemScope', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="e.g. Enterprise Machine Learning Systems & Cloud Infrastructure"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  Data Classification / Risk Level
                </label>
                <input
                  type="text"
                  value={formState.dataClassification}
                  onChange={e => handleInputChange('dataClassification', e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="e.g. Confidential & Personal Data"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    Effective Date
                  </label>
                  <input
                    type="date"
                    value={formState.effectiveDate}
                    onChange={e => handleInputChange('effectiveDate', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    Version Tag
                  </label>
                  <input
                    type="text"
                    value={formState.versionNumber}
                    onChange={e => handleInputChange('versionNumber', e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g. v1.0"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200">
            <button
              onClick={() => setCurrentStep(1)}
              className="flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back: Select Policy</span>
            </button>

            <button
              onClick={() => setCurrentStep(3)}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-all"
            >
              <span>Next: Document Review</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ==========================================================================
         STEP 3: DOCUMENT LIVE PREVIEW & REVIEW
         ========================================================================== */}
      {activeTab === 'create' && currentStep === 3 && (
        <div className="space-y-6 max-w-4xl mx-auto">

          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <button
              onClick={() => setCurrentStep(2)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Edit Inputs
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setSelectedPolicyId('iso42001');
                  setCurrentStep(1);
                }}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 px-3 py-1.5 rounded-lg"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Start New Policy
              </button>

              <button
                onClick={handleSaveAndTrack}
                className="flex items-center gap-2 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-md"
              >
                {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
                <span>{saved ? 'Saved to Tracker!' : 'Save & Add to Policy Tracker →'}</span>
              </button>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className="bg-white border border-slate-200/80 rounded-xl p-4 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
              <FileText className="w-4 h-4 text-blue-600" />
              <span>Official Document Review</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                {selectedPolicy.code} — {selectedTemplate.name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-all"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>

              <button
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download (.md)</span>
              </button>

              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium transition-all"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / PDF</span>
              </button>
            </div>
          </div>

          {/* Formatted Paper View */}
          <div className="bg-white border border-slate-200 rounded-2xl p-10 shadow-md font-sans space-y-6 text-slate-800 text-sm leading-relaxed">

            {/* Paper Header */}
            <div className="border-b-2 border-slate-900 pb-6 flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">{selectedPolicy.badge}</span>
                <h1 className="text-2xl font-extrabold text-slate-900 mt-1">{selectedPolicy.name}</h1>
                <p className="text-xs font-semibold text-slate-600 mt-1">{selectedTemplate.name}</p>
              </div>
              <div className="text-right text-xs text-slate-500 font-mono space-y-0.5">
                <p><span className="font-semibold text-slate-700">DOC ID:</span> POL-{selectedPolicy.code.replace(/\s+/g, '')}</p>
                <p><span className="font-semibold text-slate-700">DATE:</span> {formState.effectiveDate}</p>
                <p><span className="font-semibold text-slate-700">VER:</span> {formState.versionNumber}</p>
              </div>
            </div>

            {/* Meta Table */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 font-bold uppercase text-[10px]">Organization Legal Entity:</span>
                <p className="font-bold text-slate-900 mt-0.5">{formState.organizationName}</p>
              </div>
              <div>
                <span className="text-slate-400 font-bold uppercase text-[10px]">Compliance Lead / DPO:</span>
                <p className="font-bold text-slate-900 mt-0.5">{formState.dpoName} ({formState.dpoEmail})</p>
              </div>
              <div>
                <span className="text-slate-400 font-bold uppercase text-[10px]">Target Scope:</span>
                <p className="font-semibold text-slate-800 mt-0.5">{formState.systemScope}</p>
              </div>
              <div>
                <span className="text-slate-400 font-bold uppercase text-[10px]">Data Classification:</span>
                <p className="font-semibold text-slate-800 mt-0.5">{formState.dataClassification}</p>
              </div>
            </div>

            {/* Section 1 */}
            <div className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-1">1. Purpose & Executive Scope</h2>
              <p className="text-xs text-slate-700 leading-relaxed">
                This document establishes the mandatory operational policy and control framework for compliance with <strong>{selectedPolicy.name}</strong> across <strong>{formState.organizationName}</strong>. This policy applies to all systems, machine learning models, personnel, and data workflows encompassed within <em>{formState.systemScope}</em>.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-1">2. Regulatory Framework Alignment</h2>
              <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-5">
                <li><strong>Compliance Standard:</strong> {selectedPolicy.name} ({selectedPolicy.badge})</li>
                <li><strong>Functional Focus:</strong> {selectedPolicy.category}</li>
                <li><strong>Document Structure:</strong> {selectedTemplate.name}</li>
              </ul>
            </div>

            {/* Section 3: Clauses */}
            <div className="space-y-3">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-1">3. Enforced Clauses & Control Requirements</h2>
              <div className="space-y-3">
                {selectedPolicy.clauses.map((clause, idx) => (
                  <div key={idx} className="bg-slate-50/60 border border-slate-200/80 rounded-xl p-3.5 text-xs space-y-1">
                    <p className="font-bold text-slate-900">3.{idx + 1} {clause}</p>
                    <p className="text-slate-600 leading-relaxed">
                      {formState.organizationName} implements automated verification, security logging, and policy enforcement to maintain continuous compliance with this clause. Quarterly audits will be executed under the supervision of {formState.dpoName}.
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 4: Governance */}
            <div className="space-y-2">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-1">4. Governance & Escalation Protocols</h2>
              <p className="text-xs text-slate-700 leading-relaxed">
                Non-compliance with this policy may result in immediate suspension of affected system interfaces or data pipelines. Any identified breach or anomaly must be escalated immediately to <strong>{formState.dpoName}</strong> at <strong>{formState.dpoEmail}</strong>.
              </p>
            </div>

            {/* Signature Block */}
            <div className="pt-8 border-t border-slate-200 flex items-end justify-between text-xs">
              <div className="space-y-1">
                <p className="text-slate-400 font-bold uppercase text-[10px]">Authorized Officer Signature:</p>
                <div className="font-serif italic text-xl text-slate-900">{formState.dpoName}</div>
                <p className="text-slate-600 font-semibold">{formState.dpoName}, Compliance Officer</p>
                <p className="text-slate-500">{formState.organizationName}</p>
              </div>
            </div>

          </div>

          <div className="flex justify-end pt-4 border-t border-slate-200">
            <button
              onClick={handleSaveAndTrack}
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition-all"
            >
              <span>Save & View Policy Tracker</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ==========================================================================
         POLICY TRACKER DASHBOARD (Applied Policies with Statuses)
         ========================================================================== */}
      {(activeTab === 'tracker' || currentStep === 4) && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Step 4: Applied Policy Tracker</h2>
              <p className="text-xs text-slate-500">Track, filter, and manage the approval lifecycle of your organization's compliance policies.</p>
            </div>
            <button
              onClick={() => {
                setSelectedPolicyId('iso42001');
                setCurrentStep(1);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Create New Policy</span>
            </button>
          </div>

          {/* Status KPI Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Tracked Policies</p>
                <p className="text-2xl font-extrabold font-mono text-slate-900 mt-1">{trackedPolicies.length}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
                <FileText className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white border border-emerald-200 rounded-xl p-4 shadow-xs flex items-center justify-between bg-emerald-50/20">
              <div>
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Approved Policies</p>
                <p className="text-2xl font-extrabold font-mono text-emerald-700 mt-1">{countApproved}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white border border-amber-200 rounded-xl p-4 shadow-xs flex items-center justify-between bg-amber-50/20">
              <div>
                <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">In Review</p>
                <p className="text-2xl font-extrabold font-mono text-amber-700 mt-1">{countInReview}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700">
                <Clock className="w-5 h-5" />
              </div>
            </div>

            <div className="bg-white border border-blue-200 rounded-xl p-4 shadow-xs flex items-center justify-between bg-blue-50/20">
              <div>
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Open Policies</p>
                <p className="text-2xl font-extrabold font-mono text-blue-700 mt-1">{countOpen}</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">
                <AlertCircle className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg w-full sm:w-auto">
              {(['All', 'Approved', 'In Review', 'Open'] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setTrackerFilter(tab)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${trackerFilter === tab
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                    }`}
                >
                  {tab} ({tab === 'All' ? trackedPolicies.length : trackedPolicies.filter(p => p.status === tab).length})
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={trackerSearch}
                onChange={e => setTrackerSearch(e.target.value)}
                placeholder="Search code, policy or officer..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>

          {/* Policy Tracker Data Table */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-3.5 px-4">Standard & Policy Name</th>
                    <th className="py-3.5 px-4">Template Structure</th>
                    <th className="py-3.5 px-4">Compliance Lead</th>
                    <th className="py-3.5 px-4">Version</th>
                    <th className="py-3.5 px-4">Effective Date</th>
                    <th className="py-3.5 px-4">Approval Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredTrackedPolicies.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400 text-xs">
                        No policies match the selected filter.
                      </td>
                    </tr>
                  ) : (
                    filteredTrackedPolicies.map(item => (
                      <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 px-2 py-0.5 rounded bg-slate-100 text-[10px]">
                              {item.policyCode}
                            </span>
                            <span className="font-semibold text-slate-800 line-clamp-1">{item.policyName}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-600 font-medium">{item.templateName}</td>
                        <td className="py-3.5 px-4">
                          <p className="font-semibold text-slate-800">{item.dpoName}</p>
                          <p className="text-[10px] text-slate-400">{item.dpoEmail}</p>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-semibold text-slate-700">{item.versionNumber}</td>
                        <td className="py-3.5 px-4 font-mono text-slate-600">{item.effectiveDate}</td>

                        {/* Interactive Status Selector */}
                        <td className="py-3.5 px-4">
                          <select
                            value={item.status}
                            onChange={e => handleStatusChange(item.id, e.target.value as PolicyStatus)}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold border focus:outline-none cursor-pointer ${item.status === 'Approved'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                              : item.status === 'In Review'
                                ? 'bg-amber-50 text-amber-700 border-amber-300'
                                : 'bg-blue-50 text-blue-700 border-blue-300'
                              }`}
                          >
                            <option value="Approved">● Approved</option>
                            <option value="In Review">● In Review</option>
                            <option value="Open">● Open</option>
                          </select>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => {
                                const pol = POLICIES.find(p => p.code === item.policyCode) || POLICIES[0];
                                setSelectedPolicyId(pol.id);
                                setCurrentStep(3); // View Review Preview
                              }}
                              className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
                              title="View Policy Document Preview"
                            >
                              <Eye className="w-4 h-4" />
                            </button>

                            <button
                              onClick={() => handleDeletePolicy(item.id)}
                              className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Policy Entry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default PoliciesPage;
