import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useJobStore from "@/store/useJobStore";
import axios from "@/lib/axios";
import { useState, useRef, useEffect } from "react";
import { getHighlightedHTML } from "@/lib/highlightUtil";
import { useDebounce } from "use-debounce";

export default function InputBlock() {
  const {
    jobText,
    setJobText,
    result,
    setResult,
    setLoading,
    isLoading,
    ignoredSuggestions,
    acceptedSuggestions,
    liveMode,
  } = useJobStore();

  const [charCount, setCharCount] = useState(jobText.length || 0);
  const [debouncedText] = useDebounce(jobText, 1000);
  const editableRef = useRef(null);
  const isTypingRef = useRef(false);

  const analyzeText = async (textToAnalyze) => {
    try {
      setLoading(true);
      const res = await axios.post("/analyze", { text: textToAnalyze });

      const { bias, score, suggestions } = res.data;

      const normalized = {
        score,
        result: bias ? "Biased" : "Not Biased",
        keywords: suggestions.map((s) => ({
          word: s.original,
          category: s.category,
          severity: s.severity,
          suggestion: s.suggestion,
          message: `${s.original} may reflect ${s.category.toLowerCase()} bias.`,
        })),
        breakdown: {
          gender: 65,
          age: 70,
          culture: 50,
          accessibility: 75,
        },
      };

      setResult(normalized);
    } catch (error) {
      console.error("Error analyzing:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = () => analyzeText(jobText);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      setJobText(text);
      setCharCount(text.length);
    };

    if (file.type === "text/plain") {
      reader.readAsText(file);
    } else {
      alert("Only .txt files supported.");
    }
  };

  useEffect(() => {
    setCharCount(jobText.length);
  }, [jobText]);

  // Live analyze mode
  useEffect(() => {
    if (liveMode && debouncedText.length > 10) {
      analyzeText(debouncedText);
    }
  }, [debouncedText, liveMode]);

  // Highlight only when not typing
  useEffect(() => {
    const el = editableRef.current;
    if (!el || isTypingRef.current) return;

    const scrollY = window.scrollY;

    const cursorToEnd = () => {
      el.focus();
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    };

    el.innerHTML = getHighlightedHTML(
      jobText,
      result?.keywords || [],
      ignoredSuggestions,
      acceptedSuggestions
    );

    cursorToEnd();
    window.scrollTo(0, scrollY);
  }, [result, ignoredSuggestions, acceptedSuggestions]);

  return (
    <div className="border bg-card rounded-xl p-4 space-y-4">
      <Label className="text-lg font-medium flex items-center gap-2">
        📝 Job Description Input
      </Label>

      <div
        ref={editableRef}
        contentEditable
        suppressContentEditableWarning
        className="whitespace-pre-wrap rounded-md border border-input bg-background p-3 text-sm font-mono focus:outline-none focus:ring-2 ring-ring min-h-[180px] max-h-[500px] overflow-y-auto"
        onInput={(e) => {
          isTypingRef.current = true;
          const text = e.currentTarget.innerText;
          setJobText(text);
          setCharCount(text.length);
          setTimeout(() => {
            isTypingRef.current = false;
          }, 300);
        }}
      />

      <div className="text-sm text-muted-foreground">{charCount} characters</div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Input
            type="file"
            accept=".txt"
            onChange={handleFile}
            className="w-auto cursor-pointer"
          />
          <span className="text-xs text-muted-foreground">
            Supported formats: TXT only (Max 10MB)
          </span>
        </div>
        <Button onClick={handleAnalyze} disabled={isLoading}>
          {isLoading ? "Analyzing..." : "Analyze"}
        </Button>
      </div>
    </div>
  );
}
