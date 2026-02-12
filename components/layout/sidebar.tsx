"use client"

import { useState } from "react"
import {
  User,
  Star,
  BarChart3,
  GitBranch,
  Lightbulb,
  Layers,
  Database,
  ArrowRightLeft,
  Newspaper,
  Flame,
  Clock,
  Box,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "account", label: "我的", icon: User },
  { id: "watchlist", label: "自选", icon: Star },
  { id: "market", label: "行情", icon: BarChart3 },
  { id: "options", label: "期权", icon: GitBranch },
  { id: "strategy", label: "策略", icon: Lightbulb },
  { id: "portfolio", label: "组合", icon: Layers },
  { id: "data", label: "数据", icon: Database },
  { id: "trade", label: "交易", icon: ArrowRightLeft },
  { id: "news", label: "资讯", icon: Newspaper },
  { id: "community", label: "牛牛圈", icon: Flame },
  { id: "simulation", label: "模拟", icon: Box },
]

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="flex h-full w-[52px] flex-col items-center bg-sidebar py-2 border-r border-sidebar-border">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = activeTab === item.id
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              "flex flex-col items-center justify-center w-full py-2 gap-0.5 text-[10px] transition-colors",
              isActive
                ? "text-primary"
                : "text-sidebar-foreground hover:text-sidebar-accent-foreground"
            )}
            title={item.label}
          >
            <Icon className="h-4 w-4" />
            <span className="leading-tight">{item.label}</span>
          </button>
        )
      })}
    </aside>
  )
}
