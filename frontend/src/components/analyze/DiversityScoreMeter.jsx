// src/components/analyze/DiversityScoreMeter.jsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function DiversityScoreMeter({ score }) {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Diversity Score</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="text-3xl font-bold text-primary">{score}/100</div>
        <Progress value={score} className="h-2" />
        <p className="text-sm text-muted-foreground">
          Higher scores indicate a more inclusive and unbiased job description.
        </p>
      </CardContent>
    </Card>
  );
}
