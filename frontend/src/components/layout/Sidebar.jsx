// src/components/layout/Sidebar.jsx
import { Home, FileText, History, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "Dashboard", icon: Home, path: "/" },
  { name: "Analyze JD", icon: FileText, path: "/analyze" },
  { name: "History", icon: History, path: "/history" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border p-4">
      <h1 className="text-2xl font-bold mb-6 text-sidebar-primary">Bias Detector</h1>
      <nav className="space-y-2">
        {navLinks.map(({ name, icon: Icon, path }) => (
          <Link
            key={name}
            to={path}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition ${
              location.pathname === path ? "bg-sidebar-primary text-sidebar-primary-foreground" : ""
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{name}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
