// src/lib/highlightUtil.js
export function getHighlightedHTML(text, keywords = [], ignored = [], accepted = []) {
  if (!text) return "";

  let highlighted = text;

  keywords.forEach(({ word }) => {
    const safeWord = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\b(${safeWord})\\b`, "gi");

    highlighted = highlighted.replace(regex, (match) => {
      if (ignored.includes(word)) {
        return `<span class="bg-muted text-muted-foreground px-1 rounded">${match}</span>`;
      } else if (accepted.includes(word)) {
        return `<span class="bg-green-200 text-green-800 px-1 rounded">${match}</span>`;
      } else {
        return `<span class="bg-yellow-200 text-yellow-900 px-1 rounded">${match}</span>`;
      }
    });
  });

  return highlighted;
}
