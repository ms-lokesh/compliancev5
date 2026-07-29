import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { EnterpriseResponse } from '../types/api';

export interface ChatOption {
  id: string;
  label: string;
  icon?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string; // The user query or executive summary from assistant
  response?: EnterpriseResponse; // The full structured data from assistant
  options?: ChatOption[];
  formType?: 'organization' | 'aiProduct' | 'deployment';
  timestamp: number;
}

export interface ChatSessionPreview {
  id: string;
  title: string;
  updated_at: string;
  frameworks?: string[];
}

export interface ChatState {
  sessionId: string;
  messages: ChatMessage[];
  history: ChatSessionPreview[];
  isLoading: boolean;
  addMessage: (msg: ChatMessage) => void;
  updateMessage: (id: string, updates: Partial<ChatMessage>) => void;
  setLoading: (loading: boolean) => void;
  startNewSession: () => void;
  fetchHistory: (userId: string) => Promise<void>;
  loadSession: (sessionId: string) => Promise<void>;
  deleteSession: (sessionId: string) => Promise<void>;
  tokensUsed: number;
  addTokensUsed: (amount: number) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      sessionId: crypto.randomUUID(),
      messages: [],
      history: [],
      isLoading: false,
      tokensUsed: 0,
      addTokensUsed: (amount) => set((state) => ({ tokensUsed: state.tokensUsed + amount })),
      addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
      updateMessage: (id, updates) => set((state) => ({
        messages: state.messages.map(m => m.id === id ? { ...m, ...updates } : m)
      })),
      setLoading: (loading) => set({ isLoading: loading }),
      startNewSession: () => set({ sessionId: crypto.randomUUID(), messages: [], isLoading: false }),
      
      fetchHistory: async (userId: string) => {
        try {
          const res = await fetch(`http://localhost:8000/chat/history?user_id=${userId}`);
          if (res.ok) {
            const data = await res.json();
            set({ history: data });
          }
        } catch (e) {
          console.error("Failed to fetch history", e);
        }
      },
      
      loadSession: async (sessionId: string) => {
        set({ isLoading: true });
        try {
          const res = await fetch(`http://localhost:8000/chat/history/${sessionId}`);
          if (res.ok) {
            const data = await res.json();
            // Transform backend messages to frontend ChatMessage format
            const msgs: ChatMessage[] = (data.history || []).map((m: any) => ({
              id: m.id || crypto.randomUUID(),
              role: m.role,
              content: m.content,
              response: m.role === 'assistant' && m.retrieval_snapshot ? JSON.parse(m.retrieval_snapshot) : undefined,
              timestamp: new Date(m.created_at || Date.now()).getTime()
            }));
            set({ sessionId, messages: msgs });
          }
        } catch (e) {
          console.error("Failed to load session", e);
        } finally {
          set({ isLoading: false });
        }
      },
      
      deleteSession: async (sessionId: string) => {
        try {
          await fetch(`http://localhost:8000/chat/${sessionId}`, { method: 'DELETE' });
          const { history, sessionId: currentId } = get();
          set({ history: history.filter(h => h.id !== sessionId) });
          if (currentId === sessionId) {
            get().startNewSession();
          }
        } catch (e) {
          console.error("Failed to delete session", e);
        }
      }
    }),
    {
      name: 'chat-storage',
      version: 3,
    }
  )
);
