import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  ShieldCheck, AlertTriangle, ChevronDown, ChevronRight, 
  BookOpen, Lock, Link as LinkIcon, FileText
} from 'lucide-react';
import type { EnterpriseResponse } from '../types/api';

interface Props {
  response: EnterpriseResponse;
}

export const EnterpriseResponseCard: React.FC<Props> = ({ response }) => {
  const [controlsExpanded, setControlsExpanded] = useState(true);
  const [evidenceExpanded, setEvidenceExpanded] = useState(false);

  const isVerified = !response.validation.hallucination_detected;
  
  // Calculate average confidence as percentage
  const confScore = Math.round(response.confidence.overall * 100);

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden text-sm mb-4">


      {/* Main Content (Markdown) */}
      <div className="px-5 py-5 text-gray-800 prose prose-sm max-w-none prose-a:text-blue-600">
        <ReactMarkdown>{response.overview}</ReactMarkdown>
      </div>



      {/* Evidence Section */}
      {response.required_evidence && response.required_evidence.length > 0 && (
        <div className="border-t border-gray-100">
          <button 
            onClick={() => setEvidenceExpanded(!evidenceExpanded)}
            className="w-full flex items-center justify-between px-5 py-3 bg-gray-50/50 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <FileText className="w-4 h-4 text-gray-500" />
              <span className="font-semibold text-gray-800">Required Evidence ({response.required_evidence.length})</span>
            </div>
            {evidenceExpanded ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
          </button>
          
          {evidenceExpanded && (
            <div className="px-5 py-4 bg-white">
              <ul className="space-y-2">
                {response.required_evidence.map((ev, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-gray-700 bg-white border border-gray-100 p-2 rounded-md shadow-sm">
                    <ShieldCheck className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <div>
                      <span className="font-medium">{ev.title}</span>
                      <p className="text-xs text-gray-500">{ev.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Citations Footer */}
      {response.references && response.references.length > 0 && (
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 text-xs text-gray-500 flex items-center space-x-2">
          <BookOpen className="w-3 h-3" />
          <span>Sources:</span>
          <div className="flex flex-wrap gap-2">
            {response.references.map((ref, idx) => (
              <a 
                key={idx} 
                href={ref.source_id.startsWith('http') ? ref.source_id : '#'} 
                className="flex items-center space-x-1 text-blue-600 hover:underline"
              >
                <LinkIcon className="w-3 h-3" />
                <span>{ref.text}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
