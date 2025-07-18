export function saveCaretPosition(el) {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;

  const range = selection.getRangeAt(0);
  const preSelectionRange = range.cloneRange();
  preSelectionRange.selectNodeContents(el);
  preSelectionRange.setEnd(range.startContainer, range.startOffset);
  const start = preSelectionRange.toString().length;

  return start;
}

export function restoreCaretPosition(el, pos) {
  const setSelection = (node, remaining) => {
    if (!node) return;
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.length >= remaining) {
        const range = document.createRange();
        const sel = window.getSelection();
        range.setStart(node, remaining);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
        return true;
      } else {
        remaining -= node.length;
      }
    } else {
      for (let child of node.childNodes) {
        const found = setSelection(child, remaining);
        if (found) return true;
      }
    }
    return false;
  };

  setSelection(el, pos);
}
