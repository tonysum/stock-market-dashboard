"use client"

import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"
import { StockChart } from "@/components/stock/stock-chart"
import { OrderBook } from "@/components/stock/order-book"
import { TradePanel } from "@/components/stock/trade-panel"
import { TickData } from "@/components/stock/tick-data"

interface WatchlistItem {
  code: string
  name: string
  price: number
  change: number
  changePercent: string
  isUp: boolean
}

const watchlistData: WatchlistItem[] = [
  { code: "300796", name: "贝斯美-精草胺", price: 9.69, change: -0.01, changePercent: "+0.10%", isUp: true },
  { code: "002239", name: "美特好-汽车空调-油井", price: 3.21, change: 0.00, changePercent: "+0.00%", isUp: true },
  { code: "300118", name: "东方日升-光伏", price: 21.00, change: -0.02, changePercent: "-0.10%", isUp: false },
  { code: "603825", name: "ST华牧联公-牧养-不确", price: 9.78, change: -0.02, changePercent: "-0.20%", isUp: false },
  { code: "002681", name: "奋达科技-机器人+智能手表", price: 6.33, change: -0.04, changePercent: "-0.63%", isUp: false },
  { code: "600333", name: "长春燃气", price: 5.64, change: -0.04, changePercent: "-0.70%", isUp: false },
  { code: "002086", name: "东方海洋", price: 2.28, change: -0.02, changePercent: "-0.87%", isUp: false },
  { code: "601219", name: "兴州轮毂-大消费-集中市场", price: 24.37, change: -0.38, changePercent: "-1.54%", isUp: false },
  { code: "300625", name: "英力特-化工", price: 9.98, change: -0.16, changePercent: "-1.58%", isUp: false },
  { code: "603000", name: "人民网", price: 24.56, change: -0.55, changePercent: "-2.19%", isUp: false },
  { code: "002079", name: "苏州固锝-光伏", price: 11.40, change: -0.26, changePercent: "-2.23%", isUp: false },
  { code: "002467", name: "二六三-alagent", price: 7.08, change: -0.20, changePercent: "-2.75%", isUp: false },
  { code: "603616", name: "韩建河山-白鹤滩", price: 7.51, change: -0.29, changePercent: "-3.72%", isUp: false },
]

