"use client"

import { Search, Bell, Settings, Volume2 } from "lucide-react"

export function HeaderBar() {
  return (
    <header className="flex h-8 items-center border-b border-border bg-card px-3">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5">
          <div className="h-5 w-5 rounded bg-primary flex items-center justify-center">
            <span className="text-[10px] font-bold text-primary-foreground">FT</span>
          </div>
          <span className="text-xs text-muted-foreground">30448180</span>
        </div>
      </div>
      <div className="flex items-center gap-2 ml-3">
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="h-3.5 w-3.5" />
        </button>
        <button className="text-muted-foreground hover:text-foreground transition-colors">
          <Volume2 className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <div className="flex items-center gap-1 rounded border border-border bg-secondary px-2 py-0.5">
          <Search className="h-3 w-3 text-muted-foreground" />
          <span className="text-[11px] text-muted-foreground">{"代码/拼音/名称"}</span>
        </div>
      </div>
    </header>
  )
}
