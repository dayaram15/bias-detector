import { Card } from "@/components/ui/card";
import useJobStore from "@/store/useJobStore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";


export default function BiasSuggestionsList() {
  const {
    result,
    ignoredSuggestions,
    ignoreSuggestion,
    acceptSuggestion,
  } = useJobStore();
console.log("Store result:", result);
console.log("Keywords:", result?.keywords);
  const suggestions = result?.keywords || [];

  const filtered = suggestions.filter(
    (item) => !ignoredSuggestions.includes(item.word)
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Detected Bias Terms & Suggestions</h3>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">No bias terms found.</p>
      ) : (
        filtered.map((item, idx) => (
          <Card key={idx} className="p-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <Badge variant="outline" className="capitalize">
                    {item.category}
                  </Badge>
                  <span className="font-medium text-destructive">"{item.word}"</span>
                  <Badge className="bg-destructive text-white text-xs">
                    {item.severity || "medium"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {item.message}
                </p>
                <p className="text-sm mt-1">
                  Suggestion:{" "}
                  <span className="text-foreground font-medium">
                    {item.suggestion}
                  </span>
                </p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  size="sm"
                  onClick={() => acceptSuggestion(item.word, item.suggestion)}
                >
                  Accept
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => acceptSuggestion(item.word, item.suggestion)}
                >
                  Change
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => ignoreSuggestion(item.word)}
                >
                  Ignore
                </Button>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