export function StockDetailPage() {
  const [selectedStock, setSelectedStock] = useState("600333")

  const currentStock = watchlistData.find(s => s.code === selectedStock) || watchlistData[5]

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left: Watchlist */}
      <div className="w-[260px] flex flex-col border-r border-border overflow-hidden">
        <div className="flex items-center gap-1 px-2 py-1.5 border-b border-border">
          <span className="text-[11px] text-muted-foreground">名称/代码</span>
          <span className="text-[11px] text-muted-foreground ml-auto">最新价</span>
          <span className="text-[11px] text-muted-foreground ml-2">涨跌</span>
          <span className="text-[11px] text-muted-foreground ml-2">涨跌幅</span>
        </div>
        <div className="flex-1 overflow-y-auto">
          {watchlistData.map((stock) => (
            <div
              key={stock.code}
              onClick={() => setSelectedStock(stock.code)}
              className={cn(
                "flex items-center px-2 py-1 cursor-pointer text-[11px] hover:bg-accent/50 transition-colors",
                selectedStock === stock.code && "bg-accent"
              )}
            >
              <div className="flex-1 min-w-0">
                <div className="truncate text-foreground">{stock.name}</div>
                <div className="text-muted-foreground text-[10px]">{stock.code}</div>
              </div>
              <span className={cn(
                "w-14 text-right",
                stock.isUp ? "text-stock-up" : "text-stock-down"
              )}>
                {stock.price.toFixed(2)}
              </span>
              <span className={cn(
                "w-12 text-right",
                stock.isUp ? "text-stock-up" : "text-stock-down"
              )}>
                {stock.change > 0 ? "+" : ""}{stock.change.toFixed(2)}
              </span>
              <span className={cn(
                "w-16 text-right rounded px-1",
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
        {/* Chart toolbar */}
        <div className="flex items-center gap-1 border-b border-border px-2 py-1 overflow-x-auto">
          {["分时", "日K", "周K", "月K", "5分", "15分", "30分", "60分", "1小时", "2小时", "4小时"].map((period, i) => (
            <button
              key={period}
              className={cn(
                "px-1.5 py-0.5 text-[10px] whitespace-nowrap rounded transition-colors",
                i === 1 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {period}
            </button>
          ))}
        </div>
        {/* MA indicator bar */}
        <div className="flex items-center gap-2 px-2 py-0.5 border-b border-border text-[10px]">
          <span className="text-muted-foreground">MA</span>
          <span className="text-yellow-400">{"MA5:5.696"}</span>
          <span className="text-purple-400">{"MA10:5.709"}</span>
          <span className="text-blue-400">{"MA20:5.947"}</span>
          <span className="text-green-400">{"MA120:6.081"}</span>
        </div>
        {/* Chart area */}
        <div className="flex-1 overflow-hidden">
          <StockChart stock={currentStock} />
        </div>
        {/* Bottom indicator tabs */}
        <div className="flex items-center gap-1 border-t border-border px-2 py-0.5 overflow-x-auto">
          {["MAS", "MACH", "VWAP", "MA", "EMA", "SAR", "BBI", "MACD", "DMA", "DMI", "RSI", "KDJ", "CCI", "BOLL"].map((ind, i) => (
            <button
              key={ind}
              className={cn(
                "px-1.5 py-0.5 text-[10px] whitespace-nowrap rounded transition-colors",
                i === 3 ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {ind}
            </button>
          ))}
        </div>
      </div>

      {/* Right: Stock info + Order book + Trade */}
      <div className="w-[280px] flex flex-col border-l border-border overflow-hidden">
        {/* Stock header info */}
        <div className="border-b border-border px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{currentStock.code}</span>
            <span className="text-sm font-medium text-foreground">{currentStock.name}</span>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span className={cn(
              "text-xl font-bold",
              currentStock.isUp ? "text-stock-up" : "text-stock-down"
            )}>
              {currentStock.price.toFixed(2)}
            </span>
            <span className={cn(
              "text-xs",
              currentStock.isUp ? "text-stock-up" : "text-stock-down"
            )}>
              {currentStock.change > 0 ? "+" : ""}{currentStock.change.toFixed(2)}
            </span>
            <span className={cn(
              "text-xs",
              currentStock.isUp ? "text-stock-up" : "text-stock-down"
            )}>
              {currentStock.changePercent}
            </span>
          </div>

          {/* Price details grid */}
          <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 mt-2 text-[10px]">
            <div className="flex justify-between">
              <span className="text-muted-foreground">最高价</span>
              <span className="text-stock-up">5.71</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">开盘价</span>
              <span className="text-stock-up">5.68</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">最低价</span>
              <span className="text-stock-down">5.58</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">成交量</span>
              <span className="text-foreground">1904.56万</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">振幅</span>
              <span className="text-foreground">2.29%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">均价</span>
              <span className="text-foreground">5.42</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">换手率</span>
              <span className="text-foreground">4.41%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">总市值</span>
              <span className="text-foreground">34.35亿</span>
            </div>
          </div>
        </div>

        {/* Tabs: 盘口/资金/分析/... */}
        <div className="flex items-center gap-0.5 border-b border-border px-2 py-1">
          {["盘口", "资金", "分时", "简况", "财务", "异动"].map((tab, i) => (
            <button
              key={tab}
              className={cn(
                "px-2 py-0.5 text-[10px] rounded transition-colors",
                i === 0 ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tick data */}
        <div className="border-b border-border">
          <TickData />
        </div>

        {/* Order book */}
        <div className="border-b border-border">
          <OrderBook />
        </div>

        {/* Trade panel */}
        <div className="flex-1">
          <TradePanel stockName={currentStock.name} price={currentStock.price} />
        </div>
      </div>
    </div>
  )
}
