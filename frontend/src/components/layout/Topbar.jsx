// src/components/layout/Topbar.jsx
import { ThemeToggle } from "../ui/ThemeToggle";

export default function Topbar() {
  return (
    <header className="flex justify-between items-center px-6 py-4 border-b border-border bg-background text-foreground">
      <h2 className="text-xl font-semibold">Welcome, Recruiter</h2>
      <ThemeToggle />
    </header>
  );
}
