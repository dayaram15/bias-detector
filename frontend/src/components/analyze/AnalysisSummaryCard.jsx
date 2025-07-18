import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart } from "lucide-react";
import useJobStore from "@/store/useJobStore";

export default function SummaryCard() {
  const { result } = useJobStore();
   
  const categories = result?.keywords?.map(k => k.category) || [];
  const categoryCount = categories.reduce((acc, cat) => {
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart className="w-5 h-5 text-muted-foreground" /> Analysis Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Issues Found</span>
          <span className="font-bold text-foreground">{categories.length}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">High Severity</span>
          <span className="font-bold text-foreground">{
            result?.keywords?.filter(k => k.severity === "high").length || 0
          }</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {Object.entries(categoryCount).map(([cat, count]) => (
            <span
              key={cat}
              className="bg-muted text-xs px-2 py-1 rounded-full text-muted-foreground"
            >
              {cat} ({count})
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
