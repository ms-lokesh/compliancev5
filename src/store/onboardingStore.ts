import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface OnboardingState {
  isOnboardingComplete: boolean;
  onboardingStep: number;
  userId: string;
  role: { user_role: string };
  organization: { organization_name: string; industry: string; region: string };
  aiProduct: { product_name: string; description: string; use_case: string };
  deployment: { cloud_provider: string; environment: string; repository: string };
  goal: { goal: string };
  setIsOnboardingComplete: (status: boolean) => void;
  setOnboardingStep: (step: number) => void;
  setRole: (role: any) => void;
  setOrganization: (org: any) => void;
  setAiProduct: (prod: any) => void;
  setDeployment: (dep: any) => void;
  setGoal: (goal: any) => void;
  setUserId: (id: string) => void;
  reset: () => void;
}

const initialState = {
  isOnboardingComplete: false,
  onboardingStep: 1,
  userId: crypto.randomUUID(), // Valid UUID for Postgres
  role: { user_role: '' },
  organization: { organization_name: '', industry: '', region: '' },
  aiProduct: { product_name: '', description: '', use_case: '' },
  deployment: { cloud_provider: '', environment: '', repository: '' },
  goal: { goal: '' }
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      ...initialState,
      setIsOnboardingComplete: (isOnboardingComplete) => set({ isOnboardingComplete }),
      setOnboardingStep: (onboardingStep) => set({ onboardingStep }),
      setRole: (role) => set({ role }),
      setOrganization: (organization) => set({ organization }),
      setAiProduct: (aiProduct) => set({ aiProduct }),
      setDeployment: (deployment) => set({ deployment }),
      setGoal: (goal) => set({ goal }),
      setUserId: (userId) => set({ userId }),
      reset: () => set((state) => ({ ...initialState, userId: state.userId }))
    }),
    {
      name: 'onboarding-storage',
      version: 1, // Bump version to clear old cache
    }
  )
);
