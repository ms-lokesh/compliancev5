import React, { useState } from 'react';
import { useChatStore } from '../store/chatStore';
import { useOnboardingStore } from '../store/onboardingStore';
import { MessageSquare, Clock, Plus, Zap, Search, ChevronRight, X, Trash2 } from 'lucide-react';

interface HomePageProps {
  onNewChat: (prompt?: string) => void;
  onClose?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNewChat, onClose }) => {
  const { history, loadSession, deleteSession } = useChatStore();
  const [searchQuery, setSearchQuery] = useState("");
  
  const recentChats = history.filter(h => h.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5);
  const lastChat = history.length > 0 ? history[0] : null;

  return (
    <div className="flex-1 flex flex-col h-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#0055b3] to-[#0077e6] text-white p-5 flex flex-col shadow-sm relative shrink-0 rounded-t-2xl pb-6">
        <div className="flex justify-between items-start mb-4 relative z-10">
          <div></div>
          {onClose && (
            <button onClick={onClose} className="text-blue-100 hover:text-white transition-colors cursor-pointer">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="relative z-10">
          <h1 className="text-2xl font-bold tracking-tight mb-1">
            Hi there, John 👋
          </h1>
          <p className="text-blue-100 font-medium text-sm">
            How can we help?
          </p>
        </div>
        {/* Subtle decorative elements for premium feel */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-900/10 rounded-full translate-y-12 -translate-x-8 blur-xl"></div>
      </header>

      <div className="px-4 -mt-4 relative z-20 pb-4">
        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 mb-4 flex items-center">
          <Search className="h-4 w-4 text-gray-400 ml-2 mr-2 shrink-0" />
          <input 
            type="text" 
            placeholder="Search conversations..." 
            className="w-full text-sm outline-none text-gray-700 bg-transparent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Start New Chat (Floating/Primary Action) */}
        <button 
          onClick={() => onNewChat()}
          className="w-full bg-white border border-gray-100 p-3 rounded-xl shadow-sm hover:shadow-md transition-all group flex items-center justify-between mb-5"
        >
          <div className="flex items-center">
            <div className="h-10 w-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
              <Plus className="h-5 w-5" />
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-gray-800 text-sm">Start New Chat</h3>
              <p className="text-xs text-gray-500">Ask any compliance question</p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-blue-500" />
        </button>

        {/* Continue Last Chat */}
        {!searchQuery && lastChat && (
          <div className="mb-5">
            <h3 className="text-xs font-semibold text-gray-400 mb-2 px-1 uppercase tracking-wider">Continue</h3>
            <button
              onClick={() => {
                loadSession(lastChat.id);
                useOnboardingStore.getState().setIsOnboardingComplete(true);
              }}
              className="w-full flex items-center text-left p-3 bg-white border border-gray-100 rounded-xl hover:border-blue-200 hover:shadow-sm transition-all group"
            >
              <div className="bg-gray-50 p-2 rounded-lg group-hover:bg-blue-50 transition-colors mr-3 shrink-0">
                <MessageSquare className="h-4 w-4 text-gray-500 group-hover:text-blue-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-800 truncate">{lastChat.title}</p>
                <p className="text-xs text-gray-400 truncate">
                  {new Date(lastChat.updated_at).toLocaleDateString()}
                </p>
              </div>
            </button>
          </div>
        )}



        {/* Recent Conversations List */}
        {recentChats.length > 1 && (
          <div>
            <div className="flex justify-between items-center mb-2 px-1">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {searchQuery ? "Search Results" : "Previous Chats"}
              </h3>
              <span className="text-xs text-gray-400 bg-gray-200 px-1.5 py-0.5 rounded-full">{history.length}</span>
            </div>
            
            <div className="space-y-2">
              {recentChats.slice(searchQuery ? 0 : 1).map(chat => (
                <div key={chat.id} className="relative group">
                  <button
                    onClick={() => {
                      loadSession(chat.id);
                      useOnboardingStore.getState().setIsOnboardingComplete(true);
                    }}
                    className="w-full flex items-center text-left p-2.5 bg-white border border-gray-100 rounded-xl hover:border-blue-200 hover:shadow-sm transition-all"
                  >
                    <div className="min-w-0 flex-1 pl-1 pr-6">
                      <p className="text-sm font-medium text-gray-700 truncate group-hover:text-blue-700">{chat.title}</p>
                      <p className="text-[11px] text-gray-400 truncate">
                        {new Date(chat.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteSession(chat.id);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                    title="Delete Chat"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
