"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { StockChart } from "@/components/stock/stock-chart"
import { OrderBook } from "@/components/stock/order-book"
import { TickData } from "@/components/stock/tick-data"
import { TradePanel } from "@/components/stock/trade-panel"

interface WatchlistStock {
  code: string
  name: string
  price: number
  change: number
  changePercent: string
  isUp: boolean
}

const watchlistStocks: WatchlistStock[] = [
  { code: "300620", name: "光库科技", price: 180.13, change: 11.25, changePercent: "+4.34%", isUp: true },
  { code: "600288", name: "大恒科技", price: 15.45, change: -0.09, changePercent: "-0.58%", isUp: false },
  { code: "603729", name: "龙韵股份", price: 21.38, change: -2.38, changePercent: "-10.02%", isUp: false },
  { code: "002723", name: "小崧股份", price: 10.44, change: -1.16, changePercent: "-9.98%", isUp: false },
  { code: "002429", name: "兆驰股份", price: 11.22, change: -0.11, changePercent: "-0.97%", isUp: false },
  { code: "002830", name: "名雕股份", price: 25.06, change: -2.66, changePercent: "-9.60%", isUp: false },
  { code: "605287", name: "德才股份", price: 58.80, change: -2.46, changePercent: "-3.98%", isUp: false },
  { code: "301262", name: "海看股份", price: 29.53, change: -1.86, changePercent: "-5.93%", isUp: false },
  { code: "300985", name: "致远新能", price: 24.93, change: 0.12, changePercent: "+0.48%", isUp: true },
  { code: "600149", name: "鹏博发展", price: 6.12, change: -0.14, changePercent: "-2.24%", isUp: false },
  { code: "600172", name: "黄河旋风", price: 7.91, change: -0.04, changePercent: "-0.50%", isUp: false },
]

export function WatchlistPage() {
  const [selectedStock, setSelectedStock] = useState(watchlistStocks[0])

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left: Watchlist */}
      <div className="w-[260px] flex flex-col border-r border-border overflow-hidden">
        <div className="flex items-center gap-2 px-2 py-1.5 border-b border-border">
          <span className="text-[11px] text-foreground font-medium">自选股</span>
          <span className="text-[10px] text-muted-foreground">全部</span>
        </div>
        <div className="flex items-center px-2 py-0.5 border-b border-border text-[9px] text-muted-foreground">
          <span className="flex-1">名称/代码</span>
          <span className="w-16 text-right">最新价</span>
          <span className="w-14 text-right">涨跌</span>
          <span className="w-16 text-right">涨跌幅</span>
        </div>
        <div className="flex-1 overflow-y-auto">
          {watchlistStocks.map((stock) => (
            <div
              key={stock.code}
              onClick={() => setSelectedStock(stock)}
              className={cn(
                "flex items-center px-2 py-1.5 cursor-pointer text-[11px] hover:bg-accent/30 transition-colors",
                selectedStock.code === stock.code && "bg-accent/50"
              )}
            >
              <div className="flex-1 min-w-0">
                <div className="truncate text-foreground">{stock.name}</div>
                <div className="text-muted-foreground text-[9px]">{stock.code}</div>
              </div>
              <span className={cn("w-16 text-right", stock.isUp ? "text-stock-up" : "text-stock-down")}>
                {stock.price.toFixed(2)}
              </span>
              <span className={cn("w-14 text-right", stock.isUp ? "text-stock-up" : "text-stock-down")}>
                {stock.change > 0 ? "+" : ""}{stock.change.toFixed(2)}
              </span>
              <span className={cn(
                "w-16 text-right text-[10px] px-1 rounded",
                stock.isUp ? "text-stock-up bg-red-900/30" : "text-stock-down bg-green-900/30"
              )}>
                {stock.changePercent}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Center: Chart */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center gap-1 border-b border-border px-2 py-1">
          {["分时", "日K", "周K", "月K", "5分", "15分", "30分", "60分"].map((p, i) => (
            <button
              key={p}
              className={cn(
                "px-1.5 py-0.5 text-[10px] rounded transition-colors",
                i === 1 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="flex-1 overflow-hidden">
          <StockChart stock={selectedStock} />
        </div>
      </div>

      {/* Right: Info panel */}
      <div className="w-[270px] flex flex-col border-l border-border overflow-y-auto">
        <div className="px-3 py-2 border-b border-border">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{selectedStock.code}</span>
            <span className="text-sm font-medium text-foreground">{selectedStock.name}</span>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className={cn("text-xl font-bold", selectedStock.isUp ? "text-stock-up" : "text-stock-down")}>
              {selectedStock.price.toFixed(2)}
            </span>
            <span className={cn("text-xs", selectedStock.isUp ? "text-stock-up" : "text-stock-down")}>
              {selectedStock.change > 0 ? "+" : ""}{selectedStock.change.toFixed(2)}
            </span>
            <span className={cn("text-xs", selectedStock.isUp ? "text-stock-up" : "text-stock-down")}>
              {selectedStock.changePercent}
            </span>
          </div>
        </div>
        <TickData />
        <div className="border-t border-border">
          <OrderBook />
        </div>
        <div className="border-t border-border">
          <TradePanel stockName={selectedStock.name} price={selectedStock.price} />
        </div>
      </div>
    </div>
  )
}
