// src/components/layout/Sidebar.jsx
import { Home, FileText, History, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils"; // Optional: for cleaner class merging

const navLinks = [
  { name: "Dashboard", icon: Home, path: "/" },
  { name: "Analyze JD", icon: FileText, path: "/analyze" },
  { name: "History", icon: History, path: "/history" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="h-screen w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col p-4">
      <h1 className="text-2xl font-bold mb-8 text-sidebar-primary">
        Bias Detector
      </h1>

      <nav className="flex flex-col space-y-2">
        {navLinks.map(({ name, icon: Icon, path }) => {
          const isActive = location.pathname === path;

          return (
            <Link
              key={name}
              to={path}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-md font-medium transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto text-xs text-muted-foreground text-center pt-4">
        © 2025 Bias Detector
      </div>
    </aside>
  );
}
