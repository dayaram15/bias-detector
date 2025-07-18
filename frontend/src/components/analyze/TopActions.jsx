// src/components/analyze/TopActions.jsx
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import useJobStore from "@/store/useJobStore";

export default function TopActions() {
  const { liveMode, setLiveMode } = useJobStore();

  return (
    <div className="flex flex-wrap justify-end items-center gap-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="inclusive-mode"
          checked={liveMode}
          onCheckedChange={setLiveMode}
        />
        <label htmlFor="inclusive-mode">Live Mode</label>
      </div>
      <Button variant="outline">Inclusive Rewriter</Button>
      <Button variant="ghost">⟲</Button>
    </div>
  );
}
