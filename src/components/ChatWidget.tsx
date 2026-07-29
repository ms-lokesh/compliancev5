import React, { useState, useEffect } from "react";
import { ChatArea } from "./ChatArea";
import { HomePage } from "./HomePage";
import { useChatStore } from "../store/chatStore";
import type { ChatMessage } from "../store/chatStore";
import { useOnboardingStore } from "../store/onboardingStore";
import { MessageCircle } from "lucide-react"; 

export const ChatWidget: React.FC = () => {
  // Global State
  const { messages, isLoading, sessionId, addMessage, setLoading, startNewSession, fetchHistory } = useChatStore();
  const { 
    userId, goal, organization,
    isOnboardingComplete, onboardingStep 
  } = useOnboardingStore();
  // Widget Toggle State
  const [isOpen, setIsOpen] = useState(false);
  const [currentView, setCurrentView] = useState<"home" | "chat">("home");

  // Load history when opening widget
  useEffect(() => {
    if (isOpen && userId) {
      fetchHistory(userId);
    }
  }, [isOpen, userId, fetchHistory]);

  // Switch to chat view if messages load for an existing session
  useEffect(() => {
    if (messages.length > 0) {
      setCurrentView("chat");
    }
  }, [messages.length]);

  const handleNewChat = (prompt?: string) => {
    startNewSession();
    if (prompt) {
      useOnboardingStore.getState().setIsOnboardingComplete(true);
    } else {
      useOnboardingStore.getState().reset();
    }
    setCurrentView("chat");
    if (prompt) {
      handleSendMessage(prompt);
    }
  };

  const handleBackToHome = () => {
    setCurrentView("home");
    startNewSession(); // Reset so if they click New Chat again it's fresh
    useOnboardingStore.getState().reset();
  };

  const handleSendMessage = async (text: string) => {
    const userMsg: ChatMessage = { 
      id: crypto.randomUUID(), 
      role: "user", 
      content: text,
      timestamp: Date.now()
    };
    
    addMessage(userMsg);

    // Send message directly to backend without onboarding interception
    triggerBackendCall(text);
  };

  const triggerBackendAnalysis = async () => {
    setLoading(true);
    const msgId = crypto.randomUUID();
    addMessage({ id: msgId, role: "assistant", content: "", timestamp: Date.now() });
    const { goal, organization } = useOnboardingStore.getState();
    try {
      const response = await fetch("http://localhost:8000/api/v1/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          user_id: userId,
          message: "Analyze my project based on the onboarding data.",
          context: { framework: goal.goal, company_size: "Enterprise", industry: organization.industry }
        }),
      });
      if (!response.ok) throw new Error("API call failed");
      
      const data = await response.json();
      let currentText = "";
      if (data.executive_summary) currentText += "### Executive Summary\n" + data.executive_summary + "\n\n";
      if (data.overview) currentText += data.overview + "\n\n";
      if (data.framework) currentText += "**Framework**: " + data.framework + "\n\n";
      if (!currentText) currentText = "Processing complete.";

      useChatStore.getState().updateMessage(msgId, { 
        content: currentText,
        response: data,
        options: data.suggested_questions ? data.suggested_questions.map((q: string) => ({ id: crypto.randomUUID(), label: q })) : undefined
      });
      if (data.tokens_used) {
        useChatStore.getState().addTokensUsed(data.tokens_used);
      }
      useChatStore.getState().fetchHistory(userId);
    } catch (e) {
      useChatStore.getState().updateMessage(msgId, { content: "### Error\nFailed to receive a response." });
    } finally {
      setLoading(false);
    }
  };

  const triggerBackendCall = async (text: string) => {
    setLoading(true);
    const msgId = crypto.randomUUID();
    addMessage({ id: msgId, role: "assistant", content: "", timestamp: Date.now() });
    try {
      const response = await fetch("http://localhost:8000/api/v1/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          session_id: sessionId,
          user_id: userId,
          message: text,
          context: { framework: goal.goal, company_size: "Enterprise", industry: organization.industry }
        }),
      });

      if (!response.ok) throw new Error("API call failed");
      
      const data = await response.json();
      let currentText = "";
      if (data.executive_summary) currentText += "### Executive Summary\n" + data.executive_summary + "\n\n";
      if (data.overview) currentText += data.overview + "\n\n";
      if (data.framework) currentText += "**Framework**: " + data.framework + "\n\n";
      if (!currentText) currentText = "Processing complete.";

      useChatStore.getState().updateMessage(msgId, { 
        content: currentText,
        response: data,
        options: data.suggested_questions ? data.suggested_questions.map((q: string) => ({ id: crypto.randomUUID(), label: q })) : undefined
      });
      if (data.tokens_used) {
        useChatStore.getState().addTokensUsed(data.tokens_used);
      }
      useChatStore.getState().fetchHistory(userId);
    } catch (e) {
      useChatStore.getState().updateMessage(msgId, { content: "### Error\nFailed to receive a response from the backend." });
    } finally {
      setLoading(false);
    }
  };

  // Auto-welcome message removed to preserve ChatArea's rich empty state UI

  return (
    <>
      {/* Floating Widget Button - Temporarily Hidden */}
      {false && !isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 bg-[#0055b3] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform z-50 group"
        >
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#0055b3] opacity-75 animate-ping"></span>
          <MessageCircle className="h-6 w-6 relative z-10" />
        </button>
      )}

      {/* Chat Widget Container */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[500px] h-[750px] max-h-[85vh] bg-white rounded-2xl shadow-[0_12px_40px_-10px_rgba(0,0,0,0.3)] overflow-hidden z-[9999] border border-gray-100 flex flex-col animate-in slide-in-from-bottom-8 fade-in duration-300">
          {currentView === "home" ? (
            <HomePage onNewChat={handleNewChat} onClose={() => setIsOpen(false)} />
          ) : (
            <ChatArea 
              messages={messages} 
              onSendMessage={handleSendMessage} 
              isLoading={isLoading} 
              onClose={() => setIsOpen(false)}
              onBack={handleBackToHome}
            />
          )}
        </div>
      )}
    </>
  );
};
