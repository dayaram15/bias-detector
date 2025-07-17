// src/App.jsx
import { Routes, Route } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";

import Dashboard from "@/pages/Dashboard";
import AnalyzeJob from "@/pages/AnalyzeJob";
import History from "@/pages/History";
import Settings from "@/pages/Settings";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analyze" element={<AnalyzeJob />} />
        <Route path="/history" element={<History />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
