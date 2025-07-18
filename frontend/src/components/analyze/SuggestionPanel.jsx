// src/components/analyze/SuggestionPanel.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SuggestionPanel({ data = [] }) {
  if (!data.length) return null;

  return (
    <div className="space-y-4 mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Bias Suggestions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="border rounded-md p-3 space-y-1 bg-muted"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="destructive">Biased</Badge>
                <span className="italic">{item.original}</span>
              </div>
              <div>
                <Badge variant="secondary">Suggestion</Badge> {item.suggestion}
              </div>
              <div className="text-sm text-muted-foreground">
                Category: <Badge>{item.category}</Badge> | Severity:{" "}
                <Badge
                  variant={
                    item.severity === "high"
                      ? "destructive"
                      : item.severity === "medium"
                      ? "secondary"
                      : "default"
                  }
                >
                  {item.severity}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
