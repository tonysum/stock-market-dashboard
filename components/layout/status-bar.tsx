"use client"

import { useEffect, useState } from "react"

interface IndexData {
  name: string
  value: string
  change: string
  changePercent: string
  isUp: boolean
  volume: string
}

const indices: IndexData[] = [
  { name: "上证指数", value: "4134.38", change: "+2.40", changePercent: "+0.06%", isUp: true, volume: "3448亿" },
  { name: "深证成指", value: "14207.52", change: "+44.59", changePercent: "+0.31%", isUp: true, volume: "4967亿" },
  { name: "创业板指", value: "3198.25", change: "+13.31", changePercent: "+0.42%", isUp: true, volume: "2441亿" },
]

export function StatusBar() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const formatted = now.toLocaleString("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
      setTime(`CN ${formatted}`)
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="flex h-7 items-center border-t border-border bg-card px-3 text-[11px]">
      <div className="flex items-center gap-1">
        <span className="inline-block h-2 w-2 rounded-full bg-stock-up" />
        <span className="text-muted-foreground">交易中</span>
      </div>
      <div className="flex items-center gap-4 ml-4">
        {indices.map((idx) => (
          <div key={idx.name} className="flex items-center gap-1.5">
            <span className="text-muted-foreground">{idx.name}</span>
            <span className={idx.isUp ? "text-stock-up" : "text-stock-down"}>
              {idx.value}
            </span>
            <span className={idx.isUp ? "text-stock-up" : "text-stock-down"}>
              {idx.change}
            </span>
            <span className={idx.isUp ? "text-stock-up" : "text-stock-down"}>
              {idx.changePercent}
            </span>
            <span className="text-muted-foreground">{idx.volume}</span>
          </div>
        ))}
      </div>
      <div className="ml-auto flex items-center gap-3">
        <span className="text-muted-foreground">{time}</span>
      </div>
    </footer>
  )
}
