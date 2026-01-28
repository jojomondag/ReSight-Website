"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Tab {
  id: string;
  label: string;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
}

export default function AnimatedTabs({
  tabs,
  defaultTab,
  onChange,
  className = "",
}: AnimatedTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  return (
    <div
      className={`inline-flex items-center gap-1 p-1 rounded-xl bg-bg-tertiary/50 backdrop-blur-sm border border-border ${className}`}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className="relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg"
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-accent rounded-lg"
              initial={false}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 30,
              }}
            />
          )}
          <span
            className={`relative z-10 transition-colors duration-200 ${
              activeTab === tab.id ? "text-bg-primary" : "text-text-secondary hover:text-text-primary"
            }`}
          >
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
}

interface AnimatedTabContentProps {
  children: React.ReactNode;
  tabId: string;
  activeTab: string;
}

export function AnimatedTabContent({
  children,
  tabId,
  activeTab,
}: AnimatedTabContentProps) {
  return (
    <AnimatePresence mode="wait">
      {activeTab === tabId && (
        <motion.div
          key={tabId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
