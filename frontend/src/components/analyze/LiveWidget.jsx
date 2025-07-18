// src/components/analyze/LiveAnalysisWidget.jsx
import { useEffect, useState } from "react";
import { User } from "lucide-react";
import { Card } from "@/components/ui/card";
import useJobStore from "@/store/useJobStore";
import { cn } from "@/lib/utils";

export default function LiveAnalysisWidget() {
  const { result } = useJobStore();
  const [score, setScore] = useState(0);
  const [issues, setIssues] = useState(0);

  useEffect(() => {
    if (result) {
      setScore(result.score || 0);
      setIssues(result.keywords?.length || 0);
    }
  }, [result]);

  return (
    <Card className="fixed bottom-6 right-6 w-[220px] p-4 z-50 shadow-xl border border-border bg-background">
      <div className="flex items-center justify-between mb-2 text-muted-foreground text-xs font-semibold">
        <span>Live Analysis</span>
        <span>{issues} issues</span>
      </div>

      <div className="relative flex items-center justify-center h-[80px] w-[80px] mx-auto">
        <svg viewBox="0 0 36 36" className="w-full h-full">
          <path
            className="text-muted stroke-current"
            strokeWidth="3.8"
            fill="none"
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="text-primary stroke-current"
            strokeWidth="3.8"
            strokeDasharray={`${score}, 100`}
            strokeLinecap="round"
            fill="none"
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text
            x="50%"
            y="50%"
            alignmentBaseline="middle"
            textAnchor="middle"
            fontSize="8"
            className="fill-current text-foreground"
          >
            {score}
          </text>
        </svg>
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground mt-2">
        <span>{score}</span>
        <div className="h-[6px] w-1/2 bg-primary/40 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${score}%` }}
          ></div>
        </div>
        <User className="w-4 h-4" />
      </div>
    </Card>
  );
}
