import { create } from "zustand";
import type { Resume } from "recruiters-utils";
import { ViewMode, type ViewModeType } from "./types/viewMode";

export interface AppStore {
  resume: Resume | null;
  setResume: (data: Resume) => void;
  viewMode: ViewModeType;
  setViewMode: (mode: ViewModeType) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  resume: null,
  setResume: (data) => set({ resume: data }),
  viewMode: ViewMode.Candidate,
  setViewMode: (mode) => set({ viewMode: mode }),
}));
