"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

export function MarketTabs() {
  const [activeTab, setActiveTab] = useState("heatmap")
  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => setActiveTab("heatmap")}
        className={cn(
          "px-2 py-0.5 text-[11px] rounded transition-colors",
          activeTab === "heatmap"
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        个股热力图
      </button>
      <button
        onClick={() => setActiveTab("sector")}
        className={cn(
          "px-2 py-0.5 text-[11px] rounded transition-colors",
          activeTab === "sector"
            ? "bg-accent text-accent-foreground"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        领涨板块
      </button>
    </div>
  )
}
