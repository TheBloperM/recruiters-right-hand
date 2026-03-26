import { create } from "zustand";
import type { Resume } from "recruiters-utils";

export interface ResumeStore {
  resume: Resume | null;
  setResume: (data: Resume) => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  resume: null,
  setResume: (data) => set({ resume: data }),
}));
