export function getHighlightedHTML(text, keywords = [], ignored = []) {
  if (!text) return "";

  let highlighted = text;

  keywords.forEach(({ word }) => {
    const safeWord = word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\b(${safeWord})\\b`, "gi");

    highlighted = highlighted.replace(regex, (match) => {
      if (ignored.includes(word)) {
        return `<span class="bg-muted text-muted-foreground px-1 rounded">${match}</span>`;
      } else {
        return `<span class="bg-yellow-300 text-black px-1 rounded">${match}</span>`;
      }
    });
  });

  return highlighted;
}
