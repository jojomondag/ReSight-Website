"use client";

import { useMemo } from "react";
import { generateAsciiTree } from "./treeGenerator";

export default function AsciiTreeBackground() {
  const treeArt = useMemo(() => {
    return generateAsciiTree({
      width: 100,
      height: 70,
      seed: 42,
      trunkHeight: 15,
      branchProbability: 0.7,
      foliageDensity: 0.6,
    });
  }, []);

  return (
    <div
      className="fixed inset-y-0 left-0 w-1/3 pointer-events-none hidden md:flex items-center justify-center overflow-hidden z-0 animate-sway will-change-transform"
      aria-hidden="true"
    >
      <pre
        className="font-mono text-accent/25 text-[12px] leading-[1.1] whitespace-pre select-none"
        style={{
          fontFamily:
            'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace',
        }}
      >
        {treeArt}
      </pre>
    </div>
  );
}
