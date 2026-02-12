"use client"

import { cn } from "@/lib/utils"

interface TickEntry {
  time: string
  price: number
  volume: string
  direction: "up" | "down" | "flat"
  percentage: string
}

const ticks: TickEntry[] = [
  { time: "10:14:24", price: 5.44, volume: "17", direction: "up", percentage: "3.32%" },
  { time: "10:14:29", price: 5.44, volume: "31", direction: "down", percentage: "1.92%" },
  { time: "10:14:35", price: 5.44, volume: "61", direction: "up", percentage: "1.53%" },
  { time: "10:13:37", price: 5.44, volume: "107", direction: "up", percentage: "2.88%" },
  { time: "10:13:42", price: 5.44, volume: "50", direction: "down", percentage: "5.75%" },
  { time: "10:13:43", price: 5.64, volume: "3", direction: "up", percentage: "8.06%" },
  { time: "10:14:22", price: 5.44, volume: "14", direction: "up", percentage: "8.73%" },
  { time: "10:14:24", price: 5.44, volume: "311", direction: "down", percentage: "13.40%" },
]

export function TickData() {
  return (
    <div className="px-2 py-1">
      <div className="flex items-center gap-1 mb-1">
        <span className="text-[10px] text-muted-foreground">分笔成交</span>
      </div>
      <table className="w-full text-[10px]">
        <thead>
          <tr className="text-muted-foreground">
            <th className="text-left py-0.5 font-normal">时间</th>
            <th className="text-right py-0.5 font-normal">价格</th>
            <th className="text-right py-0.5 font-normal">数量</th>
            <th className="text-right py-0.5 font-normal">占比</th>
          </tr>
        </thead>
        <tbody>
          {ticks.map((tick, i) => (
            <tr key={i} className="hover:bg-accent/30">
              <td className="py-0.5 text-muted-foreground">{tick.time}</td>
              <td className={cn(
                "py-0.5 text-right",
                tick.direction === "up" ? "text-stock-up" : tick.direction === "down" ? "text-stock-down" : "text-foreground"
              )}>
                {tick.price.toFixed(2)}
              </td>
              <td className={cn(
                "py-0.5 text-right",
                tick.direction === "up" ? "text-stock-up" : "text-stock-down"
              )}>
                {tick.volume}
              </td>
              <td className="py-0.5 text-right">
                <div className="flex items-center justify-end gap-0.5">
                  <div className={cn(
                    "h-1.5 rounded-sm",
                    tick.direction === "up" ? "bg-stock-up" : "bg-stock-down"
                  )} style={{ width: `${Math.min(40, parseFloat(tick.percentage) * 3)}px` }} />
                  <span className="text-muted-foreground">{tick.percentage}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
