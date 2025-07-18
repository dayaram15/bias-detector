// src/components/analyze/DiversityScoreCard.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleGauge, Dot } from "lucide-react";
import useJobStore from "@/store/useJobStore";
import { cn } from "@/lib/utils";

const metricColors = {
  low: "text-red-500",
  medium: "text-yellow-500",
  high: "text-green-500",
};

const getLevel = (value) => {
  if (value < 40) return "low";
  if (value < 70) return "medium";
  return "high";
};

export default function DiversityScoreCard() {
  const { result } = useJobStore();

  const score = result?.score || 0;
  const breakdown = result?.breakdown || {
    gender: 0,
    age: 0,
    culture: 0,
    accessibility: 0,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CircleGauge className="w-5 h-5 text-muted-foreground" /> Diversity Score
        </CardTitle>
        <p className="text-sm text-muted-foreground">Overall Inclusion Score</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center items-center">
          <div className="relative w-[100px] h-[100px]">
            <svg className="w-full h-full" viewBox="0 0 36 36">
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
        </div>

        <div className="space-y-2 text-sm">
          {Object.entries(breakdown).map(([key, val]) => (
            <div key={key} className="flex justify-between items-center">
              <span className="capitalize text-muted-foreground">
                {key.replace("_", " ")}
              </span>
              <span
                className={cn(
                  "font-medium",
                  metricColors[getLevel(val)] || "text-muted"
                )}
              >
                {val}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
