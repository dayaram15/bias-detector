import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useJobStore from "@/store/useJobStore";
import axios from "@/lib/axios";
import { useState, useRef, useEffect } from "react";
import { getHighlightedHTML } from "@/lib/highlightUtil"; // Create this file

export default function InputBlock() {
  const {
    jobText,
    setJobText,
    result,
    setResult,
    setLoading,
    isLoading,
    ignoredSuggestions,
  } = useJobStore();

  const [charCount, setCharCount] = useState(jobText.length || 0);
  const editableRef = useRef(null);

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      const res = await axios.post("/analyze", { text: jobText });

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
      alert("Only .txt files supported in this version.");
    }
  };

  useEffect(() => {
    // Keep char count in sync when text updates from external sources
    setCharCount(jobText.length);
  }, [jobText]);

  return (
    <div className="border bg-card rounded-xl p-4 space-y-4">
      <Label
        htmlFor="job-description"
        className="text-lg font-medium flex items-center gap-2"
      >
        📝 Job Description Input
      </Label>

      {/* Editable Div */}
      <div
        ref={editableRef}
        contentEditable
        suppressContentEditableWarning
        onInput={(e) => {
          const text = e.currentTarget.innerText;
          setJobText(text);
          setCharCount(text.length);
        }}
        className="whitespace-pre-wrap rounded-md border border-input bg-background p-3 text-sm font-mono focus:outline-none focus:ring-2 ring-ring min-h-[180px] max-h-[500px] overflow-y-auto"
        dangerouslySetInnerHTML={{
          __html: getHighlightedHTML(
            jobText,
            result?.keywords || [],
            ignoredSuggestions
          ),
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
            Supported formats: PDF, DOCX, TXT (Max 10MB)
          </span>
        </div>
        <Button onClick={handleAnalyze} disabled={isLoading}>
          {isLoading ? "Analyzing..." : "Analyze"}
        </Button>
      </div>
    </div>
  );
}
