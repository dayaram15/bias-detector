// src/components/analyze/FileUploadBox.jsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useJobStore from "@/store/useJobStore";

export default function FileUploadBox() {
  const { setJobText } = useJobStore();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      setJobText(text);
    };

    if (file.type === "text/plain") {
      reader.readAsText(file);
    } else {
      alert("Only .txt files supported right now");
    }
  };

  return (
    <div className="space-y-2 mt-4">
      <Label htmlFor="file-upload">Upload Job Description (.txt)</Label>
      <Input
        id="file-upload"
        type="file"
        accept=".txt"
        onChange={handleFile}
      />
    </div>
  );
}
