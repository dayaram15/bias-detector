import { create } from "zustand";

const useJobStore = create((set, get) => ({
  jobText: "",
  setJobText: (text) => set({ jobText: text }),

  result: null, // full object from API
  setResult: (data) => set({ result: data }),

  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),

  ignoredSuggestions: [],
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
  }));
},

  reset: () =>
    set({
      jobText: "",
      result: null,
      isLoading: false,
      ignoredSuggestions: [],
    }),
}));



export default useJobStore