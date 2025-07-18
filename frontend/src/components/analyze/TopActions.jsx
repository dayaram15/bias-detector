// src/components/analyze/TopActions.jsx
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function TopActions() {
  return (
    <div className="flex flex-wrap justify-end items-center gap-4">
      <div className="flex items-center space-x-2">
        <Switch id="inclusive-mode" />
        <label htmlFor="inclusive-mode">Inclusive Mode</label>
      </div>
      <Button variant="outline">Inclusive Rewriter</Button>
      <Button variant="ghost">⟲</Button>
    </div>
  );
}
