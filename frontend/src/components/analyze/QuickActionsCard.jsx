// src/components/analyze/QuickActions.jsx
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Trash2, FileText } from "lucide-react";
import useJobStore from "@/store/useJobStore";

export default function QuickActions() {
  const { reset } = useJobStore();

  return (
    <Card>
      <CardHeader>
        <h3 className="text-base font-semibold">Quick Actions</h3>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button variant="outline" className="w-full" onClick={reset}>
          <Trash2 className="w-4 h-4 mr-2" />
          Clear Input
        </Button>
        <Button variant="secondary" className="w-full">
          <FileText className="w-4 h-4 mr-2" />
          Export Result
        </Button>
        <Button variant="ghost" className="w-full">
          <Share2 className="w-4 h-4 mr-2" />
          Share Feedback
        </Button>
      </CardContent>
    </Card>
  );
}
