// src/store/useJobStore.js
import { create } from "zustand";

const useJobStore = create((set, get) => ({
  jobText: "",
  setJobText: (text) => set({ jobText: text }),

  result: null,
  setResult: (data) => set({ result: data }),

  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),

  ignoredSuggestions: [],
  acceptedSuggestions: [],

  ignoreSuggestion: (word) =>
    set((state) => ({
      ignoredSuggestions: [...state.ignoredSuggestions, word],
    })),

  acceptSuggestion: (original, suggestion) => {
    const currentText = get().jobText;
    const updated = currentText.replaceAll(
      new RegExp(`\\b${original}\\b`, "gi"),
      suggestion
    );

    set((state) => ({
      jobText: updated,
      ignoredSuggestions: [...state.ignoredSuggestions, original],
      acceptedSuggestions: [...state.acceptedSuggestions, suggestion],
    }));
  },

  liveMode: false,
  setLiveMode: (value) => set({ liveMode: value }),

  reset: () =>
    set({
      jobText: "",
      result: null,
      isLoading: false,
      ignoredSuggestions: [],
      acceptedSuggestions: [],
    }),
}));

export default useJobStore;
