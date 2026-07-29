import React, { useState, useRef, useEffect } from "react";
import { Send, Paperclip, Mic, User, ArrowLeft, MoreVertical, X, Zap, Search } from "lucide-react";
import ReactMarkdown from "react-markdown";
import type { ChatMessage } from "../store/chatStore";
import { EnterpriseResponseCard } from "./EnterpriseResponseCard";
import { useChatStore } from "../store/chatStore";
import { useOnboardingStore } from "../store/onboardingStore";

interface ChatAreaProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
  onClose?: () => void;
  onBack?: () => void;
}

export const ChatArea: React.FC<ChatAreaProps> = ({ messages, onSendMessage, isLoading, onClose, onBack }) => {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { history, sessionId, tokensUsed } = useChatStore();
  const { goal } = useOnboardingStore();
  
  const currentSession = history.find(h => h.id === sessionId);
  const sessionTitle = currentSession?.title || "New Chat";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 flex flex-col h-full bg-white relative">
      {/* Conversation Header */}
      <header className="bg-white border-b border-gray-100 p-3 flex items-center justify-between shrink-0 shadow-sm relative z-10 rounded-t-2xl">
        <div className="flex items-center">
          {onBack && (
            <button onClick={onBack} className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors mr-2">
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-semibold text-gray-800 truncate pr-4">{sessionTitle}</h2>
            <div className="flex items-center text-[11px] text-gray-500">
              <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded mr-2 font-medium">
                {goal?.goal || "SOC2"}
              </span>
              <span>Albertsons AI</span>
              <span className="mx-2 text-gray-300">•</span>
              <div className="flex items-center text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded font-medium" title="Tokens used in this session">
                <Zap className="h-3 w-3 mr-1" />
                {(tokensUsed / 1000).toFixed(1)}k tokens used
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-1 shrink-0">
          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreVertical className="h-5 w-5" />
          </button>
          {onClose && (
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </header>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto w-full pb-32 bg-gray-50">
        <div className="pt-4 px-4 mx-auto space-y-6">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center pt-12 pb-8 px-4 text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Welcome to Albertsons AI</h3>
              
              <div className="w-full max-w-md space-y-3">
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider text-left mb-2">Suggested Questions</p>
                {[
                  "Show me MFA controls for CC6",
                  "Are there any long-lived credentials?",
                  "How do we handle break-glass procedures?",
                  "Show CI/CD pipeline deployment approvals"
                ].map((suggestion, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSendMessage(suggestion)}
                    className="w-full flex items-center p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-400 hover:shadow-sm transition-all text-left text-sm text-gray-700"
                  >
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center mr-3 shrink-0">
                      <Search className="w-4 h-4 text-gray-400" />
                    </div>
                    <span>{suggestion}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {messages.map((m, index) => (
            <div key={m.id} className={`flex w-full ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex max-w-[90%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                
                {/* Avatar */}
                <div className={`flex-shrink-0 pt-1 ${m.role === 'user' ? 'ml-3' : 'mr-3'}`}>
                  {m.role === "user" ? (
                    <div className="h-8 w-8 rounded-full bg-gray-200 border border-gray-300 flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-blue-600 shadow-md border border-blue-700 flex items-center justify-center">
                      <span className="text-white font-bold text-xs tracking-wider">AI</span>
                    </div>
                  )}
                </div>
                
                {/* Bubble Content */}
                <div className={`min-w-0 rounded-2xl px-4 py-3 shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-sm' 
                    : 'bg-white border border-gray-100 text-gray-800 rounded-tl-sm'
                }`}>
                  {m.role === "assistant" || m.role === "system" ? (
                    <div className="space-y-4">
                      <div className={`prose prose-sm max-w-none break-words prose-blue text-gray-800`}>
                        {m.role === 'assistant' && !m.content && !m.response ? (
                          <div className="flex items-center space-x-2 py-1">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                          </div>
                        ) : (
                          <ReactMarkdown>{(m.response && m.response.overview) ? m.response.overview : m.content}</ReactMarkdown>
                        )}
                      </div>
                      
                      {/* Render Options if any */}
                      {m.options && m.options.length > 0 && (
                        <div className="flex flex-col gap-2 mt-4">
                          {m.options.map((opt) => (
                            <button
                              key={opt.id}
                              onClick={() => onSendMessage(opt.label)}
                              className="flex items-center justify-center p-3 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all text-sm font-medium text-gray-700 hover:text-blue-700"
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Render Forms if any */}
                      {m.formType === 'organization' && (
                        <div className="mt-4 p-4 border border-gray-200 rounded-xl bg-gray-50">
                          <form onSubmit={(e) => {
                            e.preventDefault();
                            const fd = new FormData(e.currentTarget);
                            const org = fd.get('org') as string;
                            const ind = fd.get('ind') as string;
                            const reg = fd.get('reg') as string;
                            if(org && ind && reg) {
                              onSendMessage(JSON.stringify({ organization_name: org, industry: ind, region: reg }));
                            }
                          }} className="space-y-3">
                            <input name="org" placeholder="Organization Name" required className="w-full p-2 border rounded text-sm" />
                            <input name="ind" placeholder="Industry" required className="w-full p-2 border rounded text-sm" />
                            <select name="reg" required className="w-full p-2 border rounded text-sm">
                              <option value="">Select Region...</option>
                              <option value="US">United States</option>
                              <option value="EU">Europe</option>
                              <option value="APAC">APAC</option>
                            </select>
                            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded text-sm font-medium">Submit Details</button>
                          </form>
                        </div>
                      )}

                      {m.formType === 'aiProduct' && (
                        <div className="mt-4 p-4 border border-gray-200 rounded-xl bg-gray-50">
                          <form onSubmit={(e) => {
                            e.preventDefault();
                            const fd = new FormData(e.currentTarget);
                            const name = fd.get('name') as string;
                            const desc = fd.get('desc') as string;
                            const usecase = fd.get('usecase') as string;
                            if(name && desc && usecase) {
                              onSendMessage(JSON.stringify({ product_name: name, description: desc, use_case: usecase }));
                            }
                          }} className="space-y-3">
                            <input name="name" placeholder="Product Name" required className="w-full p-2 border rounded text-sm" />
                            <input name="desc" placeholder="Brief Description" required className="w-full p-2 border rounded text-sm" />
                            <select name="usecase" required className="w-full p-2 border rounded text-sm">
                              <option value="">Select Use Case...</option>
                              <option value="Fraud Detection">Fraud Detection</option>
                              <option value="AI Chatbot">AI Chatbot</option>
                              <option value="Recommendation Engine">Recommendation Engine</option>
                              <option value="Computer Vision">Computer Vision</option>
                            </select>
                            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded text-sm font-medium">Save AI Product</button>
                          </form>
                        </div>
                      )}

                      {m.formType === 'deployment' && (
                        <div className="mt-4 p-4 border border-gray-200 rounded-xl bg-gray-50">
                          <form onSubmit={(e) => {
                            e.preventDefault();
                            const fd = new FormData(e.currentTarget);
                            const cloud = fd.get('cloud') as string;
                            const repo = fd.get('repo') as string;
                            const env = fd.get('env') as string;
                            if(cloud && repo && env) {
                              onSendMessage(JSON.stringify({ cloud_provider: cloud, repository: repo, environment: env }));
                            }
                          }} className="space-y-3">
                            <select name="cloud" required className="w-full p-2 border rounded text-sm">
                              <option value="">Cloud Provider...</option>
                              <option value="AWS">AWS</option>
                              <option value="Azure">Azure</option>
                              <option value="GCP">GCP</option>
                              <option value="On-Premise">On-Premise</option>
                            </select>
                            <select name="repo" required className="w-full p-2 border rounded text-sm">
                              <option value="">Repository...</option>
                              <option value="GitHub">GitHub</option>
                              <option value="GitLab">GitLab</option>
                              <option value="Bitbucket">Bitbucket</option>
                              <option value="Azure DevOps">Azure DevOps</option>
                            </select>
                            <select name="env" required className="w-full p-2 border rounded text-sm">
                              <option value="">Environment...</option>
                              <option value="Development">Development</option>
                              <option value="Staging">Staging</option>
                              <option value="Production">Production</option>
                            </select>
                            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded text-sm font-medium">Complete Setup</button>
                          </form>
                        </div>
                      )}

                      {/* Suggested Follow-ups for the last assistant message */}
                      {index === messages.length - 1 && !isLoading && !m.options && m.response?.suggested_questions && m.response.suggested_questions.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <p className="text-xs font-medium text-gray-400 mb-2 flex items-center">
                            <span className="mr-1">✨</span> Suggested follow-ups
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {m.response.suggested_questions.map((sq, i) => (
                              <button key={i} onClick={() => onSendMessage(sq)} className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-600 rounded-full text-xs hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors">
                                {sq}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className={`prose prose-sm max-w-none break-words prose-invert text-white`}>
                      <ReactMarkdown>{
                        (() => {
                          try {
                            const obj = JSON.parse(m.content);
                            if (typeof obj === 'object' && obj !== null) {
                              return Object.entries(obj)
                                .map(([k, v]) => `**${k.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}**: ${v}`)
                                .join(' \\| ');
                            }
                            return m.content;
                          } catch(e) {
                            return m.content;
                          }
                        })()
                      }</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          

          <div ref={messagesEndRef} className="h-2" />
        </div>
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-gray-50 via-gray-50 to-transparent pt-8 pb-4 px-4">
        <form onSubmit={handleSubmit} className="relative flex flex-col bg-white border border-gray-300 rounded-2xl shadow-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            disabled={isLoading}
            placeholder="Message Albertsons AI..."
            className="w-full max-h-32 bg-transparent text-gray-900 py-3 px-4 focus:outline-none resize-none text-sm min-h-[50px] rounded-t-2xl"
            rows={1}
          />
          <div className="flex items-center justify-between px-2 pb-2">
            <div className="flex items-center space-x-1">
              <button type="button" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Attach file">
                <Paperclip className="h-4 w-4" />
              </button>
              <button type="button" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors" title="Voice Input">
                <Mic className="h-4 w-4" />
              </button>
            </div>
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-sm disabled:opacity-50 disabled:hover:bg-blue-600"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </form>
        <div className="text-center mt-2 text-[10px] text-gray-400">
          AI can make mistakes. Verify important information.
        </div>
      </div>
    </div>
  );
};

