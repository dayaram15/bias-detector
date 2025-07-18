// src/components/analyze/TextInputArea.jsx
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import useJobStore from "@/store/useJobStore";

export default function TextInputArea() {
  const { jobText, setJobText } = useJobStore();

  return (
    <div className="space-y-2">
      <Label htmlFor="job-text">Job Description Text</Label>
      <Textarea
        id="job-text"
        value={jobText}
        onChange={(e) => setJobText(e.target.value)}
        placeholder="Type or paste the job description here..."
        className="min-h-[200px]"
      />
    </div>
  );
}
