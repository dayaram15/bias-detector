// src/pages/AnalyzeJob.jsx
import TopActions from "@/components/analyze/TopActions";
import InputBlock from "@/components/analyze/InputBlock";
import DiversityScoreCard from "@/components/analyze/DiversityScoreCard";
import AnalysisSummaryCard from "@/components/analyze/AnalysisSummaryCard";
import QuickActionsCard from "@/components/analyze/QuickActionsCard";
import BiasSuggestionList from "@/components/analyze/BiasSuggestionList";
import LiveWidget from "@/components/analyze/LiveWidget";

export default function AnalyzeJob() {
  return (
    <div className="space-y-6">
      <TopActions />
      <InputBlock />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DiversityScoreCard />
        <AnalysisSummaryCard />
        <QuickActionsCard />
      </div>

      <BiasSuggestionList />
      {/* <LiveWidget /> */}
    </div>
  );
}
