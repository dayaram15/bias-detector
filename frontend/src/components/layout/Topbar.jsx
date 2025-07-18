// src/components/layout/Topbar.jsx
import { Menu, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../ui/ThemeToggle";
import { motion } from "framer-motion";

export default function Topbar({ onMenuClick }) {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="sticky top-0 z-50 w-full h-16 px-4 sm:px-6 bg-background border-b shadow-sm flex items-center justify-between"
    >
      <div className="flex items-center gap-2">
        {/* Hamburger icon for mobile */}
        <Button variant="ghost" size="icon" onClick={onMenuClick} className="sm:hidden">
          <Menu className="h-5 w-5" />
        </Button>

        <h1 className="text-lg font-semibold tracking-tight">Bias Detector</h1>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button variant="ghost" size="icon">
          <MessageSquare className="h-5 w-5" />
        </Button>
      </div>
    </motion.header>
  );
}
