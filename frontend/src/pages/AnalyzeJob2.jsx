import useJobStore from "@/store/useJobStore";
import axios from "@/lib/axios";
import { Button } from "@/components/ui/button";
import TextInputArea from "@/components/analyze/TextInputArea";
import FileUploadBox from "@/components/analyze/FileUploadBox";
import SuggestionPanel from "@/components/analyze/SuggestionPanel";
import DiversityScoreMeter from "@/components/analyze/DiversityScoreMeter";

export default function AnalyzeJob() {
  const { jobText, setResult, result, isLoading, setLoading } = useJobStore();

  const handleAnalyze = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/analyze", { text: jobText });
      setResult(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Analyze Job Description</h2>
      <TextInputArea />
      <FileUploadBox />
      <Button onClick={handleAnalyze} disabled={isLoading}>
        {isLoading ? "Analyzing..." : "Analyze"}
      </Button>

      {result && (
        <>
          <SuggestionPanel data={result.suggestions} />
          <DiversityScoreMeter score={result.score} />
        </>
      )}
    </div>
  );
}
